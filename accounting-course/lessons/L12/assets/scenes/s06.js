// s06 — Faded: net profit (and Lesson 1's answer). Same stage as s05: the 40-block column (₹40,000) centre-left, the film strip right. Meera walks in and takes over.
//   five expense slips (key · user · zap · cart · percent) stack beside her, ticker ₹15,300 · the fumble: she reaches for the pushpinned Drawings ₹3,000 slip, the ticker starts to climb,
//   Khata "!", it snaps back · 15 blocks + a 0.3 sliver lift onto the slips, the number blanks to ₹ ?, a 3-2-1 ring drains · ₹24,700 (dead-still hold) · a torn-paper vignette of L1's night: the profit medallion lights.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    K.wall(svg, C.teal, 930);
    const leafWall = K.g(svg, {}); const lw = K.g(leafWall, {}); K.paper(lw, K.cutRect(-40, -40, 2000, 970, 2, 60), C.leaf);
    K.table(svg, 930);
    const col = L.column(svg, 330, 1000, [{ n: 24 }, { n: 1, frac: 0.7 }, { n: 1, frac: 0.3 }, { n: 15 }]);
    const colTk = K.ticker(svg, 330, 312, 1, { value: 40000, size: 58, chip: true, w: 310, h: 90, edge: C.cr });
    const colQ = K.g(svg, { opacity: 0 }); K.tex(K.shadow(colQ, 1), K.cutRect(175, 267, 310, 90, 1.6, 22), "pat-paper"); K.paper(colQ, K.cutRect(187, 347, 286, 7, 0.5, 14), C.cr); K.text(colQ, 330, 316, "₹ ?", { size: 58, weight: 800 });
    const film = L.film(svg, { filled: true, values: { 2: 40000 } });
    L.hide(film.fr[8].c);
    // people
    const m = K.meera(svg, -200, 1010, 0.9, { expr: "happy" });
    const khata = K.khataRig(svg, 560, 1010, 0.4, { expr: "awake" });
    // expense slips (stack right of Meera) + their ticker
    const SX = 1070, SYS = [170, 262, 354, 446, 538];
    const slips = [["key", 5000, "@rent"], ["user", 8000, "@salary"], ["zap", 1000, "@electricity"], ["shopping-cart", 1000, "@depreciation"], ["percent", 300, "@interest", "ravi"]].map(([ic, amt, w, face], i) => {
      const s = L.expSlip(svg, SX, SYS[i], ic, amt, { w: 270, h: 80, face }); L.hide(s.n); return { ...s, w };
    });
    const stackTk = K.ticker(svg, SX, 650, 1, { value: 0, size: 52, chip: true, w: 270, h: 84, edge: C.dr, hidden: true });
    // the pushpinned Drawings slip on the table
    const dw = L.node(svg, SX, 862); const dws = L.expSlip(dw, 0, 0, "wallet", 3000, { w: 270, h: 80, face: "meera" }); L.pin(dws.n, -140, -26, 1.1); L.hide(dw);
    const cd = K.pauseMedallion(svg, 585, 520, 0.5, { hidden: true });
    // torn-paper vignette of L1's night (top-left)
    const vig = L.node(svg, 24, 24); L.hide(vig);
    {
      const W = 450, H = 222;
      const clipD = K.cutPoly([[0, 0], [W, 0], [W, H], [0, H]], 7, 22);
      const cpid = "s06-vig-clip"; const cp = K.el("clipPath", { id: cpid }, svg); K.el("path", { d: clipD }, cp);
      const sg = K.g(vig, { filter: "url(#sh2)" });
      const cg = K.g(sg, { "clip-path": `url(#${cpid})` });
      K.el("rect", { x: -10, y: -10, width: W + 20, height: H + 20, fill: C.navy }, cg);
      K.paper(cg, K.cutEll(380, 50, 26, 26, 1.2), C.cream); K.paper(cg, K.cutEll(392, 44, 21, 22, 1), C.navy);
      K.ink(cg, [[-10, 24], [W / 2, 54], [W + 10, 24]], 2.5, "#141b2c");
      [[70, 40], [150, 52], [230, 56], [310, 50], [390, 38]].forEach(([x, y]) => K.paper(cg, K.cutEll(x, y, 7, 8, 0.6), C.gold));
      K.paper(cg, K.cutRect(-10, H - 44, W + 20, 70, 0, 40), K.mixColor(C.navy, "#a0693a", 0.45));
      K.stall(cg, 330, H - 6, 0.17, { galla: false });
      K.crate(cg, 110, H - 4, 60, 36);
      K.paper(cg, K.cutEll(110, H - 52, 17, 17, 1), C.skin);
      K.paper(cg, K.cutRect(95, H - 38, 30, 32, 1, 10), C.mustard);
      vig._up = L.node(cg, 60, 100); K.medallion(vig._up, 0, 0, 30, "trending-up");
      vig._down = L.node(cg, 190, 100); K.medallion(vig._down, 0, 0, 30, "trending-down");
    }

    // ======================================================================== timeline
    tl.set(lw, { x: -1980 }, 0);
    m.blinks(tl, T0 + 1.4, cue("s06c", "@twenty-four") - 0.6, 3.3); m.blinks(tl, cue("s06d", "@lesson") + 0.4, sc.end, 3.3); khata.blink(tl, T0 + 3).blink(tl, T0 + 20).blink(tl, T0 + 38);
    // s06a — Meera walks in from the left and takes over
    m.walkTo(tl, T0 + 0.2, 800, 1.5);
    L.drop(tl, dw, T0 + 1.9, { dur: 0.3 });
    slips.forEach((s, i) => {
      const t = cue("s06a", s.w) - 0.1;
      L.drop(tl, s.n, t, { dur: 0.32 }); if (i === 0) stackTk.enter(tl, t);
      const run = [5000, 13000, 14000, 15000, 15300][i];
      stackTk.to(tl, t + 0.12, run, 0.5);
      m.look(tl, t, 8, -4);
    });
    m.arm(tl, cue("s06a", "@rent"), "R", 70, 30, 0.3).arm(tl, cue("s06a", "@interest") + 0.6, "R", 12, 8, 0.3);
    // the fumble — 1.2 s pause after "…three hundred."
    const tF = L.endOf("s06a", "@hundred|p");
    m.look(tl, tF, 9, 8).arm(tl, tF + 0.1, "R", 80, 40, 0.25).expr(tl, tF + 0.1, "puzzled");
    tl.to(dw, { y: -240, duration: 0.45, ease: "power2.inOut" }, tF + 0.2);
    stackTk.to(tl, tF + 0.35, 18300, 0.3);
    khata.emote(tl, tF + 0.55, "!", 0.9).arm(tl, tF + 0.5, "R", 70, 0.2);
    stackTk.to(tl, tF + 0.75, 15300, 0.12);
    tl.to(dw, { y: 0, duration: 0.35, ease: "power2.inOut" }, tF + 0.75);
    m.expr(tl, tF + 0.8, "worried").arm(tl, tF + 0.85, "R", 12, 8, 0.25);
    khata.arm(tl, tF + 1.2, "R", 15, 0.2);
    K.pulseNode(tl, stackTk.body, cue("s06a", "@together"), 1.06);
    m.expr(tl, cue("s06a", "@together"), "happy").look(tl, cue("s06a", "@together"), 0, 0);

    // s06b — "Forty thousand, minus fifteen thousand three hundred. Pause, and work it out."
    const tMinus = cue("s06b", "@minus");
    const up15 = col.chunks[3], up03 = col.chunks[2];
    [up15, up03].forEach((c) => tl.to(c.tint, { opacity: 0.55, duration: 0.3 }, tMinus - 0.2));
    [up15, up03].forEach((c, i) => {
      const cy0 = (c.top + c.bottom) / 2, t = tMinus + i * 0.08;
      tl.to(c.g, { y: -26, duration: 0.22, ease: "power2.out" }, t);
      tl.to(c.g, { x: SX - 330, duration: 0.8, ease: "power1.inOut" }, t + 0.22);
      tl.to(c.g, { y: 330 - cy0, duration: 0.8, ease: "power2.inOut" }, t + 0.22);
      tl.to(c.g, { scale: 0.3, svgOrigin: `0 ${cy0}`, duration: 0.8, ease: "power2.inOut" }, t + 0.22);
      tl.to(c.g, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, t + 1.15);
    });
    tl.to(colTk.g, { opacity: 0, duration: 0.2 }, tMinus + 0.9); tl.to(colQ, { opacity: 1, duration: 0.2 }, tMinus + 0.95);
    L.drop(tl, film.fr[8].c, tMinus + 0.9, { dur: 0.3 });
    const tPause = cue("s06b", "@pause");
    m.expr(tl, tPause, "thinking").arm(tl, tPause, "R", 150, 40, 0.35).look(tl, tPause, -6, -4);
    const tCd = segEnd("s06b") - 0.05;
    cd.enter(tl, tCd - 0.2); cd.countdown(tl, tCd, { dur: 2.8 }); cd.exit(tl, tCd + 3.0);

    // s06c — reveal: ₹ ? → ₹24,700 (down from 40,000), the net result frame fills; leaf wipe behind; Meera joy; Khata hops once, then everything is still
    const tR = cue("s06c", "@twenty-four");
    tl.set(colQ, { opacity: 0 }, tR); tl.fromTo(colTk.g, { opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, tR);
    colTk.to(tl, tR, 24700, 0.8);
    film.showValue(tl, tR + 0.1, 8, 24700, 0.8);
    tl.fromTo(lw, { x: -1980 }, { x: 0, duration: 0.8, ease: "power2.inOut", immediateRender: false }, tR);
    m.arm(tl, tR - 0.1, "R", 12, 8, 0.3).expr(tl, tR, "joy");
    khata.hop(tl, tR + 0.85, { height: 40 });
    // s06d — torn-paper vignette: "profit or a loss? A profit."
    const tV = cue("s06d", "@lesson") - 0.3;
    tl.set(vig, { opacity: 1 }, tV); tl.fromTo(vig, { x: -520 }, { x: 0, duration: 0.55, ease: "power2.out", immediateRender: false }, tV);
    const tP = cue("s06d", "@profit", 2);
    L.dim(tl, vig._down, tP, 0.4, 0.3);
    K.pulseNode(tl, vig._up, tP, 1.15);
    m.expr(tl, cue("s06d", "@finally"), "happy");
    L.allow(svg);
  };
})();
