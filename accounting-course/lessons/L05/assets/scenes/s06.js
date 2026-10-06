// s06 — Paying Gopal (T10, FADED + misconception → payable). Apr 20. Meera pays Gopal ₹5,000 of the ₹8,000 she owes and slaps an
// `Expense` chip on it — Khata stamps it ✗. The fix in one move: Gopal's tag ticks 8,000 → 3,000. 2.0 s device gap (Meera looks between
// the gauges, then POINTS at Cash): only the Cash needle drops (51,000 → 46,000); Profit stays 19,000 with an `=` tag. Chip `Payable`
// lands on Gopal's tag, mirror of the `Receivable` chip on the HUD's Infotech jar. Out: the ✗ ink ring floats toward the Profit pocket (s07).
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    L5.stage(K, svg, C.coral, 880);
    // tone-on-tone skyline
    [[640, 560, 150, 320], [820, 640, 120, 240], [1560, 500, 150, 380]].forEach(([x, y, w, h], i) => {
      K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i % 2 ? "#e2604f" : "#e8685a");
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++)
        K.paper(svg, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), "#f08a7c", { opacity: 0.6 });
    });
    const cal = L5.cal(K, svg, 20);
    const { profit, cash, GS } = L5.strip(K, svg, { stage: 2 });

    // ---- cast + props
    const stall = K.stall(svg, 230, GY, 0.8, {});
    const meera = K.meera(svg, 600, GY, 0.9, { expr: "happy" });
    const cans = K.milkCans(svg, 1700, GY, 0.9, {});
    const gopal = K.gopal(svg, 1500, GY, 0.9, { expr: "happy" });             // walks in to x = 1080
    const GX = 1080;
    // the ₹5,000 bundle in Meera's right hand, a copy that flies to Gopal, Gopal's pocket
    const bundleP = K.g(meera.handAnchor("R"), {}); K.bundle(bundleP, 8, -8, 0.7, -8); K.holdProp(meera, "R", bundleP, [12, 8]); L5.hide(bundleP);
    const flyB = L5.hide(L5.node(K, svg, 0, 0)); K.bundle(flyB, 0, 0, 0.7, -8);
    // ₹5,000 amount chip (counts up) between the two faces' lower edge
    const amt = L5.hide(L5.node(K, svg, 840, 540));
    K.tex(K.shadow(amt, 1), K.cutRect(-120, -42, 240, 84, 1.6, 20), "pat-paper");
    K.paper(amt, K.cutRect(-112, 30, 224, 8, 0.5, 14), C.saffron);
    const amtTk = K.ticker(amt, 0, -2, 1, { value: 0, size: 56 });
    // Gopal's tag (scene-level, big) + its name chip
    const TX = 1330, TY = 905;
    const tag = K.claimTag(svg, TX, TY, 1.1, { face: "gopal", amount: 8000, size: 56 });
    const nameChip = L5.chip(K, svg, TX, TY + 62, "Gopal Dairy", { size: 38 });
    // the misconception chip + Khata (the stamper)
    const expChip = L5.chip(K, svg, 840, 700, "Expense", { size: 46, rot: -3 });
    const khata = K.khataRig(svg, 830, 1030, 0.5, { expr: "awake" });
    // Payable chip (orange, lands on the tag) and the Receivable chip on the HUD's Infotech jar (blue) — mirror colours
    const payable = L5.chip(K, svg, TX - 118, TY - 215, "Payable", { size: 44, bg: C.cr, rot: -4 });
    const stock = L5.hide(L5.node(K, svg, 1700, 700)); K.medallion(stock, 0, 0, 44, "leaf");
    // HUD last
    const H = L5.hud(K, svg, tl, { stage: 2 });
    const infP = H.jarPt("inf"), recX = infP[0], recY = 452;
    const recv = L5.chip(K, svg, recX, recY, "Receivable", { size: 36, bg: C.dr });
    const recRing = K.el("path", { d: K.cutRect(recX - 135, recY - 33, 270, 66, 1, 20), fill: "none", stroke: C.gold, "stroke-width": 8, "stroke-linejoin": "round", opacity: 0 }, svg);
    const inkRing = K.el("circle", { cx: 0, cy: 0, r: 62, fill: "none", stroke: C.red, "stroke-width": 10, opacity: 0 }, svg);

    // ======================================================================================= timeline
    meera.blinks(tl, T0 + 1.0, sc.end, 3.3); gopal.blinks(tl, T0 + 1.6, sc.end, 3.7);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end - 0.5);
    khata.blink(tl, T0 + 2.0).blink(tl, T0 + 11);
    L5.drop(tl, K, recv, T0 + 0.3);
    // s06a "April twentieth." — calendar pulses; Gopal strolls in with his tag
    cal.pulse(tl, cue("s06a", "@twentieth"));
    gopal.walkTo(tl, T0 + 0.6, GX, 1.8);
    tag.enter(tl, T0 + 0.5);
    // "Meera pays Gopal five thousand rupees" — the bundle comes out; the ₹5,000 chip counts; hand-over
    const tPays = cue("s06a", "@pays"), tFive = cue("s06a", "@five"), tOf = cue("s06a", "@of");
    meera.arm(tl, tPays - 0.2, "R", 30, 70, 0.3);
    tl.set(bundleP, { opacity: 1 }, tPays + 0.05);
    L5.drop(tl, K, amt, tFive - 0.1, { dur: 0.35 }); amtTk.to(tl, tFive, 5000, 0.8);
    L5.drop(tl, K, nameChip, cue("s06a", "@gopal") + 0.1);
    meera.arm(tl, tOf - 0.3, "R", 72, 18, 0.35); gopal.arm(tl, tOf - 0.3, "L", 70, 22, 0.35);
    tl.set(bundleP, { opacity: 0 }, tOf + 0.15);
    tl.set(flyB, { opacity: 1, x: 790, y: 690 }, tOf + 0.15);
    L5.fly(tl, flyB, tOf + 0.15, [790, 690], [900, 690], 0.35, { lift: 0 });
    tl.set(flyB, { opacity: 0 }, tOf + 0.52);
    gopal.arm(tl, tOf + 0.6, "L", 12, 8, 0.4); meera.arm(tl, tOf + 0.6, "R", 12, 8, 0.4);
    // "of the eight thousand she owes him for milk" — Gopal's tag lights (the debt), cans nod
    tag.light(tl, cue("s06a", "@eight"), { hold: 0.9 });
    // "Meera's sure about this one." — a confident nod
    const tSure = cue("s06a", "@sure");
    meera.expr(tl, tSure, "proud").headTilt(tl, tSure, 4); meera.headTilt(tl, tSure + 0.7, 0);
    // "Money left the galla" — the galla opens and shuts
    const tLeft = cue("s06a", "@left");
    meera.arm(tl, tLeft - 0.4, "L", 70, 24, 0.3);
    stall.galla.open(tl, tLeft - 0.2, { notes: false }); stall.galla.shut(tl, tLeft + 0.7);
    meera.arm(tl, tLeft + 0.8, "L", 12, 8, 0.3);
    // "so it's an expense." — she slaps the `Expense` chip on the payment
    const tExp = cue("s06a", "@expense");
    meera.arm(tl, tExp - 0.35, "R", 110, 20, 0.2); meera.arm(tl, tExp - 0.05, "R", 70, 40, 0.15);
    L5.drop(tl, K, expChip, tExp - 0.02, { dur: 0.25 });
    meera.arm(tl, tExp + 0.5, "R", 12, 8, 0.35);
    // s06b "Nope." — Khata stamps the chip (no shake); Meera worried
    const tNope = cue("s06b", "@nope");
    khata.expr(tl, tNope - 0.5, "awake"); khata.arm(tl, tNope - 0.4, "L", 125, 0.2); khata.arm(tl, tNope + 0.25, "L", 20, 0.3);
    const stamp = K.stamp(tl, svg, 840, 700, tNope, 1.15);
    meera.expr(tl, tNope + 0.1, "worried").headTilt(tl, tNope + 0.2, -5); meera.look(tl, tNope + 0.2, 6, 4);
    // "That milk came in as stock" — a leaf (stock) medallion pops by the cans; the chip + stamp lift off
    const tStock = cue("s06b", "@stock");
    L5.lift(tl, K, expChip, cue("s06b", "@that") + 0.1); stamp.lift(tl, cue("s06b", "@that") + 0.1);
    L5.drop(tl, K, stock, tStock - 0.2, { dur: 0.35 }); L5.lift(tl, K, stock, cue("s06b", "@gopal") + 0.2);
    meera.expr(tl, cue("s06b", "@that") + 0.3, "neutral").headTilt(tl, cue("s06b", "@that") + 0.3, 0);
    // "and Gopal became a liability" — his tag lights
    tag.light(tl, cue("s06b", "@liability") - 0.1, { hold: 0.9 });
    H.tags.gopal.light(tl, cue("s06b", "@liability") - 0.1, { hold: 0.9 });
    // "Today, Meera is only paying down that debt." — Gopal's tag ticks 8,000 → 3,000; HUD right total follows (left-heavy tip)
    const tPay = cue("s06b", "@paying"), tDebt = cue("s06b", "@debt");
    tag.tick(tl, tPay, 8000, 3000, 0.9);
    H.rig.setTotals(tl, tPay + 0.1, undefined, 102000, { dur: 0.8 });
    H.rig.tilt(tl, tPay + 0.1, 3, { dur: 0.8 });
    L5.lift(tl, K, amt, tPay + 1.0);
    meera.expr(tl, tPay, "thinking"); gopal.expr(tl, tDebt, "happy");
    // "So which needle moves?" — the 2.0 s device gap: Meera looks between the gauges, then points at Cash
    const tWhich = cue("s06b", "@which"), tMoves = cue("s06b", "@moves"), tGap = segEnd("s06b");
    meera.look(tl, tWhich, -8, -6); meera.look(tl, tMoves - 0.1, -4, -8); meera.look(tl, tGap + 0.5, -10, -4); meera.look(tl, tGap + 1.1, -4, -8);
    meera.headTilt(tl, tGap + 0.4, -4);
    // s06c "Only cash." — she points at the Cash gauge and ONLY that needle drops (galla 36,000 → 31,000)
    const tOnly = cue("s06c", "@only"), tCash = cue("s06c", "@cash");
    meera.point(tl, tOnly - 0.5, "L", 150); meera.expr(tl, tOnly - 0.3, "happy");
    cash.read(tl, tCash - 0.15, 46000, { dur: 1.0 }); cash.sub(tl, tCash, 0, 31000, 0.9);
    cash.flash(tl, tCash + 0.1, 0.6);
    // "Down five thousand." — HUD: the left total follows, the beam settles level
    const tDown = cue("s06c", "@down");
    H.rig.setTotals(tl, tDown, 102000, undefined, { dur: 0.8 });
    H.rig.settle(tl, tDown, { dur: 0.9, hold: 1.0 }); H.rig.levelFlash(tl, tDown + 1.0);
    meera.arm(tl, tDown + 0.5, "L", 12, 8, 0.4);
    // "Profit stays at nineteen thousand." — the `=` tag drops on Profit; the needle is dead still
    profit.eq(tl, cue("s06c", "@stays"));
    // "The payment shrinks a liability." — both tags pulse
    const tShr = cue("s06c", "@shrinks");
    tag.pulse(tl, tShr); H.tags.gopal.pulse(tl, tShr);
    // "…is a payable" — the orange chip lands on Gopal's tag; the blue `Receivable` chip lights (mirror)
    const tPb = cue("s06c", "@payable");
    L5.drop(tl, K, payable, tPb - 0.1, { dur: 0.35 });
    const tRc = cue("s06c", "@receivable");
    tl.fromTo(recRing, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, tRc - 0.05);
    tl.to(recRing, { opacity: 0, duration: 0.3, ease: "power2.in" }, tRc + 0.9);
    gopal.expr(tl, tPb, "grin");
    // Gopal tips his cap and walks off; the ✗ ink ring floats toward the Profit pocket (s07 picks it up)
    const tTip = tRc + 0.55;
    gopal.arm(tl, tTip, "R", 150, 20, 0.2); gopal.headTilt(tl, tTip + 0.1, 5); gopal.arm(tl, tTip + 0.55, "R", 12, 8, 0.3); gopal.headTilt(tl, tTip + 0.6, 0);
    const pp = H.pocketPt("Profit");
    tl.set(inkRing, { x: 840, y: 700, opacity: 0 }, 0);
    tl.set(inkRing, { opacity: 0.8 }, tRc + 0.2);
    L5.fly(tl, inkRing, tRc + 0.2, [840, 700], [pp[0], pp[1]], Math.max(0.6, sc.end - tRc - 0.5), { lift: 90 });
    L5.allow(svg);
  };
})();
