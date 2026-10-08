// s11 — End card (12 s, no VO). The "10" cover from s10 swings open onto --scene-violet: series wordmark, an "Up next" card (Lesson 10 · Month-End Surprises, with a tear-off calendar page showing 30), two clean paper panels for YouTube end-screen videos, Khata waving. No subscribe circle, no credits.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L9, t0 = sc.start;
    K.wall(svg, C.violet, 960); K.table(svg, 960);
    const pop = (n, t) => { L7.hide(n); K.dropIn(tl, n, t, { dur: 0.34 }); return n; };

    const title = L7.node(svg, 540, 150);
    K.label(title, 0, 0, window.SERIES_NAME(), { size: 60, font: "title", weight: 400, bg: "paper", rot: -2 });
    // "Up next" card
    const next = L7.node(svg, 540, 490);
    K.card(next, 0, 0, 780, 400, { header: C.saffron, title: "Up next", titleSize: 44, headerH: 76 });
    // a small tear-off calendar page showing 30 (the month ends)
    const cp = K.calendarPage(next, -240, 52, 0.62, { month: "April", day: 30 });
    L7.allow(cp.g);
    K.text(next, -90, -64, "Lesson 10", { size: 42, weight: 800, color: C.coralText, anchor: "start" });
    K.text(next, -90, 28, "Month-End", { size: 58, weight: 800, anchor: "start" });
    K.text(next, -90, 104, "Surprises", { size: 58, weight: 800, anchor: "start" });
    // YouTube end-screen safe zones (videos on the right) as clean paper panels
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => { const n = L7.node(svg, x, y); K.tex(K.shadow(n, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper"); return n; });
    const k = K.khataRig(svg, 330, 1020, 0.5, { expr: "happy" });
    const cover = window.L9.cover(svg, 10);

    // the cover from s10, full-frame, swinging open to the left
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
    L7.allow(svg);
  };
})();
