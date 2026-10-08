// s01 — Cold open: April 30, the morning rush. Five things happen before lunch — five little cards drop in above the stall as the VO lists them; Meera scribbles
// them all on a tissue; a gust takes the tissue ("Gone."); "a year from now?" (the calendar label turns forward). Exit: the tissue slaps flat across the lens → s01t.
(function () {
  window.OWN_SEAM_IN.s01t = true;   // s01 owns the tissue slap, s01t slides it away
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, GY = 1030;
    const cam = K.g(svg, { id: "s01-cam" });
    L8.stage(cam, C.saffron, 880);
    const cal = L8.cal(svg, 28);
    // ---- set: the stall (no face, no galla) right of centre, tissue box on the table, Meera in front
    const stall = K.stall(cam, 1330, GY, 0.95, { galla: false });
    const box = K.tissueBox(cam, 1010, GY - 6, 1.0, {});
    const m = K.meera(cam, 700, GY, 0.95, { expr: "happy" });
    const tis = K.tissue(svg, 1010, 880, 1.0, { hidden: true });
    const wind = K.windLines(svg, 60, 640, 1, { n: 3, len: 280 });
    // ---- the five cards (picture + one number)
    const CX = [470, 780, 1090, 1400, 1710], CY = 300, CW = 270, CH = 270;
    const card = (i, art) => {
      const n = L8.node(svg, CX[i], CY); L8.hide(n); L8.card(n, CW, CH);
      const tk = K.ticker(n, 0, 88, 1, { value: 0, size: 52 });
      art(n);
      return { n, tk };
    };
    const c1 = card(0, (n) => { K.medallion(n, 0, -34, 62, "banknote"); });
    const c2 = card(1, (n) => { K.tex(K.shadow(n, 1), K.cutEll(-50, -34, 54, 54, 1), "pat-paper"); K.faceArt(L8.node(n, -50, -34), "infotech", 46); K.medallion(n, 56, -34, 42, "receipt"); });
    const c3 = card(2, (n) => { K.raju(n, -46, 14, 0.2, { tray: false, expr: "happy" }); K.medallion(n, 52, -34, 46, "smartphone"); });
    const c4 = card(3, (n) => { K.tex(K.shadow(n, 1), K.cutEll(-50, -34, 54, 54, 1), "pat-paper"); K.faceArt(L8.node(n, -50, -34), "ravi", 46); K.medallion(n, 56, -34, 42, "umbrella"); });
    const c5 = card(4, (n) => { K.medallion(n, 0, -34, 62, "wallet"); });
    const cards = [[c1, 22000], [c2, 4000], [c3, 8000], [c4, 3300], [c5, 3000]];
    const pencil = L8.pencil(svg, 900, 820, 0.9);
    const slap = L8.node(svg, 960, 540); L8.hide(slap);
    K.el("rect", { x: -1100, y: -640, width: 2200, height: 1280, fill: "#fbf7ef" }, slap);
    K.el("path", { d: "M-1100,-120 C-700,-170 -300,-90 100,-130 S800,-170 1100,-110", fill: "none", stroke: "#e4dac8", "stroke-width": 8 }, slap);
    K.el("path", { d: "M-900,150 C-500,110 -100,190 300,140 S900,100 1100,170", fill: "none", stroke: "#e4dac8", "stroke-width": 6 }, slap);
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    L8.allow(svg);

    // =============================================================================== timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.0, ease: "power1.out" }, T0);
    m.blinks(tl, T0 + 1.6, sc.end - 1, 3.2); m.jitter(tl, T0, sc.end); stall.jitter(tl, T0, sc.end);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end);
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 560" }, { scale: 1.04, svgOrigin: "960 560", duration: sc.end - T0 - 0.8, ease: "none" }, T0);
    cal.tickTo(tl, cue("s01a", "@thirtieth") - 0.2, 30, { dur: 0.8 });
    // the five things — each card drops on its VO word; Meera acts each one
    const word = ["@sales", "@bill", "@salary", "@loan", "@herself"];
    cards.forEach(([c, v], i) => {
      const t = cue("s01a", word[i]) - 0.25;
      L8.drop(tl, c.n, t, { dur: 0.4 }); c.tk.to(tl, t + 0.2, v, 0.8);
    });
    m.look(tl, cue("s01a", "@lunch"), 8, -3);
    m.expr(tl, cue("s01a", "@five"), "happy");
    // Meera counts the notes (stepped arm), waves to Infotech, taps the phone, hands notes over, pockets her share
    const tCount = cue("s01a", "@meera");
    for (let k = 0; k < 6; k++) m.arm(tl, tCount + 0.5 + k * 0.22, "R", 70 + (k % 2 ? 6 : -6), 80 + (k % 2 ? -10 : 8), 0.12);
    m.arm(tl, cue("s01a", "@sales") + 0.8, "R", 12, 8, 0.25);
    const tW = cue("s01a", "@infotech");
    m.wave(tl, tW, "R", 2);
    const tR = cue("s01a", "@raju");
    for (let k = 0; k < 4; k++) m.arm(tl, tR + 0.1 + k * 0.25, "R", 78, 66 + (k % 2 ? 8 : 0), 0.12);
    m.arm(tl, cue("s01a", "@salary") + 0.6, "R", 12, 8, 0.25);
    const tRv = cue("s01a", "@ravi");
    m.arm(tl, tRv, "L", 80, 20, 0.3); m.arm(tl, tRv + 0.9, "L", 12, 8, 0.3);
    m.arm(tl, cue("s01a", "@money") - 0.1, "R", 60, 100, 0.3); m.expr(tl, cue("s01a", "@herself"), "grin"); m.arm(tl, cue("s01a", "@herself") + 0.9, "R", 12, 8, 0.3);
    // s01b — she grabs a tissue from the box and scribbles it all down (the cards fold into scribbles on it)
    const tG = cue("s01b", "@grabs"), tTis = cue("s01b", "@tissue"), tSc = cue("s01b", "@scribbles");
    m.look(tl, tG - 0.3, 10, 8).expr(tl, tG - 0.2, "thinking");
    box.pull(tl, tG - 0.1, { dy: 80, dur: 0.4 });
    tis.enter(tl, tG + 0.2, { dur: 0.25 });
    tl.to(tis.body, { x: -150, y: -110, duration: 0.5, ease: "power2.inOut" }, tG + 0.25);   // into her hand
    m.arm(tl, tG + 0.2, "R", 80, 60, 0.3);
    pencil.show(tl, tTis + 0.1); pencil.goto(tl, tTis + 0.1, 860, 790, 0.3);
    cards.forEach(([c], i) => {
      tl.to(c.n, { x: 850 - CX[i], y: 790 - CY, scale: 0.12, duration: 0.55, ease: "power2.in" }, tSc - 0.4 + i * 0.1);
      tl.to(c.n, { opacity: 0, duration: 0.1 }, tSc + 0.12 + i * 0.1);
    });
    for (let k = 0; k < 8; k++) m.arm(tl, tSc - 0.2 + k * 0.16, "R", 80 + (k % 2 ? 8 : -6), 60 + (k % 2 ? -10 : 10), 0.12);
    for (let k = 0; k < 10; k++) tl.set(pencil.g, { x: 830 + (k % 2 ? 28 : 0), y: 790 + (k % 3) * 8 }, tSc - 0.2 + k * 0.13);
    pencil.hide(tl, tSc + 1.2);
    m.expr(tl, tSc + 0.8, "happy");
    // the gust (silent 1.6 s gap): three paper wind-lines, the tissue lifts out of her hand and tumbles to the upper right; she keeps reaching
    const tGust = segEnd("s01b") + 0.05;
    wind.gust(tl, tGust, { dur: 1.2, dist: 2100 });
    m.expr(tl, tGust + 0.35, "worried"); m.arm(tl, tGust + 0.4, "R", 110, 20, 0.25); m.look(tl, tGust + 0.4, 9, -8);
    tl.to(tis.body, { x: 900, y: -640, rotation: 380, duration: 1.3, ease: "power2.in" }, tGust + 0.35);
    tl.to(tis.body, { opacity: 0, duration: 0.15 }, tGust + 1.6);
    // "Gone." — dead still
    m.expr(tl, cue("s01c", "@gone") + 0.1, "sad");
    // "How will Meera remember any of this… a year from now?" — the label turns forward; head tilt
    cal.setMonth(tl, cue("s01c", "@year"), HI_LABEL());
    m.expr(tl, cue("s01c", "@remember"), "puzzled").headTilt(tl, cue("s01c", "@year"), 8); m.arm(tl, cue("s01c", "@year") + 0.2, "R", 12, 8, 0.4);
    // exit: the tissue comes rushing back from the distance and slaps flat across the lens
    const tSlap = sc.end - 0.7;
    tl.set(slap, { opacity: 1, scale: 0.03, rotation: 25 }, tSlap - 0.01);
    tl.to(slap, { scale: 1.25, rotation: 0, duration: 0.65, ease: "power3.in" }, tSlap);
    function HI_LABEL() { return "+1 yr"; }
  };
})();
