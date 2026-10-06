// s04 — Rent day, frozen: "which two things changed?" (WORKED). First frame = the rent-day street (default torn-paper wipe in from s02).
// The HUD scale grows into the hero scale; the device runs (veil + 2 slots + 2.0 s tick-tock); slot 1 = Cash −₹5,000; Ravi's and Gopal's
// tags are ruled out (`=`); Meera's tag lights, unfolds into the Equity card (Capital | ?), the rent slip drops into the `?`; the
// scale settles and holds level. Chip: Expense.
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    const cam = K.g(svg, { id: "s04-cam" });
    const calG = K.g(svg, {});
    const R = L4.preRent(cam, K, tl, T0, { calParent: calG, });
    const { meera: m, landlord: ll, hud, P, street, cal } = R;
    const eq = P.eq;
    const RX = 960 + 380;                           // right pan hang x (world)
    const flashRing = (tl2, node, t, hold = 1.0) => { tl2.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t); tl2.to(node, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold); };

    // ---- extras living on the pans (they follow the pans when the beam tips)
    const Rg = hud.pans.R.g;
    const mkEqTag = (x) => {                         // the small `=` stamp-tag (unchanged)
      const n = L4.node(Rg, x, -88);
      K.paper(K.shadow(n.inner, 1), K.cutRect(-36, -30, 72, 60, 1.4, 18), C.cream);
      K.text(n.inner, 0, 3, "=", { size: 54, weight: 800, color: C.ink });
      n.outer.setAttribute("opacity", "0");
      return n;
    };
    const eqRavi = mkEqTag(-130), eqGopal = mkEqTag(130);
    const meeraRing = K.el("path", { d: K.cutRect(-90, -142, 180, 152, 0.8, 30), fill: "none", stroke: C.gold, "stroke-width": 9, opacity: 0 }, Rg);
    // llBundle: the bundle in the landlord's open palm after the hand-over
    const llBundle = K.g(ll.handAnchor("L"), {}); K.bundle(llBundle, 0, 4, 0.8, 12); llBundle.setAttribute("opacity", "0");

    // ---- Khata, the judge, at the scale's foot (right)
    const khata = K.khataRig(cam, 1700, 1000, 0.5, { expr: "awake" });
    khata.g.setAttribute("opacity", "0");

    // ---- the Expense chip (lands next to the rent slip)
    const expChip = L4.chip(cam, 1672, 436, "Expense", { bg: C.coral, size: 50, rot: -3 });
    expChip.outer.setAttribute("opacity", "0");

    // ---- the device (above everything): created last so the veil sits on top
    const dev = K.whichTwo(svg, { veil: true, x: 960, y: 188 });

    // ================================================================================== timeline
    // 1 — the frozen still (rent day, just before the rent leaves)
    m.blinks(tl, T0 + 1.5, sc.end, 3.4);
    ll.jingle(tl, T0 + 1.0);
    const tFreeze = cue("s04a", "@freeze"), tWhich = cue("s04a", "@which");
    // 2 — "Freeze." → the HUD grows into the hero scale; the street shrinks away to the bottom-left
    const tExp = tFreeze + 0.1;
    L4.hudExpand(hud, R.lay, tl, tExp, 1.0);
    tl.to(street, { x: -160, y: 500, scale: 0.5, duration: 1.0, ease: "power2.inOut" }, tExp);
    tl.fromTo(khata.g, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out", immediateRender: false }, tExp + 0.8);
    khata.blinks && khata.blink(tl, tExp + 2.0);
    hud.equation(tl, tExp + 0.95, "₹88,000 = ₹38,000 + ₹50,000");

    // 3 — the device: veil, two dashed slots, 2.0 s dead still
    const slots = dev.run(tl, tWhich - 0.1, { slots: 2, gap: 2.0, fill: [] });
    const tLift = cue("s04b", "@first") + 0.1;
    tl.to(dev.veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, tLift);

    // 4 — "Cash went down by five thousand": replay — the bundle leaves, the beam tips, slot 1 fills
    const tCash = cue("s04b", "@cash");
    const tPass = tCash + 0.2;
    m.arm(tl, tPass - 0.05, "R", 76, 14, 0.2);
    tl.set(R.bundle, { opacity: 0 }, tPass + 0.2);
    tl.set(llBundle, { opacity: 1 }, tPass + 0.2);
    ll.arm(tl, tPass + 0.9, "L", 20, 60, 0.35);
    tl.set(llBundle, { opacity: 0 }, tPass + 1.3);
    m.arm(tl, tPass + 0.6, "R", 12, 8, 0.4);
    P.cash.tick(tl, tPass + 0.3, 38000, 33000, 0.6);
    hud.setTotals(tl, tPass + 0.3, 83000, undefined, { dur: 0.7 });
    hud.tilt(tl, tPass + 0.5, -6, { dur: 0.9, ease: "power2.out" });
    dev.fillSlot(tl, tPass + 1.0, 0, { label: "Cash", delta: -5000, side: "L" });
    P.cash.light(tl, tPass + 1.1);

    // 5 — "the second?" — Ravi's and Gopal's tags are ruled out
    const tRavi = cue("s04b", "@ravi"), tGopal = cue("s04b", "@gopal");
    const rule = (tag, eqt, t) => {
      L4.show(tl, eqt.outer, t); K.dropIn(tl, eqt.inner, t, { dur: 0.3 });
      tl.to(tag.body, { opacity: 0.4, duration: 0.35 }, t + 0.25);
    };
    rule(P.ravi, eqRavi, tRavi + 0.1); rule(P.gopal, eqGopal, tGopal + 0.1);
    khata.look(tl, tRavi, -6, 0); khata.look(tl, tGopal, -3, -2);

    // 6 — "Meera's own share. Equity." — her tag lights
    const tOwn = cue("s04b", "@meera's");
    flashRing(tl, meeraRing, tOwn, 1.2);
    khata.look(tl, tOwn, 4, -4); khata.arm(tl, tOwn, "R", 70, 0.3);
    m.expr(tl, tOwn, "thinking");

    // 7 — "Let's unfold Meera's tag…" — camera pushes into the right pan; the tag opens into the Equity card
    const tUnf = cue("s04c", "@unfold"), tCard = cue("s04c", "@card");
    const tPockets = cue("s04c", "@pockets"), tCap = cue("s04c", "@capital"), tEmpty = cue("s04c", "@empty");
    tl.fromTo(cam, { scale: 1, svgOrigin: `${RX} 700` }, { scale: 1.08, svgOrigin: `${RX} 700`, duration: 2.4, ease: "power2.inOut", immediateRender: false }, tUnf - 0.4);
    // the ruled-out tags (and their `=` chips) step aside, dimmed, to make room for the card
    [[P.ravi, eqRavi, 380], [P.gopal, eqGopal, 255]].forEach(([tag, chip, dx]) => { tl.to(tag.body, { x: dx / 0.58, duration: 0.5, ease: "power2.inOut" }, tUnf + 0.1); tl.to(chip.inner, { x: dx, duration: 0.5, ease: "power2.inOut" }, tUnf + 0.1); });
    K.liftOff(tl, eq.tag, tUnf + 0.2, { dur: 0.22 });
    tl.fromTo(eq.card, { autoAlpha: 0, scaleX: 0.4, scaleY: 0.5, svgOrigin: O }, { autoAlpha: 1, scaleX: 1, scaleY: 1, svgOrigin: O, duration: 0.55, ease: "power3.out", immediateRender: false }, tUnf + 0.4);
    [0, 1].forEach((i) => K.dropIn(tl, eq.list[i].wrap, tPockets + i * 0.14, { dur: 0.34 }));
    eq.light(tl, tCap + 0.15, "Capital", { hold: 0.7 });
    eq.light(tl, tEmpty, "Profit", { hold: 1.1 });
    // "The rent comes out of that new pocket" — the rent slip drops in (the pocket still reads `?`)
    const tRentW = cue("s04c", "@rent");
    eq.slip(tl, tRentW + 0.1, "Profit", -5000, { icon: "key", from: [0, -200] });
    // "it reads minus five thousand" — slot 2 fills (Equity −₹5,000)
    const tMinus = cue("s04c", "@minus");
    dev.fillSlot(tl, tMinus - 0.1, 1, { label: "Equity", delta: -5000, side: "R" });
    eq.light(tl, tMinus, "Profit", { hold: 0.8 });

    // 8 — the equation lands, the scale settles (≥ 1.5 s level hold), chip Expense
    const tEqn = cue("s04d", "@eighty-three"), tScale = cue("s04d", "@scale");
    hud.equation(tl, tEqn, "₹83,000 = ₹38,000 + ₹45,000");
    tl.to(cam, { scale: 1, svgOrigin: `${RX} 700`, duration: 1.0, ease: "power2.inOut" }, tEqn - 0.1);
    hud.setTotals(tl, tScale - 0.1, undefined, 83000, { dur: 0.8 });
    hud.settle(tl, tScale, { dur: 0.9, hold: 1.5 });
    hud.levelFlash(tl, tScale + 1.0);
    hud.pulseTotal(tl, tScale + 0.95, "both");
    hud.eqPulse(tl, tScale + 1.0);
    khata.expr(tl, tScale + 0.5, "happy");
    const tExpense = cue("s04d", "@expense");
    L4.show(tl, expChip.outer, tExpense); K.dropIn(tl, expChip.inner, tExpense, { dur: 0.34 });
    eq.pulse(tl, cue("s04d", "@shrinks"));
  };
})();
