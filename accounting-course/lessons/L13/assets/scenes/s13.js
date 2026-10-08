// s13 — End card (12 s, no VO). The "14" cover swings open onto --scene-violet: series wordmark, an "Up next" card (Lesson 14 · Where Did the Money Go?) with the galla and a trail of coins,
// two clean paper panels for YouTube end-screen videos, Khata waving. No subscribe circle, no credits.
(function () {
  window.SCENES.s13 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, t0 = sc.start;
    K.wall(svg, C.violet, 960); K.table(svg, 960);
    const pop = (n, t) => { L13.hide(n); K.dropIn(tl, n, t, { dur: 0.34 }); return n; };
    const title = L13.node(svg, 540, 150);
    K.label(title, 0, 0, window.SERIES_NAME(), { size: 60, font: "title", weight: 400, bg: "paper", rot: -2 });
    const next = L13.node(svg, 540, 490);
    K.card(next, 0, 0, 780, 400, { header: C.saffron, title: "Up next", titleSize: 44, headerH: 76 });
    // the galla with a trail of coins (where did the money go?)
    const gl = K.g(next, { transform: "translate(-250 120)" }); K.galla(gl, 0, 0, 0.6, {});
    [[-310, 60], [-290, 30], [-255, 6], [-215, -14]].forEach(([x, y], i) => { K.coin(next, x + 130 * 0, y + 60, 15 - i * 1.5); });
    K.text(next, -70, -64, "Lesson 14", { size: 42, weight: 800, color: C.coralText, anchor: "start" });
    K.text(next, -70, 20, "Where Did", { size: 56, weight: 800, anchor: "start" });
    K.text(next, -70, 92, "the Money Go?", { size: 56, weight: 800, anchor: "start" });
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => { const n = L13.node(svg, x, y); K.tex(K.shadow(n, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper"); return n; });
    const k = K.khataRig(svg, 330, 1020, 0.5, { expr: "happy" });
    const cover = L13.cover(svg, 14);

    // the cover from s12, full-frame, swinging open to the left
    tl.to(cover.inner, { scaleX: 0.02, svgOrigin: "0 540", duration: 0.6, ease: "power2.in" }, t0 + 0.3);
    tl.to(cover.inner.querySelectorAll("text"), { opacity: 0, duration: 0.2, ease: "power1.in" }, t0 + 0.32);
    tl.set(cover.inner, { autoAlpha: 0 }, t0 + 0.9);
    [title, next, panels[0], panels[1]].forEach((n, i) => pop(n, t0 + 0.55 + i * 0.08));
    k.jitter(tl, t0, sc.end);
    tl.set(k.g, { autoAlpha: 0 }, 0); tl.set(k.g, { autoAlpha: 1 }, t0 + 1.0);
    k.hop(tl, t0 + 1.0, { height: 70 });
    [2.3, 7.4].forEach((d) => {
      const t = t0 + d;
      k.arm(tl, t, "R", 140, 0.2);
      [0, 1, 2].forEach((b) => { k.arm(tl, t + 0.2 + b * 0.32, "R", 105, 0.16); k.arm(tl, t + 0.36 + b * 0.32, "R", 140, 0.16); });
      k.arm(tl, t + 1.3, "R", 20, 0.3);
    });
    k.blink(tl, t0 + 4.5).blink(tl, t0 + 9.6);
    k.expr(tl, t0 + 7.3, "wink").expr(tl, t0 + 8.4, "happy");
    L13.allow(svg);
  };
})();
