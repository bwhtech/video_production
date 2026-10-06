// s03 — Checkpoint 1 solution: Aman's Samosa Cart. Four worksheet rows (A1–A4), each: two change chips + the equation + ✓.
// A mini scale beside the sheet never tips. Exit: the worksheet flips over — its back is a TORN-PAPER STILL of rent day, frozen
// just before the rent leaves — and the camera pushes into it until it fills the frame (s04's first frame, drawn identically).
(function () {
  window.OWN_SEAM_IN.s04 = true;          // s03 owns the hand-off into rent day (no wipe)

  window.SCENES.s03 = ({ svg, tl, K, sc }) => {
    const C = K.C, L4 = window.L4, O = "0 0";
    const T0 = sc.start;
    K.wall(svg, C.saffron, 880); K.table(svg, 880);
    // tone-on-tone skyline
    [[1470, 300, 150, 580], [1730, 380, 170, 500]].forEach(([x, y, w, h], i) => K.paper(svg, K.cutRect(x, y, w, h, 1.6, 24), i ? "#e39a30" : "#eba541"));

    // ---- Aman + his samosa cart (small, stage-left)
    const cart = K.samosaCart(svg, 125, 985, 0.52);
    const aman = K.aman(svg, 345, 985, 0.58, { expr: "happy" });

    // ---- the worksheet (centre)
    const SX = 900, SY = 535, SW = 880, SH = 860;
    const sheet = L4.node(svg, SX, SY);
    const flipG = K.g(sheet.inner, {});
    K.card(flipG, 0, 0, SW, SH, { shadow: 2 });
    const banner = L4.node(flipG, 0, -SH / 2 + 74, 0.84);
    K.checkpointBanner(banner.inner, 0, 0, 1, 1, {});
    const RY = [-SH / 2 + 232, -SH / 2 + 232 + 172, -SH / 2 + 232 + 344, -SH / 2 + 232 + 516];  // row centres (sheet-local)
    const rows = [
      { n: 1, icon: "coins", a: { name: "Cash", d: "+₹20,000", side: "L" }, b: { name: "Capital", d: "+₹20,000", side: "R" }, eq: [20000, 0, 20000] },
      { n: 2, icon: "landmark", a: { name: "Cash", d: "+₹10,000", side: "L" }, b: { name: "Bank loan", d: "+₹10,000", side: "R" }, eq: [30000, 10000, 20000] },
      { n: 3, icon: "shopping-cart", a: { name: "Cart & fryer", d: "+₹18,000", side: "L" }, b: { name: "Cash", d: "−₹18,000", side: "L" }, eq: [30000, 10000, 20000] },
      { n: 4, icon: "leaf", a: { name: "Ingredients stock", d: "+₹3,000", side: "L" }, b: { name: "Sharma Kirana", d: "+₹3,000", side: "R" }, eq: [33000, 13000, 20000] },
    ];
    const chipAt = (parent, x, y, spec) => {
      const n = L4.node(parent, x, y), col = spec.side === "R" ? C.cr : C.dr, W = 304, H = 92;
      K.paper(K.shadow(n.inner, 1), K.cutRect(-W / 2, -H / 2, W, H, 1.6, 22), col);
      const fg = spec.side === "R" ? C.ink : "#ffffff";
      K.text(n.inner, 0, -26, spec.name, { size: 30, weight: 700, color: fg });
      K.text(n.inner, 0, 22, spec.d, { size: 42, weight: 800, color: fg });
      n.outer.setAttribute("opacity", "0");
      return n;
    };
    const R = rows.map((r, i) => {
      const y = RY[i], g0 = K.g(flipG, {});
      const badge = L4.node(g0, -398, y - 28);
      K.paper(K.shadow(badge.inner, 1), K.cutEll(0, 0, 26, 26, 1.2), C.coral);
      K.text(badge.inner, 0, 2, String(r.n), { size: 34, weight: 800, color: "#ffffff" });
      const med = L4.node(g0, -330, y - 28);
      K.medallion(med.inner, 0, 0, 36, r.icon);
      const ca = chipAt(g0, -135, y - 28, r.a), cb = chipAt(g0, 182, y - 28, r.b);
      // equation: three tickers (left of = blue, right orange)
      const ey = y + 52, eqN = L4.node(g0, -8, ey);
      const t1 = K.ticker(eqN.inner, -190, 0, 1, { value: 0, size: 40, color: C.drText });
      const sEq = K.text(eqN.inner, -96, 3, "=", { size: 40, weight: 800 });
      const t2 = K.ticker(eqN.inner, 0, 0, 1, { value: 0, size: 40, color: C.crText });
      const sPl = K.text(eqN.inner, 96, 3, "+", { size: 40, weight: 800 });
      const t3 = K.ticker(eqN.inner, 190, 0, 1, { value: 0, size: 40, color: C.crText });
      [t1.body, t2.body, t3.body, sEq, sPl].forEach((e) => e.setAttribute("opacity", "0"));
      const ck = L4.node(g0, 392, y - 6);
      K.medallion(ck.inner, 0, 0, 30, "check", C.leaf, C.white);
      ck.outer.setAttribute("opacity", "0");
      [badge, med].forEach((n) => n.outer.setAttribute("opacity", "1"));
      return { r, g0, ca, cb, eq: [t1, t2, t3], sEq, sPl, ck, badge, med };
    });

    // ---- mini scale (right) — never tips
    const mini = K.scaleRig.mini(svg, 1640, 930, 0.44);
    K.icon(mini.slot.g, "coins", 0, 0, 74, C.ink, 2.4);
    K.jarRig(mini.pans.L.g, -34, 0, 0.8, { contents: "coins", fill: 0.7 });
    K.jarRig(mini.pans.L.g, 34, 0, 0.8, { contents: "cart", fill: 1 });
    K.claimTag(mini.pans.R.g, -34, 0, 0.58, { face: "ravi" });
    K.claimTag(mini.pans.R.g, 34, 0, 0.58, { face: "meera" });

    // ---- Khata peeks from the sheet's top-right corner
    const khata = K.khataRig(svg, 1480, 330, 0.36, { expr: "awake" });

    // ---- torn-paper still (rent day, frozen BEFORE the rent leaves) — NOT a polaroid
    // stillPos sits at the frame centre; `still` is moved/scaled about it; the 1920×1080 content is drawn offset by (−960,−540).
    const stillPos = K.g(svg, { transform: "translate(960 540)" });
    const stillT = K.g(stillPos, {});                       // x/y layer
    const still = K.g(stillT, {});                           // scale layer (about the frame centre)
    still.setAttribute("opacity", "0");
    const stillRot = K.g(still, {});
    const flipStill = K.g(stillRot, {});
    const shift = K.g(flipStill, { transform: "translate(-960 -540)" });
    K.paper(K.shadow(shift, 3), K.cutRect(-34, -34, 1988, 1148, 7, 34), C.cream);       // torn paper mat
    const clip = K.el("clipPath", { id: "s03-stillclip" }, svg);
    K.el("rect", { x: 0, y: 0, width: 1920, height: 1080 }, clip);
    const content = K.g(shift, { "clip-path": "url(#s03-stillclip)" });
    L4.preRent(content, K, tl, T0);

    // ================================================================================== timeline
    aman.blinks(tl, T0 + 1, sc.end, 3.2);
    khata.blink(tl, T0 + 2.2); khata.blink(tl, T0 + 14.5);
    const rowFx = () => {};                                        // (settled rows stay full-strength: dimming failed the contrast check)

    // row timing cues
    const tOneRow = [cue("s03a", "@one", 2), cue("s03a", "@two"), cue("s03b", "@three"), cue("s03b", "@four", 1)];
    const eqTimes = [
      [cue("s03a", "@twenty", 2), cue("s03a", "@equals"), cue("s03a", "@zero"), cue("s03a", "@plus"), cue("s03a", "@twenty", 3)],
      [cue("s03a", "@thirty"), cue("s03a", "@equals", 2), cue("s03a", "@ten"), cue("s03a", "@plus", 2), cue("s03a", "@twenty", 4)],
      [cue("s03b", "@totals"), cue("s03b", "@totals"), cue("s03b", "@totals"), cue("s03b", "@totals"), cue("s03b", "@totals")],
      [cue("s03b", "@thirty-three"), cue("s03b", "@equals"), cue("s03b", "@thirteen"), cue("s03b", "@plus"), cue("s03b", "@twenty")],
    ];
    const chipTimes = [
      [cue("s03a", "@cash"), cue("s03a", "@capital")],
      [cue("s03a", "@cash", 2), cue("s03a", "@liability")],
      [cue("s03b", "@cart"), cue("s03b", "@swap")],
      [cue("s03b", "@stock"), cue("s03b", "@owes")],
    ];
    const arrowKind = ["upup", "upup", "swapL", "upup"];
    let prevKind = null;
    R.forEach((row, i) => {
      const t1 = tOneRow[i];
      // number badge + icon pulse on "One." etc.
      K.pulseNode(tl, row.badge.inner, t1, 1.18); K.pulseNode(tl, row.med.inner, t1 + 0.1, 1.12);
      // change chips: drop-and-place on the VO words
      [row.ca, row.cb].forEach((c, k) => { const t = chipTimes[i][k]; L4.show(tl, c.outer, t); K.dropIn(tl, c.inner, t, { dur: 0.32 }); });
      // equation numbers tick on their words
      const [e1, e2, e3] = row.eq, tt = eqTimes[i];
      row.r.eq.forEach((v, k) => {
        const tk = [e1, e2, e3][k], tm = [tt[0], tt[2], tt[4]][k];
        K.dropIn(tl, tk.body, tm - 0.05, { dur: 0.25 }); tk.to(tl, tm, v, 0.6);
      });
      tl.set(row.sEq, { opacity: 1 }, tt[1]); tl.set(row.sPl, { opacity: 1 }, tt[3]);
      const tDone = Math.max(tt[4], tt[2]) + 0.75;
      L4.show(tl, row.ck.outer, tDone); K.dropIn(tl, row.ck.inner, tDone, { dur: 0.3 });
      rowFx(i, tDone + 0.8);
      // mini scale: pans move together (A1, A2, A4) / swap on the left (A3) — the beam never tips
      const tm = chipTimes[i][1] + 0.3;
      if (prevKind) mini.clearArrows(tl, tm - 0.15);
      mini.arrows(tl, tm, arrowKind[i]); prevKind = arrowKind[i];
      if (arrowKind[i] === "upup") {
        tl.to([mini.hangs.L, mini.hangs.R], { y: -12, duration: 0.35, ease: "power2.out" }, tm + 0.1);
        tl.to([mini.hangs.L, mini.hangs.R], { y: 0, duration: 0.5, ease: "power2.inOut" }, tm + 0.9);
      }
      mini.levelFlash(tl, tDone);
    });
    // Aman reacts on twos: nods on the equations, a cheer on "Four out of four?"
    aman.headTilt(tl, tOneRow[0] + 0.3, -4).headTilt(tl, tOneRow[1] + 0.3, 4).headTilt(tl, tOneRow[2], 0).headTilt(tl, tOneRow[3] + 0.3, -4);
    const tOut = cue("s03b", "@out"), tNever = cue("s03b", "@never");
    aman.pose(tl, tOut - 0.1, { aL: [160, 12], aR: [160, 12] }).expr(tl, tOut, "joy");
    aman.pose(tl, tNever + 0.9, { aL: [12, 8], aR: [12, 8] });
    khata.hop(tl, tOut + 0.1, { height: 60 }).expr(tl, tOut, "happy");
    cart.ring(tl, tOut + 0.35);
    // cart sizzle through the walk
    cart.sizzle(tl, T0 + 0.3, sc.end - 1.4);

    // ---- exit: flip the sheet → torn still → push in
    const tFlip = cueEnd("s03b", "@either") - 1.0, tGrow = tFlip + 0.5;
    const s0 = SW / 1920;
    tl.set(still, { opacity: 1 }, tFlip + 0.18);
    tl.fromTo(flipG, { scaleX: 1, svgOrigin: O }, { scaleX: 0.03, svgOrigin: O, duration: 0.18, ease: "power2.in", immediateRender: false }, tFlip);
    tl.set(sheet.outer, { autoAlpha: 0 }, tFlip + 0.19);
    tl.fromTo(flipStill, { scaleX: 0.03, svgOrigin: O }, { scaleX: 1, svgOrigin: O, duration: 0.2, ease: "power2.out", immediateRender: false }, tFlip + 0.19);
    // start state at the sheet's footprint (centre SX,SY), end state = identity (full frame)
    tl.fromTo(stillRot, { rotation: -2, svgOrigin: O }, { rotation: 0, svgOrigin: O, duration: sc.end - tGrow, ease: "power2.inOut" }, tGrow);
    tl.fromTo(still, { scale: s0, svgOrigin: O }, { scale: 1, svgOrigin: O, duration: sc.end - tGrow, ease: "power2.inOut", immediateRender: false }, tGrow);
    tl.fromTo(stillT, { x: SX - 960, y: SY - 540 }, { x: 0, y: 0, duration: sc.end - tGrow, ease: "power2.inOut", immediateRender: false }, tGrow);
    tl.set(still, { scale: s0, svgOrigin: O }, 0); tl.set(stillT, { x: SX - 960, y: SY - 540 }, 0);
  };
})();
