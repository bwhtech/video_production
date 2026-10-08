// s08 — Recap: three tiles — the galla (cash = what's in the box), the film strip (profit = what was earned), the bridge (earned · used up · owed).
// Tiles light on their VO beats; one pop each. Out: default torn-paper wipe into s09.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    L.stage(svg, C.teal, 900);
    const cal = L.cal(svg, 30);
    const CX = [330, 960, 1590], CY = 500, CW = 540, CH = 640;
    const mk = (i) => { const n = L.node(svg, CX[i], CY); L.card(n, CW, CH); L.hide(n); return n; };
    const cards = [0, 1, 2].map(mk);
    // 1 — cash: the galla
    K.galla(cards[0], 0, 60, 2.1, { open: true, overflow: true });
    L.chip(cards[0], 0, 190, "Cash", { size: 64, bg: C.saffron, hidden: false, w: 280, h: 96 });
    // 2 — profit: the film strip (7 frames + 2 result frames, vertical stack of icons)
    const film = L.node(cards[1], 0, 20);
    K.filmStrip(film, 0, 0, 470, 120, ["indian-rupee", "leaf", "key", "user", "percent", "zap", "trending-down"], 0, { resultFrames: 2 });
    L.chip(cards[1], 0, 190, "Profit", { size: 64, bg: C.cream, hidden: false, w: 280, h: 96 });
    // 3 — the bridge: a small bridge with earned / used up / owed on its planks
    const br = L.node(cards[2], 0, -70);
    K.riverBridge(br, 0, 40, 0.26, { w: 1500, gap: 1000, planks: 5 });
    const ic = [["indian-rupee", C.leaf, -150], ["leaf", C.leaf, 0], ["hourglass", C.coral, 150]].map(([name, col, x]) => {
      const n = L.node(cards[2], x, 120); K.medallion(n, 0, 0, 62, name); L.hide(n); return n;
    });
    L.allow(svg);

    // ======================================================================== timeline
    const cu = (w, n) => cue("s08", w, n);
    const tCash = cu("@cash"), tBox = cu("@box"), tProfit = cu("@profit"), tEarned = cu("@earned"), tBr = cu("@bridges"), tE2 = cu("@earned", 2), tUsed = cu("@used"), tOwed = cu("@owed");
    L.drop(tl, cards[0], tCash - 0.15); K.pulseNode(tl, cards[0], tBox, 1.04);
    L.drop(tl, cards[1], tProfit - 0.15); K.pulseNode(tl, cards[1], tEarned, 1.04);
    L.drop(tl, cards[2], tBr - 0.15);
    L.drop(tl, ic[0], tE2 - 0.1); L.drop(tl, ic[1], tUsed - 0.1); L.drop(tl, ic[2], tOwed - 0.1);
    K.pulseNode(tl, cards[2], tOwed + 0.3, 1.04);
    L.spark(svg, tl, 1590, 200, tOwed + 0.6, 36);
  };
})();
