// s12 — End card (12 s, no VO). The "5" cover from s11 swings open onto the series wordmark, the "Up next" card (Lesson 5 · Profit Is Not
// Cash, two gauges pointing different ways) and two blank paper panels for YouTube end-screen videos. Khata waves.
(function () {
  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    K.wall(svg, C.violet, 960); K.table(svg, 960);
    const popIn = (n, t, rot) => { L4.show(tl, n.outer, t); K.dropIn(tl, n.inner, t, { dur: 0.38 }); n.outer.setAttribute("opacity", "0"); };

    const title = L4.node(svg, 540, 150);
    K.label(title.inner, 0, 0, window.SERIES_NAME(), { size: 60, font: "title", weight: 400, bg: "paper", rot: -2 });
    const next = L4.node(svg, 540, 500);
    {
      const gi = next.inner;
      K.card(gi, 0, 0, 780, 420, { header: C.saffron, title: "Up next", titleSize: 44, headerH: 76 });
      K.text(gi, -350, -55, "Lesson 5", { size: 44, weight: 800, color: C.coralText, anchor: "start" });
      K.text(gi, -350, 22, "Profit Is", { size: 56, weight: 800, anchor: "start" });
      K.text(gi, -350, 104, "Not Cash", { size: 56, weight: 800, anchor: "start" });
      K.gauge(gi, 130, 90, 84, 0.88, { color: C.cr });
      K.gauge(gi, 320, 90, 84, 0.12, { color: C.dr });
      K.label(gi, 130, 158, "Profit", { size: 34, bg: "paper" });
      K.label(gi, 320, 158, "Cash", { size: 34, bg: "paper" });
    }
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => {
      const n = L4.node(svg, x, y);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper");
      return n;
    });
    const k = K.khataRig(svg, 330, 1020, 0.5, { expr: "happy" });
    const cover = window.L4.cover(svg, K, 5);

    const t0 = sc.start;
    tl.to(cover.inner, { scaleX: 0.02, svgOrigin: "0 540", duration: 0.6, ease: "power2.in" }, t0 + 0.3);
    tl.to(cover.inner.querySelectorAll("text"), { opacity: 0, duration: 0.2, ease: "power1.in" }, t0 + 0.32);
    tl.set(cover.inner, { autoAlpha: 0 }, t0 + 0.9);
    [title, next, panels[0], panels[1]].forEach((n, i) => popIn(n, t0 + 0.55 + i * 0.08));
    k.g.setAttribute("opacity", "0");
    tl.set(k.g, { opacity: 1 }, t0 + 1.0);
    k.hop(tl, t0 + 1.0, { height: 70 });
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
