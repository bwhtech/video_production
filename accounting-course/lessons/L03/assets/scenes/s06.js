// s06 — T5, solo: Gopal's delivery (₹8,000 of milk and supplies, pay later). The two changes are GIVEN (pre-filled slots: no gap, no veil);
// the viewer predicts only the two pan totals (`? = ? + 50,000`, 3.2 s countdown). Reveal: stock up on the left → the scale tips
// (≈5°, held 0.6 s) → Gopal's TAG lands on the right → level. 88,000 = 38,000 + 50,000. Out: the scale shrinks into the corner (HUD).
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", B = { x: 720, y: 895, s: 1.1 };
    const T0 = sc.start, GY = 1015;
    L3.stage(K, svg, C.teal, 880);
    const cal = L3.cal(K, svg, 3);

    // ---- the scale as T4 left it: Cash 38,000 · Equipment 36,000 · Stock 6,000 = 80,000 | Meera 50,000 + Ravi 30,000
    const rig = K.scaleRig(svg, B.x, B.y, B.s, { tint: true, L: 80000, R: 80000, equation: true });
    rig.labelPan(tl, T0 - 0.6, "L", ["Assets"], { stagger: 0.001 });
    rig.labelPan(tl, T0 - 0.6, "R", [{ text: "Liabilities", value: 30000 }, { text: "Equity", value: 50000 }], { stagger: 0.001 });
    rig.equation(tl, T0 - 0.5, "80,000 = 30,000 + 50,000");
    const cash = L3.jar(K, rig, 0, 3, { label: "Cash", contents: "coins", amount: 38000, fill: 0.25 });
    const equip = L3.jar(K, rig, 1, 3, { label: "Equipment", contents: "cart", amount: 36000 });
    const stock = L3.jar(K, rig, 2, 3, { label: "Stock", contents: "leaves", amount: 6000, fill: 0.5 });
    // right pan: three slots (n = 3) — the two tags sit centred until Gopal's tag arrives, then shift left
    const TS = L3.TAG_S[3], xs3 = L3.slots(3, 112);
    const meeraTag = K.claimTag(rig.pans.R.g, -56, 0, TS, { face: "meera", amount: 50000, size: 54 });
    const raviTag = K.claimTag(rig.pans.R.g, 56, 0, TS, { face: "ravi", amount: 30000, size: 54 });
    const gopalTag = K.claimTag(rig.pans.R.g, xs3[2], 0, TS, { face: "gopal", amount: 0, size: 54, hidden: true });
    const shiftL = -56 / TS;                                         // tags shift 56 px left (in tag-local units)
    // `?` chips for the two pan totals (replace the real chips while the viewer predicts)
    const qChip = (side) => { const n = L3.hide(L3.node(K, rig.pans[side].hang, 0, 370)); K.tex(K.shadow(n, 1), K.cutRect(-125, -35, 250, 70, 1.6, 22), "pat-paper"); K.paper(n, K.cutRect(-113, 25, 226, 7, 0.5, 14), side === "L" ? C.dr : C.cr); K.text(n, 0, 3, "?", { size: 58, weight: 800 }); return n; };
    const qL = qChip("L"), qR = qChip("R");

    // ---- cast: Meera (right), Gopal + his hand-cart with two milk cans (arriving from the right)
    const MX = 1440;
    const m = K.meera(svg, MX, GY, 0.85, { expr: "happy" });
    const slipM = K.g(m.handAnchor("R"), {}); K.slip(slipM, 0, -10, 0.55, -4, "clock"); K.holdProp(m, "R", slipM, [12, 8]); L3.hide(slipM);
    const hcX0 = 2250, hcX1 = 1650, HS = 0.75;
    const hc = L3.node(K, svg, hcX0, GY, HS);
    K.paper(K.shadow(hc, 1), K.cutRect(-175, -112, 350, 28, 2, 24), C.wood);
    K.ink(hc, [[175, -100], [250, -170]], 10, C.woodDark);
    const hcWheels = [-105, 105].map((wx) => { const wp = K.g(hc, { transform: `translate(${wx} -48)` }); const w = K.g(wp, {}); K.paper(K.shadow(w, 2), K.cutEll(0, 0, 46, 46, 1.6), "#3b2a20"); K.paper(w, K.cutEll(0, 0, 33, 33, 1.2), C.wood); for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; K.ink(w, [[0, 0], [Math.cos(a) * 32, Math.sin(a) * 32]], 4, "#3b2a20"); } return w; });
    const cans = K.milkCans(hc, 0, -112, 0.9);
    const gopal = K.gopal(svg, hcX0 + 185, GY, 0.85, { expr: "happy" });
    const slipG = K.g(gopal.handAnchor("L"), {}); K.slip(slipG, 0, -10, 0.55, 4, "clock"); K.holdProp(gopal, "L", slipG, [12, 8]); L3.hide(slipG);
    // the cans' stand-ins that fly to the Stock jar at the reveal (paper stickers)
    const stockJarPos = [B.x - 380 * B.s + 122 * B.s, B.y - 270 * B.s - 150];
    const fly = [["milk", C.sky], ["package", C.coral]].map(([ic, col]) => { const n = L3.hide(L3.node(K, svg, hcX1, GY - 270)); K.medallion(n, 0, 0, 42, ic, col); return n; });

    // ---- the pre-filled device (no gap, no veil) + the countdown ring + Khata
    const pm = K.pauseMedallion(svg, 1560, 330, 0.6, { hidden: true });
        const w2 = K.whichTwo(svg, { veil: false, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); gopal.blinks(tl, T0 + 4, sc.end, 3.9);
    m.jitter(tl, T0, sc.end); gopal.jitter(tl, T0, sc.end);
    // "Now you, on your own." — Meera turns to us and nods in invitation
    m.expr(tl, cue("s06a", "@you"), "grin").look(tl, cue("s06a", "@you"), 0, -3);
    // "Gopal Dairy delivers…" — Gopal wheels two milk cans in from the right and stops beside Meera
    const tG = cue("s06a", "@gopal"), tArr = cue("s06a", "@eight") + 0.3;
    const wdur = tArr - tG + 0.3;
    tl.to(hc, { x: (hcX1 - hcX0) / HS, duration: wdur, ease: K.stepEase(wdur, "power1.out", tG - 0.5) }, tG - 0.5);
    hcWheels.forEach((w) => tl.to(w, { rotation: -(hcX0 - hcX1) / HS / 46 * 57.3, svgOrigin: O, duration: wdur, ease: K.stepEase(wdur, "power1.out", tG - 0.5) }, tG - 0.5));
    gopal.walkTo(tl, tG - 0.5, hcX1 + 185, wdur);
    m.look(tl, tG, 8, 0);
    // "Meera will pay later." — Gopal hands her a paper slip with a clock; she nods
    const tPay = cue("s06a", "@pay");
    L3.drop(tl, K, slipG, tPay - 0.3, { dur: 0.25 });
    gopal.arm(tl, tPay - 0.2, "L", 70, 40, 0.3);
    tl.set(slipG, { opacity: 0 }, tPay + 0.25); tl.set(slipM, { opacity: 1 }, tPay + 0.25);
    m.arm(tl, tPay + 0.1, "R", 50, 50, 0.3).headTilt(tl, tPay + 0.35, 5).headTilt(tl, tPay + 0.7, 0);
    gopal.arm(tl, tPay + 0.6, "L", 12, 8, 0.3); m.arm(tl, tPay + 1.1, "R", 20, 70, 0.4);
    // "You already know the two changes…" — the slots drop in at once and fill IMMEDIATELY (nothing lands on the pans yet)
    const tCh = cue("s06a", "@changes");
    w2.run(tl, tCh, { slots: 2, gap: 0, veil: false, fill: [
      { label: "Stock", delta: 8000, side: "L", at: cue("s06a", "@stock") },
      { label: "Gopal Dairy", delta: 8000, side: "R", at: cue("s06a", "@owed") },
    ] });
    m.look(tl, tCh, 0, -6).expr(tl, tCh, "thinking");
    // "what does each side of the scale read now?" — `?` chips under BOTH totals, the strip blanks to `? = ? + 50,000`
    const tQ = cue("s06a", "@each");
    rig.pans.L.total.exit(tl, tQ - 0.05); rig.pans.R.total.exit(tl, tQ - 0.05);
    L3.drop(tl, K, qL, tQ); L3.drop(tl, K, qR, tQ + 0.1);
    rig.equation(tl, tQ + 0.2, "? = ? + 50,000");
    // the 3.2 s countdown: ring drains, everything else dead still (music dips via music.json hush)
    const tCount = segEnd("s06a");
    pm.enter(tl, cue("s06a", "@read") - 0.2);
    pm.countdown(tl, tCount, { dur: 3.2 });
    m.expr(tl, tCount - 0.3, "thinking").arm(tl, tCount - 0.2, "R", 60, 40, 0.4);

    // s06b "Stock goes up by eight thousand, on the left." — the cans lift off Gopal's cart and pour into the Stock jar
    pm.exit(tl, tCount + 3.3);
    const tStock = cue("s06b", "@stock"), tLeft = cue("s06b", "@left");
    m.arm(tl, tStock - 0.2, "R", 12, 8, 0.4);
    fly.forEach((n, i) => {
      const t = tStock + i * 0.18, dx = stockJarPos[0] - hcX1, dy = stockJarPos[1] + 30 - (GY - 270);
      L3.drop(tl, K, n, t - 0.05, { dur: 0.15 });
      tl.to(n, { x: dx, duration: 1.0, ease: "power1.inOut" }, t);
      tl.to(n, { y: -240, duration: 0.5, ease: "power2.out" }, t);
      tl.to(n, { y: dy, rotation: 40, svgOrigin: O, duration: 0.5, ease: "power2.in" }, t + 0.5);
      tl.to(n, { autoAlpha: 0, scale: 0.6, svgOrigin: O, duration: 0.12 }, t + 1.0);
    });
    cans.tip(tl, tStock + 0.05, 1, -40, 0.4); cans.level(tl, tStock + 0.9, 1);
    const tLand = tStock + 1.2;
    stock.tick(tl, tLand, 6000, 14000, 0.8); stock.fill(tl, tLand, 1.0);
    stock.light(tl, tLand + 0.05, { hold: 0.8 });
    // left total `?` → 88,000 (counting up from 80,000); the beam tilts left ≈ 5° and HOLDS (~0.6 s) — "for a moment, the scale tips"
    const tTips = cue("s06b", "@tips");
    L3.lift(tl, K, qL, tLand + 0.1);
    rig.pans.L.total.enter(tl, tLand + 0.2);
    rig.pans.L.total.set(tl, tLand + 0.15, 80000);
    rig.setTotals(tl, tLand + 0.25, 88000, undefined, { dur: 0.7 });
    rig.tilt(tl, tLand + 0.2, 5, { dur: 0.9 });
    // "…then the right pan catches up." — Gopal's tag lands on the right pan; its total counts 80,000 → 88,000; the beam returns to level
    const tCatch = cue("s06b", "@catches");
    tl.to(meeraTag.body, { x: shiftL, duration: 0.45, ease: "power2.inOut" }, tCatch - 0.2);
    tl.to(raviTag.body, { x: shiftL, duration: 0.45, ease: "power2.inOut" }, tCatch - 0.2);
    gopalTag.enter(tl, tCatch + 0.1); gopalTag.tick(tl, tCatch + 0.2, 0, 8000, 0.8);
    L3.lift(tl, K, qR, tCatch + 0.15);
    rig.pans.R.total.enter(tl, tCatch + 0.25);
    rig.pans.R.total.set(tl, tCatch + 0.2, 80000);
    rig.setTotals(tl, tCatch + 0.3, undefined, 88000, { dur: 0.7 });
    rig.pans.R.labels[0].ticker.to(tl, tCatch + 0.3, 38000, 0.7);
    rig.settle(tl, tCatch + 0.9, { dur: 0.9, hold: 1.5 });
    gopalTag.light(tl, tCatch + 0.35, { hold: 0.7 });
    // "Meera now owes Gopal…" / "Eighty-eight thousand equals thirty-eight thousand plus fifty thousand." — the strip fills
    rig.equation(tl, cue("s06b", "@eighty-eight"), "88,000 = 38,000 + 50,000");
    gopal.expr(tl, cue("s06b", "@owes"), "happy");
    // "Level." — level line flash, Meera joy
    const tLevel = cue("s06b", "@level");
    rig.levelFlash(tl, tLevel); m.expr(tl, tLevel, "joy");
    // exit: the whole scale shrinks into the top-right corner and parks there as the HUD (≥ 1.5 s of level hold has passed)
    rig.hud(tl, sc.end - 1.5, true, { dur: 0.8 });
    L3.allow(w2.g);
  };
})();
