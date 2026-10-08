// s11 — Finale end card (12 s, no VO, no "Up next"). Khata's red cover from s10 swings open onto --scene-violet: series wordmark, a "Course complete" card with FIVE
// skill medallions ticking one by one (two jars · journal card · golden-rule tag · film strip + polaroid · galla ≠ film strip) + a sixth `file-text` worksheet medallion,
// two clean paper panels for YouTube end-screen videos, Khata waving. No subscribe circle, no credits. The last 3 s are completely still.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start, HI = L.HI();
    K.wall(svg, C.violet, 960); K.table(svg, 960);
    const pop = (n, t, o) => { L.hide(n); K.dropIn(tl, n, t, { dur: 0.34, ...(o || {}) }); return n; };

    // ---- series wordmark
    const wm = L.node(svg, 520, 130);
    K.label(wm, 0, 0, window.SERIES_NAME(), { size: 64, font: "title", weight: 400, bg: "paper", rot: -2 });
    // ---- the "Course complete" card
    const CX = 590, CY = 545, CW = 980, CH = 580;
    const card = L.node(svg, CX, CY);
    K.card(card, 0, 0, CW, CH, { header: C.saffron, title: HI ? "कोर्स पूरा!" : "Course complete", titleSize: 54, headerH: 96 });
    const MR = 82, SP = 188, MY = -14;
    const med = (i) => ({ x: -2 * SP + i * SP, y: MY });
    const slots = [0, 1, 2, 3, 4].map((i) => {
      const p = med(i), n = L.node(card, p.x, p.y, 1.2); L.hide(n);
      K.paper(K.shadow(n, 2), K.cutEll(0, 0, 68, 68, 1.4), C.white);
      return n;
    });
    // 1 — two jars (blue / orange)
    { const n = slots[0];
      [[-22, C.dr], [22, C.cr]].forEach(([x, col]) => { K.paper(K.shadow(n, 1), K.cutRect(x - 17, -26, 34, 52, 1.2, 14), col); K.paper(n, K.cutRect(x - 20, -33, 40, 10, 0.6, 10), C.cream); }); }
    // 2 — mini journal card (Dr / To lines)
    { const n = slots[1];
      K.tex(K.shadow(n, 1), K.cutRect(-38, -30, 76, 60, 1, 14), "pat-paper");
      K.paper(n, K.cutRect(-38, -30, 76, 14, 0.6, 12), C.red);
      K.paper(n, K.cutRect(-30, -9, 46, 10, 0.5, 10), C.dr); K.paper(n, K.cutRect(-14, 9, 44, 10, 0.5, 10), C.cr); }
    // 3 — golden-rule tag (family medallion + rule glyph)
    { const n = slots[2];
      K.famMedallion(n, "real", -22, 0, 24);
      K.paper(K.shadow(n, 1), K.cutEll(24, 0, 24, 24, 0.8), C.cream); K.ruleGlyph(n, "into", 24, 1, 0.9, C.ink); }
    // 4 — film strip + polaroid
    { const n = slots[3];
      K.filmStrip(n, -4, -14, 96, 30, ["coins", "leaf"], 0, { resultFrames: 1 });
      K.polaroid(n, 14, 18, 42, 44, 5, { twoColumn: true, date: "" }); }
    // 5 — galla ≠ film strip
    { const n = slots[4];
      K.galla(n, -26, 20, 0.36, { open: false });
      K.paper(n, K.cutRect(-8, -9, 16, 5, 0.3, 10), C.ink); K.paper(n, K.cutRect(-8, 3, 16, 5, 0.3, 10), C.ink); K.ink(n, [[6, -16], [-6, 18]], 4, C.coral);
      K.filmStrip(n, 28, 6, 42, 34, [null], 0, {}); }
    // gold ticks
    const ticks = slots.map((n, i) => { const p = med(i), t = K.goldTick(card, p.x + 58, p.y + 58, 0.62, { r: 42, hidden: true }); return t; });
    // sixth medallion: the worksheet (file-text)
    const ws = L.node(card, 0, 190, 1.3); L.hide(ws);
    K.paper(K.shadow(ws, 2), K.cutEll(0, 0, 50, 50, 1.2), C.white); K.medallion(ws, 0, 0, 40, "file-text", C.sky);
    L.hide(card);
    // ---- two clean paper panels for the YouTube end-screen videos
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => { const n = L.node(svg, x, y); K.tex(K.shadow(n, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper"); L.hide(n); return n; });
    // ---- Khata (bottom-left) waves
    const k = K.khataRig(svg, 200, 1045, 0.5, { expr: "happy" });
    tl.set(k.g, { autoAlpha: 0 }, 0); tl.set(k.g, { autoAlpha: 1 }, T0 + 1.0);
    // ---- the red cover from s10 swinging open (hinge on the left edge)
    const cover = K.g(svg, {}), cin = K.g(cover, {});
    K.el("rect", { x: -20, y: -20, width: 1960, height: 1120, fill: C.red }, cin);
    K.el("rect", { x: 70, y: 70, width: 1780, height: 940, fill: "none", stroke: C.gold, "stroke-width": 8, rx: 18 }, cin);
    L.allow(svg);

    // ======================================================================== timeline
    tl.to(cin, { scaleX: 0.02, svgOrigin: "0 540", duration: 0.6, ease: "power2.in" }, T0 + 0.3);
    tl.set(cover, { autoAlpha: 0 }, T0 + 0.95);
    pop(wm, T0 + 0.55); pop(card, T0 + 0.63); pop(panels[0], T0 + 0.71); pop(panels[1], T0 + 0.79);
    slots.forEach((n, i) => pop(n, T0 + 1.2 + i * 0.3));
    ticks.forEach((t, i) => t.stick(tl, T0 + 3.0 + i * 0.35));
    pop(ws, T0 + 5.1);
    k.hop(tl, T0 + 1.0, { height: 60 });
    [2.4, 7.0].forEach((d) => {
      const t = T0 + d;
      k.arm(tl, t, "R", 140, 0.2);
      [0, 1, 2].forEach((b) => { k.arm(tl, t + 0.2 + b * 0.32, "R", 105, 0.16); k.arm(tl, t + 0.36 + b * 0.32, "R", 140, 0.16); });
      k.arm(tl, t + 1.3, "R", 20, 0.3);
    });
    k.blink(tl, T0 + 4.5); k.expr(tl, T0 + 7.0, "wink"); k.expr(tl, T0 + 8.2, "happy");
  };
})();
