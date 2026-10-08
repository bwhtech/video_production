// s03 — Surprise 1: the unpaid bill → the word "Adjustments" (worked). April electricity ₹1,000, due in May: whose cost?
//   bill in an envelope → April / May bins → the bill goes in April → "adjustments" lands on the calendar's 30 → Khata + JournalCard
//   → WHICH TWO THINGS CHANGED? → Dr Electricity / Cr Electricity payable; the Profit needle drops, the Cash needle never moves.
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { hidden: true });

    // ---- cast + props
    const m = K.meera(svg, 210, 1000, 0.95, { expr: "neutral" });
    const bins = [L.calPage(svg, 560, 720, "April", { w: 360, h: 400 }), L.calPage(svg, 1360, 720, "May", { w: 360, h: 400, col: C.violet })];
    bins.forEach(L.hide);
    const env = K.envelope(svg, 960, 1030, 1.2, { w: 440, h: 280, header: C.saffron, icon: "mail" });
    const bill = L.hide(L.node(svg, 960, 590));
    {
      const b = K.g(bill, {});
      L.card(b, 440, 270, { stripe: C.saffron });
      K.medallion(b, -140, -24, 52, "zap");
      var billTk0 = K.ticker(b, 66, -22, 1, { value: 0, size: 68, color: C.ink });
      L.allow(b);
    }
    const billTk = billTk0;
    const mayChip = L.hide(L.node(bill, 0, 76)); K.label(mayChip, 0, 0, "May", { size: 46, bg: C.violet, weight: 800 });
    const bulb = L.hide(L.node(svg, 470, 470)); K.medallion(bulb, 0, 0, 52, "lightbulb");
    const kettle = K.kettle(svg, 660, 520, 0.9); const kettleN = L.hide(kettle.g);
    const badge = L.hide(L.node(svg, 960, 190)); K.label(badge, 0, 0, "1", { size: 64, bg: C.saffron, weight: 800, w: 92, h: 92 });
    // "Adjustments" chip drops onto the calendar's 30; three empty slips tuck behind it
    const adj = L.chip(svg, 1600, 190, "Adjustments", { bg: C.saffron, size: 44, rot: -2 });
    const slips = [0, 1, 2].map((i) => { const n = L.hide(L.node(svg, 1818 - 22 + i * 22, 112 + i * 2)); K.paper(K.shadow(n, 1), K.cutRect(-20, -4, 40, 62, 0.8, 12), C.cream); K.ink(n, [[-12, 14], [12, 14]], 3, "#a39684"); return n; });

    // ---- Khata + the JournalCard + the Scale HUD (arrive on s03d)
    const khata = K.khataRig(svg, 1560, 1010, 0.55, { expr: "awake" }); L.hide(khata.g);
    const jc = K.journalCard(svg, 900, 800, 0.95, { rows: 3, hidden: true });
    const H = L.hud(svg, tl, {});
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, segStart("s03d"), 3.4);
    // the envelope from s02 lands on the floor
    env.drop(tl, T0 + 0.1);
    m.look(tl, T0 + 0.2, 8, 6);
    // s03a — the two gauges hang on the wall, one at a time
    const tGalla = cue("s03a", "@galla");
    G.profit.enter(tl, tGalla - 0.3); G.cash.enter(tl, tGalla + 0.45);
    K.pulseNode(tl, cal.hl, cue("s03a", "@last"), 1.25);
    // s03b — the bill: envelope opens into a card with ₹1,000 and a "May" chip; the two bins slide in
    L.drop(tl, badge, cue("s03b", "@surprise") - 0.05, { dur: 0.3 });
    const tBill = cue("s03b", "@bill");
    env.open(tl, tBill - 0.1, { dur: 0.5 });
    m.expr(tl, tBill, "amazed"); m.look(tl, tBill, 9, 4);
    L.drop(tl, bill, tBill + 0.55, { dur: 0.34 });
    billTk.to(tl, cue("s03b", "@thousand"), 1000, 0.8);
    L.lift(tl, badge, cue("s03b", "@due") - 0.2);
    L.drop(tl, mayChip, cue("s03b", "@due"), { dur: 0.3 });
    const tMay = cue("s03b", "@may");
    tl.fromTo(bins[0], { x: -520, autoAlpha: 1 }, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, tMay - 0.25);
    tl.fromTo(bins[1], { x: 520, autoAlpha: 1 }, { x: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, tMay - 0.2);
    m.expr(tl, cue("s03b", "@whose"), "thinking").look(tl, cue("s03b", "@whose"), 0, -6);
    // s03c — April's: the bill slides into the April bin; the lights + the kettle are the reasons; the word lands
    const tApr = cue("s03c", "@april's");
    tl.to(bill, { x: 560 - 960, y: 735 - 590, scale: 0.74, svgOrigin: O, duration: 0.7, ease: "power2.inOut" }, tApr);
    env.exit(tl, tApr, { dur: 0.25 });
    tl.to(bins[1], { opacity: 0.4, duration: 0.4 }, tApr + 0.2);
    m.expr(tl, tApr, "happy");
    const tLights = cue("s03c", "@lights");
    L.drop(tl, bulb, tLights - 0.05, { dur: 0.3 }); L.drop(tl, kettleN, tLights + 0.35, { dur: 0.3 });
    kettle.steamLoop(tl, tLights + 0.4, cue("s03c", "@journal"));
    const tAdj = cue("s03c", "@adjustments");
    L.drop(tl, adj, tAdj - 0.05, { dur: 0.36 });
    slips.forEach((s, i) => L.drop(tl, s, tAdj + 0.45 + i * 0.12, { dur: 0.28 }));
    K.pulseNode(tl, cal.hl, tAdj + 0.1, 1.3);
    // s03d — Khata writes: bins, bill, bulb and kettle leave; Meera steps out; Khata + the JournalCard; the Scale HUD slides in
    const tKh = cue("s03d", "@khata");
    [bins[0], bins[1], bill, bulb, kettleN, adj, ...slips].forEach((n, i) => L.lift(tl, n, tKh - 0.2 + i * 0.03, { dur: 0.25 }));
    m.walkTo(tl, tKh - 0.1, -230, 1.2);
    tl.set(khata.g, { opacity: 1 }, tKh + 0.2);
    khata.hop(tl, tKh + 0.25, { height: 60 }).expr(tl, tKh + 0.25, "happy");
    jc.enter(tl, tKh + 0.55);
    const tW = cue("s03d", "@writes");
    H.enter(tl, tW + 0.1);
    // THE DEVICE
    const tWhich = cue("s03d", "@which");
    const tElec = cue("s03e", "@electricity"), tPay = cue("s03e", "@payable");
    const slots = w2.run(tl, tWhich, { slots: 2, gap: 2.0, fill: [
      { label: "Electricity", delta: 1000, side: "L", at: tElec },
      { label: "Electricity payable", delta: 1000, side: "R", at: tPay },
    ] });
    // s03e — the entry on the JournalCard
    const tDr = cue("s03e", "@debit"), tCr = cue("s03e", "@credit");
    jc.writeRow(tl, tDr - 0.1, { date: "Apr 30", account: "Electricity", dr: 1000, tag: "nominal_expense" });
    khata.arm(tl, tDr - 0.1, "R", 70, 0.25).expr(tl, tDr, "wow");
    // the new liability: a tag on the HUD's right pan; the scale tips a fraction, then settles as the expense lands
    H.addTag(tl, tPay, "elec");
    H.rig.tilt(tl, tPay + 0.25, -2.5, { dur: 0.5 });
    jc.writeRow(tl, tCr - 0.1, { account: "Electricity payable", cr: 1000, tag: "personal_giver" });
    jc.narration(tl, tCr + 1.2, { icon: "zap", text: "April bill" });
    w2.clear(tl, tCr + 0.6);
    khata.arm(tl, tCr - 0.1, "R", 20, 0.25).expr(tl, tCr + 0.3, "happy");
    // the galla didn't move (outline highlight on the Cash gauge) — the Profit needle drops one notch
    G.cash.flash(tl, cue("s03e", "@galla"), 1.1);
    const tSl = cue("s03e", "@slipped");
    G.profit.read(tl, tSl - 0.1, 35700, { dur: 1.0 });
    G.profit.flash(tl, tSl - 0.1, 0.9);
    H.card.pocketTick(tl, tSl, "Profit", 35700);
    H.rig.setTotals(tl, tSl, undefined, 117700, { dur: 0.5 });
    H.rig.settle(tl, tSl, { dur: 0.9, hold: 1.5 });
    // park the JournalCard at the left edge for the rest of the lesson
    tl.to(jc.body, { opacity: 0, duration: 0.3 }, sc.end - 0.5);
    L.allow(svg);
  };
})();
