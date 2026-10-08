// s02 — Last time. L10's three Your-Turn answers on three cards (each answer restates its question):
//   1 · the cart sticker + a May month tile -> ₹1,000 · 2 · Stock jar ₹14,000 − ₹5,000 -> Cost of supplies used ₹9,000 · 3 · the April bill clears the Electricity payable (not an expense).
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera). Initial hidden states are DOM attributes.
// Out: default torn-paper wipe into s03.
(function () {
  window.OWN_SEAM_IN.s02 = true;
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L.stage(world, C.teal, 880);
    const cal = L.cal(world, 30);
    const CX = [330, 960, 1590], CY = 505, CW = 560, CH = 640;

    const mk = (i) => {
      const n = L.node(world, CX[i], CY);
      L.card(n, CW, CH);
      const ring = L.ring(n, CW, CH);
      const num = L.num(n, -CW / 2 + 52, -CH / 2 + 52, i + 1, 36);
      const tick = L.tick(n, CW / 2 - 56, -CH / 2 + 56, 32); L.hide(tick);
      L.hide(n);
      return { n, ring, tick, art: K.g(n, {}) };
    };
    const cards = [0, 1, 2].map(mk);

    // ---- card 1: cart sticker + May month tile -> ₹1,000
    const a1 = cards[0].art;
    const cart = L.node(a1, 0, -85); L.hide(cart); K.cartSticker(cart, 0, 0, 1.55);
    const may = L.node(a1, 150, -190); L.hide(may);
    K.paper(K.shadow(may, 1), K.cutRect(-70, -64, 140, 128, 1.4, 16), C.cream); K.paper(may, K.cutRect(-70, -64, 140, 38, 1, 12), C.coral);
    K.text(may, 0, -45, "May", { size: 32, weight: 800, color: "#fff" });
    const tile = L.node(a1, 0, 130); L.hide(tile);
    const amt1 = K.ticker(tile, 0, 0, 1, { value: 0, size: 70, chip: true, w: 330, h: 108, edge: C.dr });

    // ---- card 2: Stock jar (₹5,000 left) · ₹14,000 − ₹5,000 · Cost of supplies used ₹9,000
    const a2 = cards[1].art;
    const c14 = L.chip(a2, -130, -165, 220, 76, "₹14,000", { size: 42, edge: C.dr }); L.hide(c14);
    const minus = L.node(a2, 0, -166); L.hide(minus); K.text(minus, 0, 2, "−", { size: 64, weight: 800 });
    const c5 = L.chip(a2, 130, -165, 200, 76, "₹5,000", { size: 42, edge: C.cr }); L.hide(c5);
    const stockJar = K.jarRig(a2, -125, 205, 1.08, { label: "Stock", contents: "leaves", fill: 0.3, amount: 5000, edge: C.dr, hidden: true });
    const costJar = K.jarRig(a2, 125, 205, 1.08, { icon: "package", contents: "leaves", fill: 0.7, amount: 0, edge: C.dr, hidden: true });

    // ---- card 3: the April bill clears the Electricity payable (not an expense)
    const a3 = cards[2].art;
    const bill = L.node(a3, -140, -150); L.hide(bill);
    K.tex(K.shadow(bill, 1), K.cutRect(-62, -78, 124, 156, 1.6, 16), "pat-paper"); K.medallion(bill, 0, -16, 40, "zap");
    K.ink(bill, [[-40, 38], [40, 38]], 3, "#a39684"); K.ink(bill, [[-40, 56], [14, 56]], 3, "#a39684");
    const aprTile = L.chip(a3, 110, -165, 150, 70, "Apr", { size: 38, edge: C.coral }); L.hide(aprTile);
    const payJar = K.jarRig(a3, 100, 215, 1.05, { icon: "zap", contents: "notes", fill: 0.4, amount: 1000, edge: C.cr, hidden: true });
    const exp = L.node(a3, -140, 110); L.hide(exp);
    K.paper(K.shadow(exp, 1), K.cutRect(-62, -78, 124, 156, 1.6, 16), C.cream, { opacity: 0.55 });
    K.el("path", { d: K.cutRect(-62, -78, 124, 156, 1.2, 16), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "12 10", opacity: 0.5 }, exp);
    K.medallion(exp, 0, -16, 34, "receipt");
    const expX = L.cross(exp, 0, 40, 30); L.hide(expX);
    const coin = L.node(a3, 100, 40); L.hide(coin); K.coin(coin, 0, 0, 24);
    const khata = K.khataRig(svg, 960, 1060, 0.42, { expr: "awake" });
    L.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 17); khata.jitter(tl, T0, sc.end);
    const dim = (i, t) => tl.to(cards[i].n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, t);
    const lit = (i, t) => { tl.to(cards[i].ring, { opacity: 1, duration: 0.15 }, t); tl.to(cards[i].ring, { opacity: 0, duration: 0.3 }, t + 0.9); L.drop(tl, cards[i].tick, t, { dur: 0.3 }); };

    // 1 — May's depreciation: ₹1,000, the same fair slice every month
    const c1 = cards[0];
    L.drop(tl, c1.n, cue("s02a", "@one") - 0.3, { dur: 0.4 });
    L.drop(tl, cart, cue("s02a", "@one") + 0.2, { dur: 0.35 });
    L.drop(tl, may, cue("s02a", "@depreciation") - 0.2, { dur: 0.35 });
    L.drop(tl, tile, cue("s02a", "@thousand") - 0.2, { dur: 0.35 }); amt1.to(tl, cue("s02a", "@thousand"), 1000, 0.7);
    lit(0, cue("s02a", "@slice") + 0.3);
    // 2 — five thousand of stock left -> 14,000 − 5,000 = 9,000
    dim(0, cue("s02b", "@two") - 0.2);
    const c2 = cards[1];
    L.drop(tl, c2.n, cue("s02b", "@two") - 0.2, { dur: 0.4 });
    stockJar.enter(tl, cue("s02b", "@five") - 0.1, { dur: 0.35 });
    L.drop(tl, c14, cue("s02b", "@fourteen") - 0.1, { dur: 0.3 });
    L.drop(tl, minus, cue("s02b", "@minus") - 0.05, { dur: 0.25 }); L.drop(tl, c5, cue("s02b", "@minus") + 0.1, { dur: 0.3 });
    costJar.enter(tl, cue("s02b", "@nine") - 0.3, { dur: 0.35 }); costJar.tick(tl, cue("s02b", "@nine") - 0.1, 0, 9000, 0.8);
    lit(1, cue("s02b", "@nine") + 0.9);
    // 3 — Paying April's bill in May: not a May expense; it just clears the payable
    dim(1, cue("s02c", "@three") - 0.2);
    const c3 = cards[2];
    L.drop(tl, c3.n, cue("s02c", "@three") - 0.2, { dur: 0.4 });
    L.drop(tl, bill, cue("s02c", "@bill") - 0.2, { dur: 0.35 }); L.drop(tl, aprTile, cue("s02c", "@bill") + 0.4, { dur: 0.3 });
    L.drop(tl, exp, cue("s02c", "@bill") + 0.9, { dur: 0.3 });
    L.drop(tl, expX, cue("s02c", "@no") + 0.05, { dur: 0.25, from: 1.25 });
    payJar.enter(tl, cue("s02c", "@payable") - 0.3, { dur: 0.35 });
    payJar.light(tl, cue("s02c", "@payable"));
    const tC = cue("s02c", "@clears");
    L.drop(tl, coin, tC - 0.1, { dur: 0.2 });
    tl.to(coin, { x: 200, y: -60, opacity: 0, duration: 0.7, ease: "power2.in" }, tC + 0.15);
    payJar.tick(tl, tC, 1000, 0, 0.8); payJar.fill(tl, tC, 0);
    lit(2, tC + 1.0);
  };
})();
