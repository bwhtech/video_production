// s02 — "Accounting is counting": one continuous horizontal time-scroll the camera pans along.
//   era 1 · ~3000 BCE Mesopotamia — clay tablet, farmer, sheep → tally marks
//   era 2 · 1494 Venice — canal, Pacioli writes two columns
//   era 3 · India — merchant on a gaddi, bahi-khata unties and opens, brass diya
//   era 4 · today — phone with an app list → becomes a two-column ledger ("the idea hasn't changed")
// In: s01t pushes into a page that shows #s02-era1 at 1/3 scale → pixel-identical first frame (identity camera).
// Initial hidden states are set as DOM attributes (not tl.set) because s01t renders era 1 via <use> BEFORE s02 starts.
// Out: default torn-paper wipe into s03.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, W = 1920;
    const hide = (el, scale0) => { el.setAttribute("opacity", "0"); if (scale0) el.setAttribute("transform", "scale(0)"); return el; };
    const at = (seg, w, n) => cue(seg, w, n);

    const cam = K.g(svg, { id: "s02-cam" });
    const world = K.g(cam, { id: "s02-world" });
    const eraClip = K.el("clipPath", { id: "s02-eraclip", clipPathUnits: "userSpaceOnUse" }, svg);
    K.el("rect", { x: 0, y: -60, width: W, height: 1200 }, eraClip);
    const era = (i, id) => K.g(world, { id, transform: i ? `translate(${i * W} 0)` : undefined, "clip-path": "url(#s02-eraclip)" });
    // pivot-safe wrapper: positioned at (x,y), content drawn around local (0,0) → tween with svgOrigin "0 0"
    const pivot = (parent, x, y, fn) => {
      const pos = K.g(parent, { transform: `translate(${x} ${y})` });
      const w = K.g(pos, {}); fn(K.g(w, { transform: `translate(${-x} ${-y})` })); return w;
    };
    const chip = (parent, x, y, txt, bg) => hide(pivot(parent, x, y, (w) => K.label(w, x, y, txt, { size: 46, bg, rot: -3, shadow: 2 })));

    // ===================================================================== ERA 1 — Mesopotamia
    const e1 = era(0, "s02-era1");
    K.wall(e1, "#f3d38f", 770);
    K.paper(K.shadow(e1, 1), K.cutEll(1610, 170, 74, 74, 2), C.cream);                       // sun
    // ziggurat
    const zig = [[1180, 770], [1180, 690], [1260, 690], [1260, 610], [1350, 610], [1350, 530], [1530, 530], [1530, 610], [1620, 610], [1620, 690], [1700, 690], [1700, 770]];
    K.paper(K.shadow(e1, 1), K.cutPoly(zig, 2.2, 30), "#d9a95c");
    K.paper(e1, K.cutRect(1415, 470, 50, 60, 1.2, 12), "#c9944a");
    // palm tree
    K.paper(K.shadow(e1, 1), K.cutStroke([[250, 770], [262, 640], [282, 520], [300, 430]], 26, 2), "#8a5a32");
    [[-150, 30], [-90, -40], [0, -70], [90, -40], [150, 30]].forEach(([dx, dy]) =>
      K.paper(K.shadow(e1, 1), K.cutStroke([[300, 430], [300 + dx * 0.55, 430 + dy * 0.7 - 20], [300 + dx, 430 + dy + 40]], 30, 2.4), C.leaf));
    K.table(e1, 760);
    K.paper(e1, K.cutRect(-40, 750, 2000, 340, 0, 80), "#e2b874", { opacity: 0.38 });          // sandy ground
    // low table + clay tablet (standing on it)
    K.paper(K.shadow(e1, 2), K.cutRect(730, 742, 460, 32, 2), C.wood);
    [760, 1150].forEach((x) => K.paper(K.shadow(e1, 1), K.cutRect(x - 12, 772, 24, 150, 1, 20), C.woodDark));
    K.paper(K.shadow(e1, 2), K.cutRect(800, 420, 320, 330, 3, 26), "#c98d5b");
    K.paper(e1, K.cutRect(822, 444, 276, 282, 2, 26), "#d9a06c", { opacity: 0.85 });
    // tally marks (cuneiform-ish wedges): 1 for "counting", 3 for the sheep
    const wedge = (parent, x, y) => {
      const w = K.g(parent, {});
      K.paper(w, K.cutPoly([[x - 12, y - 16], [x + 12, y - 16], [x, y]], 0.6, 10), "#7a4a28");
      K.ink(w, [[x, y - 2], [x, y + 52]], 7, "#7a4a28");
      return hide(w);
    };
    const marks = [0, 1, 2, 3].map((i) => wedge(e1, 880 + i * 52, 520));
    const markGrain = K.g(e1, {});
    K.ink(markGrain, [[870, 650], [1050, 650]], 6, "#7a4a28");
    hide(markGrain);
    // farmer with a stylus
    const farmer = K.meera(e1, 560, 985, 0.86, {
      skin: "#a5683f", top: "#efe0bf", legs: "#efe0bf", shoes: "#6e4422", apron: false, earrings: false, collar: true,
      hair: "none", expr: "neutral", aR: [70, 30],
    });
    const stylus = K.g(farmer.handAnchor("R"), {});
    K.paper(stylus, K.cutStroke([[0, 0], [10, 70]], 9, 0.5), "#8a5a32");
    // sheep (hop in from the left)
    const sheep = [1270, 1450, 1630].map((x, i) => {
      const pos = K.g(e1, { transform: `translate(${x} 960)` });
      const mover = K.g(pos, {}); const hopG = K.g(mover, {});
      const s = K.shadow(hopG, 1);
      [[-6, 0, 30, 26], [-34, -8, 26, 24], [26, -6, 28, 24], [-12, -26, 30, 24], [16, -24, 28, 22]].forEach(([dx, dy, rx, ry]) => K.tex(s, K.cutEll(dx, dy - 40, rx * 1.15, ry * 1.1, 2), "pat-paper"));
      K.paper(hopG, K.cutEll(52, -58, 22, 18, 1.2), "#3a2a24");                                  // head
      K.paper(hopG, K.cutEll(58, -62, 4, 4, 0.3), C.white);
      [-30, -6, 18, 38].forEach((lx) => K.paper(hopG, K.cutRect(lx - 5, -22, 10, 26, 0.6, 10), "#3a2a24"));
      mover.setAttribute("transform", `translate(${-x - 200 - i * 120} 0)`);                     // start off-left
      return { mover, hopG };
    });
    const grain = hide(pivot(e1, 1250, 735, (w) => {
      K.paper(K.shadow(w, 1), K.cutEll(1250, 735, 60, 48, 2), "#c9a46a");
      K.paper(w, K.cutRect(1222, 680, 56, 18, 1, 10), "#a8834e");
    }));
    const chip1 = chip(e1, 250, 150, "3000 BCE", C.coral);

    // ===================================================================== ERA 2 — Venice, 1494
    const e2 = era(1, "s02-era2");
    K.wall(e2, "#9ccbee", 700);
    K.cloud(e2, 560, 130, 0.8); K.cloud(e2, 1500, 110, 0.7);
    [[60, 260, "#d9744a"], [330, 200, "#e3a857"], [600, 300, "#e58f7e"], [1290, 230, "#e3a857"], [1560, 280, "#d9744a"], [1820, 220, "#e58f7e"]].forEach(([x, top, col], i) => {
      K.paper(K.shadow(e2, 1), K.cutRect(x, top, 260, 720 - top, 2, 30), col);
      for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
        const wx = x + 60 + c * 100, wy = top + 60 + r * 130;
        K.paper(e2, K.cutPoly([[wx, wy + 90], [wx, wy + 30], ...K.arc(wx + 30, wy + 30, 30, Math.PI, Math.PI * 2, 8), [wx + 60, wy + 90]], 1, 14), "#5a3a2e");
      }
    });
    K.paper(K.shadow(e2, 1), K.cutRect(-40, 700, 2000, 90, 2, 40), "#cdbb9f");                   // stone quay
    K.paper(e2, K.cutRect(-40, 785, 2000, 330, 2, 60), "#3d86c6");                               // canal
    [[200, 860], [700, 920], [1250, 870], [1650, 950], [430, 1010], [1050, 1020]].forEach(([x, y]) =>
      K.ink(e2, [[x, y], [x + 40, y - 8], [x + 80, y], [x + 120, y - 8]], 5, "#a9d2f0"));
    const gondolaPos = K.g(e2, { transform: "translate(1500 880)" });
    const gondola = K.g(gondolaPos, {});
    K.paper(K.shadow(gondola, 1), K.cutPoly([[-190, -30], [-150, 0], [150, 0], [200, -40], [210, -70], [170, -20], [-160, -20], [-200, -55]], 1.4, 16), "#1f1b22");
    K.ink(gondola, [[60, -20], [100, -150]], 5, "#5a3a2e");
    // Pacioli behind his desk
    const pacioli = K.raviMama(e2, 600, 760, 0.92, {
      skin: "#c08560", top: "#6b4a33", legs: "#6b4a33", belly: false, moustache: false, glasses: true, longSleeve: true,
      topBottom: -150, expr: "happy", aR: [60, 40],
    });
    const quill = K.g(pacioli.handAnchor("R"), {});
    K.paper(quill, K.cutStroke([[0, 4], [-6, -80]], 14, 1.6), C.white);
    K.ink(quill, [[0, 4], [3, 26]], 4, C.ink);
    K.paper(K.shadow(e2, 2), K.cutRect(640, 600, 560, 34, 2), C.woodDark);                       // desk top
    K.paper(K.shadow(e2, 2), K.cutRect(660, 630, 520, 140, 2.5), C.wood);                        // desk front
    // big open book on the desk + two columns of entries
    K.tex(K.shadow(e2, 2), K.cutPoly([[760, 600], [940, 586], [940, 470], [760, 486]], 1.4, 20), "pat-paper");
    K.tex(K.shadow(e2, 2), K.cutPoly([[940, 586], [1120, 600], [1120, 486], [940, 470]], 1.4, 20), "pat-paper");
    K.ink(e2, [[940, 470], [940, 586]], 3, C.goldDark);
    const lines = [];
    for (let r = 0; r < 4; r++) {
      [[780, 920], [960, 1100]].forEach(([x0, x1], c) => {
        const y = 506 + r * 22 + (c ? 0 : -r * 2);
        const ln = pivot(e2, x0, y, (w) => K.ink(w, [[x0, y], [x1 - 30, y + (c ? 2 : -2)]], 4, C.ink));
        hide(ln); lines.push([ln, "0 0"]);
      });
    }
    const coinsV = [K.g(e2, {}), K.g(e2, {})];
    K.coin(coinsV[0], 850, 450, 20); K.coin(coinsV[1], 1030, 450, 20);
    coinsV.forEach((c) => hide(c));
    const chip2 = chip(e2, 230, 150, "1494", C.dr);

    // ===================================================================== ERA 3 — India, bahi-khata
    const e3 = era(2, "s02-era3");
    K.wall(e3, C.teal, 770);
    // arched window with a jaali
    K.paper(K.shadow(e3, 1), K.cutPoly([[1300, 640], [1300, 330], ...K.arc(1440, 330, 140, Math.PI, Math.PI * 2, 12), [1580, 640]], 2, 24), "#f7e2b6");
    for (let i = 0; i < 5; i++) K.ink(e3, [[1310 + i * 64, 640], [1310 + i * 64, 290 + Math.abs(2 - i) * 40]], 4, "#c99a52", { opacity: 0.8 });
    for (let j = 0; j < 4; j++) K.ink(e3, [[1306, 360 + j * 70], [1574, 360 + j * 70]], 4, "#c99a52", { opacity: 0.8 });
    K.table(e3, 770);
    // gaddi + bolster — a maroon cushion so the merchant's white kurta-pajama reads against it
    K.paper(K.shadow(e3, 2), K.cutRect(420, 700, 900, 100, 2.4), "#8e3b2c");
    K.paper(e3, K.cutRect(430, 708, 880, 14, 1, 30), "#b4583f");
    K.paper(K.shadow(e3, 2), K.cutEll(470, 690, 70, 46, 2), "#c2763f");
    // the merchant sits cross-legged ON the gaddi (review fix: he read as legless standing behind it)
    const merchant = K.merchant(e3, 760, 742, 0.9, { sit: true, expr: "happy", aR: [40, 60], aL: [20, 40] });
    {
      const lap = K.shadow(merchant.body, 2);
      K.paper(lap, K.cutPoly([[-140, -84], [140, -84], [158, -40], [122, -6], [-122, -6], [-158, -40]], 1.6, 18), "#f3ede2");
      K.ink(lap, [[-8, -78], [10, -14]], 4, "#d9cfbf");                       // the crossing fold
      K.paper(lap, K.cutEll(-112, -20, 30, 14, 1), "#8d5a3b");               // tucked feet
      K.paper(lap, K.cutEll(112, -20, 30, 14, 1), "#8d5a3b");
    }
    // low desk + bahi-khata
    K.paper(K.shadow(e3, 2), K.cutRect(900, 650, 380, 34, 2), C.woodDark);
    [930, 1250].forEach((x) => K.paper(K.shadow(e3, 1), K.cutRect(x - 10, 680, 20, 110, 1, 18), C.woodDark));
    const bookClosed = K.g(e3, {});
    K.tex(K.shadow(bookClosed, 2), K.cutRect(1000, 560, 180, 94, 1.6), "pat-cover");
    K.paper(bookClosed, K.cutRect(1000, 600, 180, 12, 1, 14), C.gold);
    K.paper(bookClosed, K.cutEll(1090, 606, 12, 12, 0.6), C.gold);
    const bookOpen = pivot(e3, 1090, 600, (bo) => {
    K.tex(K.shadow(bo, 2), K.cutPoly([[930, 650], [1090, 640], [1090, 556], [930, 566]], 1.2, 16), "pat-paper");
    K.tex(K.shadow(bo, 2), K.cutPoly([[1090, 640], [1250, 650], [1250, 566], [1090, 556]], 1.2, 16), "pat-paper");
    for (let r = 0; r < 3; r++) { K.ink(bo, [[945, 582 + r * 20], [1075, 576 + r * 20]], 3, C.red, { opacity: 0.7 }); K.ink(bo, [[1105, 576 + r * 20], [1235, 582 + r * 20]], 3, C.red, { opacity: 0.7 }); }
    K.ink(bo, [[1090, 556], [1090, 640]], 3, C.redDark);
    });
    hide(bookOpen);
    const loose = hide(pivot(e3, 1090, 600, (w) => K.tex(w, K.cutPoly([[1090, 640], [1250, 650], [1250, 566], [1090, 556]], 1.2, 16), "pat-paper")));
    // brass diya
    K.paper(K.shadow(e3, 1), K.cutPoly([[1330, 770], [1440, 770], [1420, 800], [1350, 800]], 1, 12), C.brass);
    const flamePos = K.g(e3, { transform: "translate(1385 768)" });
    const flame = K.g(flamePos, {});
    K.paper(flame, K.cutPoly([[0, 0], [-16, -18], [-8, -44], [0, -64], [8, -44], [16, -18]], 1, 10), C.saffron);
    K.paper(flame, K.cutPoly([[0, -4], [-7, -18], [0, -38], [7, -18]], 0.6, 8), C.cream);

    // ===================================================================== ERA 4 — today
    const e4 = era(3, "s02-era4");
    K.wall(e4, C.cream, 780);
    K.paper(e4, K.cutRect(1380, 160, 360, 300, 2, 30), "#f3e3c8");
    K.ink(e4, [[1560, 160], [1560, 460]], 4, "#e6d2b2"); K.ink(e4, [[1380, 310], [1740, 310]], 4, "#e6d2b2");
    K.table(e4, 780);
    K.paper(K.shadow(e4, 2), K.cutRect(300, 770, 1320, 40, 2.2), C.wood);
    K.tumbler(e4, 1300, 772, 1.8);
    // phone on a little stand
    const phonePos = K.g(e4, { transform: "translate(960 760)" });
    const phone = K.g(phonePos, {});
    K.paper(K.shadow(phone, 3), K.cutRect(-170, -600, 340, 600, 2, 30), "#2b2233");
    K.tex(phone, K.cutRect(-148, -570, 296, 530, 1.4, 30), "pat-paper");
    K.paper(phone, K.cutRect(-30, -590, 60, 10, 0.6, 10), "#4a4150");
    const apps = [["coffee", C.saffron], ["shopping-bag", C.coral], ["indian-rupee", C.leaf], ["calendar", C.sky]].map(([ic, col], i) => {
      const a = K.g(phone, {});
      const y = -540 + i * 118;
      K.paper(K.shadow(a, 1), K.cutRect(-126, y, 252, 96, 1.4, 20), col);
      K.medallion(a, -80, y + 48, 30, ic);
      K.paper(a, K.cutRect(-34, y + 26, 130, 14, 0.8, 14), C.white, { opacity: 0.85 });
      K.paper(a, K.cutRect(-34, y + 54, 90, 12, 0.8, 14), C.white, { opacity: 0.6 });
      return hide(a);
    });
    const ledgerScr = pivot(phone, 0, -305, (ls) => {
    K.paper(ls, K.cutRect(-126, -540, 252, 470, 1.4, 20), C.white);
    K.ink(ls, [[0, -520], [0, -90]], 4, C.goldDark);
    for (let r = 0; r < 5; r++) { K.ink(ls, [[-110, -480 + r * 70], [-20, -480 + r * 70]], 5, C.dr); K.ink(ls, [[20, -480 + r * 70], [110, -480 + r * 70]], 5, C.cr); }
    });
    hide(ledgerScr);
    const chip4 = chip(e4, 230, 150, "today", C.violet);

    // ===================================================================== timeline
    const T0 = sc.start;
    const S = (d, e = "power2.out") => ({ duration: d, ease: e });
    const step = (d, t, e = "power2.out") => ({ duration: d, ease: K.stepEase(d, e, t) });
    const popIn = (el, t, o = "0 0", d = 0.34) => tl.fromTo(el, { opacity: 0, scale: 1.07, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: Math.max(d, 0.34), ease: "power2.out" }, t);  // drop-and-place

    // camera: picks up the page push gently, then pans era to era (smooth object-flight)
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 540" }, { scale: 1.05, svgOrigin: "960 540", duration: 1.6, ease: "power2.out" }, T0);
    const pan = (k, t) => tl.to(world, { x: -k * W, ...S(1.5, "power3.inOut") }, t);
    const tE2 = at("s02", "@about") - 0.55, tE3 = at("s02", "@and", 2) - 0.45, tE4 = at("s02", "@today") - 0.55;
    pan(1, tE2); pan(2, tE3); pan(3, tE4);

    // ERA 1
    farmer.look(tl, at("s02", "@scary") - 0.1, 6, 2).expr(tl, at("s02", "@scary"), "worried");
    const tCounting = at("s02", "@counting");
    const tap = (t, mark) => {
      farmer.arm(tl, t - 0.2, "R", 82, 22, 0.17);
      farmer.arm(tl, t + 0.05, "R", 70, 30, 0.17);
      tl.fromTo(mark, { opacity: 0, scale: 1.07, svgOrigin: "0 0" }, { opacity: 1, scale: 1, svgOrigin: "0 0", ...step(0.17, t, "power2.out") }, t);
    };
    farmer.expr(tl, tCounting - 0.3, "happy");
    tap(tCounting, marks[0]);
    popIn(chip1, at("s02", "@five"), "0 0");
    // sheep trot in on "Mesopotamia", one by one
    const tMeso = at("s02", "@mesopotamia");
    sheep.forEach((s, i) => {
      const t = tMeso + i * 0.35, d = 1.3;
      tl.to(s.mover, { x: 0, duration: d, ease: K.stepEase(d, "power1.out", t) }, t);
      for (let h = 0; h < 4; h++) tl.to(s.hopG, { y: h % 2 ? 0 : -16, duration: 1 / 15, ease: "none" }, t + h * (d / 4));
      tl.set(s.hopG, { y: 0 }, t + d);
    });
    farmer.look(tl, tMeso, 9, 0);
    // "count their sheep" — each sheep hops, a wedge appears for each
    const tCount = at("s02", "@count");
    sheep.forEach((s, i) => {
      const t = tCount + i * 0.32;
      tl.to(s.hopG, { y: -34, ...step(0.17, t, "power2.out") }, t);
      tl.to(s.hopG, { y: 0, ...step(0.17, t + 0.17, "power2.in") }, t + 0.17);
      tap(t + 0.12, marks[i + 1]);
    });
    farmer.look(tl, tCount, 4, -2);
    const tGrain = at("s02", "@grain");
    popIn(grain, tGrain, "0 0");
    tl.fromTo(markGrain, { opacity: 0 }, { opacity: 1, duration: 0.1 }, tGrain + 0.15);
    farmer.expr(tl, tGrain + 0.2, "grin");

    // ERA 2
    tl.to(gondola, { x: -420, duration: 14, ease: K.stepEase(14, "none", tE2) }, tE2);
    popIn(chip2, at("s02", "@venice"), "0 0");
    const tPac = at("s02", "@pacioli");
    pacioli.look(tl, tPac - 0.2, 0, -3).headTilt(tl, tPac, -5).expr(tl, tPac, "grin");
    const tWrote = at("s02", "@wrote");
    pacioli.look(tl, tWrote, 8, 5).headTilt(tl, tWrote, 4);
    lines.forEach(([ln, o], i) => {
      const t = tWrote + 0.1 + i * 0.32;
      tl.fromTo(ln, { opacity: 1, scaleX: 0, svgOrigin: o }, { opacity: 1, scaleX: 1, svgOrigin: o, ...step(0.25, t, "power1.out") }, t);
      pacioli.arm(tl, t, "R", i % 2 ? 66 : 58, i % 2 ? 36 : 44, 0.17);
    });
    const tMoney = at("s02", "@money");
    coinsV.forEach((c, i) => {
      const t = tMoney + i * 0.18;
      tl.fromTo(c, { opacity: 1, y: -120 }, { opacity: 1, y: 0, immediateRender: false, ...step(0.25, t, "power2.in") }, t);
      tl.to(c, { y: -10, ...step(0.12, t + 0.25, "power2.out") }, t + 0.25);
      tl.to(c, { y: 0, ...step(0.12, t + 0.37, "power2.in") }, t + 0.37);
    });

    // ERA 3
    const tIndian = at("s02", "@indian");
    merchant.look(tl, tIndian, 0, -3).wave(tl, tIndian + 0.1, "L", 2).expr(tl, tIndian, "grin");
    const tBooks = at("s02", "@books");
    merchant.arm(tl, tBooks - 0.15, "R", 70, 30, 0.2).look(tl, tBooks, 8, 6);
    const tBK = at("s02", "@bahi-khata");
    tl.set(bookClosed, { opacity: 0 }, tBK);
    popIn(bookOpen, tBK, "0 0", 0.25);
    tl.set(loose, { opacity: 1 }, at("s02", "@centuries") - 0.05);
    tl.fromTo(loose, { scaleX: 1, svgOrigin: "0 0" }, { scaleX: -1, svgOrigin: "0 0", ...step(0.42, at("s02", "@centuries"), "power1.inOut") }, at("s02", "@centuries"));
    tl.set(loose, { opacity: 0 }, at("s02", "@centuries") + 0.45);
    for (let i = Math.ceil(tE3 * 15); i < Math.floor((sc.end + 0.6) * 15); i += 2)
      tl.set(flame, { scaleY: 1 + K.sh(i) * 0.08, scaleX: 1 + K.sh(i + 5) * 0.06, rotation: K.sh(i + 9) * 4, svgOrigin: "0 0" }, i / 15);

    // ERA 4
    popIn(chip4, at("s02", "@today") + 0.2, "0 0");
    const tApps = at("s02", "@apps");
    apps.forEach((a, i) => tl.fromTo(a, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ...step(0.25, tApps - 0.5 + i * 0.12, "power2.out") }, tApps - 0.5 + i * 0.12));
    for (let i = 0; i < 4; i++) tl.set(phone, { x: i % 2 ? -1.5 : 1.5, svgOrigin: "0 0" }, tApps + i / 15);
    tl.set(phone, { x: 0, rotation: 0 }, tApps + 0.5);
    const tChanged = at("s02", "@changed");
    tl.to(apps, { opacity: 0, duration: 0.12, stagger: 0.04 }, tChanged - 0.45);
    popIn(ledgerScr, tChanged - 0.25, "0 0", 0.3);

    // acting texture
    [farmer, pacioli, merchant].forEach((r, i) => { r.blinks(tl, T0, sc.end, 3.4, 5 + i); r.jitter(tl, T0, sc.end + 0.6, { seed: 60 + i }); });
  };
})();
