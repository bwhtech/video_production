// s05 — Two weeks of chai (FADED: Meera finds the second change). Stage A: time-lapse Apr 2 → 15 at the stall, Raju debuts (tray hand-off),
// the sales ticker climbs to ₹18,000. Stage B: back to the scale — slot 1 = Cash +₹18,000, the device runs, Meera thinks, then POINTS at the
// `?` pocket (it glows only after her point), the revenue slip lands beside the rent slip, the scale settles, chip Revenue.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    const cam = K.g(svg, { id: "s05-cam" });
    const calG = K.g(svg, {});
    const S = L4.street(cam, K, { wall: C.saffron, dark: "#e39a30", mid: "#eba541", win: "#f6b655", landlord: false });
    const street = S.street, m = S.meera;
    const cal = K.calendarStrip(calG, 960, 70, 1.0, { highlight: 2 });
    const flashRing = (node, t, hold = 1.0) => { tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t); tl.to(node, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold); };

    // ---- stage A cast: Raju (tray), customers (tone-on-tone silhouettes), coins, sales ticker
    const raju = K.raju(street, 1500, 1000, 1.05, { expr: "happy" });
    raju.trayShow(tl, T0, true);
    const mTray = K.g(m.handAnchor("L"), {});                     // Meera's own tray (appears at the hand-off)
    {
      const tp = K.g(mTray, { transform: "translate(0 -14)" });
      K.paper(K.shadow(tp, 1), K.cutEll(0, 0, 98, 11, 1.2), "#cfcac2");
      K.paper(tp, K.cutEll(0, -2, 90, 7, 0.8), "#e3dfd8");
      [-48, 0, 48].forEach((tx, i) => K.tumbler(tp, tx, -4 + (i % 2) * 2, 1));
      K.holdProp(m, "L", mTray, [12, 8]);
    }
    mTray.setAttribute("opacity", "0");
    const INK = "#c58224";
    const cust = [1230, 1400, 1580].map((x, i) => K.meera(street, x, 1000, 0.62, {
      skin: INK, top: INK, legs: INK, shoes: INK, apron: false, earrings: false, collar: false, hair: i === 1 ? "bald" : i === 2 ? "pony" : undefined, flip: true, expr: "neutral",
    }));
    const nameChip = L4.chip(street, 980, 330, "Raju", { bg: C.sky, size: 52, rot: -3 });
    nameChip.outer.setAttribute("opacity", "0");
    const sales = L4.node(cam, 270, 245);
    const salesT = K.ticker(sales.inner, 0, 0, 1, { value: 0, size: 62, chip: true, w: 330, h: 100, edge: C.cr });
    const coins = Array.from({ length: 13 }, (_, i) => {
      const n = L4.node(street, 264, 560); K.coin(n.inner, 0, 0, 20, 0); n.outer.setAttribute("opacity", "0"); return n;
    });

    // ---- stage B: the hero scale (state after s04: cash 33,000, equity card open with the rent slip in the `?` pocket)
    const hud = K.scaleRig(cam, 960, 890, 1.0, { tint: true, L: 83000, R: 83000, hidden: true });
    const P = L4.pans(hud, K, { cash: 33000 });
    const eq = P.eq;
    gsap.set(eq.card, { autoAlpha: 1 }); gsap.set(eq.tag, { autoAlpha: 0 });
    eq.list.forEach((p) => gsap.set(p.wrap, { autoAlpha: 1 }));
    gsap.set([P.ravi.body, P.gopal.body], { opacity: 0.4 });
    gsap.set(P.ravi.body, { x: 380 / 0.58 }); gsap.set(P.gopal.body, { x: 255 / 0.58 });                          // stepped aside in s04
    eq.slip(tl, T0, "Profit", -5000, { icon: "key", from: [0, 0], dur: 0.01 });
    hud.equation(tl, T0, "₹83,000 = ₹38,000 + ₹45,000");
    const Rg = hud.pans.R.g;
    const mkEqTag = (x, y) => {
      const n = L4.node(Rg, x, y);
      K.paper(K.shadow(n.inner, 1), K.cutRect(-36, -30, 72, 60, 1.4, 18), C.cream);
      K.text(n.inner, 0, 3, "=", { size: 54, weight: 800, color: C.ink });
      n.outer.setAttribute("opacity", "0");
      return n;
    };
    const eqRavi = mkEqTag(250, -88), eqGopal = mkEqTag(385, -88), eqCap = mkEqTag(-81, -200);
    const revChip = L4.chip(cam, 1672, 420, "Revenue", { bg: C.coral, size: 50, rot: -3 });
    revChip.outer.setAttribute("opacity", "0");
    const khata = K.khataRig(cam, 1700, 1000, 0.5, { expr: "awake" });
    const dev = K.whichTwo(svg, { veil: true, x: 960, y: 188 });

    // ================================================================================== timeline
    const tNow = cue("s05a", "@now"), tMeera = cue("s05a", "@meera"), tRaju = cue("s05a", "@raju"), tHelper = cue("s05a", "@helper");
    const tWeeks = cue("s05a", "@weeks"), tGlass = cue("s05a", "@glass");
    m.blinks(tl, T0 + 1, sc.end, 3.3); khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 20);
    gsap.set(khata.g, { opacity: 0 });
    // Meera opens for business: a happy hop-less lean + wave to the queue
    m.expr(tl, tMeera, "grin"); m.wave(tl, tMeera + 0.3, "R", 2);
    cust.forEach((c, i) => { c.walkTo(tl, tNow + i * 0.25, [1230, 1400, 1580][i] - 130, 1.0); });
    // Raju steps in from the back carrying a tray of glasses, hands it to Meera; name chip for ~1.5 s
    raju.walkTo(tl, tRaju - 0.4, 860, 1.4);
    raju.carry(tl, tRaju - 0.3);
    L4.show(tl, nameChip.outer, tRaju + 0.15); K.dropIn(tl, nameChip.inner, tRaju + 0.15, { dur: 0.34 });
    K.liftOff(tl, nameChip.inner, tRaju + 1.7); tl.set(nameChip.outer, { autoAlpha: 0 }, tRaju + 2.05);
    const tHand = tHelper + 0.35;
    raju.lower(tl, tHand - 0.15); m.arm(tl, tHand - 0.2, "L", 50, 60, 0.3);
    raju.trayShow(tl, tHand + 0.15, false);
    tl.set(mTray, { opacity: 1 }, tHand + 0.15);
    m.expr(tl, tHand + 0.2, "happy").headTilt(tl, tHand + 0.2, 4);
    m.arm(tl, tHand + 1.0, "L", 12, 8, 0.4);
    tl.set(mTray, { opacity: 0 }, tHand + 1.1);
    // time-lapse: calendar 2 → 15 (stepped), a coin per step into the galla, the sales counter climbs; Raju ferries a tray every ~3 steps
    const tLapse0 = tWeeks - 0.1, STEP = 0.3;
    cal.tickTo(tl, tLapse0, 15, { dur: 13 * STEP, stepped: true });
    const tEnd = cue("s05b", "@eighteen");
    salesT.to(tl, tLapse0, 18000, tEnd - tLapse0 + 0.3, { ease: "power1.inOut" });
    L4.drop(tl, sales.inner, tLapse0 - 0.3); L4.show(tl, sales.outer, tLapse0 - 0.3);
    sales.outer.setAttribute("opacity", "0");
    coins.forEach((c, i) => {
      const t = tLapse0 + i * STEP;
      tl.set(c.outer, { autoAlpha: 1 }, t);
      tl.fromTo(c.inner, { y: 0, opacity: 1 }, { y: 100, duration: 0.24, ease: "power2.in", immediateRender: false }, t);
      tl.set(c.outer, { autoAlpha: 0 }, t + 0.26);
    });
    [0, 1, 2, 3].forEach((k) => {
      const t = tLapse0 + 0.2 + k * 0.9;
      raju.trayShow(tl, t, true); raju.carry(tl, t); raju.walkTo(tl, t, 800, 0.4); raju.walkTo(tl, t + 0.45, 860, 0.4);
      raju.trayShow(tl, t + 0.4, false);
    });
    cust.forEach((c, i) => { if (i < 2) { const t = tLapse0 + 1.0 + i * 1.9; c.walkTo(tl, t, 1030 + i * 90, 0.8); c.walkTo(tl, t + 1.6, [1230, 1400][i], 1.0); } });
    // stage A → B: customers leave, the street shrinks to the bottom-left, the scale comes in (Cash goes up by eighteen thousand)
    const tCashUp = cue("s05b", "@cash");
    cust.forEach((c) => tl.to(c.g, { opacity: 0, duration: 0.3 }, tCashUp - 0.9));
    tl.to(sales.inner, { opacity: 0, duration: 0.3 }, tCashUp - 0.8);
    tl.to(street, { x: -160, y: 500, scale: 0.5, duration: 1.0, ease: "power2.inOut" }, tCashUp - 0.8);
    hud.enter(tl, tCashUp - 0.3);
    tl.fromTo(khata.g, { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, tCashUp + 0.3);
    // the device: veil + two slots; slot 1 = Cash +₹18,000, slot 2 stays blank (`?`) — Meera's turn
    dev.run(tl, tCashUp - 0.2, { slots: 2, gap: 0, fill: [] });
    const tUp = tCashUp + 0.9;
    dev.fillSlot(tl, tUp, 0, { label: "Cash", delta: 18000, side: "L" });
    P.cash.light(tl, tUp + 0.1);
    P.cash.tick(tl, tUp, 33000, 51000, 0.7);
    hud.setTotals(tl, tUp, 101000, undefined, { dur: 0.8 });
    hud.tilt(tl, tUp + 0.1, 6, { dur: 0.9, ease: "power2.out" });
    dev.fillSlot(tl, cue("s05b", "@turn") + 0.3, 1, { pending: true });
    // Meera thinks during the 2.0 s gap, then points at the `?` pocket
    const tGap = segEnd("s05b");
    m.look(tl, tGap + 0.1, 6, -2).expr(tl, tGap + 0.1, "thinking");
    m.look(tl, tGap + 0.7, 9, -3);
    m.arm(tl, tGap + 0.9, "L", 130, 120, 0.25); m.arm(tl, tGap + 1.25, "L", 128, 112, 0.2); m.arm(tl, tGap + 1.5, "L", 130, 120, 0.2);   // chin tap
    const tPoint = tGap + 1.8;
    m.arm(tl, tPoint - 0.05, "L", 12, 8, 0.2);
    m.point(tl, tPoint, "R", 72); m.expr(tl, tPoint, "grin");
    // the pocket glows ONLY after her point; slot 2 fills; veil lifts
    eq.light(tl, tPoint + 0.35, "Profit", { hold: 1.2 });
    dev.fillSlot(tl, tPoint + 0.35, 1, { label: "Equity", delta: 18000, side: "R" });
    tl.to(dev.veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, tPoint + 0.4);
    khata.look(tl, tPoint, 0, -3);
    // s05c — no new debt, no new savings, she earned it → into the new pocket beside the rent
    const tBorrow = cue("s05c", "@borrow"), tSav = cue("s05c", "@savings"), tEarned = cue("s05c", "@earned"), tPocket = cue("s05c", "@pocket");
    const eqRule = (n, t) => { L4.show(tl, n.outer, t); K.dropIn(tl, n.inner, t, { dur: 0.3 }); };
    eqRule(eqRavi, tBorrow + 0.1); eqRule(eqGopal, tBorrow + 0.4);
    eqRule(eqCap, tSav + 0.15);
    m.arm(tl, tBorrow, "R", 12, 8, 0.3); m.expr(tl, tEarned, "proud");
    eq.slip(tl, tPocket + 0.1, "Profit", 18000, { icon: "coffee", from: [0, -200] });
    const tLand = tPocket + 0.7;
    hud.setTotals(tl, tLand, undefined, 101000, { dur: 0.7 });
    hud.settle(tl, tLand + 0.1, { dur: 0.9, hold: 1.5 });
    hud.levelFlash(tl, tLand + 1.1); hud.pulseTotal(tl, tLand + 1.05, "both");
    // s05d — the equation lands; chip Revenue on the revenue slip
    const tEqn = cue("s05d", "@lakh");
    hud.equation(tl, tEqn, "₹1,01,000 = ₹38,000 + ₹63,000");
    const tRev = cue("s05d", "@revenue");
    L4.show(tl, revChip.outer, tRev); K.dropIn(tl, revChip.inner, tRev, { dur: 0.34 });
    eq.pulse(tl, cue("s05d", "@grows"));
    khata.expr(tl, tRev, "happy");
  };
})();
