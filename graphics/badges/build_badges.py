"""Generate "built at BWH" GitHub badges as self-contained SVGs.

Text is outlined to paths (Inter, kerned) because GitHub serves README
images through camo inside <img>, where web fonts never load.
Colors are resolved from ../theme/tokens.css by frappe-ui token name.

    python3 build_badges.py   ->  svg/<shape>-<theme>.svg + gallery.html
"""

import re
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

HERE = Path(__file__).parent
FONT_PATH = HERE.parent / "theme/fonts/Inter.var.woff2"
TOKENS_PATH = HERE.parent / "theme/tokens.css"
OUT = HERE / "svg"

H = 28
SIZE = 11.5
ACCENT = "green"  # frappe-ui hue used for every accent token


# ── tokens ──────────────────────────────────────────────────────────────────

def load_tokens():
    tokens = {}
    for name, value in re.findall(r"--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b", TOKENS_PATH.read_text()):
        tokens.setdefault(name, value.lower())  # first = canonical/light value
    return tokens


TK = load_tokens()


def tk(name):
    return TK[name]


THEMES = {
    # bg, border, fg, muted, mark (small accents), block (accent fills), on_block, line, subtle
    "dark": dict(bg="gray-950", border="gray-800", fg="surface-base", muted="gray-500",
                 mark=f"{ACCENT}-400", block=f"{ACCENT}-500", on_block="surface-base",
                 line="gray-800", subtle="gray-900"),
    "light": dict(bg="surface-base", border="gray-300", fg="gray-950", muted="gray-600",
                  mark=f"{ACCENT}-500", block=f"{ACCENT}-500", on_block="surface-base",
                  line="gray-300", subtle="gray-100"),
    "accent": dict(bg=f"{ACCENT}-500", border=None, fg="surface-base", muted=f"{ACCENT}-200",
                   mark="surface-base", block="gray-950", on_block="surface-base",
                   line=f"{ACCENT}-400", subtle=f"{ACCENT}-600"),
    "soft": dict(bg=f"{ACCENT}-50", border=f"{ACCENT}-200", fg="gray-950", muted="gray-600",
                 mark=f"{ACCENT}-500", block=f"{ACCENT}-500", on_block="surface-base",
                 line=f"{ACCENT}-200", subtle=f"{ACCENT}-100"),
}


class Theme:
    def __init__(self, spec):
        for key, token in spec.items():
            setattr(self, key, tk(token) if token else None)


# ── text → outlined paths ───────────────────────────────────────────────────

class Face:
    def __init__(self, weight):
        font = TTFont(FONT_PATH)
        self.font = instantiateVariableFont(font, {"wght": weight, "opsz": 14})
        self.upm = self.font["head"].unitsPerEm
        self.cap = self.font["OS/2"].sCapHeight
        self.cmap = self.font.getBestCmap()
        self.glyphs = self.font.getGlyphSet()
        self.hmtx = self.font["hmtx"]
        self.kerns = self._kern_lookups()

    def _kern_lookups(self):
        gpos = self.font["GPOS"].table
        indices = {i for rec in gpos.FeatureList.FeatureRecord if rec.FeatureTag == "kern"
                   for i in rec.Feature.LookupListIndex}
        subtables = []
        for i in sorted(indices):
            for sub in gpos.LookupList.Lookup[i].SubTable:
                subtables.append(sub.ExtSubTable if hasattr(sub, "ExtSubTable") else sub)
        return [s for s in subtables if getattr(s, "LookupType", 2) == 2 or hasattr(s, "PairSet") or hasattr(s, "Class1Record")]

    def kern(self, left, right):
        for sub in self.kerns:
            coverage = sub.Coverage.glyphs
            if left not in coverage:
                continue
            if sub.Format == 1:
                for rec in sub.PairSet[coverage.index(left)].PairValueRecord:
                    if rec.SecondGlyph == right:
                        return getattr(rec.Value1, "XAdvance", 0) or 0
            elif sub.Format == 2:
                c1 = sub.ClassDef1.classDefs.get(left, 0)
                c2 = sub.ClassDef2.classDefs.get(right, 0)
                value = sub.Class1Record[c1].Class2Record[c2].Value1
                advance = getattr(value, "XAdvance", 0) or 0 if value else 0
                if advance:
                    return advance
        return 0

    def layout(self, text):
        names = [self.cmap[ord(ch)] for ch in text]
        placed, x = [], 0
        for i, name in enumerate(names):
            placed.append((name, x))
            x += self.hmtx[name][0]
            if i + 1 < len(names):
                x += self.kern(name, names[i + 1])
        return placed, x


