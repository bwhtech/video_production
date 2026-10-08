// s05 — Worked: T14 (Infotech ₹4,000 on credit — the interleaved repeat of T9). Saffron, JournalCard + corner HUD, Priya at the right edge with an empty tumbler.
//   the Infotech line shows "?" in BOTH amount cells through the 1.6 s question gap · on "Debit." ₹4,000 ticks into the Dr cell (HUD tilts) · "To Sales, credit" ticks the Cr cell (HUD levels)
//   · a faded ghost of April 16's T9 entry slides over the rows and lines up exactly, then slides away.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, JX = L8.JX;
    const S = L8.scaffold(svg, tl, K, sc, { color: C.saffron });
    const jc = S.jc, y0 = S.y(0), y1 = S.y(1);
    const jarI = S.jar("L", "infotech", "Infotech", "notes", C.dr), jarS = S.jar("R", "sales", "Sales", "coins", C.cr);
    // Priya at the right edge with an empty tumbler
    const pr = K.priya(svg, 1810, 1048, 0.56, { expr: "happy", flip: true });
    const glassP = K.g(pr.handAnchor("R"), {}); K.tumbler(glassP, 0, 8, 1.1); K.holdProp(pr, "R", glassP, [12, 8]);
    // the chai bill (receipt + ₹4,000), top centre
    const bill = L8.node(svg, 960, 250); L8.hide(bill);
    K.paper(K.shadow(bill, 1), K.cutRect(-190, -46, 380, 92, 1.6, 22), C.cream); K.medallion(bill, -130, 0, 34, "receipt");
    const tkBill = K.ticker(bill, 40, 2, 1, { value: 0, size: 56, anchor: "middle" });
    // ghost of T9 (Apr 16 · Infotech A/c … Dr 6,000 / To Sales A/c 6,000)
    const ghost = L8.node(jc.body, 0, 0); L8.hide(ghost);
    {
      const gy0 = y0 - 40, gh = (y1 - y0) + 80;
      K.paper(K.shadow(ghost, 2), K.cutRect(-740, gy0, 1480, gh, 1.4, 26), C.cream, { opacity: 0.97 });
      const T = (x, y, s, o) => K.text(ghost, x, y, s, { ...o, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      T(JX.date, y0 + 3, "Apr 16", { size: 36, weight: 600 }); T(JX.part, y0 + 3, "Infotech A/c", { size: 38, weight: 700 }); T(JX.drSuffix - 46, y0 + 3, "Dr", { size: 36, weight: 800, color: C.drText });
      K.text(ghost, JX.drR, y0 + 3, "6,000", { size: 40, weight: 800, color: C.drText, anchor: "end" });
      T(JX.part + 60, y1 + 3, "To  Sales A/c", { size: 38, weight: 700 });
      K.text(ghost, JX.crR, y1 + 3, "6,000", { size: 40, weight: 800, color: C.crText, anchor: "end" });
    }
    const qDr = S.qcell(0, "dr"), qCr = S.qcell(0, "cr");
    L8.allow(svg);

    // =============================================================================== timeline
    pr.blinks(tl, T0 + 1.5, sc.end, 3.3); pr.jitter(tl, T0, sc.end);
    // s05a — "Same morning, Meera bills Infotech ₹4,000 for chai on their tab. Debit or credit, for Infotech?"
    S.khata.expr(tl, cue("s05a", "@same"), "happy");
    pr.walkTo(tl, cue("s05a", "@same") - 0.3, 1810, 0.01); pr.arm(tl, cue("s05a", "@infotech"), "R", 40, 70, 0.3);
    L8.drop(tl, bill, cue("s05a", "@four") - 0.2, { dur: 0.3 }); tkBill.to(tl, cue("s05a", "@four"), 4000, 0.8);
    S.date(cue("s05a", "@bills") - 0.1, 0, "Apr 30", 0.5);
    S.acct(cue("s05a", "@tab") - 0.2, 0, "Infotech A/c");
    qDr.show(cue("s05a", "@debit")); qCr.show(cue("s05a", "@debit") + 0.15);
    S.check.tick(tl, cue("s05a", "@infotech", 2) + 0.2, 0);
    S.khata.look(tl, cue("s05a", "@debit"), 0, 0); pr.look(tl, cue("s05a", "@credit"), -8, 2);
    // s05b — "Debit." → ₹4,000 ticks into the Dr cell, HUD tilts left
    const tDeb = cue("s05b", "@debit");
    qDr.hide(tDeb); qCr.hide(tDeb);
    S.drMark(tDeb, 0);
    S.amt(tDeb + 0.25, 0, "dr", 4000, 0.7);
    pr.expr(tl, tDeb, "grin");
    L8.fly(svg, tl, cue("s05b", "@asset") - 0.3, [960, 260], S.HP.L, (n) => K.medallion(n, 0, 0, 40, "receipt"), { dur: 0.8, k: 0.3 });
    jarI.enter(tl, cue("s05b", "@asset") + 0.5); S.hud.tilt(tl, cue("s05b", "@asset") + 0.5, 5, { dur: 0.7 }); S.hud.setTotals(tl, cue("s05b", "@asset") + 0.5, 4000, undefined, { dur: 0.6 });
    // "Personal, the receiver" — tag lands on the line and lights up
    const tPers = cue("s05b", "@personal");
    S.check.tick(tl, tPers + 0.2, 1);
    const tag0 = S.tag(tPers, 0, "personal_receiver", "dr", { light: false }); tag0.light(tl, cue("s05b", "@receiver"), { hold: 0.9 });
    // "And To Sales, credit." — the credit line; Cr ticks; HUD levels
    const tTo = cue("s05b", "@to");
    S.acct(tTo, 1, "To  Sales A/c", { to: true });
    const tCr = cue("s05b", "@credit");
    S.amt(tCr, 1, "cr", 4000, 0.7);
    L8.fly(svg, tl, tCr - 0.2, [960, 260], S.HP.R, (n) => K.medallion(n, 0, 0, 40, "coins", C.cr), { dur: 0.8, k: 0.3 });
    jarS.enter(tl, tCr + 0.6); S.hud.settle(tl, tCr + 0.6, { dur: 0.8, hold: 1.5 }); S.hud.setTotals(tl, tCr + 0.6, undefined, 4000, { dur: 0.6 });
    S.tag(tCr + 0.5, 1, "nominal_income", "cr", { light: false });
    S.check.tick(tl, tCr + 0.7, 2);
    S.narr(tCr + 1.1, 2, "receipt", "Infotech");
    // "Exactly like April sixteenth." — the T9 ghost slides over the rows, lines up, slides away
    const tEx = cue("s05b", "@exactly");
    tl.fromTo(ghost, { autoAlpha: 0, x: 900 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tEx);
    tl.to(ghost, { autoAlpha: 0, x: -900, duration: 0.4, ease: "power2.in" }, tEx + 1.3);
    pr.expr(tl, tEx, "happy");
    pr.arm(tl, tEx + 0.5, "R", 100, 80, 0.3); pr.arm(tl, tEx + 1.5, "R", 12, 8, 0.3);
    S.pencil.hide(tl, tEx + 1.5);
    jc.body.appendChild(ghost.parentNode);   // the ghost slides OVER everything written on the card
  };
})();
