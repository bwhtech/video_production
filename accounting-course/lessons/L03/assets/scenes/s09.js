// s09 — Your Turn: three picture cards (the viewer works from the frame). Each lifts as read and stays lifted through its thinking pause.
//   1 Gopal's delivery → what does the equation read?   2 buy a cart for cash → does the scale move?   3 (hypothetical, imagine card) repay part of Ravi's loan → which pattern?
// Answers (for L4's "Last time"): 1 — 88,000 = 38,000 + 50,000 · 2 — No: swap on the left · 3 — both sides down.
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start;
    L3.stage(K, svg, C.teal, 880);
    L3.cal(K, svg, 3);
    const hud = L3.hudScale(K, svg, tl, T0);

    const CY = 650, CX = [400, 960, 1520], CW = 480, CH = 480;
    const badge = (n, i) => { K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 46, -CH / 2 + 46, 38, 38, 1), C.saffron); K.text(n, -CW / 2 + 46, -CH / 2 + 50, String(i + 1), { size: 50, weight: 800, color: C.ink }); };
    const qScale = (parent) => {                                    // a small empty scale with `?` under both pans
      const m = K.scaleRig.mini(parent, 0, 215, 0.27, {});
      K.qmark(parent, -103, 208, 0.62, C.dr); K.qmark(parent, 103, 208, 0.62, C.cr);
      return m;
    };
    const cards = [0, 1].map((i) => { const n = L3.node(K, svg, CX[i], CY); L3.card(K, n, CW, CH); badge(n, i); return n; });
    // card 1: Gopal's milk cans
    K.milkCans(cards[0], 0, -60, 0.85);
    K.medallion(cards[0], 150, -150, 40, "clock");
    qScale(cards[0]);
    // card 2: the cart + coins
    K.cartSticker(cards[1], -70, -120, 1.25);
    K.coin(cards[1], 90, -120, 38); K.coin(cards[1], 128, -96, 30);
    qScale(cards[1]);
    // card 3: HYPOTHETICAL → inside the dashed imagine card
    const im = K.imagineCard(svg, CX[2], CY, CW, CH, { hidden: true });
    const imn = L3.node(K, svg, CX[2], CY);   // (number badge sits on top of the imagine card)
    badge(imn, 2);
    const ag = im.area.g;
    K.tex(K.shadow(ag, 1), K.cutEll(-70, -105, 66, 66, 1.2), "pat-paper"); K.faceArt(ag, "ravi", 54).setAttribute("transform", "translate(-70 -105)");
    K.note(ag, 60, -125, 104, 54, -8); K.note(ag, 96, -88, 104, 54, 7);
    K.qmark(ag, 175, -35, 0.9, C.coral);
    const glyph = (cx, kind) => {
      const a = (x, y, dir, col) => K.arrowShape(ag, cx + x, y, 64, col, 1, dir === "up" ? 90 : dir === "down" ? -90 : dir === "right" ? 180 : 0, 22);
      if (kind === "upup") { a(-16, 168, "up", C.dr); a(16, 168, "up", C.cr); }
      if (kind === "downdown") { a(-16, 168, "down", C.dr); a(16, 168, "down", C.cr); }
      if (kind === "swapL") { a(0, 146, "right", C.dr); a(0, 190, "left", C.dr); }
      if (kind === "swapR") { a(0, 146, "right", C.cr); a(0, 190, "left", C.cr); }
    };
    [[-165, "upup"], [-55, "downdown"], [55, "swapL"], [165, "swapR"]].forEach(([x, k]) => glyph(x, k));
    const khata = K.khataRig(svg, 170, 1035, 0.55, { expr: "awake" });
    const cal = L3.hide(L3.node(K, svg, 1790, 1000)); K.medallion(cal, 0, 0, 58, "calendar-check");

    // ======================================================================================= timeline
    // the cards flip open from the recap tiles (drop-and-place), staggered
    [cards[0], cards[1]].forEach((n, i) => { L3.hide(n); L3.drop(tl, K, n, T0 + 0.2 + i * 0.12); });
    im.enter(tl, T0 + 0.44); L3.hide(imn); L3.drop(tl, K, imn, T0 + 0.44);
    khata.blink(tl, T0 + 2.5);
    const nodes = [cards[0], cards[1], im.body];
    const lift = (i, t) => {
      tl.to(nodes[i], { scale: 1.05, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t);
      if (i > 0) tl.to(nodes[i - 1], { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t);
    };
    const t1 = cue("s09", "@one"), t2 = cue("s09", "@two"), t3 = cue("s09", "@three", 2);
    lift(0, t1); lift(1, t2); lift(2, t3);
    tl.to(imn, { scale: 1.05, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t3);       // card 3's number badge follows the imagine body
    // Khata raises its `?` while each question is asked
    khata.emote(tl, cue("s09", "@what"), "?", 2.2); khata.emote(tl, cue("s09", "@does"), "?", 2.0); khata.emote(tl, cue("s09", "@which"), "?", 3.0);
    khata.arm(tl, cue("s09", "@what") - 0.2, "R", 120, 0.3); khata.arm(tl, cue("s09", "@what") + 2.2, "R", 15, 0.4);
    // "Answers next lesson." — the calendar-check medallion pops
    L3.drop(tl, K, cal, cue("s09", "@next"));
    hud.levelFlash(tl, T0 + 0.9);
  };
})();
