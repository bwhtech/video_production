// s07 — Misconception: "every rupee out is an expense". Meera's thought bubble (galla → notes out → `Expense`) gets Khata's red ✗ stamp.
// Then the test — "used up, gone for good?" — sorts two cards into two bins: the rent slip (April gone, May needs more) → Expense,
// the cart (still standing, making chai) → Asset. The scale HUD is parked top-right (level, ₹1,01,000) and stays through s08.
(function () {
  window.SCENES.s07 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    K.wall(svg, C.coral, 860); K.table(svg, 860);
    // tone-on-tone set dressing
    [[40, 380, 170, 480], [1790, 420, 140, 440]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#e5604f" : "#e96b59"));

    // ---- HUD (parked top-right): level, post-T7
    const hudL = L4.layers(svg);
    const hud = K.scaleRig(hudL.sc, 960, 890, 1.0, { tint: true, L: 101000, R: 101000 });
    const P = L4.pans(hud, K, { cash: 51000 });
    gsap.set(P.eq.card, { autoAlpha: 1 }); gsap.set(P.eq.tag, { autoAlpha: 0 }); P.eq.list.forEach((p) => gsap.set(p.wrap, { autoAlpha: 1 }));
    L4.hudSet(hud, hudL, tl, { k: 0.4, right: 40, top: 118, text: 30 });

    // ---- Meera
    const meera = K.meera(svg, 290, 1000, 0.92, { expr: "worried" });

    // ---- thought bubble (galla → notes → Expense)
    const bub = L4.node(svg, 0, 0);
    {
      const cs = K.shadow(bub.inner, 2);
      [[800, 300, 330, 150], [560, 330, 150, 110], [1040, 340, 150, 110], [800, 220, 170, 80], [1000, 230, 130, 80], [620, 240, 120, 70]].forEach(([x, y, rx, ry]) => K.tex(cs, K.cutEll(x, y, rx, ry, 2), "pat-paper"));
      K.tex(cs, K.cutEll(500, 468, 26, 22, 1.2), "pat-paper"); K.tex(cs, K.cutEll(450, 520, 16, 14, 1), "pat-paper");
    }
    const gal = K.galla(bub.inner, 620, 400, 0.78, { open: true, overflow: true });
    const arrow = L4.node(bub.inner, 790, 330);
    K.arrowShape(arrow.inner, 0, 0, 120, C.ink, -1, 0, 24);
    arrow.outer.setAttribute("opacity", "0");
    const flyNotes = [0, 1, 2].map((i) => { const n = L4.node(bub.inner, 700, 330); K.note(n.inner, 0, 0, 70, 36, -12 + i * 12); n.outer.setAttribute("opacity", "0"); return n; });
    const expChip = L4.chip(bub.inner, 1040, 330, "Expense", { size: 52, bg: C.cr, rot: -3 });
    expChip.outer.setAttribute("opacity", "0");
    bub.outer.setAttribute("opacity", "0");
    const khata = K.khataRig(svg, 760, 1000, 0.58, { expr: "awake" });
    khata.g.setAttribute("opacity", "0");
    const stamp = K.stamp(tl, svg, 860, 320, cue("s07b", "@nope"), 2.1);

    // ---- bins (back / cards / front) + labels
    const BX = [1180, 1560], BY = 700;
    const backs = K.g(svg, {}), cardLayer = K.g(svg, {}), fronts = K.g(svg, {});
    const bins = BX.map((x, i) => {
      const nb = L4.node(backs, x, BY), nf = L4.node(fronts, x, BY);
      K.paper(K.shadow(nb.inner, 2), K.cutRect(-150, -14, 300, 40, 2, 22), C.woodDark);                 // open mouth (back rim)
      K.tex(K.shadow(nf.inner, 2), K.cutRect(-150, 0, 300, 280, 2.4, 26), "pat-kraft");                   // front
      K.paper(nf.inner, K.cutRect(-150, 0, 300, 18, 1.4, 22), C.woodDark);
      K.paper(K.shadow(nf.inner, 1), K.cutEll(0, 130, 78, 78, 1.4), C.cream);
      if (i === 0) K.medallion(nf.inner, 0, 130, 58, "flame");
      else { const jg = K.g(nf.inner, {}); K.jarRig(jg, 0, 184, 0.62, { contents: "coins", fill: 0.6 }); }
      nb.outer.setAttribute("opacity", "0"); nf.outer.setAttribute("opacity", "0");
      return { nb, nf };
    });
    const labExp = L4.chip(svg, BX[0], 548, "Expense", { size: 52, bg: C.cr, rot: -2 });
    const labAst = L4.chip(svg, BX[1], 548, "Asset", { size: 52, bg: C.dr, rot: 2 });
    [labExp, labAst].forEach((n) => n.outer.setAttribute("opacity", "0"));

    // ---- the two cards
    const mkCard = (x, y) => { const n = L4.card3(cardLayer, x, y); n.outer.setAttribute("opacity", "0"); return n; };
    const rent = mkCard(640, 600), cart = mkCard(930, 600);
    {
      K.card(rent.body, 0, 0, 270, 330, { shadow: 2 });
      const may = L4.node(rent.body, 66, -112); K.tex(K.shadow(may.inner, 1), K.cutRect(-48, -48, 96, 96, 1.4, 14), "pat-paper"); K.text(may.inner, 0, 0, "May", { size: 38, weight: 700, color: C.crText });
      rent.may = may; may.outer.setAttribute("opacity", "0");
      const apr = L4.node(rent.body, 66, -112); K.tex(K.shadow(apr.inner, 1), K.cutRect(-48, -48, 96, 96, 1.4, 14), "pat-paper"); K.text(apr.inner, 0, 0, "Apr", { size: 38, weight: 700 });
      rent.apr = apr;
      const xs = K.g(apr.inner, { opacity: 0 }); K.ink(xs, [[-44, -36], [44, 36]], 8, C.red); rent.cross = xs;
      K.medallion(rent.body, -52, -96, 50, "key", C.saffron, C.white);
      rent.tk = K.ticker(rent.body, 0, 78, 1, { value: 0, size: 64, weight: 800 });
      K.card(cart.body, 0, 0, 270, 330, { shadow: 2 });
      K.cartArt(K.g(cart.body, { transform: "translate(-34 -60) scale(1.5)" }));
      cart.kettle = K.kettle(cart.body, 70, -10, 0.62);
      cart.tk = K.ticker(cart.body, 0, 98, 1, { value: 0, size: 54, weight: 800 });
    }

    // ================================================================================== timeline
    meera.blinks(tl, T0 + 1, sc.end, 3.3);
    // the wrong idea
    const tTrap = cue("s07a", "@trap"), tLeft = cue("s07a", "@left"), tGalla = cue("s07a", "@galla"), tExp = cue("s07a", "@expense");
    L4.show(tl, bub.outer, tTrap - 0.4); K.dropIn(tl, bub.inner, tTrap - 0.4, { dur: 0.38 });
    meera.look(tl, tTrap, 6, -6).headTilt(tl, tTrap, -3);
    L4.show(tl, arrow.outer, tLeft + 0.45); K.dropIn(tl, arrow.inner, tLeft + 0.45, { dur: 0.3 });
    flyNotes.forEach((n, i) => {
      const t = tGalla + 0.3 + i * 0.28;
      L4.show(tl, n.outer, t);
      tl.fromTo(n.inner, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 150 + i * 14, y: -40 - i * 18, rotation: 18, opacity: 0.9, duration: 0.6, ease: "power2.out", immediateRender: false }, t);
      tl.to(n.inner, { opacity: 0, duration: 0.2 }, t + 0.6);
    });
    L4.show(tl, expChip.outer, tExp); K.dropIn(tl, expChip.inner, tExp, { dur: 0.36 });
    // "Nope." — Khata arrives, raises the stamp, ✗ lands (no shake)
    const tNope = cue("s07b", "@nope");
    tl.fromTo(khata.g, { opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, tNope - 1.0);
    tl.fromTo(khata.mover, { x: 2100 }, { x: 0, duration: 0.9, ease: "power2.out", immediateRender: false }, tNope - 1.0);
    khata.arm(tl, tNope - 0.3, "R", 150, 0.25).arm(tl, tNope + 0.3, "R", 15, 0.3);
    khata.expr(tl, tNope, "wow");
    meera.expr(tl, tNope + 0.2, "worried");
    // "Remember the cart?" — the bubble clears; the cart card comes in; ₹36,000
    const tCart = cue("s07b", "@cart"), t36 = cue("s07b", "@thirty-six");
    K.liftOff(tl, bub.inner, tCart - 0.35, { dur: 0.25 }); stamp.lift(tl, tCart - 0.35);
    L4.show(tl, cart.outer, tCart); K.dropIn(tl, cart.inner, tCart, { dur: 0.38 });
    cart.tk.to(tl, t36, 36000, 0.9);
    meera.expr(tl, tCart + 0.2, "thinking");
    khata.expr(tl, tCart, "awake");
    // "ask one question" — the two bins and their labels drop in
    const tQ = cue("s07b", "@question");
    bins.forEach((b, i) => { const t = tQ - 0.8 + i * 0.12; L4.show(tl, b.nb.outer, t); L4.show(tl, b.nf.outer, t); K.dropIn(tl, b.nb.inner, t, { dur: 0.36 }); K.dropIn(tl, b.nf.inner, t, { dur: 0.36 }); });
    [labExp, labAst].forEach((n, i) => { const t = tQ - 0.5 + i * 0.12; L4.show(tl, n.outer, t); K.dropIn(tl, n.inner, t, { dur: 0.3 }); });
    // "Is it used up — gone for good?" — the flame bin pulses
    K.pulseNode(tl, bins[0].nf.inner, cue("s07b", "@used"), 1.04);
    // "The rent? Yes." — rent card, April crossed, May slides in, card drops into Expense
    const tRent = cue("s07b", "@rent"), tYes = cue("s07b", "@yes"), tApril = cue("s07b", "@april"), tMay = cue("s07b", "@may");
    L4.show(tl, rent.outer, tRent); K.dropIn(tl, rent.inner, tRent, { dur: 0.36 });
    rent.tk.to(tl, tRent + 0.1, 5000, 0.6);
    tl.set(rent.cross, { opacity: 1 }, tApril + 0.1);
    tl.fromTo(rent.cross, { scaleX: 0.05, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.25, ease: "power2.out", immediateRender: false }, tApril + 0.1);
    L4.show(tl, rent.may.outer, tMay); K.dropIn(tl, rent.may.inner, tMay, { dur: 0.34 });
    const drop = (card, x0, binX, t) => {
      tl.to(card.mid, { y: -110, duration: 0.25, ease: "power2.out" }, t);
      tl.to(card.mid, { x: binX - x0, duration: 0.5, ease: "power1.inOut" }, t);
      tl.to(card.mid, { y: 55, duration: 0.45, ease: "power2.in" }, t + 0.25);
      tl.to(card.body, { scale: 0.62, svgOrigin: O, duration: 0.45, ease: "power2.in" }, t + 0.25);
    };
    const tDropRent = cue("s07b", "@more") + 0.3;
    drop(rent, 640, BX[0], tDropRent);
    meera.expr(tl, tYes, "happy");
    // "The cart? No." — steam: it's still standing, making chai → into Asset
    const tCartQ = cue("s07b", "@cart", 2), tStill = cue("s07b", "@still"), tAsset = cue("s07b", "@asset");
    meera.expr(tl, tCartQ, "thinking");
    cart.kettle.steamLoop(tl, tStill, tStill + 2.4);
    drop(cart, 930, BX[1], tAsset - 0.3);
    meera.expr(tl, tAsset, "proud");
    khata.hop(tl, tDropRent + 0.7, { height: 50 }); khata.hop(tl, tAsset + 0.6, { height: 50 });
  };
})();
