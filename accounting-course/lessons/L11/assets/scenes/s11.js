// s11 — Next time. L1's night at the stall recreated (--scene-night): Meera on her crate, the galla full of notes on her lap, the "?" over her head ("did she make a profit or a loss?").
// On "finally answer" Khata hops in and winks; the series cover with a gold 12 drops over the frame -> s12 (the end card) swings it open.
(function () {
  window.OWN_SEAM_IN.s12 = true;
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start, GROUND = 985;
    const cam = K.g(svg, {});
    K.wall(cam, C.navy);
    K.paper(K.shadow(cam, 1), K.cutEll(1700, 160, 62, 62, 2), C.cream); K.paper(cam, K.cutEll(1724, 148, 50, 52, 1.5), C.navy);          // moon
    [[180, 120], [420, 70], [760, 150], [1080, 60], [1320, 130], [1500, 230], [960, 260], [260, 300]].forEach(([x, y], i) => K.paper(cam, K.cutEll(x, y, 5 + (i % 3) * 2, 5 + (i % 3) * 2, 0.6), C.gold, { opacity: 0.85 }));
    const wire = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; wire.push([-20 + 1960 * t, 70 + Math.sin(t * Math.PI) * 110]); }
    K.ink(cam, wire, 3, "#141b2c");
    for (let i = 0; i < 15; i++) {
      const t = (i + 0.5) / 15, bx = -20 + 1960 * t, by = 70 + Math.sin(t * Math.PI) * 110 + 18;
      K.paper(cam, K.cutEll(bx, by, 34, 34, 2), C.cream, { opacity: 0.2 });
      K.paper(K.shadow(cam, 1), K.cutEll(bx, by, 11, 14, 1), C.gold);
    }
    K.table(cam, 820); K.paper(cam, K.cutRect(-40, 810, 2000, 330, 0, 80), C.navy, { opacity: 0.42 });
    const silStall = (x, s) => { const gp = K.g(cam, { transform: `translate(${x} 838) scale(${s})` }); K.paper(gp, K.cutRect(-170, -300, 340, 40, 1.5), "#24304d"); K.paper(gp, K.cutRect(-150, -260, 300, 200, 2), "#1b2540"); K.paper(gp, K.cutRect(-190, -420, 380, 70, 1.5), "#2a3756"); };
    silStall(70, 0.62);
    // Meera's stall (right), Meera on the crate with the open galla on her lap
    const stall = K.stall(cam, 1500, GROUND, 1.05, { galla: false });
    const MS = 1.2, GX = 600, GY = GROUND - 105 * MS, GS = 0.95 * MS;
    K.crate(cam, GX, GROUND, 230 * MS, 140 * MS);
    const m = K.meera(cam, GX, GROUND, MS, { sit: true, expr: "neutral", aL: [30, 78], aR: [30, 78], lookY: 4 });
    const galla = K.galla(cam, GX, GY, GS, { open: true, overflow: true });
    const qn = L.node(cam, GX + 40, 190); L.hide(qn); K.qmark(qn, 0, 0, 1.7, C.saffron);
    const khata = K.khataRig(cam, 1060, GROUND, 0.7, { expr: "awake" }); khata.g.setAttribute("opacity", "0");
    const cover = L.coverN(svg, 12);
    L.allow(svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end - 2, 3.4); m.jitter(tl, T0, sc.end); stall.jitter(tl, T0, sc.end); khata.jitter(tl, T0, sc.end);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end - 0.5);
    tl.fromTo(cam, { scale: 1, svgOrigin: "700 650" }, { scale: 1.04, svgOrigin: "700 650", duration: sc.end - T0 - 0.8, ease: "none", immediateRender: false }, T0);
    // "देर रात" — she looks down at the notes; "profit — या loss?" — the ? pops
    m.look(tl, cue("s11", "@night"), 4, 8); m.expr(tl, cue("s11", "@galla"), "thinking");
    const tPr = cue("s11", "@profit");
    L.drop(tl, qn, tPr - 0.1, { dur: 0.35 }); m.expr(tl, tPr, "puzzled"); m.headTilt(tl, cue("s11", "@loss"), 8);
    // "आख़िरकार जवाब दे सकते हैं" — Khata hops in, winks, then the cover drops
    const tF = cue("s11", "@finally");
    tl.to(khata.g, { opacity: 1, duration: 0.2 }, tF - 0.3); khata.hop(tl, tF - 0.2, { height: 60 }); khata.expr(tl, tF + 0.5, "wink");
    m.expr(tl, tF, "happy"); m.headTilt(tl, tF, 0);
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
  };
})();
