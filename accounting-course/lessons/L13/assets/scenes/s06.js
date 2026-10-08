// s06 — The scale settles · read the photo. The Taraazu (L3's device, once in this lesson): assets ₹1,06,700 on the left pan; liabilities ₹35,000 then equity ₹71,700 land on the right; it settles level.
// "That's the Balance Sheet" → the scale snaps into the finished two-column polaroid (30 Apr, ₹1,06,700 both) — held still ≥ 1.5 s (L14 reuses it) — Khata steps out beside it.
// s06b reads the photo: ≈⅓ owed / ≈⅔ Meera's (a proportion bar), Equipment = Fixed, the other four = Current.
(function () {
  const SPEC = {
    L: [["Equipment", 35000, "cart"], ["Stock", 4000, "leaf"], ["Infotech", 6000, null, "infotech"], ["Bank", 11000, "landmark"], ["Cash", 50700, "banknote"]],
    R: [["Loan from Ravi Mama", 27000, null, "ravi"], ["Gopal Dairy", 3000, null, "gopal"], ["Advance", 4000, null, "customer"], ["Electricity payable", 1000, null, "electricity"], ["Equity", 71700, "equity"]],
  };
  window.L13.SPEC_BS = SPEC;

  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    const cam = K.g(svg, {});
    L13.stage(cam, C.sky, 880);
    const rig = K.scaleRig(cam, 960, 1005, 1.2, { tint: true, L: 0, R: 0 });
    // paper blocks stacked on the pans (origin = bottom centre of the block, grows up)
    const block = (pan, y0, h, col, label, value) => {
      const n = L13.node(pan.g, 0, y0); L13.hide(n);
      K.paper(K.shadow(n, 1), K.cutRect(-146, -h, 292, h, 1.6, 18), col);
      K.text(n, 0, -h + 30, label, { size: 38, weight: 800, color: K.onColor(col) });
      const tk = K.ticker(n, 0, -h + 74, 1, { value: 0, size: 44, color: K.onColor(col) });
      return { n, tk, h };
    };
    const bA = block(rig.pans.L, 0, 300, C.dr, "Assets", 0);
    const bL = block(rig.pans.R, 0, 118, C.cr, "Liabilities", 0);
    const bE = block(rig.pans.R, -118, 214, "#f0a25c", "Equity", 0);
    L13.allow(svg);

    // ---- the finished polaroid (built here, exactly the object L14 reuses) + Khata stepping out + the ⅓/⅔ bar
    const PX = 920, PY = 500, PW = 1440, PH = 880;
    const printN = L13.node(cam, PX, PY); L13.hide(printN);
    const pr = L13.printBS(printN, 0, 0, PW, PH, { spec: SPEC });
    const rowEls = [...pr.rows.L, ...pr.rows.R].map((r) => r.g).concat([pr.totals.L.g, pr.totals.R.g]);
    rowEls.forEach(L13.hide);
    const khata = K.khataRig(cam, 105, 1020, 0.78, { expr: "awake", lookX: 4 }); khata.g.setAttribute("opacity", "0");
    // proportion bar (right of the print): top ≈⅓ wears the four creditor faces, bottom ≈⅔ Meera's face
    const bar = L13.node(cam, 1772, 500); L13.hide(bar);
    const BH = 636, topH = Math.round(BH / 3);
    K.paper(K.shadow(bar, 1), K.cutRect(-78, -BH / 2, 156, topH - 6, 1.6, 18), C.cr);
    K.paper(K.shadow(bar, 1), K.cutRect(-78, -BH / 2 + topH + 6, 156, BH - topH - 6, 1.6, 18), "#f0a25c");
    [["ravi", -34, -BH / 2 + 46], ["gopal", 34, -BH / 2 + 46], ["customer", -34, -BH / 2 + 112], ["electricity", 34, -BH / 2 + 112]].forEach(([w, x, y]) => {
      K.tex(K.shadow(bar, 1), K.cutEll(x, y, 26, 26, 0.6), "pat-paper"); K.faceArt(bar, w, 22).setAttribute("transform", `translate(${x} ${y + 4})`);
    });
    K.tex(K.shadow(bar, 1), K.cutEll(0, 60, 44, 44, 0.8), "pat-paper"); K.faceArt(bar, "meera", 38).setAttribute("transform", "translate(0 66)");
    const chipT = L13.node(bar, 0, -BH / 2 + topH / 2 + 36); L13.hide(chipT);
    K.paper(K.shadow(chipT, 1), K.cutRect(-62, -26, 124, 52, 1, 14), C.cream); K.text(chipT, 0, 2, "≈ ⅓", { size: 38, weight: 800 });
    const chipB = L13.node(bar, 0, BH / 2 - 80); L13.hide(chipB);
    K.paper(K.shadow(chipB, 1), K.cutRect(-62, -26, 124, 52, 1, 14), C.cream); K.text(chipB, 0, 2, "≈ ⅔", { size: 38, weight: 800 });
    // fixed / current (left column): divider under Equipment, chip `Fixed`; bracket + chip `Current`
    const colL = pr.cols.L, rh = 106;
    const rowY = (i) => colL.y + 8 + rh * (i + 0.5);
    const div = L13.node(printN, 0, 0); L13.hide(div);
    K.ink(div, [[colL.x + 12, rowY(0) + rh / 2], [colL.x + colL.w - 12, rowY(0) + rh / 2]], 5, C.ink);
    const fixed = L13.node(printN, colL.cx + 40, rowY(0)); L13.hide(fixed);
    K.paper(K.shadow(fixed, 1), K.cutRect(-70, -28, 140, 56, 1, 14), C.cream); K.text(fixed, 0, 2, "Fixed", { size: 38, weight: 800 });
    const brk = L13.node(printN, 0, 0); L13.hide(brk);
    K.ink(brk, [[colL.x + 8, rowY(1) - rh / 2 + 10], [colL.x + 8, rowY(4) + rh / 2 - 10]], 5, C.dr);
    K.ink(brk, [[colL.x + 8, rowY(1) - rh / 2 + 10], [colL.x + 26, rowY(1) - rh / 2 + 10]], 5, C.dr); K.ink(brk, [[colL.x + 8, rowY(4) + rh / 2 - 10], [colL.x + 26, rowY(4) + rh / 2 - 10]], 5, C.dr);
    const cur = L13.node(printN, colL.cx + 40, (rowY(2) + rowY(3)) / 2); L13.hide(cur);
    K.paper(K.shadow(cur, 1), K.cutRect(-88, -28, 176, 56, 1, 14), C.cream); K.text(cur, 0, 2, "Current", { size: 38, weight: 800 });
    L13.allow(svg);

    // ======================================================================== timeline
    // "the moment of truth" — the scale enters, assets land on the left pan (left-heavy)
    rig.enter(tl, T0 + 0.1);
    const tA = cue("s06", "@moment") + 0.3;
    rig.tint(tl, tA - 0.2, "both");
    L13.drop(tl, bA.n, tA); bA.tk.to(tl, tA + 0.1, 106700, 0.9); rig.setTotals(tl, tA + 0.1, 106700, undefined, { dur: 0.9 });
    rig.tilt(tl, tA + 0.15, 5.5, { dur: 0.8 });
    // "Liabilities, thirty-five thousand" → right pan dips a little
    const tLi = cue("s06", "@liabilities");
    L13.drop(tl, bL.n, tLi); bL.tk.to(tl, tLi + 0.1, 35000, 0.7); rig.setTotals(tl, tLi + 0.1, undefined, 35000, { dur: 0.7 });
    rig.tilt(tl, tLi + 0.1, 3.8, { dur: 0.7 });
    // "plus equity, seventy-one thousand seven hundred" → both on the right pan, almost level
    const tEq = cue("s06", "@equity");
    L13.drop(tl, bE.n, tEq - 0.1); bE.tk.to(tl, tEq, 71700, 0.9); rig.setTotals(tl, cue("s06", "@together"), undefined, 106700, { dur: 1.0 });
    rig.tilt(tl, tEq + 0.1, -1.6, { dur: 0.8 });
    rig.pulseTotal(tl, cue("s06", "@lakh") + 1.0, "both");
    // "exactly the same as the assets" — level, flash
    const tSame = cue("s06", "@same");
    rig.settle(tl, tSame - 0.1, { dur: 0.9, hold: 1.5 });
    rig.levelFlash(tl, tSame + 0.9);
    // "Remember the scale from Lesson 3? … it settles, one last time" — a slow push, one last (tiny) dip and settle
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 560" }, { scale: 1.04, svgOrigin: "960 560", duration: cue("s06", "@settles") - cue("s06", "@remember") + 1.0, ease: "power1.inOut", immediateRender: false }, cue("s06", "@remember") - 0.2);
    const tSet = cue("s06", "@settles") - 0.5;
    rig.tilt(tl, tSet - 0.6, 1.8, { dur: 0.5 }); rig.settle(tl, tSet, { dur: 0.8, hold: 1.5 });
    rig.levelFlash(tl, tSet + 0.9);
    // "Two sides, always equal. That's the Balance Sheet." → the scale snaps into the finished polaroid
    const tSnap = cue("s06", "@balance") - 0.15;
    tl.to(cam, { scale: 1, svgOrigin: "960 560", duration: 0.5, ease: "power2.inOut" }, tSnap - 0.2);
    rig.exit(tl, tSnap, { dur: 0.35 });
    tl.set(rig.g, { autoAlpha: 0 }, tSnap + 0.4);
    L13.drop(tl, printN, tSnap + 0.15, { dur: 0.5, from: 1.1 });
    rowEls.forEach((e, i) => L13.drop(tl, e, tSnap + 0.5 + i * 0.07, { dur: 0.25 }));
    // Khata (a character again) steps out beside the print
    tl.set(khata.g, { autoAlpha: 1 }, tSnap + 0.5);
    khata.hop(tl, tSnap + 0.55, { height: 50 }); khata.expr(tl, tSnap + 0.9, "happy");
    khata.jitter(tl, tSnap + 0.5, sc.end); khata.blink(tl, tSnap + 4).blink(tl, tSnap + 14).blink(tl, tSnap + 26);

    // ---- s06b: read the photo
    L13.drop(tl, bar, cue("s06b", "@third") - 0.5, { dur: 0.4 });
    L13.drop(tl, chipT, cue("s06b", "@third")); L13.drop(tl, chipB, cue("s06b", "@two-thirds"));
    khata.arm(tl, cue("s06b", "@read") - 0.1, "R", 40);
    const tFix = cue("s06b", "@fixed");
    L13.drop(tl, div, tFix - 0.3, { dur: 0.4 }); L13.drop(tl, fixed, tFix);
    const tCur = cue("s06b", "@current");
    L13.drop(tl, brk, tCur - 0.3, { dur: 0.4 }); L13.drop(tl, cur, tCur);
    khata.expr(tl, tCur + 1.0, "wink");
  };
})();
