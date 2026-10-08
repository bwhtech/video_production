// s03 — Building the sheet (worked). Khata's open pages become the trial balance (K.trialSheet): 19 little account books wait on a shelf above it, each hands over ONE number
// (its balance) into the left (Debit, blue) or right (Credit, orange) column. Worked four (Cash · Capital · Equipment · Sales) then a montage of the rest; "one to watch": Accumulated
// depreciation sits on the RIGHT (the cart's scuff sticker flies from the Equipment row, a "−" links the two). Totals count together to ₹1,36,000 = ₹1,36,000; the sheet tips and settles level.
// Out: default torn-paper wipe into s04. (Calendar strip omitted on purpose: the 12-row sheet fills the frame — type floor 34 px.)
(function () {
  // [account, amount, side, shelf icon]  — order = the final sheet's row order per side
  const TB = [
    ["Cash", 50700, "dr", "banknote"], ["Bank", 11000, "dr", "landmark"], ["Infotech", 6000, "dr", "store"], ["Stock", 4000, "dr", "leaf"],
    ["Equipment", 36000, "dr", "shopping-cart"], ["Drawings", 3000, "dr", "wallet"], ["Rent", 5000, "dr", "key"], ["Salary", 8000, "dr", "user"],
    ["Interest", 300, "dr", "percent"], ["Electricity", 1000, "dr", "zap"], ["Cost of supplies used", 10000, "dr", "package"], ["Depreciation", 1000, "dr", "trending-down"],
    ["Capital", 50000, "cr", "hand-coins"], ["Loan from Ravi Mama", 27000, "cr", "handshake"], ["Gopal Dairy", 3000, "cr", "milk"], ["Advance from customer", 4000, "cr", "calendar-check"],
    ["Electricity payable", 1000, "cr", "zap"], ["Accumulated depreciation", 1000, "cr", "clock"], ["Sales", 50000, "cr", "trending-up"],
  ];
  window.L11 = window.L11 || {};
  window.L11.TB = TB;

  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.sky, 1100);                                   // report beat = --scene-sky, full-bleed (no table: the sheet is the table)
    const SX = 960, SY = 1072, SS = 0.88;
    const hold = K.g(svg, {});
    const sheet = K.trialSheet(hold, SX, SY, SS, { hidden: true });
    const shelf = K.smallBookShelf(svg, 960, 192, 1, {
      books: TB.map(([a, , side, ic], i) => ({ icon: ic, name: a, col: [C.dr, C.cr, C.teal, C.coral, C.saffron, C.violet, C.leaf, C.navy][i % 8] })),
      tiers: [19], w: 1720, bookW: 56, bookH: 84, tierGap: 112, hidden: true,
    });
    const bi = (name) => TB.findIndex((r) => r[0] === name);
    const rowIx = (name) => { const r = TB[bi(name)]; return TB.filter((q) => q[2] === r[2]).findIndex((q) => q[0] === name); };
    const add = (t, name, o = {}) => { const [a, amt, side] = TB[bi(name)]; return sheet.addRow(tl, t, side, { account: a, amount: amt, row: rowIx(name), ...o }); };

    // header strips (for the "left / right" flashes): parent-space centres
    const hdr = (sd) => { const p = sheet.pages[sd]; return { x: SX + (p.x0 + 350) * SS, y: SY + (p.y0 + 36) * SS }; };
    const flashHdr = (sd, t) => {
      const h = hdr(sd), n = K.g(svg, { opacity: 0 });
      K.paper(n, K.cutRect(h.x - 350 * SS, h.y - 30 * SS, 700 * SS, 60 * SS, 1, 20), C.gold, { opacity: 0.8 });
      n.setAttribute("data-layout-allow-overlap", "true");
      tl.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "power2.out", immediateRender: false }, t);
      tl.to(n, { opacity: 0, duration: 0.35, ease: "power2.in" }, t + 0.5);
    };
    // the one balance chip that rises out of a pulled book
    const chip = L.node(svg, 0, 0); L.hide(chip);
    const chipTk = K.ticker(chip, 0, 0, 1, { value: 50700, size: 44, chip: true, w: 230, h: 76, edge: C.dr });

    const khata = K.khataRig(svg, 1830, 1070, 0.36, { expr: "awake" });
    const stPos = K.g(svg, {}), sticker = K.g(stPos, {}); L.hide(sticker); K.cartSticker(sticker, 0, 0, 0.55);
    K.el("path", { d: "M-18,10 L-4,4 L-12,16 L2,12", fill: "none", stroke: C.coral, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, sticker);   // the scuff
    const link = K.g(svg, { opacity: 0 }); link.setAttribute("data-layout-allow-overlap", "true");
    const nameChip = L.node(svg, 960, 238); L.hide(nameChip);
    K.paper(K.shadow(nameChip, 2), K.cutRect(-190, -38, 380, 76, 1.6, 22), C.navy);
    K.text(nameChip, 0, 3, "Trial balance", { size: 48, weight: 800, color: C.white });
    L.allow(svg);

    // ======================================================================================= timeline
    khata.jitter(tl, T0, sc.end); khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 30);
    // s03a — "तरकीब ये है।" the sheet unfolds, the 19 books wait; one book hands over its balance; left = Debit, right = Credit
    sheet.enter(tl, T0 + 0.3, { dur: 0.45 });
    shelf.enter(tl, T0 + 0.45, { dur: 0.3 });
    shelf.stock(tl, T0 + 0.8, { step: 0.07 });
    const tBook = cue("s03a", "@book");
    shelf.pull(tl, tBook, 0);
    const bp = shelf.bookPos(0); chip.setAttribute("transform", `translate(${bp.x} ${bp.y + 150})`);
    L.drop(tl, chip, cue("s03a", "@balance") - 0.1, { dur: 0.35 }); chipTk.pulse(tl, cue("s03a", "@balance") + 0.2);
    flashHdr("dr", cue("s03a", "@left")); flashHdr("cr", cue("s03a", "@right"));
    L.lift(tl, chip, cue("s03a", "@right") + 0.5, { dur: 0.25 }); shelf.push(tl, cue("s03a", "@right") + 0.5, 0);

    // s03b — the worked four, then the montage, then the one to watch
    const four = [["Cash", "@cash", "@left", 1], ["Capital", "@capital", "@right", 1], ["Equipment", "@equipment", "@left#2", 1], ["Sales", "@sales", "@right#2", 1]];
    four.forEach(([name, aPull, aLand]) => {
      const i = bi(name), tp = cue("s03b", aPull), tl_ = cue("s03b", aLand.replace("#2", ""), aLand.endsWith("#2") ? 2 : 1);
      shelf.pull(tl, tp, i); add(tl_ - 0.05, name); shelf.push(tl, tl_ + 0.2, i);
    });
    // montage: the remaining 14 (not Accumulated depreciation) in one quick cascade, books lighting along the shelf
    const rest = TB.filter(([a]) => !["Cash", "Capital", "Equipment", "Sales", "Accumulated depreciation"].includes(a)).map((r) => r[0]);
    const tR = cue("s03b", "@rest") - 0.05;
    shelf.lightAll(tl, tR, { step: 0.07 });
    rest.forEach((name, k) => add(tR + 0.1 + k * 0.13, name, { dur: 0.22, count: 0.3 }));
    // one to watch — Accumulated depreciation lands in the CREDIT column; the scuff sticker flies from the Equipment row; a "−" links them
    const tW = cue("s03b", "@accumulated");
    const accRow = add(tW - 0.1, "Accumulated depreciation", {});
    accRow.hl(tl, tW + 0.1, { hold: 2.0 });
    const eqP = sheet.cellPos("dr", rowIx("Equipment")), acP = sheet.cellPos("cr", rowIx("Accumulated depreciation"));
    const tS = cue("s03b", "@right", 3);
    stPos.setAttribute("transform", `translate(${eqP.x + 60} ${eqP.y})`);
    L.drop(tl, sticker, tS - 0.3, { dur: 0.3 });
    tl.to(sticker, { x: 1648 - (eqP.x + 60), duration: 0.8, ease: "power2.inOut" }, tS);
    tl.to(sticker, { y: acP.y - eqP.y - 22, duration: 0.8, ease: "power1.inOut" }, tS);
    // "−" link between the two rows (drawn across the spine)
    const mx = SX, my = (eqP.y + acP.y) / 2;
    K.ink(link, [[eqP.x + 260, eqP.y], [mx, my], [acP.x - 260, acP.y]], 5, C.coral);
    const minus = K.g(link, {}); K.paper(K.shadow(minus, 2), K.cutEll(mx, my, 34, 34, 1), C.coral); K.text(minus, mx, my + 2, "−", { size: 56, weight: 800, color: C.white });
    const tA = cue("s03b", "@asset");
    tl.to(link, { opacity: 1, duration: 0.25, ease: "power2.out" }, tA - 0.2);
    tl.to(link, { opacity: 0, duration: 0.3, ease: "power2.in" }, tA + 1.6);
    L.lift(tl, sticker, tA + 1.5, { dur: 0.25 });

    // s03c/d — add up each column; both totals count together and land on the same frame
    const tTot = segEnd("s03c") + 0.2;
    sheet.total(tl, tTot, { dur: 1.3 });
    // s03d — "दोनों match करते हैं!"  equal-totals beat; the sheet tips (≤ 3°) and settles level
    const tM = cue("s03d", "@match");
    sheet.match(tl, tM, { hold: 1.6 });
    tl.to(hold, { rotation: -2.4, svgOrigin: `${SX} ${SY}`, duration: 0.35, ease: "power2.out" }, tM - 0.4);
    tl.to(hold, { rotation: 0, svgOrigin: `${SX} ${SY}`, duration: 0.95, ease: "power2.inOut" }, tM - 0.05);
    khata.expr(tl, tM, "happy"); khata.hop(tl, tM + 0.1, { height: 40 });
    // s03e — the name, then Debit left / Credit right once more
    L.drop(tl, nameChip, cue("s03e", "@trial") - 0.15, { dur: 0.4 });
    flashHdr("dr", cue("s03e", "@left")); flashHdr("cr", cue("s03e", "@right"));
    khata.hop(tl, cue("s03e", "@test"), { height: 36 });
  };
})();
