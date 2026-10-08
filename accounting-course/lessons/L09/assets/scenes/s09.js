// s09 — Your Turn. Three question cards shown ONE AT A TIME, large (a real ledger page at ≥ 0.95 scale): 1 · Sales (rows posted, balance `?`),
// 2 · Bank (rows posted, balance `?`), 3 · the Loan from Ravi Mama book with both pages dimmed and a big `?` between. The cards wait as a small stack at the left edge;
// the current card slides to centre and grows (0.5 s), shrinks back (0.35 s) when the next one comes. Question numbers only — the VO carries the words.
// Answers (for L10's "Last time"): 1 Sales ₹50,000 credit balance · 2 Bank ₹11,000 debit balance · 3 on the credit side (a liability's home side).
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start;
    L9.stage(svg, C.teal, 880);
    const PX = 960, PY = 1040, PS = 0.96, PIV = `${PX} ${PY}`;
    const mk = (account, icon, rows, qrow, qside, n) => {
      const wrap = K.g(svg, {});
      const lp = K.ledgerPage(wrap, PX, PY, PS, { account, icon, rows: 4 });
      rows.forEach(([sd, date, other, amount], i) => lp.post(tl, T0 + 0.05 + i * 0.02, sd, { date, other, amount, count: 0.05 }));
      const p = lp.cellPos(qside, qrow, "amt");
      const chip = K.weightChip(wrap, p.x - 70, p.y, 1, { value: "?", edge: qside === "dr" ? "dr" : "cr" });
      const badge = K.g(wrap, { transform: `translate(${PX - 700} ${PY - 600})` });
      K.paper(K.shadow(badge, 1), K.cutEll(0, 0, 50, 50, 1), C.saffron); K.text(badge, 0, 3, String(n), { size: 62, weight: 800 });
      return { wrap, lp, chip, p };
    };
    const c1 = mk("Sales", "trending-up", [["cr", "Apr 15", "Cash", 18000], ["cr", "Apr 16", "Infotech", 6000], ["cr", "Apr 30", "Cash", 22000], ["cr", "Apr 30", "Infotech", 4000]], 4, "dr", 1);
    const c2 = mk("Bank", "landmark", [["dr", "Apr 15", "Cash", 15000], ["dr", "Apr 25", "Infotech", 4000], ["cr", "Apr 30", "Salary", 8000]], 2, "cr", 2);
    // card 3 — the liability book, both pages dim, `?` between
    const wrap3 = K.g(svg, {});
    const lp3 = K.ledgerPage(wrap3, PX, PY, PS, { account: "Loan from Ravi Mama", icon: "umbrella", rows: 4 });
    ["dr", "cr"].forEach((sd) => { const pg = lp3.pages[sd]; const r = K.paper(lp3.body, K.cutRect(pg.x0, pg.y0, pg.w, pg.h, 1.2, 26), "#8a8378", { opacity: 0.45 }); });
    const q3 = L9.node(wrap3, PX + 8, PY - 195); K.qmark(q3, 0, 0, 3.4, C.dr);
    const badge3 = K.g(wrap3, { transform: `translate(${PX - 700} ${PY - 600})` });
    K.paper(K.shadow(badge3, 1), K.cutEll(0, 0, 50, 50, 1), C.saffron); K.text(badge3, 0, 3, "3", { size: 62, weight: 800 });
    const cards = [c1.wrap, c2.wrap, wrap3];
    L9.allow(svg);
    // stack position at the left edge (small), slight offsets so it reads as a pile. Position (x/y) and size (scale) are tweened on two nested nodes.
    const stack = (i) => ({ x: -740 + i * 22, y: -810 + i * 22, scale: 0.2 });
    const outers = cards.map((w) => { const o = K.g(svg, {}); o.appendChild(w); return o; });
    cards.forEach((w, i) => { const s = stack(i); tl.set(outers[i], { x: s.x, y: s.y, opacity: 0 }, 0); tl.set(w, { scale: s.scale, svgOrigin: PIV }, 0); });
    const pop = (i, t) => tl.to(outers[i], { opacity: 1, duration: 0.2 }, t);
    const fwd = (i, t) => { tl.to(outers[i], { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, t); tl.to(cards[i], { scale: 1, svgOrigin: PIV, duration: 0.5, ease: "power3.out" }, t); };
    const back = (i, t) => { const s = stack(i); tl.to(outers[i], { x: s.x, y: s.y, opacity: 0.8, duration: 0.35, ease: "power2.in" }, t); tl.to(cards[i], { scale: s.scale, svgOrigin: PIV, duration: 0.35, ease: "power2.in" }, t); };
    // the stack builds as the questions arrive; each card is dead still while its question is worked (1.8 s gaps)
    const t1 = cue("s09", "@one"), t2 = cue("s09", "@two"), t3 = cue("s09", "@three", 2);
    cards.forEach((w, i) => pop(i, T0 + 0.3 + i * 0.12));
    fwd(0, t1 - 0.3); back(0, t2 - 0.6); fwd(1, t2 - 0.3); back(1, t3 - 0.6); fwd(2, t3 - 0.3);
  };
})();
