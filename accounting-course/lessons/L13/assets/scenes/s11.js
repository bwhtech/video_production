// s11 — Your Turn. Three question cards with pictures; each lights as its question is asked and stays dead still through the 1.8 s thinking hold. Khata holds up a "?".
//   1 Meera's ₹71,700 equity tag beside the galla, "?" · 2 four small medallions (cash, bank, stock, Infotech) dimmed, "?" · 3 the ₹24,700 film frame with an arrow to a "?" box.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.teal, 880);
    const CX = [330, 960, 1590], CY = 450, CW = 520, CH = 600;
    const cards = CX.map((x, i) => {
      const n = L13.node(svg, x, CY); L13.card(n, CW, CH); L13.hide(n);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 46, -CH / 2 + 46, 32, 32, 1), C.saffron); K.text(n, -CW / 2 + 46, -CH / 2 + 49, String(i + 1), { size: 42, weight: 800 });
      return { n, art: K.g(n, {}) };
    });
    // 1 — Meera's equity tag beside the galla, "?"
    const a1 = cards[0].art;
    const t1 = K.claimTag(a1, -110, 130, 0.95, { face: "meera", amount: 71700, size: 40, hidden: true });
    const g1 = K.galla(a1, 120, 130, 0.9, {});
    const q1 = L13.node(a1, 20, -150); K.qmark(q1, 0, 0, 1.6, C.coral); L13.hide(q1);
    // 2 — four small medallions (dimmed) + "?"
    const a2 = cards[1].art, ic = K.g(a2, {}); L13.hide(ic); const icI = K.g(ic, { opacity: 0.45 });
    [[-100, -20, "banknote"], [100, -20, "landmark"], [-100, 140, "leaf"]].forEach(([x, y, n]) => K.medallion(icI, x, y, 56, n));
    K.tex(K.shadow(icI, 1), K.cutEll(100, 140, 56, 56, 1), "pat-paper"); K.faceArt(icI, "infotech", 48).setAttribute("transform", "translate(100 148)");
    const q2 = L13.node(a2, 0, -150); K.qmark(q2, 0, 0, 1.5, C.coral); L13.hide(q2);
    // 3 — the ₹24,700 film frame → "?" box
    const a3 = cards[2].art;
    const fr = L13.node(a3, -105, 60); L13.hide(fr);
    K.tex(K.shadow(fr, 2), K.cutRect(-85, -90, 170, 180, 1.4, 16), "pat-paper"); K.paper(fr, K.cutRect(-72, -76, 144, 18, 0.8, 10), C.navy, { opacity: 0.9 });
    K.ink(fr, [[-72, 56], [72, 56]], 5, C.ink); K.text(fr, 0, -6, "₹24,700", { size: 36, weight: 800 });
    const arw = K.g(a3, {}); L13.hide(arw); K.ink(arw, [[-10, 60], [60, 60]], 8, C.ink); K.paper(arw, K.cutPoly([[50, 34], [50, 86], [90, 60]], 0.6, 8), C.ink);
    const bx = L13.node(a3, 150, 60); L13.hide(bx); K.el("path", { d: K.cutRect(-62, -66, 124, 132, 1, 16), fill: "none", stroke: C.ink, "stroke-width": 6, "stroke-dasharray": "14 10" }, bx);
    K.text(bx, 0, 4, "?", { size: 90, weight: 800, color: C.coralText });
    const khata = K.khataRig(svg, 960, 1036, 0.62, { expr: "awake" });
    L13.allow(svg);

    // ======================================================================== timeline
    khata.blink(tl, T0 + 2).blink(tl, T0 + 12).blink(tl, T0 + 19);
    const show = (i, t) => { L13.drop(tl, cards[i].n, t); };
    const dim = (i, t) => tl.to(cards[i].n, { opacity: 0.7, duration: 0.4, ease: "power2.inOut" }, t);
    // "your turn" — Khata raises a "?"
    khata.emote(tl, cue("s11", "@turn"), "?", 1.6);
    [0, 1, 2].forEach((i) => show(i, cue("s11", "@turn") + 0.9 + i * 0.25));
    // one
    const t1s = cue("s11", "@one");
    L13.drop(tl, q1, cue("s11", "@cash") - 0.4);
    t1.enter && t1.enter(tl, t1s + 0.3);
    // two
    const t2s = cue("s11", "@two");
    dim(0, t2s - 0.15); L13.drop(tl, ic, t2s + 0.4); L13.drop(tl, q2, cue("s11", "@assets") - 0.4);
    // three
    const t3s = cue("s11", "@three");
    dim(1, t3s - 0.15); L13.drop(tl, fr, cue("s11", "@profit") - 0.3); L13.drop(tl, arw, cue("s11", "@go") - 0.5); L13.drop(tl, bx, cue("s11", "@go") - 0.3);
    // "answers at the start of the next lesson"
    khata.hop(tl, cue("s11", "@answers"), { height: 40 });
    [0, 1, 2].forEach((i) => tl.to(cards[i].n, { opacity: 1, duration: 0.4 }, cue("s11", "@answers") - 0.2));
  };
})();
