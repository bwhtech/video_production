// s08 — Indian books note: a two-shelf bookcase. The `Capital` book hops from the Equity shelf up onto the Liabilities shelf; the ₹1,06,700 total and a small level scale don't change. "Same numbers. Same balance. Just a different shelf."
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    L13.stage(svg, C.teal, 900);
    const SX = 1130, SYY = 1010, TIER = 250;
    const shelf = K.bookshelf(svg, SX, SYY, 1, { tiers: 2, w: 1040, per: 5, tierH: TIER, n: 10, shown: false,
      icons: ["user", "milk", "calendar-check", "zap", "banknote", "banknote", "trending-up", "wallet", "banknote", "banknote"] });
    const TOP = SYY - (TIER * 2 + 30);
    // shelf labels (left of the case)
    const lab = (txt, y, col) => { const n = L13.node(svg, 330, y); L13.hide(n); K.label(n, 0, 0, txt, { size: 52, bg: col, w: 330, h: 84, rot: -1 }); return n; };
    const labL = lab("Liabilities", TOP + 26 + TIER * 0.5 + 10, C.cr), labE = lab("Equity", TOP + 26 + TIER * 1.5 + 10, "#f0a25c");
    // total + the small level scale (nothing moves)
    const ms = K.miniScale(svg, 330, 420, 0.36, { hidden: true });
    const tot = K.ticker(svg, 330, 480, 1, { value: 0, size: 56, chip: true, w: 330, h: 88, edge: C.dr, hidden: true });
    L13.allow(svg);

    // ======================================================================== timeline
    // books drop onto the shelves: Liabilities (4) then Equity (Capital, Profit, Drawings); slot 4 (top right) stays empty
    [0, 1, 2, 3].forEach((i) => shelf.put(tl, T0 + 0.6 + i * 0.12, i));
    [5, 6, 7].forEach((i, k) => shelf.put(tl, T0 + 1.2 + k * 0.12, i));
    L13.drop(tl, labL, T0 + 0.9); L13.drop(tl, labE, T0 + 1.5);
    ms.enter(tl, T0 + 0.8); tot.enter(tl, T0 + 1.0); tot.to(tl, T0 + 1.05, 106700, 1.0);
    // "capital" — the Capital book is pulled forward; "with the liabilities" — it hops up to the empty slot of the top shelf
    const tCap = cue("s08", "@capital"), tLi = cue("s08", "@liabilities");
    shelf.pull(tl, tCap - 0.1, 5, { dy: 36, k: 1.08 }); shelf.light && shelf.light(tl, tCap, 5);
    const dx = shelf.slots[4].x - shelf.slots[5].x, dy = shelf.slots[4].y - shelf.slots[5].y;
    const b = shelf.books[5];
    tl.to(b, { y: dy - 110, x: dx * 0.5, duration: 0.3, ease: K.stepEase(0.3, "power2.out", tLi) }, tLi);
    tl.to(b, { y: dy, x: dx, duration: 0.3, ease: K.stepEase(0.3, "power2.in", tLi + 0.3) }, tLi + 0.3);
    tl.to(shelf.books[5]._inner, { y: 0, scale: 1, svgOrigin: O, duration: 0.2 }, tLi + 0.5);
    K.pulseNode(tl, tot.g, tLi + 0.7, 1.0);
    // "same balance" — the small scale pulses level (no tilt); "just a different shelf" — the shelf nudges
    ms.pulse(tl, cue("s08", "@balance"), 1.08);
    K.pulseNode(tl, tot.g, cue("s08", "@balance") + 0.1, 1.06);
  };
})();