FACES = {}


def face(weight):
    if weight not in FACES:
        FACES[weight] = Face(weight)
    return FACES[weight]


def measure(text, weight=500, size=SIZE, track=0.0):
    f = face(weight)
    _, width = f.layout(text)
    return width * size / f.upm + track * size * max(len(text) - 1, 0)


def cap_height(weight=500, size=SIZE):
    f = face(weight)
    return f.cap * size / f.upm


def text(content, x, baseline, fill, weight=500, size=SIZE, track=0.0):
    f = face(weight)
    scale = size / f.upm
    placed, _ = f.layout(content)
    pen = SVGPathPen(f.glyphs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    for i, (name, gx) in enumerate(placed):
        ox = x + gx * scale + track * size * i
        f.glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, ox, baseline)))
    return f'<path fill="{fill}" d="{pen.getCommands()}"/>'


def baseline_for(weight=500, size=SIZE, center=H / 2):
    return round(center + cap_height(weight, size) / 2, 2)


# ── shape helpers ───────────────────────────────────────────────────────────

def rrect(w, h, r, fill="none", stroke=None, sw=1, x=0, y=0, extra=""):
    inset = sw / 2 if stroke else 0
    stroke_attr = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return (f'<rect x="{x + inset:g}" y="{y + inset:g}" width="{w - 2 * inset:g}" height="{h - 2 * inset:g}" '
            f'rx="{max(r - inset, 0):g}" fill="{fill}"{stroke_attr}{extra}/>')


def plate(w, r, t, h=H):
    return rrect(w, h, r, fill=t.bg, stroke=t.border)


def svg(w, body, defs="", h=H):
    w = round(w, 2)
    defs_block = f"<defs>{defs}</defs>" if defs else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}" height="{h}" viewBox="0 0 {w:g} {h}" '
            f'role="img" aria-label="Built at BWH"><title>Built at BWH</title>{defs_block}{body}</svg>\n')


def words(x, t, built_fill=None, bwh_fill=None, gap=None, base=None):
    """'built at' + 'BWH' run starting at x. Returns (svg, end_x)."""
    gap = SIZE * 0.3 if gap is None else gap
    base = baseline_for(700) if base is None else base
    wb = measure("built at", 500)
    parts = [text("built at", x, base, built_fill or t.muted, 500),
             text("BWH", x + wb + gap, base, bwh_fill or t.fg, 700)]
    return "".join(parts), x + wb + gap + measure("BWH", 700)


# ── 14 shape concepts ───────────────────────────────────────────────────────

def split(t, uid):
    wb, wB = measure("built at"), measure("BWH", 700)
    lw = 9 + wb + 9
    w = lw + 10 + wB + 10
    base = baseline_for(700)
    defs = f'<clipPath id="{uid}c">{rrect(w, H, 6)}</clipPath>'
    body = (plate(w, 6, t)
            + f'<g clip-path="url(#{uid}c)"><rect x="{lw:.2f}" width="{w - lw:.2f}" height="{H}" fill="{t.block}"/></g>'
            + text("built at", 9, base, t.muted)
            + text("BWH", lw + 10, base, t.on_block, 700))
    return svg(w, body, defs)


def pill_dot(t, uid):
    run, end = words(24, t)
    w = end + 12
    body = plate(w, 14, t) + f'<circle cx="14" cy="14" r="3" fill="{t.mark}"/>' + run
    return svg(w, body)


def brackets(t, uid):
    run, end = words(17, t)
    w = end + 17
    s = f'fill="none" stroke="{t.mark}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    body = (plate(w, 4, t)
            + f'<path {s} d="M12.5 8H9.5V20H12.5"/>'
            + f'<path {s} d="M{w - 12.5:.2f} 8H{w - 9.5:.2f}V20H{w - 12.5:.2f}"/>'
            + run)
    return svg(w, body)


