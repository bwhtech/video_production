// s06 — Two cameras: proof. Split screen — LEFT camera (gold frame) = golden rules, RIGHT camera = the scale (law: golden rules always left, scale always right).
// Each transaction's slip drops on the divider; (T3 only) "which two things changed?" freezes BOTH cameras; then each side writes its own two-line entry;
// the two entries slide to the divider and LOCK (click, gold seal) and the matching lines light in PAIRS (Dr↔Dr blue, then Cr↔Cr orange).
// T3 teaching pace, T5 faster, T7 fastest. After the third lock the three locked entries stack at the divider.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, S = L7.SPLIT, T0 = sc.start;
    const sp = L7.split(svg, tl, { cal: 25, L: 80000, R: 80000 });
    const { world, rig } = sp;

    // ---- left camera: family medallions (the used one lights), lower-left
    const fams = ["personal", "real", "nominal"];
    const MX = [330, 470, 610], MY = 880;
    const meds = fams.map((f, i) => {
      const n = L7.node(world, MX[i], MY); L7.hide(n);
      K.el("circle", { cx: 0, cy: 0, r: 66, fill: "none", stroke: C.gold, "stroke-width": 9, opacity: 0, class: "ring" }, n);
      L7.famMedallion(n, f, 0, 0, 52);
      return { n, ring: n.querySelector(".ring"), f };
    });
    const medOf = (f) => meds[fams.indexOf(f)];
    const lightMed = (f, t) => { const m = medOf(f); tl.to(m.n, { opacity: 1, duration: 0.15 }, t); tl.fromTo(m.ring, { opacity: 0 }, { opacity: 1, duration: 0.12, immediateRender: false }, t); tl.to(m.ring, { opacity: 0, duration: 0.3 }, t + 0.8); K.pulseNode(tl, m.n, t, 1.12); };

    // ---- right camera: jars + tags at their final 3-slot positions (hidden until needed)
    const jCash = L7.sJar(rig, 0, 3, { label: "Cash", contents: "coins", fill: 1, edge: C.dr });
    const jEq = L7.sJar(rig, 1, 3, { label: "Equipment", labelHidden: true, contents: "cart", fill: 0, edge: C.dr, hidden: true });
    const jStock = L7.sJar(rig, 2, 3, { label: "Stock", contents: "leaves", fill: 0, edge: C.dr, hidden: true });
    const tMeera = L7.sTag(rig, 0, 3, { face: "meera" }), tRavi = L7.sTag(rig, 1, 3, { face: "ravi" });
    const tGopal = L7.sTag(rig, 2, 3, { face: "gopal", hidden: true });
    [jCash, tMeera, tRavi].forEach((j) => { j.body.setAttribute("opacity", "0"); });
    rig.pans.L.total.set(tl, T0 - 0.2, 80000); rig.pans.R.total.set(tl, T0 - 0.2, 80000);

    // ---- slips (one per transaction), parked lower-left afterwards
    const art = { cart: (n) => K.cartArt(L7.node(n, 0, -16, 1.25)), milk: (n) => K.medallion(n, 0, -16, 50, "milk"), glass: (n) => { K.tumbler(n, -26, 20, 1.9); K.tumbler(n, 28, 20, 1.9); } };
    const mkSlip = (a, amt) => L7.slip(world, 960, 620, null, amt, { art: art[a], w: 280, h: 210 });
    const slips = [mkSlip("cart", 36000), mkSlip("milk", 8000), mkSlip("glass", 18000)];
    const park = (sl, t) => { tl.to(sl.n, { x: 150 - 960, y: 820 - 620, scale: 0.9, svgOrigin: O, duration: 0.55, ease: "power2.inOut" }, t); };

    // ---- the transactions (left = golden rules with tags, right = the scale's plain lines)
    const mkE = (rowsL, rowsR) => {
      const eL = L7.entry(world, S.LCX, S.ENT_Y, rowsL, { gold: true }), eR = L7.entry(world, S.RCX, S.ENT_Y, rowsR, {});
      const seal = L7.seal(world, S.DIV, S.ENT_Y);
      return { eL, eR, seal };
    };
    const E3 = mkE([{ name: "Equipment", amt: 36000, side: "L", tag: "real_in" }, { name: "Cash", amt: 36000, side: "R", tag: "real_out" }],
                   [{ name: "Equipment", amt: 36000, side: "L" }, { name: "Cash", amt: 36000, side: "R" }]);
    const E5 = mkE([{ name: "Stock", amt: 8000, side: "L", tag: "real_in" }, { name: "Gopal Dairy", amt: 8000, side: "R", tag: "personal_giver" }],
                   [{ name: "Stock", amt: 8000, side: "L" }, { name: "Gopal Dairy", amt: 8000, side: "R" }]);
    const E7 = mkE([{ name: "Cash", amt: 18000, side: "L", tag: "real_in" }, { name: "Sales", amt: 18000, side: "R", tag: "nominal_income" }],
                   [{ name: "Cash", amt: 18000, side: "L" }, { name: "Sales", amt: 18000, side: "R" }]);
    // the locked pair's resting place (stack at the divider, lower)
    const STACK = [850, 935, 1020];
    const stash = (E, k, t) => {
      const y = STACK[k];
      tl.to(E.eL.n, { x: 842 - S.LCX, y: y - S.ENT_Y, scale: 0.28, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
      tl.to(E.eR.n, { x: 1078 - S.RCX, y: y - S.ENT_Y, scale: 0.28, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
      tl.to(E.seal, { y: y - S.ENT_Y, scale: 0.55, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
    };
    const w2 = K.whichTwo(world, { veil: true, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");
    L7.allow(world);

    // ======================================================================================= timeline
    // s06a — "Two cameras again. Golden rules on this side, the scale on that side."
    meds.forEach((m, i) => { L7.drop(tl, m.n, cue("s06a", "@golden") + i * 0.12, { dur: 0.3 }); tl.to(m.n, { opacity: 0.5, duration: 0.2 }, cue("s06a", "@golden") + 0.9 + i * 0.12); });
    rig.enter(tl, cue("s06a", "@scale") - 0.1);
    [jCash, tMeera, tRavi].forEach((j, i) => j.enter(tl, cue("s06a", "@scale") + 0.2 + i * 0.1));
    rig.setTotals(tl, cue("s06a", "@scale") + 0.2, 80000, 80000, { dur: 0.7 });
    K.pulseNode(tl, rig.g, cue("s06a", "@that"), 1.0);

    // ============================== T3 — the cart, ₹36,000 (the "which two things changed?" device)
    L7.drop(tl, slips[0].n, cue("s06b", "@cart") - 0.1, { dur: 0.4 });
    slips[0].tk.to(tl, cue("s06b", "@thirty-six"), 36000, 0.9);
    const tW = cue("s06b", "@which");
    const slots = w2.run(tl, tW, { slots: 2, gap: 2.0, fill: [{ label: "Equipment", delta: 36000, side: "L" }, { label: "Cash", delta: -36000, side: "L" }] });
    const tDing = slots.tDing;
    jEq.enter(tl, tDing - 0.2); jEq.light(tl, tDing, { hold: 1.0 }); jCash.light(tl, tDing, { hold: 1.0 });
    lightMed("real", tDing);
    w2.clear(tl, slots.tEnd + 0.15);
    park(slips[0], slots.tEnd + 0.3);
    // golden rules (left): "the cart comes in, debit Equipment. Cash goes out, credit Cash."
    const tC1 = cue("s06c", "@comes") - 0.15, tC2 = cue("s06c", "@goes") - 0.15;
    const [r31, r32] = E3.eL.rows, [q31, q32] = E3.eR.rows;
    E3.eL.show(tl, tC1 - 0.05); L7.writeRow(tl, r31, tC1, { chipAt: 0.5 }); lightMed("real", tC1 + 0.5);
    L7.writeRow(tl, r32, tC2, { chipAt: 0.5 }); lightMed("real", tC2 + 0.5);
    // the scale (right): the cart sticker lands in the Equipment jar, Cash drops 80,000 → 44,000 on the SAME (left) pan; level
    const tSc = cue("s06c", "@scale");
    jEq.landSticker(tl, tSc + 0.1, { dx: -330, dy: -260, dur: 0.8 }); jEq.tieLabel(tl, tSc + 0.9);
    jCash.fill(tl, tSc + 1.2, 0.5);
    E3.eR.show(tl, cue("s06c", "@grows") - 0.15); L7.writeRow(tl, q31, cue("s06c", "@grows") - 0.1); L7.writeRow(tl, q32, cue("s06c", "@shrinks") - 0.15);
    rig.levelFlash(tl, cue("s06c", "@shrinks") + 0.3);
    // LOCK
    const k3 = L7.lock(tl, E3.eL, E3.eR, segEnd("s06c") + 0.05, { seal: E3.seal });
    stash(E3, 0, k3.tCr + 0.55);

    // ============================== T5 — Gopal's stock on credit, ₹8,000 (faster)
    tl.to(slips[0].n, { autoAlpha: 0, duration: 0.2 }, segStart("s06d") - 0.05);
    L7.drop(tl, slips[1].n, cue("s06d", "@gopal's") - 0.1, { dur: 0.35 });
    slips[1].tk.to(tl, cue("s06d", "@eight"), 8000, 0.7);
    park(slips[1], cue("s06d", "@stock", 1) + 0.9);
    const [r51, r52] = E5.eL.rows, [q51, q52] = E5.eR.rows;
    E5.eL.show(tl, cue("s06d", "@comes") - 0.15); L7.writeRow(tl, r51, cue("s06d", "@comes") - 0.1, { dur: 0.5, chipAt: 0.45 }); lightMed("real", cue("s06d", "@comes") + 0.3);
    L7.writeRow(tl, r52, cue("s06d", "@giver") - 0.5, { dur: 0.5, chipAt: 0.45 }); lightMed("personal", cue("s06d", "@giver") - 0.1);
    jStock.enter(tl, cue("s06d", "@asset") - 0.1); jStock.fill(tl, cue("s06d", "@asset") + 0.1, 1.0);
    rig.setTotals(tl, cue("s06d", "@asset") + 0.2, 88000, undefined, { dur: 0.6 });
    E5.eR.show(tl, cue("s06d", "@asset") - 0.1); L7.writeRow(tl, q51, cue("s06d", "@asset") - 0.05, { dur: 0.5 });
    tGopal.enter(tl, cue("s06d", "@liability") - 0.1); rig.setTotals(tl, cue("s06d", "@liability") + 0.1, undefined, 88000, { dur: 0.6 });
    L7.writeRow(tl, q52, cue("s06d", "@liability") - 0.05, { dur: 0.5 });
    rig.levelFlash(tl, cue("s06d", "@up", 2) + 0.2);
    const k5 = L7.lock(tl, E5.eL, E5.eR, segEnd("s06d") + 0.05, { seal: E5.seal });
    stash(E5, 1, k5.tCr + 0.55);

    // ============================== T7 — cash sales, ₹18,000 (fastest)
    tl.to(slips[1].n, { autoAlpha: 0, duration: 0.2 }, segStart("s06e") - 0.05);
    L7.drop(tl, slips[2].n, cue("s06e", "@cash", 1) - 0.1, { dur: 0.35 });
    slips[2].tk.to(tl, cue("s06e", "@eighteen"), 18000, 0.6);
    park(slips[2], cue("s06e", "@comes") - 0.3);
    const [r71, r72] = E7.eL.rows, [q71, q72] = E7.eR.rows;
    E7.eL.show(tl, cue("s06e", "@comes") - 0.25); L7.writeRow(tl, r71, cue("s06e", "@comes") - 0.2, { dur: 0.45, chipAt: 0.35 }); lightMed("real", cue("s06e", "@comes") + 0.1);
    L7.writeRow(tl, r72, cue("s06e", "@income") - 0.5, { dur: 0.45, chipAt: 0.35 }); lightMed("nominal", cue("s06e", "@income") - 0.2);
    jCash.fill(tl, cue("s06e", "@asset") + 0.1, 1.0);
    rig.setTotals(tl, cue("s06e", "@asset") + 0.2, 106000, undefined, { dur: 0.6 });
    E7.eR.show(tl, cue("s06e", "@asset") - 0.1); L7.writeRow(tl, q71, cue("s06e", "@asset") - 0.05, { dur: 0.45 });
    K.pulseNode(tl, tMeera.body, cue("s06e", "@equity"), 1.12);
    rig.setTotals(tl, cue("s06e", "@equity") + 0.1, undefined, 106000, { dur: 0.6 });
    L7.writeRow(tl, q72, cue("s06e", "@equity") - 0.05, { dur: 0.45 });
    rig.levelFlash(tl, cue("s06e", "@equity") + 0.5);
    const k7 = L7.lock(tl, E7.eL, E7.eR, cue("s06e", "@every") + 0.1, { seal: E7.seal });
    stash(E7, 2, k7.tCr + 0.55);
    // the three seals stand in a stack; the top one swells (leaving → s07)
    const tEnd = sc.end - 0.9;
    tl.to(E3.seal, { scale: 0.55, duration: 0.01 }, tEnd - 0.05);
  };
})();
