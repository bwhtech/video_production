// s10 — Your Turn: three picture cards (numbers only on screen — the voice carries the words); each lights as it is read; Khata holds a "?" sign.
(function () {
  window.SCENES.s10 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const XS = [420, 960, 1500], TY = 495;
    const cards = XS.map((x) => { const n = L.hide(L.node(svg, x, TY)); L.card(n, 440, 560, { stripe: C.saffron }); return n; });
    const nums = XS.map((x, i) => { const n = L.hide(L.node(svg, x - 150, TY - 250)); K.label(n, 0, 0, String(i + 1), { size: 64, bg: C.saffron, weight: 800, w: 90, h: 90 }); return n; });
    const q = XS.map((x) => { const n = L.hide(L.node(svg, x + 100, TY + 200)); K.label(n, 0, 0, "₹ ?", { size: 66, bg: "paper", weight: 800 }); return n; });
    // card 1: the cart + a "May" chip
    const c1 = L.hide(L.node(svg, XS[0], TY - 60)); { const a = K.g(c1, { transform: "scale(2.3)" }); K.cartArt(a); }
    const may = L.hide(L.node(svg, XS[0] + 120, TY - 170)); K.dateTile(may, 0, 0, 1, { month: "May", day: "?", w: 120, h: 120 });
    // card 2: the Stock jar with ₹5,000 left
    const j2 = K.jarRig(svg, XS[1], TY + 170, 1.3, { label: "Stock", icon: "leaf", contents: "leaves", fill: 0.3, amount: 5000, edge: C.dr, hidden: true });
    // card 3: the electricity bill moving from an April page to a May page, with a "?"
    const pA = L.hide(L.node(svg, XS[2] - 105, TY - 20)); K.card(pA, 0, 0, 170, 200, { header: C.coral, title: "April", titleSize: 32, headerH: 52 });
    const pM = L.hide(L.node(svg, XS[2] + 105, TY - 20)); K.card(pM, 0, 0, 170, 200, { header: C.violet, title: "May", titleSize: 32, headerH: 52 });
    const bill = L.hide(L.node(svg, XS[2] - 105, TY + 20)); { K.tex(K.shadow(bill, 1), K.cutRect(-62, -44, 124, 88, 1.4, 14), "pat-paper"); K.medallion(bill, 0, 0, 30, "zap"); }
    const qm = L.hide(L.node(svg, XS[2], TY - 160)); K.qmark(qm, 0, 0, 1.0, C.coral);
    const ring = XS.map((x) => { const n = L.hide(L.node(svg, x, TY)); K.el("path", { d: K.cutRect(-226, -286, 452, 572, 1.2, 24), fill: "none", stroke: C.gold, "stroke-width": 10 }, n); return n; });
    const khata = K.khataRig(svg, 960, 1010, 0.6, { expr: "awake" });
    const sign = L.hide(L.node(svg, 1180, 880)); { K.paper(K.shadow(sign, 1), K.cutRect(-8, -30, 16, 190, 1, 12), C.wood); K.paper(K.shadow(sign, 2), K.cutRect(-70, -150, 140, 130, 2, 18), C.cream); K.qmark(sign, 0, -80, 1.1, C.coral); }

    khata.blink(tl, T0 + 2.4); khata.blink(tl, T0 + 12);
    const tTurn = cue("s10", "@turn");
    const lights = [cue("s10", "@one"), cue("s10", "@two"), cue("s10", "@three")];
    cards.forEach((c, i) => { L.drop(tl, c, tTurn + i * 0.12, { dur: 0.4 }); L.drop(tl, nums[i], tTurn + 0.3 + i * 0.12, { dur: 0.3 }); L.drop(tl, q[i], tTurn + 0.5 + i * 0.12, { dur: 0.3 }); });
    L.drop(tl, c1, tTurn + 0.4, { dur: 0.3 }); L.drop(tl, may, tTurn + 0.6, { dur: 0.3 });
    j2.enter(tl, tTurn + 0.5);
    [pA, pM, bill].forEach((n, i) => L.drop(tl, n, tTurn + 0.6 + i * 0.1, { dur: 0.3 })); L.drop(tl, qm, tTurn + 0.9, { dur: 0.3 });
    tl.to(bill, { x: 210, duration: 0.9, ease: "power2.inOut" }, tTurn + 1.6);
    lights.forEach((t, i) => { tl.to(ring[i], { opacity: 1, duration: 0.12 }, t); tl.to(ring[i], { opacity: 0.35, duration: 0.4 }, t + 1.8); K.pulseNode(tl, cards[i], t + 0.05, 1.04); });
    const tAns = cue("s10", "@answers");
    L.drop(tl, sign, tAns - 0.2, { dur: 0.4 });
    khata.arm(tl, tAns - 0.2, "R", 130, 0.3).expr(tl, tAns, "happy");
    L.allow(svg);
  };
})();
