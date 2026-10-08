// s04 — The journal (what it is) + "which two things changed?" + T13 written live (the columns label themselves after).
//   a Khata catches Meera's scribbled tissue, tosses it, opens → the blank JournalCard slides up out of its pages (columns ruled, UNLABELLED)
//   b three-question checklist docks top-left · veil + two slots (galla ▲22,000 / Sales ▲22,000) · c curved wipe teal→saffron, HUD, equation reason then the tags
//   d Khata's pencil writes T13 element by element on the VO words; each column head labels itself the moment its first cell is written; the A/c chip ties on.
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L8 = window.L8, T0 = sc.start, JX = L8.JX, HI = window.TL.lang === "hi", GY = 1045;
    const CARD = { x: 960, y: 822, s: 0.95 };
    const P = (lx, ly) => [CARD.x + lx * CARD.s, CARD.y + ly * CARD.s];

    // ---- world
    K.wall(svg, C.teal, 880);
    const saf = L8.circleWipe(svg, C.saffron, 880, 960, 700);
    K.table(svg, 880);
    L8.cal(svg, 30);
    const gallaN = L8.node(svg, 330, GY); L8.hide(gallaN); const galla = K.galla(gallaN, 0, 0, 0.85, {});
    const jarN = L8.node(svg, 1590, GY); L8.hide(jarN);
    const salesJar = K.jarRig(jarN, 0, 0, 1.0, { label: "Sales", icon: "coins", contents: "coins", fill: 0.6, edge: C.cr });
    // ---- the blank journal card (columns ruled, heads unlabelled) — slides up out of Khata's pages
    const cardPos = L8.node(svg, 0, 0); L8.hide(cardPos);
    const jc = K.journalCard(cardPos, CARD.x, CARD.y, CARD.s, { rows: 5, heads: false });
    const y0 = jc.lineY(0), y1 = jc.lineY(1), y2 = jc.lineY(2);
    // ---- Khata (starts big and closed, shrinks as it opens)
    const kn = L8.node(svg, 0, 0);
    const khata = K.khataRig(kn, 960, GY, 0.9, { expr: "awake" });
    const tis = K.tissue(svg, 1560, 250, 1.2, { hidden: true });
    // ---- docked three-question checklist, rojmel chip, A/c chip, loose tags, pencil, HUD
    const check = L8.checklist(svg, 50, 172, 0.74);
    const rojmel = L8.node(svg, 1580, 433); L8.hide(rojmel);
    K.paper(K.shadow(rojmel, 1), K.cutRect(-74, -26, 148, 52, 1.2, 16), C.cream); K.text(rojmel, 0, 3, HI ? "रोज़मेल" : "rojmel", { size: 36, weight: 800, color: C.coralText });
    const tagR = K.ruleTag(svg, 840, 262, 1, { rule: "real_in", hidden: true });
    const tagN = K.ruleTag(svg, 1170, 262, 1, { rule: "nominal_income", hidden: true });
    const acChip = L8.acChip(svg, 560, 255);
    const pencil = L8.pencil(svg, 1080, 900, 0.9);
    const hud = L8.hud(svg, tl, T0), HP = L8.hudPos();
    const hudJarL = K.jarRig(hud.pans.L.g, 0, 0, 0.8, { label: "Cash", contents: "coins", fill: 0.6, edge: C.dr, hidden: true });
    const hudJarR = K.jarRig(hud.pans.R.g, 0, 0, 0.8, { label: "Sales", contents: "coins", fill: 0.6, edge: C.cr, hidden: true });
    // custom cells for the live entry (card-local coordinates)
    const tkDr = K.ticker(jc.body, JX.drR, y0 + 3, 1, { value: 0, size: 40, weight: 800, anchor: "end", prefix: "", color: C.drText, hidden: true });
    const tkCr = K.ticker(jc.body, JX.crR, y1 + 3, 1, { value: 0, size: 40, weight: 800, anchor: "end", prefix: "", color: C.crText, hidden: true });
    [tkDr, tkCr].forEach((k) => k.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true")));
    const tagCell = [K.ruleTag(jc.body, JX.tag, y0, 1, { rule: "real_in", side: "dr", compact: true, hidden: true }), K.ruleTag(jc.body, JX.tag, y1, 1, { rule: "nominal_income", side: "cr", compact: true, hidden: true })];
    const narrLab = L8.node(jc.body, 215, y2); L8.hide(narrLab);
    K.paper(K.shadow(narrLab, 1), K.cutRect(-100, -26, 200, 52, 1, 16), C.cream); K.text(narrLab, 0, 3, "narration", { size: 34, weight: 700, color: "#5b4f45" });
    const thread = K.el("path", { d: "", fill: "none", stroke: C.goldDark, "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, svg);
    const dev = K.whichTwo(svg, { veil: true, x: 960, y: 190, s: 1 });
    L8.allow(svg);

    // =============================================================================== timeline
    khata.blink(tl, T0 + 2.2); khata.blink(tl, T0 + 9); khata.jitter(tl, T0, sc.end);
    // ---- a: the tissue lands in Khata's hands; Khata peers at it, tosses it
    const tT = cue("s04a", "@back"), tLand = cue("s04a", "@tissue");
    tis.enter(tl, tT - 0.2, { dur: 0.2 });
    tl.to(tis.body, { x: -480, y: 520, rotation: 30, svgOrigin: O, duration: tLand - tT + 0.1, ease: "power2.out" }, tT);
    khata.arm(tl, tLand - 0.2, "R", 100, 0.3); khata.expr(tl, tLand + 0.1, "wow"); khata.look(tl, tLand + 0.1, 8, 7);
    tis.flutter(tl, tLand + 0.2, tLand + 1.9, { amp: 5 });
    const tToss = cue("s04a", "@day") - 0.3;
    khata.arm(tl, tToss - 0.15, "R", 20, 0.15); khata.arm(tl, tToss + 0.05, "R", 150, 0.18); khata.expr(tl, tToss + 0.1, "awake"); khata.look(tl, tToss + 0.1, 0, 0);
    tl.to(tis.body, { x: -820, y: 120, rotation: 260, svgOrigin: O, duration: 0.8, ease: "power2.in" }, tToss + 0.1);
    tl.to(tis.body, { opacity: 0, duration: 0.2 }, tToss + 0.7);
    khata.arm(tl, tToss + 0.6, "R", 15, 0.3);
    // "the journal" — Khata opens and shrinks; the card slides up out of its pages
    const tJ = cue("s04a", "@journal");
    khata.open(tl, tJ - 0.35, 0.55); khata.expr(tl, tJ - 0.3, "happy");
    tl.to(kn, { scale: 0.756, svgOrigin: "960 " + GY, duration: 0.8, ease: "power2.inOut" }, tJ - 0.3);
    tl.fromTo(cardPos, { autoAlpha: 0, y: 270 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", immediateRender: false }, tJ - 0.15);
    // "rojmel" chip tucks under the header
    L8.drop(tl, rojmel, cue("s04a", "@rojmel") - 0.1, { dur: 0.3 });
    // the three questions → the checklist docks (one chip per question)
    check.enter(tl, cue("s04a", "@accounts") - 0.1, 0); check.enter(tl, cue("s04a", "@kind") - 0.1, 1); check.enter(tl, cue("s04a", "@side") - 0.1, 2);
    khata.arm(tl, cue("s04a", "@accounts"), "L", 130, 0.25); khata.arm(tl, cue("s04a", "@kind"), "L", 20, 0.25); khata.arm(tl, cue("s04a", "@side") , "R", 130, 0.25); khata.arm(tl, cue("s04a", "@side") + 1.0, "R", 15, 0.3);

    // ---- b: the first one, written straight in — which two things changed?
    khata.expr(tl, cue("s04b", "@khata"), "happy");
    pencil.show(tl, cue("s04b", "@writes") - 0.1); pencil.goto(tl, cue("s04b", "@writes"), P(JX.date, y0 + 14)[0], P(JX.date, y0 + 14)[1], 0.6);
    L8.drop(tl, gallaN, cue("s04b", "@cash") - 0.1, { dur: 0.35 }); L8.drop(tl, jarN, cue("s04b", "@sales") - 0.1, { dur: 0.35 });
    const slots = dev.run(tl, cue("s04b", "@changed") - 0.3, { slots: 2, gap: 2.0, fill: [{ label: "Cash", delta: 22000, side: "L" }, { label: "Sales", delta: 22000, side: "R" }] });
    L8.flashRing(svg, tl, slots.tDing, [330 - 90, GY - 150, 330 + 90, GY]);
    salesJar.light(tl, slots.tDing);
    check.tick(tl, slots.tDing + 0.15, 0);
    const tClr = cue("s04c", "@cash", 2) - 0.3;
    dev.clear(tl, tClr);

    // ---- c: "Cash went up. And Sales went up." — curved wipe, HUD, the equation reason, then the tag
    const tCash = cue("s04c", "@cash");
    saf.run(tl, tCash + 0.1, 1.0);
    K.pulseNode(tl, gallaN, tCash, 1.08); K.pulseNode(tl, jarN, cue("s04c", "@sales"), 1.08);
    hud.appear(cue("s04c", "@cash", 2) - 0.3);
    // "an asset, home on the left" — the galla flies onto the HUD's left pan (tilts left)
    const tAsset = cue("s04c", "@asset") - 0.1;
    L8.fly(svg, tl, tAsset, [330, GY - 90], HP.L, (n) => K.medallion(n, 0, 0, 44, "coins"), { dur: 0.8, k: 0.3 });
    hudJarL.enter(tl, tAsset + 0.7); hud.tilt(tl, tAsset + 0.7, 5, { dur: 0.7 }); hud.setTotals(tl, tAsset + 0.7, 22000, undefined, { dur: 0.6 });
    // "equity, home on the right" — the Sales jar's coins drop onto the right pan (levels)
    const tRight = cue("s04c", "@right") - 0.3;
    L8.fly(svg, tl, tRight, [1590, GY - 90], HP.R, (n) => K.medallion(n, 0, 0, 44, "coins", C.cr), { dur: 0.8, k: 0.3 });
    hudJarR.enter(tl, tRight + 0.7); hud.settle(tl, tRight + 0.7, { dur: 0.8, hold: 1.5 }); hud.setTotals(tl, tRight + 0.7, undefined, 22000, { dur: 0.6 }); hud.levelFlash(tl, tRight + 1.5);
    // tags: waiting beside the card (Real · comes in / Nominal · income)
    L8.drop(tl, tagR.body, cue("s04c", "@tag") - 0.1, { dur: 0.3 });
    L8.drop(tl, tagN.body, cue("s04c", "@nominal") - 0.1, { dur: 0.3 });
    check.tick(tl, cue("s04c", "@real") + 0.2, 1); check.tick(tl, cue("s04c", "@credit") + 0.3, 2);

    // ---- d: "Now watch the columns." — written live
    const pxy = (lx, ly) => P(lx, ly + 16);
    const goto = (t, lx, ly, d = 0.3) => { const [px, py] = pxy(lx, ly); pencil.goto(tl, t, px, py, d); };
    const tCols = cue("s04d", "@columns");
    khata.arm(tl, tCols, "R", 125, 0.3); khata.arm(tl, tCols + 1.4, "R", 15, 0.3);
    // date
    const tD = cue("s04d", "@thirtieth");
    goto(tD - 0.4, JX.date, y0); const wD = L8.writeText(jc.body, tl, tD, JX.date, y0, "Apr 30", { size: 36, weight: 600, dur: 0.5 }); pencil.sweep(tl, tD, P(JX.date + 120, 0)[0], 0.5);
    jc.head(tl, cue("s04d", "@april") + 0.5, "date"); khata.arm(tl, cue("s04d", "@april") + 0.5, "L", 130, 0.25); khata.arm(tl, cue("s04d", "@april") + 1.6, "L", 15, 0.3);
    // Cash
    const tC = cue("s04d", "@cash");
    goto(tC - 0.35, JX.part, y0); L8.writeText(jc.body, tl, tC, JX.part, y0, "Cash", { size: 38, weight: 700, dur: 0.4 }); pencil.sweep(tl, tC, P(JX.part + 90, 0)[0], 0.4);
    jc.head(tl, tC + 0.5, "particulars"); khata.arm(tl, tC + 0.5, "L", 130, 0.25); khata.arm(tl, tC + 1.6, "L", 15, 0.3);
    // A/c  (the account chip ties on at the first A/c)
    const tA = cue("s04d", "@a-slash-c");
    goto(tA - 0.2, JX.part + 96, y0, 0.2); L8.writeText(jc.body, tl, tA, JX.part + 96, y0, "A/c", { size: 38, weight: 700, dur: 0.35 }); pencil.sweep(tl, tA, P(JX.part + 96 + 66, 0)[0], 0.35);
    const [ax, ay] = P(JX.part + 130, y0 - 30);
    thread.setAttribute("d", `M560,308 C560,${(308 + ay) / 2 + 10} ${ax},${(308 + ay) / 2 - 10} ${ax},${ay}`);
    const TL_LEN = Math.ceil(thread.getTotalLength ? thread.getTotalLength() : 300) + 4; thread.setAttribute("stroke-dasharray", TL_LEN); thread.setAttribute("stroke-dashoffset", TL_LEN);
    L8.drop(tl, acChip, tA - 0.15, { dur: 0.3 });
    tl.set(thread, { opacity: 1 }, tA + 0.15); tl.to(thread, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, tA + 0.15);
    // Dr
    const tDr = cue("s04d", "@dr");
    goto(tDr - 0.3, JX.drSuffix - 46, y0, 0.3); L8.writeText(jc.body, tl, tDr, JX.drSuffix - 46, y0, "Dr", { size: 36, weight: 800, color: C.drText, dur: 0.3 }); pencil.sweep(tl, tDr, P(JX.drSuffix, 0)[0], 0.3);
    // 22,000 ticks up in the blue cell; Dr ₹ labels itself
    const tAm = cue("s04d", "@twenty-two");
    goto(tAm - 0.2, JX.drR - 150, y0, 0.2);
    tkDr.enter(tl, tAm, { dur: 0.2 }); tkDr.to(tl, tAm, 22000, 0.7);
    jc.head(tl, tAm + 0.8, "dr"); khata.arm(tl, tAm + 0.8, "R", 130, 0.25); khata.arm(tl, tAm + 1.8, "R", 15, 0.3);
    // tag 1 flies from beside the card onto line 1
    const flyTag = (loose, cell, tt, dest) => {
      const [dx, dy] = dest;
      tl.to(loose.body, { x: dx - loose.__x, y: dy - loose.__y, scale: 0.5, svgOrigin: O, duration: 0.55, ease: "power2.inOut" }, tt);
      tl.to(loose.body, { opacity: 0, duration: 0.1 }, tt + 0.5);
      cell.enter(tl, tt + 0.5, { dur: 0.2 });
    };
    tagR.__x = 840; tagR.__y = 262; tagN.__x = 1170; tagN.__y = 262;
    const tT1 = cue("s04d", "@left") + 0.3;
    flyTag(tagR, tagCell[0], tT1, P(JX.tag, y0));
    // row 2: "pushed in a little", then To / Sales / 22,000 / Cr ₹
    const tCr = cue("s04d", "@credit");
    goto(tCr, JX.part, y1, 0.3);
    jc.highlightRow(tl, tCr + 0.1, 1);
    goto(cue("s04d", "@pushed") - 0.1, JX.part + 60, y1, 0.5);
    const tTo = cue("s04d", "@to");
    L8.writeText(jc.body, tl, tTo, JX.part + 60, y1, "To", { size: 38, weight: 700, dur: 0.3 }); pencil.sweep(tl, tTo, P(JX.part + 60 + 52, 0)[0], 0.3);
    const tS = cue("s04d", "@to", 2);
    L8.writeText(jc.body, tl, tS, JX.part + 60 + 66, y1, "Sales A/c", { size: 38, weight: 700, dur: 0.6 }); pencil.sweep(tl, tS, P(JX.part + 60 + 66 + 150, 0)[0], 0.6);
    const tAm2 = cue("s04d", "@twenty-two", 2);
    goto(tAm2 - 0.1, JX.crR - 150, y1, 0.2);
    tkCr.enter(tl, tAm2, { dur: 0.2 }); tkCr.to(tl, tAm2, 22000, 0.7);
    jc.head(tl, tAm2 + 0.8, "cr"); khata.arm(tl, tAm2 + 0.8, "R", 130, 0.25); khata.arm(tl, tAm2 + 1.8, "R", 15, 0.3);
    const tT2 = cue("s04d", "@right") + 0.3;
    flyTag(tagN, tagCell[1], tT2, P(JX.tag, y1));
    // narration row: ( coins · Cash sales )
    const tN = cue("s04d", "@short", 2);
    goto(tN - 0.2, JX.part + 60, y2, 0.3);
    const nl = jc.narration(tl, tN, { icon: "coins", text: "Cash sales", row: 2 }); pencil.sweep(tl, tN, P(JX.part + 60 + 330, 0)[0], nl.tEnd - tN);
    L8.drop(tl, narrLab, cue("s04d", "@narration") - 0.1, { dur: 0.3 });
    pencil.hide(tl, cue("s04d", "@narration") + 0.5);
    hud.pulseTotal(tl, cue("s04d", "@narration") + 0.2, "both");
    khata.expr(tl, cue("s04d", "@narration") + 0.2, "happy");
    L8.allow(svg);
  };
})();
