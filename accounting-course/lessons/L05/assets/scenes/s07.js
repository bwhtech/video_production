// s07 — The catering advance (T11, SECOND faded + misconception). Apr 22. A customer hands Meera ₹4,000 for a May 5 catering order.
// Meera carries the ₹4,000 slip straight toward the HUD's Profit pocket (0.5 s hover) — Khata stamps it ✗ → it recoils; a new TAG
// `Advance from customer` lands on the right pan. 2.0 s gap: Meera looks between the gauges, then points at Cash. Only Cash moves
// (46,000 → 50,000); Profit stays 19,000 (`=`). Out: default torn-paper wipe into s08.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    L5.stage(K, svg, C.coral, 880);
    [[640, 560, 150, 320], [830, 640, 120, 240], [1600, 500, 150, 380]].forEach(([x, y, w, h], i) => {
      K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i % 2 ? "#e2604f" : "#e8685a");
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++)
        K.paper(svg, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), "#f08a7c", { opacity: 0.6 });
    });
    const cal = L5.cal(K, svg, 20);
    const { profit, cash, GS } = L5.strip(K, svg, { stage: 3 });

    // ---- cast
    const stall = K.stall(svg, 230, GY, 0.8, {});
    const meera = K.meera(svg, 560, GY, 0.9, { expr: "happy" });
    const cust = K.person(svg, 1500, GY, 0.9, { skin: "#a96a45", top: C.teal, legs: "#3c3a45", shoes: "#2b2233", hair: "bald", moustache: true, expr: "happy", aL: [12, 8], aR: [12, 8] });
    const CX = 960;
    // party tray (kraft plate + cake) in his right hand, rides upright
    const trayP = K.g(cust.handAnchor("R"), {});
    K.paper(K.shadow(trayP, 1), K.cutEll(0, 4, 62, 14, 1), C.wood); K.paper(trayP, K.cutEll(0, 0, 54, 10, 0.8), "#d9a441");
    K.medallion(trayP, 0, -34, 30, "cake");
    K.holdProp(cust, "R", trayP, [12, 8]);
    // the ₹4,000 bundle in his left hand, the copy that flies to Meera, and her hand
    const bundleC = K.g(cust.handAnchor("L"), {}); K.bundle(bundleC, -8, -8, 0.7, 8); K.holdProp(cust, "L", bundleC, [12, 8]);
    const flyB = L5.hide(L5.node(K, svg, 0, 0)); K.bundle(flyB, 0, 0, 0.7, 8);
    const amt = L5.hide(L5.node(K, svg, 760, 540));
    K.tex(K.shadow(amt, 1), K.cutRect(-120, -42, 240, 84, 1.6, 20), "pat-paper");
    K.paper(amt, K.cutRect(-112, 30, 224, 8, 0.5, 14), C.saffron);
    const amtTk = K.ticker(amt, 0, -2, 1, { value: 0, size: 56 });
    // order card (calendar-check · May 5 · tumbler count 0) on the right, above where the tag will land
    const OX = 1380;
    const order = L5.hide(L5.node(K, svg, OX, 535));
    L5.card(K, order, 300, 240);
    K.medallion(order, -80, -50, 42, "calendar-check");
    K.text(order, 52, -50, "May 5", { size: 54, weight: 800 });
    K.tumbler(order, -80, 86, 1.7);
    const cups = K.ticker(order, 40, 56, 1, { value: 0, size: 60 });
    // the ₹4,000 slip Meera carries (tray icon = cake medallion) + the ✗ ink ring waiting at the pocket
    // the new liability tag (scene-level, big) + its name chip
    const TX = OX, TY = 920;
    const tag = K.claimTag(svg, TX, TY, 1.1, { face: "customer", amount: 0, size: 56 });
    const nameChip = L5.chip(K, svg, TX, TY + 58, "Advance from customer", { size: 36 });
    const mayChip = L5.chip(K, svg, TX + 112, TY - 186, "May 5", { size: 34, bg: C.cr, rot: 4 });
    const khata = K.khataRig(svg, 1790, 1030, 0.5, { expr: "awake" });
    const H = L5.hud(K, svg, tl, { stage: 3 });
    const pp = H.pocketPt("Profit");
    const slip = L5.hide(L5.node(K, svg, 0, 0));
    K.tex(K.shadow(slip, 1), K.cutRect(-110, -46, 220, 92, 1.6, 20), "pat-paper");
    K.medallion(slip, -64, 0, 30, "calendar-check");
    K.text(slip, 36, 3, "₹4,000", { size: 44, weight: 800 });
    const inkRing = K.el("circle", { cx: pp[0], cy: pp[1], r: 52, fill: "none", stroke: C.red, "stroke-width": 9, opacity: 0.8 }, svg);

    // ======================================================================================= timeline
    meera.blinks(tl, T0 + 1.0, sc.end, 3.3); cust.blinks(tl, T0 + 1.6, sc.end, 3.7);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end - 0.5);
    khata.blink(tl, T0 + 2.0).blink(tl, T0 + 12);
    // s07a "April twenty-second." — the calendar steps 20 → 22; the customer walks in with the tray
    cal.tickTo(tl, cue("s07a", "@twentysecond"), 22, { dur: 0.5 });
    cust.walkTo(tl, T0 + 0.6, CX, 1.8);
    // "A customer pays four thousand rupees in advance" — he holds out the bundle; it crosses to Meera; ₹4,000 counts
    const tPays = cue("s07a", "@pays"), tFour = cue("s07a", "@four");
    cust.arm(tl, tPays - 0.15, "L", 70, 22, 0.35); meera.arm(tl, tPays - 0.1, "R", 72, 18, 0.35);
    tl.set(bundleC, { opacity: 0 }, tPays + 0.4);
    tl.set(flyB, { opacity: 1, x: 880, y: 690 }, tPays + 0.4);
    L5.fly(tl, flyB, tPays + 0.4, [880, 690], [790, 690], 0.3, { lift: 0 });
    tl.set(flyB, { opacity: 0 }, tPays + 0.72);
    L5.drop(tl, K, amt, tFour - 0.1, { dur: 0.35 }); amtTk.to(tl, tFour, 4000, 0.8);
    cust.arm(tl, tPays + 0.9, "L", 12, 8, 0.4); meera.arm(tl, tPays + 0.9, "R", 12, 8, 0.4);
    // "for a catering order on May fifth" — the order card lands (calendar-check + May 5, zero cups)
    const tCat = cue("s07a", "@catering");
    L5.drop(tl, K, order, tCat, { dur: 0.4 });
    cust.expr(tl, tCat, "grin");
    // "Meera's quick this time." — she's proud / eager
    const tQuick = cue("s07a", "@quick");
    meera.expr(tl, tQuick - 0.1, "grin"); meera.look(tl, tQuick, 6, -3);
    // "Money in from a customer? Revenue —" — the ₹4,000 slip comes out of her hand
    const tMoney = cue("s07a", "@money"), tStraight = cue("s07a", "@straight"), tPocket = cue("s07a", "@pocket");
    meera.arm(tl, tMoney - 0.1, "R", 100, 40, 0.3);
    tl.set(slip, { x: 800, y: 600 }, 0);
    L5.drop(tl, K, slip, tMoney + 0.1, { dur: 0.35 });
    L5.lift(tl, K, amt, tMoney + 0.4);
    // "straight into the profit pocket." — she walks it (stepped) and reaches; the slip arcs up to the HUD's Profit pocket and hovers
    meera.walkTo(tl, tStraight - 0.1, 700, 1.1);
    meera.arm(tl, tStraight - 0.2, "R", 150, 20, 0.3);
    L5.fly(tl, slip, tStraight, [800, 600], [pp[0] - 100, pp[1] + 90], tPocket + 0.15 - tStraight, { lift: 150 });
    H.card.light(tl, tPocket, "Profit", { hold: 1.2 });
    meera.look(tl, tStraight, 6, -9);
    // s07b "Nope." — Khata stamps the slip ✗ (the ink ring from s06 is already waiting); the slip recoils
    const tNope = cue("s07b", "@nope");
    khata.arm(tl, tNope - 0.4, "L", 125, 0.2); khata.arm(tl, tNope + 0.25, "L", 20, 0.3);
    tl.to(inkRing, { opacity: 0, duration: 0.15 }, tNope);
    const stamp = K.stamp(tl, svg, pp[0] - 100, pp[1] + 90, tNope, 0.8);
    meera.arm(tl, tNope + 0.05, "R", 12, 8, 0.4); meera.expr(tl, tNope + 0.1, "worried"); meera.look(tl, tNope + 0.2, 8, 3);
    const tRec = tNope + 0.55;
    stamp.lift(tl, tRec);
    L5.fly(tl, slip, tRec, [pp[0] - 100, pp[1] + 90], [840, 800], 0.6, { lift: 60 });
    L5.lift(tl, K, slip, tRec + 0.65);
    // "Meera hasn't made a single cup yet." — the cup counter on the order card reads 0 (a pulse)
    const tCup = cue("s07b", "@cup");
    cups.pulse(tl, tCup);
    meera.expr(tl, tCup, "thinking"); meera.look(tl, tCup, 6, 0);
    // "Until May fifth, she owes that customer an event — or their money back." — the order card lights
    const tEvent = cue("s07b", "@event");
    K.pulseNode(tl, order, tEvent, 1.04);
    // "An advance is a liability, not revenue." — the NEW tag drops (₹4,000, name chip, May 5); the HUD gets its tag; right pan tips
    const tLia = cue("s07b", "@liability");
    tag.enter(tl, tLia - 0.1); tag.tick(tl, tLia, 0, 4000, 0.8);
    L5.drop(tl, K, nameChip, tLia + 0.15); L5.drop(tl, K, mayChip, tLia + 0.35);
    tag.light(tl, tLia + 0.5, { hold: 0.8 });
    H.add(tl, tLia + 0.3, "adv");
    H.rig.setTotals(tl, tLia + 0.5, undefined, 106000, { dur: 0.8 });
    H.rig.tilt(tl, tLia + 0.5, -3, { dur: 0.8 });
    // "Not yet." — Khata (small) winks
    const tYet = cue("s07b", "@yet");
    khata.expr(tl, tYet - 0.1, "wink"); khata.expr(tl, tYet + 0.9, "awake");
    cust.expr(tl, tYet, "happy");
    // "Meera, which needle moves?" — the 2.0 s gap: she looks between the gauges, thinking
    const tMera = cue("s07b", "@meera", 2), tMoves = cue("s07b", "@moves"), tGap = segEnd("s07b");
    meera.look(tl, tMera, -8, -6); meera.look(tl, tMoves - 0.1, -4, -8); meera.look(tl, tGap + 0.5, -10, -4); meera.look(tl, tGap + 1.1, -4, -8);
    meera.headTilt(tl, tGap + 0.4, -4);
    // s07c "Only cash." — she points; ONLY the Cash needle rises (galla 31,000 → 35,000)
    const tOnly = cue("s07c", "@only"), tCash = cue("s07c", "@cash"), tUp = cue("s07c", "@up");
    meera.point(tl, tOnly - 0.5, "L", 150); meera.expr(tl, tOnly - 0.3, "happy");
    cash.read(tl, tCash - 0.15, 50000, { dur: 1.0 }); cash.sub(tl, tCash, 0, 35000, 0.9);
    cash.flash(tl, tCash + 0.1, 0.6);
    // "Up four thousand." — the HUD's left total follows; the beam settles level
    H.rig.setTotals(tl, tUp, 106000, undefined, { dur: 0.8 });
    H.rig.settle(tl, tUp, { dur: 0.9, hold: 1.0 }); H.rig.levelFlash(tl, tUp + 1.0);
    meera.arm(tl, tUp + 0.5, "L", 12, 8, 0.4);
    // "Profit stays at nineteen thousand." — the `=` tag drops on Profit; its needle never moved
    profit.eq(tl, cue("s07c", "@stays"));
    L5.allow(svg);
  };
})();
