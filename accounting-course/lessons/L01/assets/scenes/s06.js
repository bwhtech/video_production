// s06 — "Is it a transaction?" game show. Worked (Khata) → faded (Meera guesses wrong) → solo (viewer, 3-s countdowns).
(function () {
  const O = "0 0";

  SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const T0 = sc.start, T1 = sc.end + TL.overlap;
    const pos = (parent, x, y) => K.g(K.g(parent, { transform: `translate(${x} ${y})` }), {});
    const hide = (el) => el.setAttribute("opacity", "0");
    const popIn = (el, t, from = 0.86, dur = 0.32) =>
      tl.fromTo(el, { autoAlpha: 0, scale: 1.07, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: Math.max(dur, 0.34), ease: "power2.out" }, t);  // drop-and-place
    const popOut = (el, t, dur = 0.2) => tl.to(el, { autoAlpha: 0, scale: 1.05, svgOrigin: O, duration: dur, ease: "power2.in" }, t);

    // ---------- camera ----------
    const cam = K.g(svg, {});
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 560" }, { scale: 1.04, svgOrigin: "960 560", duration: T1 - T0, ease: "none" }, T0);

    // ---------- set: a little paper game-show stage ----------
    K.wall(cam, C.violet, 840);
    // backdrop panels + spotlights cut from paper
    [[230, C.saffron], [1690, C.saffron]].forEach(([x, col]) => K.paper(K.shadow(cam, 1), K.cutPoly([[x - 120, -20], [x + 120, -20], [x + 220, 840], [x - 220, 840]], 2, 40), col, { opacity: 0.22 }));
    K.stringLights(cam, -20, 1940, 34, 70, 17);
    K.table(cam, 840);

    // ---------- bins: left = transaction (₹), right = not (empty open hand) ----------
    const BIN = { yes: 560, no: 1360 }, BIN_Y = 1004, BIN_TOP = BIN_Y - 196;
    const openHand = (parent, x, y, s = 1) => {
      const h = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` });
      const sg = K.shadow(h, 1);
      K.paper(sg, K.cutEll(0, 8, 26, 24, 1.2), C.skin);
      [[-20, -16, -30, -44], [-7, -22, -10, -54], [7, -22, 10, -56], [20, -16, 28, -46]].forEach(([x0, y0, x1, y1]) => K.paper(sg, K.cutStroke([[x0, y0], [x1, y1]], 12, 0.8), C.skin));
      K.paper(sg, K.cutStroke([[22, 10], [44, -6]], 12, 0.8), C.skin);
      return h;
    };
    const bins = {};
    [["yes", C.teal], ["no", "#c9b8a6"]].forEach(([k, col]) => {
      const b = pos(cam, BIN[k], BIN_Y);
      const bs = K.shadow(b, 2);
      K.paper(bs, K.cutPoly([[-150, -196], [150, -196], [124, 0], [-124, 0]], 2.2, 26), col);
      K.paper(b, K.cutRect(-160, -214, 320, 30, 1.6, 26), k === "yes" ? "#238579" : "#a8957f");
      if (k === "yes") { K.medallion(b, 0, -96, 56, "indian-rupee"); }
      else { K.tex(K.shadow(b, 1), K.cutEll(0, -96, 56, 56, 1.6), "pat-paper"); openHand(b, 0, -86, 1.05); }
      const stack = K.g(b, {}); // landed cards peek out of the top
      bins[k] = { g: b, stack, n: 0 };
    });

    // ---------- Khata the judge, on a stool, with a bell ----------
    const ST_X = 960, SEAT = 866;
    const stool = K.shadow(cam, 2);
    K.paper(stool, K.cutRect(ST_X - 118, SEAT, 236, 26, 1.6, 20), C.woodDark);
    [[-92, -60], [92, 60]].forEach(([dx, sk]) => K.paper(stool, K.cutPoly([[ST_X + dx - 10, SEAT + 20], [ST_X + dx + 10, SEAT + 20], [ST_X + dx + 10 + sk * 0.2, 1004], [ST_X + dx - 10 + sk * 0.2, 1004]], 1, 20), C.wood));
    const k = K.khataRig(cam, ST_X - 22, SEAT + 2, 0.64, { expr: "awake" });
    const bellPos = K.g(cam, { transform: `translate(${ST_X + 88} ${SEAT})` });
    const bell = K.g(bellPos, {});
    const bs = K.shadow(bell, 1);
    K.paper(bs, K.cutRect(-30, -10, 60, 12, 1, 12), "#3b3238");
    K.paper(bs, K.cutPoly([...K.arc(0, -10, 26, Math.PI, Math.PI * 2, 10), [26, -10], [-26, -10]], 1, 10), C.brass);
    K.paper(bell, K.cutRect(-4, -46, 8, 12, 0.5, 8), C.goldDark);
    // head-shake for Khata: three eased tilts, no overshoot / no spring (the kit's wiggle() has a back.out)
    const shakeHead = (t) => [[-5, 0.14], [5, 0.2], [-3, 0.2], [0, 0.22]].reduce((tt, [r, d]) => { tl.to(k.body, { rotation: r, svgOrigin: O, duration: d, ease: "power2.inOut" }, tt); return tt + d; }, t);
    const ring = (t) => {
      k.arm(tl, t - 0.12, "R", 70).arm(tl, t, "R", 35).arm(tl, t + 0.3, "R", 15);
      [5, -4, 2, 0].forEach((r, i) => tl.to(bell, { rotation: r, svgOrigin: "0 -2", duration: 1 / 15, ease: "none" }, t + i / 15));
    };

    // ---------- Meera, contestant ----------
    const m = K.meera(cam, 215, 1004, 0.92, { expr: "happy" });
    m.blinks(tl, T0, T1, 3.4, 9);

    // ---------- s06a: what's a transaction? ----------
    const def = pos(cam, 960, 260);
    K.label(def, 0, 0, "Transaction", { size: 64, bg: C.cream, shadow: 2 });
    hide(def); popIn(def, cue("s06a", "@transactions"));
    const icons = [["@has", "package", 760, 420], ["@owes", "handshake", 960, 440], ["@rupees", "indian-rupee", 1160, 420]].map(([w, ic, x, y]) => {
      const p = pos(cam, x, y); K.medallion(p, 0, 0, 56, ic); hide(p); popIn(p, cue("s06a", w)); return p;
    });
    k.look(tl, cue("s06a", "@transactions"), 0, -9);
    m.expr(tl, cue("s06a", "@transactions"), "thinking").look(tl, cue("s06a", "@transactions"), 8, -8);
    // "Let's play a game." — definitions clear, the bins rise, Khata rings in
    const tGame = cue("s06a", "@game");
    popOut(def, tGame - 0.35); icons.forEach((p, i) => popOut(p, tGame - 0.3 + i * 0.05));
    tl.fromTo(bins.yes.g, { y: 340 }, { y: 0, duration: 0.55, ease: "power2.out" }, tGame - 0.15);
    tl.fromTo(bins.no.g, { y: 340 }, { y: 0, duration: 0.55, ease: "power2.out" }, tGame - 0.05);
    ring(tGame + 0.35);
    k.expr(tl, tGame, "happy").look(tl, tGame, 0, 0);
    m.expr(tl, tGame, "grin").hop(tl, tGame + 0.1, { height: 36 });
    const qm = pos(cam, 960, 318);
    K.qmark(qm, 0, 0, 2.2, C.saffron);
    hide(qm); popIn(qm, cue("s06a", "@is"));

    // ---------- the four cards ----------
    const CARD = [960, 318];
    const sack = (p, x, y, s = 1) => {
      const g = K.g(p, { transform: `translate(${x} ${y}) scale(${s})` });
      K.paper(K.shadow(g, 1), K.cutPoly([[-46, 0], [46, 0], [40, -86], [26, -104], [-26, -104], [-40, -86]], 1.8, 14), C.white);
      K.ink(g, [[-30, -88], [30, -88]], 4, C.goldDark);
      K.text(g, 0, -46, "Sugar", { size: 24, font: "kalam", color: C.ink });
    };
    const heart = (p, x, y, s = 1) => {
      const pts = [];
      for (let i = 0; i <= 24; i++) { const a = (i / 24) * Math.PI * 2; pts.push([x + 16 * Math.sin(a) ** 3 * s * 2.2, y - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * s * 2.2]); }
      K.paper(K.shadow(p, 1), K.pts2d(pts), C.coral);
    };
    const milkCan = (p, x, y, s = 1) => {
      const g = K.g(p, { transform: `translate(${x} ${y}) scale(${s})` });
      const sg = K.shadow(g, 1);
      K.paper(sg, K.cutRect(-34, -90, 68, 90, 1.4, 14), C.grey);
      K.paper(sg, K.cutRect(-20, -112, 40, 26, 1, 10), C.grey);
      K.paper(g, K.cutRect(-34, -60, 68, 14, 0.8, 14), C.sky);
    };
    const DRAW = [
      (p) => { K.tumbler(p, -80, 70, 1.7); K.coin(p, 80, 0, 44); K.label(p, 80, 74, "₹20", { size: 36, bg: "paper" }); },
      (p) => { K.faceTag(p, -70, 10, "priya", 1.9); heart(p, 85, 6, 1.1); },
      (p) => { sack(p, -70, 86, 1.05); K.coin(p, 85, 10, 44); },
      (p) => { K.icon(p, "smartphone", -80, 10, 120, C.ink, 2); [26, 44].forEach((r) => K.ink(p, K.arc(-80, 10, r + 50, -0.5, 0.5, 6), 5, C.ink)); milkCan(p, 95, 70, 1.05); },
    ];
    const cards = DRAW.map((draw, i) => {
      const c = pos(cam, CARD[0], CARD[1]);
      K.card(c, 0, 0, 540, 370, { header: [C.saffron, C.sky, C.leaf, C.coral][i], headerH: 58, title: String(i + 1), titleSize: 44 });
      const art = K.g(c, { transform: "translate(0 34) scale(1.28)" });
      draw(art);
      hide(c);
      return c;
    });
    const drop = (c, t) => {
      tl.fromTo(c, { autoAlpha: 1, y: -560, rotation: -1.5, svgOrigin: O }, { y: 0, rotation: 0, svgOrigin: O, duration: 0.55, ease: "power3.out" }, t);
    };
    const toBin = (c, t, key) => {
      const b = bins[key];
      const dx = BIN[key] - CARD[0], dy = BIN_TOP - 40 - CARD[1];
      tl.to(c, { x: dx, duration: 0.6, ease: "power2.inOut" }, t);
      tl.to(c, { y: -90, duration: 0.25, ease: "power2.out" }, t);
      tl.to(c, { y: dy, duration: 0.35, ease: "power2.in" }, t + 0.25);
      tl.to(c, { scale: 0.32, rotation: key === "yes" ? -4 : 4, svgOrigin: O, duration: 0.6, ease: "power2.inOut" }, t);
      tl.to(c, { autoAlpha: 0, duration: 0.06 }, t + 0.6);
      // the bin gulps, and a stub of the card stays poking out
      const stub = K.g(b.stack, { transform: `translate(${(b.n - 0.5) * 46} -214) rotate(${(b.n ? 1 : -1) * 9})` });
      K.tex(K.shadow(stub, 1), K.cutRect(-58, -56, 116, 64, 1.4, 14), "pat-paper");
      K.paper(stub, K.cutRect(-54, -52, 108, 12, 0.8, 14), [C.saffron, C.sky, C.leaf, C.coral][cards.indexOf(c)]);
      stub.setAttribute("opacity", "0");
      tl.set(stub, { opacity: 1 }, t + 0.6);
      b.n++;
      tl.to(b.g, { scaleY: 0.97, scaleX: 1.02, svgOrigin: O, duration: 0.1, ease: "power2.out" }, t + 0.6);
      tl.to(b.g, { scaleY: 1, scaleX: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t + 0.7);
    };
    // 3-second countdown ring (12 paper segments drain clockwise, one per 0.25 s)
    const countdown = (t) => {
      const cd = pos(cam, CARD[0] + 330, CARD[1] - 60);
      K.tex(K.shadow(cd, 1), K.cutEll(0, 0, 70, 70, 1.4), "pat-paper");
      const segs = [];
      for (let i = 0; i < 12; i++) {
        const a0 = -Math.PI / 2 + (i / 12) * Math.PI * 2 + 0.06, a1 = a0 + (Math.PI * 2) / 12 - 0.12;
        segs.push(K.paper(cd, K.cutStroke(K.arc(0, 0, 52, a0, a1, 4), 16, 0.6), C.saffron));
      }
      const num = [3, 2, 1].map((n) => { const e = K.text(cd, 0, 4, String(n), { size: 54, weight: 800, color: C.ink }); e.setAttribute("opacity", "0"); return e; });
      hide(cd);
      popIn(cd, t - 0.25);
      segs.forEach((sgm, i) => tl.set(sgm, { opacity: 0 }, t + (i + 1) * 0.25));
      num.forEach((e, i) => { tl.set(e, { opacity: 1 }, t + i); tl.set(e, { opacity: 0 }, t + i + 1); });
      popOut(cd, t + 3.05, 0.18);
    };

    // card 1 — WORKED: chai for ₹20 → YES (Khata decides)
    const t1 = segStart("s06b");
    popOut(qm, t1 - 0.1);
    drop(cards[0], t1 - 0.05);
    k.look(tl, t1 + 0.3, 0, -9);
    m.expr(tl, t1 + 0.4, "thinking");
    const tYes1 = cue("s06c", "@yes");
    ring(tYes1);
    k.expr(tl, tYes1, "happy").emote(tl, tYes1 + 0.1, "sparkle", 0.9);
    toBin(cards[0], tYes1 + 0.25, "yes");
    m.expr(tl, tYes1 + 0.1, "joy");

    // card 2 — FADED: Meera smiles at a customer → she tilts it to YES… Khata shakes head → NO
    const t2 = segStart("s06d");
    drop(cards[1], t2 - 0.05);
    m.expr(tl, t2 + 0.2, "happy");
    const tGuess = segEnd("s06d") + 0.1;
    m.point(tl, tGuess, "R", 120).expr(tl, tGuess, "grin");
    tl.to(cards[1], { x: -140, rotation: -4, svgOrigin: O, duration: 0.35, ease: K.stepEase(0.35, "power2.out", tGuess + 0.15) }, tGuess + 0.15);
    k.expr(tl, tGuess + 0.5, "wow"); shakeHead(tGuess + 0.65);
    const tLovely = cue("s06e", "@lovely");
    m.expr(tl, tLovely, "worried").arm(tl, tLovely, "R", 12, 8, 0.3);
    tl.to(cards[1], { x: 0, rotation: 0, svgOrigin: O, duration: 0.35, ease: K.stepEase(0.35, "power2.inOut", cue("s06e", "@but")) }, cue("s06e", "@but"));
    k.expr(tl, cue("s06e", "@moved"), "awake");
    const tNo1 = cue("s06e", "@not");
    toBin(cards[1], tNo1, "no");
    m.expr(tl, tNo1 + 0.5, "grin");

    // card 3 — SOLO: sugar → (3-2-1) → YES
    const t3 = segStart("s06f");
    drop(cards[2], cue("s06f", "@meera") - 0.15);
    k.arm(tl, cue("s06f", "@your"), "L", 80).emote(tl, cue("s06f", "@turn"), "?", 1.2).arm(tl, cue("s06f", "@turn") + 0.7, "L", 15);
    m.look(tl, t3, 0, 0).expr(tl, t3, "happy");
    countdown(segEnd("s06f") + 0.05);
    k.look(tl, segEnd("s06f") + 0.2, 0, -9);
    const tYes2 = cue("s06g", "@yes");
    ring(tYes2);
    k.expr(tl, tYes2, "happy").look(tl, tYes2, 0, 0);
    toBin(cards[2], tYes2 + 0.25, "yes");
    m.expr(tl, tYes2 + 0.1, "joy");

    // card 4 — SOLO: a milk supplier calls to say hello → (3-2-1) → NO … yet
    const t4 = cue("s06h", "@a") - 0.2;
    drop(cards[3], t4);
    // the phone on the card buzzes
    // (no card buzz — cards stay steady; the phone icon on the card already says "call")
    m.expr(tl, t4 + 0.3, "thinking");
    countdown(segEnd("s06h") + 0.05);
    const tNo2 = cue("s06i", "@not");
    toBin(cards[3], tNo2 + 0.1, "no");
    // "…yet." — a GESTURE only (bible §9: no on-screen text): Khata lifts one page-corner like a raised finger and winks
    const tYet = cue("s06i", "@yet");
    k.arm(tl, tYet - 0.1, "R", 115).expr(tl, tYet, "wink");
    k.arm(tl, tYet + 1.5, "R", 15);
    m.expr(tl, tYet + 0.1, "joy");

    // paper wobble
    m.jitter(tl, T0, T1, { seed: 61 });
    k.jitter(tl, T0, T1);
  };
})();
