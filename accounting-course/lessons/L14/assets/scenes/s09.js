// s09 — Final checkpoint: Aman's full month. His 14-strip trial balance fills the frame (Debit blue / Credit orange, ≥ 34 px) and sits DEAD STILL for the whole pause
// (pause + worksheet medallions sit above the sheet, never on a row). Then the revenue/expense strips lift out into the 9-frame film strip (P&L: 5 lines + Gross + Net)
// and the rest flutters into the two-column polaroid (Balance Sheet, 30 Apr); Net profit glides into the equity line; the mini scale settles level — the course's last balance.
// Out: default torn-paper wipe into s10 (night colour).
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start, cu = (seg, w, n) => cue(seg, w, n);
    L.stage(svg, C.saffron, 880);
    const SX = 960, SY = 1010, SS = 0.96;               // trial sheet: bottom-centre, scale

    // ================================================== phase 1 — Aman + his samosa cart, his ₹54,000 | ₹54,000 card
    const P1 = L.node(svg, 0, 0);
    const cart = K.samosaCart(P1, 1130, 985, 1.2, {});
    const aman = K.aman(P1, 560, 1000, 0.95, { expr: "happy" });
    const mini = L.node(P1, 800, 560); L.hide(mini);
    L.card(mini, 460, 150);
    L.chip(mini, -108, 0, "₹54,000", { size: 42, bg: C.dr, hidden: false, w: 200, h: 80 }); L.chip(mini, 108, 0, "₹54,000", { size: 42, bg: C.cr, hidden: false, w: 200, h: 80 });

    // ================================================== the full trial balance (8 Dr + 6 Cr rows)
    const ts = K.trialSheet(svg, SX, SY, SS, { rows: 8, hidden: true });
    const DR = [["Cash", 26000, "coins"], ["Ingredients stock", 500, "leaf"], ["Cart & fryer", 18000, "shopping-cart"], ["Drawings", 1500, "wallet"], ["Stall rent", 2000, "key"], ["Helper wages", 3000, "user"], ["Ingredients used", 2500, "leaf"], ["Depreciation", 500]];
    const CR = [["Accumulated depreciation", 500], ["Bank loan", 10000, "landmark"], ["Sharma Kirana", 1000], ["Advance from customer", 1000, "calendar-check"], ["Capital", 20000], ["Sales", 21500, "coins"]];
    const fillList = [];
    for (let i = 0; i < 8; i++) { fillList.push({ side: "dr", account: DR[i][0], amount: DR[i][1], icon: DR[i][2] }); if (CR[i]) fillList.push({ side: "cr", account: CR[i][0], amount: CR[i][1], icon: CR[i][2] }); }
    // pause + worksheet medallions (above the sheet)
    const pm = K.pauseMedallion(svg, 860, 190, 0.5, { hidden: true });
    const ws = L.node(svg, 1050, 190); L.hide(ws);
    K.paper(K.shadow(ws, 2), K.cutEll(0, 0, 76, 76, 1.4), C.cream); K.medallion(ws, 0, 0, 58, "file-text", C.sky);

    // ================================================== phase 2 — the film strip (P&L)
    const FX = 960, FY = 215, FW = 1700, FH = 240;
    const film = L.node(svg, 0, 0); L.hide(film);
    K.filmStrip(film, FX, FY, FW, FH, [null, null, null, null, null, null, null], 0, { resultFrames: 2 });
    const cw = (FW - 30) / 9, cellX = (i) => FX - FW / 2 + 15 + i * cw + cw / 2;
    const cells = [];
    const mkCell = (i, icon, label, tag) => {
      const n = L.node(svg, cellX(i), FY); L.hide(n);
      if (icon) K.medallion(n, 0, -50, 30, icon);
      if (label) K.text(n, 0, -62, label, { size: 36, weight: 800, color: C.ink }).setAttribute("data-layout-allow-overlap", "true");
      const tk = L.tick(n, 0, 44, { size: 38, chip: false, w: 170, h: 60 });
      cells[i] = { n, tk };
      return cells[i];
    };
    mkCell(0, "coins"); mkCell(1, "leaf"); mkCell(2, "key"); mkCell(3, "user"); mkCell(4, "trending-down"); mkCell(7, null, "Gross"); mkCell(8, null, "Net");
    const emptyMark = [5, 6];

    // ================================================== phase 3 — the polaroid (Balance Sheet)
    const PXc = 640, PYc = 700, PW = 1200, PH = 700;
    const pol = L.node(svg, 0, 0); L.hide(pol);
    const polG = K.polaroid(pol, PXc, PYc, PW, PH, 0, { twoColumn: true, date: "30 Apr" });
    const colL = polG.cols.L, colR = polG.cols.R;
    const rowFor = (col, y) => ({ x0: PXc + col.x + 16, x1: PXc + col.x + col.w - 16, y: PYc + col.y + y });
    const rowNode = (col, i, label, o = {}) => {
      const r = rowFor(col, 34 + i * 74), n = L.node(svg, 0, 0); L.hide(n);
      K.text(n, r.x0, r.y, label, { size: o.size || 36, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      const tk = L.tick(n, r.x1, r.y, { size: 38, chip: false, anchor: "end", w: 200, h: 60 });
      return { n, tk, r };
    };
    const aL = [rowNode(colL, 0, "Cart & fryer"), rowNode(colL, 1, "Ingredients stock"), rowNode(colL, 2, "Cash")];
    const lessChip = L.chip(svg, aL[0].r.x0 + 305, aL[0].r.y, "−500", { size: 34, bg: C.coral, w: 96, h: 46 });
    const aR = [rowNode(colR, 0, "Bank loan"), rowNode(colR, 1, "Sharma Kirana"), rowNode(colR, 2, "Advance from customer")];
    const eq = rowNode(colR, 3.1, "Equity");
    const eqChips = [["20,000", C.cream], ["+13,500", C.cream], ["−1,500", C.coral]].map(([t, col], i) => L.chip(svg, rowFor(colR, 34 + 4.05 * 74).x0 + 76 + i * 168, rowFor(colR, 34 + 4.05 * 74).y, t, { size: 34, bg: col, w: 150, h: 46 }));
    const totY = PYc + colL.y + 8 + (colL.h - 11) * 0.94 - 34;
    const totL = L.tick(svg, PXc + colL.x + colL.w - 16, totY, { size: 46, chip: false, anchor: "end", w: 220, h: 60, hidden: true });
    const totR = L.tick(svg, PXc + colR.x + colR.w - 16, totY, { size: 46, chip: false, anchor: "end", w: 220, h: 60, hidden: true });
    // Net-profit frame that glides from the film strip into the equity line
    const npFrame = L.node(svg, cellX(8), FY); L.hide(npFrame);
    K.medallion(npFrame, 0, 0, 40, "trending-up");
    // mini scale + Aman (cheers) bottom right
    const sc2 = K.scaleRig.mini(svg, 1500, 1010, 0.52, {});
    sc2.g.setAttribute("opacity", "0");
    const sjar = K.jarRig(sc2.pans.L.g, 0, 0, 0.8, { label: "", contents: "coins", fill: 1, labelHidden: true });
    const stag = K.claimTag(sc2.pans.R.g, 0, 0, 0.9, { face: "customer", size: 54 });
    K.medallion(sc2.slot.g, 0, 0, 50, "indian-rupee");
    const a2h = L.node(svg, 0, 0); L.hide(a2h);
    const aman2 = K.aman(a2h, 1850, 1045, 0.5, { expr: "happy" });
    L.allow(svg);

    // ======================================================================== timeline
    aman.blinks(tl, T0 + 1.0, cu("s09a", "@trial"), 3.1);
    cart.sizzle(tl, T0, cu("s09a", "@trial"));
    L.hide(P1); L.drop(tl, P1, T0 + 0.1);
    // ---- s09a
    const tCh = cu("s09a", "@challenge"), tAm = cu("s09a", "@aman's"), tTrial = cu("s09a", "@trial"), tPause = cu("s09a", "@pause");
    aman.expr(tl, tCh, "joy").hop(tl, tCh + 0.1, { height: 40 });
    aman.point(tl, cu("s09a", "@cart"), "R", 80);
    cart.ring && cart.ring(tl, cu("s09a", "@cart") + 0.2);
    L.drop(tl, mini, tTrial - 0.15);
    L.lift(tl, P1, tTrial + 0.7);
    L.lift(tl, mini, tTrial + 0.7, { dur: 0.35 });
    ts.enter(tl, tTrial + 0.7, { dur: 0.6 });
    const tFilled = ts.fill(tl, tTrial + 1.4, fillList, { step: 0.17 });
    ts.total(tl, tFilled + 0.1);
    ts.match(tl, tFilled + 1.2, { hold: 1.2, exit: true });
    pm.enter(tl, tPause + 0.2); L.drop(tl, ws, tPause + 0.35);
    pm.countdown(tl, segEnd("s09a"), { dur: 3.2 });
    // ---- s09b — "Ready?" the P&L strips lift out into the film strip
    const tReady = cu("s09b", "@ready"), tSales = cu("s09b", "@sales"), tMinus = cu("s09b", "@minus"), tIng = cu("s09b", "@ingredients"), tGross = cu("s09b", "@gross"),
      tRent = cu("s09b", "@rent"), tWages = cu("s09b", "@wages"), tDep = cu("s09b", "@depreciation"), tNet = cu("s09b", "@net"), tThirteen = cu("s09b", "@thirteen");
    L.lift(tl, pm.g, tReady - 0.3); L.lift(tl, ws, tReady - 0.3);
    L.drop(tl, film, tReady);
    tl.to(ts.body, { opacity: 0.35, duration: 0.5, ease: "power2.inOut" }, tReady + 0.1);
    const flyRow = (row, side, cellI, t) => {
      const p = ts.cellPos(side, row.i), tx = cellX(cellI), ty = FY;
      tl.to(row.g, { x: (tx - p.x) / SS, y: (ty - p.y) / SS, scale: 0.55, svgOrigin: `${(p.x - SX) / SS} ${(p.y - SY) / SS}`, duration: 0.7, ease: "power2.inOut" }, t);
      tl.to(row.g, { opacity: 0, duration: 0.2, ease: "power2.in" }, t + 0.55);
    };
    const reveal = (i, t, value) => { L.drop(tl, cells[i].n, t, { dur: 0.3 }); cells[i].tk.enter(tl, t + 0.05); cells[i].tk.to(tl, t + 0.1, value, 0.7); };
    // Sales (Cr row 5) → cell 0, Ingredients used (Dr row 6) → cell 1, then gross, rent (Dr row 4) → 2, wages (Dr 5) → 3, depreciation (Dr 7) → 4, net
    flyRow(ts.rows.cr[5], "cr", 0, tSales - 0.5); reveal(0, tSales + 0.15, 21500);
    flyRow(ts.rows.dr[6], "dr", 1, tIng - 0.3); reveal(1, tIng + 0.4, 2500);
    reveal(7, tGross + 0.05, 19000);
    flyRow(ts.rows.dr[4], "dr", 2, tRent - 0.35); reveal(2, tRent + 0.4, 2000);
    flyRow(ts.rows.dr[5], "dr", 3, tWages - 0.3); reveal(3, tWages + 0.3, 3000);
    flyRow(ts.rows.dr[7], "dr", 4, tDep - 0.35); reveal(4, tDep + 0.35, 500);
    reveal(8, tNet + 0.1, 13500);
    K.pulseNode(tl, cells[7].n, tGross + 0.3, 1.08); K.pulseNode(tl, cells[8].n, tThirteen + 0.2, 1.1);
    aman.expr(tl, tNet, "proud");
    // ---- s09c — the balance sheet photo
    const w = (x, n) => cu("s09c", x, n);
    const tCart = w("@cart"), tEighteen = w("@eighteen"), tLess = w("@less"), tStock = w("@stock"), tCash = w("@cash"), t26 = w("@twenty-six"), tTotal = w("@total"), t44 = w("@forty-four"),
      tBank = w("@bank"), tTen = w("@ten"), tSharma = w("@sharma"), tAdv = w("@advance"), tEq = w("@equity"), t20 = w("@twenty"), t13 = w("@thirteen"), t15 = w("@fifteen"),
      t32 = w("@thirty-two"), t44b = w("@forty-four", 2), tBal = w("@balanced"), tClosed = w("@closed");
    ts.exit(tl, tCart - 0.2);
    L.drop(tl, pol, tCart - 0.1);
    const rowIn = (r, t, v) => { L.drop(tl, r.n, t, { dur: 0.3 }); r.tk.enter(tl, t + 0.05); r.tk.to(tl, t + 0.1, v, 0.7); };
    rowIn(aL[0], tCart + 0.1, 0); aL[0].tk.to(tl, tEighteen, 18000, 0.7);
    L.drop(tl, lessChip, tLess - 0.05); aL[0].tk.to(tl, tLess + 0.25, 17500, 0.6);
    rowIn(aL[1], tStock, 500);
    rowIn(aL[2], tCash, 0); aL[2].tk.to(tl, t26, 26000, 0.8);
    totL.enter(tl, tTotal); totL.to(tl, t44, 44000, 0.9);
    rowIn(aR[0], tBank, 0); aR[0].tk.to(tl, tTen, 10000, 0.7);
    rowIn(aR[1], tSharma, 1000);
    rowIn(aR[2], tAdv, 1000);
    L.drop(tl, eq.n, tEq - 0.05); eq.tk.enter(tl, tEq);
    L.drop(tl, eqChips[0], t20 - 0.05);
    // the Net profit frame glides from the film strip into the equity line
    L.drop(tl, npFrame, t13 - 0.35);
    const ec = rowFor(colR, 34 + 4.05 * 74);
    tl.to(npFrame, { x: ec.x0 + 76 + 168 - cellX(8), y: ec.y - FY, duration: 0.8, ease: "power2.inOut" }, t13 - 0.2);
    L.drop(tl, eqChips[1], t13 + 0.55); tl.to(npFrame, { autoAlpha: 0, duration: 0.2 }, t13 + 0.6);
    L.drop(tl, eqChips[2], t15 - 0.05);
    eq.tk.to(tl, t32, 32000, 0.9);
    totR.enter(tl, t44b - 0.3); totR.to(tl, t44b - 0.2, 44000, 0.9);
    // the last balance: a mini scale settles level — sparkle
    L.drop(tl, sc2.g, t32 - 0.2);
    sc2.tilt(tl, t32, 4, { dur: 0.5 });
    sc2.settle(tl, t44b, { dur: 0.9 });
    sc2.levelFlash(tl, t44b + 1.0);
    L.spark(svg, tl, 1500, 650, t44b + 1.0, 50);
    L.drop(tl, a2h, tBal - 0.3);
    aman2.expr(tl, tBal, "joy"); aman2.pose(tl, tBal + 0.1, { aL: [160, 12], aR: [160, 12], dur: 0.33 }); aman2.hop(tl, tBal + 0.3, { height: 50 });
    L.spark(svg, tl, 1800, 700, tClosed, 36);
  };
})();
