// s01 — Cold open: the tower of books. Meera's stall counter at evening (teal): a pile of 20 journal slips (chip 20), L10's blank sheet lying flat,
// Khata (closed, spine face) splits into 19 little books that fly out and stack into a teetering tower (chip 19). Meera squints through a magnifier;
// three icon-only thought bubbles (a slip between two books · left/right arrows · a blank slip) answer the VO's three questions. On "quicker way" the tower leans once.
// Out (own seam into s01t): the books swoop back into Khata, it hops and snaps shut; its red cover grows to fill the frame -> the title sting.
(function () {
  window.OWN_SEAM_IN.s01t = true;

  const ICONS = ["banknote", "landmark", "store", "leaf", "shopping-cart", "wallet", "key", "user", "percent", "zap", "package", "trending-down", "hand-coins", "handshake", "milk", "calendar-check", "zap", "clock", "trending-up"];
  const CAPS = ["#3d7fd9", "#e8862e", "#2fa79a", "#ef6f5e", "#f2a33a", "#7a62c9", "#5db96b", "#2b3a55"];

  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    const cam = K.g(svg, {});
    L.stage(cam, C.teal, 880);
    const cal = L.cal(svg, 30);

    // ---- counter props: the 20 journal slips (a stack + chip) and L10's blank sheet
    const pile = L.node(cam, 830, 985); L.hide(pile);
    [[-14, 0, -6], [10, -8, 4], [-4, -16, -2], [12, -24, 6], [0, -32, -4]].forEach(([dx, dy, r]) => K.slip(pile, dx, dy, 0.95, r, "handshake"));
    const pileChip = K.ticker(pile, 0, -130, 1, { value: 0, prefix: "", size: 56, chip: true, w: 130, h: 84, edge: C.saffron });
    const sheet = L.node(cam, 1085, 1000); L.hide(sheet);
    K.tex(K.shadow(sheet, 1), K.cutRect(-110, -52, 220, 104, 1.2, 14), "pat-paper");
    K.ink(sheet, [[-80, -14], [80, -14]], 3, "#a39684"); K.ink(sheet, [[-80, 14], [80, 14]], 3, "#a39684");
    sheet.setAttribute("transform", "rotate(-4)");

    // ---- cast: Meera (left), Khata (right, closed)
    const m = K.meera(cam, 470, 1010, 0.95, { expr: "neutral" });
    const mag = K.magnifier(null, 0, 0, 0.7, { hold: { rig: m, side: "R", rest: [20, 70] }, hidden: true });
    const kx = 1790, ky = 1005;
    const khata = K.khataRig(cam, kx, ky, 0.8, { expr: "sleep" });

    // ---- the tower: 19 lying books
    const TX = 1385, BASE = 985, BH = 38, BW = 300;
    const tower = K.g(cam, {});
    const books = ICONS.map((ic, i) => {
      const sx = TX + K.sh(i * 3.7) * 16, sy = BASE - (i + 0.5) * BH, rot = K.sh(i * 5.3) * 1.1;
      const pos = K.g(tower, { transform: `translate(${sx} ${sy}) rotate(${rot})` });
      const fly = K.g(pos, {}); L.hide(fly);
      K.tex(K.shadow(fly, 1), K.cutRect(-BW / 2, -BH / 2, BW, BH, 1.4, 22), "pat-cover");
      K.paper(fly, K.cutRect(-BW / 2, -BH / 2, 44, BH, 0.8, 12), CAPS[i % CAPS.length]);
      K.paper(fly, K.cutRect(BW / 2 - 70, -BH / 2 + 5, 64, BH - 10, 0.6, 12), C.cream);
      K.paper(fly, K.cutRect(-BW / 2 + 52, -3, BW - 150, 7, 0.4, 14), C.gold);
      K.medallion(fly, -BW / 2 + 22, 0, 14, ic);
      return { pos, fly, sx, sy };
    });
    const towerChip = K.ticker(cam, TX, 178, 1, { value: 0, prefix: "", size: 60, chip: true, w: 150, h: 92, edge: C.saffron, hidden: true });

    // ---- three thought bubbles (pictures only)
    const bub = (art) => {
      const n = L.node(svg, 900, 330, 1.3); L.hide(n);
      K.cloud(n, 0, 0, 1.45);
      [[-150, 150, 14], [-186, 192, 9]].forEach(([dx, dy, r]) => K.tex(K.shadow(n, 1), K.cutEll(dx, dy, r, r, 0.8), "pat-paper"));
      art(L.node(n, 0, 6));
      return n;
    };
    const b1 = bub((a) => {
      K.smallBook(a, -78, 70, 46, 76, "banknote"); K.smallBook(a, 78, 70, 46, 76, "landmark");
      K.curveArrow(a, K.arc(0, 30, 92, Math.PI * 1.1, Math.PI * 1.88, 8), C.coral, 10);
      K.qmark(a, 0, 62, 0.8, C.dr);
    });
    const b2 = bub((a) => {
      K.arrowShape(a, -62, -4, 96, C.dr, -1, 0, 24); K.arrowShape(a, 62, 36, 96, C.cr, 1, 0, 24);
      K.qmark(a, 0, 40, 0.75, C.coral);
    });
    const b3 = bub((a) => {
      K.tex(K.shadow(a, 1), K.cutRect(-70, -52, 140, 104, 1.2, 16), "pat-paper");
      K.ink(a, [[-48, -14], [48, -14]], 3, "#a39684"); K.ink(a, [[-48, 14], [30, 14]], 3, "#a39684");
      K.qmark(a, 84, 50, 0.8, C.dr);
    });

    // red cloth cover that fills the frame at the end (-> s01t plate)
    const cover = K.g(svg, { opacity: 0 });
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.red }, cover);
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "url(#pat-cover)", style: "mix-blend-mode:multiply", opacity: 0.8 }, cover);
    L.allow(svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end - 2, 3.3); m.jitter(tl, T0, sc.end); khata.jitter(tl, T0, sc.end);
    khata.blink(tl, T0 + 2);
    m.look(tl, T0 + 0.4, 6, 0);

    // "बीस transactions।" — the 20 slips drop on the counter (chip counts), the blank sheet lies beside them
    const t20 = cue("s01a", "@twenty");
    L.drop(tl, sheet, T0 + 0.2, { dur: 0.35 });
    L.drop(tl, pile, t20 - 0.1, { dur: 0.35 }); pileChip.to(tl, t20, 20, 0.8);
    // "उन्नीस accounts। खाता … बँट गया" — Khata wakes and hops; the books fly out one by one
    const tK = cue("s01a", "@khata");
    khata.expr(tl, tK - 0.1, "awake"); khata.hop(tl, tK, { height: 50 });
    m.expr(tl, cue("s01a", "@nineteen"), "puzzled");
    const tB = cue("s01a", "@books") - 0.1, STEP = 0.19;
    towerChip.enter(tl, tB + 0.2, { dur: 0.3 });
    towerChip.to(tl, tB + 0.2, 19, STEP * 19);
    books.forEach((b, i) => {
      const t = tB + i * STEP, dx = kx - b.sx, dy = ky - 150 - b.sy;
      tl.fromTo(b.fly, { opacity: 0, x: dx, y: dy }, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
    });
    // camera follows the growing pile (smooth, <= 6 % push)
    const tPush = cue("s01a", "@pile");
    tl.fromTo(cam, { scale: 1, y: 0, svgOrigin: "1200 600" }, { scale: 1.05, y: 24, svgOrigin: "1200 600", duration: sc.end - 4 - tPush, ease: "none", immediateRender: false }, tPush);
    m.expr(tl, cue("s01a", "@taller"), "worried");
    m.look(tl, cue("s01a", "@pile"), 9, -4);

    // s01b — Meera squints through the magnifier; three question bubbles (one at a time)
    const tS = cue("s01b", "@squints");
    mag.enter(tl, tS - 0.1);
    m.arm(tl, tS, "R", 78, 54, 0.35);
    mag.sweep(tl, tS + 0.4, [[14, -10], [-4, 16]], { dur: 0.5, hold: 0.25 });
    m.expr(tl, tS + 0.1, "thinking");
    const bubs = [[b1, "@slip"], [b2, "@wrong"], [b3, "@missing"]];
    bubs.forEach(([b, a], i) => {
      const t = cue("s01b", a) - 0.15;
      if (i > 0) L.lift(tl, bubs[i - 1][0], t - 0.05, { dur: 0.2 });
      L.drop(tl, b, t, { dur: 0.35 });
    });
    L.lift(tl, b3, cue("s01b", "@page") - 0.1, { dur: 0.25 });
    m.expr(tl, cue("s01b", "@page"), "worried");
    // "क्या जानने का कोई तेज़ तरीक़ा है?" — the tower leans once (stepped, held); hands up
    const tQ = cue("s01b", "@quicker");
    tl.to(tower, { rotation: 4, svgOrigin: `${TX} ${BASE}`, duration: 0.4, ease: K.stepEase(0.4, "power2.out", tQ) }, tQ);
    m.pose(tl, tQ + 0.1, { aL: [70, 30], aR: [70, 30], dur: 0.4 });
    khata.look(tl, tQ + 0.2, -6, -2);

    // exit: the books swoop back into Khata, it hops and snaps shut; its red cover grows to fill the frame
    const tX = sc.end - 1.15;
    tl.to(tower, { rotation: 0, svgOrigin: `${TX} ${BASE}`, duration: 0.3, ease: "power2.inOut" }, tX - 0.1);
    mag.exit(tl, tX - 0.2, { dur: 0.2 });
    khata.hop(tl, tX - 0.2, { height: 60 });
    books.slice().reverse().forEach((b, k) => {
      const t = tX + k * 0.035;
      tl.to(b.fly, { x: kx - b.sx, y: ky - 150 - b.sy, opacity: 0, duration: 0.38, ease: "power2.in" }, t);
    });
    L.lift(tl, towerChip, tX, { dur: 0.2 });
    khata.hop(tl, tX + 0.85, { height: 36 });
    tl.set(cover, { opacity: 1 }, sc.end - 0.5);
    tl.fromTo(cover, { scale: 0.05, svgOrigin: `${kx} ${ky - 150}` }, { scale: 1.02, svgOrigin: `${kx} ${ky - 150}`, duration: 0.5, ease: "power3.in", immediateRender: false }, sc.end - 0.5);
    tl.set(cover, { opacity: 0 }, sc.end + 0.45);
  };
})();
