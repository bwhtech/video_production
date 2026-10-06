// s03 — Deep roots (12 s of picture, one pass, no re-entries): an Indian merchant on a gaddi, a red bahi-khata tied with string, a brass lamp.
// Chips drop on their words: `naam = Dr` (blue), `jama = Cr` (orange), `khata = account` (paper). Khata slides out from behind the desk and winks —
// the ONE place the course explains Khata's name (bible §6.11). Out: the string unties and three gold loops drop away (→ the trays of s04).
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    const warm = K.mixColor(C.saffron, C.ink, 0.2);
    K.wall(svg, warm, 860); K.table(svg, 860);
    const cal = L7.cal(svg, 25);

    // arched window with a jaali (tone-on-tone, from L01's era 3)
    const win = K.g(svg, {});
    K.paper(K.shadow(win, 1), K.cutPoly([[1500, 760], [1500, 380], ...K.arc(1640, 380, 140, Math.PI, Math.PI * 2, 12), [1780, 760]], 2, 24), K.mixColor(warm, C.cream, 0.55));
    for (let i = 0; i < 5; i++) K.ink(win, [[1510 + i * 64, 760], [1510 + i * 64, 340 + Math.abs(2 - i) * 40]], 4, K.mixColor(warm, C.cream, 0.2), { opacity: 0.8 });
    for (let j = 0; j < 4; j++) K.ink(win, [[1506, 420 + j * 80], [1774, 420 + j * 80]], 4, K.mixColor(warm, C.cream, 0.2), { opacity: 0.8 });

    // Khata first (it hides behind the desk and slides out)
    const khata = K.khataRig(svg, 930, 800, 0.55, { expr: "awake" });
    // gaddi + bolster
    K.paper(K.shadow(svg, 2), K.cutRect(120, 790, 820, 100, 2.4), "#8e3b2c");
    K.paper(svg, K.cutRect(130, 798, 800, 14, 1, 30), "#b4583f");
    K.paper(K.shadow(svg, 2), K.cutEll(170, 780, 70, 46, 2), "#c2763f");
    const merchant = K.merchant(svg, 520, 818, 1.15, { sit: true, expr: "happy", aR: [40, 60], aL: [20, 40] });
    {
      const lap = K.shadow(merchant.body, 2);
      K.paper(lap, K.cutPoly([[-140, -84], [140, -84], [158, -40], [122, -6], [-122, -6], [-158, -40]], 1.6, 18), "#f3ede2");
      K.ink(lap, [[-8, -78], [10, -14]], 4, "#d9cfbf");
      K.paper(lap, K.cutEll(-112, -20, 30, 14, 1), "#8d5a3b"); K.paper(lap, K.cutEll(112, -20, 30, 14, 1), "#8d5a3b");
    }
    // low desk + the red bahi-khata tied with string
    K.paper(K.shadow(svg, 2), K.cutRect(740, 700, 380, 34, 2), C.woodDark);
    [770, 1090].forEach((x) => K.paper(K.shadow(svg, 1), K.cutRect(x - 10, 730, 20, 130, 1, 18), C.woodDark));
    const book = L7.node(svg, 930, 700);
    K.tex(K.shadow(book, 2), K.cutRect(-120, -118, 240, 118, 1.6), "pat-cover");
    const band = L7.node(book, 0, -58);
    K.paper(band, K.cutRect(-120, -9, 240, 18, 0.8, 14), C.gold);
    const knot = K.paper(band, K.cutEll(0, 0, 15, 15, 0.6), C.gold);
    // brass lamp on the desk's right end (flame = still paper cut)
    K.paper(K.shadow(svg, 1), K.cutPoly([[1030, 700], [1100, 700], [1086, 672], [1044, 672]], 1, 12), C.brass);
    K.paper(svg, K.cutPoly([[1065, 672], [1052, 654], [1060, 630], [1065, 610], [1070, 630], [1078, 654]], 1, 10), C.saffron);
    K.paper(svg, K.cutPoly([[1065, 668], [1058, 654], [1065, 634], [1072, 654]], 0.6, 8), C.cream);

    // chips
    const chip = (x, y, a, b, col, tc) => {
      const n = L7.node(svg, x, y); L7.hide(n);
      K.paper(K.shadow(n, 2), K.cutRect(-215, -50, 430, 100, 2, 22), col);
      K.text(n, -44, 3, a, { size: 62, weight: 800, color: tc, anchor: "end" });
      K.text(n, 0, 3, "=", { size: 62, weight: 800, color: tc });
      K.text(n, 44, 3, b, { size: 62, weight: 800, color: tc, anchor: "start" });
      return n;
    };
    const cNaam = chip(1180, 250, "naam", "Dr", C.dr, "#fff"), cJama = chip(1180, 380, "jama", "Cr", C.cr, C.ink);
    const cKhata = L7.node(svg, 1180, 510); L7.hide(cKhata);
    K.tex(K.shadow(cKhata, 2), K.cutRect(-300, -50, 600, 100, 2, 22), "pat-paper");
    K.text(cKhata, -44, 3, "khata", { size: 62, weight: 800, anchor: "end" }); K.text(cKhata, 0, 3, "=", { size: 62, weight: 800 }); K.text(cKhata, 44, 3, "account", { size: 62, weight: 800, anchor: "start" });

    // the string's three loops (exit)
    const loops = [0, 1, 2].map((i) => { const n = L7.node(svg, 930 + (i - 1) * 70, 640); L7.hide(n); K.el("path", { d: K.cutEll(0, 0, 30, 20, 1), fill: "none", stroke: C.gold, "stroke-width": 9 }, n); return n; });

    // ======================================================================================= timeline
    merchant.blinks(tl, T0 + 1.0, sc.end, 3.4, 5); khata.blink(tl, T0 + 4.5);
    merchant.look(tl, T0 + 0.8, 8, 4);
    // "Indian traders … the bahi-khata … centuries": merchant proud, touches the book
    merchant.arm(tl, cue("s03", "@bahi-khata") - 0.2, "R", 62, 52, 0.3).expr(tl, cue("s03", "@bahi-khata"), "proud");
    K.pulseNode(tl, book, cue("s03", "@bahi-khata"), 1.05);
    merchant.arm(tl, cue("s03", "@centuries") + 0.4, "R", 40, 60, 0.3);
    // chips on their words
    L7.drop(tl, cNaam, cue("s03", "@naam"), { dur: 0.3 });
    L7.drop(tl, cJama, cue("s03", "@jama"), { dur: 0.3 });
    L7.drop(tl, cKhata, cue("s03", "@khata", 1), { dur: 0.3 });
    // "khata means account" — Khata slides out from behind the desk
    const tK = cue("s03", "@khata", 1);
    tl.to(khata.mover, { x: 420, duration: 0.7, ease: K.stepEase(0.7, "power2.out", tK) }, tK + 0.2);
    khata.look(tl, tK + 0.7, 5, 0).expr(tl, tK + 0.7, "happy");
    // "gets its name" — look at camera, wink
    const tName = cue("s03", "@name");
    khata.look(tl, tName - 0.9, 0, 3);
    khata.expr(tl, cue("s03", "@gets"), "wink");
    khata.hop(tl, tName - 0.1, { height: 40 });
    merchant.expr(tl, tName, "grin");
    // exit: the string unties and three loops drop away
    const tEx = sc.end - 1.1;
    tl.to(band, { scaleX: 0.05, svgOrigin: O, duration: 0.5, ease: "power2.in" }, tEx);
    tl.to(knot, { opacity: 0, duration: 0.2 }, tEx + 0.4);
    loops.forEach((n, i) => { tl.set(n, { opacity: 1 }, tEx + 0.3 + i * 0.08); tl.to(n, { y: 330 + i * 40, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, tEx + 0.35 + i * 0.08); });
    L7.allow(svg);
  };
})();
