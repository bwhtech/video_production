// s08 — Imagine: the water bill (solo). A DASHED card (not in Meera's books): ₹500 arriving May 2. Does April's profit change? Which two things changed? — 3.2 s countdown.
//   Yes: the bill goes into the (dashed) April bin; Dr Water / Cr Water payable on a dashed JournalCard; a ghost Profit needle dips half a notch; the real needle stays put.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const G = L.gauges(svg, { profit: 24700 });
    const H = L.hud(svg, tl, { elec: true, profit: 24700, totals: [106700, 106700], visible: true });
    H.jars.stock.fill(tl, 0, 0.2);

    // ---- the imagined bill
    const bin = L.calPage(svg, 700, 520, "April", { w: 360, h: 340, dashed: true }); L.hide(bin);
    const bill = L.hide(L.node(svg, 960, 560));
    { const b = K.g(bill, {}); L.card(b, 440, 270, { dashed: true, stripe: C.sky }); K.medallion(b, -140, -20, 52, "droplets"); K.ticker(b, 66, -18, 1, { value: 500, size: 68, color: C.ink }); L.allow(b); }
    const may2 = L.hide(L.node(svg, 1230, 470)); K.dateTile(may2, 0, 0, 1, { month: "May", day: 2, w: 120, h: 120 });
    const pm = K.pauseMedallion(svg, 1420, 640, 0.5, { hidden: true });
    // the dashed JournalCard (+ dashed outline = imagined, not in the books)
    const jc = K.journalCard(svg, 960, 1050, 0.95, { rows: 3, hidden: true });
    const jcOut = L.hide(L.node(svg, 0, 0));
    K.el("path", { d: K.cutRect(960 - jc.W * 0.95 / 2 - 4, 1050 - jc.H * 0.95 - 4, jc.W * 0.95 + 8, jc.H * 0.95 + 8, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 6, "stroke-dasharray": "20 14", "stroke-linecap": "round", opacity: 0.8 }, jcOut);
    // a dashed `Water payable` tag hangs briefly on the HUD's right pan
    const hp = H.panPt("R", 0, -36);
    const dtag = L.hide(L.node(svg, hp[0], hp[1] + 20));
    { const dg = K.g(dtag, {}); K.paper(dg, K.cutRect(-26, -34, 52, 68, 1, 12), C.cream, { opacity: 0.7 }); K.el("path", { d: K.cutRect(-22, -30, 44, 60, 0.8, 12), fill: "none", stroke: C.ink, "stroke-width": 3, "stroke-dasharray": "8 6", opacity: 0.8 }, dg); K.medallion(dg, 0, 2, 17, "droplets"); }
    const khata = K.khataRig(svg, 1800, 1010, 0.5, { expr: "awake" });
    const w2 = K.whichTwo(svg, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 14);
    // s08a — "Your go": the dashed bill arrives (May 2); the question; the countdown
    const tW = cue("s08a", "@water");
    L.drop(tl, bill, tW - 0.1, { dur: 0.4 });
    L.drop(tl, may2, cue("s08a", "@second"), { dur: 0.3 });
    K.pulseNode(tl, bill, cue("s08a", "@five"), 1.05);
    G.profit.flash(tl, cue("s08a", "@profit"), 1.0);
    const tWhich = cue("s08a", "@which");
    const tYes = cue("s08b", "@yes"), tDeb = cue("s08b", "@debit"), tCr = cue("s08b", "@credit"), tPay = cue("s08b", "@payable");
    w2.run(tl, tWhich, { slots: 2, gap: 3.2, fill: [{ label: "Water", delta: 500, side: "L", at: tDeb + 0.2 }, { label: "Water payable", delta: 500, side: "R", at: tPay + 0.1 }] });
    pm.enter(tl, segEnd("s08a") - 0.4); pm.countdown(tl, segEnd("s08a") + 0.1, { dur: 3.1 });
    // s08b — Yes: into the April bin; the entry; the ghost needle
    L.lift(tl, pm.body, tYes - 0.1);
    L.drop(tl, bin, tYes - 0.1, { dur: 0.35 });
    tl.to(bill, { x: 700 - 960, y: 590 - 560, scale: 0.75, svgOrigin: O, duration: 0.7, ease: "power2.inOut" }, tYes + 0.1);
    tl.to(may2, { x: 700 - 1230 + 90, y: 478 - 470, duration: 0.7, ease: "power2.inOut" }, tYes + 0.1);
    khata.arm(tl, tYes, "L", 150, 0.25).expr(tl, tYes, "happy"); khata.arm(tl, tYes + 1.2, "L", 12, 0.3);
    jc.enter(tl, tDeb - 0.3); L.drop(tl, jcOut, tDeb - 0.3, { dur: 0.3 });
    jc.writeRow(tl, tDeb - 0.05, { date: "Apr 30", account: "Water", dr: 500, tag: "nominal_expense" });
    jc.writeRow(tl, tCr - 0.3, { account: "Water payable", cr: 500, tag: "personal_giver" });
    jc.narration(tl, tCr + 1.0, { icon: "droplets", text: "imagine" });
    L.drop(tl, dtag, tPay, { dur: 0.3 }); L.lift(tl, dtag, segEnd("s08b") - 0.2, { dur: 0.3 });
    w2.clear(tl, tCr + 1.0);
    const tPr = cue("s08b", "@profit");
    G.profit.ghostTo(tl, tPr, 24200, 0.9); G.cash.flash(tl, tPr + 0.2, 1.0);
    G.profit.ghostOff(tl, segEnd("s08b") + 0.1);
    // all dashed things exit faster than they entered
    [bill, may2, bin].forEach((n, i) => L.lift(tl, n, segEnd("s08b") - 0.1 + i * 0.03, { dur: 0.2 }));
    tl.to(jc.body, { opacity: 0, duration: 0.2 }, segEnd("s08b") - 0.1); L.lift(tl, jcOut, segEnd("s08b") - 0.1, { dur: 0.2 });
    L.allow(svg);
  };
})();
