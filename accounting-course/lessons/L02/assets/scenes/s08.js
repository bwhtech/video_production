// s08 — Sort it: Has · Owes · Owner's. Worked (Khata: the cash) → faded (Meera: Ravi's loan, with a hint) → solo ×2 (the viewer: glasses, unpaid rent).
// Answers stay hidden until after the 3.2 s countdown gap. In/Out: default torn-paper wipes (deviation: no hand-authored tile seam).
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, DH = window.DH, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, { id: "s08-cam" });
    K.wall(cam, C.teal, 860);
    K.table(cam, 860);
    const cal = DH.calendar(cam, 1);

    // three boxes
    const BXS = [400, 880, 1360], BTOP = 730;
    const defs = [["Asset", C.dr, "package"], ["Liability", C.cr, "hand-coins"], ["Equity", C.cr, "user"]];
    const boxes = defs.map(([name, col, ic], i) => {
      const n = DH.node(cam, BXS[i], 0);
      K.crate(n.inner, 0, 975, 400, 245);
      K.medallion(n.inner, 0, 810, 46, ic, col);
      const lab = DH.node(n.inner, 0, 905); K.label(lab.inner, 0, 0, name, { size: 60, bg: col, shadow: 2 });
      DH.hide(lab.inner); DH.hide(n.outer);
      return { n, lab };
    });
    // Khata (judge) with the brass bell, bottom-left
    const k = K.khataRig(cam, 95, 1050, 0.5, { expr: "awake" });
    const bell = DH.node(cam, 215, 1010);
    K.paper(K.shadow(bell.inner, 1), K.cutPoly([[-30, 0], [30, 0], [24, -34], [10, -52], [-10, -52], [-24, -34]], 1, 10), C.brass);
    K.paper(bell.inner, K.cutEll(0, -58, 8, 8, 0.4), C.goldDark);
    const m = K.meera(cam, 1740, 985, 0.7, { expr: "happy", aL: [12, 8], aR: [12, 8] });

    // item cards (flip in at centre)
    const CXY = [880, 445];
    const mkCard = (fn) => {
      const n = DH.node(cam, CXY[0], CXY[1]);
      const S = K.g(n.inner, { transform: "scale(1.4)" });
      K.tex(K.shadow(S, 2), K.cutRect(-170, -190, 340, 380, 2.4, 26), "pat-paper");
      fn(K.g(S, {}));
      DH.hide(n.outer);
      n.outer.setAttribute("data-layout-allow-overlap", "true");
      return n;
    };
    const cGalla = mkCard((g) => { K.galla(g, 0, 90, 1.1, { open: true, overflow: true }); });
    const cRavi = mkCard((g) => { const t = K.claimTag(g, 0, 120, 1.15, { face: "ravi", amount: 30000 }); });
    const cGlass = mkCard((g) => { const t = K.tumblerStack(g, 0, 130, 1.5, { n: 5 }); });
    const cRent = mkCard((g) => { K.medallion(g, -10, -10, 84, "key", C.saffron); K.medallion(g, 78, 70, 44, "clock", C.coral); });
    const note30 = DH.node(cam, CXY[0] + 60, CXY[1] + 40); K.note(note30.inner, 0, 0, 120, 60, -8); DH.hide(note30.outer);
    const cd = [K.pauseMedallion(cam, 1340, 440, 0.6, { hidden: true }), K.pauseMedallion(cam, 1340, 440, 0.6, { hidden: true })];
    const meeraTag = K.claimTag(cam, CXY[0], 330, 0.7, { face: "meera", amount: 50000, hidden: true });
    const qm = DH.node(cam, 1100, 330); K.qmark(qm.inner, 0, 0, 1.3, C.saffron); DH.hide(qm.outer);

    // ======================================================================== timeline
    const flipIn = (c, t) => {
      tl.fromTo(c.outer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05, immediateRender: false }, t);
      tl.fromTo(c.inner, { scaleX: 0.03, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.out", immediateRender: false }, t);
    };
    const land = (c, boxI, slot, t) => {
      const lx = BXS[boxI] + [-120, 0, 120][slot], ly = BTOP + 70;
      tl.to(c.outer, { x: lx, y: ly, duration: 0.55, ease: "power2.in" }, t);
      tl.to(c.inner, { scale: 0.3, svgOrigin: O, duration: 0.55, ease: "power2.in" }, t);
    };
    k.blink(tl, T0 + 3).blink(tl, T0 + 20).blink(tl, T0 + 40);
    m.blinks(tl, T0 + 2, sc.end, 3.4);
    const ring = (t) => { tl.to(bell.inner, { rotation: -12, svgOrigin: "0 0", duration: 0.1, ease: K.q("power2.out", 0.1, t) }, t); tl.to(bell.inner, { rotation: 10, svgOrigin: "0 0", duration: 0.12, ease: K.q("power2.inOut", 0.12, t + 0.1) }, t + 0.1); tl.to(bell.inner, { rotation: 0, svgOrigin: "0 0", duration: 0.2, ease: K.q("power2.out", 0.2, t + 0.22) }, t + 0.22); k.hop(tl, t - 0.05, { height: 34 }); };

    // s08a — the three boxes drop in; each name ties on as it is spoken; Meera's tag goes into Equity first
    const tBoxes = cue("s08a", "@boxes");
    boxes.forEach((b, i) => { tl.fromTo(b.n.outer, { autoAlpha: 0, y: -60 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, tBoxes + i * 0.15); });
    DH.pop(tl, boxes[0].lab.inner, cue("s08a", "@assets"));
    DH.pop(tl, boxes[1].lab.inner, cue("s08a", "@liabilities"));
    DH.pop(tl, boxes[2].lab.inner, cue("s08a", "@equity"));
    const tEq = cue("s08a", "@equity");
    meeraTag.enter(tl, tEq + 0.2);
    tl.to(meeraTag.g, { x: BXS[2], y: BTOP + 80, duration: 0.7, ease: "power2.in" }, tEq + 0.7);
    // worked: Khata, the cash in the galla
    const tCash = cue("s08a", "@cash");
    flipIn(cGalla, tCash - 0.1);
    k.look(tl, tCash, 9, -6); k.emote(tl, tCash + 0.2, "?", 1.1);
    const tAsset = cue("s08b", "@asset!");
    k.expr(tl, tAsset - 0.3, "happy"); ring(tAsset); land(cGalla, 0, 0, tAsset + 0.2);
    // faded: Meera's turn — Ravi Mama's loan; she drifts toward Asset in the 1.6 s gap
    const tRavi = cue("s08c", "@ravi");
    flipIn(cRavi, tRavi - 0.1);
    m.expr(tl, cue("s08c", "@meera's"), "thinking").look(tl, cue("s08c", "@meera's"), -8, 0);
    const tGap = segEnd("s08c");
    tl.to(cRavi.outer, { x: CXY[0] - 260, duration: 1.2, ease: "power1.inOut" }, tGap);
    m.arm(tl, tGap + 0.2, "L", 70, 30, 0.4);
    const tCareful = cue("s08d", "@careful");
    tl.to(cRavi.outer, { x: CXY[0], duration: 0.4, ease: "power2.out" }, tCareful);
    m.arm(tl, tCareful, "L", 12, 8, 0.3).expr(tl, tCareful, "amazed");
    const tGave = cue("s08d", "@asset");                        // "The cash he gave is an asset" — a ₹30,000 note splits off into Asset
    DH.pop(tl, note30.inner, tGave - 0.2);
    tl.fromTo(note30.outer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05, immediateRender: false }, tGave - 0.2);
    tl.to(note30.outer, { x: BXS[0] + 0, y: BTOP + 70, duration: 0.6, ease: "power2.in" }, tGave + 0.1);
    tl.to(note30.inner, { scale: 0.6, svgOrigin: O, duration: 0.6, ease: "power2.in" }, tGave + 0.1);
    const tLiab = cue("s08d", "@liability.");
    land(cRavi, 1, 0, tLiab + 0.1);
    m.expr(tl, tLiab + 0.5, "grin");
    // solo 1: a stack of glasses Meera buys tomorrow (3.2 s countdown, answer hidden)
    const tGl = cue("s08e", "@glasses");
    flipIn(cGlass, tGl - 0.1);
    m.arm(tl, tGl, "R", 40, 60, 0.3).expr(tl, tGl, "happy");
    const tCd1 = segEnd("s08e");
    cd[0].enter(tl, tCd1 - 0.05); cd[0].countdown(tl, tCd1, { dur: 3.2 }); cd[0].exit(tl, tCd1 + 3.25);
    m.arm(tl, tCd1 + 3.0, "R", 12, 8, 0.3);
    const tA2 = cue("s08f", "@asset.");
    ring(tA2); k.expr(tl, tA2 - 0.3, "happy"); land(cGlass, 0, 1, tA2 + 0.3);
    // solo 2: April's rent — owed, unpaid
    const tRent = cue("s08g", "@rent");
    flipIn(cRent, tRent - 0.1);
    const tCd2 = segEnd("s08g");
    cd[1].enter(tl, tCd2 - 0.05); cd[1].countdown(tl, tCd2, { dur: 3.2 }); cd[1].exit(tl, tCd2 + 3.25);
    const tL2 = cue("s08h", "@liability.");
    ring(tL2); land(cRent, 1, 1, tL2 + 0.3);
    k.jitter(tl, T0, sc.end); m.jitter(tl, T0, sc.end);
  };
})();
