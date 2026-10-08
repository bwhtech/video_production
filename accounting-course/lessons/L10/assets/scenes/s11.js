// s11 — Next time: twenty transactions, nineteen accounts. Khata sends 19 little khatas into a tall tower (the "20" slip pile + "19" chip); the tower leans once;
// Meera squints, then holds up one blank sheet ("one sheet of paper can tell us"); Khata winks on "almost". Then the series cover "11" slams over → s12.
(function () {
  // full-frame red cloth ledger cover with a gold number (also drawn at the start of s12)
  window.L10.cover = (K, parent, num) => {
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
    K.text(inner, 800, 545, String(num), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  window.OWN_SEAM_IN.s12 = true;

  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L10, T0 = sc.start, GY = 1010;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);
    const khata = K.khataRig(svg, 420, GY, 0.7, { expr: "awake" });
    const m = K.meera(svg, 1500, GY, 0.98, { expr: "neutral" });
    // slip pile "20"
    const pile = L.hide(L.node(svg, 760, 900));
    { [0, 1, 2, 3].forEach((i) => { const s = K.g(pile, { transform: `translate(${i * 6 - 10} ${-i * 9}) rotate(${[-6, 4, -3, 7][i]})` }); K.tex(K.shadow(s, 1), K.cutRect(-70, -44, 140, 88, 1.4, 14), "pat-paper"); K.ink(s, [[-48, -14], [48, -14]], 3, "#a39684"); K.ink(s, [[-48, 8], [20, 8]], 3, "#a39684"); }); }
    const c20 = L.hide(L.node(svg, 760, 790)); K.label(c20, 0, 0, "20", { size: 60, bg: C.saffron, weight: 800, w: 100, h: 84 });
    // the tower: 19 flat little khatas, each lies on the one below
    const TX = 1090, TB = 1000, BH = 40, BW = 190;
    const books = Array.from({ length: 19 }, (_, i) => {
      const n = L.hide(L.node(svg, 0, 0)); const b = K.g(n, {});
      const ox = K.sh(i * 7 + 3) * 14;
      K.paper(K.shadow(b, 1), K.cutRect(TX + ox - BW / 2, TB - (i + 1) * BH + 3, BW, BH - 6, 1.4, 16), [C.red, C.redShade, "#b5382d"][i % 3]);
      K.paper(b, K.cutRect(TX + ox - BW / 2, TB - (i + 1) * BH + 15, BW, 6, 0.5, 14), C.gold);
      K.paper(b, K.cutRect(TX + ox + BW / 2 - 36, TB - (i + 1) * BH + 3, 14, BH - 6, 0.5, 14), [C.sky, C.leaf, C.saffron, C.violet][i % 4]);
      return { n, b, y: TB - (i + 1) * BH, x: TX + ox };
    });
    const towerG = K.g(svg, {}); books.forEach((b) => towerG.appendChild(b.n.parentNode));
    const c19 = L.hide(L.node(svg, TX + 190, TB - 19 * BH - 30)); K.label(c19, 0, 0, "19", { size: 60, bg: C.sky, weight: 800, w: 100, h: 84 });
    // Meera's blank sheet (held up, then laid on the counter)
    const sheet = K.g(m.handAnchor("R"), {}); K.paper(K.shadow(sheet, 1), K.cutRect(-38, -62, 76, 100, 1.2, 12), "#fffdf8"); K.holdProp(m, "R", sheet, [12, 8]); L.hide(sheet);
    const cover = L.cover(K, svg, 11);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.4); khata.blink(tl, T0 + 2.5);
    const tTw = cue("s11", "@twenty");
    L.drop(tl, pile, tTw - 0.1, { dur: 0.4 }); L.drop(tl, c20, tTw + 0.3, { dur: 0.3 });
    khata.hop(tl, tTw + 0.2, { height: 50 }).expr(tl, tTw + 0.2, "wow");
    const tNi = cue("s11", "@nineteen");
    books.forEach((b, i) => {
      const t = tNi + 0.1 + i * 0.075;
      tl.set(b.n, { opacity: 1 }, t);
      tl.fromTo(b.n, { x: 420 - b.x, y: GY - 150 - b.y }, { x: 0, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
      tl.fromTo(b.b, { scale: 0.5, rotation: -20, svgOrigin: `${b.x} ${b.y}` }, { scale: 1, rotation: 0, svgOrigin: `${b.x} ${b.y}`, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
    });
    L.drop(tl, c19, tNi + 1.6, { dur: 0.3 });
    // the tower leans once (one stepped lean, then holds)
    const tLean = cue("s11", "@mistake") - 0.6;
    tl.to(towerG, { rotation: 2.4, svgOrigin: `${TX} ${TB}`, duration: 2 / 15, ease: K.stepEase(2 / 15, "power2.out", tLean) }, tLean);
    // Meera squints up at it, then at the sheet
    m.look(tl, tNi, -9, -8).expr(tl, tNi + 0.2, "puzzled");
    const tMi = cue("s11", "@mistake");
    m.expr(tl, tMi, "thinking").look(tl, tMi, -8, -6);
    const tSh = cue("s11", "@sheet");
    tl.set(sheet, { opacity: 1 }, tSh - 0.1);
    m.arm(tl, tSh - 0.1, "R", 140, 30, 0.3).expr(tl, tSh, "happy").look(tl, tSh, 0, 0);
    const tWell = cue("s11", "@well");
    khata.expr(tl, cue("s11", "@almost"), "wink");
    // the "11" cover slams over
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
    L.allow(svg);
  };
})();
