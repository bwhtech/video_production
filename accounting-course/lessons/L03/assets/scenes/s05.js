// s05 — T4, faded: Meera buys ₹6,000 of tea, milk and sugar in cash. The device again (full 2.0 s gap): Meera fills slot 1
// (Stock +6,000) after a visible reach; slot 2 waits for the viewer (Cash −6,000) through a 2.4 s hold.
// In:  s04's kettle puff fills the frame (cream) → this scene fades the cream out. Out: the calendar ticks 2 → 3 + default wipe.
(function () {
  window.OWN_SEAM_IN.s05 = true;

  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", B = { x: 720, y: 895, s: 1.1 };
    const T0 = sc.start;
    L3.stage(K, svg, C.teal, 880);
    const cal = L3.cal(K, svg, 2);

    // ---- the scale as T3 left it: Cash 44,000 + Equipment 36,000 = 80,000 | Ravi 30,000 + Meera 50,000
    const rig = K.scaleRig(svg, B.x, B.y, B.s, { tint: true, L: 80000, R: 80000, equation: true });
    rig.labelPan(tl, T0 - 0.6, "L", ["Assets"], { stagger: 0.001 });
    rig.labelPan(tl, T0 - 0.6, "R", [{ text: "Liabilities", value: 30000 }, { text: "Equity", value: 50000 }], { stagger: 0.001 });
    rig.equation(tl, T0 - 0.5, "80,000 = 30,000 + 50,000");
    const cash = L3.jar(K, rig, 0, 3, { label: "Cash", contents: "coins", amount: 44000, fill: 0.5 });
    const equip = L3.jar(K, rig, 1, 3, { label: "Equipment", contents: "cart", amount: 36000 });
    const stock = L3.jar(K, rig, 2, 3, { label: "Stock", labelHidden: true, contents: "leaves", amount: 0, fill: 0, hidden: true });
    const meeraTag = L3.tag(K, rig, 0, 2, { face: "meera", amount: 50000 });
    const raviTag = L3.tag(K, rig, 1, 2, { face: "ravi", amount: 30000 });
    const stockX = B.x - 380 * B.s + 122 * B.s, stockTop = B.y - 270 * B.s - 150;      // world position of the Stock jar's mouth

    // ---- tea tin, milk can, sugar bag tumbling onto the left pan (paper stickers)
    const items = [["leaf", C.leaf, -26], ["milk", C.sky, 6], ["package", C.coral, 30]].map(([ic, col, dx]) => {
      const n = L3.hide(L3.node(K, svg, stockX + dx, 120)); K.medallion(n, 0, 0, 40, ic, col); return n;
    });

    // ---- Meera, small at frame right (beside the slots), Khata in the corner
    const MX = 1560, GY = 1015;
    const m = K.meera(svg, MX, GY, 0.85, { expr: "happy" });
    const chipHand = K.g(m.handAnchor("R"), {});
    K.label(chipHand, 0, -10, "Stock +6,000", { size: 30, bg: C.dr, rot: -4 });
    K.holdProp(m, "R", chipHand, [12, 8]);
    L3.hide(chipHand);
    const khata = K.khataRig(svg, 1835, 1050, 0.55, { expr: "awake" });

    // ---- cream cover (the end of s04's steam puff) + the device on top
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");
    const cover = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.cream }, svg);

    // ======================================================================================= timeline
    tl.fromTo(cover, { opacity: 1 }, { opacity: 0, duration: 0.8, ease: "power1.out" }, T0 + 0.05);
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 12);
    m.jitter(tl, T0, sc.end);
    // "Meera buys tea, milk and sugar" — three stickers tumble into a new jar; its Stock label ties on as the first lands
    const tTea = cue("s05a", "@tea"), tMilk = cue("s05a", "@milk"), tSugar = cue("s05a", "@sugar");
    [tTea, tMilk, tSugar].forEach((t, i) => {
      L3.drop(tl, K, items[i], t - 0.15, { dur: 0.15 });
      tl.to(items[i], { y: stockTop - 120 + i * 6, rotation: (i - 1) * 14, svgOrigin: O, duration: 0.45, ease: "power2.in" }, t - 0.1);
      tl.to(items[i], { autoAlpha: 0, duration: 0.1 }, t + 0.36);
    });
    stock.enter(tl, tTea + 0.25);
    stock.tieLabel(tl, tTea + 0.3);
    stock.fill(tl, tTea + 0.4, 0.5); stock.fill(tl, tSugar + 0.4, 1.0);
    m.look(tl, tTea, -6, -5).arm(tl, tTea, "R", 40, 70, 0.3);
    m.arm(tl, tSugar + 0.5, "R", 12, 8, 0.35);
    // "paid in cash" — she looks at the Cash jar
    m.look(tl, cue("s05a", "@cash"), -9, 0);

    // "Which two things changed?" — the device: freeze, veil 30 %, two dashed slots, 2.0 s dead still (tick_tock)
    const tWhich = cue("s05a", "@which");
    const tGot = cue("s05a", "@got"), tStock2 = cue("s05a", "@stock", 2), tCan = cue("s05a", "@can");
    const tFirst = cue("s05a", "@first");
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [{ label: "Stock", delta: 6000, side: "L", at: tStock2 + 0.5 }] });
    // "Meera's got the first one." — she steps in, the chip appears in her hand, she reaches up…
    m.walkTo(tl, tGot - 0.6, MX - 70, 0.9);
    L3.drop(tl, K, chipHand, tGot - 0.1, { dur: 0.25 });
    m.expr(tl, tGot, "thinking").look(tl, tGot, 0, -6);
    m.arm(tl, tFirst - 0.1, "R", 150, 0, 0.45);
    // "Stock goes up by six thousand." — …and sets it in slot 1 herself; the Stock jar lights, its chip counts up
    tl.to(chipHand, { autoAlpha: 0, duration: 0.15 }, tStock2 + 0.4);
    m.arm(tl, tStock2 + 0.9, "R", 20, 70, 0.4).expr(tl, tStock2 + 0.5, "happy");
    stock.tick(tl, tStock2 + 0.5, 0, 6000, 0.8);
    stock.light(tl, tStock2 + 0.55, { hold: 0.8 });
    // "Can you name the second?" — slot 2 shows `?`; Meera turns to us, thinking, hand out (inviting). 2.4 s hold
    w2.fillSlot(tl, tCan, 1, { pending: true });
    m.expr(tl, tCan - 0.1, "thinking").look(tl, tCan, 0, -3);
    m.arm(tl, tCan, "R", 70, 30, 0.4).arm(tl, tCan + 0.1, "L", 40, 40, 0.4);

    // s05b "Cash goes down by six thousand." — slot 2 fills, the galla drops 44,000 → 38,000, ding
    const tDown = cue("s05b", "@cash");
    w2.fillSlot(tl, tDown, 1, { label: "Cash", delta: -6000, side: "L" });
    cash.tick(tl, tDown + 0.1, 44000, 38000, 0.8); cash.fill(tl, tDown + 0.2, 0.25);
    cash.light(tl, tDown + 0.15, { hold: 1.0 }); stock.light(tl, tDown + 0.15, { hold: 1.0 });
    m.arm(tl, tDown + 0.3, "R", 12, 8, 0.4).arm(tl, tDown + 0.3, "L", 12, 8, 0.4).expr(tl, tDown + 0.2, "joy");
    w2.clear(tl, tDown + 1.9);
    // "Another swap on the left." — both jars lift & settle once; "The scale stays level, at eighty thousand."
    const tSwap = cue("s05b", "@swap");
    cash.pulse(tl, tSwap); stock.pulse(tl, tSwap + 0.1);
    const tEighty = cue("s05b", "@eighty");
    rig.levelFlash(tl, cue("s05b", "@stays"));
    rig.pulseTotal(tl, tEighty, "both");
    khata.expr(tl, tEighty, "happy");
    // exit: the calendar's highlight ticks 2 → 3 (a tick, not a page flip); the default paper wipe follows
    cal.tickTo(tl, sc.end - 1.0, 3, { dur: 0.4 });
    L3.allow(w2.g);
  };
})();
