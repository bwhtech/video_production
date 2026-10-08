// s09 — Solo: gross vs net, then the loss. The P&L strip stands up on a white card.
//   Card 1: Rent is patched to ₹7,000; both result frames go to ₹ ? and a 3-2-1 ring drains beside Gross. Reveal: Gross holds at ₹40,000, Net ticks ₹24,700 → ₹22,700, a bracket shows rent sits BELOW the gross line.
//   Card 2: the rent patch peels off; a ₹15,000 patch lands on Sales (the Infotech office goes dark); Gross → ₹5,000; Net blanks (1 s suspended beat) and then ticks to −₹10,300 (negative frame: minus sign, doubled rule, no red).
//   The trending-down medallion lights; Meera's face tag + a down-arrow ("her share would shrink").
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    L.stage(svg, C.teal, 930);
    const SX = 1080, SY = 540;
    const bld = K.infotechBuilding(svg, 240, 1010, 0.5, {});
    const card = L.node(svg, SX, SY); L.hide(card); L.card(card, 800, 1040, { shadow: 3 });
    const film = L.film(svg, { x: SX, y: SY, filled: true, values: { 2: 40000, 8: 24700 } });
    const fy = (i) => SY + film.fr[i].cy;
    const f2 = film.fr[2], f8 = film.fr[8];
    // patches (kraft paper) over the Rent / Sales amounts
    const patch = (y, txt) => {
      const n = L.node(svg, SX + 175, y); L.hide(n);
      K.paper(K.shadow(n, 2), K.cutRect(-110, -34, 220, 68, 1.4, 16), C.wood); K.paper(n, K.cutRect(-100, -26, 200, 52, 1, 14), "#c89560", { opacity: 0.6 });
      K.text(n, 0, 3, txt, { size: 42, weight: 800, color: "#fff" });
      return n;
    };
    const pRent = patch(fy(3), "₹7,000"), pSales = patch(fy(0), "₹15,000");
    const cd = K.pauseMedallion(svg, 590, fy(2), 0.42, { hidden: true });
    // bracket: from the Rent frame down to the Net frame (rent sits below the gross line)
    const brk = L.node(svg, SX + film.W / 2 + 60, 0); L.hide(brk);
    {
      const y0 = fy(3) - 40, y1 = fy(8) + 40;
      K.ink(brk, [[-18, y0], [0, y0], [0, y1], [-18, y1]], 8, C.ink);
      K.ink(brk, [[0, (y0 + y1) / 2], [22, (y0 + y1) / 2]], 8, C.ink);
    }
    const brkTk = K.ticker(svg, SX + film.W / 2 + 190, (fy(3) + fy(8)) / 2 + 60, 1, { value: 0, size: 46, chip: true, w: 220, h: 72, edge: C.dr, hidden: true });
    const tickMk = L.node(svg, SX - film.cw / 2 - 20, fy(2)); L.hide(tickMk); K.paper(K.shadow(tickMk, 1), K.cutEll(0, 0, 30, 30, 0.6), C.cream); const tmk = K.tickMark(tickMk, 0, 0, 1.0, { color: C.ink, w: 7 });
    const medUp = L.node(svg, 590, 700); L.hide(medUp); K.medallion(medUp, 0, 0, 56, "trending-up");
    const medDown = L.node(svg, 590, 830); L.hide(medDown); K.medallion(medDown, 0, 0, 56, "trending-down");
    const tagM = L.node(svg, 1760, 640); L.hide(tagM); K.faceTag(tagM, 0, 0, "meera", 1.7, 0);
    const arrow = L.node(svg, 1760, 780); L.hide(arrow); K.arrowShape(arrow, 0, 0, 120, C.cream, 1, -90, 34);

    // ======================================================================== timeline
    bld.lightAll(tl, T0 + 0.7, 0.07);
    // card 1 — rent ₹7,000 → does GROSS change?
    L.drop(tl, card, cue("s09a", "@turn") - 0.2, { dur: 0.4 });
    const tRent = cue("s09a", "@rent");
    L.drop(tl, pRent, tRent + 0.1, { dur: 0.3 });
    film.blank(tl, tRent + 0.5, 2); film.blank(tl, tRent + 0.55, 8);
    const tCd = segEnd("s09a") - 0.05;
    cd.enter(tl, tCd - 0.3); cd.countdown(tl, tCd, { dur: 3.0 }); cd.exit(tl, tCd + 3.2);
    // reveal: "No." Gross holds at ₹40,000; Net ticks down; the bracket
    const tNo = cue("s09b", "@no");
    film.showValue(tl, tNo + 0.1, 2, 40000, 0.5);
    L.drop(tl, tickMk, tNo + 0.7, { dur: 0.3 }); tmk.draw(tl, tNo + 0.9, 0.3);
    L.drop(tl, brk, cue("s09b", "@below") - 0.2, { dur: 0.35 });
    K.pulseNode(tl, f2.c, cue("s09b", "@stays") - 0.1, 1.05);
    film.showValue(tl, cue("s09b", "@net") - 0.1, 8, 22700, 0.8);
    // card 2 — the whole floor stopped drinking chai: sales ₹15,000
    const tWh = cue("s09c", "@whole") - 0.2;
    L.lift(tl, pRent, tWh, { dur: 0.25 }); L.lift(tl, brk, tWh, { dur: 0.25 }); L.lift(tl, tickMk, tWh, { dur: 0.25 });
    film.blank(tl, tWh + 0.4, 2); film.blank(tl, tWh + 0.45, 8);
    const tSales = cue("s09c", "@sales");
    L.drop(tl, pSales, tSales + 0.1, { dur: 0.3 });
    [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].forEach((w, k) => bld.darkWindow(tl, tSales + 0.2 + k * 0.1, w));
    film.showValue(tl, cue("s09c", "@five") - 0.2, 2, 5000, 0.8);
    const tMin = cue("s09c", "@minus", 2) - 0.3;
    brkTk.enter(tl, tMin); brkTk.to(tl, tMin + 0.1, 15300, 0.6); L.drop(tl, brk, tMin, { dur: 0.3 });
    film.fr[8].tk.set(tl, cue("s09c", "@run") - 0.2, 5000);
    film.blank(tl, cue("s09c", "@run") - 0.1, 8);
    // s09d — the loss
    const tTen = cue("s09d", "@ten");
    film.showValue(tl, tTen - 0.1, 8, -10300, 0.9);
    tl.to(f8.rule2, { opacity: 1, duration: 0.3 }, tTen + 0.7);
    const tLoss = cue("s09d", "@loss");
    L.drop(tl, medUp, tLoss - 0.6, { dur: 0.3 }); L.drop(tl, medDown, tLoss - 0.6, { dur: 0.3 });
    L.dim(tl, medUp, tLoss + 0.1, 0.4, 0.3); K.pulseNode(tl, medDown, tLoss + 0.1, 1.1);
    const tSh = cue("s09d", "@share");
    L.drop(tl, tagM, tSh - 0.1, { dur: 0.3 }); L.drop(tl, arrow, cue("s09d", "@shrink") - 0.1, { dur: 0.3 });
    L.allow(svg);
  };
})();
