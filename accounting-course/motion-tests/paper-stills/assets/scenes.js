// One signature still per lesson, built from the paper kit. Numbers: course/data/meeras-chai.json.
(function () {
  const K = window.KIT, C = K.C;
  const S = {};
  const night = (r) => { K.wall(r, C.navy); K.table(r, 800); K.paper(r, K.cutRect(-40, 790, 2000, 340, 0, 80), C.navy, { opacity: 0.45 }); };

  // L01 · Why Bother? — night stall, puzzled Meera, Khata holds the two reports
  S.L01 = (r) => {
    night(r);
    K.paper(K.shadow(r, 1), K.cutEll(1760, 150, 70, 70, 2), C.cream);
    K.stringLights(r, -20, 1940, 40, 90, 14);
    K.stall(r, 1520, 905, 0.92, { gallaOpen: false, galla: false });
    K.crate(r, 380, 905, 210, 140);
    const m = K.meera(r, 380, 905, 1.0, { sit: true, expr: "puzzled", aL: [34, 82], aR: [34, 82] });
    K.galla(r, 380, 800, 0.95, { open: true, overflow: true });
    K.qmark(r, 520, 380, 1.7, C.saffron);
    const k = K.khata(r, 1010, 970, 0.66, { armL: 78, armR: 78, lookX: -8, lookY: -6 });
    K.filmStrip(r, k.handL[0] - 40, k.handL[1] - 95, 330, 120, ["coffee", "coins", "calendar"], -7);
    K.label(r, k.handL[0] - 40, k.handL[1] - 200, "Profit & Loss", { size: 40, bg: C.saffron, color: C.white, rot: -4 });
    K.polaroid(r, k.handR[0] + 40, k.handR[1] - 120, 220, 250, 6, (pg, x, y, w, h) => {
      K.medallion(pg, x + w * 0.3, y + h * 0.5, 34, "package");
      K.medallion(pg, x + w * 0.7, y + h * 0.5, 34, "hand-coins");
    });
    K.label(r, k.handR[0] + 50, k.handR[1] - 285, "Balance Sheet", { size: 40, bg: C.sky, color: C.white, rot: 4 });
  };

  // L02 · What You Have, What You Owe — notes fly into the galla with source tags
  S.L02 = (r) => {
    K.wall(r, C.sky); K.table(r, 800);
    K.cloud(r, 240, 120, 0.9); K.cloud(r, 1640, 90, 0.8);
    K.crate(r, 960, 905, 300, 130);
    K.galla(r, 960, 778, 1.8, { open: true, overflow: true });
    K.label(r, 960, 330, "Assets  ₹80,000", { size: 56, bg: C.dr, color: C.white });
    const m = K.meera(r, 410, 905, 1.08, { expr: "happy", aR: [72, 18], aL: [10, 6], lookX: 4 });
    K.bundle(r, m.handR[0] + 40, m.handR[1] - 10, 0.8, -12);
    const rv = K.raviMama(r, 1520, 905, 1.08, { flip: true, expr: "grin", aR: [70, 22], aL: [8, 4] });
    K.bundle(r, rv.handR[0] - 40, rv.handR[1] - 10, 0.8, 12);
    K.umbrella(r, rv.handL[0], rv.handL[1] - 10, 0.85, -8);
    K.slip(r, rv.handR[0] - 30, rv.handR[1] - 140, 0.8, 8, "handshake");
    // tags on the money
    K.faceTag(r, 820, 520, "meera", 1.2, -10);
    K.label(r, 740, 600, "Equity  ₹50,000", { size: 36, bg: C.cr, color: C.white, rot: -6 });
    K.faceTag(r, 1110, 520, "ravi", 1.2, 10);
    K.label(r, 1190, 600, "Liability  ₹30,000", { size: 36, bg: C.cr, color: C.white, rot: 6 });
    K.khata(r, 1800, 1020, 0.5, { open: false, armL: 15, armR: 100, lookX: -10 });
  };

  // L03 · The Scale That Never Tips — A = L + E balanced
  S.L03 = (r) => {
    K.wall(r, C.teal); K.table(r, 820);
    const sc = K.scale(r, 1000, 940, 1.0, { leftTint: C.dr, rightTint: C.cr });
    const [L, R] = sc.pans;
    K.jar(r, L[0] - 100, L[1], 105, 140, { contents: "coins", fill: 1 });
    K.stall(r, L[0] + 10, L[1], 0.26, { noProps: true });
    K.jar(r, L[0] + 112, L[1], 92, 125, { contents: "leaves", fill: 0.7 });
    K.slip(r, R[0] - 80, R[1] - 56, 1.05, -6, "handshake");
    K.faceTag(r, R[0] + 85, R[1] - 46, "meera", 1.4, 4);
    K.label(r, L[0], L[1] + 110, "Assets  ₹88,000", { size: 42, bg: C.dr, color: C.white });
    K.label(r, R[0], R[1] + 110, "Liabilities + Equity  ₹88,000", { size: 38, bg: C.cr, color: C.white });
    K.label(r, 1000, 640, "=", { size: 70, w: 90, h: 90 });
    K.khata(r, 1000, 362, 0.36, { open: false, armL: 95, armR: 95 });
    K.meera(r, 175, 950, 0.95, { expr: "amazed", aL: [20, -95], aR: [20, -95], lookX: 5, lookY: -3 });
  };

  // L04 · Making Money — sales fill the profit pocket, rent drains it
  S.L04 = (r) => {
    K.wall(r, C.leaf); K.table(r, 800);
    K.meera(r, 470, 770, 0.86, { expr: "grin", aR: [78, 10], aL: [20, -40] });
    K.stall(r, 470, 910, 0.95, { galla: false });
    K.priya(r, 900, 910, 0.86, { top: C.violet, lanyard: false, expr: "happy", aL: [60, 20], aR: [12, 6] });
    // two-pocket equity jar
    const jx = 1430;
    K.jar(r, jx, 905, 360, 420, {});
    K.ink(r, [[jx, 500], [jx, 900]], 6, "#9fb8bb");
    for (let i = 0; i < 3; i++) K.coin(r, jx - 90 + (i % 2) * 40, 870 - i * 40, 26, i * 20);
    for (let i = 0; i < 8; i++) K.coin(r, jx + 50 + (i % 3) * 45, 870 - Math.floor(i / 3) * 44 - (i % 2) * 6, 26, i * 25);
    K.label(r, jx - 92, 700, "Capital", { size: 32, bg: C.cr, color: C.white, rot: -3 });
    K.label(r, jx - 92, 752, "₹50,000", { size: 32, rot: -3 });
    K.label(r, jx + 92, 610, "Profit", { size: 36, bg: C.leaf, color: C.white, rot: 3 });
    K.label(r, jx + 92, 666, "₹13,000", { size: 36, rot: 3 });
    K.medallion(r, jx + 92, 540, 30, "sprout", C.white, C.leaf);
    // coins arcing from the counter into the jar
    [[760, 520], [900, 430], [1050, 380], [1200, 390], [1340, 440]].forEach(([x, y], i) => K.coin(r, x, y, 24, i * 30));
    K.curveArrow(r, [[690, 600], [850, 470], [1050, 400], [1250, 410], [1400, 470]], C.cream, 10);
    // rent leaking out
    [[1650, 760], [1700, 820]].forEach(([x, y]) => K.coin(r, x, y, 22));
    K.card(r, 1770, 450, 260, 200, { header: C.coral, title: "Rent", titleSize: 36, headerH: 60, rot: 5 });
    K.text(r, 1775, 500, "−₹5,000", { size: 42, color: C.coralText, rot: 5 });
    K.khata(r, 1180, 1010, 0.36, { open: false, armL: 150, armR: 150 });
  };

  // L05 · Profit Is Not Cash — two gauges disagree on a credit sale (T9)
  S.L05 = (r) => {
    K.wall(r, C.sky); K.table(r, 800);
    K.gauge(r, 760, 420, 200, 0.78, { color: C.leaf, icon: "sprout" });
    K.label(r, 760, 520, "Profit  +₹6,000", { size: 44, bg: C.leaf, color: C.white });
    K.gauge(r, 1250, 420, 200, 0.25, { color: C.saffron, icon: "coins" });
    K.label(r, 1250, 520, "Cash  +₹0", { size: 44, bg: C.saffron, color: C.white });
    K.meera(r, 300, 950, 1.05, { expr: "puzzled", aL: [20, -100], aR: [18, 4], lookX: 6, lookY: -5 });
    const p = K.priya(r, 1660, 950, 1.05, { flip: true, expr: "happy", aR: [55, 45], aL: [30, -70] });
    for (let i = 0; i < 3; i++) K.tumbler(r, p.handR[0] - 40 + i * 34, p.handR[1] - 6, 0.9);
    K.paper(K.shadow(r, 1), K.cutRect(p.handR[0] - 70, p.handR[1] - 6, 130, 14, 1, 14), C.woodDark);
    K.slip(r, 1470, 640, 0.95, -8, "receipt");
    K.label(r, 1470, 735, "Tab  ₹6,000", { size: 36, rot: -6 });
    K.khata(r, 1010, 1020, 0.46, { open: false, armL: 15, armR: 120, lookX: 8, lookY: -10 });
  };

  // L06 · Debit & Credit = Left & Right
  S.L06 = (r) => {
    K.wall(r, C.cream); K.table(r, 840);
    K.khata(r, 980, 960, 0.96, {
      left: "blue", right: "orange", armL: 60, armR: 60, mouth: "o", blankPages: true,
      pageContent: (pos, side, px) => K.text(pos, px + 159, -205, side < 0 ? "Dr" : "Cr", { size: 120, color: C.white, weight: 800 }),
    });
    K.arrowShape(r, 640, 440, 230, C.dr, 1);
    K.arrowShape(r, 1320, 440, 230, C.cr, -1);
    K.label(r, 640, 340, "Left", { size: 46, font: "kalam" });
    K.label(r, 1320, 340, "Right", { size: 46, font: "kalam" });
    // coins → left page, capital tag → right page
    K.jar(r, 170, 930, 150, 190, { contents: "coins", fill: 1 });
    K.label(r, 170, 990, "Cash ₹50,000", { size: 30 });
    [[260, 600], [330, 520], [410, 480]].forEach(([x, y], i) => K.coin(r, x, y, 24, i * 40));
    K.curveArrow(r, [[220, 700], [300, 560], [420, 490], [500, 520]], C.dr, 10);
    K.faceTag(r, 1690, 250, "meera", 1.4, 8);
    K.label(r, 1700, 350, "Capital ₹50,000", { size: 32 });
    K.curveArrow(r, [[1610, 300], [1530, 330], [1470, 400], [1450, 500]], C.cr, 10);
    K.meera(r, 1770, 990, 0.72, { expr: "amazed", aL: [12, 8], aR: [150, 10] });
    K.medallion(r, 1860, 560, 38, "lightbulb", C.gold, C.ink);
  };

  // L07 · The Golden Rules, Decoded — two dialects, same entry
  S.L07 = (r) => {
    K.paper(r, K.cutRect(-40, -40, 1000, 1160, 2, 60), C.saffron);
    K.paper(r, K.cutRect(960, -40, 1000, 1160, 2, 60), C.teal);
    K.table(r, 860);
    // merchant at his low desk with a bahi-khata and a brass lamp
    K.merchant(r, 330, 880, 0.82, { expr: "happy", aR: [40, -80], aL: [20, -60] });
    K.paper(K.shadow(r, 2), K.cutRect(60, 700, 540, 220, 3), C.woodDark);
    K.tex(K.shadow(r, 1), K.cutRect(210, 640, 220, 70, 2), "pat-cover");
    K.tex(K.shadow(r, 1), K.cutRect(222, 646, 96, 56, 1.5), "pat-paper");
    K.tex(K.shadow(r, 1), K.cutRect(322, 646, 96, 56, 1.5), "pat-paper");
    K.paper(K.shadow(r, 1), K.cutPoly([[500, 700], [560, 700], [545, 676], [515, 676]], 1, 10), C.brass);
    K.paper(r, K.cutPoly([[530, 676], [520, 650], [530, 620], [540, 650]], 0.8, 8), C.saffron);
    // three doors
    [["user", "Personal", 700], ["package", "Real", 960], ["receipt", "Nominal", 1220]].forEach(([ic, name, x]) => {
      K.tex(K.shadow(r, 2), K.cutPoly([[x - 100, 400], [x - 100, 200], ...K.arc(x, 200, 100, Math.PI, Math.PI * 2, 12).slice(1, -1), [x + 100, 200], [x + 100, 400]], 2, 20), "pat-paper");
      K.icon(r, ic, x, 270, 90, C.ink, 2.2);
      K.label(r, x, 455, name, { size: 38, bg: C.violet, color: C.white });
    });
    // the match: two dialects, one entry
    K.label(r, 760, 610, "Credit the giver", { size: 38, font: "kalam", rot: -4 });
    K.label(r, 1160, 690, "Liability ↑  =  Cr", { size: 38, rot: 3 });
    K.sparkle(r, 960, 650, 40);
    K.curveArrow(r, [[860, 650], [920, 668]], C.ink, 8);
    K.curveArrow(r, [[1060, 660], [1000, 652]], C.ink, 8);
    K.khata(r, 1610, 980, 0.52, { armL: 40, armR: 40, lookX: -10 });
  };

  // L08 · The Journal — entries written in date order
  S.L08 = (r) => {
    K.wall(r, C.coral); K.table(r, 860);
    K.khata(r, 1000, 990, 1.0, {
      armL: 20, armR: 20, blankPages: true,
      pageContent: (pos, side, px) => {
        const L = side < 0;
        const rowsL = [["30 Apr", "Cash  Dr", "    To Sales"], ["30 Apr", "Salary  Dr", "    To Bank"], ["30 Apr", "Drawings  Dr", "    To Cash"]];
        const amts = [["22,000", ""], ["", "22,000"], ["8,000", ""], ["", "8,000"], ["3,000", ""], ["", "3,000"]];
        if (L) rowsL.forEach(([d, a, b], i) => {
          const y = -300 + i * 92;
          K.text(pos, px + 16, y, d, { size: 22, font: "kalam", anchor: "start", color: "#7a6a58" });
          K.text(pos, px + 100, y, a, { size: 28, font: "kalam", anchor: "start" });
          K.text(pos, px + 100, y + 38, b, { size: 28, font: "kalam", anchor: "start" });
        });
        else amts.forEach(([dr, cr], i) => {
          const y = -300 + Math.floor(i / 2) * 92 + (i % 2) * 38;
          if (dr) K.text(pos, px + 130, y, dr, { size: 28, font: "kalam", anchor: "end", color: C.drText });
          if (cr) K.text(pos, px + 290, y, cr, { size: 28, font: "kalam", anchor: "end", color: C.crText });
        });
        if (!L) { K.text(pos, px + 100, -340, "Dr", { size: 20, color: C.drText }); K.text(pos, px + 260, -340, "Cr", { size: 20, color: C.crText }); }
      },
    });
    // golden-rule tags
    [["Real · comes in", 690], ["Nominal · expense", 782], ["Personal · receiver", 874]].forEach(([t, y], i) =>
      K.label(r, 330, y, t, { size: 30, bg: C.violet, color: C.white, rot: (i - 1) * 2 }));
    // tissue flying away
    const t = K.g(r, { transform: "translate(1560 170) rotate(16)" });
    K.tex(K.shadow(t, 2), K.cutPoly([[-90, -60], [70, -80], [100, 30], [-60, 70], [-110, 10]], 6, 14), "pat-paper");
    K.ink(t, [[-60, -20], [-20, -30], [10, -10], [50, -24]], 3, "#7a6a58");
    K.ink(t, [[-50, 10], [0, 0], [40, 14]], 3, "#7a6a58");
    K.meera(r, 1740, 990, 0.82, { expr: "worried", aR: [160, 12], aL: [30, 10], lookY: -6, lookX: 4 });
    K.card(r, 240, 280, 220, 240, { header: C.red, title: "APR", titleSize: 38, headerH: 70, rot: -6 });
    K.text(r, 236, 330, "30", { size: 96, rot: -6 });
  };

  // L09 · The Ledger — one khata per account
  S.L09 = (r) => {
    K.wall(r, C.violet); K.table(r, 880);
    K.paper(K.shadow(r, 2), K.cutRect(980, 470, 860, 30, 2), C.woodDark);
    [["coins", "Cash"], ["banknote", ""], ["package", ""], ["coffee", ""], ["house", ""], ["user", ""], ["handshake", ""], ["receipt", ""], ["zap", ""]].forEach(([ic], i) =>
      K.smallBook(r, 1030 + i * 90, 470, 72, i % 3 === 1 ? 170 : 150, ic, K.sh(i + 5) * 3));
    // the Cash T-account
    const cx = 520, cy = 530;
    K.card(r, cx, cy, 760, 720, { header: C.red, title: "Cash", titleSize: 48, headerH: 80 });
    K.ink(r, [[cx - 340, cy - 230], [cx + 340, cy - 230]], 5);
    K.ink(r, [[cx, cy - 240], [cx, cy + 270]], 5);
    K.text(r, cx - 170, cy - 262, "Dr", { size: 34, color: C.drText });
    K.text(r, cx + 170, cy - 262, "Cr", { size: 34, color: C.crText });
    const dr = ["50,000", "30,000", "18,000", "4,000", "22,000"], cr = ["36,000", "6,000", "5,000", "15,000", "5,000", "3,300", "3,000"];
    dr.forEach((v, i) => K.text(r, cx - 40, cy - 190 + i * 50, v, { size: 34, font: "kalam", anchor: "end", color: C.drText }));
    cr.forEach((v, i) => K.text(r, cx + 300, cy - 190 + i * 50, v, { size: 34, font: "kalam", anchor: "end", color: C.crText }));
    K.ink(r, [[cx - 300, cy + 170], [cx + 330, cy + 170]], 3, C.ink, { opacity: 0.6 });
    K.text(r, cx - 40, cy + 205, "1,24,000", { size: 34, anchor: "end", color: C.drText });
    K.text(r, cx + 300, cy + 205, "73,300", { size: 34, anchor: "end", color: C.crText });
    K.label(r, cx, cy + 320, "Balance  ₹50,700", { size: 44, bg: C.dr, color: C.white });
    // slips flying to their books
    [[960, 300, C.dr], [1110, 240, C.cr], [1250, 320, C.dr]].forEach(([x, y, col], i) => K.paper(K.shadow(r, 1), K.cutRect(x - 40, y - 22, 80, 44, 1.2, 12), col, { transform: `rotate(${(i - 1) * 14} ${x} ${y})` }));
    K.curveArrow(r, [[880, 360], [990, 270], [1120, 230], [1230, 260]], C.cream, 8);
    K.meera(r, 1560, 905, 0.74, { expr: "happy", aR: [140, 20], aL: [20, 10], lookY: -6 });
    K.crate(r, 1560, 960, 170, 70);
    K.khata(r, 1160, 1020, 0.32, { open: false, armL: 120, armR: 140 });
  };

  // L10 · Month-End Surprises — confetti freezes, profit drops to ₹24,700
  S.L10 = (r) => {
    night(r);
    for (let i = 0; i < 46; i++) {
      const x = 80 + K.hash(i * 3.1) * 1100, y = 90 + K.hash(i * 7.7) * 420, cols = [C.saffron, C.coral, C.sky, C.gold, C.leaf, C.violet];
      K.paper(r, K.cutRect(x, y, 22, 12, 0.6, 8), cols[i % cols.length], { transform: `rotate(${K.sh(i) * 60} ${x} ${y})` });
    }
    K.meera(r, 470, 940, 0.92, { expr: "grin", aL: [162, 8], aR: [162, 8] });
    K.khata(r, 860, 1010, 0.42, { open: false, armL: 15, armR: 150, mouth: "o", lookX: -10 });
    K.card(r, 640, 130, 560, 130, {});
    K.text(r, 520, 130, "₹36,700", { size: 54, color: "#9a8f84" });
    K.ink(r, [[420, 134], [620, 126]], 8, C.coral);
    K.text(r, 790, 130, "₹24,700", { size: 58, color: C.leaf });
    K.curveArrow(r, [[640, 132], [690, 132]], C.ink, 6);
    const cards = [
      ["zap", "Electricity bill", "+₹1,000 expense"],
      ["package", "Stock used", "+₹10,000 expense"],
      ["trending-up", "Cart depreciation", "+₹1,000 expense"],
    ];
    cards.forEach(([ic, t, v], i) => {
      const y = 280 + i * 240;
      K.card(r, 1490, y, 620, 200, { rot: (i - 1) * 2 });
      K.medallion(r, 1260, y, 58, ic, i === 2 ? C.coral : C.gold, C.ink);
      K.text(r, 1350, y - 34, t, { size: 40, anchor: "start" });
      K.text(r, 1350, y + 30, v, { size: 40, anchor: "start", color: C.coralText });
    });
  };

  // L11 · The Trial Balance — wobbly tower, columns that balance
  S.L11 = (r) => {
    K.wall(r, C.teal); K.table(r, 860);
    for (let i = 0; i < 12; i++) {
      const y = 920 - i * 52, x = 520 + K.sh(i + 30) * 26, w = 250 - (i % 3) * 18;
      const grp = K.g(r, { transform: `rotate(${K.sh(i + 50) * 4} ${x} ${y})` });
      K.tex(K.shadow(grp, 1), K.cutRect(x - w / 2, y - 48, w, 48, 1.5, 18), "pat-cover");
      K.paper(grp, K.cutRect(x + w / 2 - 22, y - 46, 14, 44, 0.6, 12), C.gold);
    }
    K.khata(r, 540, 296, 0.3, { open: false, armL: 20, armR: 150 });
    K.meera(r, 270, 960, 0.84, { expr: "worried", aR: [72, 10], aL: [20, 8], lookX: 6, lookY: -6 });
    const cx = 1290, cy = 500;
    K.card(r, cx, cy, 860, 720, { header: C.navy, title: "Trial Balance · 30 April", titleSize: 40, headerH: 76 });
    K.text(r, cx - 200, cy - 240, "Debit", { size: 36, color: C.drText });
    K.text(r, cx + 210, cy - 240, "Credit", { size: 36, color: C.crText });
    K.ink(r, [[cx, cy - 260], [cx, cy + 250]], 4);
    const L = [["Cash", "50,700"], ["Bank", "11,000"], ["Equipment", "36,000"], ["Expenses", "25,300"], ["Others", "13,000"]];
    const R = [["Capital", "50,000"], ["Loan", "27,000"], ["Sales", "50,000"], ["Payables", "8,000"], ["Acc. dep.", "1,000"]];
    L.forEach(([a, v], i) => { K.text(r, cx - 390, cy - 170 + i * 66, a, { size: 32, anchor: "start" }); K.text(r, cx - 30, cy - 170 + i * 66, v, { size: 32, anchor: "end", color: C.drText }); });
    R.forEach(([a, v], i) => { K.text(r, cx + 30, cy - 170 + i * 66, a, { size: 32, anchor: "start" }); K.text(r, cx + 390, cy - 170 + i * 66, v, { size: 32, anchor: "end", color: C.crText }); });
    K.ink(r, [[cx - 390, cy + 175], [cx + 390, cy + 175]], 4);
    K.text(r, cx - 30, cy + 215, "₹1,36,000", { size: 40, anchor: "end", color: C.drText });
    K.text(r, cx + 390, cy + 215, "₹1,36,000", { size: 40, anchor: "end", color: C.crText });
    K.medallion(r, cx, cy + 300, 44, "check", C.leaf, C.white);
  };

  // L12 · The P&L — April's movie, Khata the usher
  S.L12 = (r) => {
    K.wall(r, "#2a2530"); K.table(r, 900);
    K.tex(K.shadow(r, 3), K.cutPoly([[-40, -40], [430, -40], [380, 300], [300, 700], [200, 1120], [-40, 1120]], 6, 40), "pat-cover");
    K.tex(K.shadow(r, 3), K.cutPoly([[1960, -40], [1490, -40], [1540, 300], [1620, 700], [1720, 1120], [1960, 1120]], 6, 40), "pat-cover");
    K.paper(K.shadow(r, 2), K.cutRect(330, -40, 1260, 70, 3), C.red);
    const sx = 960, sy = 450;
    K.tex(K.shadow(r, 2), K.cutRect(sx - 440, sy - 330, 880, 640, 3, 30), "pat-paper");
    K.text(r, sx, sy - 270, "Profit & Loss · April", { size: 44, weight: 800 });
    K.rows(r, sx - 360, sy - 190, 720, 58, [
      ["Sales", "50,000"],
      ["Cost of supplies used", "(10,000)"],
      ["Gross profit", "40,000", { bold: true, line: true }],
      ["Rent, salary, electricity", "(14,000)"],
      ["Depreciation, interest", "(1,300)"],
      ["Net profit", "₹24,700", { bold: true, line: true, color: "#2f8a3e" }],
    ], { size: 36 });
    for (let i = 0; i < 9; i++) K.paper(K.shadow(r, 2), K.cutRect(120 + i * 200, 960, 170, 140, 2.5, 20), "#8e2a24");
    const k = K.khata(r, 1500, 1000, 0.42, { open: false, armL: 15, armR: 100, lookX: 10 });
    K.paper(r, K.cutPoly([[k.handR[0], k.handR[1]], [1820, 700], [1840, 880]], 2, 30), C.gold, { opacity: 0.45 });
    const rv = K.raviMama(r, 1790, 1000, 0.8, { flip: true, expr: "worried", aR: [55, 30] });
    K.slip(r, rv.handR[0] - 30, rv.handR[1] - 40, 0.8, -8, "handshake");
    K.label(r, 1700, 440, "Loan ₹30,000", { size: 34, rot: -4 });
    K.stamp(r, rv.handR[0] - 30, rv.handR[1] - 40, 52);
  };

  // L13 · The Balance Sheet — the photo on 30 April
  S.L13 = (r) => {
    K.wall(r, C.saffron); K.table(r, 900);
    const k = K.khata(r, 230, 1000, 0.42, { open: false, armL: 20, armR: 110, wink: true });
    const cam = K.g(r, { transform: `translate(${k.handR[0] + 20} ${k.handR[1] - 40}) rotate(-10)` });
    K.paper(K.shadow(cam, 1), K.cutRect(-70, -50, 140, 100, 2, 16), C.ink);
    K.paper(cam, K.cutEll(0, 0, 34, 34, 1), "#555"); K.paper(cam, K.cutEll(0, 0, 20, 20, 1), C.sky);
    for (let i = 0; i < 6; i++) { const a = -0.9 + i * 0.36; K.paper(r, K.cutStroke([[k.handR[0] + 90 + Math.cos(a) * 40, k.handR[1] - 60 + Math.sin(a) * 40], [k.handR[0] + 90 + Math.cos(a) * 95, k.handR[1] - 60 + Math.sin(a) * 95]], 12, 1), C.cream); }
    K.polaroid(r, 1090, 465, 1300, 830, -1.2, (pg, x, y, w, h) => {
      K.paper(pg, K.cutRect(x, y, w, h, 1, 30), C.cream);
      const half = w / 2;
      [[x + 30, "Assets", C.dr, [["Equipment (less dep.)", "35,000"], ["Stock", "4,000"], ["Infotech owes", "6,000"], ["Bank", "11,000"], ["Cash", "50,700"], ["Total", "₹1,06,700", { bold: true, line: true }]]],
       [x + half + 15, "Liabilities + Equity", C.cr, [["Loan (Ravi Mama)", "27,000"], ["Gopal Dairy", "3,000"], ["Advance", "4,000"], ["Electricity due", "1,000"], ["Equity", "71,700", { bold: true }], ["Total", "₹1,06,700", { bold: true, line: true }]]]].forEach(([cx0, title, col, list]) => {
        K.card(pg, cx0 + (half - 45) / 2, y + h / 2, half - 45, h - 40, { header: col, title, titleSize: 40, headerH: 70, shadow: 1 });
        K.rows(pg, cx0 + 24, y + 140, half - 95, 72, list, { size: 33 });
      });
    });
    K.filmStrip(r, 1835, 820, 300, 100, ["coffee", "coins", "calendar"], -78);
    [[1830, 640], [1800, 590], [1760, 560]].forEach(([x, y], i) => K.coin(r, x, y, 20, i * 30));
    K.curveArrow(r, [[1850, 690], [1830, 600], [1780, 545], [1720, 528]], C.leaf, 10);
    K.label(r, 1720, 990, "+ Profit ₹24,700", { size: 34, bg: C.leaf, color: C.white, rot: -3 });
  };

  // L14 · Where Did the Money Go? — coin waterfall into the galla, night rhyme
  S.L14 = (r) => {
    night(r);
    K.paper(K.shadow(r, 1), K.cutEll(1780, 140, 60, 60, 2), C.cream);
    K.stringLights(r, -20, 1940, 30, 70, 14);
    K.galla(r, 960, 900, 1.45, { open: true, overflow: true });
    K.label(r, 960, 940, "Cash + Bank  ₹61,700", { size: 40, bg: C.gold });
    const src = [["Meera's savings", "+₹50,000", 260, "hand-coins"], ["Ravi Mama's loan", "+₹30,000", 470, "handshake"], ["Running the stall", "+₹23,700", 680, "coffee"]];
    src.forEach(([t, v, y, ic]) => {
      K.medallion(r, 170, y, 50, ic, C.white, C.ink);
      K.text(r, 240, y - 26, t, { size: 30, anchor: "start", color: C.cream });
      K.text(r, 240, y + 24, v, { size: 36, anchor: "start", color: C.leaf, weight: 800 });
      K.curveArrow(r, [[470, y], [640, y + 20], [800, 620 + (y - 470) * 0.3], [870, 690]], C.gold, 9);
    });
    const out = [["Cart", "−₹36,000", 300, "package"], ["Loan repaid", "−₹3,000", 470, "handshake"], ["Drawings", "−₹3,000", 640, "house"]];
    out.forEach(([t, v, y, ic]) => {
      K.curveArrow(r, [[1060, 680], [1140, 600 + (y - 470) * 0.3], [1260, y + 10], [1340, y]], C.coral, 8);
      K.medallion(r, 1400, y, 44, ic, C.white, C.ink);
      K.text(r, 1460, y - 26, t, { size: 30, anchor: "start", color: C.cream });
      K.text(r, 1460, y + 24, v, { size: 34, anchor: "start", color: "#ff9a8a", weight: 800 });
    });
    K.meera(r, 1755, 990, 0.76, { expr: "grin", aL: [20, -60], aR: [20, -60] });
    K.khata(r, 650, 1020, 0.42, { open: false, armL: 15, armR: 150 });
  };

  window.SCENES = S;
})();