def ticket(t, uid):
    wb, wB = measure("built at"), measure("BWH", 700)
    div = 10 + wb + 10
    w = div + 10 + wB + 11
    base = baseline_for(700)
    defs = (f'<mask id="{uid}m"><rect width="{w:.2f}" height="{H}" fill="#fff"/>'
            f'<circle cx="{div:.2f}" cy="0" r="4" fill="#000"/><circle cx="{div:.2f}" cy="{H}" r="4" fill="#000"/></mask>')
    body = (f'<g mask="url(#{uid}m)">{plate(w, 4, t)}</g>'
            + f'<line x1="{div:.2f}" y1="7" x2="{div:.2f}" y2="21" stroke="{t.mark}" stroke-width="1" stroke-dasharray="2 2"/>'
            + text("built at", 10, base, t.muted)
            + text("BWH", div + 10, base, t.fg, 700))
    return svg(w, body, defs)


def arrow(t, uid):
    run, end = words(23, t)
    w = end + 8 + 10
    d = f"M4 0.5H{w - 10.5:.2f}L{w - 1:.2f} 14L{w - 10.5:.2f} 27.5H4A3.5 3.5 0 0 1 0.5 24V4A3.5 3.5 0 0 1 4 0.5Z"
    stroke = f' stroke="{t.border}" stroke-width="1" stroke-linejoin="round"' if t.border else ""
    body = (f'<path d="{d}" fill="{t.bg}"{stroke}/>'
            + f'<rect x="10.5" y="10.5" width="7" height="7" rx="1" transform="rotate(45 14 14)" fill="{t.mark}"/>'
            + run)
    return svg(w, body)


def marker(t, uid):
    wb, wB = measure("built at"), measure("BWH", 700)
    base = baseline_for(700)
    bx = 13 + wb + SIZE * 0.3 + 4
    w = bx + wB + 4 + 12
    hx, hw = bx - 5, wB + 10
    body = (plate(w, 14, t)
            + f'<rect x="{hx:.2f}" y="6" width="{hw:.2f}" height="16" rx="2" fill="{t.block}" '
              f'transform="skewX(-12) translate({(H / 2) * 0.2126:.2f} 0)"/>'
            + text("built at", 13, base, t.muted)
            + text("BWH", bx, base, t.on_block, 700))
    return svg(w, body)


def terminal(t, uid):
    run, end = words(23, t, built_fill=t.fg)
    w = end + 3 + 6 + 10
    body = (plate(w, 5, t)
            + f'<path d="M10.5 10L14.5 14L10.5 18" fill="none" stroke="{t.mark}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
            + run
            + f'<rect x="{end + 3:.2f}" y="8.5" width="6" height="11" rx="1" fill="{t.mark}"/>')
    return svg(w, body)


def stamp(t, uid):
    size, track = 9.5, 0.12
    wb = measure("BUILT AT", 600, size, track)
    wB = measure("BWH", 800, size, track)
    gap = size * 0.6
    base = baseline_for(800, size)
    w = 12 + wb + gap + wB + 12
    body = (rrect(w, H, 3, fill=t.bg)
            + rrect(w, H, 3, stroke=t.mark, sw=1.2)
            + rrect(w - 6, H - 6, 1.5, stroke=t.mark, sw=0.6, x=3, y=3)
            + text("BUILT AT", 12, base, t.muted, 600, size, track)
            + text("BWH", 12 + wb + gap, base, t.fg, 800, size, track))
    return svg(w, body)


def slant(t, uid):
    wb, wB = measure("built at"), measure("BWH", 700)
    base = baseline_for(700)
    lw = 10 + wb + 12
    w = lw + 8 + wB + 11
    defs = f'<clipPath id="{uid}c">{rrect(w, H, 6)}</clipPath>'
    body = (plate(w, 6, t)
            + f'<g clip-path="url(#{uid}c)"><path d="M{lw:.2f} 0H{w:.2f}V{H}H{lw - 7:.2f}Z" fill="{t.block}"/></g>'
            + text("built at", 10, base, t.muted)
            + text("BWH", lw + 5, base, t.on_block, 700))
    return svg(w, body, defs)


