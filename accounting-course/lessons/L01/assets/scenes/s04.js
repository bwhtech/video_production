// s04 · Two questions, two reports (~44 s).
// Opens on a replica of s03's last frame; Khata's two tinted pages peel off and become the two
// question cards (this scene owns the s03 → s04 seam). Then: three tiny owners wonder the same two
// questions → the questions light up → left card unrolls into a scrolling FILM STRIP (Profit & Loss,
// the movie) → right card becomes a POLAROID (Balance Sheet, the photo) → side by side → April calendar.
(function () {
  OWN_SEAM_IN.s04 = true;

  SCENES.s04 = ({ svg, tl, K, sc }) => {
    const C = K.C, T0 = sc.start;
    const H = window.S03_KHATA, A = window.S03_ARROWS;
    const sm = (target, vars, t, dur, ease = "power2.out") => tl.to(target, { ...vars, duration: dur, ease }, t);
    const pop = (node, t, dur = 0.34) => { tl.set(node, { autoAlpha: 0, scale: 1.07, svgOrigin: "0 0" }, T0); tl.to(node, { autoAlpha: 1, duration: 0.12, ease: "none" }, t); tl.to(node, { scale: 1, svgOrigin: "0 0", duration: dur, ease: "power2.out" }, t); };  // drop-and-place
    const at = (x, y, parent) => K.g(parent, { transform: `translate(${x} ${y})` });

    // ================================================================ stage (replica of s03's end)
    const cam = K.g(svg, {});
    K.wall(cam, C.cream, 880);
    const bunting = K.g(cam, {}); // drawn by S03_STAGE below, minus its wall/table
    const backdropPos = K.g(cam, {});
    const backdrop = K.g(backdropPos, {});
    K.wall(backdrop, C.teal, 880);
    // a few paper sparkles on the teal backdrop so it isn't empty
    [[150, 160, 18], [1780, 210, 22], [1700, 640, 14], [230, 700, 16]].forEach(([x, y, r]) => K.sparkle(backdrop, x, y, r, C.cream));
    K.table(cam, 880);
    // bunting (from s03's stage helper — draw into a scratch group and keep only the bunting layer)
    {
      const scratch = K.g(bunting, {});
      window.S03_STAGE(K, scratch);
      // S03_STAGE draws wall, table, bunting as the first three children: drop the wall + table copies
      const kids = Array.from(scratch.children);
      kids.slice(0, kids.length - 1).forEach((n) => n.remove());
    }
    tl.set(backdrop, { y: -1000 }, T0);

    // replica Khata, open, both pages tinted, happy, arrows up
    const k = K.khataRig(cam, H.x, H.y, H.s, { open: true, expr: "happy", armL: 20, armR: 20 });
    tl.set([k.tints.L, k.tints.R], { opacity: 0.9 }, T0);
    const arrows = [-1, 1].map((dir) => {
      const a = K.g(at(H.x + dir * A.dx, A.y, cam), {});
      K.arrowShape(a, 0, 0, 200, dir < 0 ? C.dr : C.cr, -dir, 0, 34);
      return a;
    });

    // ================================================================ the two question cards
    const CW = 470, CH = 390;
    const CARD = [
      { x: 560, y: 420, header: C.saffron, tint: C.dr, n: "1", label: "Making money?", icons: ["trending-up", "indian-rupee"] },
      { x: 1360, y: 420, header: C.sky, tint: C.cr, n: "2", label: "Own & owe?", icons: ["package", "hand-coins"] },
    ];
    const cards = CARD.map((d, i) => {
      const pos = at(d.x, d.y, cam);
      const travel = K.g(pos, {});            // x/y journeys (no transform attribute)
      const inner = K.g(travel, {});          // scale/rotation about the card centre (+ the seam offset)
      K.tex(K.shadow(inner, 2), K.cutRect(-CW / 2, -CH / 2, CW, CH, 2.2, 24), "pat-paper");
      K.paper(inner, K.cutRect(-CW / 2 + 7, -CH / 2 + 7, CW - 14, 84, 1.5, 22), d.header);
      // number badge + "?" (shown until the question is asked)
      const badge = K.g(at(-CW / 2 + 52, -CH / 2 + 49, inner), {});
      K.paper(K.shadow(badge, 1), K.cutEll(0, 0, 32, 32, 1.2), C.ink);
      K.text(badge, 0, 2, d.n, { size: 44, color: C.white, weight: 800 });
      const qm = K.g(at(0, 40, inner), {});
      K.qmark(qm, 0, 0, 2.2, C.ink);
      // revealed content: header label + two medallions
      const content = K.g(inner, {});
      K.text(content, 26, -CH / 2 + 49, d.label, { size: 46, color: C.ink, weight: 800 });
      const m1 = K.g(at(-95, 55, content), {}), m2 = K.g(at(95, 55, content), {});
      K.medallion(m1, 0, 0, 78, d.icons[0]);
      K.medallion(m2, 0, 0, 78, d.icons[1]);
      // tint overlay (= Khata's page sheet at the seam)
      const tint = K.g(inner, {});
      K.paper(tint, K.cutRect(-CW / 2, -CH / 2, CW, CH, 3), d.tint);
      // start exactly over the replica page tint
      const tx = H.x + (i === 0 ? -1 : 1) * 253 * H.s, ty = H.y - 207 * H.s;
      tl.set(inner, { x: tx - d.x, y: ty - d.y, scaleX: (298 * H.s) / CW, scaleY: (282 * H.s) / CH, svgOrigin: "0 0" }, T0);
      tl.set(tint, { opacity: 1 }, T0);
      tl.set([content], { autoAlpha: 0 }, T0);
      tl.set([m1, m2], { scale: 0, svgOrigin: "0 0" }, T0);
      return { d, pos, travel, inner, badge, qm, content, m1, m2, tint };
    });

    // ================================================================ seam: pages peel off → cards
    sm(arrows, { scale: 0, svgOrigin: "0 0" }, T0 + 0.02, 0.22, "power2.in");
    k.close(tl, T0 + 0.08, 0.32, { smooth: true });
    sm(k.mover, { y: 760 }, T0 + 0.42, 0.5, "power3.in");
    cards.forEach((c, i) => {
      const d0 = i * 0.06;
      sm(c.inner, { x: 0, y: 0, scaleX: 1, scaleY: 1, svgOrigin: "0 0" }, T0 + 0.05 + d0, 0.8, "power3.inOut");
      tl.fromTo(c.inner, { rotation: 0 }, { rotation: i === 0 ? -1.5 : 1.5, svgOrigin: "0 0", duration: 0.4, ease: "power2.out", immediateRender: false }, T0 + 0.05 + d0);
      sm(c.inner, { rotation: 0, svgOrigin: "0 0" }, T0 + 0.45 + d0, 0.5, "power2.out");
      sm(c.tint, { opacity: 0 }, T0 + 0.3 + d0, 0.45, "power1.inOut");
    });
    sm(backdrop, { y: 0 }, T0 + 0.25, 0.65, "power3.out");
    tl.fromTo(cam, { scale: 1.06, svgOrigin: "960 640" }, { scale: 1, svgOrigin: "960 640", duration: 1.0, ease: "power2.out" }, T0);

    // ================================================================ three owners wonder the same two questions
    const ownerDefs = [
      { word: "@chai", x: 600, make: (p, x, y, s) => K.meera(p, x, y, s, { expr: "puzzled" }) },
      { word: "@startup", x: 960, make: (p, x, y, s) => K.priya(p, x, y, s, { expr: "puzzled" }) },
      { word: "@giant", x: 1320, make: (p, x, y, s) => K.person(p, x, y, s, { skin: "#8d5a3b", top: C.navy, legs: C.navy, hair: "bald", glasses: true, longSleeve: true, collar: true, shoes: "#2a2a2a", topBottom: -160, aL: [12, 8], aR: [12, 8], expr: "puzzled" }) },
    ];
    const tOut = cue("s04", "@two") - 0.35;
    ownerDefs.forEach((o, i) => {
      const t = cue("s04", o.word);
      const r = o.make(cam, o.x, 1010, 0.42);
      tl.set(r.mover, { y: 1000 }, T0);  // local units (s = 0.42) → fully below frame
      sm(r.mover, { y: 0 }, t, 0.42, "power2.out");
      r.shrug(tl, t + 0.45, 0.9);
      r.blink(tl, t + 1.6);
      // the same two questions float above each owner
      const minis = at(o.x, 680, cam);
      [[-30, C.saffron, "1"], [30, C.sky, "2"]].forEach(([dx, col, n], j) => {
        const m = at(dx, 0, minis);
        const mm = K.g(m, {});
        K.tex(K.shadow(mm, 1), K.cutRect(-24, -20, 48, 40, 1, 10), "pat-paper");
        K.paper(mm, K.cutRect(-21, -17, 42, 12, 0.6, 10), col);
        K.text(mm, 0, 8, n, { size: 20, weight: 800 });
        pop(mm, t + 0.25 + j * 0.08, 0.28);
        sm(mm, { scale: 0, svgOrigin: "0 0" }, tOut + i * 0.05, 0.18, "power2.in");
      });
      sm(r.mover, { y: 1000 }, tOut + i * 0.07, 0.4, "power2.in");
      r.jitter(tl, t, tOut + 0.5, { seed: 40 + i });
    });

    // ================================================================ "One: …" / "Two: …" — the questions light up
    const reveal = (c, t) => {
      sm(c.qm, { scale: 0, svgOrigin: "0 0" }, t, 0.18, "power2.in");
      tl.set(c.content, { autoAlpha: 1 }, t + 0.1);
      tl.fromTo(c.content, { y: 14 }, { y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, t + 0.1);
      pop(c.m1, t + 0.25); pop(c.m2, t + 0.38);
      sm(c.inner, { scale: 1.03, svgOrigin: "0 0" }, t, 0.3, "power2.out");
      sm(c.inner, { scale: 1, svgOrigin: "0 0" }, t + 0.9, 0.4, "power2.inOut");
    };
    const tOne = cue("s04", "@one"), tTwo = cue("s04", "@two", 2);
    sm(cards[1].pos, { opacity: 0.55 }, tOne, 0.25);
    reveal(cards[0], tOne);
    sm(cards[1].pos, { opacity: 1 }, tTwo - 0.1, 0.2);
    sm(cards[0].pos, { opacity: 0.55 }, tTwo, 0.25);
    reveal(cards[1], tTwo);
    sm(cards[0].pos, { opacity: 1 }, cue("s04", "@accounting"), 0.25);

    // ================================================================ "Accounting answers both" — Khata cameo
    const tAcc = cue("s04", "@accounting");
    const kc = K.khataRig(cam, 960, 1030, 0.5, { expr: "happy" });
    tl.set(kc.mover, { y: 820 }, T0);  // local units (s = 0.5)
    sm(kc.mover, { y: 0 }, tAcc, 0.4, "power2.out");
    kc.arm(tl, cue("s04", "@both") - 0.1, "L", 95, 0.25).arm(tl, cue("s04", "@both") - 0.05, "R", 95, 0.25);
    kc.expr(tl, cue("s04", "@both"), "awake");
    const tFirst = cue("s04", "@first");
    sm(kc.mover, { y: 820 }, tFirst - 0.2, 0.35, "power2.in");
    kc.jitter(tl, tAcc, tFirst + 0.2, { seed: 77 });

    // ================================================================ PROFIT & LOSS = the movie (film strip)
    const pl = K.g(cam, {});                 // everything P&L lives here (moves left later)
    const FX = 900, FY = 360, FW = 1440, FH = 250;
    const stripPos = at(FX, FY, pl);
    const strip = K.g(stripPos, {});
    // the SAME kit component L12 builds the P&L in: 6 picture frames + 2 ruled RESULT frames (Gross / Net) — empty here
    const icons = ["coffee", "coins", "calendar", "receipt", "coffee", "sprout", "coins", "calendar", "coffee", "receipt", "coins", "sprout"];
    const NPIC = 6, FRW = (FW - 30) / (NPIC + 2);            // kit cell width
    K.filmStrip(strip, 0, 0, FW, FH, icons.slice(0, NPIC), 0, { resultFrames: 2 });
    // the movie rolls: picture frames scroll across the first six cells (clipped), then stop exactly on a cell boundary
    const clipId = "s04-film-clip";
    const defs = K.el("defs", {}, svg);
    const cp = K.el("clipPath", { id: clipId }, defs);
    K.el("rect", { x: -FW / 2 + 15, y: -FH / 2 + 24, width: FRW * NPIC, height: FH - 48 }, cp);
    const frameWin = K.g(strip, { "clip-path": `url(#${clipId})` });
    K.el("rect", { x: -FW / 2 + 15, y: -FH / 2 + 24, width: FRW * NPIC, height: FH - 48, fill: "#2a2530" }, frameWin);   // film base under the rolling frames
    const frames = K.g(frameWin, {});
    const tints = [C.saffron, "#f6c56a", C.coral, C.saffron, "#f6c56a", C.leaf];
    for (let i = 0; i < icons.length * 2; i++) {
      const fx = -FW / 2 + 15 + i * FRW;
      K.paper(frames, K.cutRect(fx + 5, -FH / 2 + 24, FRW - 10, FH - 48, 1, 14), tints[i % tints.length]);
      K.icon(frames, icons[i % icons.length], fx + FRW / 2, 0, Math.min(FRW, FH - 48) * 0.6, C.ink, 2.4);
    }
    // unroll from the left card's spot
    tl.set(strip, { scaleX: 0.02, svgOrigin: `${-FW / 2} 0` }, T0);
    tl.set(stripPos, { autoAlpha: 0 }, T0);
    const tProfit = cue("s04", "@profit");
    // left card flattens toward the strip's start; right card steps aside (waits bottom-right)
    sm(cards[0].travel, { x: -FW / 2 + FX - 560 + 120, y: FY - 420 }, tFirst - 0.05, 0.4, "power3.in");
    sm(cards[0].inner, { scaleY: 0.25, scaleX: 0.5, svgOrigin: "0 0" }, tFirst - 0.05, 0.4, "power3.in");
    sm(cards[0].pos, { opacity: 0 }, tFirst + 0.25, 0.12);
    tl.set(stripPos, { autoAlpha: 1 }, tFirst + 0.25);
    sm(strip, { scaleX: 1, svgOrigin: `${-FW / 2} 0` }, tFirst + 0.25, 0.75, "power3.out");
    sm(cards[1].travel, { x: 1700 - 1360, y: 760 - 420 }, tFirst - 0.05, 0.6, "power3.inOut");
    sm(cards[1].inner, { scale: 0.42, svgOrigin: "0 0" }, tFirst - 0.05, 0.6, "power3.inOut");
    const plChip = K.g(at(430, 180, pl), {});
    K.label(plChip, 0, 0, "Profit & Loss", { size: 52, bg: C.saffron, rot: -3 });
    pop(plChip, tProfit + 0.05);
    // "a movie" — projector medallion + frames start rolling
    const tMovie = cue("s04", "@movie");
    const proj = K.g(at(FX + FW / 2 + 10, FY - FH / 2 - 30, pl), {});
    K.medallion(proj, 0, 0, 48, "film", C.cream);
    pop(proj, tMovie);
    const rollEnd = cue("s04", "@second");
    tl.to(frames, { x: -FRW * icons.length, duration: rollEnd - tMovie, ease: "none" }, tMovie);   // ends on a cell boundary
    // "a day, a month, a year" — the period bar stretches
    const bar = K.g(at(FX - FW / 2, 600, pl), {});
    const barFill = K.g(bar, {});
    K.paper(K.shadow(barFill, 1), K.cutRect(0, -16, 1000, 32, 1.4, 20), C.cream);
    const calPos = at(0, 0, bar);
    const cal = K.g(calPos, {});
    K.medallion(cal, 0, 0, 36, "calendar", C.cream);
    tl.set(barFill, { scaleX: 0, svgOrigin: "0 0" }, T0);
    tl.set(cal, { scale: 0, svgOrigin: "0 0" }, T0);
    const tDay = cue("s04", "@day"), tMonth = cue("s04", "@month"), tYear = cue("s04", "@year");
    pop(cal, tDay - 0.1, 0.25);
    [[tDay, 0.08], [tMonth, 0.45], [tYear, 1.44]].forEach(([t, f]) => {
      sm(barFill, { scaleX: f, svgOrigin: "0 0" }, t, 0.35, "power3.out");
      sm(calPos, { x: 1000 * f }, t, 0.35, "power3.out");
    });
    // "earned more than you spent" — two coin stacks on the table, the taller one sprouts
    const stacks = K.g(pl, {});
    const coinStack = (x, n, t) => {
      for (let i = 0; i < n; i++) {
        const cpos = at(x, 980 - i * 22, stacks);
        const cc = K.g(cpos, {});
        K.coin(cc, 0, 0, 34);
        tl.set(cc, { y: -260, opacity: 0 }, T0);
        tl.set(cc, { opacity: 1 }, t + i * 0.07);
        tl.to(cc, { y: 0, duration: 0.3, ease: "power2.in" }, t + i * 0.07);
      }
    };
    const tEarned = cue("s04", "@earned"), tSpent = cue("s04", "@spent");
    coinStack(760, 6, tEarned);
    coinStack(980, 3, tSpent);
    const sprout = K.g(at(760, 820, stacks), {});
    K.medallion(sprout, 0, 0, 40, "sprout", C.leaf, C.ink);
    pop(sprout, tSpent + 0.45);

    // ================================================================ BALANCE SHEET = the photo (polaroid)
    const tSecond = cue("s04", "@second"), tBal = cue("s04", "@balance");
    // P&L shrinks to the left third; the details (bar, coins) clear away
    sm([bar, stacks], { opacity: 0 }, tSecond - 0.2, 0.3);
    sm(pl, { scale: 0.46, x: 70, y: 250, svgOrigin: "0 0" }, tSecond - 0.1, 0.7, "power3.inOut");
    // waiting card comes to centre-right, then the flash turns it into a polaroid
    sm(cards[1].travel, { x: 1180 - 1360, y: 470 - 420 }, tSecond - 0.3, 0.6, "power3.out");
    sm(cards[1].inner, { scale: 1.05, svgOrigin: "0 0" }, tSecond - 0.3, 0.6, "power3.out");
    const PW = 560, PH = 640, PX = 1180, PY = 470;
    const polPos = at(PX, PY, cam);
    const pol = K.g(polPos, {});
    let develop, dateEl;
    K.polaroid(pol, 0, 0, PW, PH, 3, (pg, x, y, w, h) => {
      // the SAME two-column kit polaroid L13/L14 develop the Balance Sheet in (date slot reads 30 Apr, fades in with "right")
      dateEl = pg.lastElementChild;
      const L = pg.cols.L, R = pg.cols.R;
      // left column — what the stall HAS: the cart + a jar on the table
      K.paper(pg, K.cutRect(L.x, L.y + L.h * 0.74, L.w, L.h * 0.26, 1, 20), "#b98d5f");
      K.stall(pg, L.cx - 32, L.y + L.h * 0.93, 0.34, { gallaOpen: false });
      K.jar(pg, L.cx + 84, L.y + L.h * 0.9, 50, 66, {});
      const own = K.g(at(L.cx, L.y + 52, pg), {}); K.medallion(own, 0, 0, 30, "package"); pop(own, cue("s04", "@everything") + 0.05);
      // right column — what the stall OWES: two claim TAGS on strings (Meera's face, Ravi Mama's face; ₹ glyph, no amounts, no words)
      const owe = K.g(at(R.cx, R.y + 52, pg), {}); K.medallion(owe, 0, 0, 30, "hand-coins"); pop(owe, cue("s04", "@owe", 2) + 0.05);
      [["meera", -62, 0.7], ["ravi", 62, 0.95]].forEach(([who, dx, fy], i) => {
        const ct = K.claimTag(pg, R.cx + dx, R.y + R.h * fy, 0.64, { face: who, hidden: true });
        K.text(ct.art.g, 0, -24, "₹", { size: 46, weight: 800, color: C.ink });
        const tt = cue("s04", "@owe", 2) + 0.25 + i * 0.15;
        ct.stringTo(tl, tt, R.cx + dx * 0.3, R.y + 80, { dur: 0.35 }).enter(tl, tt);
      });
      develop = K.g(pg, {});
      K.paper(develop, K.cutRect(x - 2, y - 2, w + 4, h + 4, 1, 20), "#efe6d6");
    }, { twoColumn: true, date: "30 Apr" });
    pol.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));   // kit header "Liabilities / + Equity" are two tight lines (bbox touch)
    tl.set(dateEl, { opacity: 0 }, T0);
    sm(dateEl, { opacity: 1 }, cue("s04", "@right") - 0.05, 0.35);
    tl.set(pol, { autoAlpha: 0 }, T0);
    // flash
    const flash = K.el("rect", { x: -100, y: -100, width: 2120, height: 1280, fill: "#fffaf0" }, svg);
    tl.set(flash, { opacity: 0 }, T0);
    tl.to(flash, { opacity: 0.85, duration: 0.06, ease: "none" }, tBal - 0.05);
    tl.to(flash, { opacity: 0, duration: 0.35, ease: "power2.out" }, tBal + 0.01);
    tl.set(cards[1].pos, { autoAlpha: 0 }, tBal);
    tl.set(pol, { autoAlpha: 1 }, tBal);
    tl.fromTo(pol, { y: 24 }, { y: 0, svgOrigin: "0 0", duration: 0.5, ease: "power3.out", immediateRender: false }, tBal);
    tl.to(develop, { opacity: 0, duration: 1.3, ease: "power1.inOut" }, tBal + 0.25);
    const bsChip = K.g(at(PX + 10, 112, cam), {});
    K.label(bsChip, 0, 0, "Balance Sheet", { size: 52, bg: C.sky, rot: 3 });
    pop(bsChip, tBal + 0.45);
    // "That's a photo." — little settle wiggle; then stillness ("One moment, frozen.")
    const tPhoto = cue("s04", "@photo");
    void tPhoto; // no wiggle — the photo is still ("One moment, frozen.")

    // ================================================================ "A movie, and a photo." — side by side, each nudges on its word
    const tMovie2 = cue("s04", "@movie", 2), tPhoto2 = cue("s04", "@photo", 2);
    sm(pl, { scale: 0.56, x: 40, y: 230, svgOrigin: "0 0" }, tMovie2 - 0.5, 0.5, "power3.inOut");
    sm([polPos, bsChip], { x: "+=110" }, tMovie2 - 0.5, 0.5, "power3.inOut");
    const nudge = (node, t, origin) => {
      tl.to(node, { scale: 1.03, svgOrigin: origin, duration: 0.25, ease: "power2.out" }, t);
      tl.to(node, { scale: 1, svgOrigin: origin, duration: 0.4, ease: "power2.inOut" }, t + 0.25);
    };
    nudge(stripPos, tMovie2, "0 0"); nudge(pol, tPhoto2, "0 0");
    nudge(plChip, cue("s04", "@profit", 2), "0 0"); nudge(bsChip, cue("s04", "@balance", 2), "0 0");

    // ================================================================ "…by the end of April." — calendar strip
    const tBuild = cue("s04", "@build"), tEnd = cue("s04", "@end");
    const calStrip = K.g(at(960, 985, cam), {});
    const calIn = K.g(calStrip, {});
    K.tex(K.shadow(calIn, 2), K.cutRect(-880, -52, 1760, 104, 1.6, 24), "pat-paper");
    K.paper(calIn, K.cutRect(-874, -46, 180, 92, 1.2, 18), C.coral);
    K.text(calIn, -784, 2, "April", { size: 46, color: C.white, weight: 800 });
    const tile30 = [];
    for (let d = 1; d <= 30; d++) {
      const x = -672 + (d - 1) * 51.5;
      const tg = K.g(at(x, 0, calIn), {});
      const bgt = K.g(tg, {});
      K.paper(bgt, K.cutRect(-22, -30, 44, 60, 0.8, 12), d === 30 ? C.saffron : C.cream);
      K.text(tg, 0, 2, String(d), { size: 26, weight: 700 });
      if (d === 30) tile30.push(tg);
    }
    tl.set(calIn, { y: 220 }, T0);
    sm(calIn, { y: 0 }, tBuild - 0.1, 0.5, "power2.out");
    const tag = K.g(at(-820, -96, calStrip), {});
    K.faceTag(tag, 0, 0, "meera", 1.2, -6);
    pop(tag, cue("s04", "@meera"));
    tl.to(tile30[0], { scale: 1.15, y: -8, svgOrigin: "0 0", duration: 0.3, ease: "power2.out" }, tEnd);
    const tick = K.g(at(0, -64, tile30[0]), {});
    K.medallion(tick, 0, 0, 22, "check", C.leaf, C.white);
    pop(tick, tEnd + 0.25);

    // ================================================================ camera with intent
    tl.to(cam, { scale: 1.035, svgOrigin: "780 420", duration: tSecond - tProfit, ease: "sine.inOut" }, tProfit);
    tl.to(cam, { scale: 1.035, svgOrigin: "1200 470", duration: 1.0, ease: "sine.inOut" }, tSecond);
    tl.to(cam, { scale: 1, svgOrigin: "960 540", duration: 0.9, ease: "sine.inOut" }, tMovie2 - 0.6);
  };
})();
