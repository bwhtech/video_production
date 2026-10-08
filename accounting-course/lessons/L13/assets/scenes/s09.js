// s09 — Solo: what if Meera had taken no drawings? The Equity card without the dashed −₹3,000 slip (it goes back to the galla); countdown; ₹74,700;
// then a mini scale: a +₹3,000 chip lands on each pan (galla left, Meera right) — both sides grow, the scale stays level.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.teal, 880);
    const CARD = [900, 590, 1.16];
    const card = K.equityCard(svg, CARD[0], CARD[1], CARD[2], { pockets: 3, capital: 50000, profit: 24700 });
    card.tag.setAttribute("opacity", "0");
    const pkx = (n) => CARD[0] + { Capital: -226, Profit: 0, Drawings: 226 }[n] * CARD[2];
    // Meera (small) + the galla on the left
    const m = K.meera(svg, 230, 1024, 0.78, { expr: "happy" });
    const galla = K.galla(svg, 520, 1010, 1.0, {});
    const notes = [0, 1, 2].map((i) => { const n = L13.node(svg, 340, 700); L13.hide(n); K.note(n, 0, 0, 90, 46, (i - 1) * 10); return n; });
    const qT = L13.node(svg, CARD[0], 800); K.tex(K.shadow(qT, 1), K.cutRect(-150, -48, 300, 96, 1.6, 22), "pat-paper"); K.text(qT, 0, 3, "₹ ?", { size: 72, weight: 800, color: C.crText }); L13.hide(qT);
    const pm = K.pauseMedallion(svg, 1560, 330, 0.8, { hidden: true });
    const eqT = K.ticker(svg, CARD[0], 800, 1, { value: 0, size: 72, chip: true, w: 360, h: 100, edge: C.cr, hidden: true });
    // the mini scale (right)
    const ms = K.miniScale(svg, 1580, 975, 0.5, { hidden: true });
    const chL = K.ticker(svg, 1385, 765, 1, { value: 0, size: 44, chip: true, w: 200, h: 66, edge: C.dr, signed: true, hidden: true });
    const chR = K.ticker(svg, 1775, 765, 1, { value: 0, size: 44, chip: true, w: 200, h: 66, edge: C.cr, signed: true, hidden: true });
    const icL = L13.node(svg, 1385, 665); L13.hide(icL); K.medallion(icL, 0, 0, 38, "banknote");
    const icR = L13.node(svg, 1775, 665); L13.hide(icR); K.tex(K.shadow(icR, 1), K.cutEll(0, 0, 38, 38, 0.8), "pat-paper"); K.faceArt(icR, "meera", 34).setAttribute("transform", "translate(0 6)");
    L13.allow(svg);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3);
    card.unfold(tl, T0 + 0.1);
    card.slip(tl, T0 + 1.2, "Drawings", -3000, { icon: "wallet", from: [0, -120], dur: 0.45 });
    // "suppose Meera hadn't taken any money home" — the slip lifts out and the notes go back into the galla
    const tSup = cue("s09a", "@suppose"), tHome = cue("s09a", "@home");
    const dr = card.pockets.Drawings;
    K.liftOff(tl, dr.slips, tSup + 0.3, { dur: 0.3 });
    card.pocketTick(tl, tSup + 0.35, "Drawings", 0, 0.5);
    m.arm(tl, tHome, "R", 80, 30, 0.4).expr(tl, tHome, "thinking");
    notes.forEach((n, i) => {
      L13.drop(tl, n, tHome + 0.3 + i * 0.3, { dur: 0.25 });
      tl.to(n, { x: 190, y: 160 + i * 6, duration: 0.45, ease: "power2.in" }, tHome + 0.6 + i * 0.3);
      tl.to(n, { autoAlpha: 0, duration: 0.1 }, tHome + 1.05 + i * 0.3);
    });
    // "what would her equity be?" — ₹ ? and the countdown
    L13.drop(tl, qT, cue("s09a", "@equity") - 0.1);
    const tCd = segEnd("s09a") + 0.1;
    pm.enter(tl, tCd - 0.2); pm.countdown(tl, tCd, { dur: 2.9 });
    m.arm(tl, tCd, "R", 12, 8, 0.4);
    // s09b — ₹74,700
    const tR = cue("s09b", "@seventy-four");
    pm.exit(tl, tR - 0.25); tl.set(qT, { autoAlpha: 0 }, tR - 0.05);
    eqT.enter(tl, tR); eqT.to(tl, tR + 0.05, 74700, 0.8);
    m.expr(tl, tR, "proud");
    card.light(tl, tR + 0.9, "Profit");
    // "no drawings, so nothing comes off" — the empty pocket pulses; "the three thousand would still be in the galla" — the mini scale
    K.pulseNode(tl, dr.wrap, cue("s09b", "@drawings") + 0.1, 1.05);
    const tG = cue("s09b", "@galla");
    ms.enter(tl, tG - 0.4);
    // both sides grow by three thousand — chips land together, no tilt
    const tB = cue("s09b", "@both");
    L13.drop(tl, icL, tB - 0.1); L13.drop(tl, icR, tB - 0.1);
    chL.enter(tl, tB + 0.1); chR.enter(tl, tB + 0.1); chL.to(tl, tB + 0.15, 3000, 0.5); chR.to(tl, tB + 0.15, 3000, 0.5);
    ms.levelFlash && ms.levelFlash(tl, cue("s09b", "@level"));
    m.expr(tl, tB, "happy");
  };
})();
