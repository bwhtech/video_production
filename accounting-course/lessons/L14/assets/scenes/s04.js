// s04 — Misconception: cash is not profit. The cash pile (₹61,700) with the two big streams that fed it (₹50,000 Meera, ₹30,000 Ravi Mama + the IOU still owed).
// Then "Cash = Profit" gets the red ✗ stamp; galla and the 9-frame film strip stand side by side (Cash | Profit) and the film lights frame by frame.
// Out: default torn-paper wipe into s05.
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    L.stage(svg, C.coral, 880);

    // ============ phase A — pile + the two streams
    const A = L.node(svg, 0, 0);
    const vessel = K.g(A, {});
    const galla = K.galla(vessel, 900, 968, 1.9, { open: true, overflow: true });
    K.bank(vessel, 1320, 972, 0.72, {});
    K.paper(K.shadow(vessel, 1), K.cutRect(650, 965, 920, 44, 1.6, 30), C.woodDark);
    const tk = L.tick(A, 1000, 300, { size: 104, w: 540, h: 146, edge: C.saffron });
    // streams as cream curved paper arrows (dim until their face tag clips on)
    const sM = L.node(A, 0, 0), sR = L.node(A, 0, 0);
    K.curveArrow(sM, [[440, 700], [560, 620], [720, 640], [850, 740]], C.cream, 22);
    K.curveArrow(sR, [[1620, 700], [1560, 600], [1440, 560], [1300, 600]], C.cream, 22);
    sM.setAttribute("opacity", "0.4"); sR.setAttribute("opacity", "0.4");
    const bM = L.chip(A, 580, 540, "₹50,000", { size: 44, bg: C.cream, hidden: false });
    const bR = L.chip(A, 1500, 500, "₹30,000", { size: 44, bg: C.cream, hidden: false });
    L.hide(bM); L.hide(bR);
    const tagM = K.claimTag(A, 880, 780, 0.9, { face: "meera", size: 54, hidden: true });
    const tagR = K.claimTag(A, 1380, 800, 0.9, { face: "ravi", size: 54, hidden: true });
    const iou = L.node(A, 1380, 860); L.hide(iou);
    K.paper(K.shadow(iou, 1), K.cutRect(-100, -40, 200, 80, 1.4, 20), C.cream);
    K.text(iou, 0, 3, "₹27,000", { size: 40, weight: 800, color: C.crText });
    const Ch = L.node(svg, 0, 0);
    const m = K.meera(Ch, 260, 1020, 0.95, { expr: "puzzled" });
    const ravi = K.raviMama(Ch, 1740, 1020, 0.95, { expr: "neutral", flip: true });

    // ============ equation: galla = film frame, then the stamp
    const EQ = L.node(svg, 960, 400); L.hide(EQ);
    K.paper(K.shadow(EQ, 2), K.cutRect(-380, -140, 760, 280, 2.2, 28), C.cream);
    K.galla(EQ, -230, 60, 1.1, { open: false });
    K.paper(EQ, K.cutRect(-40, -34, 80, 16, 0.6, 12), C.ink); K.paper(EQ, K.cutRect(-40, 8, 80, 16, 0.6, 12), C.ink);
    const ef = L.node(EQ, 215, 0); L.filmFrame(ef, 0, 0, 280, 190); K.medallion(ef, 0, 0, 52, "trending-up");

    // ============ phase B — Cash | Profit side by side
    const B = L.node(svg, 0, 0); L.hide(B);
    K.galla(B, 560, 760, 2.5, { open: true, overflow: true });
    const cashChip = L.chip(B, 560, 840, "Cash", { size: 60, bg: C.cream, hidden: false });
    const filmCells = ["indian-rupee", "leaf", "key", "user", "percent", "zap", "trending-down"];
    K.filmStrip(B, 1330, 600, 940, 200, filmCells, 0, { resultFrames: 2 });
    const lights = L.node(B, 1330, 600);
    const FW = (940 - 30) / 9;
    const fills = [];
    for (let i = 0; i < 9; i++) {
      const fx = -940 / 2 + 15 + i * FW + FW / 2;
      const r = K.paper(lights, K.cutRect(fx - FW / 2 + 5, -100 + 24, FW - 10, 200 - 48, 1, 14), i < 7 ? C.gold : C.cream, { opacity: 0 });
      fills.push(r);
    }
    const profitChip = L.chip(B, 1330, 790, "Profit", { size: 60, bg: C.cream, hidden: false });
    L.allow(A); L.allow(B); L.allow(EQ);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.2); ravi.blinks(tl, T0 + 1.8, sc.end, 3.6);
    tk.enter(tl, T0 + 0.1); tk.to(tl, T0 + 0.2, 61700, 0.8);
    L.drop(tl, vessel, T0 + 0.05);
    const tRich = cue("s04", "@rich"), tFifty = cue("s04", "@fifty"), tSav = cue("s04", "@savings"), tThirty = cue("s04", "@thirty"), tBorrow = cue("s04", "@borrowed"), tOwed = cue("s04", "@owed");
    const tCash = cue("s04", "@cash", 2), tProfit = cue("s04", "@profit"), tBox = cue("s04", "@box"), tProfit2 = cue("s04", "@profit", 2), tEarned = cue("s04", "@earned");
    m.expr(tl, tRich, "thinking").look(tl, tRich, 8, -4);
    // Meera's stream + face tag
    L.drop(tl, bM, tFifty - 0.1); L.fade(tl, sM, tFifty, 1, 0.3);
    tagM.enter(tl, tSav - 0.05); m.expr(tl, tSav, "proud");
    // Ravi's stream + face tag + the IOU still owed
    L.drop(tl, bR, tThirty - 0.1); L.fade(tl, sR, tThirty, 1, 0.3);
    tagR.enter(tl, tBorrow - 0.05); ravi.expr(tl, tBorrow, "worried");
    L.drop(tl, iou, tBorrow + 0.5);
    K.pulseNode(tl, iou, tOwed - 0.1, 1.1);
    // "Cash in hand ... profit नहीं है" — Cash = Profit gets the stamp
    tl.to(A, { opacity: 0.35, duration: 0.4, ease: "power2.inOut" }, tCash - 0.1);
    L.drop(tl, EQ, tCash);
    m.expr(tl, tCash, "thinking");
    K.stamp(tl, EQ, 0, 0, tProfit + 0.2, 2.0, { rot: -8 });
    // "Cash बताता है ... गल्ले में" — equation lifts; the two objects stand side by side
    L.lift(tl, EQ, tBox - 0.6);
    tl.to([A, Ch], { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, tBox - 0.5);
    L.drop(tl, B, tBox - 0.2);
    K.pulseNode(tl, cashChip, tBox + 0.1, 1.08);
    // "Profit बताता है ... कमाया" — the film lights frame by frame
    K.pulseNode(tl, profitChip, tProfit2 + 0.1, 1.08);
    fills.forEach((r, i) => {
      const t = tProfit2 + 0.3 + i * 0.28;
      tl.fromTo(r, { opacity: 0 }, { opacity: 0.9, duration: 0.15, ease: "power2.out", immediateRender: false }, t);
      tl.to(r, { opacity: 0, duration: 0.4, ease: "power2.in" }, t + 0.9);
    });
    L.spark(svg, tl, 1700, 520, tEarned + 0.1, 34);
  };
})();
