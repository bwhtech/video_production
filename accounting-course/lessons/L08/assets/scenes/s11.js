// s11 — Next time. Meera stares at the galla, then at the journal; the journal fans out into four pages behind it and the cash amounts light up on different
// rows, one by one — the answer is in pieces. Freeze, then Khata's red cover with a gold "9" slams shut over the frame → s12.
(function () {
  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, GY = 1030;
    L8.stage(svg, C.teal, 880);
    L8.cal(svg, 30);
    const m = K.meera(svg, 250, GY, 0.8, { expr: "thinking" });
    // four journal pages (fanned, drifting apart on "in pieces")
    const spec = [
      [560, 470, -5, [{ amt: "50,000" }, null, { amt: "36,000" }]],
      [900, 450, -1.5, [null, { amt: "18,000" }, null]],
      [1240, 450, 1.5, [{ amt: "5,000" }, null, { amt: "22,000" }]],
      [1580, 470, 5, [{ amt: "3,300" }, null, null]],
    ];
    const pages = spec.map(([x, y, r, rows]) => L8.page(svg, x, y, r, rows));
    pages.forEach((p) => L8.hide(p.n));
    // the galla (shut), with a `₹ ?` chip above it
    const galla = K.galla(svg, 1060, 1000, 1.1, {});
    const chip = L8.node(svg, 1060, 740); L8.hide(chip);
    K.paper(K.shadow(chip, 1), K.cutRect(-95, -52, 190, 104, 1.6, 22), C.cream);
    K.text(chip, 0, 5, "₹ ?", { size: 76, weight: 800, color: C.coralText });
    const cover = L8.cover9(svg);
    L8.allow(svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.1); m.jitter(tl, T0, sc.end);
    m.look(tl, cue("s11", "@simple"), 8, 2);
    // "a simple question" — Meera stares at the galla; the chip appears with "how much cash"
    m.look(tl, cue("s11", "@galla"), 9, 4);
    L8.drop(tl, chip, cue("s11", "@galla") + 0.1, { dur: 0.3 });
    // "The journal knows…" — the four pages deal in from the right and fan
    const tJ = cue("s11", "@journal");
    m.look(tl, tJ, 6, -3);
    pages.forEach((p, i) => {
      const pp = p.n;
      tl.fromTo(pp, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, tJ - 0.1 + i * 0.12);
    });
    // the cash amounts light up one by one on twos; the pages drift apart on "in pieces"
    const lights = [pages[0].lit[0], pages[0].lit[1], pages[1].lit[0], pages[2].lit[0], pages[2].lit[1], pages[3].lit[0]];
    const tH0 = cue("s11", "@journal") + 0.9, tPieces = cue("s11", "@pieces");
    lights.forEach((l, i) => {
      const t = tH0 + i * ((tPieces + 0.3 - tH0) / lights.length);
      tl.fromTo(l.strip, { opacity: 0 }, { opacity: 0.85, duration: 0.2, ease: K.stepEase(0.2, "none", t), immediateRender: false }, t);
    });
    m.expr(tl, tJ + 0.4, "puzzled").headTilt(tl, tJ + 0.8, -6);
    const drift = [-34, -12, 12, 34];
    pages.forEach((p, i) => tl.to(p.n, { x: drift[i], duration: 0.9, ease: "power1.inOut" }, tPieces - 0.2));
    // freeze, then the "9" cover slams shut
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
  };
})();
