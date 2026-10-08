// s10 — Next time (night). Meera totals April's profit on a napkin (50,000 − 5,000 − 8,000 − 300 → ₹36,700), reaches for the confetti popper; Khata clears its
// throat — one arm up, `!` — and Meera freezes mid-reach (amazed), popper raised, string untouched. Khata's red cover with a gold "10" swings shut over the frame.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start, GY = 1015;
    OWN_SEAM_IN.s11 = true;
    K.wall(svg, C.navy, 880); K.table(svg, 880);
    K.stringLights(svg, 80, 1840, 110, 70, 12);
    const stall = K.stall(svg, 1640, GY, 0.85, { galla: true });
    const m = K.meera(svg, 330, GY, 1.0, { expr: "happy" });
    const nap = K.napkin(svg, 900, 530, 1.0, { w: 600, h: 380, lines: [["Sales", "50,000"], ["Rent", "− 5,000"], ["Salary", "− 8,000"], ["Interest", "− 300"]], hidden: true });
    const tot = K.ticker(svg, 900, 800, 1, { value: 0, size: 88, chip: true, w: 420, h: 128, edge: C.ink, hidden: true });
    // the confetti popper (unfired): a paper cone on the counter, a string dangling
    const pop = L9.node(svg, 580, 880);
    K.paper(K.shadow(pop, 1), K.cutPoly([[-34, 0], [34, 0], [14, -120], [-14, -120]], 1.2, 14), C.coral);
    [[-22, -26, 22, -26], [-18, -54, 18, -54], [-14, -82, 14, -82]].forEach(([a, b, c, d]) => K.ink(pop, [[a, b], [c, d]], 6, C.cream));
    K.paper(pop, K.cutEll(0, -122, 15, 7, 0.6), C.gold);
    K.ink(pop, [[0, 0], [10, 40], [-8, 62]], 3, C.cream);
    const khata = K.khataRig(svg, 1290, 880, 0.7, { expr: "awake" });
    const cover = L9.cover(svg, 10);
    m.blinks(tl, T0 + 1.5, sc.end, 3.3);
    L9.allow(svg);

    const tNext = cue("s10", "@next"), tAdd = cue("s10", "@adds"), tPro = cue("s10", "@profit"), t36 = cue("s10", "@thirty-six");
    nap.slideIn(tl, tAdd - 0.2);
    [0, 1, 2, 3].forEach((i) => nap.write(tl, tAdd + 0.2 + i * 0.55, i, { dur: 0.5 }));
    m.arm(tl, tAdd, "R", 70, 60, 0.3);
    for (let k = 0; k < 8; k++) m.arm(tl, tAdd + 0.3 + k * 0.25, "R", 70 + (k % 2 ? 6 : -6), 60 + (k % 2 ? -8 : 8), 0.12);
    tot.enter(tl, t36 - 0.4); tot.to(tl, t36 - 0.2, 36700, 1.4);
    m.expr(tl, t36, "joy");
    // she reaches for the popper
    const tRe = cue("s10", "@reaches");
    m.look(tl, tRe - 0.2, -8, 6).arm(tl, tRe, "R", 40, 80, 0.3);
    tl.to(pop, { x: 20, y: -250, duration: 0.7, ease: "power2.inOut" }, tRe + 0.3);
    // Khata clears its throat
    const tCl = cue("s10", "@clears");
    khata.arm(tl, tCl - 0.2, "R", 150, 0.3).emote(tl, tCl, "!", 1.4);
    khata.look(tl, tCl - 0.1, -10, 0);
    m.expr(tl, tCl + 0.1, "amazed").look(tl, tCl + 0.1, 8, 0);
    // the "10" cover swings shut
    const tEnd = sc.end - 0.15;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tEnd - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tEnd);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tEnd + 0.06);
  };
})();
