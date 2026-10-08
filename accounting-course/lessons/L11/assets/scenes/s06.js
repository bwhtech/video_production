// s06 — The ₹5,000 hunt (faded). Meera pays Gopal Dairy ₹5,000 but posts only the Cash half: the trial balance disagrees (₹1,36,000 | ₹1,41,000, off by exactly ₹5,000) — the ONLY scene where the
// scale stays tipped (toward Credit). The difference is a clue: the 20 journal slips fan out face-down (3-2-1 ring during the 2.6 s gap); two flip face-up and glow (Rent ₹5,000 · Gopal Dairy ₹5,000);
// the Rent page is fine, the Gopal Dairy page still says ₹8,000 owed with an empty ₹5,000 slot on the Debit side; Meera writes it in -> ₹3,000, the totals meet, the scale settles level.
// Out: default torn-paper wipe into s07.
(function () {
  window.SCENES.s06 = ({ svg, tl, K, sc }) => {
    const C = K.C, L = window.L11, O = "0 0", T0 = sc.start;
    L.stage(svg, C.teal, 880);
    const cal = L.cal(svg, 30);

    // ---------------------------------------------------------------- the scale (left)
    const rig = K.scaleRig(svg, 480, 925, 0.82, { L: 136000, R: 136000, equation: false, tint: true });
    const left = rig.pans.L.g, right = rig.pans.R.g;
    // block of the Gopal payment's Cash half that lands on the right pan
    const half = K.g(right, { opacity: 0 });
    K.paper(K.shadow(half, 1), K.cutRect(-120, -64, 240, 60, 1, 14), C.cr);
    K.text(half, -86, -34, "Cash", { size: 34, weight: 800, color: "#fff", anchor: "start" });
    K.text(half, 92, -34, "5,000", { size: 34, weight: 800, color: "#fff", anchor: "end" });
    const dbase = K.g(left, { opacity: 0 });                                 // the missing Debit half: a dashed ghost on the left pan
    K.el("path", { d: K.cutRect(-120, -64, 240, 60, 1, 14), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "12 10", opacity: 0.6 }, dbase);
    K.text(dbase, -86, -34, "Gopal", { size: 30, weight: 700, anchor: "start" });
    // the difference chip (between the totals chips)
    const diff = L.node(svg, 480, 690); L.hide(diff);
    K.paper(K.shadow(diff, 2), K.cutRect(-170, -42, 340, 84, 1.6, 22), C.coral);
    K.medallion(diff, -126, 0, 28, "search", C.cream);
    const dTk = K.ticker(diff, 130, 3, 1, { value: 0, size: 54, weight: 800, anchor: "end", color: C.white });
    // the Gopal slip (story) at the top of the right area: Dr Gopal Dairy | Cr Cash
    const gs = L.node(svg, 1450, 330, 1.45); L.hide(gs);
    K.tex(K.shadow(gs, 2), K.cutRect(-190, -70, 380, 140, 1.6, 20), "pat-paper");
    K.medallion(gs, -150, -4, 30, "milk");
    K.paper(gs, K.cutRect(-100, -36, 110, 60, 1, 14), C.dr); K.text(gs, -45, -6, "Dr", { size: 34, weight: 800, color: "#fff" });
    K.paper(gs, K.cutRect(18, -36, 110, 60, 1, 14), C.cr); K.text(gs, 73, -6, "Cr", { size: 34, weight: 800, color: "#fff" });
    K.text(gs, 0, 50, "₹5,000", { size: 36, weight: 800 });

    // ---------------------------------------------------------------- the 20 slips, face-down fan (right area, y ~ 200-330); two are pulled out and flipped at the reveal
    const FX = 1470, FY = 590, FR = 335, N = 20, SPECIAL = { 5: ["Rent", "key", 1290], 13: ["Gopal Dairy", "milk", 1680] };
    const fan = K.g(svg, {});
    const slips = [];
    for (let i = 0; i < N; i++) {
      const th = ((-62 + (124 * i) / (N - 1)) * Math.PI) / 180, px = FX + FR * Math.sin(th), py = FY - FR * Math.cos(th), rot = (th * 180) / Math.PI;
      const pos = K.g(fan, { transform: `translate(${px} ${py})` });
      const mv = K.g(pos, {}), rn = K.g(mv, {}), n = K.g(rn, {}); L.hide(n);
      gsap.set(rn, { rotation: rot, svgOrigin: O });
      const F = K.g(n, {}), B = K.g(n, {});
      const alt = i % 2 === 0;
      K.tex(K.shadow(B, 1), K.cutRect(-30, -23, 60, 46, 1.2, 14), alt ? "pat-kraft" : "pat-paper");
      K.el("path", { d: K.cutRect(-30, -23, 60, 46, 1.2, 14), fill: "none", stroke: alt ? "#6e4422" : "#7e211b", "stroke-width": 2.5, opacity: 0.9 }, B);
      K.ink(B, [[-17, -7], [17, -7]], 3, alt ? "#8a6a44" : C.red); K.ink(B, [[-17, 8], [6, 8]], 3, alt ? "#8a6a44" : C.red);
      const sp = SPECIAL[i];
      let ring = null;
      if (sp) {
        K.tex(K.shadow(F, 2), K.cutRect(-38, -28, 76, 56, 0.8, 12), "pat-paper"); K.medallion(F, -22, -9, 10, sp[1]);
        K.text(F, 12, -9, "₹5,000", { size: 14, weight: 800 }); K.text(F, 0, 14, sp[0], { size: 14, weight: 700 });
        ring = K.el("path", { d: K.cutRect(-40, -30, 80, 60, 0.6, 12), fill: "none", stroke: C.gold, "stroke-width": 4, "stroke-linejoin": "round", opacity: 0 }, F);
        gsap.set(F, { scaleX: 0, svgOrigin: O });
      }
      slips.push({ pos, mv, rn, n, F, B, ring, sp, px, py, rot });
    }
    const pm = K.pauseMedallion(svg, FX, 470, 0.42, { hidden: true });

    // ---------------------------------------------------------------- the two T-pages (bottom right)
    const tPage = (x, y, name, icon) => {
      const n = L.node(svg, x, y); L.hide(n); const W = 360, H = 400;
      L.card(n, W, H);
      K.paper(n, K.cutRect(-W / 2 + 8, -H / 2 + 8, W - 16, 64, 1, 16), C.red);
      K.text(n, 0, -H / 2 + 42, name, { size: 38, weight: 800, color: C.cream });
      K.paper(n, K.cutRect(-W / 2 + 14, -H / 2 + 84, W / 2 - 18, 46, 0.8, 14), C.dr); K.text(n, -W / 4 - 2, -H / 2 + 109, "Dr", { size: 34, weight: 800, color: "#fff" });
      K.paper(n, K.cutRect(4, -H / 2 + 84, W / 2 - 18, 46, 0.8, 14), C.cr); K.text(n, W / 4 + 2, -H / 2 + 109, "Cr", { size: 34, weight: 800, color: "#fff" });
      K.ink(n, [[0, -H / 2 + 84], [0, H / 2 - 100]], 3, C.ink, { opacity: 0.5 });
      return { n, W, H, dx: -W / 4 - 2, cx: W / 4 + 2, y0: -H / 2 + 172 };
    };
    const pr = tPage(1290, 840, "Rent", "key"), pg = tPage(1680, 840, "Gopal Dairy", "milk");
    // Rent page: Dr ₹5,000 + a check
    const rAmt = K.ticker(pr.n, pr.dx, pr.y0, 1, { value: 0, size: 42, weight: 800, color: C.drText });
    const rTick = L.tick(pr.n, 0, 100, 30); L.hide(rTick);
    // Gopal Dairy page: Cr ₹8,000 (T5), the empty Dr slot (dashed), the balance chip
    const gAmt = K.ticker(pg.n, pg.cx, pg.y0, 1, { value: 0, size: 42, weight: 800, color: C.crText });
    const slot = L.node(pg.n, pg.dx, pg.y0); L.hide(slot);
    K.el("path", { d: K.cutRect(-86, -30, 172, 60, 1, 14), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "12 10", opacity: 0.6 }, slot);
    K.text(slot, 0, 2, "₹5,000", { size: 34, weight: 700, color: C.ink }).setAttribute("opacity", "0.45");
    const slotFill = L.node(pg.n, pg.dx, pg.y0); L.hide(slotFill);
    const sfT = K.text(slotFill, 0, 2, "₹5,000", { size: 42, weight: 800, color: C.drText });
    const bal = L.node(pg.n, 0, 150); L.hide(bal);
    const balTk = K.ticker(bal, 0, 0, 1, { value: 0, size: 44, chip: true, w: 250, h: 72, edge: C.cr });
    // Meera with the magnifier (far left)
    const m = K.meera(svg, 120, 1055, 0.42, { expr: "puzzled" });
    const mag = K.magnifier(null, 0, 0, 0.42, { hold: { rig: m, side: "R", rest: [20, 70] }, hidden: true });
    L.allow(svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1, sc.end, 3.3); m.jitter(tl, T0, sc.end);
    // s06a — what can it catch? One half posted: the columns disagree
    rig.enter(tl, T0 + 0.3, { dur: 0.45 });
    const tG = cue("s06a", "@gopal");
    L.drop(tl, gs, tG - 0.2, { dur: 0.4 });
    const tH = cue("s06a", "@half");
    L.drop(tl, half, tH, { dur: 0.35 });                                   // the Cash half lands on the right pan…
    rig.setTotals(tl, tH + 0.1, undefined, 141000, { dur: 0.7 });
    tl.to(gs, { opacity: 0.55, duration: 0.3 }, tH + 0.3);
    L.lift(tl, gs, cue("s06b", "@clue") - 0.3, { dur: 0.3 });
    L.drop(tl, dbase, tH + 0.3, { dur: 0.3 });                              // …the Debit half never gets posted (dashed ghost on the left pan)
    const tD = cue("s06a", "@disagree");
    rig.tilt(tl, tD, -4, { dur: 0.9 });
    m.expr(tl, tD, "worried");
    rig.pulseTotal(tl, cue("s06a", "@left"), "L"); rig.pulseTotal(tl, cue("s06a", "@right"), "R");
    const tE = cue("s06a", "@exactly");
    L.drop(tl, diff, tE - 0.1, { dur: 0.4 }); dTk.to(tl, tE, 5000, 0.7);
    // s06b — the difference is a clue; Meera searches April's entries of exactly ₹5,000: 20 slips fan out face-down
    const tC = cue("s06b", "@clue");
    mag.enter(tl, tC - 0.1); m.arm(tl, tC, "R", 78, 54, 0.35); m.expr(tl, tC, "thinking");
    const tEn = cue("s06b", "@entries");
    slips.forEach((s, i) => L.drop(tl, s.n, tEn - 0.1 + i * 0.05, { dur: 0.3 }));
    mag.sweep(tl, tEn + 0.4, [[10, -8], [-6, 12]], { dur: 0.5, hold: 0.2 });
    pm.enter(tl, segEnd("s06b") - 0.1); pm.countdown(tl, segEnd("s06b"), { dur: 2.5 });
    const tTwo = cue("s06b", "@two");
    m.arm(tl, segEnd("s06b"), "R", 20, 70, 0.3);
    // s06c — two slips flip face-up and glow; the pages check out one at a time
    pm.exit(tl, segEnd("s06b") + 2.6);
    const flipSlip = (i, t) => {
      const s = slips[i];
      tl.to(s.mv, { x: s.sp[2] - s.px, y: 485 - s.py, scale: 2.5, duration: 0.45, ease: "power2.inOut" }, t); tl.to(s.rn, { rotation: 0, svgOrigin: O, duration: 0.45, ease: "power2.inOut" }, t);    // pulled out of the fan to its reveal spot
      L.flip(tl, s.B, s.F, t + 0.3, 0.34); tl.to(s.ring, { opacity: 1, duration: 0.15 }, t + 0.65);
      tl.to(s.ring, { opacity: 0, duration: 0.3 }, t + 2.2); K.pulseNode(tl, s.n, t + 0.64, 1.06);
    };
    flipSlip(5, cue("s06c", "@rent") - 0.05);
    flipSlip(13, cue("s06c", "@gopal") - 0.05);
    const tPg = cue("s06c", "@page");
    L.drop(tl, pr.n, tPg - 0.2, { dur: 0.4 }); rAmt.to(tl, tPg + 0.2, 5000, 0.6); L.drop(tl, rTick, tPg + 0.9, { dur: 0.3 });
    const tG2 = cue("s06c", "@gopal", 2);
    L.drop(tl, pg.n, tG2 - 0.2, { dur: 0.4 }); gAmt.to(tl, tG2 + 0.3, 8000, 0.6);
    const tEi = cue("s06c", "@eight");
    L.drop(tl, bal, tEi - 0.1, { dur: 0.35 }); balTk.to(tl, tEi, 8000, 0.6);
    L.drop(tl, slot, tEi + 0.4, { dur: 0.3 });
    K.pulseNode(tl, slot, cue("s06c", "@arrived"), 1.1);
    // post it: Meera writes ₹5,000 into the Dr slot (stepped), the balance drops to ₹3,000, the totals meet, the scale settles level
    const tP = cue("s06c", "@post");
    m.arm(tl, tP - 0.1, "R", 85, 40, 0.3); m.expr(tl, tP, "grin");
    const wipeId = "s06w"; const cp = K.el("clipPath", { id: wipeId }, svg); const rc = K.el("rect", { x: -90, y: -34, width: 0, height: 68 }, cp);
    slotFill.setAttribute("clip-path", `url(#${wipeId})`);
    // (clip rect lives in the slotFill's user space? clipPath units = user space of the referencing element)
    L.drop(tl, slotFill, tP, { dur: 0.01 }); tl.to(slot, { opacity: 0, duration: 0.1 }, tP);
    tl.to(rc, { attr: { width: 180 }, duration: 0.5, ease: K.stepEase(0.5, "none", tP + 0.1) }, tP + 0.1);
    balTk.to(tl, tP + 0.7, 3000, 0.7);
    const tM = cue("s06c", "@meet");
    L.lift(tl, half, tM - 0.1, { dur: 0.25 }); L.lift(tl, dbase, tM - 0.1, { dur: 0.25 });
    rig.setTotals(tl, tM - 0.1, undefined, 136000, { dur: 0.7 });
    L.lift(tl, diff, tM - 0.1, { dur: 0.25 });
    rig.settle(tl, tM, { dur: 0.9, hold: 1.5 }); rig.levelFlash(tl, tM + 1.0);
    m.expr(tl, tM, "happy");
  };
})();
