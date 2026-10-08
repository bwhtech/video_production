// s01 — Cold open: April 30. Meera totals the month on a paper napkin — ₹36,700 profit, confetti — Khata freezes it mid-air:
// "three things are missing, and none of them takes a rupee out of the galla". Exit: Khata drops onto the napkin, closes, the camera
// rushes into its red cover → s01t (the cover fills the frame).
(function () {
  window.OWN_SEAM_IN.s01t = true;
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start, GROUND = 1000;
    const cam = K.g(svg, { id: "s01-cam" });
    L.stage(cam, C.saffron, 880);

    // ---- set: napkin (centre-right), galla (closed), Khata perched on the counter edge
    const NX = 1060, NY = 575, NS = 1.55;
    const nap = K.napkin(cam, NX, NY, NS, { w: 380, h: 480, rot: -2, hidden: true,
      lines: [["Sales", "₹50,000"], ["− Rent", "₹5,000"], ["− Salary", "₹8,000"], ["− Interest", "₹300"], ["Profit", null]] });
    const rowY = (i) => nap.rows[i].y;
    // the total counts up beside its label (a ticker; the other numbers are inked by the pencil)
    const totTk = K.ticker(nap.body, 150, rowY(4) + 2, 1, { value: 0, size: 40, anchor: "end", color: C.ink }); L.hide(totTk.g);
    // three empty slots slide in under the total (the missing lines)
    const slots = [-112, 0, 112].map((x) => {
      const s = L.hide(L.node(nap.body, x, 168));
      K.paper(s, K.cutRect(-48, -26, 96, 52, 1.2, 16), C.cream, { opacity: 0.6 });
      K.el("path", { d: K.cutRect(-43, -21, 86, 42, 1, 16), fill: "none", stroke: C.ink, "stroke-width": 3.4, "stroke-dasharray": "11 8", "stroke-linecap": "round", opacity: 0.8 }, s);
      return { s, x };
    });
    const galla = K.galla(cam, 1560, GROUND - 6, 0.7, {});
    const khata = K.khataRig(cam, 1750, GROUND - 6, 0.62, { expr: "awake" });
    const gHalo = L.node(cam, 1560, GROUND - 100); L.hide(gHalo);
    K.el("path", { d: K.cutEll(0, 0, 130, 100, 1.4), fill: "none", stroke: C.gold, "stroke-width": 10 }, gHalo);

    // ---- Meera with a pencil in her right hand
    const m = K.meera(cam, 470, GROUND, 0.98, { expr: "neutral" });
    const pen = K.g(m.handAnchor("R"), {});
    K.paper(pen, K.cutRect(-4, -40, 9, 52, 0.4, 8), C.mustard); K.paper(pen, K.cutPoly([[-4, 12], [5, 12], [0, 24]], 0.2, 6), "#e8cfa4");
    K.holdProp(m, "R", pen, [12, 8]);

    // ---- paper confetti (flat cut-out strips) — burst on "first", then FREEZE dead mid-air
    const CONF = [C.coral, C.saffron, C.teal, C.sky, C.violet, C.leaf, C.gold, C.pink];
    const conf = CONF.map((col, i) => {
      const n = L.hide(L.node(cam, NX, NY - 40));
      K.paper(K.shadow(n, 1), K.cutRect(-22, -12, 44, 24, 0.6, 10), col);
      const T = [[720, 250], [800, 160], [1010, 150], [1250, 165], [1470, 250], [1540, 430], [1620, 310], [1760, 200]][i];
      return { n, col, dx: T[0] - NX, dy: T[1] - (NY - 40), rot: (i % 2 ? 1 : -1) * (90 + i * 25) };
    });

    // ---- fade from black + the red cover for the rush
    const cal = L.cal(svg, 30);
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const red = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.redDark, opacity: 0 }, svg);

    // ======================================================================================= timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.0, ease: "power1.out" }, T0);
    const tRush = sc.end - 0.5;
    tl.fromTo(cam, { scale: 1, x: 0, y: 0, svgOrigin: "960 560" }, { scale: 1.06, x: 0, y: 0, svgOrigin: "960 560", duration: tRush - T0 - 1.2, ease: "none" }, T0);

    // the rush is over: a tired-happy breath before the sum
    m.expr(tl, T0 + 1.3, "happy"); m.shrug(tl, T0 + 2.4, 0.9); m.look(tl, T0 + 3.8, -4, 4); m.look(tl, T0 + 4.8, 6, 6);
    // s01a — the napkin sum, each line inked on its word
    const tN = cue("s01a", "@napkin");
    nap.slideIn(tl, tN - 0.1, { dur: 0.5 });
    m.look(tl, tN, 6, 6).expr(tl, tN, "thinking");
    const scribble = (t0, n = 5) => { for (let i = 0; i < n; i++) m.arm(tl, t0 + i * 0.16, "R", i % 2 ? 78 : 66, i % 2 ? 36 : 52, 0.14); };
    [["@sales", 0], ["@rent", 1], ["@salary", 2], ["@interest", 3]].forEach(([w, i]) => { const t = cue("s01a", w); nap.write(tl, t, i, { dur: 0.55 }); scribble(t - 0.05, 4); });
    const tL = cue("s01a", "@leaves");
    nap.write(tl, tL, 4, { dur: 0.35 });
    m.arm(tl, tL + 0.5, "R", 12, 8, 0.25);
    const tP = cue("s01a", "@profit");
    L.drop(tl, totTk.g, tP - 0.05, { dur: 0.3 }); totTk.to(tl, tP + 0.1, 36700, 1.0);
    m.expr(tl, tP + 0.3, "joy"); m.pose(tl, tP + 0.35, { aL: [160, 12], aR: [160, 12], dur: 0.3 });
    // s01b — confetti on "first", freeze dead on the hush
    const tB = cue("s01b", "@first"), tF = segEnd("s01b") + 0.15;
    conf.forEach((c, i) => {
      const t = tB + i * 0.03;
      tl.set(c.n, { opacity: 1 }, t);
      tl.fromTo(c.n, { x: 0, y: 0, rotation: 0, svgOrigin: O }, { x: c.dx, y: c.dy, rotation: c.rot, svgOrigin: O, duration: tF - t, ease: "none", immediateRender: false }, t);
    });
    // s01c — Khata freezes it; Meera looks over, puzzled; three missing lines slide in
    const tFast = cue("s01c", "@fast");
    khata.hop(tl, tFast - 0.2, { height: 50 }).expr(tl, tFast - 0.2, "wow");
    khata.arm(tl, tFast, "L", 95, 0.3);
    m.pose(tl, tFast + 0.1, { aL: [12, 8], aR: [12, 8], dur: 0.3 }); m.expr(tl, tFast + 0.2, "puzzled"); m.look(tl, tFast + 0.2, 9, -2);
    [cue("s01c", "@three"), cue("s01c", "@things"), cue("s01c", "@missing")].forEach((t, i) => {
      const s = slots[i];
      tl.fromTo(s.s, { x: 90, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out", immediateRender: false }, t - 0.05);
    });
    const tG = cue("s01c", "@galla");
    tl.to(gHalo, { opacity: 1, duration: 0.12 }, tG); tl.to(gHalo, { opacity: 0, duration: 0.3 }, tG + 1.0);
    m.look(tl, tG, 6, 8);
    // exit: Khata drops onto the napkin and closes; camera rushes into its red cover
    const tD = segEnd("s01c") - 1.0;
    khata.arm(tl, tD - 0.3, "L", 10, 0.2);
    tl.to(khata.mover, { x: NX - 1750, y: NY - GROUND + 120, duration: 0.5, ease: "power2.in" }, tD);
    khata.close(tl, tD + 0.5, 0.3);
    const KC = [NX, NY - 40];
    tl.to(cam, { scale: 14, x: 960 - KC[0], y: 540 - KC[1], svgOrigin: `${KC[0]} ${KC[1]}`, duration: sc.end - tD - 0.7, ease: "power3.in", immediateRender: false }, tD + 0.7);
    tl.to(red, { opacity: 1, duration: 0.2, ease: "none" }, sc.end - 0.25);

    L.allow(cam);
    m.blinks(tl, T0 + 1.6, tF + 2, 3.4); khata.blink(tl, T0 + 3.0); khata.blink(tl, T0 + 12);
    m.jitter(tl, T0, sc.end);
  };
})();
