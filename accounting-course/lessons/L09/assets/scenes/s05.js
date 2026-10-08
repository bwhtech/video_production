// s05 — Worked: the Cash account, balanced and carried down. The Cash page is already posted (13 rows); rows light as the VO names them, the totals count
// (left 1,24,000; right 73,300), the page tips ≤ 3° toward the heavier left like the corner scale, a `?` weight chip hangs through the gap, becomes 50,700
// and drops onto the right page (Balance c/d ↓), the page levels, both totals read 1,24,000, then 50,700 slides down and across to the left (Balance b/d ↑)
// and the `Debit balance` chip lands. Meera counts the galla — the numbers match.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.saffron, 880);
    const PX = 790, PY = 1030, PS = 0.96;
    const pageWrap = K.g(svg, {});
    const lp = K.ledgerPage(pageWrap, PX, PY, PS, { account: "Cash", icon: "coins", rows: 9 });
    const rig = K.scaleRig(svg, 960, 895, 1.0, { tint: true, L: 0, R: 0, equation: false });
    const pBal = lp.cellPos("cr", 8, "amt"), pBd = lp.cellPos("dr", 10, "amt");
    const chipQ = K.weightChip(svg, 1235, 215, 1, { value: "?", edge: "cr" });
    const chipB = K.weightChip(svg, pBal.x - 40, pBal.y, 1, { value: 50700, edge: "cr", hidden: true });
    const m = K.meera(svg, 280, 1015, 1.0, { expr: "happy" });
    const galla = K.galla(svg, 640, 905, 1.15, { open: true });
    const gTick = K.ticker(svg, 640, 700, 1, { value: 0, size: 80, chip: true, w: 380, h: 120, edge: C.cr, hidden: true });
    const noteN = K.g(m.handAnchor("R"), {}); L9.hide(noteN);
    [-1, 0, 1].forEach((k) => K.note(noteN, k * 14, -22 + Math.abs(k) * 4, 70, 38, k * 14));
    tl.set(m.g, { autoAlpha: 0 }, 0); tl.set(galla.g, { autoAlpha: 0 }, 0);
    L9.allow(svg);

    // ---- the 13 posted rows (instant at the scene start)
    const LEFT = [["Apr 1", "Capital", 50000], ["Apr 1", "Loan from Ravi Mama", 30000], ["Apr 15", "Sales", 18000], ["Apr 22", "Advance from customer", 4000], ["Apr 30", "Sales", 22000]];
    const RIGHT = [["Apr 2", "Equipment", 36000], ["Apr 2", "Stock", 6000], ["Apr 5", "Rent", 5000], ["Apr 15", "Bank", 15000], ["Apr 20", "Gopal Dairy", 5000],
      ["Apr 30", "Loan from Ravi Mama", 3000], ["Apr 30", "Interest", 300], ["Apr 30", "Drawings", 3000]];
    const rl = LEFT.map(([date, other, amount], i) => lp.post(tl, T0 + 0.05 + i * 0.03, "dr", { date, other, amount, count: 0.05 }));
    const rr = RIGHT.map(([date, other, amount], i) => lp.post(tl, T0 + 0.05 + i * 0.03, "cr", { date, other, amount, count: 0.05 }));
    rig.hud(tl, T0, true, { dur: 0.01, text: 36, top: 24, right: 24 });
    rig.enter(tl, T0 + 0.1);

    // ======================================================================================= s05a — what came in
    const hl = (row, t, hold = 1.0) => row.hl(tl, t, { hold });
    const tLeft = cue("s05a", "@left");
    hl(rl[0], cue("s05a", "@fifty") - 0.1); hl(rl[1], cue("s05a", "@thirty") - 0.1);
    hl(rl[2], cue("s05a", "@eighteen") - 0.1); hl(rl[4], cue("s05a", "@twenty-two") - 0.1); hl(rl[3], cue("s05a", "@advance") - 0.3);
    const tTot = cue("s05a", "@total");
    const tot = lp.total(tl, tTot, { row: 9, dr: 124000, cr: 0 });
    tl.set(tot.cr.body, { autoAlpha: 0 }, tTot + 0.6);
    rig.setTotals(tl, tTot + 0.3, 124000, undefined, { dur: 0.7 });
    rig.tint(tl, tTot + 0.3, "L");

    // ======================================================================================= s05b — what went out
    const rightHits = [["@cart", 0], ["@stock", 1], ["@rent", 2], ["@bank", 3], ["@gopal", 4], ["@loan", 5], ["@interest", 6], ["@drawings", 7]];
    rightHits.forEach(([w, i]) => hl(rr[i], cue("s05b", w) - 0.05, 0.9));
    const tTotR = cue("s05b", "@total");
    tl.to(tot.cr.body, { autoAlpha: 1, duration: 0.2 }, tTotR);
    tot.cr.to(tl, tTotR, 73300, 1.1);
    rig.setTotals(tl, tTotR, undefined, 73300, { dur: 1.1 }); rig.tint(tl, tTotR, "R");
    // "The left side is heavier." — the page tips toward it (smooth, ≤ 3°); the corner scale mirrors it
    const tHeavy = cue("s05b", "@heavier") - 0.2;
    tl.to(pageWrap, { rotation: -2.4, svgOrigin: "790 640", duration: 0.9, ease: "power2.out" }, tHeavy);
    rig.tilt(tl, tHeavy, 4);
    // "So how much cash is left?" — the `?` weight chip hangs over the right page through the gap
    chipQ.enter(tl, cue("s05b", "@left", 2) - 0.2);

    // ======================================================================================= s05c — balance c/d, b/d
    const tRup = cue("s05c", "@rupees");
    chipQ.reveal(tl, segStart("s05c") + 0.1, 50700);
    const tLevel = cue("s05c", "@level");
    // the chip drops onto the right page's next row; the page levels in sync
    const dropT = tLevel - 0.5;
    tl.to(chipQ.body, { x: pBal.x - 1235 - 40, y: pBal.y - 215, duration: 0.6, ease: "power2.in" }, dropT);
    const rBal = lp.balance(tl, dropT + 0.6, { cd: 50700, side: "cr", date: "Apr 30" });
    tl.to(chipQ.body, { autoAlpha: 0, duration: 0.15 }, dropT + 0.62);
    tl.to(pageWrap, { rotation: 0, svgOrigin: "790 640", duration: 0.7, ease: "power2.inOut" }, dropT + 0.6);
    rig.settle(tl, dropT + 0.6, { dur: 0.8 });
    tot.cr.to(tl, dropT + 0.7, 124000, 0.7); rig.setTotals(tl, dropT + 0.7, undefined, 124000, { dur: 0.7 });
    tot.dr.pulse(tl, dropT + 1.4);
    // both totals read 1,24,000 — flash them
    const tLak = cue("s05c", "@lakh");
    tot.dr.pulse(tl, tLak); tot.cr.pulse(tl, tLak + 0.12);
    // "that's the balance carried down"
    hl(rBal, cue("s05c", "@carried") - 0.1, 1.4);
    // "then it drops to the heavier side, to start May" — the chip slides down past the double rule and across to the left page
    const tDrop = cue("s05c", "@drops");
    chipB.enter(tl, tDrop - 0.4);
    tl.to(chipB.body, { y: pBd.y - pBal.y, duration: 0.55, ease: "power2.inOut" }, tDrop);
    tl.to(chipB.body, { x: pBd.x - (pBal.x - 40) - 100, duration: 0.7, ease: "power2.inOut" }, tDrop + 0.5);
    const rBd = lp.broughtDown(tl, tDrop + 1.3, { amount: 50700, side: "dr", date: "May 1" });
    tl.to(chipB.body, { autoAlpha: 0, duration: 0.15 }, tDrop + 1.32);
    // the left page is the heavier side → `Debit balance`
    lp.sideChip(tl, cue("s05c", "@debit") - 0.1, "debit");
    hl(rBd, cue("s05c", "@belongs"), 1.2);

    // ======================================================================================= s05d — Meera counts the galla
    const tCnt = cue("s05d", "@counts");
    const SC = 0.62, DX = 470;
    tl.to(pageWrap, { scale: SC, x: DX, svgOrigin: `${PX} ${PY}`, duration: 0.9, ease: "power2.inOut" }, tCnt - 0.5);
    tl.fromTo(m.g, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, immediateRender: false }, tCnt - 0.4);
    tl.fromTo(galla.g, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, immediateRender: false }, tCnt - 0.4);
    tl.to(noteN, { opacity: 1, duration: 0.2 }, tCnt);
    m.look(tl, tCnt, 6, 8);
    // counting notes: small stepped riffles of the right hand
    for (let k = 0; k < 7; k++) m.arm(tl, tCnt + 0.3 + k * 0.22, "R", 55 + (k % 2 ? 6 : -6), 80 + (k % 2 ? -10 : 8), 0.12);
    const tFifty = cue("s05d", "@fifty");
    gTick.enter(tl, tFifty - 0.3); gTick.to(tl, tFifty - 0.1, 50700, 1.4);
    m.expr(tl, tFifty + 0.3, "joy");
    // the galla total slides next to the ledger's 50,700 (final world position of the b/d amount cell after the page shrank)
    const wx = (p) => PX + DX + SC * (p.x - PX), wy = (p) => PY + SC * (p.y - PY);
    const tLed = cue("s05d", "@ledger"), tAgree = cue("s05d", "@agree");
    const tx = wx({ x: PX - 776 * PS }) - 210, ty = wy(pBd);
    tl.to(gTick.body, { x: tx - 640, y: ty - 700, duration: 0.9, ease: "power2.inOut" }, tLed - 0.3);
    // "they match" — a small nudge toward each other, then settle
    tl.to(gTick.body, { x: tx - 640 + 14, duration: 0.18, ease: "power2.out" }, tAgree);
    tl.to(gTick.body, { x: tx - 640, duration: 0.3, ease: "power2.inOut" }, tAgree + 0.2);
    gTick.pulse(tl, tAgree + 0.1, 1.08);
    m.arm(tl, tLed, "R", 12, 8, 0.3);
  };
})();
