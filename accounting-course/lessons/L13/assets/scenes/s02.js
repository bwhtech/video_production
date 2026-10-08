// s02 — Last time: L12's three Your-Turn answers as three paper cards.
//   1 drawings: Meera walks home with ₹3,000 past L12's cinema door — the rope stays closed · 2 the ₹4,000 envelope (May 5) stays OUTSIDE the film strip · 3 the P&L strip's first ruled result frame lights: Gross profit ₹40,000.
// In: s01t pushes into a page showing #s02-first at 1/3 scale (identity camera); initial hidden states are DOM attributes.
// Out: default torn-paper wipe into s03.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L13.stage(world, C.teal, 880);
    L13.cal(world, 30);
    const CX = [330, 960, 1590], CY = 520, CW = 520, CH = 600;

    const mkCard = (i) => {
      const n = L13.node(world, CX[i], CY);
      L13.card(n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 46, -CH / 2 + 46, 32, 32, 1), C.saffron);
      K.text(n, -CW / 2 + 46, -CH / 2 + 49, String(i + 1), { size: 42, weight: 800 });
      L13.hide(n);
      return { n, art: K.g(n, {}) };
    };
    const cards = [0, 1, 2].map(mkCard);

    // ---- card 1: cinema door with a closed rope, Meera walks home with the ₹3,000 wallet
    const a1 = cards[0].art;
    const door = L13.node(a1, -140, 70);
    K.paper(K.shadow(door, 1), K.cutRect(-70, -190, 140, 250, 2, 20), C.woodDark);
    K.paper(door, K.cutRect(-56, -176, 112, 222, 1.4, 16), C.wood);
    K.medallion(door, 0, -100, 34, "film");
    [-86, 86].forEach((px) => { K.paper(K.shadow(door, 1), K.cutRect(px - 7, -30, 14, 90, 1, 10), C.gold); K.paper(door, K.cutEll(px, -34, 11, 11, 0.6), C.brass); });
    const rope = K.ink(door, K.arc(0, -30, 90, Math.PI * 0.12, Math.PI * 0.88, 10, 28).map(([x, y]) => [x, y + 14]), 6, C.red);
    const m = K.meera(a1, 20, 262, 0.6, { expr: "happy" });
    const wallet = L13.node(a1, 100, -60); K.medallion(wallet, 0, 0, 38, "wallet"); L13.hide(wallet);
    const amt1 = K.ticker(a1, 0, -170, 1, { value: 0, size: 46, chip: true, w: 190, h: 70, edge: C.cr }); L13.hide(amt1.g);

    // ---- card 2: the envelope (₹4,000, May 5) stays outside the film strip
    const a2 = cards[1].art;
    const strip2 = K.filmStrip(a2, 0, -130, 420, 110, ["banknote", "leaf", "key"], 0, { resultFrames: 1 }); L13.hide(strip2);
    const env = K.envelope(a2, 0, 230, 0.62, { icon: "calendar-check", w: 380, h: 250, hidden: true });
    const amt2 = K.ticker(a2, 0, 205, 1, { value: 0, size: 46, chip: true, w: 200, h: 66, edge: C.cr }); L13.hide(amt2.g);
    const tile = K.dateTile(a2, 170, 30, 1.0, { month: "May", day: 5, w: 150, h: 150, hidden: true });
    const arrow2 = K.el("path", { d: "M-60,64 C-150,20 -150,-30 -70,-68", fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "10 10", "stroke-linecap": "round", opacity: 0 }, a2);

    // ---- card 3: the P&L film strip, the first ruled result frame lit → ₹40,000
    const a3 = cards[2].art;
    const strip3 = K.filmStrip(a3, 0, -110, 460, 140, ["banknote", "leaf", "key", "user", "zap", "percent", "trending-down"], 0, { resultFrames: 2 }); L13.hide(strip3);
    const rf = strip3.resultFrames[0];
    const lit = K.el("path", { d: K.cutRect(rf.cx - rf.w / 2 - 4, rf.cy - rf.h / 2 - 4, rf.w + 8, rf.h + 8, 1, 14), fill: "none", stroke: C.gold, "stroke-width": 9, opacity: 0 }, strip3);
    const gp = L13.node(a3, 0, 20); K.text(gp, 0, 0, "Gross profit", { size: 40, weight: 800 }); L13.hide(gp);
    const amt3 = K.ticker(a3, 0, 130, 1, { value: 0, size: 64, chip: true, w: 320, h: 100, edge: C.dr }); L13.hide(amt3.g);
    L13.allow(world);

    // ======================================================================== timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3);
    // 1 — drawings
    const tOne = cue("s02", "@one");
    L13.drop(tl, cards[0].n, tOne - 0.2); L13.drop(tl, wallet, cue("s02", "@drawings") - 0.1);
    L13.drop(tl, amt1.g, cue("s02", "@drawings") + 0.2); amt1.to(tl, cue("s02", "@drawings") + 0.3, 3000, 0.8);
    K.pulseNode(tl, rope, cue("s02", "@expense"), 1.04);
    m.expr(tl, cue("s02", "@expense"), "thinking");
    const tHome = cue("s02", "@home");
    m.walkTo(tl, tHome, 190, 1.6).expr(tl, tHome, "happy");
    tl.to(wallet, { x: 170, duration: 1.6, ease: "power1.inOut" }, tHome);
    // 2 — advance
    const tTwo = cue("s02", "@two");
    tl.to(cards[0].n, { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, tTwo - 0.15);
    L13.drop(tl, cards[1].n, tTwo - 0.15); L13.drop(tl, strip2, tTwo + 0.3);
    env.drop(tl, cue("s02", "@advance")); L13.drop(tl, amt2.g, cue("s02", "@advance") + 0.5); amt2.to(tl, cue("s02", "@advance") + 0.55, 4000, 0.7);
    const tNo = cue("s02", "@no");
    tl.to(arrow2, { opacity: 1, duration: 0.3, ease: "power2.out" }, tNo - 0.2);
    K.stamp(tl, a2, -122, 0, tNo, 0.7);
    tile.enter(tl, cue("s02", "@earned") - 0.2);
    // 3 — gross profit
    const tThree = cue("s02", "@three");
    tl.to(cards[1].n, { opacity: 0.6, duration: 0.4, ease: "power2.inOut" }, tThree - 0.15);
    L13.drop(tl, cards[2].n, tThree - 0.15); L13.drop(tl, strip3, tThree + 0.2);
    L13.drop(tl, gp, cue("s02", "@gross")); tl.to(lit, { opacity: 1, duration: 0.2 }, cue("s02", "@gross") + 0.1);
    L13.drop(tl, amt3.g, cue("s02", "@forty") - 0.3); amt3.to(tl, cue("s02", "@forty") - 0.2, 40000, 0.9);
    K.pulseNode(tl, amt3.g, cue("s02", "@forty") + 0.8, 1.06);
    L13.allow(svg);
  };
})();
