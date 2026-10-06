// s08 — Solo: "just imagine" (SOLO — which two things changed?). Game-show set, the two bins from s07, the scale HUD top-right (bigger so its
// pan contents read). Card 1: gas refill ₹300 → slots Cash −₹300 · Profit −₹300 (HUD dips, a flame slip drops into the Profit pocket, level
// again) → Expense bin. Card 2: second kettle ₹1,500 → Cash −₹1,500 · Equipment +₹1,500 (a swap on the left; HUD does not move) → Asset bin.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    K.wall(svg, K.mixColor(C.teal, "#ffffff", 0.28), 860); K.table(svg, 860);
    [[40, 400, 170, 460], [1800, 440, 120, 420]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#66c4b8" : "#6bc8bc"));

    // ---- HUD (top-right, ~45 %)
    const hudL = L4.layers(svg);
    const hud = K.scaleRig(hudL.sc, 960, 890, 1.0, { tint: true, L: 101000, R: 101000 });
    const P = L4.pans(hud, K, { cash: 51000 });
    const eq = P.eq;
    gsap.set(eq.card, { autoAlpha: 1 }); gsap.set(eq.tag, { autoAlpha: 0 }); eq.list.forEach((p) => gsap.set(p.wrap, { autoAlpha: 1 }));
    gsap.set([P.ravi.body, P.gopal.body], { opacity: 0.4 });
    eq.namePocket(tl, T0, "Profit", { value: 13000 });
    L4.hudSet(hud, hudL, tl, { k: 0.45, right: 40, top: 118, text: 30 });
    const kettleSt = K.g(P.equip.body, {}); K.kettle(kettleSt, 0, -40, 0.34); kettleSt.setAttribute("opacity", "0");
    const Rg = hud.pans.R.g;
    const eqProfit = L4.node(Rg, 81, -196);
    K.paper(K.shadow(eqProfit.inner, 1), K.cutRect(-36, -30, 72, 60, 1.4, 18), C.cream); K.text(eqProfit.inner, 0, 3, "=", { size: 54, weight: 800 });
    eqProfit.outer.setAttribute("opacity", "0");

    // ---- Khata on the judge's stool, with the bell
    const stool = K.g(svg, {});
    K.paper(K.shadow(stool, 2), K.cutRect(250, 920, 200, 84, 2, 20), C.wood);
    K.paper(stool, K.cutRect(250, 920, 200, 14, 1.4, 20), C.woodDark);
    const khata = K.khataRig(svg, 350, 922, 0.6, { expr: "awake" });
    const bell = K.g(svg, {});
    K.paper(K.shadow(bell, 2), K.cutEll(560, 975, 52, 20, 1.2), C.woodDark);
    K.paper(K.shadow(bell, 2), K.cutPoly([[516, 975], [604, 975], [588, 915], [532, 915]], 1.4, 14), C.brass);
    K.paper(bell, K.cutEll(560, 905, 12, 12, 0.8), C.goldDark);

    // ---- bins (same as s07)
    const BX = [1180, 1560], BY = 700;
    const backs = K.g(svg, {}), cardLayer = K.g(svg, {}), fronts = K.g(svg, {});
    BX.forEach((x, i) => {
      const nb = L4.node(backs, x, BY), nf = L4.node(fronts, x, BY);
      K.paper(K.shadow(nb.inner, 2), K.cutRect(-150, -14, 300, 40, 2, 22), C.woodDark);
      K.tex(K.shadow(nf.inner, 2), K.cutRect(-150, 0, 300, 280, 2.4, 26), "pat-kraft");
      K.paper(nf.inner, K.cutRect(-150, 0, 300, 18, 1.4, 22), C.woodDark);
      K.paper(K.shadow(nf.inner, 1), K.cutEll(0, 130, 78, 78, 1.4), C.cream);
      if (i === 0) K.medallion(nf.inner, 0, 130, 58, "flame"); else { const jg = K.g(nf.inner, {}); K.jarRig(jg, 0, 184, 0.62, { contents: "coins", fill: 0.6 }); }
    });
    L4.chip(svg, BX[0], 548, "Expense", { size: 52, bg: C.cr, rot: -2 }); L4.chip(svg, BX[1], 548, "Asset", { size: 52, bg: C.dr, rot: 2 });

    // ---- the two imagine cards
    const CX = 690, CY = 640, CWd = 560, CHt = 400;
    const mkCard = (kind) => {
      const n = L4.card3(cardLayer, CX, CY); n.outer.setAttribute("opacity", "0");
      const ic = K.imagineCard(n.body, 0, 0, CWd, CHt, {});
      const a = ic.area.g;
      K.faceArt(a, "meera", 40).setAttribute("transform", "translate(190 -120)");
      const tk = K.ticker(a, 90, 40, 1, { value: 0, size: 92, weight: 800 });
      if (kind === "gas") K.gasCylinder(a, -140, 110, 0.9, {}); else K.kettle(a, -140, 120, 1.7);
      n.tk = tk; n.ic = ic;
      return n;
    };
    const c1 = mkCard("gas"), c2 = mkCard("kettle");
    const flame = L4.node(cardLayer, CX + 150, CY - 30); K.medallion(flame.inner, 0, 0, 44, "flame", C.coral, C.white); flame.outer.setAttribute("opacity", "0");
    const sparkG = L4.node(cardLayer, CX + 170, CY + 100); K.sparkle(sparkG.inner, 0, 0, 30, C.gold); sparkG.outer.setAttribute("opacity", "0");

    // ---- devices (small), countdown rings
    const dev1 = K.whichTwo(svg, { veil: false, x: CX, y: 300, s: 0.85 });
    const dev2 = K.whichTwo(svg, { veil: false, x: CX, y: 300, s: 0.85 });
    const ring1 = K.pauseMedallion(svg, CX, 196, 0.28, { hidden: true });
    const ring2 = K.pauseMedallion(svg, CX, 196, 0.28, { hidden: true });

    // ================================================================================== timeline
    const bellHop = (t) => { khata.hop(tl, t, { height: 46 }).expr(tl, t, "happy"); khata.arm(tl, t, "R", 70, 0.2); khata.arm(tl, t + 0.4, "R", 15, 0.3); K.pulseNode(tl, bell, t + 0.1, 1.05); };
    khata.blink(tl, T0 + 1.5); khata.blink(tl, T0 + 12); khata.blink(tl, T0 + 30);
    const fly = (card, x0, binX, t, dy = 55) => {
      tl.to(card.mid, { y: -120, duration: 0.25, ease: "power2.out" }, t);
      tl.to(card.mid, { x: binX - x0, duration: 0.5, ease: "power1.inOut" }, t);
      tl.to(card.mid, { y: BY - CY + dy - 45, duration: 0.45, ease: "power2.in" }, t + 0.25);
      tl.to(card.body, { scale: 0.46, svgOrigin: O, duration: 0.45, ease: "power2.in" }, t + 0.25);
    };

    // ---------- card 1: gas ₹300
    const tImagine = cue("s08a", "@imagine"), tThree = cue("s08a", "@three"), tGas = cue("s08a", "@gas"), tWhich = cue("s08a", "@which");
    L4.show(tl, c1.outer, tImagine - 0.2); K.dropIn(tl, c1.inner, tImagine - 0.2, { dur: 0.4 });
    c1.tk.to(tl, tThree, 300, 0.6);
    const slots1 = dev1.run(tl, tWhich - 0.1, { slots: 2, gap: 3.2, veil: false, fill: [] });
    ring1.enter(tl, segEnd("s08a")); ring1.countdown(tl, segEnd("s08a"), { dur: 3.2 });
    K.liftOff(tl, ring1.body, segEnd("s08a") + 3.2, { dur: 0.2 });
    const tCash = cue("s08b", "@cash"), tProfit = cue("s08b", "@profit");
    dev1.fillSlot(tl, tCash + 0.6, 0, { label: "Cash", delta: -300, side: "L" });
    P.cash.light(tl, tCash + 0.7); P.cash.tick(tl, tCash + 0.6, 51000, 50700, 0.5);
    hud.setTotals(tl, tCash + 0.6, 100700, undefined, { dur: 0.6 });
    hud.tilt(tl, tCash + 0.7, -4, { dur: 0.7, ease: "power2.out" });
    bellHop(tCash + 0.7);
    const tSlip = cue("s08b", "@down", 2) - 0.3;
    eq.slip(tl, tSlip, "Profit", -300, { icon: "flame", from: [0, -140] });
    dev1.fillSlot(tl, tSlip + 0.5, 1, { label: "Profit", delta: -300, side: "R" });
    hud.setTotals(tl, tSlip + 0.4, undefined, 100700, { dur: 0.6 });
    hud.settle(tl, tSlip + 0.5, { dur: 0.8, hold: 1.0 });
    bellHop(tSlip + 0.6);
    // "burns away … used up. An expense." — the flame burns off a strip, the card drops into Expense
    const tBurn = cue("s08b", "@burns"), tAnExp = cue("s08b", "@expense");
    L4.show(tl, flame.outer, tBurn); K.dropIn(tl, flame.inner, tBurn, { dur: 0.3 }); K.liftOff(tl, flame.inner, tBurn + 1.6, { dur: 0.3 });
    fly(c1, CX, BX[0], tAnExp - 0.5);
    dev1.clear(tl, tAnExp - 0.5);

    // ---------- card 2: kettle ₹1,500
    const tOneMore = cue("s08c", "@more"), tFifteen = cue("s08c", "@fifteen"), tWhich2 = cue("s08c", "@which");
    L4.show(tl, c2.outer, tOneMore); K.dropIn(tl, c2.inner, tOneMore, { dur: 0.4 });
    c2.tk.to(tl, tFifteen, 1500, 0.7);
    dev2.run(tl, tWhich2 - 0.1, { slots: 2, gap: 3.2, veil: false, fill: [] });
    ring2.enter(tl, segEnd("s08c")); ring2.countdown(tl, segEnd("s08c"), { dur: 3.2 });
    K.liftOff(tl, ring2.body, segEnd("s08c") + 3.2, { dur: 0.2 });
    const tCash2 = cue("s08d", "@cash"), tEquip = cue("s08d", "@equipment");
    dev2.fillSlot(tl, tCash2 + 0.7, 0, { label: "Cash", delta: -1500, side: "L" });
    P.cash.light(tl, tCash2 + 0.8); P.cash.tick(tl, tCash2 + 0.7, 50700, 49200, 0.5);
    bellHop(tCash2 + 0.8);
    K.dropIn(tl, kettleSt, tEquip + 0.8, { dur: 0.4 });
    P.equip.tick(tl, tEquip + 0.8, 36000, 37500, 0.5); P.equip.light(tl, tEquip + 0.9);
    dev2.fillSlot(tl, tEquip + 1.3, 1, { label: "Equipment", delta: 1500, side: "L" });
    hud.pulseTotal(tl, tEquip + 1.5, "L");                                   // the totals do not change — the beam never moves
    bellHop(tEquip + 1.4);
    const tPM = cue("s08d", "@profit");
    L4.show(tl, eqProfit.outer, tPM + 0.2); K.dropIn(tl, eqProfit.inner, tPM + 0.2, { dur: 0.3 });
    const tAnAsset = cue("s08d", "@asset");
    sparkG.outer.setAttribute("opacity", "0");
    fly(c2, CX, BX[1], tAnAsset - 0.4);
    dev2.clear(tl, tAnAsset - 0.4);
  };
})();
