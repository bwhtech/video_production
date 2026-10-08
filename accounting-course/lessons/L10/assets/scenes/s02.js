// s02 — Last time: three little khatas (Sales · Bank · Loan from Ravi Mama) answer last lesson's three questions.
// Book 3's right (credit) page lifts off as a blank orange slip → folds into an envelope that drops (= April's electricity bill, s03).
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const BY = 910, BS = 1.25, XS = [335, 960, 1585];
    const names = [["Sales", "store"], ["Bank", "landmark"], ["Loan from Ravi Mama", "hand-coins"]];
    const books = names.map(([nm, ic], i) => { const b = L.book(svg, XS[i], BY, BS, nm, { icon: ic }); L.hide(b.n); return b; });
    // numbers 1 2 3 above the labels
    const nums = XS.map((x, i) => { const n = L.hide(L.node(svg, x - 230, 330)); K.label(n, 0, 0, String(i + 1), { size: 70, bg: C.saffron, weight: 800, h: 100, w: 100 }); return n; });
    // amount tickers on the pages
    const amt = (b, side, row, v, col) => {
      const tk = K.ticker(b.b, b.pageX[side], -b.Hh + 105 + row * 74, 1, { value: 0, size: 46, color: col });
      L.hide(tk.g);
      return { tk, v };
    };
    const a1 = amt(books[0], "R", 0, 50000, C.crText);
    const a2 = [amt(books[1], "L", 0, 15000, C.drText), amt(books[1], "L", 1, 4000, C.drText), amt(books[1], "R", 0, 8000, C.crText)];
    const bal = K.ticker(books[1].b, books[1].pageX.L, -48, 1, { value: 0, size: 54, chip: true, w: 250, h: 80, edge: C.dr, color: C.drText }); L.hide(bal.g);
    // tint the pages as they speak (blue left / orange right) — a soft paper sheet that drops on
    const tint = (b, side) => {
      const x = side === "L" ? -b.W / 2 + 4 : 4, col = side === "L" ? C.dr : C.cr;
      const t = K.paper(b.b, K.cutRect(x, -b.Hh + 44, b.W / 2 - 8, b.Hh - 44, 1.4, 20), col, { opacity: 0 });
      return t;
    };
    const tints = books.map((b) => ({ L: tint(b, "L"), R: tint(b, "R") }));
    const on = (el, t, to = 0.3) => { tl.to(el, { opacity: to, duration: 0.3, ease: "power1.out" }, t); };
    // check stamps (drop, no bounce)
    const checks = XS.map((x) => { const n = L.hide(L.node(svg, x + 230, 330)); K.medallion(n, 0, 0, 44, "check", C.leaf); return n; });
    // the little napkin callback beside Sales (silent wink)
    const tiny = L.hide(L.node(svg, XS[0] + 280, BY - 40));
    { const tn = K.g(tiny, { transform: "rotate(-8)" }); K.paper(K.shadow(tn, 1), K.cutRect(-34, -34, 68, 68, 2, 12), "#fffdf8"); K.ink(tn, [[-22, -12], [22, -12]], 3, "#9b9086"); K.ink(tn, [[-22, 4], [22, 4]], 3, "#9b9086"); K.ink(tn, [[-22, 20], [6, 20]], 3, "#9b9086"); }
    // the home-side map-pin sticker
    const pin = L.hide(L.node(books[2].b, books[2].pageX.R, -books[2].Hh + 190)); K.medallion(pin, 0, 0, 40, "map-pin", C.coral);
    // blank orange slip + envelope (for the exit)
    const slip = L.hide(L.node(svg, XS[2] + books[2].pageX.R * BS, BY - 150 * BS));
    K.tex(K.shadow(slip, 2), K.cutRect(-92, -140, 184, 280, 2, 22), "pat-paper"); K.paper(slip, K.cutRect(-92, -140, 184, 280, 2, 22), C.cr, { opacity: 0.85 });
    const env = K.envelope(svg, 960, 380, 0.8, { w: 380, h: 250, hidden: true });

    // ======================================================================================= timeline
    // book 1 — Sales
    L.drop(tl, books[0].n, segStart("s02a") - 0.2, { dur: 0.4 });
    L.drop(tl, nums[0], cue("s02a", "@one") - 0.1, { dur: 0.3 });
    const tFifty = cue("s02a", "@fifty");
    L.drop(tl, a1.tk.g, tFifty - 0.1, { dur: 0.25 }); a1.tk.to(tl, tFifty, a1.v, 0.9);
    on(tints[0].R, cue("s02a", "@credit") - 0.1);
    L.drop(tl, tiny, cue("s02a", "@credit") + 0.45, { dur: 0.3 });
    L.drop(tl, checks[0], segEnd("s02a") - 0.15, { dur: 0.28 });
    // book 2 — Bank
    L.drop(tl, books[1].n, segStart("s02b") - 0.2, { dur: 0.4 });
    L.drop(tl, nums[1], cue("s02b", "@two") - 0.1, { dur: 0.3 });
    [["@fifteen", 0, "L"], ["@four", 1, "L"], ["@eight", 2, "R"]].forEach(([w, i, side]) => {
      const t = cue("s02b", w), A = a2[i];
      L.drop(tl, A.tk.g, t - 0.1, { dur: 0.25 }); A.tk.to(tl, t, A.v, 0.7);
      on(tints[1][side], t - 0.05, 0.28);
    });
    const tEl = cue("s02b", "@eleven");
    L.drop(tl, bal.g, tEl - 0.1, { dur: 0.3 }); bal.to(tl, tEl, 11000, 0.9);
    L.drop(tl, checks[1], segEnd("s02b") - 0.15, { dur: 0.28 });
    // book 3 — a liability, home side = credit
    L.drop(tl, books[2].n, segStart("s02c") - 0.2, { dur: 0.4 });
    L.drop(tl, nums[2], cue("s02c", "@three") - 0.1, { dur: 0.3 });
    on(tints[2].R, cue("s02c", "@sit") + 0.3, 0.38);
    L.drop(tl, pin, cue("s02c", "@home") - 0.1, { dur: 0.3 });
    L.drop(tl, checks[2], cue("s02c", "@home") + 0.9, { dur: 0.28 });
    // "brand-new liability": the right page lifts off as a blank orange slip, folds into an envelope that drops
    const tM = cue("s02c", "@meet");
    tl.to(tints[2].R, { opacity: 0, duration: 0.2 }, tM - 0.1);
    tl.set(slip, { opacity: 1 }, tM);
    tl.fromTo(slip, { x: 0, y: 0, scale: 1 }, { x: 960 - (XS[2] + books[2].pageX.R * BS), y: 280 - (BY - 150 * BS), scale: 1.1, duration: 0.8, ease: "power2.inOut", immediateRender: false }, tM);
    tl.to(slip, { scaleX: 0.02, svgOrigin: O, duration: 0.18, ease: "power2.in" }, tM + 0.85);
    env.enter(tl, tM + 0.95, { dur: 0.3 });
    tl.set(slip, { opacity: 0 }, tM + 1.05);
    tl.to(env.body, { y: 820, duration: 0.6, ease: "power2.in" }, sc.end - 0.6);
    L.allow(svg);
  };
})();
