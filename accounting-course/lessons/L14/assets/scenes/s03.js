// s03 — Worked: the cash trail. Coins pour into / out of the "cash vessel" (galla + Bank) from each source, one stream per VO beat.
// A running ticker holds still between steps: 0 → 50,000 → 80,000 → 44,000 → 67,700 (the stall stream, one bundle marked ≈) → 64,700 → 61,700,
// then splits: galla ₹50,700 + bank ₹11,000 ("exactly what she counted").
// Out: default torn-paper wipe into s04 (the two big inflows are re-drawn there).
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    L.stage(svg, C.saffron, 880);
    const cal = L.cal(svg, 1);

    // ---- the cash vessel: galla + Bank on one kraft tray
    const VP = [990, 770];                                        // where every stream meets the vessel
    K.paper(K.shadow(svg, 1), K.cutRect(540, 965, 980, 44, 1.6, 30), C.woodDark);
    const vessel = L.node(svg, 0, 0);
    const galla = K.galla(vessel, 790, 968, 2.0, { open: true, overflow: true });
    const bank = K.bank(vessel, 1240, 972, 0.8, {});
    L.hide(vessel);
    // ticker over the vessel
    const hT = L.node(svg, 960, 300);
    const tk = L.tick(hT, 0, 0, { size: 110, w: 560, h: 150, edge: C.saffron, hidden: true });
    // split chips (galla / bank)
    const chG = L.tick(svg, 790, 1038, { size: 54, w: 300, h: 84, edge: C.wood, hidden: true });
    const chB = L.tick(svg, 1240, 1038, { size: 54, w: 280, h: 84, edge: C.sky, hidden: true });

    // ---- sources
    const m = K.meera(svg, 190, 1020, 0.95, { expr: "happy" });
    const ravi = K.raviMama(svg, 1730, 1020, 0.95, { expr: "happy", flip: true });
    const tagM = K.claimTag(svg, 200, 370, 1.0, { face: "meera", size: 54, hidden: true });
    const tagR = K.claimTag(svg, 1720, 370, 1.0, { face: "ravi", size: 54, hidden: true });
    const cart = L.node(svg, 440, 330); K.cartSticker(cart, 0, 0, 2.0); L.hide(cart);
    const stallN = L.node(svg, 1450, 330); L.hide(stallN);
    K.medallion(stallN, 0, 0, 90, "store");
    [[-120, -40, "milk"], [120, -40, "user"], [0, 125, "coffee"]].forEach(([x, y, ic]) => K.medallion(stallN, x, y, 34, ic));
    // "≈" mark (two wavy strokes) — a net of many movements, not one transaction
    const approx = L.node(stallN, 150, 90);
    [0, 22].forEach((dy) => K.ink(approx, Array.from({ length: 9 }, (_, i) => [-26 + i * 6.5, dy + Math.sin(i * 1.1) * 5]), 7, C.ink));
    // wallet (Meera's ₹3,000 home)
    const wallet = L.node(svg, 440, 600); K.medallion(wallet, 0, 0, 60, "wallet"); L.hide(wallet);

    // ---- streams (paths in svg coords)
    const sMeera = K.coinStream(svg, { path: [[390, 770], [600, 690], [820, 730], VP], n: 14, r: 25, seed: 4 });
    const sRavi = K.coinStream(svg, { path: [[1540, 770], [1360, 690], [1160, 730], VP], n: 14, r: 25, seed: 9 });
    const sCart = K.coinStream(svg, { path: [VP, [830, 640], [640, 480], [500, 410]], n: 14, r: 25, seed: 5 });
    const sStallIn = K.coinStream(svg, { path: [[1440, 410], [1330, 560], [1180, 690], VP], n: 16, r: 22, seed: 7 });
    const sStallOut = K.coinStream(svg, { path: [VP, [1180, 680], [1330, 560], [1420, 420]], n: 6, r: 20, seed: 11 });
    const sRaviOut = K.coinStream(svg, { path: [VP, [1180, 770], [1380, 730], [1540, 770]], n: 10, r: 25, seed: 13 });
    const sMeeraOut = K.coinStream(svg, { path: [VP, [820, 760], [620, 690], [490, 650]], n: 10, r: 25, seed: 17 });

    L.allow(svg);

    // ============================================================ timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); ravi.blinks(tl, T0 + 1.6, sc.end, 3.7);
    const cue_ = (seg, w, n) => cue(seg, w, n);
    // s03a
    const tGalla = cue_("s03a", "@galla"), tBank = cue_("s03a", "@bank"), tNothing = cue_("s03a", "@nothing");
    L.drop(tl, vessel, tGalla - 0.3);
    tl.to(galla.body, { y: -14, duration: 0.2, ease: K.stepEase(0.2, "power2.out", tGalla) }, tGalla);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tGalla + 0.2) }, tGalla + 0.2);
    bank.hop(tl, tBank - 0.05, { height: 30 }); bank.expr(tl, tBank, "happy");
    tk.enter(tl, tNothing - 0.2);
    // Meera pours ₹50,000
    const tMeera = cue_("s03a", "@meera"), tFifty = cue_("s03a", "@fifty");
    tagM.enter(tl, tMeera - 0.1);
    m.pose(tl, tMeera, { aR: [58, -18], dur: 0.33 }); m.expr(tl, tMeera, "proud");
    cal.tickTo(tl, tMeera - 0.1, 1, { dur: 0.1 });
    sMeera.run(tl, tFifty - 0.2, { dur: 1.3, stagger: 0.07 });
    tk.to(tl, tFifty + 0.7, 50000, 0.7);
    tl.to(galla.notes, { scale: 1.1, svgOrigin: "0 -120", duration: 0.17, ease: K.stepEase(0.17, "power2.out", tFifty + 1.0) }, tFifty + 1.0);
    tl.to(galla.notes, { scale: 1, svgOrigin: "0 -120", duration: 0.3, ease: K.stepEase(0.3, "power2.out", tFifty + 1.17) }, tFifty + 1.17);
    tagM.exit(tl, tFifty + 1.9);
    m.pose(tl, tFifty + 1.9, { aR: [12, 8], dur: 0.33 });
    // Ravi Mama adds ₹30,000
    const tRavi = cue_("s03a", "@ravi"), tThirty = cue_("s03a", "@thirty");
    tagR.enter(tl, tRavi - 0.1);
    ravi.pose(tl, tRavi, { aR: [58, -18], dur: 0.33 }); ravi.expr(tl, tRavi, "proud");
    sRavi.run(tl, tThirty - 0.2, { dur: 1.3, stagger: 0.07 });
    tk.to(tl, tThirty + 0.7, 80000, 0.7);
    tagR.exit(tl, tThirty + 1.9);
    ravi.pose(tl, tThirty + 1.9, { aR: [12, 8], dur: 0.33 });
    // the cart takes ₹36,000 out
    const tCart = cue_("s03a", "@cart"), t36 = cue_("s03a", "@thirty-six");
    cal.tickTo(tl, tCart, 2, { dur: 0.3 });
    L.drop(tl, cart, tCart - 0.1);
    sCart.run(tl, t36 - 0.1, { dur: 1.3, stagger: 0.07 });
    tk.to(tl, t36 + 0.6, 44000, 0.7);
    m.expr(tl, t36 + 0.3, "worried");

    // s03b
    const tRun = cue_("s03b", "@running"), tTw3 = cue_("s03b", "@twenty-three");
    L.lift(tl, cart, tRun - 0.2);
    m.expr(tl, tRun, "happy");
    L.drop(tl, stallN, tRun);
    cal.tickTo(tl, tRun + 0.2, 30, { dur: 2.2, stepped: true });
    sStallIn.run(tl, tRun + 0.4, { dur: 2.0, stagger: 0.12 });
    sStallOut.run(tl, tRun + 1.2, { dur: 1.4, stagger: 0.18 });
    tk.to(tl, tTw3 + 0.9, 67700, 0.8);
    // ₹3,000 back to Ravi Mama
    const t3a = cue_("s03b", "@three"), t3b = cue_("s03b", "@three", 2);
    L.lift(tl, stallN, t3a - 0.35);
    sRaviOut.run(tl, t3a - 0.1, { dur: 1.2, stagger: 0.08 });
    ravi.expr(tl, t3a + 0.7, "proud");
    tk.to(tl, t3a + 0.8, 64700, 0.6);
    // ₹3,000 home with Meera (wallet)
    L.drop(tl, wallet, t3b - 0.2);
    sMeeraOut.run(tl, t3b - 0.1, { dur: 1.2, stagger: 0.08 });
    tk.to(tl, t3b + 0.8, 61700, 0.6);
    L.lift(tl, wallet, t3b + 2.0);
    // "और बचा क्या?" — ticker lifts and holds; "इकसठ" it pulses
    const tLeft = cue_("s03b", "@left"), t61 = cue_("s03b", "@sixty-one"), tExactly = cue_("s03b", "@exactly"), tCounted = cue_("s03b", "@counted");
    K.pulseNode(tl, tk.body, t61, 1.06);
    m.expr(tl, tLeft, "thinking");
    // split on "exactly what she counted": ticker splits into galla 50,700 + bank 11,000
    tl.to(hT, { y: -40, duration: 0.4, ease: "power2.inOut" }, tExactly);
    chG.enter(tl, tExactly + 0.2); chG.to(tl, tExactly + 0.25, 50700, 0.8);
    chB.enter(tl, tExactly + 0.35); chB.to(tl, tExactly + 0.4, 11000, 0.8);
    tl.to(galla.body, { y: -12, duration: 0.2, ease: K.stepEase(0.2, "power2.out", tCounted) }, tCounted);
    tl.to(galla.body, { y: 0, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tCounted + 0.2) }, tCounted + 0.2);
    bank.hop(tl, tCounted + 0.1, { height: 24 }); bank.expr(tl, tCounted, "happy");
    m.expr(tl, tCounted, "joy");
  };
})();
