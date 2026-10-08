// Lesson-12 local helper kit — loaded after _shared.js, before every scene (index.template).
// Lesson-local (shared kit untouched). Candidates to promote: L12.film (the vertical 9-frame P&L film strip), L12.column (paper-block
// column), L12.tb (19-line trial-balance list), L12.strip (a P&L line card), L12.dog.
(function () {
  const K = window.KIT, C = K.C;
  const L = (window.L12 = window.L12 || {});
  const O = "0 0";

  // ------------------------------------------------------------------------------------------------ basics
  L.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, o.shadow || 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };
  // fade a node to `v` opacity (dim / undim) — no scale, no wobble
  L.dim = (tl, n, t, v = 0.45, d = 0.3) => tl.to(n, { opacity: v, duration: d, ease: "power1.inOut" }, t);
  L.fmt = (n) => K.fmtINR(n);
  // smooth flight of an `inner` node (wrapper carries the start position): x/y with different eases = a gentle arc
  L.fly = (tl, n, t, dx, dy, dur = 0.7, o = {}) => {
    tl.to(n, { x: dx, duration: dur, ease: o.ex || "power1.inOut" }, t);
    tl.to(n, { y: dy, duration: dur, ease: o.ey || "power2.inOut" }, t);
    if (o.scale !== undefined) tl.to(n, { scale: o.scale, svgOrigin: O, duration: dur, ease: "power2.inOut" }, t);
  };
  // small red pushpin (the Drawings slip wears one — s2 → s4 → s6 → s8)
  L.pin = (parent, x, y, s = 1) => {
    const n = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    K.paper(K.shadow(n, 1), K.cutEll(0, 0, 11, 11, 0.6), C.red);
    K.paper(n, K.cutEll(-3, -3, 4, 4, 0.3), "#f6b3ab");
    return n;
  };

  // ------------------------------------------------------------------------------------------------ P&L line strip card
  // a cream paper strip: [coloured edge] label ........ ₹amount. Used for TB flyers AND as the content of film line frames.
  L.STRIP_W = 520; L.STRIP_H = 72;
  L.strip = (parent, label, amt, o = {}) => {
    const w = o.w || L.STRIP_W, h = o.h || L.STRIP_H, edge = o.edge || C.dr;
    const n = K.g(parent, {});
    K.tex(K.shadow(n, o.shadow || 1), K.cutRect(-w / 2, -h / 2, w, h, 1.4, 20), "pat-paper");
    K.paper(n, K.cutRect(-w / 2 + 8, -h / 2 + 9, 10, h - 18, 0.5, 12), edge);
    K.text(n, -w / 2 + 32, 2, label, { size: 34, weight: 700, anchor: "start" });
    const tk = K.ticker(n, w / 2 - 16, 0, 1, { value: amt, size: 36, anchor: "end", weight: 800, color: edge === C.cr ? C.crText : C.drText });
    return { n, tk, w, h };
  };

  // absolute end time of the word an `{p@name}` pause marker sits on (TL.anchors[seg]["@name|p"])
  L.endOf = (seg, key) => {
    const a = (TL.anchors[seg] || {})[key];
    const norm = (w) => w.replace(/[.,!?;:"“”‘’—–()…।॥\-]/g, "").toLowerCase();
    let seen = 0;
    for (const [w, , e] of TL.segs[seg].words) if (norm(w) === norm(a[0]) && ++seen === (a[1] || 1)) return e;
    throw new Error("endOf: " + seg + " " + key);
  };

  // ------------------------------------------------------------------------------------------------ the film strip (vertical, 9 frames)
  // frames, top → bottom: 0 Sales · 1 Cost of supplies used · 2 GROSS (ruled result) · 3 Rent · 4 Salary · 5 Electricity · 6 Depreciation · 7 Interest · 8 NET (ruled result)
  // (x, y) = centre of the strip. Frame content nodes are children of the strip (local coords), hidden until used.
  L.FILM = { W: 620, FH: 100, PAD: 16, X: 1550, Y: 540 };
  L.FRAMES = [
    { kind: "line", label: "Sales", amt: 50000, edge: "cr" },
    { kind: "line", label: "Cost of supplies used", amt: 10000, edge: "dr" },
    { kind: "result", label: "Gross profit" },
    { kind: "line", label: "Rent", amt: 5000, edge: "dr" },
    { kind: "line", label: "Salary", amt: 8000, edge: "dr" },
    { kind: "line", label: "Electricity", amt: 1000, edge: "dr" },
    { kind: "line", label: "Depreciation", amt: 1000, edge: "dr" },
    { kind: "line", label: "Interest", amt: 300, edge: "dr" },
    { kind: "result", label: "Net profit" },
  ];
  L.film = (parent, o = {}) => {
    const F = L.FILM, W = F.W, FH = F.FH, PAD = F.PAD, N = 9, H = N * FH + 2 * PAD;
    const n = L.node(parent, o.x ?? F.X, o.y ?? F.Y, o.s || 1);
    const body = K.g(n, {});
    K.paper(K.shadow(body, 2), K.cutRect(-W / 2, -H / 2, W, H, 1.8, 24), "#2a2530");
    for (let i = 0; i < Math.floor(H / 36); i++) {
      const py = -H / 2 + 14 + i * 36;
      K.paper(body, K.cutRect(-W / 2 + 10, py, 16, 22, 0.5, 8), C.cream);
      K.paper(body, K.cutRect(W / 2 - 26, py, 16, 22, 0.5, 8), C.cream);
    }
    const cw = W - 76, ch = FH - 10;
    const out = { n, body, W, H, cw, ch, fr: [], FH };
    const spec = o.spec || L.FRAMES;
    spec.forEach((sp, i) => {
      const cy = -H / 2 + PAD + FH * (i + 0.5);
      const cell = K.g(body, {});
      const f = { i, cy, cx: 0, kind: sp.kind, label: sp.label, cell };
      if (sp.kind === "line") {
        K.paper(cell, K.cutRect(-cw / 2, cy - ch / 2, cw, ch, 1, 14), C.saffron);
        const holder = K.g(n, { transform: `translate(0 ${cy})` });
        f.c = K.g(holder, {});                                              // content (a strip card), hidden until filled
        const st = L.strip(f.c, sp.label, sp.amt, { edge: sp.edge === "cr" ? C.cr : C.dr });
        f.tk = st.tk; f.amt = sp.amt;
        if (!o.filled) L.hide(f.c);
      } else {
        K.paper(cell, K.cutRect(-cw / 2, cy - ch / 2, cw, ch, 1, 14), C.cream);
        K.ink(cell, [[-cw / 2 + 14, cy + ch / 2 - 14], [cw / 2 - 14, cy + ch / 2 - 14]], 5, C.ink);
        f.rule2 = K.ink(cell, [[-cw / 2 + 14, cy + ch / 2 - 25], [cw / 2 - 14, cy + ch / 2 - 25]], 3.5, C.ink); f.rule2.setAttribute("opacity", "0");
        const holder = K.g(n, { transform: `translate(0 ${cy - 4})` });
        f.c = K.g(holder, {});
        f.lab = K.text(f.c, -cw / 2 + 18, 0, sp.label, { size: 36, weight: 800, anchor: "start" });
        f.tk = K.ticker(f.c, cw / 2 - 18, 0, 1, { value: o.values ? o.values[i] : 0, size: 40, anchor: "end", weight: 800 });
        f.q = K.text(f.c, cw / 2 - 18, 2, "₹ ?", { size: 40, weight: 800, anchor: "end", color: C.ink });
        if (o.values && o.values[i] !== undefined) f.q.setAttribute("opacity", "0"); else f.tk.g.setAttribute("opacity", "0");
        if (!o.filled) L.hide(f.c);
      }
      out.fr.push(f);
    });
    // world position (parent space) of a frame centre — for flyers
    out.pos = (i) => ({ x: (o.x ?? F.X), y: (o.y ?? F.Y) + out.fr[i].cy * (o.s || 1) });
    // a result frame: swap "₹ ?" for the counting number
    out.showValue = (tl, t, i, value, dur = 0.8, from = 0) => {
      const f = out.fr[i];
      tl.set(f.q, { opacity: 0 }, t);
      tl.fromTo(f.tk.g, { opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, t);
      f.tk.to(tl, t, value, dur);
      return out;
    };
    out.blank = (tl, t, i) => { const f = out.fr[i]; tl.set(f.tk.g, { opacity: 0 }, t); tl.set(f.q, { opacity: 1 }, t); return out; };
    return out;
  };

  // ------------------------------------------------------------------------------------------------ paper-block column
  // `chunks` bottom → top: { n: blocks, frac?: 0..1 (height of the single block) }. 1 block = ₹1,000. (x, yB) = bottom centre.
  L.BLOCK = { w: 210, h: 14, gap: 2 };
  L.column = (parent, x, yB, chunks) => {
    const B = L.BLOCK, step = B.h + B.gap;
    const n = L.node(parent, x, 0);
    let y = yB;
    const out = { n, chunks: [], yB, x };
    chunks.forEach((ch, ci) => {
      const g = K.g(n, {});
      const sh = K.shadow(g, 1);
      let top = y, h0 = y;
      for (let k = 0; k < ch.n; k++) {
        const hh = ch.frac ? B.h * ch.frac : B.h;
        K.tex(sh, K.cutRect(-B.w / 2, y - hh, B.w, hh, 0.8, 30), "pat-paper");
        K.el("path", { d: K.cutRect(-B.w / 2, y - hh, B.w, hh, 0.8, 30), fill: "none", stroke: "#a39684", "stroke-width": 1.6, "stroke-linejoin": "round" }, sh);
        y -= ch.frac ? hh + B.gap : step; top = y;
      }
      const tint = K.el("path", { d: K.cutRect(-B.w / 2, top, B.w, h0 - top - B.gap, 0.5, 30), fill: C.wood, opacity: 0, "pointer-events": "none" }, g);
      out.chunks.push({ g, tint, top, bottom: h0, n: ch.n });
    });
    out.top = y + step; out.height = yB - out.top;
    return out;
  };

  // ------------------------------------------------------------------------------------------------ trial-balance list (19 lines)
  L.TB = [
    ["Cash", 50700, "dr"], ["Bank", 11000, "dr"], ["Infotech", 6000, "dr"], ["Stock", 4000, "dr"], ["Equipment", 36000, "dr"],
    ["Accumulated depreciation", 1000, "cr"], ["Loan from Ravi Mama", 27000, "cr"], ["Gopal Dairy", 3000, "cr"],
    ["Advance from customer", 4000, "cr"], ["Electricity payable", 1000, "cr"], ["Capital", 50000, "cr"], ["Drawings", 3000, "dr"],
    ["Sales", 50000, "cr"], ["Rent", 5000, "dr"], ["Salary", 8000, "dr"], ["Interest", 300, "dr"], ["Electricity", 1000, "dr"],
    ["Cost of supplies used", 10000, "dr"], ["Depreciation", 1000, "dr"],
  ];
  L.TBW = 740; L.TBROW = 50;
  // (x, y) = top-left of the sheet. Rows are individual groups: rows[name] = { n, y (centre, parent space), name, amt, side }
  L.tb = (parent, x, y, o = {}) => {
    const W = L.TBW, RH = L.TBROW, rows = L.TB.length, H = (rows + 1) * RH + 14;
    const root = L.node(parent, x, y);
    const sheet = K.g(root, {});
    K.tex(K.shadow(sheet, 2), K.cutRect(0, 0, W, H, 2, 26), "pat-paper");
    const cD = 440, cC = 590;
    K.paper(sheet, K.cutRect(cD + 4, 7, 146 - 8, RH - 10, 0.8, 14), C.dr);
    K.paper(sheet, K.cutRect(cC + 4, 7, 150 - 8, RH - 10, 0.8, 14), C.cr);
    K.text(sheet, cD + 73, 7 + (RH - 10) / 2 + 2, "Debit", { size: 34, weight: 800, color: "#fff" });
    K.text(sheet, cC + 75, 7 + (RH - 10) / 2 + 2, "Credit", { size: 34, weight: 800, color: "#fff" });
    // faint column tints
    K.paper(sheet, K.cutRect(cD + 4, RH + 6, 142, rows * RH + 2, 0.6, 30), C.dr, { opacity: 0.1 });
    K.paper(sheet, K.cutRect(cC + 4, RH + 6, 146, rows * RH + 2, 0.6, 30), C.cr, { opacity: 0.1 });
    const out = { n: root, sheet, rows: {}, list: [], x, y, W, H };
    L.TB.forEach(([name, amt, side], i) => {
      const cy = RH * (i + 1.5) + 7;
      const rn = K.g(root, {});
      const rowg = K.g(rn, {});
      K.ink(rowg, [[10, cy - RH / 2], [W - 10, cy - RH / 2]], 1.6, "#a39684", { opacity: 0.55 });
      K.text(rowg, 16, cy + 2, name, { size: 34, weight: 600, anchor: "start" });
      const ax = side === "dr" ? cD + 140 : cC + 144;
      K.text(rowg, ax, cy + 2, K.fmtINR(amt), { size: 34, weight: 700, anchor: "end", color: side === "dr" ? C.drText : C.crText });
      const r = { n: rn, name, amt, side, cy, wy: y + cy, wx: x + W / 2, i };
      out.rows[name] = r; out.list.push(r);
    });
    return out;
  };

  // ------------------------------------------------------------------------------------------------ expense slips (s6)
  // cream card, medallion + counting amount. (x, y) centre. Returns { n, tk }
  L.expSlip = (parent, x, y, icon, amt, o = {}) => {
    const w = o.w || 270, h = o.h || 84;
    const n = L.node(parent, x, y);
    const b = K.g(n, {});
    K.tex(K.shadow(b, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.4, 18), "pat-paper");
    K.paper(b, K.cutRect(-w / 2 + 8, -h / 2 + 9, 9, h - 18, 0.5, 12), C.dr);
    if (o.face) { K.tex(K.shadow(b, 1), K.cutEll(-w / 2 + 62, 0, 30, 30, 0.6), "pat-paper"); const fa = K.g(b, { transform: `translate(${-w / 2 + 62} 0)` }); K.faceArt(fa, o.face, 27); }
    else K.medallion(b, -w / 2 + 62, 0, 30, icon);
    const tk = K.ticker(b, w / 2 - 14, 0, 1, { value: amt, size: o.size || 40, anchor: "end", weight: 800, color: C.drText });
    return { n, b, tk, w, h };
  };

  // hanging paper sign: [medallion] word, on two strings. (x, y) = centre of the card.
  L.sign = (parent, x, y, icon, word, col) => {
    const n = L.node(parent, x, y);
    K.ink(n, [[-70, -42], [-50, -120]], 3, C.ink); K.ink(n, [[70, -42], [50, -120]], 3, C.ink);
    const b = K.g(n, {});
    K.paper(K.shadow(b, 2), K.cutRect(-130, -42, 260, 84, 1.6, 20), col || C.cream);
    K.medallion(b, -86, 0, 28, icon);
    K.text(b, 12, 3, word, { size: 38, weight: 800, color: K.onColor(col || C.cream) });
    return n;
  };

  // ------------------------------------------------------------------------------------------------ the street dog (L1 s01): asleep, one ear flick
  L.dog = (parent, x, y, s = 1) => {
    const g = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
    const tan = "#c9a06b", dark = "#8a6a43";
    K.el("ellipse", { cx: 6, cy: 4, rx: 118, ry: 12, fill: "#3b2614", "fill-opacity": 0.22 }, g);
    const b = K.shadow(g, 1);
    K.paper(b, K.cutEll(0, -34, 98, 36, 1.6), tan);                         // curled body
    K.paper(b, K.cutStroke([[88, -30], [118, -18], [130, -34]], 14, 1), tan);  // tail
    K.paper(b, K.cutEll(-86, -26, 40, 30, 1.4), tan);                        // head on paws
    K.paper(b, K.cutEll(-112, -18, 17, 13, 0.8), dark);                      // nose
    K.paper(b, K.cutRect(-40, -12, 70, 16, 0.8, 12), dark);                  // paws
    const ear = K.g(g, { transform: "translate(-76 -50)" }), earIn = K.g(ear, {});
    K.paper(K.shadow(earIn, 1), K.cutPoly([[0, 0], [22, -6], [30, 22], [6, 26]], 0.6, 8), dark);
    K.ink(g, K.arc(-96, -34, 8, Math.PI * 0.1, Math.PI * 0.9, 6), 3.5, C.ink);   // closed eye
    return { g, ear: earIn, flick(tl, t) {
      tl.to(earIn, { rotation: -22, svgOrigin: O, duration: 0.133, ease: K.stepEase(0.133, "power2.out", t) }, t);
      tl.to(earIn, { rotation: 0, svgOrigin: O, duration: 0.2, ease: K.stepEase(0.2, "power2.out", t + 0.2) }, t + 0.2);
    } };
  };

  // ------------------------------------------------------------------------------------------------ full-frame Khata cover plate (s01 rush → s01t)
  L.plate = (parent) => {
    const g = K.g(parent, { "data-layout-allow-overlap": "true" });
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.redDark }, g);
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "url(#pat-cover)" }, g);
    return g;
  };

  // a "Lesson 13" cover (s12 slam → s13 swing-open)
  L.cover13 = (parent) => {
    const outer = K.g(parent, { "data-layout-allow-overlap": "true" }), inner = K.g(outer, {});
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, "13", { size: 260, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
})();
