// s04 — T3, worked: "Which two things changed?" is born. Cash −36,000 and Equipment +36,000 — both on the LEFT pan, the scale never moves.
// Then the misconception: "so that's an expense!" → Khata's ✗ stamp → "used up and gone" vs. the cart that is still standing.
// Out: the cart's kettle lets out one steam puff that fills the frame → s05 (s05 owns the seam-in: cream cover fades).
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", B = { x: 720, y: 895, s: 1.1 };
    L3.stage(K, svg, C.teal, 880);
    const cal = L3.cal(K, svg, 2);

    // ---- the scale as T2 left it (80,000 = 30,000 + 50,000), slightly left of centre
    const rig = K.scaleRig(svg, B.x, B.y, B.s, { tint: true, L: 80000, R: 80000, equation: true });
    const T0 = sc.start;
    rig.labelPan(tl, T0 - 0.6, "L", ["Assets"], { stagger: 0.001 });
    rig.labelPan(tl, T0 - 0.6, "R", [{ text: "Liabilities", value: 30000 }, { text: "Equity", value: 50000 }], { stagger: 0.001 });
    rig.equation(tl, T0 - 0.5, "80,000 = 30,000 + 50,000");
    const cash = L3.jar(K, rig, 0, 2, { label: "Cash", contents: "coins", amount: 80000, fill: 1.0 });
    const equip = L3.jar(K, rig, 1, 2, { label: "Equipment", contents: "cart", amount: 0, fill: 0, labelHidden: true });
    equip.ticker.body.setAttribute("opacity", "0");          // (the ₹0 chip stays hidden until the cart lands)
    const meeraTag = L3.tag(K, rig, 0, 2, { face: "meera", amount: 50000 });
    const raviTag = L3.tag(K, rig, 1, 2, { face: "ravi", amount: 30000 });

    // ---- background: the cart (small, right), Meera beside it, Khata in the corner
    const CX = 1650, GY = 1015, CS = 0.5;
    const stall = K.stall(svg, CX, GY, CS, { galla: false });
    const m = K.meera(svg, 1385, GY, 0.5, { expr: "happy" });
    const khata = K.khataRig(svg, 1835, 1050, 0.55, { expr: "awake" });
    // the scuff sticker (depreciation icon, bible §5.12) that lands on the cart's wheel at "wear out"
    const scuff = L3.hide(L3.node(K, stall.jit, 112, -86));
    K.paper(K.shadow(scuff, 1), K.cutEll(0, 0, 40, 40, 1.2), C.cream);
    K.ink(scuff, [[-20, -16], [12, 18]], 8, "#7a7078"); K.ink(scuff, [[-4, -24], [24, 6]], 6, "#7a7078"); K.ink(scuff, [[-24, 2], [-2, 24]], 6, "#7a7078");

    // ---- the misconception card (coral) + the tea-leaf pinch card
    const exp = L3.hide(L3.node(K, svg, 1610, 400));
    K.tex(K.shadow(exp, 2), K.cutRect(-225, -215, 450, 430, 2.4, 24), "pat-paper");
    K.paper(exp, K.cutRect(-205, -195, 410, 390, 2, 24), C.coral);
    K.stall(exp, -50, 150, 0.3, { galla: false, noProps: true });
    const smoke = [[110, 30, 30], [140, -30, 38], [105, -90, 28]].map(([x, y, r]) => {
      const n = L3.node(K, exp, x, y); [[0, 0, r, r * 0.8], [-r * 0.6, r * 0.3, r * 0.7, r * 0.55], [r * 0.6, r * 0.2, r * 0.7, r * 0.55]].forEach(([dx, dy, rx, ry]) => K.paper(n, K.cutEll(dx, dy, rx, ry, 1.2), C.cream, { opacity: 0.92 })); return n;
    });
    const gone = [[-20, -110, -12], [70, -150, 14], [-80, -60, 8]].map(([x, y, rot]) => { const n = L3.node(K, exp, x, y); K.note(n, 0, 0, 90, 46, rot); return n; });
    const pinch = L3.hide(L3.node(K, svg, 1610, 400));
    K.tex(K.shadow(pinch, 2), K.cutRect(-170, -140, 340, 280, 2.2, 24), "pat-paper");
    K.medallion(pinch, 0, -10, 72, "leaf");
    const puffs = [[-90, -80], [90, -70], [-70, 80], [100, 70]].map(([x, y]) => { const n = L3.hide(L3.node(K, svg, 1610 + x * 0.3, 400 + y * 0.3)); K.paper(n, K.cutEll(0, 0, 40, 32, 1.4), C.cream); return [n, x, y]; });

    // ---- the exit puff (kettle steam grows to fill the frame) — cream, flat
    const KX = CX + 130 * CS, KY = GY - 450 * CS;
    const bigPuff = L3.hide(L3.node(K, svg, KX, KY));
    [[0, 0, 70, 54], [-60, 22, 54, 42], [60, 20, 54, 42], [0, -40, 50, 40]].forEach(([dx, dy, rx, ry]) => K.paper(bigPuff, K.cutEll(dx, dy, rx, ry, 2), C.cream));

    // ---- "Which two things changed?" (created last → the veil sits on top of everything)
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 0.8, sc.end, 3.4);
    khata.blink(tl, T0 + 1.5); khata.blink(tl, T0 + 8.5);
    // s04a — "Thirty-six thousand rupees left the galla." The Cash jar replays 80,000 → 44,000 (the pan total waits)
    const tLeft = cue("s04a", "@left");
    cash.tick(tl, tLeft, 80000, 44000, 0.9); cash.fill(tl, tLeft + 0.2, 0.5);
    m.expr(tl, cue("s04a", "@lose"), "puzzled").look(tl, cue("s04a", "@lose"), -4, -3);
    m.expr(tl, cue("s04a", "@question"), "thinking");
    // "Which two things changed?" — THE DEVICE: freeze, veil, two dashed slots top-centre, 2.0 s of dead stillness (tick_tock)
    const tWhich = cue("s04a", "@which");
    // s04b fills
    const tCash = cue("s04b", "@cash"), tFly = cue("s04b", "@has"), tLand = tFly + 0.85;
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [
      { label: "Cash", delta: -36000, side: "L", at: tCash },
      { label: "Equipment", delta: 36000, side: "L", at: tLand },
    ] });
    // slot 1: Cash goes down — the galla lights
    cash.light(tl, tCash + 0.05, { color: C.dr, hold: 0.6 });
    // slot 2: the paper cart sticker flies from the galla into the empty jar; as it lands the label ties on (concrete before term)
    equip.landSticker(tl, tFly, { dx: -190, dy: -70, dur: 0.85 });
    equip.tieLabel(tl, tLand);
    equip.ticker.enter(tl, tLand); equip.tick(tl, tLand, 0, 36000, 0.7);
    cash.light(tl, tLand + 0.06, { hold: 1.0 }); equip.light(tl, tLand + 0.06, { hold: 1.0 });       // the "ding" light
    w2.clear(tl, tLand + 1.5);
    m.look(tl, tFly, 6, -2);
    // "both sit on the left pan" — both jars glow blue together
    const tPan = cue("s04b", "@pan") - 1.0;
    cash.light(tl, tPan, { color: C.dr, hold: 0.9 }); equip.light(tl, tPan, { color: C.dr, hold: 0.9 });
    // "the scale doesn't move. Still eighty thousand." — the left total pulses once, the beam stays dead level
    const tMove = cue("s04b", "@move");
    khata.arm(tl, tMove - 0.4, "R", 95, 0.3); khata.expr(tl, tMove - 0.4, "happy");
    rig.levelFlash(tl, tMove + 0.15);
    rig.pulseTotal(tl, cue("s04b", "@still"), "L");
    khata.arm(tl, cue("s04b", "@lose") - 0.2, "R", 15, 0.4);
    // "She turned cash into a cart." — the cart rolls 40 px forward and stops; Meera is proud
    const tTurned = cue("s04b", "@turned");
    tl.to(stall.jit, { x: -80, duration: 0.8, ease: K.stepEase(0.8, "power2.out", tTurned) }, tTurned);
    stall.wheels.forEach((w) => tl.to(w, { rotation: -76, svgOrigin: O, duration: 0.8, ease: K.stepEase(0.8, "power2.out", tTurned) }, tTurned));
    m.expr(tl, tTurned, "proud").look(tl, tTurned, 8, 0);

    // s04c — "so that's an expense!" — the coral card slides in; (gap) Khata stamps ✗
    const tSpent = cue("s04c", "@spent");
    tl.fromTo(exp, { x: 320, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out", immediateRender: false }, tSpent);
    smoke.forEach((n, i) => { tl.to(n, { y: -34 - i * 8, duration: 1.4, ease: "power1.out" }, cue("s04c", "@expense") - 0.4 + i * 0.15); tl.to(n, { autoAlpha: 0.4, duration: 1.4 }, cue("s04c", "@expense") - 0.4 + i * 0.15); });
    gone.forEach((n, i) => tl.to(n, { x: 70 + i * 20, y: -60 - i * 20, autoAlpha: 0.3, duration: 1.6, ease: "power1.out" }, cue("s04c", "@expense") - 0.5 + i * 0.12));
    m.expr(tl, cue("s04c", "@slip"), "worried");
    const tStamp = segEnd("s04c") + 0.85;
    khata.arm(tl, tStamp - 0.35, "L", 120, 0.25); khata.arm(tl, tStamp - 0.1, "L", 20, 0.12);
    const stamp = K.stamp(tl, svg, 1610, 410, tStamp, 1.5);

    // s04d — "Nope. An expense is money that's used up and gone." — a tea-leaf pinch puffs away
    const tLift = cue("s04d", "@expense") + 0.3;
    L3.lift(tl, K, exp, tLift); stamp.lift(tl, tLift);
    const tUsed = cue("s04d", "@used");
    L3.drop(tl, K, pinch, tUsed - 0.2);
    const tGone = cue("s04d", "@gone");
    tl.to(pinch, { scale: 0.45, autoAlpha: 0, svgOrigin: O, duration: 0.35, ease: "power2.in" }, tGone);
    puffs.forEach(([n, x, y], i) => { tl.set(n, { opacity: 1 }, tGone); tl.to(n, { x: x, y: y, scale: 1.6, autoAlpha: 0, svgOrigin: O, duration: 0.7, ease: "power2.out" }, tGone + i * 0.03); });
    m.expr(tl, cue("s04d", "@nope"), "worried").expr(tl, cue("s04d", "@cart"), "proud");
    // "The cart isn't gone. It's standing right there, ready to make chai." — the kettle steams
    const tStand = cue("s04d", "@standing");
    stall.kettle.steamLoop(tl, tStand, cue("s04d", "@chai") + 0.5);
    // "It will wear out, slowly" — ONE small scuff sticker on the wheel (the calendar does NOT move)
    L3.drop(tl, K, scuff, cue("s04d", "@wear"));
    // exit: the kettle's one big steam puff rolls out and fills the frame (s05 opens on the same cream)
    const tPuff = sc.end - 1.15;
    tl.set(bigPuff, { opacity: 1 }, tPuff);
    tl.fromTo(bigPuff, { scale: 0.3, svgOrigin: O }, { scale: 26, svgOrigin: O, duration: 1.15, ease: "power2.in", immediateRender: false }, tPuff);
    L3.allow(w2.g);
  };
})();
