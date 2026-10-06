// s09 — Worked → faded → solo (T2, T6, T12). Same split screen as s06 (golden rules LEFT, scale RIGHT), same lock choreography.
//   worked  T2  Khata (at the divider) fills both sides: Ravi Mama lends ₹30,000 → Dr Cash [box ↓] / Cr Loan from Ravi Mama [user giver]; Cash ↑, his tag ↑.
//   faded   T6  Meera: rent ₹5,000 → `Rent` [receipt expense] is written; the second line's tag chip is EMPTY (2.4 s gap, she weighs two chips) → she picks [box ↑].
//   solo    T12 the viewer: Apr 25 · Infotech pays ₹4,000 by UPI — Bank / Infotech lines given, BOTH tag chips empty; 3.2 s countdown ring → [user receiver] + [user giver]; "Both Personal!"
(function () {
  window.SCENES.s09 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, S = L7.SPLIT, T0 = sc.start;
    const sp = L7.split(svg, tl, { cal: 25, L: 50000, R: 50000 });
    const { world, rig } = sp;
    const CHIP_X = L7.ENT_W / 2 - L7.CHIP_W / 2 - 32;          // chip x inside a row (row-local)

    // ---- cast: Khata at the divider, Ravi Mama (T2), Meera (T6)
    const khata = K.khataRig(world, 960, 1040, 0.42, { expr: "awake" });
    const ravi = K.raviMama(world, 380, 1040, 0.72, { expr: "proud" });
    const bundle = L7.node(world, 490, 790); L7.hide(bundle); K.bundle(bundle, 0, 0, 0.8, -8);
    const meera = K.meera(world, 600, 1040, 0.72, { expr: "neutral" });
    [ravi.g, meera.g].forEach((g) => g.setAttribute("opacity", "0"));

    // ---- the scale: left jars in 3 slots (Cash / Rent→Bank / Infotech), right tags in 2 slots (Meera / Ravi)
    const jCash = L7.sJar(rig, 0, 3, { label: "Cash", contents: "coins", fill: 0.5, edge: C.dr });
    const jRent = L7.sJar(rig, 1, 3, { label: "Rent", icon: "key", contents: "sticker", fill: 0, edge: C.dr, hidden: true });
    const jBank = L7.sJar(rig, 1, 3, { label: "Bank", contents: "notes", fill: 0.6, edge: C.dr, hidden: true });
    const jInfo = L7.sJar(rig, 2, 3, { label: "Infotech", contents: "notes", fill: 0.4, edge: C.dr, hidden: true });
    const tMeera = L7.sTag(rig, 0, 2, { face: "meera" }), tRavi = L7.sTag(rig, 1, 2, { face: "ravi", hidden: true });
    [jCash, tMeera].forEach((j) => j.body.setAttribute("opacity", "0"));
    rig.pans.L.total.set(tl, T0 - 0.2, 50000); rig.pans.R.total.set(tl, T0 - 0.2, 50000);

    // ---- slips
    const art = {
      loan: (n) => K.medallion(n, 0, -16, 50, "hand-coins"),
      rent: (n) => K.medallion(n, 0, -16, 50, "key"),
      upi: (n) => { K.medallion(n, -50, -22, 40, "smartphone"); const f = L7.node(n, 52, -22); K.tex(K.shadow(f, 1), K.cutEll(0, 0, 46, 46, 0.8), "pat-paper"); K.faceArt(f, "infotech", 40); },
    };
    const mkSlip = (a, amt, o = {}) => L7.slip(world, 960, 620, null, amt, { art: art[a], w: 290, h: 210, ...o });
    const slips = [mkSlip("loan", 30000), mkSlip("rent", 5000), mkSlip("upi", 4000, { tab: "Apr 25", tabCol: C.saffron })];
    const park = (sl, t) => tl.to(sl.n, { x: 140 - 960, y: 820 - 620, scale: 0.9, svgOrigin: O, duration: 0.55, ease: "power2.inOut" }, t);

    // ---- entries
    const mkE = (rowsL, rowsR) => ({ eL: L7.entry(world, S.LCX, S.ENT_Y, rowsL, { gold: true, twoLine: true }), eR: L7.entry(world, S.RCX, S.ENT_Y, rowsR, {}), seal: L7.seal(world, S.DIV, S.ENT_Y) });
    const E2 = mkE([{ name: "Cash", amt: 30000, side: "L", tag: "real_in" }, { name: "Loan from Ravi Mama", amt: 30000, side: "R", tag: "personal_giver" }],
                   [{ name: "Cash", amt: 30000, side: "L" }, { name: "Loan from Ravi Mama", amt: 30000, side: "R" }]);
    const E6 = mkE([{ name: "Rent", amt: 5000, side: "L", tag: "nominal_expense" }, { name: "Cash", amt: 5000, side: "R" }],
                   [{ name: "Rent", amt: 5000, side: "L" }, { name: "Cash", amt: 5000, side: "R" }]);
    const E12 = mkE([{ name: "Bank", amt: 4000, side: "L" }, { name: "Infotech", amt: 4000, side: "R" }],
                    [{ name: "Bank", amt: 4000, side: "L" }, { name: "Infotech", amt: 4000, side: "R" }]);
    // empty tag slots (dashed) + the real chips inside the rows (so they travel with the card on lock)
    const slotOf = (row, key) => ({ empty: L7.emptyChip(row.n, CHIP_X, 0), chip: L7.tagChip(row.n, CHIP_X, 0, key) });
    const s62 = slotOf(E6.eL.rows[1], "real_out");
    const s121 = slotOf(E12.eL.rows[0], "personal_receiver"), s122 = slotOf(E12.eL.rows[1], "personal_giver");
    // Meera's two offered chips (world coordinates) — the wrong one fades, the right one flies to the slot
    const offA = L7.tagChip(world, 360, 640, "personal_receiver"), offB = L7.tagChip(world, 360, 740, "real_out");
    const STACK = [850, 935, 1020];
    const stash = (E, k, t) => {
      const y = STACK[k];
      tl.to(E.eL.n, { x: 842 - S.LCX, y: y - S.ENT_Y, scale: 0.28, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
      tl.to(E.eR.n, { x: 1078 - S.RCX, y: y - S.ENT_Y, scale: 0.28, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
      tl.to(E.seal, { y: y - S.ENT_Y, scale: 0.55, svgOrigin: O, duration: 0.5, ease: "power2.inOut" }, t);
    };
    // countdown ring (solo)
    const pm = K.pauseMedallion(world, 520, 700, 0.5, { hidden: true });
    L7.allow(world);

    // ======================================================================================= timeline
    const fade = (n, t, to) => tl.to(n, { opacity: to, duration: 0.3, ease: "power1.inOut" }, t);
    khata.blink(tl, T0 + 2); khata.blink(tl, T0 + 22); khata.blink(tl, T0 + 48); khata.blink(tl, T0 + 66);
    rig.enter(tl, T0 + 0.05);
    jCash.enter(tl, T0 + 0.2); tMeera.enter(tl, T0 + 0.3); rig.setTotals(tl, T0 + 0.3, 50000, 50000, { dur: 0.1 });
    // ============================== WORKED — T2 (Khata)
    khata.hop(tl, cue("s09a", "@khata"), { height: 36 }).expr(tl, cue("s09a", "@khata"), "happy");
    fade(ravi.g, cue("s09a", "@ravi") - 0.1, 1);
    ravi.arm(tl, cue("s09a", "@lends") - 0.3, "R", 70, 30, 0.3);
    L7.drop(tl, bundle, cue("s09a", "@lends") - 0.2, { dur: 0.25 });
    L7.drop(tl, slips[0].n, cue("s09a", "@thirty") - 0.1, { dur: 0.4 });
    slips[0].tk.to(tl, cue("s09a", "@thirty"), 30000, 0.8);
    park(slips[0], cue("s09b", "@cash", 1) - 0.1);
    // Ravi hands the bundle across (arcs over the divider into the Cash jar)
    const tHand = cue("s09b", "@comes") - 0.1;
    tl.to(bundle, { x: 1140 - 490, duration: 0.8, ease: "power1.inOut" }, tHand);
    tl.to(bundle, { y: -170, duration: 0.4, ease: "power2.out" }, tHand);
    tl.to(bundle, { y: 20, duration: 0.4, ease: "power2.in" }, tHand + 0.4);
    tl.to(bundle, { autoAlpha: 0, scale: 0.5, svgOrigin: O, duration: 0.15 }, tHand + 0.85);
    const [r21, r22] = E2.eL.rows, [q21, q22] = E2.eR.rows;
    E2.eL.show(tl, cue("s09b", "@comes") - 0.2);
    L7.writeRow(tl, r21, cue("s09b", "@comes") - 0.15, { chipAt: 0.9 });
    L7.writeRow(tl, r22, cue("s09b", "@giver") - 0.6, { chipAt: 0.9 });
    ravi.arm(tl, tHand + 1.0, "R", 12, 8, 0.3);
    khata.expr(tl, cue("s09b", "@debit"), "wow"); khata.expr(tl, cue("s09b", "@credit"), "happy");
    // "And the scale? An asset up, a liability up. Match."
    const tAs = cue("s09b", "@asset");
    jCash.fill(tl, tAs - 0.1, 1.0); rig.setTotals(tl, tAs, 80000, undefined, { dur: 0.6 });
    E2.eR.show(tl, tAs - 0.2); L7.writeRow(tl, q21, tAs - 0.15, { dur: 0.5 });
    tRavi.enter(tl, cue("s09b", "@liability") - 0.2); rig.setTotals(tl, cue("s09b", "@liability"), undefined, 80000, { dur: 0.6 });
    L7.writeRow(tl, q22, cue("s09b", "@liability") - 0.15, { dur: 0.5 });
    rig.levelFlash(tl, cue("s09b", "@match") - 0.2);
    const k2 = L7.lock(tl, E2.eL, E2.eR, segEnd("s09b") + 0.05, { seal: E2.seal });
    stash(E2, 0, k2.tCr + 0.55);
    fade(ravi.g, k2.tCr + 0.4, 0); tl.to(slips[0].n, { autoAlpha: 0, duration: 0.2 }, segStart("s09c") - 0.1);

    // ============================== FADED — T6 (Meera chooses)
    fade(meera.g, cue("s09c", "@meera's") - 0.1, 1);
    L7.drop(tl, slips[1].n, cue("s09c", "@rent", 1) - 0.1, { dur: 0.4 });
    slips[1].tk.to(tl, cue("s09c", "@five"), 5000, 0.7);
    park(slips[1], cue("s09c", "@nominal") - 0.5);
    const [r61, r62] = E6.eL.rows, [q61, q62] = E6.eR.rows;
    E6.eL.show(tl, cue("s09c", "@expense") - 0.25);
    L7.writeRow(tl, r61, cue("s09c", "@expense") - 0.2, { chipAt: 1.0 });
    const tOther = cue("s09c", "@other");
    L7.writeRow(tl, r62, tOther - 0.2, { chip: false });
    L7.drop(tl, s62.empty.n, tOther + 0.4, { dur: 0.3 });
    meera.expr(tl, tOther, "thinking").look(tl, tOther, -6, 4);
    // the two chips are offered (then dead still through the 2.4 s gap — only her eyes move)
    const tWhich = cue("s09c", "@which", 1);
    L7.drop(tl, offA.n, tWhich - 0.1, { dur: 0.3 }); L7.drop(tl, offB.n, tWhich + 0.1, { dur: 0.3 });
    meera.look(tl, tWhich + 0.5, -8, -4); meera.look(tl, tWhich + 1.2, -8, 8); meera.look(tl, segEnd("s09c") + 0.4, -8, -4);
    // "Real, and it goes out." — she picks [box ↑]; it snaps into the empty slot; the other chip fades
    const tPick = cue("s09d", "@real");
    meera.expr(tl, tPick - 0.1, "happy").arm(tl, tPick, "R", 70, 50, 0.25);
    tl.to(offA.n, { autoAlpha: 0, duration: 0.25 }, tPick);
    tl.to(offB.n, { x: 748 - 360, y: 401 - 740, duration: 0.55, ease: "power2.inOut" }, tPick + 0.1);
    tl.set(offB.n, { autoAlpha: 0 }, tPick + 0.65);
    tl.set(s62.empty.n, { autoAlpha: 0 }, tPick + 0.65);
    L7.drop(tl, s62.chip.n, tPick + 0.65, { dur: 0.2 });
    meera.arm(tl, tPick + 0.8, "R", 12, 8, 0.3);
    // scale: Rent jar ↑ (key sticker), Cash ↓ — both on the left pan; Cash ticks 80,000 → 75,000 inside the total (a swap)
    const tCr6 = cue("s09d", "@credit");
    jRent.enter(tl, tCr6 - 0.9); jRent.landSticker(tl, tCr6 - 0.7, { dx: 330, dy: -240, dur: 0.7 });
    jCash.fill(tl, tCr6, 0.5);
    E6.eR.show(tl, tCr6 - 0.4); L7.writeRow(tl, q61, tCr6 - 0.35, { dur: 0.5 }); L7.writeRow(tl, q62, tCr6 + 0.1, { dur: 0.5 });
    rig.levelFlash(tl, tCr6 + 0.6);
    const k6 = L7.lock(tl, E6.eL, E6.eR, segEnd("s09d") + 0.05, { seal: E6.seal });
    stash(E6, 1, k6.tCr + 0.55);
    fade(meera.g, k6.tCr + 0.4, 0); tl.to(slips[1].n, { autoAlpha: 0, duration: 0.2 }, segStart("s09e") - 0.05);
    jRent.exit(tl, segStart("s09e") - 0.3);

    // ============================== SOLO — T12 (the viewer tags both lines)
    L7.drop(tl, slips[2].n, cue("s09e", "@infotech") - 0.1, { dur: 0.4 });
    slips[2].tk.to(tl, cue("s09e", "@four"), 4000, 0.7);
    park(slips[2], cue("s09e", "@debit") - 0.5);
    jBank.enter(tl, cue("s09e", "@debit") - 0.4); jInfo.enter(tl, cue("s09e", "@debit") - 0.3);
    const [r121, r122] = E12.eL.rows, [q121, q122] = E12.eR.rows;
    E12.eL.show(tl, cue("s09e", "@debit") - 0.15);
    L7.writeRow(tl, r121, cue("s09e", "@debit") - 0.1, { chip: false });
    L7.writeRow(tl, r122, cue("s09e", "@credit") - 0.1, { chip: false });
    L7.drop(tl, s121.empty.n, cue("s09e", "@debit") + 0.4, { dur: 0.3 }); L7.drop(tl, s122.empty.n, cue("s09e", "@credit") + 0.4, { dur: 0.3 });
    // "Now tag both lines." — the 3.2 s countdown ring (the checkpoint-pause object, small), everything else still
    pm.enter(tl, cue("s09e", "@tag") - 0.2); pm.countdown(tl, segEnd("s09e"), { dur: 3.2 });
    const tAns = segStart("s09f") - 0.1;
    L7.lift(tl, pm.g, tAns);
    // the answers snap on
    const tRecv = cue("s09f", "@receiver");
    tl.set(s121.empty.n, { autoAlpha: 0 }, tRecv); L7.drop(tl, s121.chip.n, tRecv, { dur: 0.25 });
    const tGiv = cue("s09f", "@giver");
    tl.set(s122.empty.n, { autoAlpha: 0 }, tGiv); L7.drop(tl, s122.chip.n, tGiv, { dur: 0.25 });
    // "Both Personal!" — the two `user` medallions pulse together once
    const tBoth = cue("s09f", "@personal", 3);
    [s121.chip.n, s122.chip.n].forEach((n) => { tl.to(n, { scale: 1.1, svgOrigin: O, duration: 0.16, ease: "power2.out" }, tBoth); tl.to(n, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, tBoth + 0.16); });
    khata.hop(tl, tBoth, { height: 40 }).expr(tl, tBoth, "wow");
    // scale agrees: Bank ↑, Infotech ↓ (both on the left pan; level — a swap on the left)
    const tG = cue("s09f", "@grows"), tS = cue("s09f", "@shrinks");
    jBank.fill(tl, tG - 0.1, 1.0); jInfo.fill(tl, tS - 0.1, 0.0);
    E12.eR.show(tl, tG - 0.3); L7.writeRow(tl, q121, tG - 0.25, { dur: 0.5 }); L7.writeRow(tl, q122, tS - 0.2, { dur: 0.5 });
    rig.levelFlash(tl, cue("s09f", "@swap") - 0.2);
    L7.lock(tl, E12.eL, E12.eR, cue("s09f", "@swap") + 0.1, { seal: E12.seal });
  };
})();
