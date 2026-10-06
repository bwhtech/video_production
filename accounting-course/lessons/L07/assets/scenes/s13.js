// s13 — Next time. April 30, the morning rush: a queue at the stall, tumblers, coins. The calendar strip lands on 30; five tiny event icons pop above the stall
// ("five things"); Meera grabs a paper tissue + pencil and scribbles; a breath of wind lifts the tissue's corner — freeze (4 % push) — Khata's "8" cover slams over → s14.
(function () {
  // full-frame red cloth ledger cover with a gold "8" (also drawn at the start of s14)
  window.L7.cover8 = (K, parent) => {
    const C = K.C;
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, "8", { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  window.OWN_SEAM_IN.s14 = true;

  window.SCENES.s13 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start, GY = 1015;
    const cam = K.g(svg, {});
    L7.stage(cam, C.saffron, 880);
    const cal = L7.cal(svg, 25);
    // the stall at the pitch, a short queue to its right, Meera at the counter's left
    const stall = K.stall(cam, 1180, GY, 0.95, { galla: true });
    const m = K.meera(cam, 760, GY, 1.0, { expr: "happy" });
    const c1 = K.priya(cam, 1560, GY, 0.82, { expr: "happy" }), c2 = K.gopal(cam, 1730, GY, 0.82, { expr: "happy" });
    // five tiny event icons above the stall
    const icons = [["banknote"], ["receipt"], ["mail"], ["ravi"], ["wallet"]].map(([k], i) => {
      const n = L7.node(cam, 940 + i * 120, 250); L7.hide(n);
      if (k === "ravi") { K.tex(K.shadow(n, 1), K.cutEll(0, 0, 54, 54, 0.8), "pat-paper"); K.faceArt(n, "ravi", 46); } else K.medallion(n, 0, 0, 52, k);
      return n;
    });
    // paper tissue on the counter → in Meera's hand
    const tissue = L7.node(cam, 1040, 745, 1); L7.hide(tissue);
    K.paper(K.shadow(tissue, 1), K.cutRect(-46, -34, 92, 68, 1.2, 12), "#fbf7ef");
    const corner = K.g(tissue, { transform: "translate(46 -34)" }); K.paper(corner, K.cutPoly([[0, 0], [-26, 0], [0, 26]], 0.6, 8), "#e9e0d0");
    const pencil = L7.node(m.handAnchor("R"), 0, 0); L7.hide(pencil); K.ink(pencil, [[-4, 0], [26, -34]], 7, C.gold); K.paper(pencil, K.cutPoly([[26, -34], [34, -42], [30, -30]], 0.3, 6), C.pink);
    const cover = window.L7.cover8(K, svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.3); m.jitter(tl, T0, sc.end); stall.jitter(tl, T0, sc.end);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end);
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 600" }, { scale: 1.04, svgOrigin: "960 600", duration: sc.end - T0 - 0.3, ease: "none" }, T0);
    // "April thirtieth." — the calendar strip ticks forward to 30
    cal.tickTo(tl, cue("s13", "@april"), 30, { dur: 0.7 });
    // queue + coins: customers shuffle a step toward the stall
    [c1, c2].forEach((c, i) => c.look(tl, T0 + 0.8 + i * 0.3, -6, 0));
    // "Five things happen before lunch" — the five icons pop, 0.12 s apart
    const t5 = cue("s13", "@five") - 0.1;
    icons.forEach((n, i) => L7.drop(tl, n, t5 + i * 0.12, { dur: 0.3 }));
    stall.galla && stall.galla.open(tl, t5 - 0.2);
    // "Meera grabs a tissue to write them all down" — tissue → hand, pencil, scribble (stepped), wind lifts the corner
    const tG = cue("s13", "@grabs");
    L7.drop(tl, tissue, tG - 0.8, { dur: 0.3 });
    m.look(tl, tG - 0.5, 8, 6).expr(tl, tG - 0.3, "thinking");
    m.arm(tl, tG, "R", 80, 60, 0.3);
    tl.to(tissue, { x: -270, y: -45, duration: 0.5, ease: "power2.inOut" }, tG + 0.1);
    L7.drop(tl, pencil, cue("s13", "@tissue") - 0.1, { dur: 0.25 });
    const tW = cue("s13", "@write");
    for (let k = 0; k < 6; k++) m.arm(tl, tW + k * 0.17, "R", 80 + (k % 2 ? 8 : -6), 60 + (k % 2 ? -10 : 10), 0.12);
    m.expr(tl, tW, "happy");
    // wind: the tissue's corner lifts, then FREEZE (4 % push) and the "8" cover slams shut
    const tLand = sc.end - 0.18;
    tl.to(corner, { rotation: -28, svgOrigin: O, duration: 0.35, ease: "power2.out" }, tLand - 0.8);
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
    L7.allow(svg);
  };
})();