def monogram(t, uid):
    run, end = words(30, t)
    w = end + 13
    wm = measure("B", 800, 11)
    body = (plate(w, 14, t)
            + f'<circle cx="14" cy="14" r="10" fill="{t.block}"/>'
            + text("B", 14 - wm / 2, baseline_for(800, 11), t.on_block, 800, 11)
            + run)
    return svg(w, body)


def code(t, uid):
    run, end = words(37, t)
    w = end + 11
    s = f'fill="none" stroke="{t.mark}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    body = (plate(w, 6, t)
            + f'<path {s} d="M13 10L9.5 14L13 18M17 18.5L19 9.5M23 10L26.5 14L23 18"/>'
            + f'<line x1="31" y1="7" x2="31" y2="21" stroke="{t.line}" stroke-width="1"/>'
            + run)
    return svg(w, body)


def stacked(t, uid):
    sm, smt = 6.5, 0.16
    lg = 12
    w_small = measure("BUILT AT", 600, sm, smt)
    w_big = measure("BWH", 800, lg, 0.02)
    col = max(w_small, w_big)
    w = 12 + col + 9 + 8 + 10
    ax = w - 10 - 8
    defs = f'<clipPath id="{uid}c">{rrect(w, H, 5)}</clipPath>'
    s = f'fill="none" stroke="{t.mark}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    body = (plate(w, 5, t)
            + f'<g clip-path="url(#{uid}c)"><rect width="3" height="{H}" fill="{t.mark}"/></g>'
            + text("BUILT AT", 12, 10.6, t.muted, 600, sm, smt)
            + text("BWH", 11.6, 22, t.fg, 800, lg, 0.02)
            + f'<path {s} d="M{ax + 1:.2f} {H / 2 + 3:.2f}L{ax + 7:.2f} {H / 2 - 3:.2f}M{ax + 2.5:.2f} {H / 2 - 3:.2f}H{ax + 7:.2f}V{H / 2 + 1.5:.2f}"/>')
    return svg(w, body, defs)


def crop(t, uid):
    run, end = words(15, t)
    w = end + 15
    L, i = 5, 3.5
    s = f'fill="none" stroke="{t.mark}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    corners = (f"M{i} {i + L}V{i}H{i + L}"
               f"M{w - i - L:.2f} {i}H{w - i:.2f}V{i + L}"
               f"M{w - i:.2f} {H - i - L}V{H - i}H{w - i - L:.2f}"
               f"M{i + L} {H - i}H{i}V{H - i - L}")
    body = plate(w, 3, t) + f'<path {s} d="{corners}"/>' + run
    return svg(w, body)


def stripe(t, uid):
    sw = 20
    run, end = words(sw + 10, t)
    w = end + 11
    defs = (f'<clipPath id="{uid}c">{rrect(w, H, 5)}</clipPath>'
            f'<pattern id="{uid}p" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
            f'<rect width="1.4" height="4" fill="{t.mark}"/></pattern>')
    body = (plate(w, 5, t)
            + f'<g clip-path="url(#{uid}c)"><rect width="{sw}" height="{H}" fill="url(#{uid}p)"/></g>'
            + f'<line x1="{sw + 0.5}" y1="0" x2="{sw + 0.5}" y2="{H}" stroke="{t.mark}" stroke-width="1"/>'
            + (rrect(w, H, 5, stroke=t.border) if t.border else "")
            + run)
    return svg(w, body, defs)


SHAPES = {
    "split": split, "pill-dot": pill_dot, "brackets": brackets, "ticket": ticket,
    "arrow": arrow, "marker": marker, "terminal": terminal, "stamp": stamp,
    "slant": slant, "monogram": monogram, "code": code, "stacked": stacked,
    "crop": crop, "stripe": stripe,
}


def build():
    OUT.mkdir(exist_ok=True)
    rows = []
    for shape_name, shape in SHAPES.items():
        cells = []
        for theme_name, spec in THEMES.items():
            name = f"{shape_name}-{theme_name}"
            markup = shape(Theme(spec), uid=name.replace("-", ""))
            (OUT / f"{name}.svg").write_text(markup)
            cells.append((name, markup))
        rows.append((shape_name, cells))
    print(f"wrote {sum(len(c) for _, c in rows)} badges to {OUT}")
    return rows


if __name__ == "__main__":
    build()
