"""Combine per-lesson look frames into progression sheets.

Reads  course/look/lessons/<style>/Lxx.png
Writes course/look/progression-all.jpg        (14 rows × 3 styles)
       course/look/progression-M<n>.jpg       (one page per module, phone-friendly)
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent / "course" / "look"
import sys
SRC = sys.argv[1] if len(sys.argv) > 1 else "renders"   # "renders" (real HyperFrames) or "lessons" (AI concept images)
TAG = "" if SRC == "renders" else "-ai"
STYLES = [("flat", "Flat"), ("paper", "Paper cut-out")]  # 3D clay ruled out 2026-10-05
MODULES = [
    ("M1 · The Big Picture", ["L01", "L02", "L03"]),
    ("M2 · Making Money", ["L04", "L05"]),
    ("M3 · The Secret Language", ["L06", "L07"]),
    ("M4 · Keeping the Books", ["L08", "L09", "L10", "L11"]),
    ("M5 · Reading the Story", ["L12", "L13", "L14"]),
]
LESSONS = {
    "L01": ("1 · Why Bother?", "Night stall push-in · galla clasp morphs to history scroll · film strip vs polaroid"),
    "L02": ("2 · What You Have, What You Owe", "Notes fly into the galla with source tags · Ravi Mama's IOU pops"),
    "L03": ("3 · The Scale That Never Tips  · Checkpoint 1", "Scale tilts and settles on every transaction · 'which two changed?' freeze"),
    "L04": ("4 · Making Money", "Time-lapse sales · coins fill the profit pocket, rent drains it · tickers"),
    "L05": ("5 · Profit Is Not Cash  · Checkpoint 2", "Two gauges whose needles disagree · Priya's tab · NOPE stamp"),
    "L06": ("6 · Debit & Credit = Left & Right", "Khata opens; amounts fly to blue/orange pages · bank-SMS split screen"),
    "L07": ("7 · The Golden Rules, Decoded  · Checkpoint 3", "Split screen: bahi-khata vs equation · entries slide together and click"),
    "L08": ("8 · The Journal", "Tissue blows away · rows write themselves · golden-rule tags pop on"),
    "L09": ("9 · The Ledger", "Journal lines fly to little khatas · balances carry down"),
    "L10": ("10 · Month-End Surprises", "Confetti freezes · cart value drains · stock jar counted · profit ticks down"),
    "L11": ("11 · The Trial Balance  · Checkpoint 4", "Book tower wobbles · two columns count up and morph into a level scale"),
    "L12": ("12 · The Profit & Loss Statement", "Cinema: April's movie plays · Khata the usher turns non-P&L items away"),
    "L13": ("13 · The Balance Sheet", "Camera flash · polaroid develops · profit ribbon flows into equity"),
    "L14": ("14 · Where Did the Money Go?  · Final checkpoint", "Coin waterfall from sources to galla · night rhyme · Khata hands itself over"),
}

TILE_W, TILE_H = 640, 360
LABEL_W = 420
PAD = 16
BG, INK, MUTED, BAND = (24, 26, 36), (240, 236, 228), (165, 160, 170), (122, 98, 201)

def font(size, bold=False):
    path = "/System/Library/Fonts/Avenir Next.ttc"
    return ImageFont.truetype(path, size, index=(2 if bold else 0))

F_TITLE, F_HEAD, F_LES, F_NOTE = font(44, True), font(26, True), font(26, True), font(20)

def tile(style, lesson):
    p = ROOT / SRC / style / f"{lesson}.png"
    if not p.exists():
        img = Image.new("RGB", (TILE_W, TILE_H), (50, 50, 60))
        ImageDraw.Draw(img).text((20, 20), "missing", fill=MUTED, font=F_NOTE)
        return img
    img = Image.open(p).convert("RGB")
    img = img.resize((TILE_W, int(img.height * TILE_W / img.width)))
    if img.height > TILE_H:  # centre-crop to 16:9
        top = (img.height - TILE_H) // 2
        img = img.crop((0, top, TILE_W, top + TILE_H))
    return img

def wrap(draw, text, f, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=f) <= width: cur = t
        else: lines.append(cur); cur = w
    return lines + [cur]

def sheet(title, modules, out):
    rows = sum(len(ls) for _, ls in modules)
    width = LABEL_W + len(STYLES) * (TILE_W + PAD) + PAD
    head_h, col_h, band_h = 90, 46, 52
    height = head_h + col_h + len(modules) * band_h + rows * (TILE_H + PAD) + PAD
    im = Image.new("RGB", (width, height), BG)
    d = ImageDraw.Draw(im)
    d.text((PAD * 2, 22), title, fill=INK, font=F_TITLE)
    y = head_h
    for i, (_, name) in enumerate(STYLES):
        d.text((LABEL_W + PAD + i * (TILE_W + PAD) + 8, y + 8), name, fill=INK, font=F_HEAD)
    y += col_h
    for mname, lessons in modules:
        d.rectangle((0, y, width, y + band_h - 8), fill=BAND)
        d.text((PAD * 2, y + 8), mname, fill=(255, 255, 255), font=F_HEAD)
        y += band_h
        for les in lessons:
            name, note = LESSONS[les]
            ny = y + 10
            for line in wrap(d, name, F_LES, LABEL_W - PAD * 3):
                d.text((PAD * 2, ny), line, fill=INK, font=F_LES); ny += 34
            ny += 10
            for line in wrap(d, note, F_NOTE, LABEL_W - PAD * 3):
                d.text((PAD * 2, ny), line, fill=MUTED, font=F_NOTE); ny += 28
            for i, (style, _) in enumerate(STYLES):
                im.paste(tile(style, les), (LABEL_W + PAD + i * (TILE_W + PAD), y))
            y += TILE_H + PAD
    im.save(out, quality=88)
    print("wrote", out, im.size)

if __name__ == "__main__":
    sheet("Accounting, Finally — course progression — flat vs paper cut-out" + ("" if SRC == "renders" else " (AI concept images)"), MODULES, ROOT / f"progression-all{TAG}.jpg")
    for n, m in enumerate(MODULES, 1):
        sheet(f"Course progression — {m[0]}", [m], ROOT / f"progression-M{n}{TAG}.jpg")
