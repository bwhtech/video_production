// s05 — Five bridges (worked → faded → solo). Left bank: profit ₹24,700 (film frame). Right bank: cash from running the stall ₹23,700 (galla).
// Five planks close the gap one by one while a coin token (Khata's eyes) carries the ticker across: 24,700 → 25,700 → 24,700 → 18,700 → 22,700 → 23,700.
//   1 Depreciation +1,000 (Khata) · 2 Supplies −1,000 (Khata: bought / paid / used + Gopal's ₹3,000) · 3 Infotech −6,000 (Meera's pick ↓)
//   4 Advance +4,000 (Meera's pick ↑) · 5 Electricity +1,000 (the viewer: 3.2 s countdown, then ↑)
// Cash arrows are cream paper-strip arrows on a navy disc (never red/green). Out: default torn-paper wipe into s06.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L14, O = "0 0", T0 = sc.start, HI = L.HI();
    L.stage(svg, C.teal, 880);
    const W = L.node(svg, 0, 0);
    const DECK = 556, PX = [448, 704, 960, 1216, 1472], CYC = 246, X0 = 300;

    // ---- river + banks
    const bridge = K.riverBridge(W, 960, DECK, 1, { w: 1920, gap: 1280, planks: 5, hidePlanks: true });
    // left bank: profit film frame
    const fL = L.node(W, 140, DECK - 82); L.filmFrame(fL, 0, 0, 236, 160);
    const tkP = L.tick(fL, 0, 20, { size: 44, w: 200, h: 60, chip: false });
    K.text(fL, 0, -30, "Profit", { size: 34, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
    L.hide(fL);
    // right bank: the galla with cash ₹23,700
    const gal = L.node(W, 0, 0); K.galla(gal, 1766, DECK + 14, 1.3, { open: true, overflow: true });
    const tkC = L.tick(W, 1766, DECK - 215, { size: 52, w: 260, h: 80, edge: C.saffron, hidden: true });
    const cashLab = L.chip(W, 1766, DECK - 290, "Cash", { size: 36, bg: C.cream });
    L.hide(gal);
    // five empty slots (dashed) in the gap
    const slots = PX.map((x) => {
      const n = L.node(W, x, DECK + 8);
      K.el("path", { d: K.cutRect(-122, -14, 244, 30, 0.8, 24), fill: "none", stroke: C.cream, "stroke-width": 4, "stroke-dasharray": "14 9", opacity: 0.85 }, n);
      L.hide(n); return n;
    });
    const gapRing = L.ringRect(W, 330, DECK - 30, 1260, 320);

    // ---- helpers: arrow badge, plank (slab + card)
    const arrowBadge = (parent, x, y, dir, r = 32) => {
      const n = K.g(parent, { transform: `translate(${x} ${y})` });
      K.paper(K.shadow(n, 1), K.cutEll(0, 0, r, r, 1.2), C.navy);
      K.arrowShape(n, 0, 0, r * 1.0, C.cream, 1, dir === "up" ? 90 : -90, r * 0.42);
      return n;
    };
    const planks = [];
    const mkPlank = (i, title) => {
      const slab = L.node(W, PX[i], DECK);
      K.paper(K.shadow(slab, 1), K.cutRect(-122, -6, 244, 28, 0.8, 20), C.wood);
      K.ink(slab, [[-114, 8], [114, 8]], 2, C.woodDark, { opacity: 0.5 });
      const card = L.node(W, PX[i], CYC);
      L.card(card, 244, 250);
      K.text(card, 0, -104, title, { size: 36, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
      const art = K.g(card, {});
      const amt = L.node(card, 0, 96); L.hide(amt);
      L.hide(slab); L.hide(card);
      const p = { slab, card, art, amt, i };
      planks.push(p);
      return p;
    };
    const setAmount = (p, dir, str) => {
      arrowBadge(p.amt, -78, 0, dir, 30);
      K.text(p.amt, 28, 3, str, { size: 40, weight: 800 }).setAttribute("data-layout-allow-overlap", "true");
    };

    // plank 1 — Depreciation: cart + "no coin left" open hand
    const p1 = mkPlank(0, "Depreciation");
    K.cartSticker(p1.art, -38, -28, 0.8);
    const hand1 = L.node(p1.art, 66, -26); K.ruleGlyph(hand1, "palm", 0, 0, 1.9, C.ink); L.hide(hand1);
    const t1 = L.node(p1.art, 0, 46); K.text(t1, 0, 0, "₹1,000", { size: 40, weight: 700, color: C.crText }); L.hide(t1);
    setAmount(p1, "up", "+₹1,000");
    // plank 2 — Supplies: bought / paid / used
    const p2 = mkPlank(1, "Supplies");
    const rowsData = [["shopping-cart", "₹14,000", -46], ["hand-coins", "₹11,000", -2], ["leaf", "₹10,000", 42]];
    const r2 = rowsData.map(([ic, v, y]) => { const n = L.node(p2.art, 0, y); K.medallion(n, -76, 0, 22, ic); K.text(n, 18, 3, v, { size: 36, weight: 700 }).setAttribute("data-layout-allow-overlap", "true"); L.hide(n); return n; });
    setAmount(p2, "down", "−₹1,000");
    const gopal = K.claimTag(W, PX[1], CYC - 136, 0.5, { face: "gopal", amount: 3000, size: 54, hidden: true });
    // plank 3 — Infotech: tag + unpaid bill + ₹6,000
    const p3 = mkPlank(2, "Infotech");
    K.claimTag(p3.art, -48, 44, 0.62, { face: "infotech", size: 54 });
    const bill3 = L.node(p3.art, 58, -14); K.medallion(bill3, 0, 0, 40, "receipt");
    const t3 = L.node(p3.art, 0, 50); K.text(t3, 0, 0, "₹6,000", { size: 40, weight: 700, color: C.crText }); L.hide(t3);
    setAmount(p3, "down", "−₹6,000");
    // plank 4 — Advance: envelope + May 5 + ₹4,000
    const p4 = mkPlank(3, "Advance");
    K.medallion(p4.art, -44, -22, 38, "calendar-check");
    L.chip(p4.art, 52, -22, "May 5", { size: 34, bg: C.cream, hidden: false, h: 52, w: 112 });
    const t4 = L.node(p4.art, 0, 44); K.text(t4, 0, 0, "₹4,000", { size: 40, weight: 700, color: C.crText }); L.hide(t4);
    setAmount(p4, "up", "+₹4,000");
    // plank 5 — Electricity: zap + unpaid bill + ₹1,000 (the viewer's)
    const p5 = mkPlank(4, "Electricity");
    K.medallion(p5.art, -44, -22, 38, "zap"); K.medallion(p5.art, 52, -22, 34, "receipt");
    const t5 = L.node(p5.art, 0, 44); K.text(t5, 0, 0, "₹1,000", { size: 40, weight: 700, color: C.crText }); L.hide(t5);
    setAmount(p5, "up", "+₹1,000");
    const youChip = L.chip(W, PX[4], CYC - 160, HI ? "आप" : "You", { size: 40, bg: C.saffron, w: 120, h: 60 });

    // ---- the walking token + ticker
    const wk = L.node(W, X0, 0);
    const token = K.coinToken(wk, 0, DECK - 48, 0.6, { hidden: true });
    const tkW = L.tick(wk, 0, DECK - 140, { value: 24700, size: 46, w: 230, h: 70, edge: C.saffron, hidden: true });
    const walkTo = (t, x, dur = 0.6) => tl.to(wk, { x: x - X0, duration: dur, ease: "power2.inOut" }, t);

    // ---- people (foreground)
    const khata = K.khataRig(svg, 1220, 1050, 0.62, { expr: "awake" });
    const meG = L.node(svg, 0, 0);
    const m = K.meera(meG, 640, 1055, 0.74, { expr: "thinking" });
    L.hide(meG);
    // Meera's two choices (↑ / ↓), shown on her side; big versions for the viewer's turn
    const mkChoice = (x, y, r) => {
      const n = L.node(W, x, y); L.hide(n);
      const up = K.g(n, { transform: "translate(-62 0)" }), dn = K.g(n, { transform: "translate(62 0)" });
      const upi = K.g(up, {}), dni = K.g(dn, {});
      arrowBadge(upi, 0, 0, "up", r); arrowBadge(dni, 0, 0, "down", r);
      const ru = L.ring(up, 0, 0, r + 8, r + 8), rd = L.ring(dn, 0, 0, r + 8, r + 8);
      return { n, upi, dni, ru, rd };
    };
    const ch = mkChoice(930, 930, 52);
    const chYou = mkChoice(930, 930, 58);
    const pm = K.pauseMedallion(svg, 1640, 930, 0.42, { hidden: true });
    L.allow(W);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); khata.blink(tl, T0 + 2.5); khata.blink(tl, T0 + 20); khata.blink(tl, T0 + 40);
    L.drop(tl, W, T0 + 0.05);
    const cu = (seg, w, n) => cue(seg, w, n);
    // ------------------------------------------------ s05a
    const tEarned = cu("s05a", "@earned"), tTw4 = cu("s05a", "@twenty-four"), tTw3 = cu("s05a", "@twenty-three"), tGap = cu("s05a", "@gap");
    L.drop(tl, fL, tEarned - 0.1); tkP.enter(tl, tEarned); tkP.to(tl, tTw4, 24700, 0.9);
    L.drop(tl, gal, tTw3 - 0.2); L.drop(tl, cashLab, tTw3 - 0.1); tkC.enter(tl, tTw3 - 0.1); tkC.to(tl, tTw3, 23700, 0.9);
    gapRing.flash(tl, tGap, 1.2);
    slots.forEach((s, i) => L.drop(tl, s, tGap + 1.2 + i * 0.12, { dur: 0.25 }));
    // Khata hops in and lays the first two
    const tKhata = cu("s05a", "@khata");
    khata.hop(tl, tKhata, { height: 70 }); khata.expr(tl, tKhata, "happy");
    token.enter(tl, tTw4 + 0.3);
    token.blink(tl, tTw4 + 3);
    // plank 1: Depreciation
    const tDep = cu("s05a", "@depreciation"), tOne = cu("s05a", "@one"), tCoin = cu("s05a", "@coin"), tOne2 = cu("s05a", "@one", 2);
    L.lift(tl, slots[0], tDep - 0.1, { dur: 0.1 });
    L.drop(tl, p1.slab, tDep); L.drop(tl, p1.card, tDep);
    L.drop(tl, t1, tOne);
    L.drop(tl, hand1, tCoin);
    khata.arm(tl, tCoin, "R", 120);
    walkTo(tOne2 - 0.2, PX[0]); tkW.enter(tl, tOne2 + 0.2); token.hop(tl, tOne2 + 0.4, { height: 40 }); token.expr(tl, tOne2 + 0.4, "happy");
    L.drop(tl, p1.amt, tOne2 + 0.15);
    tkW.to(tl, tOne2 + 0.5, 25700, 0.7);
    // plank 2: Supplies
    const tSup = cu("s05a", "@supplies"), t14 = cu("s05a", "@fourteen"), t11 = cu("s05a", "@eleven"), tGop = cu("s05a", "@gopal"), t10 = cu("s05a", "@ten"), tOne3 = cu("s05a", "@one", 3), tLow = cu("s05a", "@lower");
    L.lift(tl, slots[1], tSup - 0.1, { dur: 0.1 });
    L.drop(tl, p2.slab, tSup); L.drop(tl, p2.card, tSup);
    L.drop(tl, r2[0], t14); L.drop(tl, r2[1], t11); L.drop(tl, r2[2], t10);
    gopal.enter(tl, tGop);
    khata.arm(tl, t14, "R", 100);
    walkTo(tOne3 - 0.2, PX[1]); token.hop(tl, tOne3 + 0.4, { height: 40 }); token.expr(tl, tOne3 + 0.4, "worried");
    L.drop(tl, p2.amt, tOne3 + 0.15);
    tkW.to(tl, tLow, 24700, 0.7);
    khata.expr(tl, tLow + 0.4, "happy");
    // ------------------------------------------------ s05b — Meera: Infotech (up or down?)
    const tM = cu("s05b", "@meera"), tInf = cu("s05b", "@infotech"), tSix = cu("s05b", "@six"), tCash = cu("s05b", "@cash"), tUp = cu("s05b", "@up"), tDn = cu("s05b", "@down");
    L.drop(tl, meG, tM - 0.2); m.hop(tl, tM - 0.1, { height: 40 }); m.expr(tl, tM, "happy");
    L.lift(tl, gopal.g, tM + 0.2);
    L.lift(tl, slots[2], tInf - 0.1, { dur: 0.1 });
    L.drop(tl, p3.slab, tInf); L.drop(tl, p3.card, tInf);
    L.drop(tl, t3, tSix);
    L.drop(tl, ch.n, tCash - 0.1);
    m.expr(tl, tCash, "thinking").look(tl, tUp, -6, -4).look(tl, tDn, 6, -4);
    ch.ru.flash(tl, tUp, 0.5); ch.rd.flash(tl, tDn, 0.5);
    // ------------------------------------------------ s05c — picks ↓
    const tDown2 = cu("s05c", "@down"), tSix2 = cu("s05c", "@six"), tLow2 = cu("s05c", "@lower");
    ch.rd.flash(tl, tDown2, 1.2); K.pulseNode(tl, ch.dni, tDown2, 1.18); tl.to(ch.upi, { opacity: 0.25, duration: 0.2 }, tDown2);
    m.expr(tl, tDown2, "happy");
    L.drop(tl, p3.amt, tSix2 - 0.05);
    walkTo(tLow2 - 0.3, PX[2]); token.hop(tl, tLow2 + 0.3, { height: 40 }); token.expr(tl, tLow2 + 0.3, "worried");
    tkW.to(tl, tLow2 + 0.4, 18700, 0.7);
    L.lift(tl, ch.n, tLow2 + 1.2);
    // ------------------------------------------------ s05d — advance (up or down?)
    const tCat = cu("s05d", "@catering"), tAdv = cu("s05d", "@advance"), tFour = cu("s05d", "@four"), tUp2 = cu("s05d", "@up"), tDn2 = cu("s05d", "@down");
    L.lift(tl, slots[3], tCat - 0.1, { dur: 0.1 });
    L.drop(tl, p4.slab, tCat); L.drop(tl, p4.card, tCat);
    L.drop(tl, t4, tFour);
    L.drop(tl, ch.n, tFour + 0.7);
    tl.set(ch.upi, { opacity: 1 }, tFour + 0.6);
    m.expr(tl, tFour + 0.6, "thinking").look(tl, tUp2, -6, -4).look(tl, tDn2, 6, -4);
    ch.ru.flash(tl, tUp2, 0.5); ch.rd.flash(tl, tDn2, 0.5);
    // ------------------------------------------------ s05e — picks ↑
    const tUp3 = cu("s05e", "@up"), tFour2 = cu("s05e", "@four"), tHigh = cu("s05e", "@higher");
    ch.ru.flash(tl, tUp3, 1.2); K.pulseNode(tl, ch.upi, tUp3, 1.18); tl.to(ch.dni, { opacity: 0.25, duration: 0.2 }, tUp3);
    m.expr(tl, tUp3, "happy");
    L.drop(tl, p4.amt, tFour2 - 0.05);
    walkTo(tHigh - 0.3, PX[3]); token.hop(tl, tHigh + 0.3, { height: 40 }); token.expr(tl, tHigh + 0.3, "happy");
    tkW.to(tl, tHigh + 0.4, 22700, 0.7);
    L.lift(tl, ch.n, tHigh + 1.4);
    // ------------------------------------------------ s05f — the viewer's: electricity
    const tLast = cu("s05f", "@last"), tElec = cu("s05f", "@electricity"), tOneE = cu("s05f", "@one"), tUpF = cu("s05f", "@up"), tDnF = cu("s05f", "@down");
    L.lift(tl, slots[4], tLast - 0.1, { dur: 0.1 });
    L.drop(tl, p5.slab, tLast); L.drop(tl, p5.card, tLast);
    L.drop(tl, youChip, tLast + 0.2);
    m.expr(tl, tLast, "happy").look(tl, tLast, 8, 0); khata.expr(tl, tLast, "wink");
    L.drop(tl, t5, tOneE);
    L.drop(tl, chYou.n, tUpF - 0.8);
    chYou.ru.flash(tl, tUpF, 0.5); chYou.rd.flash(tl, tDnF, 0.5);
    pm.enter(tl, tDnF + 0.2); pm.countdown(tl, segEnd("s05f"), { dur: 3.2 });
    // ------------------------------------------------ s05g — reveal ↑ and the landing
    const tUpG = cu("s05g", "@up"), tOneG = cu("s05g", "@one"), tLands = cu("s05g", "@lands"), tTw3b = cu("s05g", "@twenty-three");
    L.lift(tl, pm.g, tUpG - 0.1);
    chYou.ru.flash(tl, tUpG, 1.2); K.pulseNode(tl, chYou.upi, tUpG, 1.18); tl.to(chYou.dni, { opacity: 0.25, duration: 0.2 }, tUpG);
    L.drop(tl, p5.amt, tUpG + 0.1);
    walkTo(tUpG + 0.2, PX[4]); token.hop(tl, tUpG + 0.8, { height: 40 }); token.expr(tl, tUpG + 0.8, "happy");
    tkW.to(tl, tOneG + 0.4, 23700, 0.7);
    L.lift(tl, chYou.n, tOneG + 1.5); L.lift(tl, youChip, tOneG + 1.5);
    // "lands exactly": the token crosses to the right bank; both banks light
    walkTo(tLands - 0.1, 1630, 0.9); token.hop(tl, tLands + 0.9, { height: 55 }); token.expr(tl, tLands + 0.9, "wow");
    const ringL = L.ringRect(W, 0, DECK - 200, 330, 230), ringR = L.ringRect(W, 1596, DECK - 330, 324, 360);
    ringL.flash(tl, tLands + 1.0, 1.4); ringR.flash(tl, tLands + 1.0, 1.4);
    tkW.exit(tl, tLands + 0.9);
    K.pulseNode(tl, fL, tLands + 1.05, 1.06); K.pulseNode(tl, tkC.body, tLands + 1.05, 1.08);
    L.spark(W, tl, 960, DECK - 120, tLands + 1.1, 50);
    m.expr(tl, tLands + 0.8, "joy"); m.hop(tl, tLands + 1.0, { height: 50 }); khata.expr(tl, tLands + 0.8, "happy"); khata.hop(tl, tLands + 1.0);
    token.look(tl, tLands, 0, -3);
  };
})();
