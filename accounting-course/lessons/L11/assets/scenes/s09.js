// s09 — Your Turn. Three picture cards (question numbers only — the VO carries the words) with a 1.8 s thinking hold after each; Khata holds up a "?".
//   1 · the sheet with both totals as ₹? | ₹? · 2 · a slip blown away + the sheet with a ? · 3 · a note bundle (Drawings, `wallet`) between a blue and an orange column + ?
// Answers (for Lesson 12's "Last time"): 1 — ₹1,36,000 each side · 2 — No · 3 — Debit. Out: default torn-paper wipe into s10 (the cart rolls in there).
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const CX = [345, 960, 1575], CY = 500, CW = 520, CH = 640;
    const mk = (i) => { const n = L.node(svg, CX[i], CY); L.hide(n); L.card(n, CW, CH); L.num(n, -CW / 2 + 52, -CH / 2 + 52, i + 1, 38); return n; };
    const cards = [0, 1, 2].map(mk);
    // a small sheet (two column strips) used by cards 1 and 2
    const miniSheet = (parent, x, y, k = 1.3) => {
      const g = L.node(parent, x, y, k);
      [[-86, C.dr], [86, C.cr]].forEach(([dx, c]) => { K.paper(K.shadow(g, 1), K.cutRect(dx - 80, -100, 160, 200, 1.4, 18), C.cream); K.paper(g, K.cutRect(dx - 80, -100, 160, 44, 1, 14), c); for (let k = 0; k < 3; k++) K.ink(g, [[dx - 62, -28 + k * 40], [dx + 62, -28 + k * 40]], 3, "#a39684"); });
      return g;
    };
    // ---- card 1: ₹? | ₹?
    const s1 = miniSheet(cards[0], 0, -90); L.hide(s1);
    const w1 = [-92, 92].map((dx, i) => { const w = K.weightChip(cards[0], dx * 1.25, 190, 1.05, { value: "?", edge: i ? "cr" : "dr", hidden: true }); return w; });
    // ---- card 2: a slip blown away + the sheet with a ?
    const s2 = miniSheet(cards[1], 50, -90); L.hide(s2);
    const slip2 = L.node(cards[1], -150, 120, 1.3); L.hide(slip2); K.slip(slip2, 0, 0, 1.0, -8, "wallet");
    const q2 = L.node(cards[1], 60, 200); L.hide(q2); K.qmark(q2, 0, 0, 2.0, C.coral);
    const wind = K.windLines(cards[1], -200, 120, 0.8, { n: 3, len: 180, dir: 1 });
    // ---- card 3: a bundle between a blue and an orange column + ?
    const c3 = L.node(cards[2], 0, 0); L.hide(c3);
    K.paper(K.shadow(c3, 1), K.cutRect(-190, -200, 170, 330, 1.4, 20), C.dr, { opacity: 0.85 }); K.paper(K.shadow(c3, 1), K.cutRect(20, -200, 170, 330, 1.4, 20), C.cr, { opacity: 0.85 });
    const bund = L.node(cards[2], 0, -20); L.hide(bund); K.bundle(bund, 0, 0, 1.15, -4); K.medallion(bund, 0, -76, 34, "wallet");
    const q3 = L.node(cards[2], 0, 190); L.hide(q3); K.qmark(q3, 0, 0, 1.5, C.coral);
    const khata = K.khataRig(svg, 960, 1052, 0.5, { expr: "awake" });
    const ans = L.node(svg, 1250, 985); L.hide(ans); K.medallion(ans, 0, 0, 56, "calendar-check");
    L.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 14); khata.jitter(tl, T0, sc.end);
    const tT = cue("s09", "@turn");
    khata.expr(tl, tT, "happy").hop(tl, tT, { height: 40 });
    // 1 — the totals
    L.drop(tl, cards[0], cue("s09", "@one") - 0.15, { dur: 0.4 });
    L.drop(tl, s1, cue("s09", "@balance") - 0.2, { dur: 0.35 });
    w1.forEach((w, i) => w.enter(tl, cue("s09", "@balance") + 0.4 + i * 0.12, { dur: 0.3 }));
    khata.emote(tl, cue("s09", "@balance") + 0.7, "?", 1.4);
    // 2 — a forgotten transaction
    tl.to(cards[0], { opacity: 0.6, duration: 0.4 }, cue("s09", "@two") - 0.2);
    L.drop(tl, cards[1], cue("s09", "@two") - 0.15, { dur: 0.4 });
    L.drop(tl, slip2, cue("s09", "@two") + 0.4, { dur: 0.3 }); L.drop(tl, s2, cue("s09", "@two") + 0.8, { dur: 0.3 });
    const tCo = cue("s09", "@completely");
    wind.gust(tl, tCo - 0.2, { dur: 0.9, dist: 380 });
    tl.to(slip2, { x: 380, y: -150, rotation: 35, opacity: 0, duration: 1.0, ease: "power1.in" }, tCo - 0.1);
    L.drop(tl, q2, tCo + 0.7, { dur: 0.3 });
    // 3 — which column does Drawings go in
    tl.to(cards[1], { opacity: 0.6, duration: 0.4 }, cue("s09", "@three") - 0.2);
    L.drop(tl, cards[2], cue("s09", "@three") - 0.15, { dur: 0.4 });
    L.drop(tl, c3, cue("s09", "@three") + 0.3, { dur: 0.35 }); L.drop(tl, bund, cue("s09", "@in") - 0.8, { dur: 0.35 });
    L.drop(tl, q3, cue("s09", "@in") + 0.1, { dur: 0.3 });
    // answers next lesson
    const tA = cue("s09", "@answers");
    L.drop(tl, ans, tA - 0.1, { dur: 0.4 }); khata.expr(tl, tA, "wink");
  };
})();
