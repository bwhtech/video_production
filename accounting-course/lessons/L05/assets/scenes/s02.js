// s02 — Last time: Lesson 4's answers. Three question cards (the first frame is what s01t's page shows, via <use #s02-first>)
// flip to their answers: (1) the cart is an Asset, Expense? gets an ink ✗ · (2) 18,000 − 5,000 = 13,000 · (3) profit lives in Meera's equity card.
// Out: the Profit pocket lifts off card 3 and flies up to where the Profit gauge hangs (s03); default torn-paper wipe.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L5 = window.L5;
    const CW = 580, CH = 700, XS = [350, 960, 1570], CY = 535;

    // ---- first frame (static; also referenced by s01t's page window)
    const first = K.g(svg, { id: "s02-first" });
    L5.cal(K, first, 16);
    K.wall(first, C.teal, 880); K.table(first, 880);
    [[20, 230, 160, 650], [1740, 280, 170, 600]].forEach(([x, y, w, h], i) => K.paper(first, K.cutRect(x, y, w, h, 1.6, 24), i ? "#2a9a8e" : "#34aa9e"));

    const cards = XS.map((x, i) => {
      const n = L5.node(K, first, x, CY);
      const body = K.g(n, {});
      K.card(body, 0, 0, CW, CH, { header: C.saffron, title: String(i + 1), titleSize: 56, headerH: 84, shadow: 2 });
      const front = K.g(body, {}), back = K.g(body, {});
      back.setAttribute("opacity", "0");
      return { n, body, front, back, x };
    });
    const dashChip = (parent, x, y, text) => {
      const g = K.g(parent, { transform: `translate(${x} ${y})` });
      K.paper(K.shadow(g, 1), K.cutRect(-130, -36, 260, 72, 1.4, 20), C.cream, { opacity: 0.7 });
      K.el("path", { d: K.cutRect(-122, -29, 244, 58, 1, 22), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0.55 }, g);
      K.text(g, 0, 3, text, { size: 44, weight: 700, color: "#6b6275" });
      return g;
    };
    const slip = (parent, x, y, amount, rot) => {
      const g = K.g(parent, { transform: `translate(${x} ${y}) rotate(${rot})` });
      K.tex(K.shadow(g, 1), K.cutRect(-150, -52, 300, 104, 1.6, 20), "pat-paper");
      K.paper(g, K.cutRect(-142, -44, 20, 88, 0.8, 20), amount === "18,000" ? C.cr : C.coral);
      K.text(g, 10, 4, "₹" + amount, { size: 62, weight: 800 });
      return g;
    };

    // ---- fronts: pictures only
    K.cartArt(K.g(cards[0].front, { transform: "translate(-10 -40) scale(3.1)" }));
    dashChip(cards[0].front, 0, 215, "Expense?");
    slip(cards[1].front, 0, -120, "18,000", -3); slip(cards[1].front, 0, 40, "5,000", 3);
    K.qmark(cards[1].front, 0, 240, 2.0, C.dr);
    {
      const m = K.scaleRig.mini(cards[2].front, 0, 110, 0.5);
      K.qmark(m.slot.g, 0, 4, 1.5, C.cr);
      K.jarRig(m.pans.L.g, 0, 0, 0.9, { contents: "coins", fill: 0.7 });
      K.claimTag(m.pans.R.g, -50, 0, 0.62, { face: "ravi" }); K.claimTag(m.pans.R.g, 50, 0, 0.62, { face: "meera" });
    }

    // ---- backs: the answers
    K.cartArt(K.g(cards[0].back, { transform: "translate(-40 -20) scale(2.8)" }));
    const kettleG = K.g(cards[0].back, { transform: "translate(170 70)" });
    const kettle = K.kettle(kettleG, 0, 0, 1.15);
    const chipAsset = L5.hide(L5.node(K, cards[0].back, 0, 215));
    K.label(chipAsset, 0, 0, "Asset", { size: 56, bg: C.dr, rot: -2, weight: 800 });
    const expC = dashChip(cards[0].back, 0, 300, "Expense?");
    const ex = K.g(expC, { opacity: 0 });
    K.ink(ex, [[-120, -26], [120, 26]], 9, C.red); K.ink(ex, [[-120, 26], [120, -26]], 9, C.red);
    // card 2
    slip(cards[1].back, 0, -170, "18,000", -3);
    K.text(cards[1].back, -150, -48, "−", { size: 80, weight: 800, color: C.coralText });
    slip(cards[1].back, 0, -50, "5,000", 3);
    K.ink(cards[1].back, [[-180, 20], [180, 20]], 7);
    const res = L5.hide(L5.node(K, cards[1].back, 0, 140));
    K.tex(K.shadow(res, 1), K.cutRect(-190, -62, 380, 124, 1.8, 22), "pat-paper");
    const resTk = K.ticker(res, 0, 4, 1, { value: 0, size: 84 });
    // card 3
    const m3 = K.scaleRig.mini(cards[2].back, 0, 60, 0.46, { tint: "R" });
    K.medallion(m3.slot.g, 0, 0, 40, "coins", C.saffron);
    K.jarRig(m3.pans.L.g, 0, 0, 0.9, { contents: "coins", fill: 0.7 });
    K.claimTag(m3.pans.R.g, -62, 0, 0.5, { face: "ravi" }); K.claimTag(m3.pans.R.g, 0, 0, 0.5, { face: "gopal" });
    const miniCard = K.claimTag(m3.pans.R.g, 62, 0, 0.5, { face: "meera" });
    const eqPos = L5.node(K, cards[2].back, 0, 330);
    const eqC = K.equityCard(eqPos, 0, 0, 0.64, { pockets: 2, capital: 50000, profit: 13000 });
    eqC.unfold(tl, 0, { dur: 0.05 });
    L5.hide(eqPos);

    // ======================================================================================= timeline
    const flip = (c, t) => {
      tl.to(c.body, { scaleX: 0.04, svgOrigin: O, duration: 0.17, ease: "power2.in" }, t);
      tl.set(c.front, { autoAlpha: 0 }, t + 0.17);
      tl.set(c.back, { autoAlpha: 1 }, t + 0.17);
      tl.to(c.body, { scaleX: 1, svgOrigin: O, duration: 0.2, ease: "power2.out" }, t + 0.17);
    };
    const lifted = (c, t) => { tl.to(c.n, { scale: 1.04, svgOrigin: O, duration: 0.18, ease: "power2.out" }, t - 0.25); tl.to(c.n, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t + 0.45); };

    // ONE — "Is the cart an expense? No. It's still making chai, so it's an asset."
    const tOne = cue("s02", "@one");
    lifted(cards[0], tOne); flip(cards[0], tOne);
    const tNo = cue("s02", "@no"), tChai = cue("s02", "@chai"), tAsset = cue("s02", "@asset");
    tl.set(ex, { opacity: 1 }, tNo - 0.05);
    tl.fromTo(ex, { scaleX: 0.05, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.25, ease: "power2.out", immediateRender: false }, tNo - 0.05);
    tl.to(expC, { opacity: 0.45, duration: 0.3 }, tNo + 0.4);
    kettle.steamLoop(tl, tChai - 0.2, tAsset + 1.5);
    L5.drop(tl, K, chipAsset, tAsset - 0.05);
    // TWO — "Meera's profit: eighteen thousand of revenue, minus five thousand of rent. Thirteen thousand rupees."
    const tTwo = cue("s02", "@two");
    lifted(cards[1], tTwo); flip(cards[1], tTwo);
    const tThirteen = cue("s02", "@thirteen");
    L5.drop(tl, K, res, tThirteen - 0.1); resTk.to(tl, tThirteen, 13000, 0.8);
    // THREE — "Profit lives on the right side of the scale, inside equity. It belongs to Meera."
    const tThree = cue("s02", "@three");
    lifted(cards[2], tThree); flip(cards[2], tThree);
    const tRight = cue("s02", "@right"), tEq = cue("s02", "@equity"), tBel = cue("s02", "@belongs");
    m3.tilt(tl, tRight - 0.2, -3, { dur: 0.6 }); m3.settle(tl, tRight + 0.9, { dur: 0.7, hold: 0.3 });
    L5.drop(tl, K, eqPos, tEq - 0.1);
    eqC.light(tl, tBel - 0.1, "Profit", { hold: 1.2 });
    // out: the Profit pocket (₹13,000 chip) lifts off and flies up toward where the Profit gauge will hang
    const tOut = cue("s02", "@meera") - 0.1;
    const chip = L5.hide(L5.node(K, svg, 0, 0));
    K.tex(K.shadow(chip, 1), K.cutRect(-120, -42, 240, 84, 1.6, 20), "pat-paper");
    K.text(chip, 0, 3, "₹13,000", { size: 56, weight: 800 });
    const px = XS[2] + 72, py = CY + 330 - 96;                 // the Profit pocket on card 3 (world)
    tl.set(chip, { autoAlpha: 1, x: px, y: py }, tOut);
    L5.fly(tl, chip, tOut, [px, py], [230, 300], 0.9, { lift: 120 });
    tl.to(chip, { autoAlpha: 0, scale: 0.7, svgOrigin: O, duration: 0.2, ease: "power2.in" }, tOut + 0.85);
    cards.forEach((c, i) => L5.lift(tl, K, c.n, tOut - 0.05 + i * 0.05));
    L5.allow(svg);
  };
})();
