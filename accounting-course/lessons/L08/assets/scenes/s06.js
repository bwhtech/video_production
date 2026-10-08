// s06 — Faded: T15, Raju's salary ₹8,000 by UPI. Teal. Meera writes the Salary debit line, then stops at the blank "To ____" credit line; the viewer finishes it (2.6 s still gap).
//   two-slot beat before the entry (Salary ▲ / Bank ▼) · Raju gets a name chip + a UPI ping · HUD tilts on the Dr amount, levels when the credit line lands.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, JX = L8.JX, HI = window.TL.lang === "hi";
    const S = L8.scaffold(svg, tl, K, sc, { color: C.teal });
    const jc = S.jc, y0 = S.y(0), y1 = S.y(1);
    const jarSal = S.jar("L", "salary", "Salary", "coins", C.dr), jarBank = S.jar("R", "bank", "Bank", "notes", C.cr);
    // cast: Meera (left, writing), Raju (right, with a name chip + a phone)
    const m = K.meera(svg, 130, 1048, 0.56, { expr: "happy" });
    const raju = K.raju(svg, 1800, 1048, 0.56, { expr: "happy", flip: true, tray: false });
    const phone = K.phone(svg, 1690, 700, 0.42, { screen: "upi" }); L8.hide(phone.g);
    // the two things that change (lit at the ding)
    const salO = L8.labelled(svg, 330, 1050, "user", "Salary", C.sky), bankO = L8.labelled(svg, 1560, 1050, "landmark", "Bank", C.navy);
    // the blank credit line: "To" + dotted underline + dotted Cr cell
    const blank = L8.node(jc.body, 0, 0); L8.hide(blank);
    K.text(blank, JX.part + 60, y1 + 3, "To", { size: 38, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
    K.el("path", { d: "M" + (JX.part + 118) + "," + (y1 + 22) + " L" + (JX.part + 330) + "," + (y1 + 22), stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "9 8", "stroke-linecap": "round", opacity: 0.6 }, blank);
    K.el("path", { d: K.cutRect(JX.crR - 140, y1 - 24, 130, 48, 0.8, 16), fill: "none", stroke: C.cr, "stroke-width": 4, "stroke-dasharray": "9 7", "stroke-linecap": "round" }, blank);
    const dev = K.whichTwo(svg, { veil: true, x: 960, y: 190, s: 1 });
    L8.allow(svg);

    // =============================================================================== timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.2); raju.blinks(tl, T0 + 2.0, sc.end, 3.6, 5); m.jitter(tl, T0, sc.end); raju.jitter(tl, T0, sc.end);
    // s06a — "Now Meera writes one. Raju's salary — ₹8,000, paid by UPI from the bank. Which two things changed?"
    m.expr(tl, cue("s06a", "@meera"), "happy").arm(tl, cue("s06a", "@writes"), "R", 70, 80, 0.3);
    L8.nameChip(svg, tl, 1800, 690, HI ? "राजू" : "Raju", cue("s06a", "@raju's") - 0.1, 1.5);
    raju.expr(tl, cue("s06a", "@raju's"), "grin");
    tl.to(phone.g, { opacity: 1, duration: 0.3 }, cue("s06a", "@eight") - 0.1);
    phone.show(tl, cue("s06a", "@upi") - 0.5, { type: "upi", kind: "PAID", amount: "₹8,000", from: "Raju" }); phone.buzz(tl, cue("s06a", "@upi") - 0.4);
    L8.drop(tl, salO, cue("s06a", "@salary") + 0.1, { dur: 0.3 }); L8.drop(tl, bankO, cue("s06a", "@upi") + 0.2, { dur: 0.3 });
    const slots = dev.run(tl, cue("s06a", "@changed") - 0.3, { slots: 2, gap: 2.0, fill: [{ label: "Salary", delta: 8000, side: "L" }, { label: "Bank", delta: -8000, side: "R" }] });
    L8.flashRing(svg, tl, slots.tDing, [330 - 110, 1050 - 190, 330 + 110, 1050 + 6]); L8.flashRing(svg, tl, slots.tDing, [1560 - 110, 1050 - 190, 1560 + 110, 1050 + 6]);
    S.check.tick(tl, slots.tDing + 0.15, 0);
    dev.clear(tl, cue("s06b", "@salary") - 0.2);
    // s06b — Meera writes the debit line, then stops
    m.arm(tl, cue("s06b", "@meera"), "R", 80, 70, 0.25);
    S.date(cue("s06b", "@meera") - 0.3, 0, "Apr 30", 0.5);
    S.acct(cue("s06b", "@salary", 2) - 0.1, 0, "Salary A/c");
    S.check.tick(tl, cue("s06b", "@expense") + 0.2, 1);
    S.tag(cue("s06b", "@debit", 2) + 0.9, 0, "nominal_expense", "dr", { light: false });
    const tDr = cue("s06b", "@debit", 2);
    S.drMark(tDr - 0.2, 0); S.amt(tDr + 0.2, 0, "dr", 8000, 0.7);
    L8.fly(svg, tl, tDr, [330, 960], S.HP.L, (n) => K.medallion(n, 0, 0, 40, "user", C.sky), { dur: 0.8, k: 0.3 });
    jarSal.enter(tl, tDr + 0.7); S.hud.tilt(tl, tDr + 0.7, 5, { dur: 0.7 }); S.hud.setTotals(tl, tDr + 0.7, 8000, undefined, { dur: 0.6 });
    S.check.tick(tl, tDr + 0.4, 2);
    // "she stops at the credit line" — pencil lifts, the blank "To ____" shows, Meera looks at us and holds still
    const tStop = cue("s06b", "@stops");
    S.pencil.goto(tl, tStop - 0.6, L8.P(JX.part + 100, y1 + 20)[0], L8.P(JX.part + 100, y1 + 20)[1], 0.5);
    L8.drop(tl, blank, tStop - 0.5, { dur: 0.3 });
    m.expr(tl, tStop, "thinking").look(tl, tStop, 0, 0).headTilt(tl, tStop + 0.2, 6); m.arm(tl, tStop, "R", 12, 8, 0.4);
    S.pencil.hide(tl, tStop + 0.6);
    // s06c — the answer: To Bank, ₹8,000; the money left the bank — an asset shrank, right side; the bank is Personal, the giver
    const tTo = cue("s06c", "@to");
    tl.to(blank, { autoAlpha: 0, duration: 0.15 }, tTo - 0.05);
    S.pencil.show(tl, tTo - 0.5);
    m.expr(tl, tTo, "happy").headTilt(tl, tTo, 0); m.arm(tl, tTo, "R", 80, 70, 0.25);
    S.acct(tTo, 1, "To  Bank A/c", { to: true });
    const tAm = cue("s06c", "@eight");
    S.amt(tAm, 1, "cr", 8000, 0.7);
    L8.fly(svg, tl, cue("s06c", "@left") - 0.2, [1560, 960], S.HP.R, (n) => K.medallion(n, 0, 0, 40, "landmark", C.navy), { dur: 0.8, k: 0.3 });
    const tRight = cue("s06c", "@right");
    jarBank.enter(tl, tRight); S.hud.settle(tl, tRight, { dur: 0.8, hold: 1.5 }); S.hud.setTotals(tl, tRight, undefined, 8000, { dur: 0.6 });
    S.tag(cue("s06c", "@giver") - 0.3, 1, "personal_giver", "cr", { light: false });
    S.narr(cue("s06c", "@credit") - 0.1, 2, "user", "Salary");
    raju.expr(tl, cue("s06c", "@personal"), "happy");
    S.pencil.hide(tl, cue("s06c", "@credit") + 1.2);
    L8.allow(svg);
  };
})();
