// s11 · Outro / end card — the "2" cover from s10 swings open onto the end card; Khata waves goodbye.
// Right side is left as clean paper panels for YouTube end-screen elements.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0";
    K.wall(svg, C.violet, 960); K.table(svg, 960);

    const title = DH.node(svg, 540, 150);
    K.label(title.inner, 0, 0, window.SERIES_NAME(), { size: 60, font: "title", weight: 400, bg: "paper", rot: -2 });

    // up-next card
    const next = DH.node(svg, 540, 490);
    {
      const gi = next.inner;
      K.card(gi, 0, 0, 780, 400, { header: C.saffron, title: "Up next", titleSize: 44, headerH: 76 });
      K.galla(gi, -250, 150, 0.9, { open: true, overflow: true });
      K.text(gi, -100, -40, "Lesson 2", { size: 42, weight: 800, color: C.coralText, anchor: "start" });
      K.text(gi, -100, 28, "What You Have,", { size: 48, weight: 800, anchor: "start" });
      K.text(gi, -100, 92, "What You Owe", { size: 48, weight: 800, anchor: "start" });
    }

    // YouTube end-screen safe zones (videos right) as clean paper panels
    const panels = [[1450, 300], [1450, 720]].map(([x, y]) => {
      const n = DH.node(svg, x, y);
      K.tex(K.shadow(n.inner, 2), K.cutRect(-330, -190, 660, 380, 2, 30), "pat-paper");
      return n;
    });

    const k = K.khataRig(svg, 330, 1020, 0.5, { expr: "happy" });

    // the cover from s10, full-frame, swinging open to the left
    const cover = DH.cover(svg, K);

    // ---------------- timing (fixed 12 s card) ----------------
    const t0 = sc.start;
    tl.to(cover.inner, { scaleX: 0.02, svgOrigin: "0 540", duration: 0.6, ease: "power2.in" }, t0 + 0.3);
    // the cover lettering fades as it turns edge-on (squeezed text would collide)
    tl.to(cover.inner.querySelectorAll("text"), { opacity: 0, duration: 0.2, ease: "power1.in" }, t0 + 0.32);
    tl.set(cover.inner, { autoAlpha: 0 }, t0 + 0.9);

    const items = [title.inner, next.inner, panels[0].inner, panels[1].inner];
    items.forEach((el, i) => DH.pop(tl, el, t0 + 0.55 + i * 0.08, { from: 0.7, rot: i % 2 ? 3 : -3 }));

    k.jitter(tl, t0, sc.end);
    tl.set(k.g, { autoAlpha: 0 }, 0);
    tl.set(k.g, { autoAlpha: 1 }, t0 + 1.0);
    k.hop(tl, t0 + 1.0, { height: 70 });
    k.arm(tl, t0 + 1.9, "L", 20); [[-5, 0.14], [5, 0.2], [0, 0.26]].reduce((tt, [r, d]) => { tl.to(k.body, { rotation: r, svgOrigin: "0 0", duration: d, ease: "power2.inOut" }, tt); return tt + d; }, t0 + 1.9);
    // wave goodbye twice (arm swings), then rest — the card holds composed
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
