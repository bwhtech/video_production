// s05 — Three rules, translated. Three gold-edged rule cards (family medallion + two icon-first tag chips each — the spec L8 reuses).
// The active card sits centre-left (the other two rest as dimmed thumbnails at the far left); its translation plays on the scale at the right:
//   Real (box)      cart sticker lands on the LEFT pan → blue Dr under it                       → "Same thing"
//   Personal (user) Ravi Mama's loan: his tag grows on the RIGHT pan → orange Cr; Gopal receives coins: his tag shrinks, blue Dr under the left pan
//   Nominal (receipt) Expenses jar on the left, revenue tag on the right, `A + Exp = L + Cap + Rev` strip beneath  → "you know this already"
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const khata = K.khataRig(svg, 1730, 380, 0.5, { expr: "awake" });

    // ---- the scale (right) — empty, no totals, no equation strip until Nominal
    const SX = 1440, SY = 935, SS = 0.78;
    const rig = K.scaleRig(svg, SX, SY, SS, { tint: true, L: 0, R: 0, totals: false, equation: false, hidden: true });
    const pChip = (side, txt, col) => {
      const n = L7.node(rig.pans[side].hang, 0, 392); L7.hide(n);
      K.paper(K.shadow(n, 1), K.cutRect(-92, -48, 184, 96, 1.6, 20), col);
      K.text(n, 0, 4, txt, { size: 72, weight: 800, color: K.onColor(col) });
      return n;
    };
    const drL = pChip("L", "Dr", C.dr), crR = pChip("R", "Cr", C.cr), drL2 = pChip("L", "Dr", C.dr);

    // ---- the three gold rule cards
    const XS = [345, 960, 1575], SLOT = [[115, 290], [115, 560], [115, 830]], A = [545, 585];
    const FAMS = ["personal", "real", "nominal"];
    const RULE = { personal: ["personal_receiver", "personal_giver"], real: ["real_in", "real_out"], nominal: ["nominal_expense", "nominal_income"] };
    const cards = FAMS.map((f, i) => {
      const pos = L7.node(svg, XS[i], 585); const n = K.g(pos, {}); L7.hide(n); gsap.set(n, { scale: 0.62, svgOrigin: "0 0" });
      const body = K.g(n, {});
      L7.card(body, 640, 600, { gold: true });
      L7.famMedallion(body, f, -218, -218, 66);
      K.label(body, 56, -218, L7.FAM[f].name, { size: 76, bg: L7.FAM[f].col });
      const chips = RULE[f].map((key, k) => {
        const c = L7.tagChip(body, -64, -50 + k * 150, key, { s: 1.4 });
        const dc = L7.node(body, 232, -50 + k * 150); L7.hide(dc);
        const side = k === 0 ? "L" : "R", col = side === "R" ? C.cr : C.dr;
        K.paper(K.shadow(dc, 1), K.cutRect(-66, -44, 132, 88, 1.4, 18), col);
        K.text(dc, 0, 3, side === "R" ? "Cr" : "Dr", { size: 68, weight: 800, color: K.onColor(col) });
        return { c, dc };
      });
      return { n, pos, body, f, chips, i };
    });
    const [cPers, cReal, cNom] = cards;
    const activate = (c, t) => {
      tl.to(c.pos, { x: A[0] - XS[c.i], y: A[1] - 585, duration: 0.6, ease: "power2.inOut" }, t);
      tl.to(c.n, { scale: 1, opacity: 1, svgOrigin: O, duration: 0.6, ease: "power2.inOut" }, t);
    };
    const rest = (c, t) => {
      tl.to(c.pos, { x: SLOT[c.i][0] - XS[c.i], y: SLOT[c.i][1] - 585, duration: 0.6, ease: "power2.inOut" }, t);
      tl.to(c.n, { scale: 0.27, opacity: 0.55, svgOrigin: O, duration: 0.6, ease: "power2.inOut" }, t);
    };

    // ---- scale contents per card (all hidden until their words)
    const jEquip = K.jarRig(rig.pans.L.g, 0, 0, 1.0, { label: "Equipment", labelHidden: true, contents: "cart", fill: 1, edge: C.dr, hidden: true });
    const tGopal = K.claimTag(rig.pans.R.g, -78, 0, 0.62, { face: "gopal", amount: 8000, size: 54, hidden: true });
    const tRavi = K.claimTag(rig.pans.R.g, 78, 0, 0.62, { face: "ravi", amount: 30000, size: 54, hidden: true });
    const jExp = K.jarRig(rig.pans.L.g, 0, 0, 1.0, { label: "Expenses", contents: "coins", fill: 0.5, edge: C.dr, hidden: true });
    const tRev = K.claimTag(rig.pans.R.g, 0, 0, 0.8, { face: "customer", amount: 18000, size: 54, hidden: true });
    // Ravi's bundle + Gopal's coins (small flying pieces)
    const bundle = L7.node(svg, 1010, 600); L7.hide(bundle); K.bundle(bundle, 0, 0, 0.9, -8);
    const coinsFly = L7.node(svg, 1010, 600); L7.hide(coinsFly); K.coin(coinsFly, 0, 0, 24); K.coin(coinsFly, 30, 12, 22);
    L7.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 20); khata.blink(tl, T0 + 38);
    // the trays become the three cards
    cards.forEach((c, i) => tl.fromTo(c.n, { autoAlpha: 0, scale: 0.67, svgOrigin: O }, { autoAlpha: 1, scale: 0.62, svgOrigin: O, duration: 0.4, ease: "power2.out", immediateRender: false }, T0 + 0.1 + i * 0.12));
    cards.forEach((c, i) => { tl.to(c.n, { scale: 0.66, svgOrigin: O, duration: 0.14, ease: "power2.out" }, cue("s05a", "@rule") - 0.5 + i * 0.12); tl.to(c.n, { scale: 0.62, svgOrigin: O, duration: 0.25, ease: "power2.inOut" }, cue("s05a", "@rule") - 0.36 + i * 0.12); });

    // ---------------------------------------------------------------- Real
    activate(cReal, cue("s05a", "@real", 1) - 0.4); rest(cPers, cue("s05a", "@real", 1) - 0.4); rest(cNom, cue("s05a", "@real", 1) - 0.4);
    L7.drop(tl, cReal.chips[0].c.n, cue("s05a", "@comes") - 0.25, { dur: 0.3 }); L7.drop(tl, cReal.chips[0].dc, cue("s05a", "@debit") + 0.1, { dur: 0.3 });
    L7.drop(tl, cReal.chips[1].c.n, cue("s05a", "@goes") - 0.25, { dur: 0.3 }); L7.drop(tl, cReal.chips[1].dc, cue("s05a", "@credit") + 0.1, { dur: 0.3 });
    // translation (≥ 0.5 s stillness first): the scale comes in, the cart lands on the left pan
    rig.enter(tl, cue("s05a", "@translation") + 0.3);
    jEquip.enter(tl, cue("s05a", "@assets", 1) - 0.1);
    const tCart = cue("s05a", "@grows") - 0.3;
    jEquip.landSticker(tl, tCart, { dx: -330, dy: -240, dur: 0.8 }); jEquip.tieLabel(tl, tCart + 0.8);
    rig.tilt(tl, tCart + 0.8, 3.5, { dur: 0.7 }); rig.tint(tl, tCart + 0.8, "L");
    L7.drop(tl, drL, cue("s05a", "@left") - 0.1);
    jEquip.light(tl, cue("s05a", "@left"), { color: C.dr, hold: 0.8 });
    // "Same thing." — the beam settles, a soft ding, Khata hops
    const tSame = cue("s05a", "@same");
    rig.settle(tl, tSame - 0.1, { dur: 0.8, hold: 0.2 });
    khata.hop(tl, tSame, { height: 40 }).expr(tl, tSame, "happy");
    // card leaves, scale clears
    const tP = cue("s05b", "@personal");
    jEquip.exit(tl, tP - 0.3); L7.lift(tl, drL, tP - 0.3); rig.tint(tl, tP - 0.3, "L", false);

    // ---------------------------------------------------------------- Personal
    activate(cPers, tP - 0.4); rest(cReal, tP - 0.4);
    L7.drop(tl, cPers.chips[0].c.n, cue("s05b", "@receiver") - 0.3, { dur: 0.3 }); L7.drop(tl, cPers.chips[0].dc, cue("s05b", "@debit", 1) + 0.1, { dur: 0.3 });
    L7.drop(tl, cPers.chips[1].c.n, cue("s05b", "@giver") - 0.3, { dur: 0.3 }); L7.drop(tl, cPers.chips[1].dc, cue("s05b", "@credit", 1) + 0.1, { dur: 0.3 });
    // translation a — someone gives the stall something (a loan): Ravi hands over a bundle; his tag grows on the right pan → Cr
    tGopal.enter(tl, cue("s05b", "@gives") - 0.6);
    const tLoan = cue("s05b", "@loan");
    L7.drop(tl, bundle, tLoan - 0.5, { dur: 0.25 });
    tl.to(bundle, { x: 1430 - 1010, y: 705 - 600, duration: 0.6, ease: "power2.inOut" }, tLoan - 0.25);
    tl.to(bundle, { autoAlpha: 0, scale: 0.6, svgOrigin: O, duration: 0.2 }, tLoan + 0.35);
    tRavi.enter(tl, tLoan + 0.3); tRavi.light(tl, tLoan + 0.5, { color: C.cr, hold: 0.8 });
    rig.tilt(tl, tLoan + 0.5, -3.5, { dur: 0.7 }); rig.tint(tl, tLoan + 0.5, "R");
    L7.drop(tl, crR, cue("s05b", "@credit", 2) - 0.15);
    // translation b — someone receives from the stall (Gopal): coins leave the galla side, his tag shrinks a step, a blue Dr lands under the LEFT pan
    const tRec = cue("s05b", "@receives");
    L7.drop(tl, coinsFly, tRec - 0.2, { dur: 0.25 });
    tl.to(coinsFly, { x: 1360 - 1010, y: 700 - 600, duration: 0.7, ease: "power2.inOut" }, tRec + 0.1);
    tl.to(coinsFly, { autoAlpha: 0, scale: 0.6, svgOrigin: O, duration: 0.2 }, tRec + 0.8);
    tGopal.tick(tl, cue("s05b", "@less") - 0.1, 8000, 5000, 0.7);
    rig.tilt(tl, cue("s05b", "@less") - 0.1, -1.5, { dur: 0.7 });
    L7.drop(tl, drL2, cue("s05b", "@left") - 0.1); rig.tint(tl, cue("s05b", "@left"), "L");
    // the next card
    const tN = cue("s05c", "@nominal");
    [tGopal, tRavi].forEach((t) => t.exit(tl, tN - 0.35)); L7.lift(tl, crR, tN - 0.35); L7.lift(tl, drL2, tN - 0.35);
    rig.settle(tl, tN - 0.5, { dur: 0.6, hold: 0.2 }); rig.tint(tl, tN - 0.3, "both", false);

    // ---------------------------------------------------------------- Nominal
    activate(cNom, tN - 0.4); rest(cPers, tN - 0.4);
    L7.drop(tl, cNom.chips[0].c.n, cue("s05c", "@expenses", 1) - 0.3, { dur: 0.3 }); L7.drop(tl, cNom.chips[0].dc, cue("s05c", "@debit") + 0.1, { dur: 0.3 });
    L7.drop(tl, cNom.chips[1].c.n, cue("s05c", "@incomes", 1) - 0.3, { dur: 0.3 }); L7.drop(tl, cNom.chips[1].dc, cue("s05c", "@credit") + 0.1, { dur: 0.3 });
    // translation: L6's picture, re-used — the Expenses jar on the left pan, the revenue tag on the right, the small equation strip beneath
    const tSh = cue("s05c", "@shrink");
    jExp.enter(tl, tSh - 0.9); jExp.fill(tl, tSh - 0.7, 1.0);
    rig.tilt(tl, tSh - 0.3, 3, { dur: 0.7 }); rig.tint(tl, tSh - 0.3, "L");
    rig.equation(tl, tSh + 0.2, "A + Exp = L + Cap + Rev", { size: 56 });
    L7.drop(tl, drL, cue("s05c", "@debits") - 0.2);
    tRev.enter(tl, cue("s05c", "@grow") - 0.4); rig.tilt(tl, cue("s05c", "@grow") + 0.2, -3, { dur: 0.7 }); rig.tint(tl, cue("s05c", "@grow") + 0.2, "R");
    L7.drop(tl, crR, cue("s05c", "@credits") - 0.2);
    rig.settle(tl, cue("s05c", "@credits") + 0.5, { dur: 0.8, hold: 0.2 });
    khata.hop(tl, cue("s05c", "@credits") + 0.3, { height: 40 }).expr(tl, cue("s05c", "@credits") + 0.3, "wink");
  };
})();
