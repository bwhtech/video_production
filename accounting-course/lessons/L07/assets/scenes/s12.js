// s12 — Checkpoint 3: Aman's Samosa Cart. Six wordless slips (icon + ₹ + corner id A2…A9) on a 3×2 board, Aman + his cart at the left, Aman's own scale as the
// corner HUD. "Pause the video" → THE checkpoint pause device (veil 30 %, centre saffron medallion, 3-2-1 ring, music hush). Then each slip FLIPS (fake scaleX) to its
// answer — two lines, icon-first tag chips — in sync with the VO, row by row (previous slips dim to 70 %). No score counter.
(function () {
  window.SCENES.s12 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const board = K.g(svg, {});

    // ---- Aman's scale as the HUD (top-left column), totals counting
    const rig = K.scaleRig(svg, 960, 895, 1.1, { tint: true, L: 20000, R: 20000, equation: false });
    K.jarRig(rig.pans.L.g, 0, 0, 0.9, { label: "Cash", contents: "coins", fill: 0.6, edge: C.dr });
    K.claimTag(rig.pans.R.g, 0, 0, 0.8, { face: "customer", size: 54 });
    rig.g.setAttribute("opacity", "0");
    rig.hud(tl, T0, true, { dur: 0.01, right: 1420, top: 140, text: 36 });
    tl.set(rig.g, { opacity: 1 }, T0 + 0.05);

    // ---- cast: banner, Aman, his cart, Khata (+ the gold seal for the end)
    const banner = K.checkpointBanner(svg, 262, 398, 0.4, 3, { hidden: true });
    const aman = K.aman(svg, 175, 1040, 0.78, { expr: "neutral" });
    const cart = K.samosaCart(svg, -300, 1035, 0.5);
    const khata = K.khataRig(svg, 700, 1060, 0.42, { expr: "awake" });
    const seal = L7.seal(svg, 800, 960, 40);

    // ---- the six slips
    const SX = [760, 1220, 1680], SY = [330, 700], SW = 440, SH = 350;
    const spec = [
      { id: "A2", amt: 10000, art: (n) => K.medallion(n, -120, 12, 66, "landmark"),
        L: ["Cash", 10000, "real_in"], R: ["Bank loan", 10000, "personal_giver"], tF: ["s12b", "@bank", 1, -0.15], t1: ["s12b", "@real", 1, 0], t2: ["s12b", "@personal", 1, 0] },
      { id: "A3", amt: 18000, art: (n) => K.medallion(n, -120, 12, 66, "shopping-cart"),
        L: ["Cart & fryer", 18000, "real_in"], R: ["Cash", 18000, "real_out"], tF: ["s12b", "@cart", 1, -0.15], t1: ["s12b", "@real", 2, 0], t2: ["s12b", "@real", 3, 0] },
      { id: "A5", amt: 9000, art: (n) => { const sm = K.g(n, { transform: "translate(-150 0)" }); K.paper(K.shadow(sm, 1), K.cutPoly([[-60, 50], [60, 50], [0, -56]], 3, 18), "#c98a3b"); K.ink(sm, [[-30, 20], [30, 20]], 5, "#8e5a22"); K.ink(sm, [[-14, -10], [14, -10]], 5, "#8e5a22"); K.coin(n, -62, 40, 24); K.coin(n, -30, 52, 20); },
        L: ["Cash", 9000, "real_in"], R: ["Sales", 9000, "nominal_income"], tF: ["s12b", "@cash", 3, -0.15], t1: ["s12b", "@cash", 4, 0.3], t2: ["s12b", "@nominal", 1, 0] },
      { id: "A6", amt: 2000, art: (n) => K.medallion(n, -120, 12, 66, "key"),
        L: ["Stall rent", 2000, "nominal_expense"], R: ["Cash", 2000, "real_out"], tF: ["s12c", "@rent", 1, -0.15], t1: ["s12c", "@nominal", 1, 0], t2: ["s12c", "@credit", 1, 0.3] },
      { id: "A7", amt: 1500, art: (n) => { K.medallion(n, -120, 12, 66, "school"); K.icon(n, "tag", -78, 56, 44, C.ink, 2.2); },
        L: ["School canteen", 1500, "personal_receiver"], R: ["Sales", 1500, "nominal_income"], tF: ["s12c", "@school", 1, -0.15], t1: ["s12c", "@personal", 1, 0], t2: ["s12c", "@credit", 2, 0.3] },
      { id: "A9", amt: 1000, art: (n) => K.medallion(n, -120, 12, 66, "calendar-check"),
        L: ["Cash", 1000, "real_in"], R: ["Advance from customer", 1000, "personal_giver"], tF: ["s12c", "@birthday", 1, -0.15], t1: ["s12c", "@cash", 2, 0.3], t2: ["s12c", "@giver", 1, 0] },
    ];
    const slips = spec.map((s, i) => {
      const pos = L7.node(board, SX[i % 3], SY[Math.floor(i / 3)]), n = K.g(pos, {}); L7.hide(n);
      const F = K.g(n, {}), B = K.g(n, {});
      K.tex(K.shadow(F, 2), K.cutRect(-SW / 2, -SH / 2, SW, SH, 2, 24), "pat-paper");
      K.paper(F, K.cutRect(-SW / 2 + 12, -SH / 2 + 12, 92, 52, 1, 14), C.saffron); K.text(F, -SW / 2 + 58, -SH / 2 + 40, s.id, { size: 40, weight: 800 });
      s.art(F);
      const tk = K.ticker(F, 84, 18, 1, { value: 0, size: 66, anchor: "middle" });
      // ---- answer face
      K.tex(K.shadow(B, 2), K.cutRect(-SW / 2, -SH / 2, SW, SH, 2, 24), "pat-paper");
      K.paper(B, K.cutRect(-SW / 2 + 12, -SH / 2 + 12, 92, 52, 1, 14), C.saffron); K.text(B, -SW / 2 + 58, -SH / 2 + 40, s.id, { size: 40, weight: 800 });
      const chips = [s.L, s.R].map(([name, amt, key], k) => {
        const y0 = -66 + k * 126, col = k === 0 ? C.dr : C.cr;
        K.paper(B, K.cutRect(-SW / 2 + 14, y0 - 28, 10, 100, 0.6, 12), col);
        K.text(B, -SW / 2 + 40, y0, name, { size: 36, weight: 700, anchor: "start" });
        K.text(B, -SW / 2 + 40, y0 + 52, K.fmtINR(amt), { size: 44, weight: 800, anchor: "start", color: k === 0 ? C.drText : C.crText });
        return L7.tagChip(B, 100, y0 + 54, key, { s: 0.74 });
      });
      L7.allow(B);
      gsap.set(B, { scaleX: 0, svgOrigin: O });
      return { pos, n, F, B, tk, chips, s, i };
    });
    // ---- veil + the pause device (above everything but the calendar)
    const veil = K.el("rect", { x: -60, y: -60, width: 2040, height: 1200, fill: C.cream, style: "opacity:0" }, svg);
    const pm = K.pauseMedallion(svg, 960, 540, 0.9, { hidden: true });
    const wk = L7.node(svg, 960, 810); L7.hide(wk); L7.card(wk, 380, 130); K.medallion(wk, 0, 0, 48, "file-text");
    L7.allow(svg);

    // ======================================================================================= timeline
    aman.blinks(tl, T0 + 1.2, sc.end, 3.3); aman.jitter(tl, T0, sc.end); khata.blink(tl, T0 + 4); khata.blink(tl, T0 + 33);
    // "And now, Checkpoint three." — banner drops, Aman waves
    const tCp = cue("s12a", "@checkpoint");
    banner.enter(tl, tCp - 0.1); aman.expr(tl, tCp, "grin"); aman.wave(tl, tCp + 0.2, "R", 2);
    // "Here are six of Aman's transactions." — the cart rolls in and sizzles; the slips pin on, 0.12 s apart
    const tSix = cue("s12a", "@six");
    cart.moveTo(tl, tSix - 0.2, 395, 1.5); cart.sizzle(tl, tSix + 1.0, segEnd("s12a") + 3.2);
    slips.forEach((sl, i) => { const t = cue("s12a", "@transactions") - 0.3 + i * 0.12; L7.drop(tl, sl.n, t, { dur: 0.3 }); sl.tk.to(tl, t + 0.1, sl.s.amt, 0.6); });
    aman.look(tl, cue("s12a", "@debit"), 6, 0);
    // "Pause the video" — THE checkpoint pause device (veil 30 %, saffron medallion, worksheet card; the 3-2-1 ring drains over the 3.0 s hold)
    const tPause = cue("s12a", "@pause");
    tl.to(veil, { opacity: 0.3, duration: 0.25, ease: "none" }, tPause - 0.1);
    pm.enter(tl, tPause); L7.drop(tl, wk, tPause + 0.25);
    pm.countdown(tl, segEnd("s12a"), { dur: 3.0 });
    aman.expr(tl, tPause, "happy");
    // the veil lifts
    const tDone = segStart("s12b") - 0.1;
    tl.to(veil, { opacity: 0, duration: 0.3, ease: "power1.inOut" }, tDone);
    pm.exit(tl, tDone); L7.lift(tl, wk, tDone);
    aman.hop(tl, segStart("s12b"), { height: 40 });
    // answers, slip by slip
    const T = (a) => cue(a[0], a[1], a[2]) + a[3];
    const totals = [[30000], [30000], [39000], [39000], [40500], [41500]];
    slips.forEach((sl, i) => {
      const s = sl.s, tF = T(s.tF);
      if (i > 0) tl.to(slips[i - 1].n, { opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, tF - 0.05);
      tl.to(sl.F, { scaleX: 0, svgOrigin: O, duration: 0.14, ease: "power2.in" }, tF);
      tl.to(sl.B, { scaleX: 1, svgOrigin: O, duration: 0.18, ease: "power2.out" }, tF + 0.14);
      L7.drop(tl, sl.chips[0].n, T(s.t1), { dur: 0.28 }); L7.drop(tl, sl.chips[1].n, T(s.t2), { dur: 0.28 });
      rig.setTotals(tl, tF + 0.3, totals[i][0], totals[i][0], { dur: 0.5 });
      if (i !== 1 && i !== 3) rig.pulseTotal(tl, tF + 0.3, "both"); else rig.levelFlash(tl, tF + 0.3);
    });
    // "How many did you get?" — Aman's thumbs-up, Khata holds up a gold seal; "rise_three" (sfx)
    const tHow = cue("s12c", "@many");
    aman.expr(tl, tHow, "joy"); aman.arm(tl, tHow, "R", 150, 12, 0.35); aman.arm(tl, tHow + 1.6, "R", 12, 8, 0.4);
    khata.arm(tl, tHow, "R", 125, 0.3).expr(tl, tHow, "happy"); L7.drop(tl, seal, tHow + 0.1, { dur: 0.35 });
    // exit: Aman waves, the cart rolls out right
    const tOut = sc.end - 1.3;
    tl.to(board, { opacity: 0, duration: 0.4, ease: "power1.in" }, tOut - 0.3); aman.wave(tl, tOut - 0.2, "R", 2); cart.moveTo(tl, tOut, 2300, 1.2);
  };
})();
