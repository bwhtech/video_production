// s05 — Surprise 3: depreciation. The cart (₹36,000) wears a little: 36 month tiles, one tile = ₹1,000 → the April tile drops into a `Depreciation` jar
//   (no coin moves). WHICH TWO THINGS CHANGED? → Dr Depreciation / Cr Accumulated depreciation: the scuff sticker flies from the cart into its own book;
//   the cart's tag keeps ₹36,000 with a −1,000 sticker; book value 35,000. JournalCard sits at the BOTTOM here so the books stay visible above it.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { profit: 25700 });
    const H = L.hud(svg, tl, { elec: true, profit: 25700, totals: [107700, 107700], visible: true });
    H.jars.stock.fill(tl, 0, 0.2);

    // ---- the cart + its price tag + the scuff sticker
    const world = K.g(svg, {});
    const CX = 700, CY = 700, CS = 0.6;
    K.stall(world, CX, CY, CS, { noProps: true });
    K.paper(world, K.cutEll(CX, CY + 4, 220, 14, 1.5), "#3b2614", { opacity: 0.18 });
    const tag = K.hangTag(world, CX + 226, CY - 385, 1, { amount: 36000, string: 50, hidden: true });
    const scuff = L.hide(L.node(world, CX + 40, CY - 140)); { const sk = L.scuff(scuff, 0, 0, 34); }
    // flashback card (L4: the cart, a ✓, a tiny "2") — a torn memory, not a date change
    const memo = L.hide(L.node(world, 1180, 420));
    { const mc = K.g(memo, { transform: "rotate(-4)" }); L.card(mc, 330, 270, { dashed: true }); K.cartArt(mc).setAttribute("transform", "translate(-30 -10) scale(1.3)"); K.medallion(mc, 96, 56, 34, "check", C.leaf); K.medallion(mc, -114, -86, 30, "calendar"); K.text(mc, -114, -86, "2", { size: 30, weight: 800, color: C.ink }); }
    const badge = L.hide(L.node(svg, 960, 190)); K.label(badge, 0, 0, "3", { size: 64, bg: C.saffron, weight: 800, w: 92, h: 92 });
    // ---- 36 month tiles (letters stripped — a plain strip of months) + the sum row
    const strip = K.monthTiles(world, 960, 830, 1, { months: 36, per: 12, width: 1700, hidden: true });
    strip.tiles.forEach((t) => t.inner.querySelectorAll("text").forEach((x) => x.remove()));
    const sumA = L.chip(world, 560, 940, "₹36,000", { size: 52, bg: "paper" });
    const sumB = L.chip(world, 860, 940, "÷ 36", { size: 52, bg: C.saffron });
    const sumC = L.hide(L.node(world, 1170, 940));
    { K.label(sumC, -100, 0, "=", { size: 52, bg: "paper", w: 70 }); }
    const sumTk = K.ticker(sumC, 60, 2, 1, { value: 0, size: 56, chip: true, w: 250, h: 84, edge: C.crText });
    const depJar = K.jarRig(world, 1400, 660, 1.0, { label: "Depreciation", contents: "coins", fill: 0, amount: 0, edge: C.dr, hidden: true });
    // the April tile that peels off (a separate paper tile)
    const tile = L.hide(L.node(world, 150, 830)); K.paper(K.shadow(tile, 1), K.cutRect(-22, -33, 44, 66, 1.2, 12), C.gold);

    // ---- books (s05d) + marks
    const BKY = 690, BKS = 0.65, EX = 1190, AX = 1590;
    const bkE = L.book(world, EX, BKY, BKS, "Equipment", { icon: "shopping-cart" }); L.hide(bkE.n);
    const bkA = L.book(world, AX, BKY, BKS, "Accumulated depreciation", { icon: "shopping-cart" }); L.hide(bkA.n);
    const eTk = K.ticker(bkE.b, bkE.pageX.L, -bkE.Hh + 130, 1, { value: 36000, size: 46, color: C.drText }); L.hide(eTk.g);
    const aTk = K.ticker(bkA.b, bkA.pageX.R, -bkA.Hh + 130, 1, { value: 0, size: 46, color: C.crText }); L.hide(aTk.g);
    const arrow = L.hide(L.node(world, 880, 570)); K.arrowShape(arrow, 0, 0, 130, C.coral, -1, 0, 26);
    const xMark = L.hide(L.node(world, 1000, 570)); K.medallion(xMark, 0, 0, 40, "x", C.coral);
    // book value: a −1,000 sticker on the tag + the sum
    const contra = L.hide(L.node(world, CX + 250, CY - 200)); { const cs = K.g(contra, {}); L.scuff(cs, -34, 0, 26); K.text(cs, 24, 2, "−1,000", { size: 36, weight: 800, color: C.coralText }); }
    const bv = L.hide(L.node(world, 300, 640)); K.label(bv, 0, 0, "36,000 − 1,000 = 35,000", { size: 40, bg: "paper", weight: 800 });

    const m = K.meera(svg, 1660, 1000, 0.9, { expr: "neutral" });
    const jc = K.journalCard(svg, 960, 1050, 0.95, { rows: 3, hidden: true });
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, segEnd("s05c"), 3.4);
    m.look(tl, T0 + 0.6, -9, -2);
    m.expr(tl, cue("s05a", "@lesson"), "thinking"); m.expr(tl, cue("s05a", "@day"), "puzzled");
    m.expr(tl, cue("s05b", "@quite"), "happy"); m.shrug(tl, cue("s05b", "@wears") + 0.3, 0.8);
    m.expr(tl, cue("s05c", "@depreciation"), "proud");
    m.walkTo(tl, segEnd("s05c") + 0.1, 2150, 1.0);
    // push in a touch toward the cart on "sneakiest"
    const tSn = cue("s05a", "@sneakiest");
    L.push(tl, world, tSn - 0.2, segEnd("s05a") - tSn + 0.2, `${CX} ${CY - 250}`, 1.0, 1.05, "power1.inOut");
    L.drop(tl, badge, cue("s05a", "@surprise") - 0.05, { dur: 0.3 }); L.lift(tl, badge, cue("s05a", "@sneakiest") + 0.3);
    const tCart = cue("s05a", "@cart");
    tag.enter(tl, tCart - 0.1); tag.swing(tl, tCart + 0.3, { deg: 8 });
    const tLes = cue("s05a", "@lesson");
    L.drop(tl, memo, cue("s05a", "@second") + 0.1, { dur: 0.4 });
    L.lift(tl, memo, cue("s05a", "@day") - 0.4);
    // s05b — it wears a little: the scuff sticker; 36 tiles; ÷ 36 → ₹1,000; the April tile drops into the Depreciation jar
    const tW = cue("s05b", "@wears");
    L.drop(tl, scuff, tW, { dur: 0.3 });
    const tThree = cue("s05b", "@three");
    strip.reveal(tl, tThree + 0.1, { per: 0.03 });
    [0, 1, 2].forEach((y) => strip.year(tl, tThree + 0.25 + y * 0.45, y));
    L.drop(tl, sumA, cue("s05b", "@months") + 0.2, { dur: 0.3 });
    const tDiv = cue("s05b", "@divided");
    L.drop(tl, sumB, tDiv, { dur: 0.3 });
    const tMon = cue("s05b", "@month");
    L.drop(tl, sumC, tMon - 0.3, { dur: 0.3 }); sumTk.to(tl, tMon - 0.2, 1000, 0.7);
    strip.mark(tl, cue("s05b", "@slice"), 0, C.gold);
    depJar.enter(tl, tMon - 0.3);
    // the April tile peels off and falls into the jar — no coin, no note
    const tPeel = cue("s05c", "@depreciation") - 0.3;
    tl.set(tile, { opacity: 1 }, tPeel);
    L.fly(tl, tile, tPeel, [0, 0], [1400 - 150, 600 - 830], 0.9, { lift: 130 });
    tl.to(tile, { rotation: 20, svgOrigin: O, duration: 0.9, ease: "power1.inOut" }, tPeel);
    tl.set(tile, { opacity: 0 }, tPeel + 0.92);
    depJar.fill(tl, tPeel + 0.9, 0.5); depJar.tick(tl, tPeel + 0.9, 0, 1000, 0.6);
    // s05c/d — the device
    const tWhich = cue("s05c", "@which");
    const tDr = cue("s05d", "@debit"), tDep = cue("s05d", "@depreciation"), tAcc = cue("s05d", "@accumulated"), tCr2 = cue("s05d", "@credit", 2);
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [{ label: "Depreciation", delta: 1000, side: "L", at: tDep + 0.1 }, { label: "Accumulated depreciation", delta: 1000, side: "R", at: tAcc + 0.9 }] });
    // the strip + sum row leave; the JournalCard (bottom) writes row 1
    [strip.g, sumA, sumB, sumC].forEach((n, i) => L.lift(tl, n, segEnd("s05c") + 0.2 + i * 0.04, { dur: 0.25 }));
    jc.enter(tl, tDr - 0.3);
    jc.writeRow(tl, tDr - 0.05, { date: "Apr 30", account: "Depreciation", dr: 1000, tag: "nominal_expense" });
    // "not the cart's own page": the Equipment khata; an arrow toward it stops short and fades with an ✗
    const tOwn = cue("s05d", "@own");
    depJar.exit(tl, tOwn - 0.4);
    L.drop(tl, bkE.n, tOwn - 0.3, { dur: 0.4 }); L.drop(tl, eTk.g, tOwn + 0.1, { dur: 0.3 });
    L.drop(tl, arrow, tOwn + 0.5, { dur: 0.3 });
    tl.to(arrow, { x: 40, duration: 0.5, ease: "power2.out" }, tOwn + 0.6);
    L.lift(tl, arrow, tOwn + 1.2, { dur: 0.2 }); L.drop(tl, xMark, tOwn + 1.25, { dur: 0.3 });
    // "a page of its own": the second khata opens; "Accumulated depreciation": the scuff lifts off the cart and flies into it
    const tPage = cue("s05d", "@page");
    L.drop(tl, bkA.n, tPage - 0.1, { dur: 0.4 });
    L.lift(tl, xMark, tPage + 0.4, { dur: 0.2 });
    const tFly = tAcc + 0.1;
    L.fly(tl, scuff, tFly, [0, 0], [AX + bkA.pageX.R * BKS - (CX + 40), BKY - BKS * 200 - (CY - 140)], 1.0, { lift: 120 });
    tl.to(scuff, { scale: 0.8, svgOrigin: O, duration: 1.0, ease: "power1.inOut" }, tFly);
    tl.set(scuff, { opacity: 0 }, tFly + 1.02);
    L.drop(tl, aTk.g, tFly + 1.0, { dur: 0.3 }); aTk.to(tl, tFly + 1.05, 1000, 0.6);
    // "Credit, one thousand": row 2
    jc.writeRow(tl, tCr2 - 0.15, { account: "Accumulated depreciation", cr: 1000, tag: "real_out" });
    jc.narration(tl, tCr2 + 1.0, { icon: "shopping-cart", text: "April wear" });
    w2.clear(tl, tCr2 + 0.6);
    L.twoLine(w2.g, "Accumulated depreciation", ["Accumulated", "depreciation"]);
    // book value: a −1,000 sticker on the tag + the sum (the tag keeps ₹36,000)
    const tPaper = cue("s05d", "@paper"), tBook = cue("s05d", "@book"), tNow = cue("s05d", "@now");
    L.drop(tl, contra, tBook - 0.2, { dur: 0.3 }); tag.swing(tl, tBook, { deg: 5 });
    L.drop(tl, bv, tNow - 0.1, { dur: 0.34 });
    // HUD: contra sticker on the Equipment jar; left pan reads ₹1,06,700; Profit pocket dips; level. Gauge: third notch (no VO)
    H.rig.setTotals(tl, tNow, 106700, undefined, { dur: 0.6 }); H.rig.tilt(tl, tNow + 0.05, 2.5, { dur: 0.5 });
    H.card.pocketTick(tl, tNow + 0.3, "Profit", 24700);
    H.rig.setTotals(tl, tNow + 0.3, undefined, 106700, { dur: 0.5 }); H.rig.settle(tl, tNow + 0.3, { dur: 0.9, hold: 1.5 });
    G.profit.read(tl, tNow + 0.2, 24700, { dur: 1.0 });
    L.allow(svg);
  };
})();
