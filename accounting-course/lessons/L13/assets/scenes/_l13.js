// Lesson-13 local helper kit — loaded after _shared.js, before every scene (index.template). Nothing here touches the shared kit.
// Candidates to promote: spread (Khata as an open two-page spread with a face on the spine), row (medallion + label + amount line),
// printBS (the finished two-column Balance Sheet polaroid — L14 s9/s10 reuse this exact object), cover (full-frame red lesson cover).
(function () {
  const K = window.KIT, C = K.C;
  const L13 = (window.L13 = window.L13 || {});
  const O = "0 0";

  // ------------------------------------------------------------------------------------------------ basics
  L13.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L13.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L13.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L13.cal = (parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L13.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L13.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L13.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L13.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };
  // pop a node into view (opacity step) at t — for things that must exist before the first tween touches them
  L13.fmt = (n) => K.fmtIN(n);

  // ------------------------------------------------------------------------------------------------ Khata's face on a spine strip
  // x,y = face centre (between the eyes). Eyes ±30, mouth below. Methods are stepped on twos like the rig.
  L13.khataFace = (parent, x, y, k = 1) => {
    const g = K.g(parent, { transform: `translate(${x} ${y}) scale(${k})` });
    const eyes = K.g(g, {}), pupils = K.g(g, {}), lids = K.g(g, { opacity: 0 });
    const P = [];
    [-30, 30].forEach((ex) => {
      K.paper(K.shadow(eyes, 1), K.cutEll(ex, 0, 21, 25, 1.2), C.white);
      const p = K.g(pupils, {}); K.paper(p, K.cutEll(ex, 3, 10.5, 10.5, 0.8), C.ink); K.paper(p, K.cutEll(ex - 3, -2, 3.6, 3.6, 0.4), C.white); P.push(p);
      K.paper(lids, K.cutEll(ex, 0, 22, 26, 0.8), C.redShade);
    });
    K.paper(g, K.cutEll(-52, 30, 13, 8, 1), C.pink, { opacity: 0.85 }); K.paper(g, K.cutEll(52, 30, 13, 8, 1), C.pink, { opacity: 0.85 });
    const mouths = {
      awake: K.ink(g, K.arc(0, 28, 17, Math.PI * 0.12, Math.PI * 0.88, 8), 5, C.ink),
      wow: K.paper(g, K.cutEll(0, 44, 10, 13, 0.6), C.ink),
      happy: K.paper(g, K.pts2d([[-20, 32], [0, 36], [20, 32], ...K.arc(0, 32, 20, 0, Math.PI, 8).slice(1, -1).map(([a, b]) => [a, 32 + (b - 32) * 1.1])]), C.ink),
    };
    ["wow", "happy"].forEach((n) => mouths[n].setAttribute("opacity", "0"));
    const f = { g, cur: "awake" };
    const stepEase = (t) => K.stepEase(0.17, "power2.out", t);
    f.look = (tl, t, dx, dy) => { P.forEach((p) => tl.to(p, { x: dx, y: dy, duration: 0.17, ease: stepEase(t) }, t)); return f; };
    f.blink = (tl, t) => { tl.set(lids, { opacity: 1 }, t); tl.set(lids, { opacity: 0 }, t + 2 / 15); return f; };
    f.expr = (tl, t, name) => {
      const from = f.cur; if (from === name) return f;
      tl.set(mouths[from], { opacity: 0 }, t); tl.set(mouths[name], { opacity: 1 }, t); f.cur = name;
      return f;
    };
    return f;
  };

  // ------------------------------------------------------------------------------------------------ the open spread (Khata, big)
  // Two pages (left 90..895, right 1025..1830) around a red spine band with Khata's face. Returns { g, L, R, face, pageTint }.
  // L / R = page rects {x,y,w,h,cx}. Page tints (debit blue / credit orange) are paper sheets over the page.
  L13.spread = (parent, o = {}) => {
    const g = K.g(parent, {});
    const PY = 140, PH = 790;
    const L = { x: 100, y: PY, w: 790, h: PH, cx: 495 }, R = { x: 1030, y: PY, w: 790, h: PH, cx: 1425 };
    // covers (back boards) peeking out around the pages
    const board = K.shadow(g, 2);
    K.tex(board, K.cutRect(60, PY - 34, 1800, PH + 68, 3, 40), "pat-cover");
    const pgL = K.shadow(g, 1), pgR = K.shadow(g, 1);
    K.tex(pgL, K.cutRect(L.x, L.y, L.w, L.h, 2.4, 26), "pat-paper");
    K.tex(pgR, K.cutRect(R.x, R.y, R.w, R.h, 2.4, 26), "pat-paper");
    for (let i = 0; i < 12; i++) {                                  // faint ledger rules
      const y = PY + 64 + i * 64;
      K.ink(g, [[L.x + 22, y], [L.x + L.w - 22, y]], 2, "#a39684", { opacity: 0.45 });
      K.ink(g, [[R.x + 22, y], [R.x + R.w - 22, y]], 2, "#a39684", { opacity: 0.45 });
    }
    const tints = {};
    ["L", "R"].forEach((k) => {
      const P = k === "L" ? L : R;
      const t = K.g(g, { opacity: 0 });
      K.paper(t, K.cutRect(P.x + 10, P.y + 10, P.w - 20, P.h - 20, 2, 24), k === "L" ? C.dr : C.cr, { opacity: 0.2 });
      tints[k] = t;
    });
    // spine band + gold trim
    const sp = K.shadow(g, 2);
    K.tex(sp, K.cutRect(885, PY - 20, 150, PH + 40, 3, 36), "pat-cover");
    K.paper(sp, K.cutRect(885, PY + 40, 150, 14, 1.2, 20), C.gold);
    K.paper(sp, K.cutRect(885, PY + PH - 54, 150, 14, 1.2, 20), C.gold);
    const face = L13.khataFace(g, 960, PY + 150, 1.2);
    const rig = { g, L, R, face, tints, board };
    rig.tint = (tl, t, side, on = true) => { tl.to(tints[side], { opacity: on ? 1 : 0, duration: 0.3, ease: "power2.out" }, t); return rig; };
    return rig;
  };

  // ------------------------------------------------------------------------------------------------ a ledger line: [medallion][label … amount]
  // Drawn around (0,0) in a w-wide, h-tall slot (left edge x = -w/2). o: icon | face, label, value, side ("L" blue | "R" orange), inline [a, "−", b, "=", c]
  L13.row = (parent, x, y, w, o = {}) => {
    const n = L13.node(parent, x, y);
    const col = o.side === "R" ? C.cr : C.dr;
    const h = o.h || 80;
    K.tex(K.shadow(n, 1), K.cutRect(-w / 2, -h / 2 + 4, w, h - 8, 1.6, 20), "pat-paper");
    K.paper(n, K.cutRect(-w / 2 + 6, -h / 2 + 10, 10, h - 20, 0.8, 12), col);
    const my = o.inline ? -h / 2 + 40 : 0;
    const mx = -w / 2 + 52;
    if (o.face) { K.tex(K.shadow(n, 1), K.cutEll(mx, my, 31, 31, 0.8), "pat-paper"); K.faceArt(n, o.face, 27).setAttribute("transform", `translate(${mx} ${my + 6})`); }
    else if (o.icon === "cart") { K.paper(K.shadow(n, 1), K.cutEll(mx, my, 31, 31, 0.8), C.wood); const a = K.g(n, { transform: `translate(${mx} ${my}) scale(0.5)` }); K.cartArt(a); }
    else if (o.icon) K.medallion(n, mx, my, 31, o.icon);
    const lab = K.text(n, mx + 48, my + 2, o.label || "", { size: o.size || 38, weight: 800, anchor: "start" });
    let tk = null, inl = null;
    if (o.inline) {
      // inline arithmetic on a second line, written left → right: a (static) · b (static, the −/+ part) · c (ticker "= …")
      const iy = h / 2 - 32, x0 = o.inlineX ?? -w / 2 + 100;
      const wa = o.inline.a.length * 21, wb = o.inline.b.length * 21;
      const ta = K.text(n, x0, iy, o.inline.a, { size: 38, weight: 800, anchor: "start" });
      const tb = K.text(n, x0 + wa + 26, iy, o.inline.b, { size: 38, weight: 800, anchor: "start", color: C.coralText });
      ta.setAttribute("opacity", "0"); tb.setAttribute("opacity", "0");
      const tc = K.ticker(n, x0 + wa + wb + 52, iy, 1, { value: 0, size: 40, anchor: "start", prefix: "= ", weight: 800 });
      inl = { a: ta, b: tb, c: tc, x0, iy };
    } else if (o.value !== undefined) {
      tk = K.ticker(n, w / 2 - 28, 2, 1, { value: 0, size: o.vsize || 42, anchor: "end", prefix: o.prefix });
    }
    L13.hide(n);
    return { n, tk, lab, inl, value: o.value, w, h };
  };


  // ------------------------------------------------------------------------------------------------ static finished pages (s04: the left page is already written)
  L13.assetsPage = (svg, tl, T0, sp) => {
    const RW = 720, CX = sp.L.cx;
    const head = L13.node(svg, CX, 214); K.label(head, 0, 0, "Assets", { size: 50, bg: C.dr, w: 300, h: 76, rot: -1 });
    const mk = (y, o) => { const r = L13.row(svg, CX, y, RW, o); tl.set(r.n, { opacity: 1 }, T0); return r; };
    const eq = mk(330, { icon: "cart", label: "Equipment", inline: { a: "36,000", b: "− 1,000", c: 35000 }, h: 124 });
    eq.inl.a.setAttribute("opacity", "1"); eq.inl.b.setAttribute("opacity", "1"); eq.inl.c.enter(tl, T0); eq.inl.c.set(tl, T0 + 0.02, 35000);
    [[442, { icon: "leaf", label: "Stock", value: 4000, h: 88 }], [536, { face: "infotech", label: "Infotech", value: 6000, h: 88 }],
     [630, { icon: "landmark", label: "Bank", value: 11000, h: 88 }], [724, { icon: "banknote", label: "Cash", value: 50700, h: 88 }]]
      .forEach(([y, o]) => { const r = mk(y, o); r.tk.set(tl, T0 + 0.02, o.value); });
    const tot = L13.node(svg, CX, 842);
    K.ink(tot, [[-RW / 2, -50], [RW / 2, -50]], 5, C.ink);
    K.text(tot, -RW / 2 + 20, 2, "Total", { size: 46, weight: 800, anchor: "start" });
    const totT = K.ticker(tot, RW / 2 - 20, 2, 1, { value: 106700, size: 56, anchor: "end" });
    return { head, tot };
  };

  // ------------------------------------------------------------------------------------------------ the finished Balance Sheet polaroid (reused by L14 s9/s10)
  // Draws K.polaroid(two-column) and fills 5+5 rows. rows: { L: [[label, value|inline, icon]], R: [...] } totals appended automatically.
  // Returns { g, rows: {L:[…], R:[…]}, cols, hold… }. Everything is created visible; callers fade `rowsG` in with the print.
  L13.printBS = (parent, x, y, w, h, o = {}) => {
    const g = K.polaroid(parent, x, y, w, h, 0, null, { twoColumn: true, date: o.date || "30 Apr" });
    // clean slate: the kit's tiny header text and misaligned rules are covered, then re-drawn at ≥ 34 px
    const pw = w - 30, ph = h - 80, px0 = -pw / 2, py0 = -h / 2 + 15, hh = Math.max(24, ph * 0.15), cw = pw / 2;
    ["L", "R"].forEach((k, i) => {
      const col = g.cols[k], cx0 = px0 + i * cw;
      K.el("rect", { x: col.x, y: col.y, width: col.w, height: col.h + 6, fill: "#fff8ea" }, g);
      K.el("rect", { x: cx0 + 6, y: py0 + 6, width: cw - 12, height: hh - 6, fill: k === "L" ? C.dr : C.cr }, g);
      K.text(g, col.cx, py0 + 3 + hh / 2 + 2, k === "L" ? "Assets" : "Liabilities + Equity", { size: 46, weight: 800, color: K.onColor(k === "L" ? C.dr : C.cr) });
    });
    const rowsG = K.g(g, {});
    const out = { g, rowsG, cols: g.cols, rows: { L: [], R: [] }, totals: {} };
    const spec = o.spec;
    ["L", "R"].forEach((k) => {
      const col = g.cols[k], list = spec[k], n = list.length + 1, ph = col.h - 6, rh = Math.min(106, ph / n);
      for (let i = 1; i < list.length; i++) K.ink(g, [[col.x + 14, col.y + 8 + rh * i], [col.x + col.w - 14, col.y + 8 + rh * i]], 2, "#d4c6ae");
      K.ink(g, [[col.x + 14, col.y + 8 + rh * list.length], [col.x + col.w - 14, col.y + 8 + rh * list.length]], 5, C.ink);
      list.forEach(([label, value, ico, who], i) => {
        const cy = col.y + 8 + rh * (i + 0.5);
        const r = K.g(rowsG, {});
        const mx = col.x + 46;
        if (who) { K.tex(K.shadow(r, 1), K.cutEll(mx, cy, 28, 28, 0.8), "pat-paper"); K.faceArt(r, who, 24).setAttribute("transform", `translate(${mx} ${cy + 5})`); }
        else if (ico === "cart") { K.paper(K.shadow(r, 1), K.cutEll(mx, cy, 28, 28, 0.8), C.wood); K.cartArt(K.g(r, { transform: `translate(${mx} ${cy}) scale(0.45)` })); }
        else if (ico === "equity") { K.tex(K.shadow(r, 1), K.cutEll(mx, cy, 28, 28, 0.8), "pat-paper"); K.faceArt(r, "meera", 24).setAttribute("transform", `translate(${mx} ${cy + 5})`); }
        else if (ico) K.medallion(r, mx, cy, 28, ico);
        K.text(r, mx + 44, cy + 1, label, { size: 36, weight: 700, anchor: "start" });
        K.text(r, col.x + col.w - 22, cy + 1, K.fmtIN(value), { size: 40, weight: 800, anchor: "end" });
        out.rows[k].push({ g: r, cy, cx: col.cx, value });
      });
      const ty = col.y + 8 + rh * (list.length + 0.5);
      const tr = K.g(rowsG, {});
      K.text(tr, col.x + 22, ty + 2, "Total", { size: 36, weight: 800, anchor: "start" });
      K.text(tr, col.x + col.w - 22, ty + 2, "₹" + K.fmtIN(list.reduce((a, r) => a + r[1], 0)), { size: 44, weight: 800, anchor: "end" });
      out.totals[k] = { g: tr, cy: ty };
    });
    L13.allow(g);
    return out;
  };


  // paper bank building (origin = bottom centre, ≈ 300 wide × 270 tall at s = 1)
  L13.bank = (parent, x, y, s = 1) => {
    const b = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    K.paper(K.shadow(b, 1), K.cutRect(-140, -26, 280, 26, 1.5, 14), C.grey);
    K.paper(K.shadow(b, 1), K.cutRect(-124, -50, 248, 24, 1.5, 14), "#d8d2c8");
    [-90, -30, 30, 90].forEach((px) => K.paper(K.shadow(b, 1), K.cutRect(px - 17, -190, 34, 140, 1.2, 12), C.cream));
    K.paper(K.shadow(b, 1), K.cutPoly([[-150, -190], [150, -190], [0, -270]], 1.5, 14), C.grey);
    K.medallion(b, 0, -222, 22, "landmark");
    return b;
  };

  // ------------------------------------------------------------------------------------------------ full-frame red lesson cover (s12 → s13 slam, s13 swing)
  L13.cover = (parent, num) => {
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(num), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };

  // A tiny paper stall silhouette used inside the developing photo (tone-on-tone shapes: awning, counter, wheel, cup).
  L13.photoScene = (parent, w, h) => {
    const g = K.g(parent, {});
    const sx = w / 600, sy = h / 380;
    const s = K.g(g, { transform: `scale(${sx} ${sy})` });
    K.paper(s, K.cutRect(0, 0, 600, 380, 0, 8), "#f6e6c8");
    K.paper(s, K.cutRect(0, 250, 600, 130, 0, 8), "#d9b98a");                // table
    K.paper(s, K.cutPoly([[110, 120], [490, 120], [520, 170], [80, 170]], 1, 10), C.red);   // awning
    K.paper(s, K.cutRect(120, 170, 12, 100, 0.6, 8), C.woodDark);
    K.paper(s, K.cutRect(468, 170, 12, 100, 0.6, 8), C.woodDark);
    K.paper(s, K.cutRect(100, 250, 400, 60, 1, 12), C.wood);                   // counter
    K.paper(s, K.cutEll(160, 320, 30, 30, 1), C.ink); K.paper(s, K.cutEll(440, 320, 30, 30, 1), C.ink);
    K.paper(s, K.cutRect(240, 214, 40, 36, 0.6, 8), C.glass); K.paper(s, K.cutRect(300, 220, 34, 30, 0.6, 8), C.chai);
    K.paper(s, K.cutEll(500, 60, 36, 36, 1), C.saffron);                       // low sun
    return g;
  };
})();
