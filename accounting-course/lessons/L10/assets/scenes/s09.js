// s09 — Recap: three tiles light in sync with the three kinds of adjustment (unpaid bill · stock used up · a month of wear); the closed galla slides under them and gets a ✓.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.leaf, 880);
    const cal = L.cal(svg, 30);
    const XS = [400, 960, 1520], TY = 520;
    const tiles = XS.map((x) => { const n = L.hide(L.node(svg, x, TY)); L.card(n, 460, 560, { stripe: C.saffron }); return n; });
    const lab = ["Electricity payable", "Cost of supplies used", "Depreciation"].map((t, i) => { const n = L.hide(L.node(svg, XS[i], TY + 218)); K.label(n, 0, 0, t, { size: 40, bg: "paper", weight: 800 }); return n; });
    // art: envelope + zap · jar with a low stack · cart + scuff
    const env = K.envelope(svg, XS[0], TY + 130, 0.8, { w: 380, h: 250, icon: "zap", hidden: true });
    const jar = K.jarRig(svg, XS[1], TY + 150, 1.35, { label: "Stock", icon: "leaf", contents: "leaves", fill: 0.25, hidden: true });
    const cart = L.hide(L.node(svg, XS[2], TY - 20)); { const c = K.g(cart, { transform: "scale(2.6)" }); K.cartArt(c); }
    const sc3 = L.hide(L.node(svg, XS[2] + 62, TY - 40)); L.scuff(sc3, 0, 0, 38);
    const galla = K.galla(svg, 2200, 985, 0.85, {});
    const chk = L.hide(L.node(svg, 960, 905)); K.medallion(chk, 0, 0, 40, "check", C.leaf);
    const khata = K.khataRig(svg, 1810, 1010, 0.55, { expr: "awake" });
    const ring = XS.map((x) => { const n = L.hide(L.node(svg, x, TY)); K.el("path", { d: K.cutRect(-236, -296, 472, 592, 1.2, 24), fill: "none", stroke: C.gold, "stroke-width": 10 }, n); return n; });

    // the 30th: an April page, its date ringed — the day all three surprises land on (it steps aside as the tiles arrive)
    const pg = K.calendarPage(svg, 960, 520, 1.15, { month: "April", day: 30, hidden: true });
    pg.enter(tl, T0 + 0.7); pg.circle(tl, T0 + 1.6);
    khata.blink(tl, T0 + 2.5);
    // each tile lights as it is spoken
    pg.exit(tl, cue("s09", "@bill") - 0.5);
    const t1 = cue("s09", "@bill"), t2 = cue("s09", "@stock"), t3 = cue("s09", "@wear");
    [[t1, 0], [t2, 1], [t3, 2]].forEach(([t, i]) => { L.drop(tl, tiles[i], t - 0.15, { dur: 0.4 }); L.drop(tl, lab[i], t + 0.35, { dur: 0.3 }); });
    env.enter(tl, t1 + 0.1); env.pulse(tl, t1 + 0.5);
    jar.enter(tl, t2 + 0.1);
    L.drop(tl, cart, t3 + 0.1, { dur: 0.35 }); L.drop(tl, sc3, t3 + 0.5, { dur: 0.3 });
    // "adjustments put them back in April's story": gold rings run across the three tiles
    const tAdj = cue("s09", "@adjustments");
    ring.forEach((r, i) => { const t = tAdj + i * 0.3; tl.to(r, { opacity: 1, duration: 0.12 }, t); tl.to(r, { opacity: 0, duration: 0.4 }, t + 0.5); });
    // "without moving any cash": the galla slides in under the tiles and gets a ✓
    const tC = cue("s09", "@cash");
    tl.to(galla.g, { x: 960, duration: 0.9, ease: "power2.out" }, tC - 0.5);
    L.drop(tl, chk, tC + 0.6, { dur: 0.3 });
    khata.arm(tl, segEnd("s09") - 1.3, "R", 150, 0.3).expr(tl, segEnd("s09") - 1.3, "happy");
    L.allow(svg);
  };
})();
