// s11 — Your Turn. Three picture cards (numbers only — the VO carries the words); Khata holds up a "?". The 1.8 s pauses after each question hold perfectly still.
//   1 · Meera's ₹3,000 drawings slip + the film strip + ?   2 · the ₹4,000 advance envelope (May 5) + the strip + ?   3 · "Gross profit ₹ ?"
// Answers (for Lesson 13's "Last time"): 1 Drawings are not an expense — Meera took money home, it didn't help run the stall · 2 No — not earned yet (a liability until May's catering) · 3 ₹40,000 (₹50,000 − ₹10,000).
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    L.stage(svg, C.teal, 930);
    const CX = [345, 960, 1575], CY = 470, CW = 520, CH = 640;
    const mk = (i) => {
      const n = L.node(svg, CX[i], CY); L.hide(n); L.card(n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 52, -CH / 2 + 52, 36, 36, 1), C.saffron); K.text(n, -CW / 2 + 52, -CH / 2 + 55, String(i + 1), { size: 48, weight: 800 });
      n._shade = K.el("path", { d: K.cutRect(-CW / 2, -CH / 2, CW, CH, 2, 24), fill: C.ink, opacity: 0, "pointer-events": "none" }, n);
      return n;
    };
    const cards = [0, 1, 2].map(mk);
    const stripPic = (parent, x, y) => { const n = L.node(parent, x, y); L.hide(n); K.filmStrip(n, 0, 0, 340, 110, ["coins", "milk", "key", "user"], 0, { resultFrames: 2 }); return n; };
    // card 1 — Meera's drawings slip, the strip, "?"
    const sl1 = L.node(cards[0], 0, -120); L.hide(sl1); { const s = L.expSlip(sl1, 0, 0, "wallet", 3000, { w: 400, h: 110, size: 52, face: "meera" }); L.pin(s.n, -208, -38, 1.3); }
    const st1 = stripPic(cards[0], 0, 70); const q1 = L.node(cards[0], 0, 245); L.hide(q1); K.qmark(q1, 0, 0, 1.6);
    // card 2 — the advance envelope + May 5, the strip, "?"
    const env = L.node(cards[1], 0, -125); L.hide(env);
    { const e = K.g(env, {}); K.paper(K.shadow(e, 2), K.cutRect(-130, -80, 260, 160, 2, 20), C.cream); K.paper(e, K.cutPoly([[-130, -80], [130, -80], [0, 20]], 1.4, 18), "#efe3cc"); K.text(e, 0, 38, "₹4,000", { size: 48, weight: 800 }); }
    const chip2 = L.node(cards[1], 100, -230); L.hide(chip2); K.label(chip2, 0, 0, "May 5", { size: 40, bg: C.saffron, weight: 800 });
    const st2 = stripPic(cards[1], 0, 70); const q2 = L.node(cards[1], 0, 245); L.hide(q2); K.qmark(q2, 0, 0, 1.6);
    // card 3 — Gross profit ₹ ?
    const g3 = L.node(cards[2], 0, -60); L.hide(g3); K.label(g3, 0, 0, "Gross profit", { size: 56, bg: C.cream, weight: 800 });
    const q3 = L.node(cards[2], 0, 100); L.hide(q3); K.text(q3, 0, 0, "₹ ?", { size: 130, weight: 800 });
    cards.forEach((c) => c.appendChild(c._shade));
    const khata = K.khataRig(svg, 960, 1045, 0.5, { expr: "awake" });
    const ans = L.node(svg, 1250, 985); L.hide(ans); K.medallion(ans, 0, 0, 52, "calendar-check");
    L.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 2).blink(tl, T0 + 14);
    khata.expr(tl, cue("s11", "@turn"), "happy").hop(tl, cue("s11", "@turn"), { height: 40 });
    L.drop(tl, cards[0], cue("s11", "@one") - 0.1, { dur: 0.4 });
    L.drop(tl, sl1, cue("s11", "@drawings") - 0.2, { dur: 0.35 });
    L.drop(tl, st1, cue("s11", "@statement") - 0.4, { dur: 0.3 }); L.drop(tl, q1, cue("s11", "@statement") + 0.1, { dur: 0.3 });
    tl.to(cards[0]._shade, { opacity: 0.2, duration: 0.4 }, cue("s11", "@two") - 0.2);
    L.drop(tl, cards[1], cue("s11", "@two") - 0.1, { dur: 0.4 });
    L.drop(tl, env, cue("s11", "@advance") - 0.5, { dur: 0.35 }); L.drop(tl, chip2, cue("s11", "@advance") - 0.1, { dur: 0.3 });
    L.drop(tl, st2, cue("s11", "@loss", 2) - 0.4, { dur: 0.3 }); L.drop(tl, q2, cue("s11", "@loss", 2) + 0.3, { dur: 0.3 });
    tl.to(cards[1]._shade, { opacity: 0.2, duration: 0.4 }, cue("s11", "@three") - 0.2);
    L.drop(tl, cards[2], cue("s11", "@three") - 0.1, { dur: 0.4 });
    L.drop(tl, g3, cue("s11", "@gross") - 0.1, { dur: 0.35 }); L.drop(tl, q3, cue("s11", "@profit", 3), { dur: 0.35 });
    L.drop(tl, ans, cue("s11", "@answers") - 0.1, { dur: 0.4 });
    khata.expr(tl, cue("s11", "@answers"), "wink");
  };
})();
