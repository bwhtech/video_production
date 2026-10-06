// s11 — Your Turn. Three picture cards (question numbers only — the VO carries the words); Khata holds a "?" sign.
//   1 · May 5 leaf + calendar-check + ₹4,000 + two empty tag chips   2 · the Bank between the `box` and `user` medallions + ?   3 · rent key slip + the three family medallions + ?
// Answers (for Lesson 8's "Last time"): 1 Dr Cash [Real · comes in] / Cr Advance from customer [Personal · giver] · 2 Personal · 3 Nominal.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const CX = [345, 960, 1575], CY = 480, CW = 520, CH = 620;
    const mk = (i) => {
      const n = L7.node(svg, CX[i], CY); L7.hide(n); L7.card(n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 52, -CH / 2 + 52, 36, 36, 1), C.saffron); K.text(n, -CW / 2 + 52, -CH / 2 + 55, String(i + 1), { size: 48, weight: 800 });
      return n;
    };
    const cards = [0, 1, 2].map(mk);
    // ---- card 1
    const leaf = L7.node(cards[0], 60, -150); L7.hide(leaf);
    K.paper(K.shadow(leaf, 1), K.cutRect(-70, -64, 140, 128, 1.4, 16), C.cream); K.paper(leaf, K.cutRect(-70, -64, 140, 38, 1, 12), C.coral);
    K.text(leaf, 0, -45, "May", { size: 32, weight: 800, color: "#fff" }); K.text(leaf, 0, 12, "5", { size: 78, weight: 800 });
    const advM = L7.node(cards[0], -130, -150); L7.hide(advM); K.medallion(advM, 0, 0, 56, "calendar-check");
    const amt1 = K.ticker(cards[0], 0, -30, 1, { value: 0, size: 72, chip: true, w: 300, h: 100, edge: C.dr });
    const ch1 = [L7.emptyChip(cards[0], 0, 95, 1.0), L7.emptyChip(cards[0], 0, 205, 1.0)];
    // ---- card 2
    const bank = L7.bank(cards[1], 0, 70, 0.62); L7.hide(bank.n);
    const m2a = L7.node(cards[1], -150, 190); L7.hide(m2a); L7.famMedallion(m2a, "real", 0, 0, 58);
    const m2b = L7.node(cards[1], 150, 190); L7.hide(m2b); L7.famMedallion(m2b, "personal", 0, 0, 58);
    const q2 = L7.qmark(cards[1], 0, -190, 1.6);
    // ---- card 3
    const rent = L7.node(cards[2], 0, -120); L7.hide(rent);
    K.tex(K.shadow(rent, 1), K.cutRect(-100, -80, 200, 160, 1.8, 18), "pat-paper"); K.medallion(rent, 0, -8, 52, "key");
    const m3 = fams3(L7.node(cards[2], 0, 110));
    function fams3(n) { L7.hide(n); ["personal", "real", "nominal"].forEach((f, i) => L7.famMedallion(n, f, (i - 1) * 140, 0, 54)); return n; }
    const q3 = L7.qmark(cards[2], 0, 215, 1.2);
    // ---- Khata with a "?" sign + the "answers next lesson" calendar-check
    const khata = K.khataRig(svg, 960, 1050, 0.55, { expr: "awake" });
    const ans = L7.node(svg, 1250, 985); L7.hide(ans); K.medallion(ans, 0, 0, 52, "calendar-check");
    L7.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 11);
    khata.expr(tl, cue("s11", "@turn"), "happy").hop(tl, cue("s11", "@turn"), { height: 40 });
    // 1 — the catering advance
    L7.drop(tl, cards[0], cue("s11", "@one", 1) - 0.1, { dur: 0.4 });
    L7.drop(tl, leaf, cue("s11", "@four") - 0.2, { dur: 0.3 }); amt1.to(tl, cue("s11", "@four"), 4000, 0.7);
    L7.drop(tl, advM, cue("s11", "@advance") - 0.1, { dur: 0.3 });
    ch1.forEach((c, i) => L7.drop(tl, c.n, cue("s11", "@rule") + 0.1 + i * 0.15, { dur: 0.3 }));
    khata.emote(tl, cue("s11", "@line") - 0.3, "?", 1.2);
    // 2 — the Bank
    tl.to(cards[0], { opacity: 0.6, duration: 0.4 }, cue("s11", "@two") - 0.2);
    L7.drop(tl, cards[1], cue("s11", "@two") - 0.1, { dur: 0.4 });
    L7.drop(tl, bank.n, cue("s11", "@bank") - 0.1, { dur: 0.35 });
    L7.drop(tl, m2a, cue("s11", "@real") - 0.1, { dur: 0.3 }); L7.drop(tl, m2b, cue("s11", "@personal") - 0.1, { dur: 0.3 });
    L7.drop(tl, q2, cue("s11", "@personal") + 0.2, { dur: 0.3 });
    // 3 — rent's family
    tl.to(cards[1], { opacity: 0.6, duration: 0.4 }, cue("s11", "@three", 2) - 0.2);
    L7.drop(tl, cards[2], cue("s11", "@three", 2) - 0.1, { dur: 0.4 });
    L7.drop(tl, rent, cue("s11", "@rent") - 0.1, { dur: 0.35 }); L7.drop(tl, m3, cue("s11", "@family") + 0.1, { dur: 0.35 });
    L7.drop(tl, q3, cue("s11", "@belong"), { dur: 0.3 });
    L7.drop(tl, ans, cue("s11", "@answers") - 0.1, { dur: 0.4 });
    khata.expr(tl, cue("s11", "@answers"), "wink");
  };
})();
