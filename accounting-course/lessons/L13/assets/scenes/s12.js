// s12 — Next time. The galla (₹50,700) and the bank (₹11,000) side by side → ₹61,700; Meera fans out the notes (joy), a single sparkle over her head; on "is Meera rich?" Khata pops a "?".
// Out: Khata's red "14" cover slams over the frame (s13 swings it open).
(function () {
  window.OWN_SEAM_IN.s13 = true;
  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start, GY = 1000;
    const cam = K.g(svg, {});
    L13.stage(cam, C.saffron, 880);
    const total = K.ticker(cam, 960, 270, 1, { value: 0, size: 96, chip: true, w: 560, h: 150, edge: C.dr, hidden: true });
    const galla = L13.node(cam, 650, GY); L13.hide(galla); K.galla(galla, 0, 0, 1.3, {});
    const bank = L13.node(cam, 1020, GY); L13.hide(bank); L13.bank(bank, 0, 0, 1.0);
    const chG = K.ticker(cam, 650, GY - 230, 1, { value: 0, size: 48, chip: true, w: 240, h: 70, edge: C.dr, hidden: true });
    const chB = K.ticker(cam, 1020, GY - 320, 1, { value: 0, size: 48, chip: true, w: 240, h: 70, edge: C.dr, hidden: true });
    const m = K.meera(cam, 1560, 1018, 1.0, { expr: "happy" });
    const fan = [0, 1, 2, 3, 4].map((i) => { const n = L13.node(cam, 1470, 700); L13.hide(n); K.note(n, 0, 0, 120, 62, 0); return n; });
    const spark = L13.node(cam, 1560, 330); L13.hide(spark); K.sparkle(spark, 0, 0, 46, C.gold);
    const khata = K.khataRig(cam, 250, 1022, 0.8, { expr: "awake", lookX: 4 });
    const cover = L13.cover(svg, 14);
    tl.set(cover.outer, { y: -1180 }, 0);
    L13.allow(svg);

    m.blinks(tl, T0 + 1.2, sc.end, 3.3); khata.blink(tl, T0 + 3).blink(tl, T0 + 7);
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 600" }, { scale: 1.04, svgOrigin: "960 600", duration: sc.end - T0 - 0.3, ease: "none" }, T0);
    // "sixty-one thousand seven hundred rupees, in the galla and the bank"
    const tN = cue("s12", "@sixty-one");
    total.enter(tl, tN - 0.2); total.to(tl, tN, 61700, 1.4);
    const tG = cue("s12", "@galla"), tB = cue("s12", "@bank");
    L13.drop(tl, galla, tG - 0.2); chG.enter(tl, tG + 0.1); chG.to(tl, tG + 0.15, 50700, 0.8);
    L13.drop(tl, bank, tB - 0.2); chB.enter(tl, tB + 0.1); chB.to(tl, tB + 0.15, 11000, 0.6);
    // "is Meera rich?" — she fans the notes, a sparkle over her head, Khata's "?"
    const tM = cue("s12", "@meera");
    m.arm(tl, tM - 0.2, "R", 120, 30, 0.35).expr(tl, tM, "joy");
    fan.forEach((n, i) => { L13.drop(tl, n, tM + i * 0.05, { dur: 0.2 }); tl.to(n, { x: (i - 2) * 46, y: -20 - Math.abs(i - 2) * 10, rotation: (i - 2) * 14, duration: 0.4, ease: K.stepEase(0.4, "power2.out", tM + 0.2) }, tM + 0.2); });
    L13.drop(tl, spark, cue("s12", "@rich") - 0.1, { dur: 0.3 });
    khata.emote(tl, cue("s12", "@rich"), "?", 1.2); khata.expr(tl, cue("s12", "@rich"), "wow");
    // the "14" cover slams shut
    const tLand = sc.end - 0.18;
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
  };
})();
