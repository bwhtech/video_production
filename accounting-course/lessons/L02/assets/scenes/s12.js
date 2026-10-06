// s12 — End card (12 s, no VO): the "3" cover swings open onto the series wordmark, an "Up next" card (Lesson 3 · The Scale That Never Tips),
// two blank paper panels for YouTube end-screen videos, Khata waving. (Same layout as L1's end card.)
(function () {
  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", t0 = sc.start;
    K.wall(svg, C.violet, 960); K.table(svg, 960);
    const title = DH.node(svg, 540, 150);
    K.label(title.inner, 0, 0, window.SERIES_NAME(), { size: 60, font: "title", weight: 400, bg: "paper", rot: -2 });
    const next = DH.node(svg, 540, 500);
    {
      const gi = next.inner;
      K.card(gi, 0, 0, 780, 420, { header: C.saffron, title: "Up next", titleSize: 44, headerH: 76 });
      K.scale(gi, -250, 150, 0.2, {});                                       // small brass scale prop
      K.text(gi, -90, -40, "Lesson 3", { size: 40, weight: 800, color: C.coralText, anchor: "start" });
      K.text(gi, -90, 34, "The Scale That", { size: 48, weight: 800, anchor: "start" });
      K.text(gi, -90, 108, "Never Tips", { size: 48, weight: 800, anchor: "start" });
    }
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => {
      const n = DH.node(svg, x, y);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper");
      return n;
    });
    const k = K.khataRig(svg, 330, 1020, 0.5, { expr: "happy" });
    const cover = DH.cover(svg, K, "3");

    tl.to(cover.inner, { scaleX: 0.02, svgOrigin: "0 540", duration: 0.6, ease: "power2.in" }, t0 + 0.3);
    tl.to(cover.inner.querySelectorAll("text"), { opacity: 0, duration: 0.2, ease: "power1.in" }, t0 + 0.32);
    tl.set(cover.inner, { autoAlpha: 0 }, t0 + 0.9);
    [title.inner, next.inner, panels[0].inner, panels[1].inner].forEach((el, i) => DH.pop(tl, el, t0 + 0.55 + i * 0.08, { from: 1.1 }));
    k.jitter(tl, t0, sc.end);
    tl.set(k.g, { autoAlpha: 0 }, 0);
    tl.set(k.g, { autoAlpha: 1 }, t0 + 1.0);
    k.hop(tl, t0 + 1.0, { height: 70 });
    k.arm(tl, t0 + 1.9, "L", 20).wiggle(tl, t0 + 1.9);
    [2.3, 7.4].forEach((d) => {
      const t = t0 + d;
      k.arm(tl, t, "R", 140, 0.2);
      [0, 1, 2].forEach((b) => { k.arm(tl, t + 0.2 + b * 0.32, "R", 105, 0.16); k.arm(tl, t + 0.36 + b * 0.32, "R", 140, 0.16); });
      k.arm(tl, t + 1.3, "R", 20, 0.3);
    });
    k.blink(tl, t0 + 4.5).blink(tl, t0 + 9.6);
    k.expr(tl, t0 + 7.3, "wink").expr(tl, t0 + 8.4, "happy");
  };
})();
