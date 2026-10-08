// s10 — Closing: night at the stall (L1's opening shot, rhymed). Night, Meera on the crate, the galla on her knees — but this time Khata sits beside her, its pages open
// with the film strip (₹24,700) and the polaroid (30 Apr, ₹1,06,700) lying ON them as props. The neighbours who shrugged in L1 now nod. The calendar turns 30 Apr → 1 May.
// Meera holds Khata out toward us; it hops forward and fills the frame (red cover) → s11 swings the cover open onto the end card.
(function () {
  window.OWN_SEAM_IN.s11 = true;                          // this scene hands off to the finale cover
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start, cu = (seg, w, n) => cue(seg, w, n);
    const NIGHT_INK = "#1f2a44";
    const MS = 1.3, GROUND = 985, GX = 560, GY = GROUND - 105 * MS, GS = 0.95 * MS;
    const cam = K.g(svg, { id: "s10-cam" });
    K.wall(cam, C.navy);
    K.paper(K.shadow(cam, 1), K.cutEll(1700, 150, 62, 62, 2), C.cream);
    K.paper(cam, K.cutEll(1724, 138, 50, 52, 1.5), C.navy);
    [[180, 120], [420, 70], [760, 150], [1080, 60], [1320, 130], [1500, 230], [960, 260], [260, 300]].forEach(([x, y], i) => K.paper(cam, K.cutEll(x, y, 5 + (i % 3) * 2, 5 + (i % 3) * 2, 0.6), C.gold, { opacity: 0.85 }));
    // string lights (warm, as at the end of L1)
    const wire = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; wire.push([-20 + 1960 * t, 70 + Math.sin(t * Math.PI) * 110]); }
    K.ink(cam, wire, 3, "#141b2c");
    for (let i = 0; i < 15; i++) {
      const t = (i + 0.5) / 15, bx = -20 + 1960 * t, by = 70 + Math.sin(t * Math.PI) * 110 + 18;
      K.paper(cam, K.cutEll(bx, by, 34, 34, 2), C.cream, { opacity: 0.22 });
      K.paper(K.shadow(cam, 1), K.cutEll(bx, by, 12, 15, 1), C.gold);
    }
    K.table(cam, 820);
    K.paper(cam, K.cutRect(-40, 810, 2000, 330, 0, 80), C.navy, { opacity: 0.42 });
    // neighbouring stalls + owners (silhouettes) — they nod this time
    const silStall = (x, s) => {
      const gp = K.g(cam, { transform: `translate(${x} 838) scale(${s})` });
      K.paper(gp, K.cutRect(-170, -300, 340, 40, 1.5), "#24304d"); K.paper(gp, K.cutRect(-150, -260, 300, 200, 2), "#1b2540");
      K.paper(gp, K.cutRect(-190, -420, 380, 70, 1.5), "#2a3756");
      [-140, 140].forEach((px) => K.paper(gp, K.cutRect(px - 8, -360, 16, 120, 1, 20), "#1b2540"));
    };
    silStall(70, 0.62); silStall(1860, 0.6);
    const sil = (x, s, flip, hair) => K.meera(cam, x, 846, s, { skin: NIGHT_INK, top: NIGHT_INK, legs: NIGHT_INK, shoes: NIGHT_INK, apron: false, earrings: false, collar: false, hair, flip, expr: "neutral" });
    const nb = [sil(230, 0.42, false, "pony"), sil(1075, 0.36, true, undefined), sil(1770, 0.42, true, "bald")];
    const stall = K.stall(cam, 1560, GROUND, 1.0, { galla: false });
    // crate + Meera + galla
    K.crate(cam, GX, GROUND, 230 * MS, 140 * MS);
    const m = K.meera(cam, GX, GROUND, MS, { sit: true, expr: "neutral", aL: [30, 78], aR: [30, 78], lookY: 4 });
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    // Khata beside her, closed → open on "Yes."
    const KX = 1090, KY = GROUND, KS = 0.8;
    const kh = K.khataRig(cam, KX, KY, KS, { expr: "awake" });
    // props lying ON the open pages
    const prop = L.node(cam, 0, 0);
    const film = L.node(prop, KX - 10, KY - 190 * KS - 30); L.hide(film);
    const filmG = K.g(film, { transform: "rotate(-9)" });
    K.filmStrip(filmG, 0, 0, 520, 128, ["indian-rupee", "leaf", "key", "user", "percent", "zap", "trending-down"], 0, { resultFrames: 2 });
    const netT = K.text(filmG, 520 / 2 - 15 - ((520 - 30) / 9) / 2, 14, "₹24,700", { size: 22, weight: 800 }); netT.setAttribute("data-layout-allow-overlap", "true");
    const trend = L.node(prop, KX - 300, KY - 330); L.hide(trend); K.medallion(trend, 0, 0, 44, "trending-up", C.leaf, C.white);
    const pol = L.node(prop, KX + 60, KY - 150 * KS - 60); L.hide(pol);
    const polG = K.polaroid(K.g(pol, { transform: "rotate(6)" }), 0, 0, 280, 290, 0, { twoColumn: true, date: "30 Apr" });
    ["L", "R"].forEach((k) => { const c = polG.cols[k]; K.text(polG, c.cx, c.y + c.h * 0.46, "₹1,06,700", { size: 26, weight: 800, color: C.ink }).setAttribute("data-layout-allow-overlap", "true"); });
    // calendar strip: lives OUTSIDE the camera group (dead still), small at the top, dimmed
    const cal = K.calendarStrip(svg, 960, 52, 0.62, { highlight: 30, month: "April", hidden: true });
    cal.g.setAttribute("opacity", "0.9");
    // black (fade from the s09 wipe handled by the seam) + the red cover for the hand-off
    const cover = K.el("rect", { x: 1090 - 60, y: 700, width: 120, height: 160, fill: C.red, opacity: 0 }, svg);
    L.allow(svg);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.5, sc.end, 3.3); kh.blink(tl, T0 + 3); kh.blink(tl, T0 + 16);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end + 0.6);
    // s10a
    const tGalla = cu("s10a", "@galla"), tProfit = cu("s10a", "@profit"), tYes = cu("s10a", "@yes"), tRup = cu("s10a", "@rupees"), tOwe = cu("s10a", "@owe"), tPhoto = cu("s10a", "@photo"), tKnows = cu("s10a", "@knows");
    m.look(tl, tGalla, 6, 3).headTilt(tl, tGalla, 3);
    tl.to(galla.body, { y: -14, duration: 0.25, ease: K.stepEase(0.25, "power2.out", tGalla) }, tGalla);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGalla + 0.9) }, tGalla + 0.9);
    m.look(tl, tProfit, 8, 2);
    // "हाँ।" — she opens Khata; the film strip lies across its pages
    kh.open(tl, tYes - 0.3, 0.6); kh.expr(tl, tYes - 0.1, "happy");
    m.expr(tl, tYes, "happy").look(tl, tYes, 8, 3);
    L.drop(tl, film, tYes + 0.6, { dur: 0.4 }); L.drop(tl, trend, tYes + 0.9);
    // "उनके पास क्या है..." — the polaroid is laid on top
    L.drop(tl, pol, tOwe + 0.9, { dur: 0.4 });
    kh.arm(tl, tOwe, "R", 40);
    // "इस बार, वो जानती हैं।" — nothing pops; she just smiles (the quietest beat)
    m.expr(tl, tKnows, "happy").look(tl, tKnows, 0, 0).headTilt(tl, tKnows, 0);
    // s10b
    const tYou = cu("s10b", "@you"), tTom = cu("s10b", "@tomorrow"), tPage = cu("s10b", "@page"), tKh = cu("s10b", "@khata's"), tTurn = cu("s10b", "@turn", 2);
    const camPivot = "820 760";
    tl.fromTo(cam, { scale: 1, svgOrigin: camPivot }, { scale: 1.07, svgOrigin: camPivot, duration: tTurn - tYou, ease: "none", immediateRender: false }, tYou);
    m.look(tl, tYou, 0, -3);
    nb.forEach((n, i) => { const t = tYou + 0.5 + i * 0.6; n.headTilt(tl, t, 7); n.headTilt(tl, t + 0.45, 0); });
    cal.enter(tl, tTom);
    cal.tickTo(tl, tPage, 1, { allowBack: true, dur: 0.5 }); cal.setMonth(tl, tPage, "May");
    kh.expr(tl, tKh, "wink");
    // hand-off: Meera holds Khata out toward the lens; it hops forward and fills the frame (red cover)
    m.pose(tl, tTurn - 0.1, { aR: [70, 20], dur: 0.33 });
    kh.hop(tl, tTurn, { height: 60 });
    cal.exit(tl, tTurn + 0.2);
    tl.set(cover, { opacity: 1 }, tTurn + 0.7);
    tl.to(cover, { attr: { x: -20, y: -20, width: 1960, height: 1120 }, duration: sc.end - tTurn - 0.85, ease: "power3.in" }, tTurn + 0.7);
  };
})();
