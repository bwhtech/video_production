// s08 — Infotech pays by UPI (T12, the lesson's only SOLO). Apr 25. Priya taps her phone (UPI chime) → a paper coin stream arcs from the
// office into the Bank. 3.2 s countdown (pause medallion ring) with `?` flags over both gauge tickers. Reveal: Bank 15,000 → 19,000, Cash needle
// 50,000 → 54,000, Profit stays (`=` tag). The Infotech jar in the Scale HUD loses coins (`−₹4,000`); its remaining balance is NEVER labelled.
// Out: default torn-paper wipe into s09.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5, T0 = sc.start, GY = 1000;
    L5.stage(K, svg, C.sky, 880);
    const tint = K.el("rect", { x: -40, y: -40, width: 2000, height: 930, fill: "#9fcdf2", opacity: 0 }, svg);      // flat game-show lift
    const cal = L5.cal(K, svg, 22);
    const { profit, cash, GS } = L5.strip(K, svg, { stage: 4 });

    // ---- set: Infotech (left-centre, Priya in a window), the stall (tiny), Meera (small), the Bank (right-centre)
    const bld = K.infotechBuilding(svg, 860, GY, 0.8, {});
    const WI = 5, [wx, wy] = bld.windowPos(WI);
    const win = bld.windowAnchor(WI);
    const pr = K.priya(win, 0, bld.bustY(0.4), 0.4, { expr: "happy" });
    const stall = K.stall(svg, 1130, GY, 0.45, {});
    const meera = K.meera(svg, 1240, GY, 0.5, { expr: "happy" });
    const bank = L5.bank(K, svg, 1530, GY, 0.8);
    const BDOOR = [1530, GY - 130 * 0.8];
    // phone medallion at the window + the UPI card
    const ph = L5.hide(L5.node(K, svg, wx + 95, wy - 78)); K.medallion(ph, 0, 0, 36, "smartphone");
    const upi = L5.hide(L5.node(K, svg, wx + 250, wy - 190));
    K.tex(K.shadow(upi, 1), K.cutRect(-130, -50, 260, 100, 1.6, 20), "pat-paper");
    K.medallion(upi, -86, 0, 30, "indian-rupee", C.leaf);
    K.text(upi, 38, 4, "₹4,000", { size: 52, weight: 800 });
    // the `16` callback (earned back then): a calendar disc + tumblers ticked
    const back = L5.hide(L5.node(K, svg, 1235, 520));
    K.tex(K.shadow(back, 2), K.cutRect(-170, -88, 340, 176, 2, 24), "pat-paper");
    K.paper(back, K.cutEll(-96, 0, 44, 44, 1), C.saffron); K.text(back, -96, 4, "16", { size: 50, weight: 800 });
    const trow = L5.tumblerRow(K, back, 50, 38, 0.8, 3, 52);
    K.medallion(back, 116, -40, 26, "check");
    // scene-level chips / flags
    const flagAt = (x, y) => {
      const n = L5.hide(L5.node(K, svg, x, y));
      K.tex(K.shadow(n, 1), K.cutRect(-96, -34, 192, 68, 1.4, 18), "pat-paper"); K.qmark(n, 0, 14, 1.0, C.saffron);
      return n;
    };
    const fP = flagAt(profit.x, profit.y + 122 * GS), fC = flagAt(cash.x, cash.y + 122 * GS);
    const pm = K.pauseMedallion(svg, 1185, 330, 0.55, { hidden: true });
    const dec = L5.chip(K, svg, 0, 0, "−₹4,000", { size: 44, bg: C.coral });
    const H = L5.hud(K, svg, tl, { stage: 4 });
    const jInf = H.jarPt("inf"), jBank = H.jarPt("bank");
    gsap.set(dec, { x: jInf[0], y: 455 });

    // ======================================================================================= timeline
    meera.blinks(tl, T0 + 1.0, sc.end, 3.3); pr.blinks(tl, T0 + 1.5, sc.end, 3.7);
    // "April twenty-fifth." — the calendar slides 22 → 25
    cal.tickTo(tl, cue("s08a", "@twentyfifth") - 0.1, 25, { dur: 0.5 });
    // "Infotech pays four thousand rupees of its tab, by UPI." — Priya taps her phone; chime; the coin stream arcs into the Bank
    const tInf = cue("s08a", "@infotech"), tUpi = cue("s08a", "@upi");
    pr.look(tl, tInf, 0, 3);
    L5.drop(tl, K, ph, tInf + 0.5, { dur: 0.3 });
    pr.arm(tl, cue("s08a", "@tab") - 0.2, "R", 70, 60, 0.25); pr.arm(tl, cue("s08a", "@tab") + 0.15, "R", 50, 80, 0.12);
    L5.drop(tl, K, upi, tUpi, { dur: 0.35 }); L5.lift(tl, K, upi, tUpi + 1.4);
    K.pulseNode(tl, ph, tUpi, 1.15);
    L5.coinHop(tl, K, svg, [wx + 110, wy - 60], [BDOOR[0], BDOOR[1] - 20], tUpi + 0.2, { n: 6, dur: 1.0, step: 0.14, r: 14, lift: 190 });
    bank.doorTo(tl, tUpi + 0.4, 0.2, 0.3); bank.bow(tl, tUpi + 1.2); bank.doorTo(tl, tUpi + 1.7, 1, 0.4);
    pr.expr(tl, tUpi + 0.3, "grin"); meera.look(tl, tUpi, 6, -2);
    // "Profit? Cash?" — paper `?` flags drop over both tickers; the countdown ring starts when the narration stops
    const tP = cue("s08a", "@profit"), tCa = cue("s08a", "@cash"), tCd = segEnd("s08a");
    tl.to(tint, { opacity: 0.35, duration: 0.4, ease: "power1.out" }, tP - 0.2);
    L5.drop(tl, K, fP, tP); L5.drop(tl, K, fC, tCa);
    pm.enter(tl, tCd - 0.05); pm.countdown(tl, tCd, { dur: 3.2 });
    meera.expr(tl, tCd, "thinking"); meera.look(tl, tCd, 6, -6);
    // ---------------------------------------------------------------- reveal (s08b)
    const tRev = segStart("s08b");
    pm.exit(tl, tRev - 0.15);
    tl.to(tint, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, tRev);
    // "Cash goes up by four thousand, straight into the bank."
    const tCash = cue("s08b", "@cash"), tBankW = cue("s08b", "@bank");
    L5.lift(tl, K, fC, tCash - 0.1);
    cash.read(tl, tCash - 0.1, 54000, { dur: 1.0 });
    meera.expr(tl, tCash, "happy").look(tl, tCash, 5, -2);
    const tInto = cue("s08b", "@into");
    cash.sub(tl, tInto, 1, 19000, 0.8);
    L5.coinHop(tl, K, svg, [BDOOR[0], BDOOR[1] - 10], [jBank[0], jBank[1] + 10], tInto, { n: 3, dur: 0.8, r: 7, lift: 120 });
    H.jars.bank.fill(tl, tInto + 0.9, 0.45);
    // "Profit doesn't move." — the Profit flag lifts and the `=` tag drops
    const tProf = cue("s08b", "@profit");
    L5.lift(tl, K, fP, tProf - 0.1); profit.eq(tl, cue("s08b", "@move"));
    // "Meera earned that money back on April sixteenth." — the `16` callback card (tumblers ticked)
    const tMe = cue("s08b", "@meera"), tSix = cue("s08b", "@sixteenth");
    L5.drop(tl, K, back, tMe - 0.1);
    trow.drink(tl, tSix - 0.1, 0.12);
    L5.lift(tl, K, back, cue("s08b", "@collecting"));
    // "Today she's only collecting it. The receivable shrinks, and the bank grows." — the Infotech jar in the HUD loses coins
    const tSh = cue("s08b", "@shrinks"), tGr = cue("s08b", "@grows");
    meera.arm(tl, cue("s08b", "@collecting") - 0.2, "R", 60, 40, 0.3); meera.arm(tl, tSh, "R", 12, 8, 0.4);
    L5.coinHop(tl, K, svg, jInf, jBank, tSh - 0.1, { n: 3, dur: 0.6, r: 7, lift: 40 });
    H.jars.inf.fill(tl, tSh, 0.3);
    L5.drop(tl, K, dec, tSh);
    H.jars.bank.pulse(tl, tGr); H.rig.pulseTotal(tl, tGr, "L");
    L5.lift(tl, K, dec, sc.end - 0.9);
    L5.allow(svg);
  };
})();
