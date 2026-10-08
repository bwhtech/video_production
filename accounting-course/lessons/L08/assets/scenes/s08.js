// s08 — Solo: T17, Meera takes ₹3,000 for home (drawings) + the misconception "drawings are an expense" — the Equity card grows a third, dashed pocket.
//   a  Meera takes three ₹1,000 notes from the galla · two slots: the galla lights, slot 2 stays "?" (the solo's question)
//   b  the blank entry (dotted cells) + a 3·2·1 ring (3.2 s)   c  the reveal: Dr Drawings 3,000 / To Cash 3,000, tags, hold   d/e  coral: notes into a generic Expense jar → ✗ → Meera ≠ Meera's Chai →
//   the Equity card unfolds; the dashed Drawings pocket joins it on the LEFT; a −3,000 slip lands in it; Capital 50,000 and Profit stay perfectly still; the −Drawings chip crosses the post and flips sign.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, JX = L8.JX, GY = 1048, HI = window.TL.lang === "hi";
    const S = L8.scaffold(svg, tl, K, sc, { color: C.teal, wipe: { color: C.coral, cx: 960, cy: 560 } });
    const jc = S.jc, y0 = S.y(0), y1 = S.y(1);
    const jarDr = S.jar("L", "drawings", "Drawings", "coins", C.dr), jarCash = S.jar("R", "cash", "Cash", "coins", C.cr);
    // ---- cast + props
    const gN = L8.node(svg, 420, GY); const galla = K.galla(gN, 0, 0, 0.85, {});
    const m = K.meera(svg, 1800, GY, 0.56, { expr: "happy" });
    const purse = K.purse(svg, 0, 0, 0.7, { icon: "wallet", hold: { rig: m, side: "R", rest: [20, 70] } });
    const mkNote = (n) => K.note(n, 0, 0, 150, 76, 0, "#cfe3c4");
    const pm = K.pauseMedallion(svg, 1790, 520, 0.4, { hidden: true });
    // blank entry (dotted cells) for the solo
    const blank = L8.node(jc.body, 0, 0); L8.hide(blank);
    {
      const dash = (d, col, w = 4) => K.el("path", { d, fill: "none", stroke: col, "stroke-width": w, "stroke-dasharray": "9 8", "stroke-linecap": "round", opacity: 0.75 }, blank);
      K.text(blank, JX.part + 250, y0 + 3, "A/c", { size: 38, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      dash(`M${JX.part},${y0 + 22} L${JX.part + 235},${y0 + 22}`, C.ink);
      K.text(blank, JX.part + 60, y1 + 3, "To", { size: 38, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      dash(`M${JX.part + 118},${y1 + 22} L${JX.part + 330},${y1 + 22}`, C.ink); K.text(blank, JX.part + 345, y1 + 3, "A/c", { size: 38, weight: 700, anchor: "start" }).setAttribute("data-layout-allow-overlap", "true");
      dash(K.cutRect(JX.drR - 140, y0 - 24, 130, 48, 0.8, 16), C.dr); dash(K.cutRect(JX.crR - 140, y1 - 24, 130, 48, 0.8, 16), C.cr);
    }
    // ---- coral phase: Expense jar in Meera's thought bubble, then the Equity card
    const imag = K.imagineCard(svg, 760, 430, 760, 460, { hidden: true });
    const jarEx = K.jarRig(imag.area.g, 0, 180, 1.0, { label: "Expense", icon: "receipt", contents: "coins", fill: 0.1, edge: C.dr, amount: 0 });
    const chipRent = L8.node(svg, 1370, 400); L8.hide(chipRent); K.paper(K.shadow(chipRent, 1), K.cutRect(-150, -48, 300, 96, 1.6, 22), C.cream); K.medallion(chipRent, -88, 0, 36, "key"); K.text(chipRent, 38, 3, "Rent", { size: 42, weight: 800 });
    const chipSal = L8.node(svg, 1370, 530); L8.hide(chipSal); K.paper(K.shadow(chipSal, 1), K.cutRect(-150, -48, 300, 96, 1.6, 22), C.cream); K.medallion(chipSal, -88, 0, 36, "user"); K.text(chipSal, 38, 3, "Salary", { size: 42, weight: 800 });
    const pairMeera = L8.node(svg, 740, 450); L8.hide(pairMeera); K.tex(K.shadow(pairMeera, 1), K.cutEll(0, 0, 110, 110, 1), "pat-paper"); K.faceArt(pairMeera, "meera", 96);
    const pairStall = L8.node(svg, 1180, 450); L8.hide(pairStall); K.medallion(pairStall, 0, 0, 104, "store", C.saffron);
    const pairNe = L8.node(svg, 960, 450); L8.hide(pairNe); K.text(pairNe, 0, 8, "≠", { size: 150, weight: 800, color: C.crText });
    const eq = K.equityCard(svg, 960, 860, 1.25, { pockets: 2, capital: 50000 });
    L8.hide(eq.body);                                                                      // the folded tag only appears when it is about to unfold
    // the −Drawings chip crossing the post (a thin brass post, bottom strip)
    const post = L8.node(svg, 960, 960); L8.hide(post);
    K.paper(K.shadow(post, 1), K.cutRect(-9, -64, 18, 128, 1, 16), C.brass); K.paper(post, K.cutEll(0, -64, 20, 20, 1), C.goldDark);
    const chipA = L8.node(svg, 1240, 960); L8.hide(chipA); K.paper(K.shadow(chipA, 1), K.cutRect(-130, -38, 260, 76, 1.4, 20), C.coral); K.text(chipA, 0, 3, "−Drawings", { size: 40, weight: 800, color: "#fff" });
    const chipB = L8.node(svg, 680, 960); L8.hide(chipB); K.paper(K.shadow(chipB, 1), K.cutRect(-130, -38, 260, 76, 1.4, 20), C.dr); K.medallion(chipB, -92, 0, 26, "wallet", C.coral); K.text(chipB, 30, 3, "Drawings", { size: 38, weight: 800, color: "#fff" });
    const dev = K.whichTwo(svg, { veil: true, x: 960, y: 190, s: 1 });
    const cd = K.pauseMedallion; // (alias, unused)
    L8.allow(svg);

    // =============================================================================== timeline
    m.blinks(tl, T0 + 1.2, sc.end, 3.3); m.jitter(tl, T0, sc.end); galla.jit && 0;
    // ---- a: "Last one's yours. Meera takes ₹3,000 from the galla, to spend at home. Which two things changed?"
    m.expr(tl, cue("s08a", "@last"), "grin");
    galla.open(tl, cue("s08a", "@galla") - 0.2);
    const tTk = cue("s08a", "@takes");
    m.arm(tl, tTk - 0.2, "R", 60, 60, 0.3); m.arm(tl, tTk + 1.5, "R", 12, 8, 0.4);
    [0, 1, 2].forEach((i) => L8.fly(svg, tl, tTk - 0.1 + i * 0.16, [420, 940], [1690, 850 + i * 6], mkNote, { dur: 0.95, k: 0.5, arc: 150 }));
    purse.swing(tl, tTk + 1.0);
    const slots = dev.run(tl, cue("s08a", "@changed") - 0.3, { slots: 2, gap: 2.0, fill: [{ label: "Cash", delta: -3000, side: "R" }, { pending: true }] });
    L8.flashRing(svg, tl, slots.tDing, [420 - 110, GY - 180, 420 + 110, GY + 6]);
    S.check.tick(tl, slots.tDing + 0.15, 0);
    dev.clear(tl, cue("s08b", "@write") - 0.3);
    // ---- b: "Cash went down. The other one is new — yours to name. Write the entry. Debit what? To what?" + the 3·2·1 ring
    m.expr(tl, cue("s08b", "@cash"), "thinking");
    const tW = cue("s08b", "@write");
    S.date(tW - 0.1, 0, "Apr 30", 0.5);
    L8.drop(tl, blank, tW + 0.3, { dur: 0.3 });
    pm.enter(tl, tW + 0.7, { dur: 0.3 });
    const tCount = segEnd("s08b");
    pm.countdown(tl, tCount, { dur: 3.2 });
    S.pencil.hide(tl, tW + 0.6);
    // ---- c: the reveal
    const tR = segEnd("s08b") + 3.2;
    pm.exit(tl, tR - 0.1);
    tl.to(blank, { autoAlpha: 0, duration: 0.15 }, cue("s08c", "@debit") - 0.1);
    S.pencil.show(tl, cue("s08c", "@debit") - 0.5);
    m.expr(tl, cue("s08c", "@debit"), "happy");
    const tDw = cue("s08c", "@drawings");
    S.acct(tDw - 0.1, 0, "Drawings A/c"); S.drMark(tDw + 0.6, 0);
    const t3 = cue("s08c", "@three");
    S.amt(t3, 0, "dr", 3000, 0.6);
    S.hud.tilt(tl, t3 + 0.5, 5, { dur: 0.7 }); S.hud.setTotals(tl, t3 + 0.5, 3000, undefined, { dur: 0.6 }); jarDr.enter(tl, t3 + 0.5);
    S.check.tick(tl, t3 + 0.3, 1);
    const tTo = cue("s08c", "@to");
    S.acct(tTo - 0.1, 1, "To  Cash A/c", { to: true });
    const t32 = cue("s08c", "@three", 2);
    S.amt(t32, 1, "cr", 3000, 0.6);
    jarCash.enter(tl, t32 + 0.5); S.hud.settle(tl, t32 + 0.6, { dur: 0.8, hold: 1.5 }); S.hud.setTotals(tl, t32 + 0.6, undefined, 3000, { dur: 0.6 });
    S.narr(t32 + 0.7, 2, "wallet", "Drawings");
    // "It's Meera — Personal — and she's the receiver." — the tags tie on
    const tag0 = S.tag(cue("s08c", "@personal") - 0.1, 0, "personal_receiver", "dr", { light: false }); tag0.light(tl, cue("s08c", "@receiver"), { hold: 0.9 });
    S.tag(cue("s08c", "@receiver") + 0.5, 1, "real_out", "cr", { light: false });
    S.check.tick(tl, cue("s08c", "@receiver") + 0.8, 2);
    S.pencil.hide(tl, cue("s08c", "@meera"));
    // ---- d: "And here's the second slip." — curved wipe to coral; the notes into a generic Expense jar
    const tSlip = cue("s08d", "@slip");
    S.wipe.run(tl, tSlip - 0.35, 1.0);
    [S.cardPos, S.hud.g, S.check.g].forEach((n) => tl.to(n, { autoAlpha: 0, duration: 0.35 }, tSlip - 0.1));
    m.expr(tl, tSlip, "thinking");
    imag.enter(tl, cue("s08d", "@drawings") - 0.2);
    [0, 1, 2].forEach((i) => L8.fly(imag.area.g, tl, cue("s08d", "@expense") - 0.4 + i * 0.12, [-90 + i * 90, -190], [0, 80], mkNote, { dur: 0.7, k: 0.5, arc: 20 }));
    jarEx.fill(tl, cue("s08d", "@expense") + 0.4, 1.0); jarEx.tick(tl, cue("s08d", "@expense") + 0.4, 0, 3000, 0.7);
    // ---- e: "Nope." ✗ · an expense is used up running the stall (rent, Raju's salary) · this money went home
    const tNope = cue("s08e", "@nope");
    const st = K.stamp(tl, svg, 760, 470, tNope, 1.8);
    S.khata && S.khata.hop(tl, tNope - 0.1, { height: 40 });
    L8.drop(tl, chipRent, cue("s08e", "@rent") - 0.1, { dur: 0.3 }); L8.drop(tl, chipSal, cue("s08e", "@salary") - 0.1, { dur: 0.3 });
    const tHome = cue("s08e", "@home");
    [0, 1, 2].forEach((i) => L8.fly(svg, tl, tHome - 0.4 + i * 0.12, [760 + (i - 1) * 40, 600], [1700, 850], mkNote, { dur: 1.0, k: 0.5, arc: 220 }));
    jarEx.fill(tl, tHome - 0.3, 0.1); jarEx.tick(tl, tHome - 0.3, 3000, 0, 0.5);
    purse.swing(tl, tHome + 0.7);
    // "Meera and Meera's Chai are not the same."
    const tRem = cue("s08e", "@remember");
    S.khata && tl.to(S.khata.g, { autoAlpha: 0, duration: 0.3 }, tRem - 0.1);
    st.lift(tl, tRem - 0.1); imag.exit(tl, tRem - 0.1); L8.lift(tl, chipRent, tRem - 0.1, { dur: 0.2 }); L8.lift(tl, chipSal, tRem - 0.1, { dur: 0.2 }); L8.lift(tl, jarEx.g, tRem - 0.1, { dur: 0.2 });
    L8.drop(tl, pairMeera, cue("s08e", "@meera") - 0.1, { dur: 0.3 }); L8.drop(tl, pairStall, cue("s08e", "@meera's") - 0.1, { dur: 0.3 }); L8.drop(tl, pairNe, cue("s08e", "@same") - 0.5, { dur: 0.3 });
    // "So the Equity card grows a third pocket: Drawings."
    const tEq = cue("s08e", "@equity");
    [pairMeera, pairStall, pairNe].forEach((n) => L8.lift(tl, n, tEq - 0.35, { dur: 0.25 }));
    tl.set(eq.body, { opacity: 1 }, tEq - 0.3); eq.unfold(tl, tEq - 0.25);
    eq.addPocket(tl, cue("s08e", "@third") - 0.2, "Drawings");
    const D = eq.pockets.Drawings; gsap.set(D.inner, { x: -226 });                         // Drawings joins on the LEFT; Capital | Profit keep their order
    tl.to(eq.pockets.Capital.inner, { x: 0, duration: 0.45, ease: "power2.inOut" }, cue("s08e", "@third") - 0.2); tl.to(eq.pockets.Profit.inner, { x: 226, duration: 0.45, ease: "power2.inOut" }, cue("s08e", "@third") - 0.2);
    // the −3,000 slip leaves the galla and lands in the dashed pocket
    eq.slip(tl, cue("s08e", "@drawings") - 0.1, "Drawings", -3000, { icon: "wallet", from: [-380, 330], dur: 0.8 });
    // "Capital stays fifty thousand. Profit stays untouched." — rings, nothing moves
    eq.light(tl, cue("s08e", "@capital") + 0.2, "Capital", { hold: 1.0 }); eq.light(tl, cue("s08e", "@profit") + 0.2, "Profit", { hold: 1.0 });
    // "Drawings sit on the left, like expenses — but in their own pocket." — the −Drawings chip crosses the post and flips sign
    const tLeft = cue("s08e", "@drawings", 2);
    L8.drop(tl, post, tLeft - 0.4, { dur: 0.3 }); L8.drop(tl, chipA, tLeft - 0.3, { dur: 0.3 });
    const tHop = cue("s08e", "@left") - 0.3;
    tl.to(chipA, { x: -300, duration: 0.5, ease: "power2.inOut" }, tHop); tl.to(chipA, { y: -110, duration: 0.25, ease: "power2.out" }, tHop); tl.to(chipA, { y: 0, duration: 0.25, ease: "power2.in" }, tHop + 0.25);
    tl.set(chipA, { opacity: 0 }, tHop + 0.5); L8.drop(tl, chipB, tHop + 0.5, { dur: 0.3 }); tl.to(chipB, { x: 0, duration: 0.01 }, tHop + 0.5);
    eq.light(tl, cue("s08e", "@own") - 0.2, "Drawings", { hold: 1.2 });
    m.expr(tl, cue("s08e", "@expenses"), "happy");
    L8.allow(svg);
  };
})();
