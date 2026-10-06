// Paper cut-out construction kit — deterministic, synchronous, SVG.
// Every piece is a hand-cut paper shape (jittered outline) + texture + cardboard drop shadow.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const sh = (n) => hash(n) * 2 - 1;
  let SEED = 1;
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const g = (parent, attrs = {}) => el("g", attrs, parent);
  const f1 = (v) => (+v).toFixed(1);
  const pts2d = (pts) => "M" + pts.map((p) => f1(p[0]) + "," + f1(p[1])).join(" L") + " Z";
  const rad = (d) => (d * Math.PI) / 180;

  // ---------- cutters ----------
  function cutPoly(poly, jag = 2.5, step = 26) {
    const s = SEED++ * 97, pts = [];
    for (let k = 0; k < poly.length; k++) {
      const [x0, y0] = poly[k], [x1, y1] = poly[(k + 1) % poly.length];
      const len = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(len / step));
      const nx = -(y1 - y0) / (len || 1), ny = (x1 - x0) / (len || 1);
      for (let i = 0; i < n; i++) {
        const t = i / n, d = i === 0 ? 0 : sh(s + k * 50 + i) * jag;
        pts.push([x0 + (x1 - x0) * t + nx * d, y0 + (y1 - y0) * t + ny * d]);
      }
    }
    return pts2d(pts);
  }
  function cutRect(x, y, w, h, jag = 3, step = 26) {
    const c = Math.min(w, h) * 0.07;
    return cutPoly([[x + c, y], [x + w - c, y], [x + w, y + c], [x + w, y + h - c], [x + w - c, y + h], [x + c, y + h], [x, y + h - c], [x, y + c]], jag, step);
  }
  function cutEll(cx, cy, rx, ry, jag = 2.2, n) {
    n = n || Math.max(14, Math.round((rx + ry) / 5));
    const s = SEED++ * 53, pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, r = 1 + (sh(s + i) * jag) / Math.max(rx, ry, 1);
      pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]);
    }
    return pts2d(pts);
  }
  function cutStroke(points, width, jag = 1.6) {
    const s = SEED++ * 31, L = [], R = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i], q = points[Math.min(i + 1, points.length - 1)], o = points[Math.max(i - 1, 0)];
      const dx = q[0] - o[0], dy = q[1] - o[1], len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len, hw = width / 2;
      L.push([p[0] + nx * (hw + sh(s + i) * jag), p[1] + ny * (hw + sh(s + i) * jag)]);
      R.push([p[0] - nx * (hw + sh(s + i + 40) * jag), p[1] - ny * (hw + sh(s + i + 40) * jag)]);
    }
    return pts2d(L.concat(R.reverse()));
  }
  const arc = (cx, cy, r, a0, a1, n = 10, ry) => Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * (ry || r)];
  });

  // ---------- materials ----------
  const C = {
    red: "#c8372d", redDark: "#7e211b", redShade: "#a32a22", gold: "#e9b949", goldDark: "#b8862a", brass: "#d9a441",
    ink: "#2b2233", white: "#fbf7ef", pink: "#f29a8f", dr: "#3d7fd9", cr: "#e8862e", teal: "#2fa79a",
    cream: "#fff4e2", navy: "#2b3a55", sky: "#4c9be0", leaf: "#5db96b", coral: "#ef6f5e", saffron: "#f2a33a",
    violet: "#7a62c9", skin: "#b9774f", skinShade: "#9c5f3c", hair: "#2a1b16", mustard: "#e8a93a", apron: "#2a9a8e",
    wood: "#a0693a", woodDark: "#6e4422", grey: "#b9b4ad", glass: "#e3f1f2", chai: "#b8763c", leafTea: "#4a3424",
    crText: "#b0520c", coralText: "#c0392b", drText: "#2c66b8",
  };
  const shadow = (parent, lvl = 1, extra = {}) => g(parent, { filter: `url(#sh${lvl})`, ...extra });
  function paper(parent, d, color, extra = {}) {
    const grp = g(parent, extra);
    el("path", { d, fill: color }, grp);
    el("path", { d, fill: "url(#pat-grain)", style: "mix-blend-mode:multiply", opacity: "0.85" }, grp);
    return grp;
  }
  const tex = (parent, d, pat, extra = {}) => el("path", { d, fill: `url(#${pat})`, ...extra }, parent);
  const ink = (parent, pts, w = 5, color = C.ink, extra = {}) => paper(parent, cutStroke(pts, w, w * 0.12), color, extra);

  // decorative ₹ drawn as strokes (coins / notes)
  function rupee(parent, x, y, size, color) {
    const s = size / 40, w = Math.max(2.5, 5 * s);
    const P = (pts) => pts.map(([px, py]) => [x + px * s, y + py * s]);
    ink(parent, P([[-12, -16], [14, -16]]), w, color);
    ink(parent, P([[-12, -6], [14, -6]]), w, color);
    ink(parent, P([[-12, -16], [-2, -16], ...arc(-2, -6, 10, -Math.PI / 2, Math.PI / 2, 6).map(([a, b]) => [a, b]), [-12, 4], [8, 20]]), w, color);
  }
  const lum = (hex) => { const n = parseInt(hex.slice(1), 16), c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const onColor = (bg) => (lum(bg) > 0.18 ? "#2b2233" : "#ffffff");

  // ---------- text ----------
  // title = series wordmark only (Shrikhand, Latin-only — never for Devanagari or body text)
  const FONT = { kalam: "Kalam, cursive", baloo: "'Baloo 2', sans-serif", title: "Shrikhand, 'Baloo 2', sans-serif" };
  const textW = (t, size, font) => t.length * size * ({ kalam: 0.5, title: 0.55 }[font] || 0.54);
  function text(parent, x, y, t, o = {}) {
    const size = o.size || 44;
    const e = el("text", {
      x, y, "font-family": FONT[o.font || "baloo"], "font-size": size, "font-weight": o.weight || 700,
      fill: o.color || C.ink, "text-anchor": o.anchor || "middle", "dominant-baseline": "central",
      transform: o.rot ? `rotate(${o.rot} ${x} ${y})` : undefined, "letter-spacing": o.ls,
    }, parent);
    e.textContent = t;
    return e;
  }
  // paper label card with text (auto-sized by estimate)
  function label(parent, x, y, t, o = {}) {
    const size = o.size || 44, font = o.font || "baloo";
    const w = o.w || textW(t, size, font) + size * 0.9, h = o.h || size * 1.45;
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${o.rot || 0})` });
    const s = shadow(grp, o.shadow || 1);
    if (o.bg && o.bg !== "paper") paper(s, cutRect(-w / 2, -h / 2, w, h, 2, 22), o.bg);
    else tex(s, cutRect(-w / 2, -h / 2, w, h, 2, 22), "pat-paper");
    const tc = o.bg && o.bg !== "paper" ? onColor(o.bg) : (o.color || C.ink);
    text(grp, 0, size * 0.04, t, { size, font, color: tc, weight: o.weight });
    return grp;
  }

  // ---------- icons (Lucide paths, paper-themed) ----------
  // L01 review: thin UI line icons read as "app", not paper craft. research/paper-icons.md → two treatments:
  //   icon()      = DIE-CUT STICKER: the Lucide path as a solid sticker — cream paper border + coloured core,
  //                 statically roughened edge (#rough, never animated) + short warm shadow.
  //   medallion() = PAPER DISC: coloured construction-paper disc with the icon as thick cream paper strips.
  const ICON_COLOR = {
    coins: "saffron", "indian-rupee": "leaf", banknote: "leaf", "hand-coins": "saffron", package: "sky", milk: "sky",
    handshake: "coral", house: "coral", store: "saffron", calendar: "coral", camera: "violet", film: "violet",
    coffee: "saffron", receipt: "sky", "shopping-bag": "coral", smartphone: "sky", sprout: "leaf", "trending-up": "leaf",
    "trending-down": "coral", user: "sky", "user-round": "sky", x: "coral", zap: "saffron", lightbulb: "saffron",
    check: "leaf", "pencil-line": "saffron", layers: "sky", sigma: "violet", wallet: "coral", "thumbs-up": "leaf", play: "coral",
  };
  const iconColor = (name) => C[ICON_COLOR[name]] || C.teal;
  const iconGroup = (parent, name, x, y, size, stroke, sw) => {
    const grp = g(parent, { transform: `translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`, fill: "none", stroke, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round" });
    grp.innerHTML = window.ICONS[name] || "";
    return grp;
  };
  function icon(parent, name, x, y, size = 48, color = C.ink, sw = 2.2) {
    const grp = g(parent, {});
    const sh = g(grp, { filter: "url(#sh1)" }), rough = g(sh, { filter: "url(#rough)" });
    const border = Math.max(2.6, sw * 2.5);
    iconGroup(rough, name, x, y, size, "url(#pat-paper)", border);   // cream sticker border
    iconGroup(rough, name, x, y, size, color, Math.max(1.8, sw * 1.05)); // coloured core
    return grp;
  }
  function medallion(parent, x, y, r, name, bg = C.white, fg = C.ink) {
    const disc = bg === C.white ? iconColor(name) : bg;
    const s = shadow(parent, 1);
    paper(s, cutEll(x, y, r, r, 1.6), disc);
    const sh = g(parent, { filter: "url(#sh1)" }), rough = g(sh, { filter: "url(#rough)" });
    iconGroup(rough, name, x, y, r * 1.15, "url(#pat-paper)", 3.2);    // thick cream paper strips
  }

  // ---------- set pieces ----------
  function wall(parent, color, y1 = 860) { paper(parent, cutRect(-40, -40, 2000, y1 + 40, 2, 60), color); }
  function table(parent, y = 760) {
    const tp = [];
    for (let i = 0; i <= 48; i++) tp.push([-40 + i * 42, y + sh(900 + i + y) * 9]);
    tp.push([2000, 1130], [-40, 1130]);
    tex(shadow(parent, 2), pts2d(tp), "pat-kraft");
  }
  function cloud(parent, cx, cy, s = 1) {
    const cg = shadow(parent, 1);
    [[0, 0, 70], [60, 10, 55], [-60, 12, 50], [25, -30, 48]].forEach(([dx, dy, r]) => tex(cg, cutEll(cx + dx * s, cy + dy * s, r * s, r * s * 0.8, 2.5), "pat-paper"));
  }
  function stringLights(parent, x0, x1, y, sag = 60, n = 11) {
    const pts = Array.from({ length: 21 }, (_, i) => { const t = i / 20; return [x0 + (x1 - x0) * t, y + Math.sin(t * Math.PI) * sag]; });
    ink(parent, pts, 3, "#1b2236");
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, bx = x0 + (x1 - x0) * t, by = y + Math.sin(t * Math.PI) * sag + 16;
      paper(shadow(parent, 1), cutEll(bx, by, 11, 14, 1), C.gold);
    }
  }
  function coin(parent, x, y, r = 26, rot = 0) {
    const grp = g(parent, { transform: `rotate(${rot} ${x} ${y})`, "data-layout-allow-overlap": "true" });
    const s = shadow(grp, 1);
    paper(s, cutEll(x, y, r, r * 0.96, 1.2), C.goldDark);
    paper(grp, cutEll(x - 2, y - 2, r * 0.82, r * 0.78, 1), C.gold);
    rupee(grp, x - 2, y - 1, r * 1.05, C.goldDark);
    return grp;
  }
  function note(parent, x, y, w = 120, h = 60, rot = 0, color = "#cfe3c4") {
    const grp = g(parent, { transform: `rotate(${rot} ${x} ${y})`, "data-layout-allow-overlap": "true" });
    paper(shadow(grp, 1), cutRect(x - w / 2, y - h / 2, w, h, 1.8, 16), color);
    paper(grp, cutRect(x - w / 2 + 8, y - h / 2 + 8, w - 16, h - 16, 1.2, 16), "#b9d4ab", { opacity: 0.7 });
    rupee(grp, x, y, h * 0.6, "#4f7a45");
    return grp;
  }
  function bundle(parent, x, y, s = 1, rot = 0) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
    for (let i = 0; i < 3; i++) note(grp, i * 4, -i * 6, 130, 64, i * 2 - 2);
    paper(grp, cutRect(-12, -42, 24, 70, 1, 12), C.white);
    return grp;
  }
  function galla(parent, x, y, s = 1, o = {}) {
    // small wooden cash box with brass clasp; (x,y) = bottom centre
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const b = shadow(grp, 2);
    if (o.open) paper(b, cutPoly([[-95, -110], [95, -110], [105, -175], [-85, -165]], 2), C.woodDark); // open lid behind
    paper(b, cutRect(-100, -110, 200, 110, 2.5), C.wood);
    ink(grp, [[-90, -60], [90, -60]], 3, C.woodDark, { opacity: 0.6 });
    if (o.open && o.overflow) {
      for (let i = 0; i < 7; i++) note(grp, -70 + i * 24, -118 - (i % 3) * 10, 90, 46, sh(i + 70) * 18);
      for (let i = 0; i < 4; i++) coin(grp, -60 + i * 40, -120 + (i % 2) * 6, 16);
    }
    if (!o.open) paper(shadow(grp, 1), cutRect(-104, -128, 208, 26, 2), C.woodDark);
    paper(shadow(grp, 1), cutRect(-14, -96, 28, 30, 1.2, 10), C.brass);
    return grp;
  }
  function jar(parent, x, y, w = 150, h = 190, o = {}) {
    // (x,y) bottom centre
    const grp = g(parent, { transform: `translate(${x} ${y})` });
    const s = shadow(grp, 2);
    paper(s, cutRect(-w / 2, -h, w, h, 2, 20), C.glass, { opacity: 0.9 });
    const fill = o.fill ?? 0.6;
    if (o.contents === "coins") for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3), col = i % 3;
      if ((row + 1) / 3 > fill + 0.05) continue;
      coin(grp, -w / 3 + col * (w / 3), -24 - row * 34 + sh(i) * 3, Math.min(22, w / 7), sh(i + 9) * 20);
    }
    if (o.contents === "leaves") paper(grp, cutRect(-w / 2 + 8, -h * fill, w - 16, h * fill - 8, 2.5, 12), C.leafTea);
    if (o.contents === "notes") for (let i = 0; i < 4; i++) note(grp, sh(i) * 10, -30 - i * 26, w * 0.7, 40, sh(i + 3) * 12);
    paper(grp, cutRect(-w / 2 + 10, -h + 10, 14, h - 30, 1, 20), "#ffffff", { opacity: 0.55 });
    paper(shadow(grp, 1), cutRect(-w / 2 - 6, -h - 26, w + 12, 30, 2, 18), C.woodDark);
    return grp;
  }
  function tumbler(parent, x, y, s = 1) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    paper(shadow(grp, 1), cutPoly([[-18, -52], [18, -52], [14, 0], [-14, 0]], 1, 12), C.glass, { opacity: 0.95 });
    paper(grp, cutPoly([[-16, -34], [16, -34], [14, -2], [-14, -2]], 1, 12), C.chai);
    return grp;
  }
  function kettle(parent, x, y, s = 1) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const b = shadow(grp, 1);
    paper(b, cutRect(-42, -20, 84, 22, 1.5, 14), "#3b3238"); // stove
    paper(b, cutEll(0, -58, 44, 38, 1.8), C.brass);
    paper(b, cutStroke([[36, -62], [64, -84], [74, -86]], 10, 1), C.brass);
    paper(b, cutStroke(arc(0, -92, 30, Math.PI, Math.PI * 2, 10), 7, 1), C.goldDark);
    paper(b, cutEll(0, -96, 10, 7, 1), C.goldDark);
    [[-10, -150], [16, -190], [-4, -230]].forEach(([sx, sy], i) => paper(grp, cutStroke(arc(sx, sy + 30, 14, Math.PI * 0.5, Math.PI * 1.5, 6), 8, 1.2), C.cream, { opacity: 0.85 - i * 0.2 }));
    return grp;
  }
  function stall(parent, x, y, s = 1, o = {}) {
    // chai cart; (x,y) = ground centre
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const back = shadow(grp, 2);
    [-180, 180].forEach((px) => paper(back, cutRect(px - 9, -560, 18, 300, 1.5, 30), C.woodDark));
    // awning (scalloped stripes)
    const aw = shadow(grp, 2);
    const AX = -250, AW = 500, AY = -640, AH = 110, N = 8;
    for (let i = 0; i < N; i++) {
      const x0 = AX + (AW / N) * i, x1 = x0 + AW / N;
      const scal = arc((x0 + x1) / 2, AY + AH, (x1 - x0) / 2, 0, Math.PI, 8, 26);
      paper(aw, cutPoly([[x0, AY], [x1, AY], ...scal.map(([px, py]) => [px, py]).reverse().reverse()], 1.5, 18), i % 2 ? C.cream : C.saffron);
    }
    paper(aw, cutRect(AX - 10, AY - 22, AW + 20, 30, 2, 24), C.saffron);
    if (o.face) {
      const fy = -520;
      [-70, 70].forEach((ex) => { paper(shadow(grp, 1), cutEll(ex, fy, 34, 34, 1.5), C.white); paper(grp, cutEll(ex + 4, fy + 6, 15, 15, 1), C.ink); });
      paper(grp, cutStroke(arc(0, -420, 90, Math.PI * 0.15, Math.PI * 0.85, 12, 40), 10, 1), C.ink);
    }
    // body
    const body = shadow(grp, 2);
    paper(body, cutRect(-210, -300, 420, 34, 2.5), C.woodDark);
    paper(body, cutRect(-195, -270, 390, 170, 3), C.wood);
    [-210, -170, -130].forEach((py, i) => ink(grp, [[-185, py + 70], [185, py + 70 + sh(i) * 2]], 3, C.woodDark, { opacity: 0.55 }));
    // wheels
    [-120, 120].forEach((wx) => {
      const w = shadow(grp, 2);
      paper(w, cutEll(wx, -60, 60, 60, 2), "#3b2a20");
      paper(w, cutEll(wx, -60, 44, 44, 1.5), C.wood);
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; ink(grp, [[wx, -60], [wx + Math.cos(a) * 42, -60 + Math.sin(a) * 42]], 5, "#3b2a20"); }
      paper(grp, cutEll(wx, -60, 10, 10, 1), C.brass);
    });
    // counter props
    if (!o.noProps) {
      for (let i = 0; i < 4; i++) tumbler(grp, -175 + i * 42, -300);
      kettle(grp, 130, -300);
      if (o.galla !== false) galla(grp, -10, -300, 0.62, { open: !!o.gallaOpen, overflow: !!o.gallaOpen });
    }
    return grp;
  }
  function crate(parent, x, y, w = 170, h = 120) {
    const grp = shadow(parent, 2);
    paper(grp, cutRect(x - w / 2, y - h, w, h, 2.5), C.wood);
    ink(parent, [[x - w / 2 + 10, y - h / 2], [x + w / 2 - 10, y - h / 2]], 4, C.woodDark, { opacity: 0.6 });
    ink(parent, [[x - w / 2 + 14, y - h + 12], [x + w / 2 - 14, y - 12]], 4, C.woodDark, { opacity: 0.45 });
  }

  // ---------- people (paper puppets) ----------
  // (x,y) = between the feet. Arm angles in degrees from hanging-down, positive = swing outward/up.
  function armPiece(parent, side, sx, sy, a1, a2, L1, L2, sleeve, foreColor, skin, wSleeve = 38, wFore = 31) {
    const A1 = rad(a1), A2 = rad(a1 + a2);
    const ex = sx + side * Math.sin(A1) * L1, ey = sy + Math.cos(A1) * L1;
    const hx = ex + side * Math.sin(A2) * L2, hy = ey + Math.cos(A2) * L2;
    const s = shadow(parent, 1);
    paper(s, cutStroke([[sx, sy], [ex, ey]], wSleeve, 1.4), sleeve);
    paper(s, cutStroke([[ex, ey], [hx, hy]], wFore, 1.2), foreColor);
    paper(s, cutEll(hx, hy, 17, 17, 1.2), skin);
    paper(parent, cutEll(sx, sy, 6, 6, 0.6), C.gold); // split-pin brad
    return [hx, hy];
  }
  function face(parent, cx, cy, expr = "happy", o = {}) {
    const eyeDX = 21, ey = cy - 2;
    const lookX = o.lookX || 0, lookY = o.lookY || 0;
    [-1, 1].forEach((sd) => {
      paper(parent, cutEll(cx + sd * eyeDX, ey, 11, 13, 0.8), C.white);
      paper(parent, cutEll(cx + sd * eyeDX + lookX, ey + 2 + lookY, 6.5, 6.5, 0.4), C.ink);
    });
    paper(parent, cutEll(cx - 33, cy + 20, 11, 7, 0.6), C.pink, { opacity: 0.75 });
    paper(parent, cutEll(cx + 33, cy + 20, 11, 7, 0.6), C.pink, { opacity: 0.75 });
    const brow = (sd, lift = 0, tilt = 0) => ink(parent, [[cx + sd * 12, cy - 22 - lift + tilt * sd], [cx + sd * 30, cy - 24 - lift - tilt * sd]], 4.5);
    const m = (pts) => ink(parent, pts, 4.5);
    if (expr === "happy") { brow(-1); brow(1); m(arc(cx, cy + 18, 14, Math.PI * 0.15, Math.PI * 0.85, 8)); }
    if (expr === "grin") { brow(-1, 3); brow(1, 3); paper(parent, pts2d([[cx - 17, cy + 18], [cx + 17, cy + 18], ...arc(cx, cy + 18, 17, 0, Math.PI, 8).slice(1, -1)]), C.ink); paper(parent, cutEll(cx, cy + 30, 8, 4, 0.4), C.pink); }
    if (expr === "puzzled") { brow(-1, 0, 0); brow(1, 9, -3); m([[cx - 10, cy + 25], [cx - 3, cy + 21], [cx + 4, cy + 25], [cx + 11, cy + 21]]); }
    if (expr === "amazed") { brow(-1, 8); brow(1, 8); paper(parent, cutEll(cx, cy + 26, 8, 10, 0.5), C.ink); }
    if (expr === "worried") { brow(-1, 4, -4); brow(1, 4, -4); m(arc(cx, cy + 32, 12, Math.PI * 1.15, Math.PI * 1.85, 8)); }
  }
  function person(parent, x, y, s, P) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${(P.flip ? -1 : 1) * s} ${s})` });
    const sit = P.sit ? 110 : 0;
    const top = g(grp, { transform: `translate(0 ${sit})` });
    // legs + feet
    if (!P.noLegs) {
      const legs = shadow(grp, 1);
      if (P.sit) {
        paper(legs, cutRect(-48, -70, 40, 58, 1.5, 14), P.legs);
        paper(legs, cutRect(8, -70, 40, 58, 1.5, 14), P.legs);
      } else {
        paper(legs, cutRect(-44, -190, 40, 176, 1.5, 18), P.legs);
        paper(legs, cutRect(4, -190, 40, 176, 1.5, 18), P.legs);
      }
      paper(legs, cutEll(-28, -10, 26, 12, 1), P.shoes || "#4a2f25");
      paper(legs, cutEll(28, -10, 26, 12, 1), P.shoes || "#4a2f25");
    }
    const T = P.topBottom || -165;
    // back hair (behind body)
    if (P.hair === "bun" || P.hair === "pony") paper(shadow(top, 1), cutEll(0, -505, 66, 72, 1.6), C.hair);
    if (P.hair === "pony") paper(shadow(top, 1), cutPoly([[30, -520], [70, -480], [60, -400], [36, -420]], 2, 14), C.hair);
    // torso
    const torso = shadow(top, 2);
    const bw = P.belly ? 104 : 84;
    paper(torso, cutPoly([[-62, -400], [62, -400], [bw, T], [-bw, T]], 2.2, 22), P.top);
    if (P.belly) paper(torso, cutEll(0, -270, 92, 96, 2), P.top);
    if (P.apron) {
      paper(torso, cutPoly([[-50, -345], [50, -345], [60, T - 12], [-60, T - 12]], 1.8, 20), C.apron);
      ink(top, [[-44, -345], [-16, -400]], 7, C.apron);
      ink(top, [[44, -345], [16, -400]], 7, C.apron);
      paper(top, cutRect(-30, -280, 60, 44, 1.2, 14), "#24877c");
    }
    if (P.lanyard) {
      ink(top, [[-18, -398], [0, -320], [18, -398]], 5, C.coral);
      paper(shadow(top, 1), cutRect(-18, -322, 36, 46, 1, 12), C.white);
    }
    // neck + head
    paper(top, cutRect(-15, -445, 30, 52, 1, 12), P.skin);
    if (P.collar) paper(top, cutPoly([[-22, -402], [0, -372], [22, -402]], 1, 12), P.skin);
    const head = shadow(top, 1);
    paper(head, cutEll(-56, -495, 11, 15, 0.8), P.skin);
    paper(head, cutEll(56, -495, 11, 15, 0.8), P.skin);
    paper(head, cutEll(0, -494, 57, 63, 1.4), P.skin);
    if (P.earrings) { paper(top, cutEll(-57, -474, 5, 5, 0.4), C.gold); paper(top, cutEll(57, -474, 5, 5, 0.4), C.gold); }
    // hair front
    if (P.hair === "bun" || P.hair === "pony") {
      paper(top, cutPoly([...arc(0, -500, 64, Math.PI * 1.02, Math.PI * 1.98, 14), [44, -520], [10, -540], [-20, -528], [-50, -505]], 1.4, 14), C.hair);
    }
    if (P.hair === "bun") {
      paper(shadow(top, 1), cutEll(26, -572, 36, 32, 1.4), C.hair);
      const pg = shadow(top, 1);
      paper(pg, cutStroke([[-22, -606], [74, -548]], 11, 0.6), C.gold);
      paper(pg, cutStroke([[74, -548], [88, -540]], 11, 0.4), C.pink);
      paper(pg, cutPoly([[-22, -612], [-22, -600], [-38, -614]], 0.3, 12), "#e8c9a0");
    }
    if (P.hair === "bald") {
      paper(top, cutPoly([[-60, -500], [-58, -530], [-44, -540], [-40, -505]], 1, 10), C.grey);
      paper(top, cutPoly([[60, -500], [58, -530], [44, -540], [40, -505]], 1, 10), C.grey);
    }
    if (P.topi) paper(shadow(top, 1), cutPoly([[-58, -538], [58, -538], [44, -582], [-44, -582]], 1.5, 16), C.white);
    face(top, 0, -490, P.expr || "happy", P);
    if (P.moustache) paper(top, cutPoly([[-34, -466], [-4, -476], [0, -470], [4, -476], [34, -466], [24, -458], [0, -464], [-24, -458]], 0.8, 8), C.grey);
    if (P.glasses) { ink(top, arc(-21, -492, 16, 0, Math.PI * 2, 14), 3.5); ink(top, arc(21, -492, 16, 0, Math.PI * 2, 14), 3.5); }
    // arms (drawn last so hands sit on top)
    const sleeve = P.top, fore = P.longSleeve ? P.top : P.skin;
    const hL = armPiece(top, -1, -60, -392, P.aL[0], P.aL[1], 105, 100, sleeve, fore, P.skin);
    const hR = armPiece(top, 1, 60, -392, P.aR[0], P.aR[1], 105, 100, sleeve, fore, P.skin);
    const toWorld = ([hx, hy]) => [x + (P.flip ? -1 : 1) * hx * s, y + (hy + sit) * s];
    return { g: grp, handL: toWorld(hL), handR: toWorld(hR), top };
  }
  const meera = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: C.skin, top: C.mustard, legs: C.cream, apron: true, hair: "bun", earrings: true, collar: true,
    aL: [12, 8], aR: [12, 8], ...o,
  });
  const raviMama = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#a96a45", top: C.white, legs: C.white, belly: true, hair: "bald", moustache: true, longSleeve: true,
    topBottom: -150, shoes: "#3b2a20", aL: [12, 8], aR: [12, 8], ...o,
  });
  const priya = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#c08560", top: C.sky, legs: "#34405a", hair: "pony", lanyard: true, collar: true, longSleeve: true,
    topBottom: -215, aL: [12, 8], aR: [12, 8], ...o,
  });
  const merchant = (parent, x, y, s, o = {}) => person(parent, x, y, s, {
    skin: "#a96a45", top: C.white, legs: C.white, hair: "bald", moustache: true, topi: true, longSleeve: true,
    noLegs: true, aL: [12, 8], aR: [12, 8], ...o,
  });
  function umbrella(parent, x, y, s = 1, rot = 0) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
    const b = shadow(grp, 1);
    paper(b, cutStroke(arc(-14, 0, 14, 0, Math.PI, 8), 8, 0.6), "#3b2a20");
    paper(b, cutStroke([[0, 0], [0, 230]], 8, 0.6), "#3b2a20");
    paper(b, cutPoly([[0, 40], [22, 200], [0, 236], [-22, 200]], 1.2, 14), "#2b2a33");
    return grp;
  }
  function slip(parent, x, y, s = 1, rot = 0, iconName = "handshake") {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
    tex(shadow(grp, 1), cutRect(-60, -44, 120, 88, 1.6, 16), "pat-paper");
    icon(grp, iconName, 0, -6, 46, C.ink, 2.2);
    ink(grp, [[-40, 28], [40, 28]], 3, "#a39684");
    return grp;
  }
  function faceTag(parent, x, y, who = "meera", s = 1, rot = 0) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})` });
    tex(shadow(grp, 1), cutPoly([[-34, -28], [40, -28], [40, 28], [-34, 28], [-50, 0]], 1.4, 14), "pat-paper");
    paper(grp, cutEll(-46, 0, 5, 5, 0.4), "#a39684");
    const sk = who === "ravi" ? "#a96a45" : who === "priya" ? "#c08560" : C.skin;
    paper(grp, cutEll(6, 2, 22, 24, 1), sk);
    if (who === "meera") { paper(grp, cutPoly([...arc(6, 0, 24, Math.PI * 1.05, Math.PI * 1.95, 8), [6, -16]], 0.6, 8), C.hair); paper(grp, cutEll(14, -24, 9, 8, 0.4), C.hair); }
    if (who === "ravi") paper(grp, cutPoly([[-8, 10], [6, 6], [20, 10], [6, 14]], 0.4, 6), C.grey);
    if (who === "priya") paper(grp, cutPoly([...arc(6, 0, 24, Math.PI * 1.05, Math.PI * 1.95, 8), [6, -16]], 0.6, 8), C.hair);
    paper(grp, cutEll(-2, 0, 2.6, 2.6, 0.2), C.ink); paper(grp, cutEll(14, 0, 2.6, 2.6, 0.2), C.ink);
    return grp;
  }

  // ---------- Khata ----------
  function khata(parent, x, y, s = 1, o = {}) {
    const open = o.open !== false;
    const root = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    el("ellipse", { cx: 0, cy: 2, rx: open ? 420 : 150, ry: 18, fill: "#3b2614", "fill-opacity": 0.25 }, root);
    const body = g(root, {});
    const feet = shadow(body, 1);
    paper(feet, cutRect(-64, -32, 46, 36, 2, 14), C.redDark);
    paper(feet, cutRect(18, -32, 46, 36, 2, 14), C.redDark);
    if (open) [-1, 1].forEach((side) => {
      const pos = g(body, { transform: `translate(${side * 86} 0)` });
      const x0 = side < 0 ? -346 : 0;
      const board = shadow(pos, 2);
      paper(board, cutRect(x0, -362, 346, 334, 3), C.redDark);
      tex(board, cutRect(side < 0 ? -340 : 0, -374, 340, 332, 3), "pat-cover");
      const pg = shadow(pos, 1);
      const px = side < 0 ? -326 : 8;
      tex(pg, cutRect(px, -358, 318, 302, 2.4), "pat-paper");
      const sheet = side < 0 ? o.left : o.right;
      if (!o.blankPages) for (let i = 0; i < 6; i++) {
        const yy = -300 + i * 40, wv = [];
        for (let k = 0; k <= 10; k++) wv.push([px + 14 + k * 29, yy + sh(SEED * 3 + k + i * 11) * 1.2]);
        el("path", { d: "M" + wv.map((p) => p.join(",")).join(" L"), fill: "none", stroke: "#a39684", "stroke-width": 2, opacity: 0.7 }, pg);
      }
      if (sheet) paper(pos, cutRect(px + 10, -348, 298, 282, 3), sheet === "blue" ? C.dr : C.cr, { opacity: 0.88 });
      if (o.pageContent) o.pageContent(pos, side, px);
    });
    const handPos = [];
    [-1, 1].forEach((side) => {
      const ax = open ? side * 432 : side * 86;
      const ang = (side < 0 ? o.armL : o.armR) ?? (open ? 20 : 15);
      const A = g(body, { transform: `translate(${ax} -190) rotate(${side < 0 ? ang : -ang})` });
      const st = shadow(A, 1);
      paper(st, cutStroke([[0, 0], [side * 28, 8], [side * 50, 22], [side * 62, 32]], 20, 1.4), C.redShade);
      paper(st, cutEll(side * 64, 34, 16, 16, 1.5), C.redShade);
      paper(A, cutEll(0, 0, 7, 7, 0.8), C.gold);
      const a = rad(side < 0 ? ang : -ang), hx = side * 64, hy = 34;
      handPos.push([x + s * (ax + hx * Math.cos(a) - hy * Math.sin(a)), y + s * (-190 + hx * Math.sin(a) + hy * Math.cos(a))]);
    });
    const sp = shadow(body, 2);
    tex(sp, cutRect(-90, -392, 180, 370, 3), "pat-cover");
    el("path", { d: cutRect(36, -388, 50, 362, 2), fill: "#000", opacity: 0.16 }, sp);
    const band = shadow(body, 1);
    paper(band, cutRect(-92, -113, 184, 16, 1.5, 18), C.gold);
    paper(band, cutStroke(arc(-22, -118, 18, Math.PI * 0.05, Math.PI * 1.95, 14), 8, 1), C.gold);
    paper(band, cutStroke(arc(22, -118, 18, -Math.PI * 0.95, Math.PI * 0.95, 14), 8, 1), C.gold);
    paper(band, cutStroke([[-4, -104], [-18, -70]], 8, 1), C.gold);
    paper(band, cutStroke([[4, -104], [18, -70]], 8, 1), C.gold);
    paper(band, cutEll(0, -106, 10, 10, 1), C.gold);
    const fc = g(body, {});
    paper(fc, cutEll(-50, -212, 18, 11, 1.2), C.pink, { opacity: 0.85 });
    paper(fc, cutEll(50, -212, 18, 11, 1.2), C.pink, { opacity: 0.85 });
    const lx = o.lookX || 0, ly = o.lookY || 0;
    [-1, 1].forEach((side) => {
      const ex = side * 38;
      if (o.wink && side > 0) { ink(fc, arc(ex, -278, 22, Math.PI * 0.15, Math.PI * 0.85, 10), 7); return; }
      paper(shadow(fc, 1), cutEll(ex, -268, 25, 30, 1.6), C.white);
      paper(fc, cutEll(ex + lx, -264 + ly, 13, 13, 1), C.ink);
      paper(fc, cutEll(ex + lx - 4, -269 + ly, 4.5, 4.5, 0.5), C.white);
    });
    if (o.mouth === "o") paper(fc, cutEll(0, -196, 11, 13, 0.6), C.ink);
    else {
      paper(shadow(fc, 1), pts2d([[-22, -212], [0, -207], [22, -212], ...arc(0, -212, 22, 0, Math.PI, 10).slice(1, -1).map(([px, py]) => [px, -212 + (py + 212) * 1.2])]), C.ink);
      paper(fc, cutEll(0, -192, 10, 6, 0.6), C.pink);
    }
    return { g: root, handL: handPos[0], handR: handPos[1] };
  }
  function smallBook(parent, x, y, w = 70, h = 150, iconName, rot = 0) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot})` });
    tex(shadow(grp, 1), cutRect(-w / 2, -h, w, h, 1.6, 18), "pat-cover");
    paper(grp, cutRect(-w / 2, -h * 0.32, w, 10, 0.8, 14), C.gold);
    if (iconName) { paper(grp, cutEll(0, -h * 0.66, w * 0.34, w * 0.34, 0.8), C.cream); icon(grp, iconName, 0, -h * 0.66, w * 0.42, C.ink, 2.4); }
    return grp;
  }

  // ---------- documents / diagrams ----------
  // opts (7th arg, or pass an object as 6th/7th): { resultFrames: 2 } → two ruled RESULT frames (Gross / Net) after the picture frames.
  function filmStrip(parent, x, y, w, h, frames = [], rot = 0, opts = {}) {
    if (rot && typeof rot === "object") { opts = rot; rot = opts.rot || 0; }
    const rf = opts.resultFrames || 0;
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot})` });
    paper(shadow(grp, 1), cutRect(-w / 2, -h / 2, w, h, 1.6, 20), "#2a2530");
    const n = frames.length || 3, cells = n + rf, fw = (w - 30) / cells;
    for (let i = 0; i < Math.round(w / 34); i++) {
      paper(grp, cutRect(-w / 2 + 8 + i * 34, -h / 2 + 6, 16, 12, 0.5, 8), C.cream);
      paper(grp, cutRect(-w / 2 + 8 + i * 34, h / 2 - 18, 16, 12, 0.5, 8), C.cream);
    }
    grp.resultFrames = [];
    for (let i = 0; i < cells; i++) {
      const fx = -w / 2 + 15 + i * fw + fw / 2;
      if (i < n) {
        paper(grp, cutRect(fx - fw / 2 + 5, -h / 2 + 24, fw - 10, h - 48, 1, 14), C.saffron);
        if (frames[i]) icon(grp, frames[i], fx, 0, Math.min(fw, h - 48) * 0.6, C.ink, 2.4);
      } else {
        // ruled result frame: cream paper, two thin ledger rules + one heavy result rule
        const fh = h - 48, fx0 = fx - fw / 2 + 5, fy0 = -h / 2 + 24, fww = fw - 10;
        paper(grp, cutRect(fx0, fy0, fww, fh, 1, 14), C.cream);
        for (let k = 0; k < 2; k++) ink(grp, [[fx0 + 10, fy0 + fh * (0.3 + k * 0.22)], [fx0 + fww - 10, fy0 + fh * (0.3 + k * 0.22)]], 2, "#a39684", { opacity: 0.8 });
        ink(grp, [[fx0 + 10, fy0 + fh * 0.84], [fx0 + fww - 10, fy0 + fh * 0.84]], 5, C.ink);
        grp.resultFrames.push({ cx: fx, cy: 0, w: fww, h: fh, ruleY: fy0 + fh * 0.84 });
      }
    }
    return grp;
  }
  // opts (8th arg, or an object as 6th/7th): { twoColumn: true, date: "30 Apr" } → Balance-Sheet photo:
  // Assets (blue) | Liabilities + Equity (orange), ruled rows, date in the white margin. grp.cols.{L,R} = column rects (grp-local).
  function polaroid(parent, x, y, w, h, rot = 0, content, opts = {}) {
    if (rot && typeof rot === "object") { opts = rot; rot = opts.rot || 0; content = opts.content; }
    if (content && typeof content === "object") { opts = content; content = opts.content; }
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot})` });
    tex(shadow(grp, 2), cutRect(-w / 2, -h / 2, w, h, 1.8, 20), "pat-paper");
    const pw = w - 30, ph = h - 80, px0 = -pw / 2, py0 = -h / 2 + 15;
    if (!opts.twoColumn) paper(grp, cutRect(px0, py0, pw, ph, 1, 18), C.sky);
    else {
      paper(grp, cutRect(px0, py0, pw, ph, 1, 18), "#fffaf0");
      const hh = Math.max(24, ph * 0.15), cw = pw / 2, fs = Math.max(12, Math.min(34, pw * 0.075));
      grp.cols = {};
      [["L", C.dr, ["Assets"]], ["R", C.cr, ["Liabilities", "+ Equity"]]].forEach(([k, col, lines], i) => {
        const cx0 = px0 + i * cw;
        paper(grp, cutRect(cx0 + 3, py0 + 3, cw - 6, hh, 0.8, 14), col);
        lines.forEach((ln, li) => text(grp, cx0 + cw / 2, py0 + 3 + hh / 2 + (li - (lines.length - 1) / 2) * fs * 1.05, ln, { size: lines.length > 1 ? fs * 0.82 : fs, weight: 800, color: onColor(col) }));
        const rowsTop = py0 + hh + 14, rowsH = ph - hh - 20;
        for (let r = 0; r < 4; r++) ink(grp, [[cx0 + 12, rowsTop + rowsH * (0.14 + r * 0.2)], [cx0 + cw - 12, rowsTop + rowsH * (0.14 + r * 0.2)]], 2, "#a39684", { opacity: 0.8 });
        ink(grp, [[cx0 + 12, rowsTop + rowsH * 0.94], [cx0 + cw - 12, rowsTop + rowsH * 0.94]], 4, C.ink);
        grp.cols[k] = { x: cx0 + 3, y: py0 + hh + 6, w: cw - 6, h: ph - hh - 9, cx: cx0 + cw / 2 };
      });
      ink(grp, [[px0 + cw, py0 + 3], [px0 + cw, py0 + ph - 3]], 3, C.ink, { opacity: 0.7 });
      text(grp, 0, -h / 2 + h - 38, opts.date || "30 Apr", { size: Math.max(20, Math.min(44, w * 0.12)), font: "kalam", weight: 400 });
    }
    if (content) content(grp, px0, py0, pw, ph);
    return grp;
  }
  function card(parent, x, y, w, h, o = {}) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${o.rot || 0})` });
    tex(shadow(grp, o.shadow || 2), cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.header) {
      paper(grp, cutRect(-w / 2 + 6, -h / 2 + 6, w - 12, o.headerH || 70, 1.5, 22), o.header);
      if (o.title) text(grp, 0, -h / 2 + 6 + (o.headerH || 70) / 2, o.title, { size: o.titleSize || 40, color: onColor(o.header), weight: 800 });
    }
    return grp;
  }
  // statement rows: [label, value, {bold, color, line}]
  function rows(parent, x0, y0, w, rowH, list, o = {}) {
    list.forEach(([l, v, st = {}], i) => {
      const y = y0 + i * rowH;
      if (st.line) ink(parent, [[x0, y - rowH * 0.5], [x0 + w, y - rowH * 0.5]], 3, C.ink, { opacity: 0.6 });
      text(parent, x0, y, l, { size: o.size || 34, anchor: "start", font: o.font || "baloo", weight: st.bold ? 800 : 600, color: st.color || C.ink });
      if (v !== undefined) text(parent, x0 + w, y, v, { size: o.size || 34, anchor: "end", weight: st.bold ? 800 : 700, color: st.color || C.ink });
    });
  }
  function scale(parent, cx, gy, s = 1, o = {}) {
    // traditional brass taraazu; returns pan centres (world)
    const grp = g(parent, { transform: `translate(${cx} ${gy}) scale(${s})` });
    const t = o.tilt || 0, BY = -560, half = 380;
    const L = [-half, BY + t], R = [half, BY - t];
    const b = shadow(grp, 2);
    paper(b, cutPoly([[-120, 0], [120, 0], [70, -40], [-70, -40]], 2, 20), C.brass);
    paper(b, cutRect(-16, BY + 10, 32, -BY - 40, 1.6, 30), C.brass);
    paper(b, cutStroke([L, [0, BY], R], 22, 1.5), C.goldDark);
    paper(b, cutEll(0, BY, 22, 22, 1), C.brass);
    const pans = [];
    [L, R].forEach(([px, py], i) => {
      const panY = py + 250;
      ink(grp, [[px, py], [px - 120, panY]], 3, C.goldDark);
      ink(grp, [[px, py], [px + 120, panY]], 3, C.goldDark);
      const pg = shadow(grp, 2);
      const tint = i === 0 ? (o.leftTint || C.brass) : (o.rightTint || C.brass);
      paper(pg, cutPoly([[px - 150, panY], [px + 150, panY], [px + 110, panY + 44], [px - 110, panY + 44]], 1.6, 18), tint);
      pans.push([cx + px * s, gy + panY * s]);
    });
    return { g: grp, pans };
  }
  function gauge(parent, x, y, r, frac, o = {}) {
    // half-dial; frac 0..1 = needle position
    const grp = g(parent, { transform: `translate(${x} ${y})` });
    tex(shadow(grp, 2), cutPoly([...arc(0, 0, r, Math.PI, Math.PI * 2, 18), [r, 24], [-r, 24]], 2, 20), "pat-paper");
    [0, 0.25, 0.5, 0.75, 1].forEach((f) => { const a = Math.PI + f * Math.PI; ink(grp, [[Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78], [Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92]], 5); });
    paper(grp, cutPoly([...arc(0, 0, r * 0.7, Math.PI * 1.55, Math.PI * 2, 8), ...arc(0, 0, r * 0.6, Math.PI * 2, Math.PI * 1.55, 8)], 0.6, 10), o.color || C.leaf, { opacity: 0.9 });
    const a = Math.PI + frac * Math.PI;
    paper(shadow(grp, 1), cutStroke([[0, 0], [Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82]], 12, 0.8), C.red);
    paper(grp, cutEll(0, 0, 16, 16, 1), C.ink);
    if (o.icon) medallion(grp, 0, -r * 0.42, r * 0.17, o.icon);
    return grp;
  }
  function stamp(parent, x, y, r = 70, rot = -12) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot})`, opacity: 0.9 });
    ink(grp, arc(0, 0, r, 0, Math.PI * 2, 24), 9, C.red);
    ink(grp, [[-r * 0.45, -r * 0.45], [r * 0.45, r * 0.45]], 14, C.red);
    ink(grp, [[r * 0.45, -r * 0.45], [-r * 0.45, r * 0.45]], 14, C.red);
    return grp;
  }
  function arrowShape(parent, x, y, len, color, dir = 1, rot = 0, thick = 26) {
    const grp = g(parent, { transform: `translate(${x} ${y}) rotate(${rot}) scale(${dir} 1)` });
    const h = thick, hl = thick * 1.9;
    paper(shadow(grp, 2), cutPoly([[len / 2, -h / 2], [-len / 2 + hl, -h / 2], [-len / 2 + hl, -h * 1.3], [-len / 2, 0], [-len / 2 + hl, h * 1.3], [-len / 2 + hl, h / 2], [len / 2, h / 2]], 1.6, 16), color);
    return grp;
  }
  function curveArrow(parent, pts, color, w = 16) {
    paper(shadow(parent, 1), cutStroke(pts, w, 1.2), color);
    const [p1, p0] = [pts[pts.length - 1], pts[pts.length - 2]];
    const a = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), L = w * 2.2;
    paper(shadow(parent, 1), cutPoly([[p1[0] + Math.cos(a) * L * 0.6, p1[1] + Math.sin(a) * L * 0.6], [p1[0] + Math.cos(a + 2.4) * L, p1[1] + Math.sin(a + 2.4) * L], [p1[0] + Math.cos(a - 2.4) * L, p1[1] + Math.sin(a - 2.4) * L]], 1, 12), color);
  }
  function sparkle(parent, x, y, r = 28, color = C.gold) {
    const p = [];
    for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * 0.32 : r, a = (i / 8) * Math.PI * 2 - Math.PI / 2; p.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    paper(shadow(parent, 1), pts2d(p), color);
  }
  function qmark(parent, x, y, s = 1, color = C.dr) {
    const grp = g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const sg = shadow(grp, 1);
    paper(sg, cutStroke([[-16, -40], ...arc(4, -44, 20, Math.PI, Math.PI * 2.25, 12), [6, -22], [2, -10]], 11, 1.2), color);
    paper(sg, cutEll(2, 8, 8, 8, 1), color);
    return grp;
  }

  window.KIT = {
    C, el, g, sh, hash, pts2d, cutPoly, cutRect, cutEll, cutStroke, arc, paper, tex, ink, shadow, text, label, textW,
    icon, medallion, wall, table, cloud, stringLights, coin, note, bundle, galla, jar, tumbler, kettle, stall, crate,
    person, meera, raviMama, priya, merchant, umbrella, slip, faceTag, khata, smallBook, filmStrip, polaroid, card,
    rows, scale, gauge, rupee, onColor, stamp, arrowShape, curveArrow, sparkle, qmark,
  };
})();
