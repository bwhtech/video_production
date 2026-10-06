// s02 — Last time: Lesson 3's answers. Three question cards (the first frame is what s01t's page shows, via <use #s02-era1>)
// flip to their answers: each answer is a tiny scale (always level). Card 3 also marks "loan repayment is not an expense".
// Out: default torn-paper wipe into s04 (L3 Checkpoint 1 is answered in L3 itself, so there is no solution walk here).
(function () {
  window.OWN_SEAM_IN.s02 = true;           // s01t pushes into this scene's first frame, so no wipe at its start

  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const CW = 580, CH = 700, XS = [350, 960, 1570], CY = 520;

    // ---- first frame (static; also referenced by s01t's page window)
    const first = K.g(svg, { id: "s02-era1" });
    K.wall(first, C.teal, 880); K.table(first, 880);
    // tone-on-tone skyline
    [[20, 230, 160, 650], [1740, 280, 170, 600]].forEach(([x, y, w, h], i) => K.paper(first, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));

    const cards = XS.map((x, i) => {
      const n = L4.node(first, x, CY);
      const body = K.g(n.inner, {});                           // flips (scaleX)
      K.card(body, 0, 0, CW, CH, { header: C.saffron, title: String(i + 1), titleSize: 56, headerH: 84, shadow: 2 });
      const front = K.g(body, {}), back = K.g(body, {});
      back.setAttribute("opacity", "0");
      return { n, body, front, back, x };
    });

    // ---- fronts: what the question was about (pictures only)
    {
      const [c1, c2, c3] = cards;
      // 1 · Gopal's delivery
      K.faceArt(c1.front, "gopal", 92).setAttribute("transform", "translate(-120 -50)");
      K.medallion(c1.front, 120, -50, 76, "milk");
      K.curveArrow(c1.front, [[-60, 100], [0, 135], [70, 110]], C.cr, 10);
      K.medallion(c1.front, -120, 190, 56, "package");
      K.faceArt(c1.front, "meera", 62).setAttribute("transform", "translate(120 190)");
      // 2 · buy the cart for cash
      K.cartArt(K.g(c2.front, { transform: "translate(120 -40) scale(1.9)" }));
      K.medallion(c2.front, -120, -40, 76, "coins");
      K.curveArrow(c2.front, [[-60, 70], [0, 120], [70, 100]], C.dr, 10);
      // 3 · pay back part of Ravi's loan
      K.faceArt(c3.front, "ravi", 92).setAttribute("transform", "translate(120 -50)");
      K.medallion(c3.front, -120, -50, 76, "coins");
      K.curveArrow(c3.front, [[60, 100], [0, 135], [-70, 110]], C.cr, 10);
    }

    // ---- backs: a mini scale each + the one fact
    const mkScale = (card) => {
      const rig = K.scaleRig.mini(card.back, 0, 228, 0.48);
      return rig;
    };
    const rigs = cards.map(mkScale);
    const eqLabel = (parent, y) => ({
      a: K.ticker(parent, -200, y, 1, { value: 0, size: 36, color: C.drText }),
      eq: K.text(parent, -108, y + 2, "=", { size: 38, weight: 800 }),
      b: K.ticker(parent, -2, y, 1, { value: 0, size: 36, color: C.crText }),
      pl: K.text(parent, 104, y + 2, "+", { size: 38, weight: 800 }),
      c: K.ticker(parent, 206, y, 1, { value: 0, size: 36, color: C.crText }),
    });
    ["milk", "shopping-cart", "hand-coins"].forEach((ic, i) => K.icon(rigs[i].slot.g, ic, 0, 0, 74, C.ink, 2.4));
    // card 1 — equation row
    const e1 = eqLabel(cards[0].back, 320);
    [e1.eq, e1.pl].forEach((t) => t.setAttribute("opacity", "0"));
    [e1.a, e1.b, e1.c].forEach((t) => t.body.setAttribute("opacity", "0"));
    // pan contents (tiny pictograms)
    const jar1 = K.jarRig(rigs[0].pans.L.g, -34, 0, 0.82, { contents: "coins", fill: 0.7 });
    const stk1 = K.jarRig(rigs[0].pans.L.g, 34, 0, 0.82, { contents: "leaves", icon: "leaf", fill: 0.8 });
    K.claimTag(rigs[0].pans.R.g, -34, 0, 0.6, { face: "gopal" });
    K.claimTag(rigs[0].pans.R.g, 34, 0, 0.6, { face: "meera" });
    // card 2 — the swap
    const jar2 = K.jarRig(rigs[1].pans.L.g, -34, 0, 0.82, { contents: "coins", fill: 0.7 });
    const cartHold = L4.node(rigs[1].pans.L.g, 34, -40, 0.8);
    K.cartArt(cartHold.inner);
    K.claimTag(rigs[1].pans.R.g, -34, 0, 0.6, { face: "ravi" });
    K.claimTag(rigs[1].pans.R.g, 34, 0, 0.6, { face: "meera" });
    // card 3 — pay back part of the loan: both pans drop together, beam stays level
    const jar3 = K.jarRig(rigs[2].pans.L.g, -34, 0, 0.82, { contents: "coins", fill: 0.7 });
    K.jarRig(rigs[2].pans.L.g, 34, 0, 0.82, { contents: "cart", fill: 1 });
    const raviTag = K.claimTag(rigs[2].pans.R.g, -34, 0, 0.6, { face: "ravi" });
    K.claimTag(rigs[2].pans.R.g, 34, 0, 0.6, { face: "meera" });
    const ravi = K.raviMama(cards[2].back, 215, 338, 0.3, { expr: "neutral", aR: [14, 10] });
    const note = L4.node(cards[2].back, -70, 190); K.note(note.inner, 0, 0, 70, 36, -12); note.outer.setAttribute("opacity", "0");
    const exp = L4.node(cards[2].back, -120, 316);
    K.label(exp.inner, 0, 0, "Expense?", { size: 40, bg: "paper", rot: -2, weight: 700 });
    exp.outer.setAttribute("opacity", "0");
    const ex = K.g(exp.inner, { opacity: 0 });
    K.ink(ex, [[-120, -26], [120, 26]], 9, C.red); K.ink(ex, [[-120, 26], [120, -26]], 9, C.red);

    // ================================================================================== timeline
    const flip = (c, t) => {
      tl.to(c.body, { scaleX: 0.04, svgOrigin: O, duration: 0.17, ease: "power2.in" }, t);
      tl.set(c.front, { autoAlpha: 0 }, t + 0.17);
      tl.set(c.back, { autoAlpha: 1 }, t + 0.17);
      tl.to(c.body, { scaleX: 1, svgOrigin: O, duration: 0.2, ease: "power2.out" }, t + 0.17);
    };
    const lifted = (c, t) => { tl.to(c.n.inner, { scale: 1.04, svgOrigin: O, duration: 0.18, ease: "power2.out" }, t - 0.25); tl.to(c.n.inner, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t + 0.45); };

    // ONE
    const tOne = cue("s02", "@one"), tEq = cue("s02", "@eighty-eight");
    lifted(cards[0], tOne); flip(cards[0], tOne);
    const drop = (n, t, o) => K.dropIn(tl, n, t, o);
    tl.set([e1.eq, e1.pl], { opacity: 0 }, 0);
    drop(e1.a.body, tEq, { dur: 0.3 }); e1.a.to(tl, tEq, 88000, 0.7);
    tl.set(e1.eq, { opacity: 1 }, cue("s02", "@equals") );
    drop(e1.b.body, cue("s02", "@thirty-eight"), { dur: 0.3 }); e1.b.to(tl, cue("s02", "@thirty-eight"), 38000, 0.6);
    tl.set(e1.pl, { opacity: 1 }, cue("s02", "@plus"));
    drop(e1.c.body, cue("s02", "@fifty"), { dur: 0.3 }); e1.c.to(tl, cue("s02", "@fifty"), 50000, 0.6);

    // TWO — the swap on the left (nothing tips)
    const tTwo = cue("s02", "@two");
    lifted(cards[1], tTwo); flip(cards[1], tTwo);
    rigs[1].levelFlash(tl, cue("s02", "@scale"));
    const tCash = cue("s02", "@cash", 2), tCome = cue("s02", "@comes");
    // swap: the jar slides right, the cart slides left (arcs). jar.body lives inside the jar's 0.82× root → ×1/0.82 for pan units
    tl.to(jar2.body, { x: 68 / 0.82, duration: 0.8, ease: "power1.inOut" }, tCash);
    tl.to(jar2.body, { y: -30 / 0.82, duration: 0.4, ease: "power2.out" }, tCash);
    tl.to(jar2.body, { y: 0, duration: 0.4, ease: "power2.in" }, tCash + 0.4);
    tl.to(cartHold.inner, { x: -68, duration: 0.8, ease: "power1.inOut" }, tCome - 0.2);
    tl.to(cartHold.inner, { y: -30, duration: 0.4, ease: "power2.out" }, tCome - 0.2);
    tl.to(cartHold.inner, { y: 0, duration: 0.4, ease: "power2.in" }, tCome + 0.2);
    rigs[1].arrows(tl, cue("s02", "@swap"), "swapL");

    // THREE — repay part of the loan: cash down, what Meera owes down; both pans drop, beam level
    const tThree = cue("s02", "@three");
    lifted(cards[2], tThree); flip(cards[2], tThree);
    const tPay = cue("s02", "@paying");
    const tCash3 = cue("s02", "@cash", 3);
    tl.set(note.outer, { autoAlpha: 1 }, tCash3);
    tl.fromTo(note.inner, { x: 0, y: 0, opacity: 1 }, { x: 250, y: 130, duration: 0.7, ease: "power2.inOut", immediateRender: false }, tCash3);
    tl.to(note.inner, { opacity: 0, duration: 0.2 }, tCash3 + 0.75);
    ravi.arm(tl, tCash3 + 0.4, "R", 40, 40, 0.3);
    ravi.expr(tl, cue("s02", "@both"), "happy").headTilt(tl, cue("s02", "@both"), 4);
    const tBoth = cue("s02", "@both");
    tl.to(rigs[2].g, { y: 22, duration: 0.7, ease: "power2.inOut" }, tBoth);
    rigs[2].levelFlash(tl, cue("s02", "@level"));
    // the faint dashed Expense? chip: ink ✗ on "not an expense"
    const tNot = cue("s02", "@not", 1), tExp = cue("s02", "@expense");
    L4.drop(tl, exp.inner, tBoth + 0.4); L4.show(tl, exp.outer, tBoth + 0.4);
    tl.set(ex, { opacity: 1 }, tExp - 0.05);
    tl.fromTo(ex, { scaleX: 0.05, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.25, ease: "power2.out", immediateRender: false }, tExp - 0.05);
    tl.to(exp.inner, { opacity: 0.4, duration: 0.3 }, tExp + 0.3);
    // "the debt just got smaller": a small tug on Ravi's tag (it lifts a little and settles)
    const tSm = cue("s02", "@smaller");
    tl.to(raviTag.body, { y: -10, duration: 0.2, ease: "power2.out" }, tSm - 0.1);
    tl.to(raviTag.body, { y: 0, duration: 0.3, ease: "power2.inOut" }, tSm + 0.2);
    ravi.expr(tl, tSm, "proud");
    ravi.blinks(tl, tThree + 2, sc.end, 3.7);
  };
})();
