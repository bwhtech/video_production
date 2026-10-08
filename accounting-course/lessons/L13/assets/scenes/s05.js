// s05 — Faded: equity. Meera fills L4's Equity card (three pockets) on the right page: ₹50,000 capital drops into Capital; the P&L film strip's Net frame (₹24,700) glides into Profit;
// she hesitates with the ₹3,000 wallet slip over Profit — Khata "!" — then sets it in Drawings; countdown; ₹71,700; Apr 1 ₹50,000 → Apr 30 ₹71,700; "the trial balance was only a check — this photo is the picture".
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    const cam = K.g(svg, {});
    L13.stage(cam, C.sky, 880);
    const sp = L13.spread(cam);
    sp.tints.L.setAttribute("opacity", "1"); sp.tints.R.setAttribute("opacity", "1");
    const CXL = sp.L.cx, CXR = sp.R.cx;

    // collapsed Assets / Liabilities lines (finished in s03 / s04)
    const lA = L13.row(cam, CXL, 232, 720, { icon: "coins", label: "Assets", value: 106700, side: "L", h: 92 });
    const lL = L13.row(cam, CXR, 232, 720, { icon: "handshake", label: "Liabilities", value: 35000, side: "R", h: 92 });
    tl.set(lA.n, { opacity: 1 }, T0); tl.set(lL.n, { opacity: 1 }, T0);
    lA.tk.set(tl, T0 + 0.02, 106700); lL.tk.set(tl, T0 + 0.02, 35000);

    // the Equity card (3 pockets). Capital starts at ₹0 and counts when the bundle lands.
    const CARD = [1388, 810, 1.0];
    const card = K.equityCard(cam, CARD[0], CARD[1], CARD[2], { pockets: 3, capital: 0 });
    card.tag.setAttribute("opacity", "0");
    const pk = (name) => ({ x: CARD[0] + { Capital: -226, Profit: 0, Drawings: 226 }[name] * CARD[2], y: CARD[1] });

    // Meera, in front of the right edge, looking at the card
    const m = K.meera(cam, 1838, 1018, 0.72, { expr: "happy", lookX: -6 });
    // answer chip under the card: "₹ ?" → ticker
    const qT = L13.node(cam, CARD[0], 880); K.text(qT, 0, 0, "₹ ?", { size: 70, weight: 800, color: C.crText }); L13.hide(qT);
    const eqT = K.ticker(cam, CARD[0], 880, 1, { value: 0, size: 64, chip: true, w: 330, h: 88, edge: C.cr, hidden: true });

    // the 50,000 bundle (falls into Capital)
    const bun = L13.node(cam, pk("Capital").x, 360); K.bundle(bun, 0, 0, 0.8, 0); L13.hide(bun);
    // film strip (the L12 P&L movie) — slides in at the top and "unspools"
    const SX = 1000, SY = 72, SW = 640, SH = 96;
    const stripN = L13.node(cam, SX, SY); L13.hide(stripN);
    const strip = K.filmStrip(stripN, 0, 0, SW, SH, ["banknote", "leaf", "key", "user", "zap", "percent", "trending-down"], 0, { resultFrames: 2 });
    const rf = strip.resultFrames[1];
    // the Net frame (ruled cream card) that detaches and glides: drawn at final size, starts at frame size
    const fr = L13.node(cam, SX + rf.cx, SY); L13.hide(fr);
    const FW = 164, FH = 188;
    K.tex(K.shadow(fr, 2), K.cutRect(-FW / 2, -FH / 2, FW, FH, 1.4, 16), "pat-paper");
    [-30, 22].forEach((yy) => K.ink(fr, [[-FW / 2 + 14, yy], [FW / 2 - 14, yy]], 3, "#a39684", { opacity: 0.8 }));
    K.ink(fr, [[-FW / 2 + 14, 62], [FW / 2 - 14, 62]], 6, C.ink);
    K.text(fr, 0, -62, "Net", { size: 38, weight: 800 });
    K.text(fr, 0, 6, "₹24,700", { size: 36, weight: 800 });
    // Meera's ₹3,000 slip (wallet) — hovers over Profit, then Drawings
    const slipN = L13.node(cam, 1700, 740); L13.hide(slipN);
    const sg = K.g(slipN, {});
    K.tex(K.shadow(sg, 1), K.cutRect(-98, -42, 196, 84, 1.4, 18), "pat-paper");
    K.icon(sg, "wallet", -64, 0, 38, C.ink, 2.4); K.text(sg, 22, 2, "−₹3,000", { size: 34, weight: 800, color: C.coralText });
    // Khata's "!"
    const bang = L13.node(cam, 960, 470); L13.hide(bang);
    K.tex(K.shadow(bang, 1), K.cutEll(0, 0, 40, 40, 0.8), "pat-paper"); K.text(bang, 0, 3, "!", { size: 64, weight: 800, color: C.coralText });
    // countdown medallion (left page centre) + two-point strip + the mini TB flash
    const pm = K.pauseMedallion(cam, CXL, 600, 1.0, { hidden: true });
    const two = L13.node(cam, CXL, 520); L13.hide(two);
    const mkChip = (x, date) => { const c = L13.node(two, x, 0); L13.card(c, 300, 130); K.text(c, 0, -34, date, { size: 40, font: "kalam", weight: 700 }); return c; };
    const c1 = mkChip(-240, "Apr 1"), c2 = mkChip(240, "Apr 30");
    const t1 = K.ticker(c1, 0, 18, 1, { value: 0, size: 50, anchor: "middle" }), t2 = K.ticker(c2, 0, 18, 1, { value: 0, size: 50, anchor: "middle" });
    L13.hide(c1); L13.hide(c2);
    const arrow = K.g(two, {}); K.ink(arrow, [[-84, 0], [84, 0]], 9, C.ink); K.paper(arrow, K.cutPoly([[72, -26], [72, 26], [112, 0]], 0.6, 8), C.ink); arrow.setAttribute("opacity", "0");
    const plus = L13.node(two, -10, -86); K.medallion(plus, 0, 0, 36, "film"); L13.hide(plus);
    const minus = L13.node(two, 60, 96); K.medallion(minus, 0, 0, 36, "wallet"); L13.hide(minus);
    const tb = L13.node(cam, CXL, 800); L13.hide(tb);
    L13.card(tb, 420, 190);
    K.paper(tb, K.cutRect(-170, -60, 150, 40, 1, 12), C.dr); K.paper(tb, K.cutRect(20, -60, 150, 40, 1, 12), C.cr);
    K.text(tb, 0, -40, "=", { size: 44, weight: 800 });
    K.paper(tb, K.cutRect(-170, -2, 150, 28, 0.8, 10), C.dr, { opacity: 0.6 }); K.paper(tb, K.cutRect(20, -2, 150, 28, 0.8, 10), C.cr, { opacity: 0.6 });
    const tick = K.tickMark(tb, 0, 60, 1, { color: C.ink, w: 70 });
    L13.allow(svg);

    // ======================================================================== timeline
    sp.face.look(tl, T0 + 0.5, 4, 2);
    sp.face.blink(tl, T0 + 4).blink(tl, T0 + 20).blink(tl, T0 + 40).blink(tl, T0 + 58);
    m.blinks(tl, T0 + 1.0, sc.end, 3.3);
    card.unfold(tl, T0 + 0.15);
    // s05a — "whatever is left belongs to Meera. That's her equity." (card pulses on 'equity'), Meera does this one
    K.pulseNode(tl, card.body, cue("s05a", "@equity") + 0.1, 1.04);
    m.expr(tl, cue("s05a", "@meera", 2), "proud");
    // "fifty thousand rupees of capital" — the bundle drops into Capital
    const tCap = cue("s05a", "@capital");
    tl.set(bun, { autoAlpha: 1 }, tCap - 0.45);
    tl.fromTo(bun, { y: 0 }, { y: 300, duration: 0.5, ease: "power2.in", immediateRender: false }, tCap - 0.45);
    tl.to(bun, { autoAlpha: 0, scale: 0.8, svgOrigin: O, duration: 0.18 }, tCap + 0.1);
    card.pockets.Capital.ticker.to(tl, tCap + 0.15, 50000, 0.8);
    card.light(tl, tCap + 0.5, "Capital");
    // "now watch the movie's last frame" — the strip slides in from the top-left and unspools
    const tMov = cue("s05a", "@movie's");
    tl.set(stripN, { autoAlpha: 1 }, tMov - 0.1);
    tl.fromTo(stripN, { x: -420, y: -110 }, { x: 0, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, tMov - 0.1);
    tl.fromTo(strip, { scaleX: 0.3, svgOrigin: `${-SW / 2} 0` }, { scaleX: 1, svgOrigin: `${-SW / 2} 0`, duration: 0.8, ease: "power2.out", immediateRender: false }, tMov + 0.3);
    // s05b — the Net frame glides into Profit
    const tProf = cue("s05b", "@profit"), tSl = cue("s05b", "@slides");
    const land = { x: pk("Profit").x - (SX + rf.cx), y: 660 - SY };
    tl.set(fr, { autoAlpha: 1, scale: 0.4, svgOrigin: O }, tProf - 0.1);
    tl.to(fr, { scale: 0.42, svgOrigin: O, duration: 0.15 }, tProf - 0.1);
    m.expr(tl, tSl, "amazed");
    tl.to(fr, { x: land.x, duration: 1.3, ease: "power1.inOut" }, tSl - 0.1);
    tl.to(fr, { y: 250, scale: 1, duration: 0.55, ease: "power2.out" }, tSl - 0.1);
    tl.to(fr, { y: land.y, duration: 0.75, ease: "power2.in" }, tSl + 0.45);
    const tLand = tSl + 1.2;
    tl.to(fr, { autoAlpha: 0, scale: 0.85, svgOrigin: O, duration: 0.2, ease: "power2.in" }, tLand + 0.1);
    card.pocketTick(tl, tLand + 0.1, "Profit", 24700, 0.8);
    card.light(tl, tLand + 0.3, "Profit");
    K.pulseNode(tl, card.body, cue("s05b", "@owner") + 0.3, 1.03);
    // s05c — the hesitation: slip over Profit, Khata "!", then into Drawings
    const tTake = cue("s05c", "@take"), tHome = cue("s05c", "@home"), tTook = cue("s05c", "@took");
    tl.set(slipN, { autoAlpha: 1 }, tTake);
    tl.fromTo(slipN, { x: 0, y: 0, scale: 1.06 }, { x: pk("Profit").x - 1700, y: 560 - 740, scale: 1, svgOrigin: O, duration: 1.0, ease: "power2.out", immediateRender: false }, tTake);
    m.arm(tl, tTake, "L", 105, 10, 0.4).expr(tl, tTook - 0.1, "worried");
    const tBang = tTook + 0.5;
    L13.drop(tl, bang, tBang, { dur: 0.25 }); sp.face.expr(tl, tBang, "wow"); L13.lift(tl, bang, tBang + 0.95, { dur: 0.2 });
    const tMove = tTook + 1.35;
    tl.to(slipN, { x: pk("Drawings").x - 1700, y: 600 - 740, duration: 0.5, ease: "power2.inOut" }, tMove);
    m.expr(tl, tMove, "happy").arm(tl, tMove, "L", 100, 12, 0.4);
    tl.to(slipN, { autoAlpha: 0, duration: 0.1 }, tMove + 0.55);
    card.slip(tl, tMove + 0.5, "Drawings", -3000, { icon: "wallet", from: [0, -50], dur: 0.35 });
    sp.face.expr(tl, tMove + 0.6, "awake");
    m.arm(tl, tMove + 0.9, "L", 12, 8, 0.4);
    // countdown + "₹ ?"
    const tPause = cue("s05c", "@pause");
    L13.drop(tl, qT, tPause - 0.3);
    pm.enter(tl, tPause + 0.1);
    const tCd = segEnd("s05c") + 0.15;
    pm.countdown(tl, tCd, { dur: 2.55 });
    m.expr(tl, tPause, "thinking");
    // s05d — ₹71,700
    const tRev = cue("s05d", "@seventy-one");
    pm.exit(tl, tRev - 0.2);
    tl.set(qT, { autoAlpha: 0 }, tRev - 0.05);
    eqT.enter(tl, tRev); eqT.to(tl, tRev + 0.05, 71700, 0.9);
    m.expr(tl, tRev, "proud");
    K.pulseNode(tl, eqT.g, tRev + 1.1, 1.06);
    // Apr 1 ₹50,000 → Apr 30 ₹71,700
    const tSh = cue("s05d", "@share");
    L13.drop(tl, two, tSh - 0.2); L13.drop(tl, c1, tSh - 0.1); t1.to(tl, tSh, 50000, 0.7);
    const tEnd = cue("s05d", "@ends");
    tl.to(arrow, { opacity: 1, duration: 0.3 }, tEnd - 0.4);
    L13.drop(tl, c2, tEnd - 0.1); t2.to(tl, tEnd, 71700, 0.8);
    L13.drop(tl, plus, cue("s05d", "@profit") - 0.1);
    L13.drop(tl, minus, cue("s05d", "@difference") - 1.4);
    // "last lesson's trial balance was only a check" — mini TB flashes and dims; "this photo is the real picture" — the spread lifts 2 %
    const tCk = cue("s05d", "@check");
    L13.drop(tl, tb, tCk - 0.4); tick.draw(tl, tCk, 0.35);
    tl.to(tb, { opacity: 0.35, duration: 0.4 }, tCk + 1.0);
    const tPic = cue("s05d", "@picture");
    tl.to(cam, { scale: 1.02, svgOrigin: "960 560", duration: 0.5, ease: "power2.out" }, tPic - 0.2);
    tl.to(cam, { scale: 1, svgOrigin: "960 560", duration: 0.6, ease: "power2.inOut" }, tPic + 0.4);
    sp.face.expr(tl, tPic, "happy");
  };
})();
