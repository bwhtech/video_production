// s11 — Next time (tease). Infotech's office next to the stall: the windows light one by one, Priya leans out with a tumbler, then holds up
// a tab slip (clock + a block of tally marks — no words, no amount). Meera: amazed → thinking. Freeze; Khata's "5" cover slams shut
// over the frame (s12 owns the swing-open).
(function () {
  window.OWN_SEAM_IN.s12 = true;
  const O = "0 0";

  // full-frame red cloth ledger cover with a gold number (also used, drawn identically, by s12)
  window.L4.cover = (parent, K, num) => {
    const C = K.C, n = window.L4.node(parent, 0, 0);
    n.outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(n.inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(n.inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(n.inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(n.inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(n.inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(n.inner, 800, 545, String(num), { size: 300, weight: 800, color: C.gold });
    K.text(n.inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return n;
  };

  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4;
    const T0 = sc.start;
    K.wall(svg, C.sky, 880); K.table(svg, 880);
    [[690, 520, 150, 360], [1780, 560, 140, 320]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#4390d4" : "#4a96d9"));
    const stall = K.stall(svg, 250, 1000, 0.85, {});
    const meera = K.meera(svg, 580, 1000, 0.92, { expr: "happy" });
    const b = K.infotechBuilding(svg, 1400, 1000, 0.85, {});
    const win = b.windowAnchor(4, { clip: false });
    const pr = K.priya(win, 0, b.bustY(0.38), 0.38, { expr: "happy" });
    win.setAttribute("opacity", "0");
    const [wx, wy] = b.windowPos(4);
    // tumbler and tab slip (world coords, to the left of her window)
    const tum = L4.node(svg, wx - 150, wy - 70);
    K.tumbler(tum.inner, 0, 60, 2.6); tum.outer.setAttribute("opacity", "0");
    const slip = L4.node(svg, wx - 175, wy - 135);
    {
      const r = K.g(slip.inner, { transform: "rotate(-4)" });
      K.tex(K.shadow(r, 2), K.cutRect(-105, -135, 210, 270, 2, 20), "pat-paper");
      K.medallion(r, 0, -78, 44, "clock", C.saffron, C.white);
      [[-50, 10], [50, 10], [-50, 80], [50, 80]].forEach(([gx, gy]) => {
        for (let i = 0; i < 4; i++) K.ink(r, [[gx - 24 + i * 16, gy - 24], [gx - 24 + i * 16, gy + 24]], 6, C.ink);
        K.ink(r, [[gx - 34, gy + 18], [gx + 34, gy - 18]], 6, C.ink);
      });
    }
    slip.outer.setAttribute("opacity", "0");
    const cover = window.L4.cover(svg, K, 5);

    // ================================================================================ timeline
    stall.kettle && stall.kettle.steamLoop && stall.kettle.steamLoop(tl, T0, sc.end);
    meera.blinks(tl, T0 + 1, sc.end, 3.3);
    meera.look(tl, cue("s11", "@office"), 7, -4);
    const tFloor = cue("s11", "@whole"), tDay = cue("s11", "@single"), tCatch = cue("s11", "@catch"), tLater = cue("s11", "@later");
    b.lightAll(tl, tFloor - 0.1, 0.12, [0, 2, 1, 5, 3, 4, 8, 6, 7, 9, 11, 10]);
    // "every single day" — Priya leans out with a tumbler
    tl.set(win, { opacity: 1 }, tDay - 0.2);
    pr.expr(tl, tDay, "grin"); pr.arm(tl, tDay + 0.1, "L", 130, -10, 0.3);
    L4.show(tl, tum.outer, tDay + 0.1); K.dropIn(tl, tum.inner, tDay + 0.1, { dur: 0.34 });
    // "Just one catch" — the tab slip with tally marks replaces the tumbler
    K.liftOff(tl, tum.inner, tCatch - 0.3, { dur: 0.2 });
    L4.show(tl, slip.outer, tCatch); K.dropIn(tl, slip.inner, tCatch, { dur: 0.4 });
    pr.expr(tl, tCatch, "happy");
    meera.expr(tl, tCatch, "amazed"); meera.expr(tl, tLater, "thinking").look(tl, tLater, 7, -4);
    // freeze → Khata's "5" cover slams over everything
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "power2.out" }, tLand + 0.06);
  };
})();
