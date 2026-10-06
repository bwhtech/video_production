// One signature frame per lesson, built from KIT. Each returns the inner markup of a 1920x1080 SVG.
(function () {
  const K = window.KIT, C = K.C;
  const bg = (col) => `<rect width="1920" height="1080" fill="${col}"/>`;
  const sub = (col, y = 860) => `<rect x="0" y="${y}" width="1920" height="${1080 - y}" fill="${col}"/>`;
  const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16); const c = (s) => Math.round(((n >> s) & 255) * f); return `rgb(${c(16)},${c(8)},${c(0)})`; };
  // tone-on-tone set dressing line
  const ton = (col) => (d) => `<path d="${d}" fill="none" stroke="${shade(col, 0.86)}" stroke-width="5" stroke-linecap="round"/>`;

  const S = {};

  // L1 — night at the stall; Khata shows the two reports (movie + photo)
  S[1] = () => {
    const strip = K.filmStrip(0, 0, { frames: 3, icons: [K.LUCIDE("coffee", 0, 0, 52, "#fff"), K.LUCIDE("coins", 0, 0, 52, "#fff"), K.LUCIDE("calendar", 0, 0, 52, "#fff")] });
    const photo = K.polaroid(0, 0, { w: 240, h: 270, bg: C.sky, inner: `<rect x="40" y="110" width="124" height="54" rx="6" fill="${C.wood}"/><path d="M30,110 L174,110 L160,70 L44,70Z" fill="${C.saffron}"/>` });
    return bg(C.night) + K.stars(40, 7) + K.stringLights(60) + sub("#22304A", 900) +
      K.cart(1640, 930, { s: 0.85, sign: "Meera's Chai" }) +
      `<g filter="url(#boil)"><rect x="370" y="760" width="200" height="140" rx="10" fill="${C.woodDark}"/></g>` +
      K.person("meera", 300, 940, { pose: "shrug", face: "puzzled", s: 0.95 }) +
      K.galla(470, 768, { full: true, s: 0.8 }) + K.qmark(300, 330, C.gold, 1.6) +
      K.khata(960, 940, { s: 0.9, open: 1, face: "happy", armL: 70, armR: -70 }) +
      K.g(strip, "translate(540 300) rotate(-8)") + K.chip(740, 520, "Profit & Loss", { size: 34, bg: C.dr, fg: "#fff" }) +
      K.g(photo, "translate(1110 250) rotate(7)") + K.chip(1220, 575, "Balance Sheet", { size: 34, bg: C.cr, fg: "#fff" });
  };

  // L2 — notes fly into the galla carrying source tags
  S[2] = () => {
    const t = ton(C.teal);
    return bg(C.teal) + t("M80,820 L80,560 L240,560 L240,820 M120,600 l80,0 M120,650 l80,0") + t("M1700,820 q0,-200 100,-260 q100,60 100,260") + sub("#2A968A") +
      K.cart(960, 900, { s: 0.9 }) +
      K.galla(960, 655, { full: true, s: 1.05, tags: K.faceTag(-70, -150, "meera", { s: 0.7, rot: -10 }) + K.faceTag(80, -160, "ravi", { s: 0.7, rot: 8 }) }) +
      K.person("meera", 420, 940, { pose: "reachR", face: "joy" }) + K.bundle(640, 560, -14) + K.sparkle(700, 520, 0.8) +
      K.person("ravi", 1520, 940, { pose: "point", face: "happy", flip: true }) + K.bundle(1300, 520, 10) +
      K.iou(1690, 330, { rot: 8 }) +
      K.chip(960, 150, "Cash ₹80,000", { size: 48, bg: C.white }) +
      K.chip(560, 300, "Meera ₹50,000 · Equity", { size: 34, bg: C.ink, fg: "#fff" }) +
      K.chip(1360, 300, "Ravi Mama ₹30,000 · Liability", { size: 34, bg: C.cr, fg: "#fff" }) +
      K.khata(1215, 960, { s: 0.55, open: 0, face: "happy", armL: 40, armR: -60 });
  };

  // L3 — the scale that never tips
  S[3] = () => {
    const left = K.jar(-95, 0, { s: 0.55, level: 0.6 }) + K.g(K.cart(0, 0, { s: 0.22 }), "translate(25 0)") + K.jar(125, 0, { s: 0.42, kind: "leaves", level: 0.7 });
    const right = K.g(K.iou(0, 0, { rot: -6 }), "translate(-60 -70) scale(1.2)") + K.faceTag(80, -70, "meera", { s: 1 });
    return bg(C.paper) + `<circle cx="960" cy="560" r="430" fill="#FBE9CC"/>` +
      K.scale(960, 980, { left, right }) +
      K.khata(960, 410, { s: 0.5, open: 0, face: "happy", armL: 80, armR: -80 }) +
      K.chip(540, 300, "Assets ₹88,000", { size: 44, bg: C.dr, fg: "#fff" }) +
      K.chip(1380, 300, "Liabilities + Equity ₹88,000", { size: 44, bg: C.cr, fg: "#fff" }) +
      
      K.person("meera", 220, 1000, { pose: "clasp", face: "wow", s: 0.95 }) + K.sparkle(1700, 520, 1) + K.sparkle(1760, 600, 0.6);
  };

  // L4 — sales fill the profit pocket, rent drains it
  S[4] = () => {
    const t = ton(C.leaf);
    let coins = "";
    [[620, 520], [720, 470], [820, 450], [920, 470], [1010, 520]].forEach(([x, y]) => (coins += K.coin(x, y, 22)));
    const pocketJar = K.g(
      `<rect x="-170" y="-330" width="340" height="330" rx="34" fill="${C.glass}" opacity="0.92"/><rect x="-8" y="-320" width="16" height="320" fill="#C8DDE6"/>` +
        `<rect x="-158" y="-150" width="146" height="140" rx="16" fill="#9FB7C8"/><rect x="12" y="-110" width="146" height="100" rx="16" fill="${C.leaf}"/>` +
        K.LUCIDE("sprout", 85, -170, 56, C.leaf, 2.4) + `<rect x="-178" y="-360" width="356" height="36" rx="12" fill="${C.woodDark}"/>`,
      "translate(1210 860)", `filter="url(#boil)"`);
    return bg(C.leaf) + t("M0,300 L1920,300") + t("M1500,860 L1500,520 L1760,520 L1760,860 M1540,560 h180 M1540,610 h180") + sub("#4FA85E") +
      K.person("customer1", 150, 950, { pose: "stand", face: "smile", s: 0.8 }) + K.person("customer2", 300, 950, { pose: "reachR", face: "happy", s: 0.8 }) +
      K.person("meera", 560, 880, { pose: "hold", face: "joy", noLegs: true, s: 0.95 }) + K.cart(560, 940, { s: 0.75, noAwning: true }) +
      coins + pocketJar +
      K.chip(1130, 920, "Capital ₹50,000", { size: 30, bg: C.white }) + K.chip(1320, 980, "Profit ₹13,000", { size: 30, bg: C.ink, fg: "#fff" }) +
      K.coin(1450, 760, 18) + K.coin(1520, 800, 18) + K.arrow(1520, 700, 1, C.coral, { len: 120, rot: 20 }) +
      K.card(1580, 600, 260, 200, { head: "Rent", headFill: C.coral, body: K.text(130, 130, "−₹5,000", { size: 48, fill: C.coral }) }) +
      K.chip(960, 140, "Revenue − Expenses = Profit", { size: 48, bg: C.white }) +
      K.khata(1800, 990, { s: 0.5, open: 0, face: "joy", armL: 100, armR: -100 });
  };

  // L5 — profit and cash needles disagree
  S[5] = () => {
    const t = ton(C.sky);
    return bg(C.sky) + t("M120,120 L1800,120") + `<rect x="420" y="170" width="1080" height="440" rx="30" fill="#3E8BD0"/>` + sub("#3F89CC", 880) +
      K.gauge(690, 500, { angle: 45, col: C.leaf, icon: K.LUCIDE("sprout", 0, 0, 64, C.leaf), label: "Profit", value: "+₹6,000" }) +
      K.gauge(1230, 500, { angle: -60, col: C.saffron, icon: K.LUCIDE("coins", 0, 0, 64, C.saffron), label: "Cash", value: "+₹0" }) +
      K.person("meera", 300, 980, { pose: "shrug", face: "puzzled", s: 0.82, look: 1 }) + K.qmark(300, 470, C.white, 1.3) +
      K.person("priya", 1620, 980, { pose: "hold", face: "happy", s: 0.82, extra: `<rect x="-60" y="-320" width="120" height="16" rx="6" fill="${C.woodLight}"/><path d="M-40,-320 l18,0 l-3,-34 l-12,0z M-6,-320 l18,0 l-3,-34 l-12,0z M28,-320 l18,0 l-3,-34 l-12,0z" fill="#fff"/>` }) +
      K.card(1380, 690, 300, 150, { head: "Infotech tab", headFill: C.ink, headSize: 30, body: K.text(150, 104, "₹6,000 · pay later", { size: 32 }) }) +
      K.khata(960, 1020, { s: 0.55, open: 0, face: "wow", armL: 40, armR: -120 });
  };

  // L6 — debit = left, credit = right
  S[6] = () => {
    const dr = K.text(-167, -220, "Dr", { size: 110, fill: C.dr }) + K.card(-300, -150, 268, 80, { body: K.text(134, 40, "Cash +₹18,000", { size: 32 }) });
    const cr = K.text(167, -220, "Cr", { size: 110, fill: C.cr }) + K.card(32, -150, 268, 80, { body: K.text(134, 40, "Sales +₹18,000", { size: 32 }) });
    const phone = K.g(`<rect x="-70" y="-130" width="140" height="250" rx="22" fill="${C.ink}"/><rect x="-58" y="-112" width="116" height="200" rx="10" fill="#fff"/>` +
      `<rect x="-52" y="-100" width="104" height="84" rx="12" fill="${C.leafDeep}"/>` + K.text(0, -80, "CREDITED", { size: 17, fill: "#fff", keep: true }) + K.text(0, -42, "₹15,000", { size: 24, fill: "#fff", keep: true }), "translate(470 640) rotate(-8)");
    return bg(C.paper) +
      K.khata(1010, 900, { s: 1.15, open: 1, face: "happy", glowL: 0.22, glowR: 0.22, contentL: dr, contentR: cr, armL: 30, armR: -30 }) +
      K.arrow(700, 260, -1, C.dr, { len: 160, w: 20 }) + K.chip(700, 180, "Debit = Left", { size: 44, bg: C.dr, fg: "#fff" }) +
      K.arrow(1320, 260, 1, C.cr, { len: 160, w: 20 }) + K.chip(1320, 180, "Credit = Right", { size: 44, bg: C.cr, fg: "#fff" }) +
      K.coin(380, 330, 26) + K.coin(450, 290, 22) +
      K.person("meera", 250, 1000, { pose: "reachUp", face: "wow", s: 0.7 }) + phone + K.bulb(250, 560, 1.1);
  };

  // L7 — golden rules vs equation: same entry
  S[7] = () => {
    const doors = [["user", "Personal", "Receiver Dr · Giver Cr"], ["package", "Real", "Comes in Dr · Goes out Cr"], ["receipt", "Nominal", "Expenses Dr · Income Cr"]];
    let d = "";
    doors.forEach(([ic, name, rule], i) => {
      const x = 640 + i * 320;
      const [r1, r2] = rule.split(" · ");
      d += K.card(x - 145, 140, 290, 330, { head: name, headFill: C.violet, body: K.medallion(145, 135, ic, { r: 50, bg: C.paper }) + K.text(145, 232, r1, { size: 28 }) + K.text(145, 276, r2, { size: 28 }) });
    });
    const entry = K.card(660, 560, 600, 170, { head: "Same entry", headFill: C.leaf, body: K.text(30, 92, "Cash  Dr  ₹30,000", { size: 34, anchor: "start" }) + K.text(70, 136, "To Ravi Mama  Cr  ₹30,000", { size: 30, anchor: "start" }) + K.LUCIDE("check", 550, 112, 56, C.leaf, 3) });
    return `<rect width="960" height="1080" fill="${C.saffron}"/><rect x="960" width="960" height="1080" fill="${C.teal}"/>` +
      sub("#D98E2E", 880).replace('width="1920"', 'width="960"') + `<rect x="960" y="880" width="960" height="200" fill="#2A968A"/>` +
      K.chip(250, 90, "Golden rules", { size: 40, bg: C.white }) + K.chip(1670, 90, "Equation", { size: 40, bg: C.white }) +
      K.person("merchant", 255, 830, { pose: "hold", face: "smile", s: 0.8, noLegs: true }) +
      `<g filter="url(#boil)"><rect x="70" y="820" width="370" height="70" rx="12" fill="#fff"/><rect x="110" y="690" width="290" height="140" rx="12" fill="${C.woodDark}"/><rect x="110" y="690" width="290" height="20" rx="8" fill="${C.woodLight}"/></g>` +
      K.g(`<rect x="-80" y="-14" width="160" height="28" rx="6" fill="${C.red}"/><rect x="-80" y="-14" width="160" height="8" fill="${C.page}"/>`, "translate(240 680) rotate(-4)") +
      `<g transform="translate(380 720)"><path d="M-14,0 q14,-40 28,0z" fill="${C.gold}"/><rect x="-24" y="0" width="48" height="16" rx="6" fill="${C.brass}"/></g>` +
      d + entry +
      `<path d="M420,560 C520,620 560,660 660,650" stroke="#fff" stroke-width="8" stroke-dasharray="4 18" stroke-linecap="round" fill="none"/>` +
      `<path d="M1500,560 C1400,620 1360,660 1260,650" stroke="#fff" stroke-width="8" stroke-dasharray="4 18" stroke-linecap="round" fill="none"/>` +
      K.khata(1640, 960, { s: 0.55, open: 0.55, face: "wink", armL: 60, armR: -80 }) +
      K.g(K.scale(0, 0, { s: 0.3 }), "translate(1660 520)");
  };

  // L8 — the journal
  S[8] = () => {
    const t = ton(C.sky);
    const row = (y, a, b, amt, tag1, tag2) =>
      K.text(40, y, a, { size: 34, anchor: "start" }) + K.text(560, y, amt, { size: 34, anchor: "end" }) + K.chip(700, y, tag1, { size: 22, bg: "#EAF2FC", fg: C.dr }) +
      K.text(90, y + 50, "To " + b, { size: 30, anchor: "start", fill: "#5A5160" }) + K.text(660, y + 50, amt, { size: 30, anchor: "end", fill: "#5A5160" }) + K.chip(800, y + 50, tag2, { size: 22, bg: "#FDF0E4", fg: C.cr });
    const body =
      K.text(40, 100, "Date", { size: 24, anchor: "start", fill: "#8A8190" }) + K.text(560, 100, "Dr ₹", { size: 24, anchor: "end", fill: C.dr }) + K.text(660, 100, "Cr ₹", { size: 24, anchor: "end", fill: C.cr }) +
      row(160, "Cash", "Sales", "22,000", "Real · in", "Nominal · income") +
      `<line x1="30" y1="250" x2="910" y2="250" stroke="${C.rule}" stroke-width="3"/>` +
      row(290, "Salary", "Bank", "8,000", "Nominal · exp", "Personal · giver");
    const tissue = K.g(`<path d="M-80,-60 L70,-74 L86,60 L-70,72Z" fill="#fff"/><path d="M-50,-30 q20,-14 40,0 t40,0 M-50,0 q30,-12 60,4 M-44,30 q20,-10 50,0" stroke="#9A8F98" stroke-width="5" fill="none" stroke-linecap="round"/>`, "translate(260 240) rotate(-18)");
    return bg(C.sky) + t("M0,250 L1920,250") + t("M1640,860 L1640,560 L1860,560 L1860,860") + sub("#3F89CC", 880) +
      K.card(820, 230, 960, 440, { head: "Journal · 30 April", headFill: C.ink, body }) +
      tissue + `<path d="M200,330 q-40,40 -10,80 M330,310 q30,30 20,70" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>` +
      K.person("meera", 300, 990, { pose: "reachUp", face: "worried", s: 0.82 }) +
      K.khata(1300, 1020, { s: 0.55, open: 0.4, face: "happy", armL: 50, armR: -110 }) +
      K.g(`<rect width="150" height="160" rx="16" fill="#fff"/><rect width="150" height="44" rx="16" fill="${C.coral}"/>` + K.text(75, 104, "30", { size: 64 }) + K.text(75, 22, "APR", { size: 24, fill: "#fff" }), "translate(1700 300) rotate(6)");
  };

  // L9 — the ledger: one khata per account
  S[9] = () => {
    const books = [["Cash", C.red], ["Bank", "#B5462F"], ["Sales", C.red], ["Infotech", "#B5462F"], ["Gopal", C.red], ["Ravi Mama", "#B5462F"], ["Capital", C.red]];
    let shelf = `<rect x="80" y="420" width="760" height="26" rx="8" fill="${C.woodDark}"/>`;
    books.forEach(([l, c], i) => (shelf += K.miniBook(140 + i * 104, 420, { w: 90, h: 190, col: c, label: l, labelSize: l.length > 6 ? 15 : 19 })));
    const dr = [["Apr 1", "50,000"], ["Apr 1", "30,000"], ["Apr 15", "18,000"], ["Apr 22", "4,000"], ["Apr 30", "22,000"]];
    const cr = [["Apr 2", "36,000"], ["Apr 2", "6,000"], ["Apr 5", "5,000"], ["Apr 15", "15,000"], ["Apr 20", "5,000"], ["Apr 30", "3,300"], ["Apr 30", "3,000"]];
    let body = `<line x1="440" y1="70" x2="440" y2="560" stroke="${C.ink}" stroke-width="5"/><line x1="30" y1="110" x2="850" y2="110" stroke="${C.ink}" stroke-width="5"/>` +
      K.text(230, 90, "Dr", { size: 34, fill: C.dr }) + K.text(650, 90, "Cr", { size: 34, fill: C.cr });
    dr.forEach(([d, a], i) => (body += K.text(50, 146 + i * 46, d, { size: 26, anchor: "start", fill: "#8A8190" }) + K.text(410, 146 + i * 46, a, { size: 30, anchor: "end" })));
    cr.forEach(([d, a], i) => (body += K.text(470, 146 + i * 46, d, { size: 26, anchor: "start", fill: "#8A8190" }) + K.text(830, 146 + i * 46, a, { size: 30, anchor: "end" })));
    body += K.chip(440, 520, "Balance c/d ₹50,700 Dr", { size: 34, bg: C.dr, fg: "#fff" });
    return bg(C.paper) + `<rect x="0" y="860" width="1920" height="220" fill="#F3E3C8"/>` + shelf +
      K.card(960, 200, 880, 580, { head: "Cash", headFill: C.red, body }) +
      K.g(`<rect x="-50" y="-30" width="100" height="60" rx="8" fill="#EAF2FC"/><rect x="-40" y="-16" width="60" height="8" rx="4" fill="${C.dr}"/>`, "translate(560 300) rotate(-12)") +
      K.g(`<rect x="-50" y="-30" width="100" height="60" rx="8" fill="#FDF0E4"/><rect x="-40" y="-16" width="60" height="8" rx="4" fill="${C.cr}"/>`, "translate(700 250) rotate(10)") +
      K.person("meera", 330, 1000, { pose: "point", face: "joy", s: 0.72 }) +
      K.khata(1700, 1010, { s: 0.5, open: 0, face: "happy", armL: 110, armR: -40 });
  };

  // L10 — month-end surprises
  S[10] = () => {
    const env = K.g(`<rect x="-90" y="-60" width="180" height="120" rx="10" fill="#fff"/><path d="M-90,-60 L0,10 L90,-60" fill="none" stroke="${C.rule}" stroke-width="6"/>` + K.LUCIDE("zap", 0, 30, 44, C.saffron) + K.chip(0, 100, "Electricity ₹1,000", { size: 26, bg: C.ink, fg: "#fff" }), "translate(1180 300) rotate(8)");
    const drain = `<path d="M1560,800 q80,0 120,40" stroke="${C.gold}" stroke-width="10" stroke-dasharray="2 22" stroke-linecap="round" fill="none"/>`;
    return bg(C.saffron) + `<circle cx="1700" cy="160" r="70" fill="#F7C35E"/>` + sub("#D98E2E", 880) + K.confetti(46, 11, [120, 120, 700, 360]) +
      K.person("meera", 360, 980, { pose: "celebrate", face: "joy", s: 0.85 }) +
      K.khata(820, 990, { s: 0.48, open: 0, face: "wow", armL: 20, armR: -150 }) +
      env +
      K.jar(1000, 900, { s: 0.85, kind: "leaves", level: 0.18, label: "Stock ₹4,000 left" }) +
      K.cart(1440, 880, { s: 0.6 }) + drain + K.jar(1720, 960, { s: 0.55, level: 0.35, label: "Expense" }) +
      K.chip(1460, 470, "Depreciation −₹1,000/month", { size: 32, bg: C.coral, fg: "#fff" }) +
      K.card(660, 120, 560, 120, { body: `<line x1="40" y1="60" x2="250" y2="60" stroke="${C.coral}" stroke-width="8"/>` + K.text(145, 62, "₹36,700", { size: 48, fill: "#9A8F98" }) + K.arrow(320, 62, 1, C.ink, { len: 60, w: 10 }) + K.text(450, 62, "₹24,700", { size: 52, fill: C.ink }) });
  };

  // L11 — the trial balance
  S[11] = () => {
    let tower = "";
    const tilts = [0, 3, -2, 4, -3, 2, -4, 3];
    tilts.forEach((r, i) => (tower += K.g(`<rect x="-120" y="-56" width="240" height="56" rx="12" fill="${i % 2 ? "#B5462F" : C.red}"/><rect x="-120" y="-34" width="240" height="8" fill="${C.gold}"/><rect x="80" y="-56" width="40" height="56" rx="10" fill="${C.redShade}"/>`, `translate(${380 + (i % 3) * 8} ${880 - i * 58}) rotate(${r})`, `filter="url(#boil)"`)));
    const rowsL = [["Cash", "50,700"], ["Bank", "11,000"], ["Equipment", "36,000"], ["Expenses", "25,300"], ["…", ""]];
    const rowsR = [["Capital", "50,000"], ["Loan", "27,000"], ["Sales", "50,000"], ["Payables", "9,000"], ["…", ""]];
    let body = `<rect x="20" y="70" width="410" height="44" rx="10" fill="#EAF2FC"/><rect x="450" y="70" width="410" height="44" rx="10" fill="#FDF0E4"/>` +
      K.text(225, 92, "Debit", { size: 30, fill: C.dr }) + K.text(655, 92, "Credit", { size: 30, fill: C.cr });
    rowsL.forEach(([a, v], i) => (body += K.text(40, 150 + i * 46, a, { size: 28, anchor: "start" }) + K.text(410, 150 + i * 46, v, { size: 28, anchor: "end" })));
    rowsR.forEach(([a, v], i) => (body += K.text(470, 150 + i * 46, a, { size: 28, anchor: "start" }) + K.text(840, 150 + i * 46, v, { size: 28, anchor: "end" })));
    body += `<line x1="20" y1="390" x2="860" y2="390" stroke="${C.ink}" stroke-width="4"/>` + K.text(225, 432, "₹1,36,000", { size: 42, fill: C.dr }) + K.text(655, 432, "₹1,36,000", { size: 42, fill: C.cr }) + K.text(440, 432, "=", { size: 50 });
    return bg(C.paper) + sub("#F3E3C8", 880) + tower +
      K.khata(392, 410, { s: 0.3, open: 0, face: "joy", armL: 100, armR: -130 }) +
      K.person("meera", 640, 990, { pose: "steady", face: "worried", s: 0.82, flip: false }) +
      K.card(900, 170, 880, 480, { head: "Trial Balance · 30 April", headFill: C.ink, body }) +
      K.g(K.scale(0, 0, { s: 0.32 }), "translate(1340 960)");
  };

  // L12 — the P&L is a movie
  S[12] = () => {
    const lines = [["Sales", "50,000", C.ink], ["Cost of supplies", "(10,000)", C.coral], ["Gross profit", "40,000", C.ink], ["Running costs", "(15,300)", C.coral], ["Net profit", "₹24,700", C.leaf]];
    let screen = "";
    lines.forEach(([a, v, col], i) => (screen += K.text(80, 80 + i * 70, a, { size: 44, anchor: "start", fill: i === 4 ? "#8EE29B" : "#fff", keep: true }) + K.text(820, 80 + i * 70, v, { size: 44, anchor: "end", fill: col === C.ink ? "#fff" : col === C.leaf ? "#8EE29B" : "#FF9A8A", keep: true })));
    screen = `<line x1="60" y1="${80 + 3.5 * 70}" x2="840" y2="${80 + 3.5 * 70}" stroke="#fff" stroke-opacity="0.4" stroke-width="3"/>` + screen;
    const beam = `<path d="M1180,640 L1500,560 L1520,700Z" fill="${C.gold}" opacity="0.35"/>`;
    return bg("#1E2638") + `<rect x="480" y="90" width="920" height="460" rx="20" fill="#2E3B58"/>` + K.g(screen, "translate(500 120)") +
      K.chip(940, 600, "April · Profit & Loss", { size: 34, bg: C.dr, fg: "#fff" }) +
      `<rect x="0" y="860" width="1920" height="220" fill="#151B29"/>` + `<path d="M0,860 L1920,860" stroke="#3A4766" stroke-width="6"/>` +
      K.khata(1150, 1000, { s: 0.55, open: 0, face: "happy", armL: 30, armR: -100, handR: K.LUCIDE("flashlight", 70, 34, 40, C.gold) }) +
      K.person("ravi", 1430, 990, { pose: "stand", face: "worried", s: 0.7 }) + K.stamp(1520, 520, 0.45) + K.chip(1430, 1030, "Loan", { size: 28, bg: C.cr, fg: "#fff" }) +
      K.g(K.cart(0, 0, { s: 0.3 }), "translate(1620 990)") + K.stamp(1700, 790, 0.4) + K.chip(1620, 1030, "Cart", { size: 28, bg: C.cr, fg: "#fff" }) +
      K.person("meera", 1790, 990, { pose: "stand", face: "smile", s: 0.7, extra: K.LUCIDE("shoppingBag", 112, -160, 80, "#fff", 2.4) }) + K.stamp(1700, 500, 0.45) + K.chip(1800, 1030, "Drawings", { size: 28, bg: C.cr, fg: "#fff" }) +
      K.g(`<path d="M120,980 q60,-40 120,0 q60,-40 120,0 q60,-40 120,0 l0,100 l-360,0z" fill="#2A3349"/>`, "");
  };

  // L13 — the balance sheet is a photo
  S[13] = () => {
    const A = [["Equipment (net)", "35,000"], ["Stock", "4,000"], ["Infotech owes", "6,000"], ["Bank", "11,000"], ["Cash", "50,700"]];
    const R = [["Loan", "27,000"], ["Gopal Dairy", "3,000"], ["Advance", "4,000"], ["Electricity due", "1,000"], ["Equity", "71,700"]];
    let inner = `<rect x="0" y="0" width="784" height="430" fill="#fff"/>` + `<rect x="10" y="10" width="374" height="44" rx="8" fill="#EAF2FC"/><rect x="400" y="10" width="374" height="44" rx="8" fill="#FDF0E4"/>` +
      K.text(197, 32, "Assets", { size: 28, fill: C.dr }) + K.text(587, 32, "Liabilities + Equity", { size: 28, fill: C.cr });
    A.forEach(([a, v], i) => (inner += K.text(24, 86 + i * 46, a, { size: 25, anchor: "start" }) + K.text(370, 86 + i * 46, v, { size: 26, anchor: "end" })));
    R.forEach(([a, v], i) => (inner += K.text(414, 86 + i * 46, a, { size: 25, anchor: "start", fill: i === 4 ? C.leaf : C.ink }) + K.text(760, 86 + i * 46, v, { size: 26, anchor: "end", fill: i === 4 ? C.leaf : C.ink })));
    inner += `<line x1="10" y1="324" x2="774" y2="324" stroke="${C.ink}" stroke-width="3"/>` + K.text(197, 360, "₹1,06,700", { size: 38, fill: C.dr }) + K.text(587, 360, "₹1,06,700", { size: 38, fill: C.cr });
    const flash = `<g opacity="0.9">${[0, 30, 60, 90, 120, 150].map((a) => `<rect x="-14" y="-260" width="28" height="140" rx="14" fill="#fff" transform="rotate(${a})"/><rect x="-14" y="120" width="28" height="140" rx="14" fill="#fff" transform="rotate(${a})"/>`).join("")}</g>`;
    const ribbon = `<path d="M330,820 C520,760 600,660 790,600" stroke="${C.leaf}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
    return bg(C.sky) + sub("#3F89CC", 900) + K.g(flash, "translate(430 330) scale(0.9)") +
      K.polaroid(760, 150, { w: 820, h: 560, bg: "#fff", rot: 3, inner }) + K.chip(1170, 760, "30 April · Balance Sheet", { size: 34, bg: C.ink, fg: "#fff", rot: 3 }) +
      K.g(K.filmStrip(0, 0, { frames: 2, cols: [C.leaf, C.saffron] }), "translate(80 760) rotate(-6)") + ribbon + K.chip(470, 690, "Profit ₹24,700", { size: 30, bg: C.leaf, fg: "#fff" }) +
      K.khata(430, 600, { s: 0.55, open: 0, face: "wink", armL: 110, armR: -110, handR: K.LUCIDE("camera", 70, 30, 60, C.ink) });
  };

  // L14 — where did the money go?
  S[14] = () => {
    const src = [[420, "wallet", "Meera +₹50,000"], [960, "user", "Ravi Mama +₹30,000"], [1500, "coffee", "Stall +₹23,700"]];
    let flows = "";
    src.forEach(([x, ic, l]) => {
      flows += K.medallion(x, 230, ic, { r: 58, bg: C.white, col: C.ink }) + K.chip(x, 330, l, { size: 30, bg: C.leaf, fg: "#fff" });
      flows += `<path d="M${x},370 C${x},500 ${(x + 960) / 2},520 960,600" stroke="${C.gold}" stroke-width="16" stroke-dasharray="2 26" stroke-linecap="round" fill="none"/>`;
    });
    const outs = [[1380, 760, "Cart −₹36,000"], [1500, 870, "Loan −₹3,000"], [1380, 980, "Home −₹3,000"]];
    let o = "";
    outs.forEach(([x, y, l]) => (o += K.chip(x, y, l, { size: 28, bg: C.coral, fg: "#fff" })));
    return bg(C.night) + K.stars(40, 13) + K.stringLights(30) + sub("#22304A", 900) + flows +
      K.galla(960, 780, { full: true, s: 1.3 }) + K.chip(960, 850, "₹61,700", { size: 52, bg: C.white }) +
      `<path d="M1090,700 C1200,700 1240,740 1280,760" stroke="${C.coral}" stroke-width="10" stroke-dasharray="2 20" stroke-linecap="round" fill="none"/>` + o +
      K.person("meera", 260, 990, { pose: "wave", face: "joy", s: 0.82 }) +
      K.khata(560, 1000, { s: 0.42, open: 1, face: "wink", glowL: 0.15, glowR: 0.15, armL: 20, armR: -120 }) + K.sparkle(800, 560, 1) + K.sparkle(860, 640, 0.6);
  };

  window.SCENES = S;
})();
