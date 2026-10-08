// s07 — Solo: Infotech's page, then the pattern. The page is already written (viewer's turn: no pencil); a 3-2-1 pause medallion drains through the 3.2 s gap.
//   Reveal in three stages: (1) the 6,000 weight chip drops on the right page, totals 10,000 | 10,000, page levels; (2) it slides down past the double rule and across
//   to the left `May 1` row, `Debit balance` chip lands; (3) hold, dead still. Then "that's the pattern": the corner scale grows to centre; an asset book (blue
//   left page lit) sits on the left pan, a liability book (orange right page lit) on the right pan, level.
(function () {
  // an open mini khata for the pans: `lit` = "L" (blue Dr page lit) or "R" (orange Cr page lit); the other page is greyed
  window.L9.miniOpen = (parent, lit) => {
    const K = window.KIT, C = K.C, g = K.g(parent, {});
    K.tex(K.shadow(g, 2), K.cutRect(-118, -134, 236, 134, 2, 22), "pat-cover");
    K.paper(g, K.cutRect(-118, -134, 236, 134, 2, 22), C.red, { opacity: 0.3 });
    [-1, 1].forEach((sd) => {
      const x0 = sd < 0 ? -108 : 6, on = (sd < 0) === (lit === "L"), col = sd < 0 ? C.dr : C.cr;
      K.tex(g, K.cutRect(x0, -124, 102, 114, 1.2, 18), "pat-paper");
      if (on) { K.paper(g, K.cutRect(x0, -124, 102, 114, 1.2, 18), col, { opacity: 0.45 }); }
      K.paper(g, K.cutRect(x0, -124, 102, 16, 0.6, 12), col);
      for (let i = 0; i < 5; i++) K.ink(g, [[x0 + 10, -94 + i * 18], [x0 + 92, -94 + i * 18]], 3, on ? col : "#a39684", { opacity: on ? 0.9 : 0.5 });
      if (!on) K.paper(g, K.cutRect(x0, -124, 102, 114, 1.2, 18), "#8a8378", { opacity: 0.4 });
      else K.el("path", { d: K.cutRect(x0 - 3, -127, 108, 120, 1.2, 18), fill: "none", stroke: C.gold, "stroke-width": 7, "stroke-linejoin": "round" }, g);
    });
    K.ink(g, [[0, -124], [0, -10]], 5, C.redDark, { opacity: 0.6 });
    return g;
  };

  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.teal, 880);
    const pri = K.priya(svg, 1790, 700, 0.72, { expr: "happy" });
    const tum = K.g(pri.handAnchor("R"), {}); K.tumbler(tum, 0, 8, 1.1); K.holdProp(pri, "R", tum, [12, 8]);
    const PX = 900, PY = 1034, PS = 0.96;
    const pageWrap = K.g(svg, {});
    const lp = K.ledgerPage(pageWrap, PX, PY, PS, { account: "Infotech", icon: "file-text", rows: 3 });
    const rig = K.scaleRig(svg, 960, 895, 1.0, { tint: true, L: 0, R: 0, equation: false });
    const big = K.scaleRig(svg, 960, 895, 1.0, { tint: true, L: 10000, R: 10000, equation: false, hidden: true });
    const pm = K.pauseMedallion(svg, 330, 420, 0.8, { hidden: true });
    const pBal = lp.cellPos("cr", 1, "amt"), pBd = lp.cellPos("dr", 3, "amt");
    const chipA = K.weightChip(svg, 960, 430, 1, { value: 6000, edge: "cr", hidden: true });
    const chipB = K.weightChip(svg, pBal.x - 40, pBal.y, 1, { value: 6000, edge: "cr", hidden: true });
    L9.allow(svg);

    // ---- the three rows are already written when the scene opens
    lp.post(tl, T0 + 0.1, "dr", { date: "Apr 16", other: "Sales", amount: 6000, count: 0.05 });
    lp.post(tl, T0 + 0.14, "dr", { date: "Apr 30", other: "Sales", amount: 4000, count: 0.05 });
    lp.post(tl, T0 + 0.18, "cr", { date: "Apr 25", other: "Bank", amount: 4000, count: 0.05 });
    rig.hud(tl, T0, true, { dur: 0.01, text: 36, top: 24, right: 24 }); rig.enter(tl, T0 + 0.2);
    pri.blinks(tl, T0 + 1, sc.end, 3.5);

    // ---------------- s07a — the question; totals tick as the rows are named, the page tips toward the heavier left
    const tL = cue("s07a", "@left"), tSix = cue("s07a", "@six"), tFour = cue("s07a", "@four"), tR = cue("s07a", "@right");
    rig.setTotals(tl, tSix, 6000, undefined, { dur: 0.5 }); rig.setTotals(tl, tFour, 10000, undefined, { dur: 0.5 });
    rig.setTotals(tl, cue("s07a", "@four", 2), undefined, 4000, { dur: 0.5 });
    tl.to(pageWrap, { rotation: -2, svgOrigin: "900 640", duration: 0.9, ease: "power2.out" }, cue("s07a", "@twenty-fifth"));
    rig.tilt(tl, cue("s07a", "@twenty-fifth"), 3);
    // the countdown ring drains through the 3.2 s gap (after "which side?")
    const tGap = segEnd("s07a");
    pm.enter(tl, tGap - 0.2); pm.countdown(tl, tGap + 0.1, { dur: 3.0 });
    pri.look(tl, tGap, -6, 4);

    // ---------------- s07b — the reveal in three stages
    const tSix2 = cue("s07b", "@six"), tDeb = cue("s07b", "@debit");
    pm.exit(tl, tSix2 - 0.1);
    chipA.enter(tl, tSix2 + 0.1);
    const dropT = tDeb - 0.55;
    tl.to(chipA.body, { x: pBal.x - 960 - 40, y: pBal.y - 430, duration: 0.55, ease: "power2.in" }, dropT);
    const rBal = lp.balance(tl, dropT + 0.55, { cd: 6000, side: "cr", date: "Apr 30" });
    tl.to(chipA.body, { autoAlpha: 0, duration: 0.15 }, dropT + 0.57);
    const tot = lp.total(tl, dropT + 1.2, { row: 2, dr: 10000, cr: 10000 });
    tl.to(pageWrap, { rotation: 0, svgOrigin: "900 640", duration: 0.7, ease: "power2.inOut" }, dropT + 0.6);
    rig.settle(tl, dropT + 0.6, { dur: 0.8 }); rig.setTotals(tl, dropT + 0.7, undefined, 10000, { dur: 0.7 });
    // stage 2 — "Infotech still owes the stall": the chip slides down and across to the left page
    const tOw = cue("s07b", "@owes");
    pri.expr(tl, tOw - 0.2, "worried").wave(tl, tOw - 0.1, "L", 2);
    chipB.enter(tl, tOw - 0.5);
    tl.to(chipB.body, { y: pBd.y - pBal.y, duration: 0.55, ease: "power2.inOut" }, tOw - 0.1);
    tl.to(chipB.body, { x: pBd.x - (pBal.x - 40) - 100, duration: 0.7, ease: "power2.inOut" }, tOw + 0.4);
    lp.broughtDown(tl, tOw + 1.1, { amount: 6000, side: "dr", date: "May 1" });
    tl.to(chipB.body, { autoAlpha: 0, duration: 0.15 }, tOw + 1.12);
    lp.sideChip(tl, tOw + 1.4, "debit");
    pri.expr(tl, tOw + 1.8, "happy");
    // stage 3 — hold. Then "that's the pattern": the scale grows to centre with the two books
    const tPat = cue("s07b", "@pattern");
    lp.exit(tl, tPat - 0.6); 
    rig.exit(tl, tPat - 0.3, { dur: 0.25 }); big.enter(tl, tPat - 0.2);
    const bA = L9.node(big.pans.L.g, 0, 0); L9.hide(bA); window.L9.miniOpen(bA, "L");
    const bL = L9.node(big.pans.R.g, 0, 0); L9.hide(bL); window.L9.miniOpen(bL, "R");
    L9.drop(tl, bA, tPat + 0.6, { dur: 0.4 }); L9.drop(tl, bL, tPat + 1.0, { dur: 0.4 });
    big.labelPan(tl, tPat + 0.9, "L", ["Assets"]); big.labelPan(tl, tPat + 1.3, "R", ["Liabilities"]);
    big.tint(tl, tPat + 0.6, "both");
  };
})();
