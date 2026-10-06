// s03 — The scale is born. L2's bar pair ghosts in ("what you have = what you owe + what's yours"), then the taraazu drops in.
// T1 (Meera puts in ₹50,000) and T2 (Ravi Mama lends ₹30,000) are replayed: BOTH pans grow at the same moment → level.
//   80,000 = 30,000 + 50,000
(function () {
  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", B = L3.BIG3;
    const cam = K.g(svg, {});
    L3.stage(K, cam, C.teal, 880);
    const cal = L3.cal(K, svg, 2);

    // L2's bar pair (callback) — gone before the scale arrives
    const bars = K.barPair(cam, 960, 780, 0.9, { max: 100000, hidden: true });

    // the scale (hidden until "Meet the taraazu")
    const rig = K.scaleRig(cam, B.x, B.y, B.s, { hidden: true, L: 0, R: 0 });
    const cash = K.jarRig(rig.pans.L.g, 0, 0, L3.JAR_S[1], { label: "Cash", contents: "coins", amount: 0, fill: 0, edge: C.dr, hidden: true });
    const meeraTag = K.claimTag(rig.pans.R.g, 0, 0, L3.TAG_S[2], { face: "meera", amount: 0, size: 54, hidden: true });
    const raviTag = K.claimTag(rig.pans.R.g, 68, 0, L3.TAG_S[2], { face: "ravi", amount: 0, size: 54, hidden: true });
    // the ₹30,000 bundle that drops into the galla
    const bundlePos = L3.node(K, cam, B.x - 380 * B.s, 150); K.bundle(bundlePos, 0, 0, 1.0, -6); L3.hide(bundlePos);

    // ======================================================================================= timeline
    const T0 = sc.start;
    // slow push (5 %) across the whole scene — scale + wall move together; calendar stays put
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 640" }, { scale: 1.03, svgOrigin: "960 640", duration: sc.end - T0, ease: "none" }, T0);

    // s03a "What you have equals what you owe, plus what's yours" — the bar pair ghosts in for a beat
    const tWhat = cue("s03a", "@what");
    bars.enter(tl, tWhat);
    bars.grow(tl, tWhat + 0.2, 80000, [30000, 50000], { dur: 0.9 });
    bars.exit(tl, cue("s03a", "@meet") - 0.1);
    // "Meet the taraazu" — the scale drops in and gives one soft beam settle (no swing)
    const tMeet = cue("s03a", "@meet");
    rig.enter(tl, tMeet);
    rig.tilt(tl, tMeet, 2.4, { dur: 0.01 });
    rig.settle(tl, tMeet + 0.15, { dur: 0.85, hold: 0.5 });
    // "On the left pan go the assets" — the left pan tints blue, the label drops
    rig.tint(tl, cue("s03a", "@left"), "L");
    rig.labelPan(tl, cue("s03a", "@assets"), "L", ["Assets"]);
    // "On the right pan go liabilities and equity" — right tint, then the two labels
    rig.tint(tl, cue("s03a", "@right"), "R");
    rig.labelPan(tl, cue("s03a", "@liabilities"), "R", [{ text: "Liabilities", value: 0 }, { text: "Equity", value: 0 }], { stagger: 0.55 });

    // s03b T1 — Meera puts in fifty thousand: the galla on the left AND her equity tag on the right, together
    const tPuts = cue("s03b", "@puts");
    cash.enter(tl, tPuts); cash.fill(tl, tPuts + 0.05, 0.6); cash.tick(tl, tPuts + 0.1, 0, 50000, 0.8);
    meeraTag.enter(tl, tPuts + 0.08); meeraTag.tick(tl, tPuts + 0.15, 0, 50000, 0.8);
    rig.setTotals(tl, tPuts + 0.1, 50000, 50000, { dur: 0.8 });
    rig.pans.R.labels[1].ticker.to(tl, tPuts + 0.1, 50000, 0.8);          // the Equity sub-total counts with the tag
    // "Level." — the thin level line flashes once; equation strip appears
    const tLevel = cue("s03b", "@level");
    rig.levelFlash(tl, tLevel);
    rig.equation(tl, tLevel + 0.05, "50,000 = 0 + 50,000");
    // T2 — Ravi Mama lends thirty thousand: the ₹30,000 drops into the galla ("the left grows to eighty thousand" → the beam dips left),
    //      then his tag lands on the right ("his loan lands on the right") and the beam settles level.
    const tRavi = cue("s03b", "@lends"), tEighty = cue("s03b", "@eighty"), tLands = cue("s03b", "@lands");
    L3.drop(tl, K, bundlePos, tRavi - 0.15, { from: 1.12 });
    tl.to(bundlePos, { y: 185, duration: 0.5, ease: "power2.in" }, tRavi + 0.05);
    tl.to(bundlePos, { autoAlpha: 0, duration: 0.1 }, tRavi + 0.52);
    cash.fill(tl, tRavi + 0.5, 1.0); cash.tick(tl, tEighty, 50000, 80000, 0.8);
    rig.setTotals(tl, tEighty, 80000, undefined, { dur: 0.8 });
    rig.tilt(tl, tEighty + 0.1, 3.5, { dur: 0.8 });
    tl.to(meeraTag.body, { x: -(68 / L3.TAG_S[2]), duration: 0.4, ease: "power2.inOut" }, tLands - 0.3);
    raviTag.enter(tl, tLands); raviTag.tick(tl, tLands + 0.05, 0, 30000, 0.8);
    rig.setTotals(tl, tLands + 0.1, undefined, 80000, { dur: 0.8 });
    rig.pans.R.labels[0].ticker.to(tl, tLands + 0.1, 30000, 0.8);
    rig.settle(tl, tLands + 0.6, { dur: 0.9, hold: 1.5 });
    // "Level again." — flash + the strip counts to its final reading
    const tAgain = cue("s03b", "@again");
    rig.levelFlash(tl, tAgain);
    rig.equation(tl, tAgain + 0.05, "80,000 = 30,000 + 50,000");
    // "This is the accounting equation." — 0.5 s stillness (pause), the strip lifts 1.05× and settles
    rig.eqPulse(tl, cue("s03b", "@accounting") - 0.1);
    // "Assets equal liabilities plus equity" — the three labels light in turn (no new text)
    K.pulseNode(tl, rig.pans.L.labels[0].g, cue("s03b", "@assets"), 1.07);
    K.pulseNode(tl, rig.pans.R.labels[0].g, cue("s03b", "@liabilities"), 1.07);
    K.pulseNode(tl, rig.pans.R.labels[1].g, cue("s03b", "@equity", 2), 1.07);
  };
})();
