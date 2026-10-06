// s02 — Last time (L2's three Your-Turn cards flip to their answers).
//   card 1 Gopal's delivery → Stock jar (Asset) + Gopal's tag (Liability) · card 2 Meera's scooter → home side · card 3 ₹? → ₹50,000
// In: s01t pushes into a page that shows #s02-first at 1/3 scale → pixel-identical first frame (identity camera).
//     Initial hidden states are DOM attributes (not tl.set) because s01t renders this group via <use> BEFORE s02 starts.
// Out: default torn-paper wipe into s03.
(function () {
  window.SCENES.s02 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0";
    const world = K.g(svg, { id: "s02-first" });
    L3.stage(K, world, C.cream, 880);
    const CY = 410, CW = 500, CH = 520, CX = [350, 960, 1570];
    const cal = L3.cal(K, world, 2);

    const mkCard = (i) => {
      const n = L3.node(K, world, CX[i], CY);
      L3.card(K, n, CW, CH);
      K.paper(K.shadow(n, 1), K.cutEll(-CW / 2 + 48, -CH / 2 + 48, 38, 38, 1), C.saffron);
      K.text(n, -CW / 2 + 48, -CH / 2 + 52, String(i + 1), { size: 50, weight: 800, color: C.ink });
      return { n, art: K.g(n, {}) };
    };
    const cards = [0, 1, 2].map(mkCard);

    // ---- card 1: Gopal Dairy delivers ₹8,000 of milk, pay later
    const a1 = cards[0].art;
    K.label(a1, 36, -192, "Gopal Dairy", { size: 42, bg: C.sky, rot: -2 });
    K.medallion(a1, 160, -70, 46, "clock");
    const cansW = K.g(a1, {});
    const cans = K.milkCans(cansW, -70, 120, 1.0);
    const jar = K.jarRig(a1, -70, 120, 1.0, { label: "Stock", labelHidden: true, contents: "leaves", fill: 0.85, hidden: true, edge: C.dr });
    K.ticker(a1, 0, 222, 1, { value: 8000, size: 66, chip: true, w: 300, h: 96, edge: C.dr });
    const gTag = K.claimTag(world, 612, CY + 112, 0.62, { face: "gopal", amount: 8000, size: 50, hidden: true });
    const chipAsset = L3.hide(L3.node(K, world, 250, 756)); K.label(chipAsset, 0, 0, "Asset", { size: 46, bg: C.dr, rot: -2 });
    const chipLiab = L3.hide(L3.node(K, world, 548, 756)); K.label(chipLiab, 0, 0, "Liability", { size: 46, bg: C.cr, rot: 2 });

    // ---- card 2: Meera's personal scooter
    const a2 = cards[1].art;
    const q2 = K.g(a2, {}); K.qmark(q2, 135, -120, 2.3, C.dr);
    const scW = K.g(world, {});                               // wrapper (no transform attr) → drops to the ground
    const scooter = K.scooter(scW, 930, CY + 168, 0.95, { color: "#d9503f", flip: true });
    // home side: dashed entity line + map-pin medallion
    const line = K.g(world, {});
    for (let y = 790; y < 1070; y += 56) L3.hide(K.paper(line, K.cutRect(594, y, 12, 34, 0.8, 10), C.ink, { opacity: 0.8 }));
    const home = L3.hide(L3.node(K, world, 215, 955)); K.medallion(home, 0, 0, 66, "map-pin");
    const stallM = L3.hide(L3.node(K, a2, 0, 40)); K.medallion(stallM, 0, 0, 96, "store");

    // ---- card 3: the stall has ₹80,000, owes ₹30,000 → Meera's share is ₹?
    const a3 = cards[2].art;
    K.ticker(a3, 0, -176, 1, { value: 80000, size: 60, chip: true, w: 300, h: 88, edge: C.dr });
    const gal = K.galla(a3, 0, 36, 0.78, { open: true, overflow: true });
    const ravi = K.claimTag(a3, -112, 238, 0.8, { face: "ravi", amount: 30000, size: 50 });
    const meeraTag = K.claimTag(a3, 112, 238, 0.8, { face: "meera", amount: 0, size: 50 });
    meeraTag.art.ticker.text.textContent = "₹?";

    // ======================================================================================= timeline
    const lift = (c, t) => tl.to(c.n, { scale: 1.05, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t);
    const dim = (c, t) => { tl.to(c.n, { scale: 1, opacity: 0.6, svgOrigin: O, duration: 0.4, ease: "power2.inOut" }, t); };

    // ---- 1
    const t1 = cue("s02a", "@one");
    lift(cards[0], t1);
    // "eight thousand rupees of stock" — the cans rise into a glass jar; the Stock label ties on
    const tStock = cue("s02a", "@stock") - 0.1;
    tl.to(cansW, { y: -34, scale: 0.55, autoAlpha: 0, svgOrigin: "-70 120", duration: 0.5, ease: "power2.in" }, tStock);
    jar.enter(tl, tStock + 0.2);
    jar.tieLabel(tl, tStock + 0.55);
    // "That's an asset." — a blue Asset chip drops beside it
    const tAsset = cue("s02a", "@asset");
    L3.drop(tl, K, chipAsset, tAsset);
    // "it owes Gopal eight thousand" — an orange tag hangs off the card's right edge; "That's a liability."
    const tOwes = cue("s02a", "@owes");
    gTag.enter(tl, tOwes - 0.05);
    gTag.stringTo(tl, tOwes + 0.25, 600, CY - 10, { dur: 0.5 });
    L3.drop(tl, K, chipLiab, cue("s02a", "@liability"));
    gTag.light(tl, cue("s02a", "@liability"), { hold: 0.6 });

    // ---- 2
    const t2 = cue("s02b", "@two");
    dim(cards[0], t2 - 0.05); lift(cards[1], t2);
    tl.to(chipAsset, { opacity: 0.6, duration: 0.3 }, t2); tl.to(chipLiab, { opacity: 0.6, duration: 0.3 }, t2);
    // "Not an asset of the stall." — the scooter leaves the card, drops to the street and rolls left across the dashed line
    const tNot = cue("s02b", "@not");
    tl.to(scW, { y: 1000 - (CY + 168), scale: 0.6, svgOrigin: `930 ${CY + 168}`, duration: 0.5, ease: "power2.in" }, tNot - 0.1);
    tl.to(q2, { autoAlpha: 0, scale: 0.8, svgOrigin: "135 -120", duration: 0.25, ease: "power2.in" }, tNot);
    line.querySelectorAll(":scope > g").forEach((d, i) => tl.fromTo(d, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false }, tNot + i * (2 / 15)));
    const tHers = cue("s02b", "@hers");
    scooter.rollTo(tl, tNot + 0.45, 930 - (930 - 420) / 0.6, tHers - tNot - 0.1);   // (the wrapper is scaled 0.6)
    L3.drop(tl, K, home, tHers - 0.35);
    L3.drop(tl, K, stallM, cue("s02b", "@stall", 2));
    K.pulseNode(tl, home, tHers + 0.15, 1.08);

    // ---- 3
    const t3 = cue("s02c", "@three");
    dim(cards[1], t3 - 0.05); lift(cards[2], t3);
    const tEighty = cue("s02c", "@eighty");
    K.pulseNode(tl, gal.body, tEighty, 1.05);
    ravi.pulse(tl, cue("s02c", "@owes"));
    const tFifty = cue("s02c", "@fifty");
    meeraTag.tick(tl, tFifty, 0, 50000, 0.9);
    meeraTag.light(tl, tFifty + 0.7, { hold: 0.8 });
  };
})();
