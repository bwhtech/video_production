// s05 — The trap (misconception moment, --scene-coral). A level scale (the trial balance as a scale, chips ₹1,36,000 | ₹1,36,000; the pans hold the column's balances as labelled blocks).
// "It balances so the books must be right?" -> Khata stamps a red x on the check. Then three vignettes where the contents are WRONG but the beam never moves ("the stillness is the joke"):
//   1 forgotten drawings (Drawings block gone, Cash block taller) · 2 wrong account (Cash taller, Bank shorter) · 3 backwards rent (Rent block jumps to the Credit pan, both totals tick to ₹1,41,000).
// Each ends on a result glyph that stays along the bottom (empty slot · two jars with ↑/↓ · ⇄) with a red x. Out: default torn-paper wipe into s06.
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.coral, 880);
    const cal = L.cal(svg, 30);

    // ---------------------------------------------------------------- the scale (level the whole scene, until s06)
    const SX = 960, SY = 935, SS = 1.1;
    const rig = K.scaleRig(svg, SX, SY, SS, { L: 136000, R: 136000, equation: false });
    // block stacks (local px, bottom -> top). Heights: text must stay >= 34 px on screen (32 local x 1.1).
    const mkBlock = (parent, name, bottom, h, col) => {
      const wrap = K.g(parent, { transform: `translate(0 ${-bottom})` });
      const shift = K.g(wrap, {}), body = K.g(K.shadow(shift, 1), {});
      const r = K.el("rect", { x: -135, y: -h, width: 270, height: h, rx: 7, fill: "url(#pat-paper)" }, body);
      const st = K.el("rect", { x: -135, y: -h, width: 14, height: h, rx: 4, fill: col }, body);
      const tx = K.text(body, -108, -24, name, { size: 32, weight: 700, anchor: "start" });
      tx.setAttribute("data-layout-allow-overlap", "true");
      return { wrap, shift, body, r, st, h, bottom, name };
    };
    const mkStack = (pan, specs, col) => {
      const grp = K.g(pan.g, { opacity: 0 });
      let b = 0;
      const blocks = specs.map(([n, h]) => { const k = mkBlock(grp, n, b, h, col); b += h; return k; });
      return { grp, blocks, top: b };
    };
    const L_SPEC = [["Cash", 56], ["Bank", 56], ["Drawings", 50], ["Rent", 50]];
    const R_SPEC = [["Capital", 56], ["Sales", 56], ["Gopal Dairy", 50]];
    const sets = [0, 1, 2].map(() => ({ L: mkStack(rig.pans.L, L_SPEC, C.dr), R: mkStack(rig.pans.R, R_SPEC, C.cr) }));
    const grow = (tl_, t, blk, dh, dur = 0.5) => {      // block's top edge moves by dh (px local)
      const h2 = blk.h + dh;
      [blk.r, blk.st].forEach((e) => tl_.to(e, { attr: { y: -h2, height: h2 }, duration: dur, ease: "power2.inOut" }, t));
      blk.h = h2;
    };
    const shiftBy = (tl_, t, blk, dy, dur = 0.5) => tl_.to(blk.shift, { y: dy, duration: dur, ease: "power2.inOut" }, t);

    // ---------------------------------------------------------------- result glyphs (bottom row) + step numbers
    const glyph = (x) => { const n = L.node(svg, x, 1008, 1.4); L.hide(n); return n; };
    const g1 = glyph(760), g2 = glyph(960), g3 = glyph(1170);
    K.el("path", { d: K.cutRect(-46, -34, 92, 68, 1, 14), fill: "none", stroke: C.ink, "stroke-width": 5, "stroke-dasharray": "14 10", opacity: 0.7 }, g1);
    L.cross(g1, 40, -32, 22);
    K.medallion(g2, -42, 0, 30, "banknote"); K.medallion(g2, 42, 0, 30, "landmark");
    K.arrowShape(g2, -42, -52, 36, C.leaf, 1, -90, 14); K.arrowShape(g2, 42, 52, 36, C.coral, 1, 90, 14);
    L.cross(g2, 82, -32, 22);
    K.arrowShape(g3, 0, -12, 90, C.dr, 1, 0, 18); K.arrowShape(g3, 0, 22, 90, C.cr, -1, 0, 18);
    L.cross(g3, 62, -34, 22);
    const nums = [800, 960, 1120].map((x, i) => { const n = L.num(svg, x, 190, i + 1, 36); n.setAttribute("opacity", "0"); return n; });

    // ---------------------------------------------------------------- s05a/b props: the check, "?" and Khata's stamp
    const chk = L.tick(svg, 960, 250, 56); L.hide(chk);
    const q = L.node(svg, 1100, 250); L.hide(q); K.qmark(q, 0, 0, 1.2, C.cream);
    const khata = K.khataRig(svg, 1840, 1062, 0.42, { expr: "awake" });

    // ---------------------------------------------------------------- vignette 1 art: Meera with a note bundle + a slip that blows away
    const m = K.meera(svg, 190, 1055, 0.42, { expr: "happy" });
    const bnd = K.g(m.handAnchor("R"), {}); K.bundle(bnd, 0, 8, 0.5, 0); K.holdProp(m, "R", bnd, [12, 8]);
    const slip1 = L.node(svg, 420, 960); L.hide(slip1); K.slip(slip1, 0, 0, 1.0, -6, "wallet");
    const wind = K.windLines ? K.windLines(svg, 300, 930, 1, { n: 3, len: 240, dir: 1 }) : null;
    m.g.setAttribute("opacity", "0");

    // ---------------------------------------------------------------- vignette 2 art: Priya + phone, the Bank medallion, the galla, one UPI coin
    const pri = K.priya(svg, 1700, 1055, 0.4, { expr: "happy" }); pri.g.setAttribute("opacity", "0");
    const bank = L.node(svg, 1320, 880); L.hide(bank); K.medallion(bank, 0, 0, 46, "landmark");
    const gal = L.node(svg, 1450, 1058); L.hide(gal); K.galla(gal, 0, 0, 0.5);
    const coin = L.node(svg, 1650, 900); L.hide(coin); K.coin(coin, 0, 0, 24);

    // ---------------------------------------------------------------- vignette 3 art: the rent slip, flips Dr/Cr
    const rs = L.node(svg, 350, 900, 1.25); L.hide(rs);
    const mkFace = (leftCol, rightCol, leftT, rightT) => {
      const f = K.g(rs, {});
      K.tex(K.shadow(f, 2), K.cutRect(-170, -78, 340, 156, 1.6, 20), "pat-paper");
      K.medallion(f, 0, -34, 26, "key");
      [[-90, leftCol, leftT], [90, rightCol, rightT]].forEach(([x, col, t]) => { K.paper(f, K.cutRect(x - 66, 4, 132, 56, 1, 14), col); K.text(f, x, 34, t, { size: 38, weight: 800, color: "#fff" }); });
      return f;
    };
    const rF = mkFace(C.dr, C.cr, "Rent", "Cash"), rB = mkFace(C.dr, C.cr, "Cash", "Rent");
    gsap.set(rB, { scaleX: 0, svgOrigin: O });
    const dr = L.node(rs, -90, -62), cr = L.node(rs, 90, -62);
    K.text(dr, 0, 0, "Dr", { size: 34, weight: 800, color: C.drText }); K.text(cr, 0, 0, "Cr", { size: 34, weight: 800, color: C.crText });
    L.allow(svg);

    // ======================================================================================= timeline
    khata.jitter(tl, T0, sc.end); khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 20); pri.jitter(tl, T0, sc.end); m.jitter(tl, T0, sc.end);
    // s05a — a level scale (the sheet balances)
    rig.enter(tl, T0 + 0.35, { dur: 0.45 });
    L.drop(tl, sets[0].L.grp, T0 + 0.8, { dur: 0.35 }); L.drop(tl, sets[0].R.grp, T0 + 0.9, { dur: 0.35 });
    rig.levelFlash(tl, cue("s05a", "@balances"));
    L.drop(tl, chk, cue("s05a", "@balances") + 0.2, { dur: 0.35 });
    L.drop(tl, q, cue("s05a", "@right") - 0.1, { dur: 0.3 });
    // s05b — "नहीं।" Khata stamps the red x on the check
    const tN = cue("s05b", "@nope");
    khata.arm(tl, tN - 0.25, "L", 120, 0.2); khata.expr(tl, tN - 0.2, "wink");
    const stamp = K.stamp(tl, svg, 960, 262, tN, 1.1, { rot: -8 });
    khata.arm(tl, tN + 0.3, "L", 15, 0.3);
    L.lift(tl, q, tN, { dur: 0.2 });
    // the three vignettes are announced by their numbers
    const showNum = (i, t) => { tl.to(nums[i], { opacity: 1, duration: 0.2 }, t); if (i > 0) tl.to(nums[i - 1], { opacity: 0.4, duration: 0.2 }, t); };
    L.lift(tl, chk, cue("s05b", "@three") - 0.2, { dur: 0.2 }); stamp.lift(tl, cue("s05b", "@three") - 0.2);

    // ---- 1 · forgotten: the ₹3,000 she took home never gets written — Drawings gone, Cash taller, beam still
    const S1 = sets[0], v1 = cue("s05c", "@one");
    showNum(0, v1);
    tl.fromTo(m.g, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: false }, v1);
    L.drop(tl, slip1, cue("s05c", "@forget") + 0.3, { dur: 0.3 });
    m.look(tl, cue("s05c", "@three"), 6, 0);
    const tHome = cue("s05c", "@home");
    m.walkTo(tl, tHome, -240, 1.4);
    if (wind) wind.gust(tl, tHome + 0.2, { dur: 1.0, dist: 900 });
    tl.to(slip1, { x: 900, y: -140, rotation: 40, opacity: 0, duration: 1.1, ease: "power1.in" }, tHome + 0.3);
    const tMiss = cue("s05c", "@missing");
    grow(tl, tMiss, S1.L.blocks[0], 20, 0.5);
    shiftBy(tl, tMiss, S1.L.blocks[1], -20, 0.5);
    L.lift(tl, S1.L.blocks[2].body, tMiss, { dur: 0.25 });                    // Drawings leaves…
    shiftBy(tl, tMiss, S1.L.blocks[3], 30, 0.5);                              // …Rent closes the gap (−50 +… net: Cash grew 20, Drawings gone 50)
    rig.levelFlash(tl, tMiss + 0.7);
    L.drop(tl, g1, cue("s05c", "@match") + 0.1, { dur: 0.3 });

    // ---- 2 · wrong account: Infotech's ₹4,000 by UPI goes into Cash instead of Bank
    const S2 = sets[1];
    const tTwo = cue("s05d", "@two");
    showNum(1, tTwo);
    L.lift(tl, S1.L.grp, tTwo, { dur: 0.3 }); L.lift(tl, S1.R.grp, tTwo, { dur: 0.3 });
    L.drop(tl, S2.L.grp, tTwo + 0.2, { dur: 0.35 }); L.drop(tl, S2.R.grp, tTwo + 0.3, { dur: 0.35 });
    tl.to(m.g, { opacity: 0, duration: 0.2 }, tTwo - 0.2);
    const tAcc = cue("s05d", "@account");
    tl.fromTo(pri.g, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: false }, tAcc);
    L.drop(tl, bank, tAcc + 0.1, { dur: 0.35 }); L.drop(tl, gal, tAcc + 0.2, { dur: 0.35 });
    const tUpi = cue("s05d", "@upi");
    pri.point(tl, tUpi - 0.1, "L", 80); L.drop(tl, coin, tUpi, { dur: 0.25 });
    tl.to(coin, { x: -230, y: -40, duration: 0.5, ease: "power1.out" }, tUpi + 0.2);          // flies toward the Bank…
    const tCash = cue("s05d", "@cash");
    tl.to(coin, { x: -220, y: 150, duration: 0.5, ease: "power2.in" }, tCash - 0.1);           // …and drops into the galla instead
    tl.to(coin, { opacity: 0, duration: 0.15 }, tCash + 0.45);
    const tHigh = cue("s05d", "@high");
    grow(tl, tHigh, S2.L.blocks[0], 16, 0.5);                                 // Cash grows 16…
    shiftBy(tl, tHigh, S2.L.blocks[1], -16, 0.5); grow(tl, tHigh, S2.L.blocks[1], -16, 0.5);   // …Bank's bottom rides up, its top stays: Bank shrinks 16
    rig.levelFlash(tl, cue("s05d", "@level"));
    L.drop(tl, g2, cue("s05d", "@level") + 0.5, { dur: 0.3 });

    // ---- 3 · backwards: rent debited to Cash, credited to Rent — both columns grow to ₹1,41,000, still level
    const S3 = sets[2];
    const tThree = cue("s05e", "@three");
    showNum(2, tThree);
    L.lift(tl, S2.L.grp, tThree, { dur: 0.3 }); L.lift(tl, S2.R.grp, tThree, { dur: 0.3 });
    tl.to(pri.g, { opacity: 0, duration: 0.2 }, tThree - 0.1); L.lift(tl, bank, tThree, { dur: 0.2 }); L.lift(tl, gal, tThree, { dur: 0.2 });
    L.drop(tl, S3.L.grp, tThree + 0.2, { dur: 0.35 }); L.drop(tl, S3.R.grp, tThree + 0.3, { dur: 0.35 });
    const tBw = cue("s05e", "@backwards");
    L.drop(tl, rs, tBw - 0.3, { dur: 0.4 });
    L.drop(tl, dr, tBw + 1.0, { dur: 0.25 }); L.drop(tl, cr, tBw + 1.0, { dur: 0.25 });
    const tDeb = cue("s05e", "@credit") + 0.5;
    L.flip(tl, rF, rB, tDeb, 0.4);                                                             // the slip flips: Dr/Cr swap sides
    const tL = cue("s05e", "@lakh");
    // the Rent block leaves the Debit pan and drops into the Credit pan; Cash grows; both chips tick together
    const rentL = S3.L.blocks[3];
    L.lift(tl, rentL.body, tL - 0.2, { dur: 0.25 });
    grow(tl, tL, S3.L.blocks[0], 22, 0.5);
    shiftBy(tl, tL, S3.L.blocks[1], -22, 0.5); shiftBy(tl, tL, S3.L.blocks[2], -22, 0.5);
    const rentR = mkBlock(S3.R.grp, "Rent", S3.R.top, 50, C.cr); L.hide(rentR.body);
    L.drop(tl, rentR.body, tL + 0.1, { dur: 0.35 });
    rig.setTotals(tl, cue("s05e", "@each") - 0.2, 141000, 141000, { dur: 0.8 });
    rig.levelFlash(tl, cue("s05e", "@level"));
    L.drop(tl, g3, cue("s05e", "@wrong") - 0.1, { dur: 0.3 });
  };
})();
