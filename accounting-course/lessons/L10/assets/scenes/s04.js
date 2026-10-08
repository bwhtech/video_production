// s04 — Surprise 2: stock used up (faded). Stock jar fills ₹6,000 (cash) + ₹8,000 (Gopal Dairy) = ₹14,000; Meera counts ₹4,000 left → ₹10,000 used.
//   WHICH TWO THINGS CHANGED? — Meera fills slot 1 (Stock −10,000), hesitates over slot 2 (stays in Stock, or an expense?) — 2.6 s pause countdown — it's an expense.
//   Entry on the JournalCard: Dr Cost of supplies used / Cr Stock. Profit needle 35,700 → 25,700; Cash needle never moves.
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.saffron, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { profit: 35700 });
    const H = L.hud(svg, tl, { elec: true, profit: 35700, visible: true });

    const world = K.g(svg, {});
    // ---- the shelf + jars
    K.paper(K.shadow(world, 2), K.cutRect(620, 786, 1260, 36, 2, 24), C.wood);
    [680, 1820].forEach((x) => K.paper(K.shadow(world, 1), K.cutPoly([[x - 20, 822], [x + 20, 822], [x + 20, 880], [x - 20, 900]], 1, 12), C.woodDark));
    const stock = K.jarRig(world, 1000, 786, 1.7, { label: "Stock", icon: "leaf", contents: "leaves", fill: 0, amount: 0, edge: C.dr });
    const expJar = K.jarRig(world, 1500, 786, 1.25, { label: "Cost of supplies used", contents: "coins", fill: 0, amount: 0, edge: C.dr, hidden: true, w: 300 });
    const tumbler = K.tumbler(world, 1790, 786, 1.6);
    // deliveries
    const bag = L.hide(L.node(world, 740, 786));
    {
      K.paper(K.shadow(bag, 2), K.cutPoly([[-70, 0], [70, 0], [60, -130], [-60, -130]], 2, 16), "#c9a06a");
      K.paper(bag, K.cutPoly([[-60, -130], [60, -130], [48, -160], [-48, -160]], 1.4, 14), "#b48a5c");
      K.medallion(bag, 0, -70, 36, "coins");
    }
    const bagTag = L.chip(world, 740, 560, "₹6,000", { bg: C.dr, size: 46 });
    const crate = L.hide(L.node(world, 1250, 786));
    { K.crate(crate, 0, 0, 190, 140); K.medallion(crate, 0, -70, 34, "milk"); K.faceArt(crate, "gopal", 26).setAttribute("transform", "translate(60 -100)"); }
    const crateTag = L.chip(world, 1250, 540, "₹8,000", { bg: C.cr, size: 46 });
    const pk1 = K.packets(world, 1000, 330, 1.0, { gap: 120 });
    const pk2 = K.packets(world, 1000, 330, 1.0, { gap: 120 });
    const badge = L.hide(L.node(svg, 960, 190)); K.label(badge, 0, 0, "2", { size: 64, bg: C.saffron, weight: 800, w: 92, h: 92 });
    // the ghost stack (₹10,000) lifted out of the jar + its dashed chip
    const GX = 740, GYY = 600;
    const ghost = L.hide(L.node(world, GX, GYY));
    const ghostPk = K.packets(ghost, 0, 0, 0.8, { gap: 105 });
    const ghostChip = L.hide(L.node(ghost, 0, 62));
    K.paper(K.shadow(ghostChip, 1), K.cutRect(-90, -32, 180, 64, 1.4, 20), C.cream);
    K.el("path", { d: K.cutRect(-84, -26, 168, 52, 1, 20), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.8 }, ghostChip);
    const ghostTk = K.ticker(ghostChip, 0, 2, 1, { value: 0, size: 38, color: C.ink });
    // "?" slot beside the jar during the first gap
    const qslot = L.hide(L.node(world, 1290, 600));
    K.paper(qslot, K.cutRect(-70, -70, 140, 140, 1.4, 22), C.cream, { opacity: 0.6 });
    K.el("path", { d: K.cutRect(-62, -62, 124, 124, 1, 22), fill: "none", stroke: C.ink, "stroke-width": 4.5, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.8 }, qslot);
    K.qmark(qslot, 0, 4, 1.2, C.dr);
    const pm = K.pauseMedallion(world, 1800, 490, 0.45, { hidden: true });

    // ---- Meera (+ clipboard in her left hand)
    const m = K.meera(svg, 440, 1000, 0.95, { expr: "neutral" });
    const cb = K.clipboard(svg, 0, 0, 0.5, { items: [["Tea", 1], ["Milk", 1], ["Sugar", 1]], hidden: true, hold: { rig: m, side: "L", rest: [20, 70] } });
    const pen = K.g(m.handAnchor("R"), {});
    K.paper(pen, K.cutRect(-4, -40, 9, 52, 0.4, 8), C.mustard); K.paper(pen, K.cutPoly([[-4, 12], [5, 12], [0, 24]], 0.2, 6), "#e8cfa4");
    K.holdProp(m, "R", pen, [12, 8]); L.hide(pen);

    const jc = K.journalCard(svg, 1030, 800, 0.95, { rows: 3, hidden: true });
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end - 2, 3.4);
    // s04a — two deliveries drop in; packets fly into the jar; ₹14,000
    L.drop(tl, badge, cue("s04a", "@surprise") - 0.05, { dur: 0.3 });
    L.lift(tl, badge, cue("s04a", "@stock") + 0.4);
    const tSix = cue("s04a", "@six"), tTea = cue("s04a", "@tea"), tEight = cue("s04a", "@eight"), tFour = cue("s04a", "@fourteen");
    L.drop(tl, bag, tSix - 0.1, { dur: 0.4 }); L.drop(tl, bagTag, tSix + 0.3, { dur: 0.3 });
    m.expr(tl, tSix, "happy").look(tl, tSix, 9, 3);
    pk1.dropIn(tl, tTea - 0.2, { step: 0.12, from: 200 });
    [0, 1, 2].forEach((i) => pk1.fly(tl, tTea + 0.6 + i * 0.08, i, (1 - i) * 120, 270, { dur: 0.45, rot: 10 }));
    stock.fill(tl, tTea + 0.9, 0.5); stock.tick(tl, tTea + 0.9, 0, 6000, 0.8);
    L.lift(tl, bagTag, tEight - 0.2);
    L.drop(tl, crate, tEight - 0.1, { dur: 0.4 }); L.drop(tl, crateTag, tEight + 0.3, { dur: 0.3 });
    pk2.dropIn(tl, tEight + 0.7, { step: 0.12, from: 200 });
    [0, 1, 2].forEach((i) => pk2.fly(tl, tEight + 1.5 + i * 0.08, i, (1 - i) * 120, 270, { dur: 0.45, rot: 10 }));
    stock.fill(tl, tEight + 1.8, 1.0); stock.tick(tl, tEight + 1.8, 6000, 14000, 0.9);
    L.lift(tl, crateTag, tFour); L.lift(tl, bag, tFour + 0.1); L.lift(tl, crate, tFour + 0.1);
    stock.pulse(tl, tFour + 0.3);
    // s04b — she counts what is left on the shelf: three nods, three ticks; the jar thins to ₹4,000
    const tCount = cue("s04b", "@counts");
    cb.enter(tl, tCount - 0.2); m.pose(tl, tCount - 0.15, { aL: [20, 70], aR: [12, 8], dur: 0.3 });
    [0, 1, 2].forEach((i) => { const t = tCount + 0.5 + i * 0.5; m.look(tl, t, 10, i % 2 ? 5 : -2); m.headTilt(tl, t, i % 2 ? 3 : -3); cb.tick(tl, t + 0.1, i); });
    const tF = cue("s04b", "@four");
    stock.fill(tl, tF - 0.1, 0.25); stock.tick(tl, tF - 0.1, 14000, 4000, 0.9);
    const tUse = cue("s04b", "@use");
    L.drop(tl, qslot, tUse, { dur: 0.3 });
    m.expr(tl, tUse, "thinking");
    // s04c — ten thousand: a ghost stack lifts out of the jar; "poured into a cup" → it is no longer stock
    const tTen = cue("s04c", "@ten");
    L.lift(tl, qslot, tTen - 0.1, { dur: 0.15 });
    L.drop(tl, ghost, tTen, { dur: 0.4 }); ghostPk.dropIn(tl, tTen + 0.05, { step: 0.08, from: 60 });
    L.drop(tl, ghostChip, tTen + 0.3, { dur: 0.3 }); ghostTk.to(tl, tTen + 0.4, 10000, 0.9);
    m.expr(tl, tTen, "happy");
    const tPour = cue("s04c", "@poured"), tGone = cue("s04c", "@gone");
    tl.to(ghost, { x: 1790 - GX - 20, y: 700 - GYY, duration: 0.8, ease: "power1.inOut" }, tPour);
    tl.to(ghost, { opacity: 0.3, duration: 0.5 }, tGone);
    // s04d — Meera writes this one herself; which two things changed?
    const tMe = cue("s04d", "@meera");
    m.pose(tl, tMe, { aL: [12, 8], aR: [95, 20], dur: 0.3 }); L.fade(tl, pen, tMe, 1, 0.05);
    cb.exit(tl, tMe + 0.1);
    tl.to(ghost, { x: 0, y: 0, opacity: 0.55, duration: 0.5, ease: "power2.inOut" }, segEnd("s04d") - 0.2);
    const tWhich = cue("s04d", "@which");
    const tSure = cue("s04e", "@sure");
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [{ label: "Stock", delta: -10000, side: "L", at: tSure + 0.4 }, { pending: true, at: tSure + 0.4 }] });
    // s04e — slot 1 is hers; the jar dims; slot 2 stays open — two destinations; countdown
    tl.to(stock.body, { opacity: 0.55, duration: 0.4 }, tSure + 0.5);
    const tPause = cue("s04e", "@pause");
    expJar.enter(tl, tPause - 0.1);
    pm.enter(tl, tPause + 0.2); pm.countdown(tl, segEnd("s04e") + 0.05, { dur: 2.5 });
    const tStay = cue("s04e", "@stay");
    m.arm(tl, tStay - 0.2, "R", 80, 30, 0.2); m.look(tl, tStay - 0.2, 9, 3);                 // her pencil goes toward the Stock jar first…
    m.arm(tl, tStay + 0.5, "R", 70, 36, 0.2);                                                  // …and stops
    m.look(tl, tStay + 1.0, 10, 8);                                                            // looks at the chai tumbler
    // s04f — an expense: the ghost stack drops into the expense jar
    const tExp = cue("s04f", "@expense");
    L.lift(tl, pm.body, tExp - 0.2);
    tl.to(ghost, { x: 1500 - GX, y: 560 - GYY, duration: 0.55, ease: "power2.inOut" }, tExp - 0.1);
    L.lift(tl, ghostChip, tExp + 0.3, { dur: 0.15 });
    tl.to(ghost, { autoAlpha: 0, duration: 0.15 }, tExp + 0.45);
    expJar.fill(tl, tExp + 0.5, 1.0); expJar.tick(tl, tExp + 0.5, 0, 10000, 0.8);
    w2.fillSlot(tl, tExp + 0.3, 1, { label: "Cost of supplies used", delta: 10000, side: "L" });
    L.twoLine(w2.g, "Cost of supplies used", ["Cost of", "supplies used"]);
    m.expr(tl, tExp, "happy"); m.arm(tl, tExp, "R", 12, 8, 0.3);
    w2.clear(tl, tExp + 1.5);
    // the JournalCard: Dr Cost of supplies used / Cr Stock
    const tDr = cue("s04f", "@debit"), tCr = cue("s04f", "@credit");
    tl.to(world, { opacity: 0.18, duration: 0.4 }, tDr - 0.3);
    m.walkTo(tl, tDr - 0.7, 215, 0.9);
    jc.enter(tl, tDr - 0.25);
    jc.writeRow(tl, tDr - 0.05, { date: "Apr 30", account: "Cost of supplies used", dr: 10000, tag: "nominal_expense" });
    m.pose(tl, tDr, { aL: [12, 8], aR: [75, 40], dur: 0.25 });
    jc.writeRow(tl, tCr - 0.35, { account: "Stock", cr: 10000, tag: "real_out" });
    jc.narration(tl, tCr + 0.9, { icon: "leaf", text: "April count" });
    // HUD: the Stock jar shrinks; the Profit pocket dips; level again. The Profit needle slips, the Cash needle never moves.
    const tStk = cue("s04f", "@stock");
    H.jars.stock.fill(tl, tStk, 0.2);
    H.rig.setTotals(tl, tStk, 107700, undefined, { dur: 0.6 }); H.rig.tilt(tl, tStk + 0.1, 2.5, { dur: 0.5 });
    const tSl = cue("s04f", "@slips");
    G.profit.read(tl, tSl - 0.2, 25700, { dur: 1.0 }); G.profit.flash(tl, tSl - 0.2, 0.9);
    H.card.pocketTick(tl, tSl, "Profit", 25700);
    H.rig.setTotals(tl, tSl, undefined, 107700, { dur: 0.5 }); H.rig.settle(tl, tSl, { dur: 0.9, hold: 1.5 });
    tl.to(jc.body, { opacity: 0, duration: 0.3 }, sc.end - 0.4);
    L.allow(svg);
  };
})();
