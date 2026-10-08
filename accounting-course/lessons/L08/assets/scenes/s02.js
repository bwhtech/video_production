// s02 — Last time: L7's three Your-Turn questions answered on three cards.  Teal.
//   1 · the catering advance (May 5, ₹4,000): two journal lines get their golden-rule tags  2 · is the bank Real or Personal?  3 · which family is Rent?
// In: s01t pushes into a page showing #s02-first at 1/3 scale (this scene's world group). Initial hidden states are DOM attributes.
(function () {
  window.OWN_SEAM_IN.s02 = true;   // s01t owns the page push into s02
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start;
    const world = K.g(svg, { id: "s02-first" });
    L8.stage(world, C.teal, 880);
    L8.cal(world, 30);
    const CY = 500, CH = 680;
    const mk = (i, x, w) => { const n = L8.node(world, x, CY); L8.hide(n); L8.card(n, w, CH); K.paper(K.shadow(n, 1), K.cutEll(-w / 2 + 44, -CH / 2 + 44, 30, 30, 1), C.saffron); K.text(n, -w / 2 + 44, -CH / 2 + 47, String(i + 1), { size: 40, weight: 800 }); return n; };
    const cards = [mk(0, 440, 800), mk(1, 1080, 400), mk(2, 1600, 560)];
    // ---- card 1: May 5 slip + ₹4,000, two journal lines with empty tag slots
    const c1 = cards[0];
    const dt = K.dateTile(c1, -120, -215, 0.95, { month: "May", day: 5, hidden: true });
    const coins = L8.node(c1, 70, -215); L8.hide(coins); K.medallion(coins, -40, 0, 46, "calendar-check");
    const tkA = K.ticker(L8.node(c1, 190, -215), 0, 0, 1, { value: 0, size: 56, chip: true, w: 220, h: 90, edge: C.dr }); L8.hide(tkA.g.parentNode);
    const lineY = [-40, 75];
    const mkLine = (i, str, indent) => {
      const n = L8.node(c1, 0, lineY[i]); L8.hide(n);
      K.paper(K.shadow(n, 1), K.cutRect(-370, -40, 740, 80, 1.4, 20), C.cream);
      K.text(n, -340 + indent, 3, str, { size: 36, weight: 700, anchor: "start" });
      return { n };
    };
    const lA = mkLine(0, "Cash A/c", 0), lB = mkLine(1, "To  Advance from customer A/c", 36);
    const slotA = K.emptyTag(c1, 285, lineY[0], 1, { compact: true, hidden: true }), slotB = K.emptyTag(c1, 285, lineY[1], 1, { compact: true, hidden: true });
    const tagA = K.ruleTag(c1, 285, lineY[0], 1, { rule: "real_in", compact: true, hidden: true }), tagB = K.ruleTag(c1, 285, lineY[1], 1, { rule: "personal_giver", compact: true, hidden: true });
    // ---- card 2: the bank between two bins
    const c2 = cards[1];
    const bank = L8.node(c2, 0, -190); L8.hide(bank); K.medallion(bank, 0, 0, 74, "landmark", C.navy);
    const bin = (x, name, ic, col) => {
      const n = L8.node(c2, x, 150); L8.hide(n);
      K.paper(K.shadow(n, 1), K.cutPoly([[-86, -120], [86, -120], [70, 70], [-70, 70]], 1.6, 18), "#c9a06a"); K.paper(n, K.cutPoly([[-78, -108], [78, -108], [64, 62], [-64, 62]], 1.2, 16), "#8e6a43", { opacity: 0.35 });
      K.medallion(n, 0, -62, 36, ic, col); K.paper(K.shadow(n, 1), K.cutRect(-76, 8, 152, 52, 1, 16), C.cream); K.text(n, 0, 36, name, { size: 36, weight: 800 });
      return n;
    };
    const binR = bin(-100, "Real", "box", C.wood), binP = bin(100, "Personal", "user", C.sky);
    // ---- card 3: the rent key above three pots
    const c3 = cards[2];
    const key = L8.node(c3, 0, -215); L8.hide(key); K.medallion(key, 0, 0, 62, "key");
    const tkR = K.ticker(L8.node(c3, 0, -105), 0, 0, 1, { value: 0, size: 52, chip: true, w: 200, h: 80, edge: C.dr }); L8.hide(tkR.g.parentNode);
    const pot = (x, name, ic, col) => {
      const n = L8.node(c3, x, 180); L8.hide(n);
      K.paper(K.shadow(n, 1), K.cutPoly([[-84, -110], [84, -110], [66, 80], [-66, 80]], 1.6, 18), "#b48a5c"); K.paper(n, K.cutEll(0, -108, 82, 14, 1), "#8e6a43");
      K.medallion(n, 0, -50, 34, ic, col); K.paper(K.shadow(n, 1), K.cutRect(-76, 12, 152, 52, 1, 16), C.cream); K.text(n, 0, 40, name, { size: 36, weight: 800 });
      return n;
    };
    const potP = pot(-180, "Personal", "user", C.sky), potR = pot(0, "Real", "box", C.wood), potN = pot(180, "Nominal", "receipt", C.navy);
    c2.appendChild(bank.parentNode); c3.appendChild(key.parentNode);   // the bank and the key travel OVER their bins / pots
    const khata = K.khataRig(world, 110, 1052, 0.5, { expr: "awake" });
    L8.allow(world);

    // =============================================================================== timeline
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 20); khata.jitter(tl, T0, sc.end);
    const dim = (n, t) => tl.to(n, { opacity: 0.7, duration: 0.4, ease: "power2.inOut" }, t);
    // s02a — "One. The catering advance — which golden-rule tags?"
    const tOne = cue("s02a", "@one");
    L8.drop(tl, cards[0], tOne - 0.15, { dur: 0.4 }); khata.expr(tl, tOne, "happy");
    dt.enter(tl, cue("s02a", "@catering") - 0.1); L8.drop(tl, coins, cue("s02a", "@catering") + 0.1, { dur: 0.3 });
    L8.drop(tl, tkA.g.parentNode, cue("s02a", "@advance") - 0.1, { dur: 0.3 }); tkA.to(tl, cue("s02a", "@advance"), 4000, 0.8);
    L8.drop(tl, lA.n, cue("s02a", "@tags") - 0.2, { dur: 0.3 }); L8.drop(tl, lB.n, cue("s02a", "@tags") - 0.05, { dur: 0.3 });
    slotA.enter(tl, cue("s02a", "@tags") + 0.1); slotB.enter(tl, cue("s02a", "@tags") + 0.2);
    // s02b — answer 1: Cash is Real, comes in → Dr · the customer is a person, the giver → Cr Advance from customer
    tagA.enter(tl, cue("s02b", "@comes"), { dur: 0.3 }); tagA.light(tl, cue("s02b", "@debit") - 0.3, { hold: 0.7 });
    K.pulseNode(tl, lA.n, cue("s02b", "@debit"), 1.03); khata.expr(tl, cue("s02b", "@debit"), "wink");
    tagB.enter(tl, cue("s02b", "@giver") - 0.1, { dur: 0.3 }); tagB.light(tl, cue("s02b", "@credit") - 0.3, { hold: 0.7 });
    K.pulseNode(tl, lB.n, cue("s02b", "@credit"), 1.03);
    // s02c — "Two. Is the bank Real, or Personal?"
    const tTwo = cue("s02c", "@two");
    dim(cards[0], tTwo - 0.2); L8.drop(tl, cards[1], tTwo - 0.1, { dur: 0.4 });
    L8.drop(tl, binR, tTwo + 0.15, { dur: 0.3 }); L8.drop(tl, binP, tTwo + 0.3, { dur: 0.3 });
    L8.drop(tl, bank, cue("s02c", "@bank") - 0.1, { dur: 0.35 });
    K.pulseNode(tl, binR, cue("s02c", "@real"), 1.05); K.pulseNode(tl, binP, cue("s02c", "@personal"), 1.05);
    // s02d — answer 2: Personal — a bank is an organisation, and organisations count as persons
    const tPers = cue("s02d", "@personal");
    tl.to(bank, { x: 100, y: 255, scale: 0.55, svgOrigin: O, duration: 0.6, ease: "power2.inOut" }, tPers);
    K.pulseNode(tl, binP, tPers + 0.6, 1.06);
    khata.expr(tl, tPers, "happy");
    const pbadge = L8.node(c2, 150, -10); L8.hide(pbadge); K.medallion(pbadge, 0, 0, 30, "user", C.sky);
    L8.drop(tl, pbadge, cue("s02d", "@persons") - 0.2, { dur: 0.3 });
    // s02e — "Three. Which family is Rent?"
    const tThree = cue("s02e", "@three");
    dim(cards[1], tThree - 0.2); L8.drop(tl, cards[2], tThree - 0.1, { dur: 0.4 });
    L8.drop(tl, key, cue("s02e", "@rent") - 0.1, { dur: 0.35 }); L8.drop(tl, tkR.g.parentNode, cue("s02e", "@rent") + 0.05, { dur: 0.3 }); tkR.to(tl, cue("s02e", "@rent") + 0.1, 5000, 0.7);
    [potP, potR, potN].forEach((p, i) => L8.drop(tl, p, cue("s02e", "@family") - 0.3 + i * 0.15, { dur: 0.3 }));
    // s02f — answer 3: Nominal — it's an expense
    const tNom = cue("s02f", "@nominal");
    tl.to(key, { x: 180, y: 335, scale: 0.55, svgOrigin: O, duration: 0.6, ease: "power2.inOut" }, tNom);
    K.pulseNode(tl, potN, tNom + 0.6, 1.06); khata.expr(tl, tNom, "happy"); khata.hop(tl, cue("s02f", "@expense"), { height: 40 });
    L8.allow(world);
  };
})();
