// s06 — The whole cycle. A loop of seven stations (transaction → Dr/Cr pages → journal → ledger → adjustments → trial balance → movie + photo),
// lit in turn by a travelling coin on the VO words; L1's "Record. Sort. Summarise." chips drop in at the centre of the loop.
// Out: default torn-paper wipe into s07.
(function () {
  Object.assign(window.ICONS, {
    "pencil-line": '<path d="M13 21h8" /> <path d="m15 5 4 4" /> <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />',
    "layers": '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /> <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /> <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />',
    "sigma": '<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />',
  });
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start;
    L.stage(svg, C.violet, 1100);
    const LX = 960, LY = 560;
    const loop = K.cycleLoop(svg, LX, LY, 1, { n: 7, rx: 770, ry: 320, icons: [1, 2, 3, 4, 5, 6, 7], badgeR: 40, undrawn: true });
    const pos = (i) => loop.at(i);
    const CARD_W = 200, CARD_H = 170;
    // one cream card per station, drawn on top of the numbered badge
    const mkSt = (i, label) => {
      const p = pos(i), n = L.node(svg, p.x, p.y, 1.22);
      K.tex(K.shadow(n, 2), K.cutRect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 2, 24), "pat-paper");
      const art = K.g(n, {});
      let lab = null;
      if (label) lab = L.chip(n, 0, CARD_H / 2 + 34, label, { size: 34, bg: C.cream, hidden: false, h: 52 });
      L.hide(n);
      return { n, art, lab, ring: L.ringRect(n, -CARD_W / 2 - 6, -CARD_H / 2 - 6, CARD_W + 12, CARD_H + 12) };
    };
    const S = [mkSt(0), mkSt(1), mkSt(2, "Journal"), mkSt(3, "Ledger"), mkSt(4, "Adjustments"), mkSt(5), mkSt(6)];
    // 0 — a slip + two jars
    K.slip(S[0].art, -42, -4, 0.95, -5, "coffee");
    const jarCol = (x, col) => { const j = K.g(S[0].art, {}); K.paper(K.shadow(j, 1), K.cutRect(x - 20, -28, 40, 58, 1.2, 14), col); K.paper(j, K.cutRect(x - 24, -36, 48, 12, 0.6, 12), C.cream); return j; };
    const jL = jarCol(34, C.dr), jR = jarCol(80, C.cr);
    const ring0 = [L.ring(S[0].art, 34, 0, 34, 44), L.ring(S[0].art, 80, 0, 34, 44)];
    // 1 — Khata open, pages tint blue / orange
    const kh = K.khataRig(S[1].art, 0, 52, 0.19, { open: true, expr: "awake" });
    const dr = L.chip(S[1].art, -62, -50, "Dr", { size: 34, bg: C.dr, hidden: false, w: 66, h: 46 }), cr = L.chip(S[1].art, 62, -50, "Cr", { size: 34, bg: C.cr, hidden: false, w: 66, h: 46 });
    L.hide(dr); L.hide(cr);
    // 2 — mini journal card
    const jc = S[2].art;
    K.tex(K.shadow(jc, 1), K.cutRect(-78, -52, 156, 104, 1.2, 18), "pat-paper");
    K.paper(jc, K.cutRect(-78, -52, 156, 22, 1, 16), C.red);
    [[-10, C.dr, 84], [24, C.cr, 70]].forEach(([y, col, w], k) => { K.paper(jc, K.cutRect(-62, y - 7, w, 14, 0.6, 12), col); K.ink(jc, [[-62 + w + 10, y], [66, y]], 3, "#a39684"); });
    // 3 — a stack of account books
    [[-58, "coins"], [0, "landmark"], [58, "user"]].forEach(([x, ic], k) => K.smallBook(S[3].art, x, 40, 50, 100, ic, 0));
    // 4 — calendar 30 Apr + cart (−₹1,000) + zap bill
    const cal = K.calendarPage(S[4].art, -48, -2, 0.32, { month: "April", day: 30 });
    const cartN = L.node(S[4].art, 34, -34); K.cartSticker(cartN, 0, 0, 0.5); L.hide(cartN);
    const chipC = L.chip(S[4].art, 54, 8, "−₹1,000", { size: 34, bg: C.coral, hidden: false, h: 44, w: 130 }); L.hide(chipC);
    const zapN = L.node(S[4].art, 54, 54); K.medallion(zapN, 0, 0, 26, "zap"); L.hide(zapN);
    // 5 — trial balance: two columns, level
    const tb = S[5].art;
    K.paper(K.shadow(tb, 1), K.cutRect(-76, -50, 66, 100, 1, 14), C.dr); K.paper(K.shadow(tb, 1), K.cutRect(10, -50, 66, 100, 1, 14), C.cr);
    [-22, 6, 34].forEach((y) => { K.ink(tb, [[-66, y], [-20, y]], 3, C.cream); K.ink(tb, [[20, y], [66, y]], 3, C.cream); });
    K.paper(K.shadow(tb, 1), K.cutEll(0, 0, 18, 18, 0.8), C.cream); K.paper(tb, K.cutRect(-9, -7, 18, 4, 0.2, 10), C.ink); K.paper(tb, K.cutRect(-9, 3, 18, 4, 0.2, 10), C.ink);
    // 6 — film strip + polaroid
    K.filmStrip(S[6].art, 0, -44, 176, 52, ["coins", "leaf", "key"], 0, { resultFrames: 2 });
    const pol = L.node(S[6].art, 0, 38); K.polaroid(pol, 0, 0, 90, 80, 0, { twoColumn: true, date: "30 Apr" }); L.hide(pol);

    // centre chips: Record · Sort · Summarise
    const mkStep = (y, ic, word, col) => {
      const n = L.node(svg, LX, y); L.hide(n);
      K.paper(K.shadow(n, 1), K.cutRect(-250, -50, 500, 100, 1.6, 22), C.cream);
      K.medallion(n, -190, 0, 38, ic, col);
      K.text(n, 40, 4, word, { size: 62, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
      return n;
    };
    const stepChips = [mkStep(440, "pencil-line", "Record", C.saffron), mkStep(560, "layers", "Sort", C.sky), mkStep(680, "sigma", "Summarise", C.violet)];
    const m = K.meera(svg, 90, 1050, 0.46, { expr: "happy" });
    const kk = K.khataRig(svg, 1830, 1050, 0.46, { expr: "awake" });
    L.allow(svg);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); kk.blink(tl, T0 + 2.0); kk.blink(tl, T0 + 20);
    const cu = (w, n) => cue("s06", w, n);
    const tStep = cu("@step"), tTr = cu("@transaction"), tTwo = cu("@two"), tDeb = cu("@debit"), tLeft = cu("@left"), tCr = cu("@credit"), tRt = cu("@right"),
      tJ = cu("@journal"), tLed = cu("@ledger"), tAdj = cu("@adjusted"), tUsed = cu("@used"), tUnp = cu("@unpaid"), tTrial = cu("@trial"), tMatch = cu("@match"),
      tMovie = cu("@movie"), tPhoto = cu("@photo"), tRec = cu("@record"), tSort = cu("@sort"), tSum = cu("@summarise"), tCyc = cu("@cycle");
    loop.draw(tl, tStep - 0.4, { dur: 1.6 });
    // station 0
    L.drop(tl, S[0].n, tTr); K.pulseNode(tl, S[0].n, tTr + 0.4, 1.04);
    ring0.forEach((r) => r.flash(tl, tTwo + 0.1, 1.0));
    K.pulseNode(tl, jL, tTwo + 0.1, 1.1); K.pulseNode(tl, jR, tTwo + 0.2, 1.1);
    // coin 0 → 1 ("Debit left, credit right")
    loop.token(tl, tDeb - 1.0, 0, 1, { dur: 0.9 });
    L.drop(tl, S[1].n, tDeb - 0.1);
    kh.pageTint(tl, tLeft, "left"); L.drop(tl, dr, tLeft + 0.1);
    kh.pageTint(tl, tCr + 0.1, "right"); L.drop(tl, cr, tCr + 0.2);
    kh.expr(tl, tRt, "happy");
    // coin 1 → 2 (journal)
    loop.token(tl, tJ - 1.0, 1, 2, { dur: 0.8 });
    L.drop(tl, S[2].n, tJ - 0.1); S[2].ring.flash(tl, tJ + 0.2, 0.9);
    // coin 2 → 3 (ledger)
    loop.token(tl, tLed - 0.9, 2, 3, { dur: 0.7 });
    L.drop(tl, S[3].n, tLed - 0.15); S[3].ring.flash(tl, tLed + 0.2, 0.9);
    // coin 3 → 4 (adjustments: used up, still unpaid)
    loop.token(tl, tAdj - 0.8, 3, 4, { dur: 0.8 });
    L.drop(tl, S[4].n, tAdj + 0.0);
    L.drop(tl, cartN, tUsed); L.drop(tl, chipC, tUsed + 0.2);
    L.drop(tl, zapN, tUnp);
    // coin 4 → 5 (trial balance matches)
    loop.token(tl, tTrial - 1.0, 4, 5, { dur: 0.9 });
    L.drop(tl, S[5].n, tTrial - 0.1);
    S[5].ring.flash(tl, tMatch, 1.0);
    // coin 5 → 6 (the movie, and the photo)
    loop.token(tl, tMovie - 1.1, 5, 6, { dur: 1.0 });
    L.drop(tl, S[6].n, tMovie - 0.1);
    L.drop(tl, pol, tPhoto);
    S[6].ring.flash(tl, tPhoto + 0.1, 1.0);
    // Record. Sort. Summarise.
    L.drop(tl, stepChips[0], tRec - 0.05); L.drop(tl, stepChips[1], tSort - 0.05); L.drop(tl, stepChips[2], tSum - 0.05);
    K.pulseNode(tl, stepChips[2], tSum + 0.3, 1.06);
    // coin 6 → 0: the loop closes — every station lights
    loop.token(tl, tCyc - 1.2, 6, 0, { dur: 1.1, hide: true });
    S.forEach((s, i) => s.ring.flash(tl, tCyc + 0.1 + i * 0.12, 0.6));
    m.expr(tl, tCyc, "joy"); kk.hop(tl, tCyc + 0.2); kk.expr(tl, tCyc, "happy");
    L.spark(svg, tl, 960, 330, tCyc + 0.9, 36);
  };
})();
