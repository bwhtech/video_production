// s06 — Faded: Gopal Dairy's page + the misconception (a credit balance ≠ money for the stall).
//   Meera writes the two rows, the viewer works it out through the 2.4 s gap (a `?` chip hangs over the page), the answer balances the page
//   (c/d on the lighter LEFT, b/d on the RIGHT, `Credit balance`). Coral beat: Meera beams — thought bubble with coins into her purse → ✗ stamp.
//   Gopal holds up a ₹3,000 tag with the stall's face; the corner scale grows to centre and Gopal's book + tag sit on the right (L + E) pan.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.teal, 880);
    const coral = K.g(svg, { opacity: 0 }); L9.stage(coral, C.coral, 880);
    const m = K.meera(svg, 360, 700, 0.72, { expr: "happy" });
    const gop = K.gopal(svg, 1780, 700, 0.72, { expr: "neutral" });
    const pencil = K.g(m.handAnchor("R"), {}); K.ink(pencil, [[-4, 0], [26, -34]], 8, C.gold); K.paper(pencil, K.cutPoly([[26, -34], [35, -44], [30, -30]], 0.3, 6), C.pink);
    K.holdProp(m, "R", pencil, [12, 8]);
    const PX = 900, PY = 1034, PS = 0.96;
    const pageWrap = K.g(svg, {});
    const lp = K.ledgerPage(pageWrap, PX, PY, PS, { account: "Gopal Dairy", icon: "milk", rows: 3, hidden: true });
    const rig = K.scaleRig(svg, 960, 895, 1.0, { tint: true, L: 0, R: 0, equation: false });
    const big = K.scaleRig(svg, 960, 895, 1.0, { tint: true, L: 8000, R: 8000, equation: false, hidden: true });
    const chipQ = K.weightChip(svg, 960, 430, 1, { value: "?", edge: "dr" });
    const chipB = K.weightChip(svg, 960, 430, 1, { value: 3000, edge: "dr", hidden: true });
    // the misconception: Meera's thought bubble — coins raining into her purse
    const bub = L9.node(svg, 560, 235); L9.hide(bub);
    K.cloud(bub, 0, 0, 1.55);
    const purse = K.purse(bub, 0, -70, 1.0, { color: C.coral, icon: "wallet" });
    const coins = [-34, 0, 34, 12].map((dx, i) => { const n = L9.node(bub, dx, -150); L9.hide(n); K.coin(n, 0, 0, 22, i * 20); return n; });
    [[-120, 90, 18], [-150, 120, 12]].forEach(([dx, dy, r]) => K.paper(bub, K.cutEll(dx, dy, r, r, 1), C.cream));
    // Gopal's ₹3,000 tag with the stall's face
    const tagG = K.claimTag(svg, 1330, 520, 1.0, { face: "meera", amount: 3000, hidden: true });
    L9.allow(svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1, sc.end, 3.3); gop.blinks(tl, T0 + 1.6, sc.end, 3.7);
    // ---------------- s06a — Gopal's page, Meera writes two rows
    const tTurn = cue("s06a", "@turn");
    lp.enter(tl, tTurn - 0.2);
    rig.hud(tl, T0, true, { dur: 0.01, text: 36, top: 24, right: 24 }); rig.enter(tl, T0 + 0.2);
    const tEight = cue("s06a", "@eight"), tFive = cue("s06a", "@five");
    m.arm(tl, tEight - 0.4, "R", 70, 50, 0.3); m.look(tl, tEight - 0.3, 8, 6);
    const r1 = lp.post(tl, tEight, "cr", { date: "Apr 3", other: "Stock", amount: 8000 });
    rig.setTotals(tl, tEight + 0.2, undefined, 8000, { dur: 0.6 }); rig.tilt(tl, tEight + 0.3, -3, { dur: 0.7 });
    for (let k = 0; k < 4; k++) m.arm(tl, tEight + 0.1 + k * 0.2, "R", 70 + (k % 2 ? 6 : -4), 50 + (k % 2 ? -8 : 8), 0.12);
    m.arm(tl, tFive - 0.4, "R", 62, 60, 0.3);
    const r2 = lp.post(tl, tFive, "dr", { date: "Apr 20", other: "Cash", amount: 5000 });
    rig.setTotals(tl, tFive + 0.2, 5000, undefined, { dur: 0.6 });
    for (let k = 0; k < 4; k++) m.arm(tl, tFive + 0.1 + k * 0.2, "R", 62 + (k % 2 ? 6 : -4), 60 + (k % 2 ? -8 : 8), 0.12);
    // "which side is heavier, and what's the balance?" — she looks at us and holds still; the `?` chip hangs over the page
    const tHv = cue("s06a", "@heavier");
    m.arm(tl, tHv - 0.2, "R", 12, 8, 0.3).expr(tl, tHv - 0.2, "thinking").look(tl, tHv, 0, 0);
    chipQ.enter(tl, tHv + 0.3);

    // ---------------- s06b — the answer: the pencil drifts to the right page, hesitates, then writes on the LEFT (the lighter side)
    const tR = cue("s06b", "@right"), t3 = cue("s06b", "@three");
    m.expr(tl, tR, "happy").arm(tl, tR, "R", 92, 30, 0.3);
    m.arm(tl, tR + 0.55, "R", 92, 30, 0.1);                       // one step of hesitation
    m.arm(tl, t3 - 0.2, "R", 60, 62, 0.3);
    chipQ.reveal(tl, tR + 0.05, 3000);
    const dropT = t3 + 0.25, pB = lp.cellPos("dr", 1, "amt");
    tl.to(chipQ.body, { x: pB.x - 960 - 40, y: pB.y - 430, duration: 0.5, ease: "power2.in" }, dropT);
    const rBal = lp.balance(tl, dropT + 0.5, { side: "dr", date: "Apr 30" });
    tl.to(chipQ.body, { autoAlpha: 0, duration: 0.15 }, dropT + 0.52);
    const tot = lp.total(tl, dropT + 1.0, {});
    rig.setTotals(tl, dropT + 1.0, 8000, undefined, { dur: 0.6 });
    rig.settle(tl, dropT + 1.0, { dur: 0.8 });
    const rBd = lp.broughtDown(tl, dropT + 1.8, { date: "May 1" });
    lp.sideChip(tl, cue("s06b", "@credit") + 0.1, "credit");
    for (let k = 0; k < 3; k++) m.arm(tl, dropT + 0.55 + k * 0.2, "R", 60 + (k % 2 ? 5 : -5), 62 + (k % 2 ? -6 : 6), 0.12);
    m.arm(tl, dropT + 1.5, "R", 12, 8, 0.3);

    // ---------------- s06c — the misconception (coral)
    const tBeam = cue("s06c", "@meera");
    tl.to(coral, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, tBeam - 0.3);
    m.expr(tl, cue("s06c", "@beams"), "joy").hop(tl, cue("s06c", "@beams"), { height: 34 });
    const tSnd = cue("s06c", "@sounds");
    L9.drop(tl, bub, tSnd - 0.3, { dur: 0.4 });
    coins.forEach((c, i) => {
      const t0 = cue("s06c", "@money") - 0.2 + i * 0.28;
      tl.fromTo(c, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 55, duration: 0.3, ease: K.stepEase(0.3, "power1.in", t0), immediateRender: false }, t0);
      tl.to(c, { autoAlpha: 0, duration: 0.08 }, t0 + 0.3);
    });
    purse.swing(tl, cue("s06c", "@money") + 0.6);
    // ---------------- s06d — "Nope."
    const tNo = cue("s06d", "@nope");
    const st = K.stamp(tl, svg, 560, 255, tNo, 1.8);
    m.expr(tl, tNo + 0.2, "puzzled");
    tl.to(coral, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, tNo + 0.9);
    L9.lift(tl, bub, tNo + 1.4, { dur: 0.25 }); st.lift(tl, tNo + 1.4);
    // Gopal holds up the ₹3,000 tag (the stall owes him)
    const tOw = cue("s06d", "@owes");
    gop.expr(tl, tOw - 0.3, "happy").arm(tl, tOw - 0.3, "R", 120, 40, 0.35);
    tagG.enter(tl, tOw - 0.1); tagG.pulse(tl, tOw + 0.3);
    // the corner scale grows to centre; Gopal's book + tag sit on the right (liabilities + equity) pan
    const tLi = cue("s06d", "@liability");
    lp.exit(tl, tLi - 0.8);
    tagG.exit(tl, tLi - 0.6);
    m.walkTo(tl, tLi - 0.6, 150, 0.9); 
    rig.exit(tl, tLi - 0.3, { dur: 0.25 }); big.enter(tl, tLi - 0.2);
    const bookN = L9.node(big.pans.R.g, -62, 0); L9.hide(bookN); K.smallBook(bookN, 0, 0, 96, 170, "milk");
    const tagN = K.claimTag(big.pans.R.g, 66, 0, 0.7, { face: "gopal", amount: 3000, hidden: true });
    tl.fromTo(bookN, { autoAlpha: 0, y: -260 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.in", immediateRender: false }, tLi + 0.5);
    tagN.enter(tl, tLi + 0.9);
    big.tint(tl, tLi + 0.5, "R");
    big.tilt(tl, tLi + 0.55, -3, { dur: 0.6 });
    big.settle(tl, cue("s06d", "@sits") - 0.3, { dur: 0.9 });
    gop.arm(tl, tLi + 1.0, "R", 12, 8, 0.4);
  };
})();
