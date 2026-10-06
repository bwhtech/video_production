// s08 — The translation card. One gold-edged cheat-sheet (the screenshot moment): Real ≈ Assets · Personal ≈ People (… and, landing last, the customer advance) · Nominal ≈ P&L.
// Rows slide in on twos as named; icons pop with a 0.08 s stagger; the `calendar-check` advance icon arrives alone 0.3 s after "advances" and the row re-centres by one slot.
(function () {
  window.SCENES.s08 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L7 = window.L7, T0 = sc.start;
    L7.stage(svg, C.teal, 880);
    const cal = L7.cal(svg, 25);
    const khata = K.khataRig(svg, 1835, 1040, 0.42, { expr: "awake" });

    const card = L7.node(svg, 960, 560); L7.hide(card);
    L7.card(card, 1580, 800, { gold: true });
    const RY = [-250, 0, 250];
    const rowNode = (i, fam, title) => {
      const r = L7.node(card, 0, RY[i]); L7.hide(r);
      K.paper(r, K.cutRect(-720, -92, 1440, 184, 1.4, 24), K.mixColor(C.cream, "#e6d4b3", 0.4), { opacity: 0.65 });
      L7.famMedallion(r, fam, -640, 0, 70);
      K.text(r, -540, 4, title, { size: 70, weight: 800, anchor: "start" });
      return r;
    };
    // ---- row 1: Real ≈ Assets + three tiny jars (Cash, Equipment, Stock)
    const row1 = rowNode(0, "real", "Real ≈ Assets");
    const j1 = [["coins", -1], ["cart", 0], ["leaves", 1]].map(([k, d], i) => {
      const n = L7.node(row1, 430 + d * 150, 66); L7.hide(n);
      K.jarRig(n, 0, 0, 0.62, { contents: k, fill: k === "cart" ? 1 : 0.7, edge: C.dr });
      return n;
    });
    // ---- row 2: Personal ≈ People + the people icons (owes us / we owe / bank / capital / drawings) and the advance
    const row2 = rowNode(1, "personal", "Personal ≈ People");
    const mk = (fn, x) => { const n = L7.node(row2, x, 0); L7.hide(n); fn(n); return n; };
    const disc = (n, r = 50) => K.tex(K.shadow(n, 1), K.cutEll(0, 0, r + 6, r + 6, 0.8), "pat-paper");
    const X5 = [215, 330, 445, 560, 675], X6 = [157.5, 272.5, 387.5, 502.5, 617.5, 732.5];        // five icons centred → six icons centred (one slot of 115)
    const p = [
      mk((n) => { disc(n); K.faceArt(n, "infotech", 48); }, X5[0]),
      mk((n) => { disc(n); K.faceArt(n, "gopal", 48); }, X5[1]),
      mk((n) => { K.medallion(n, 0, 0, 52, "landmark"); }, X5[2]),
      mk((n) => { disc(n); K.faceArt(n, "meera", 48); }, X5[3]),
      mk((n) => { K.medallion(n, 0, 0, 52, "wallet"); }, X5[4]),
    ];
    const adv = mk((n) => {
      K.medallion(n, 0, 0, 52, "calendar-check");
      // the small orange right-pan tick: a mini pan with an orange claim weight
      const t = K.g(n, { transform: "translate(52 44)" });
      K.paper(K.shadow(t, 1), K.cutPoly([[-22, -4], [22, -4], [14, 12], [-14, 12]], 0.6, 8), C.cr);
      K.ink(t, [[-9, -14], [-2, -6], [11, -22]], 5, C.cr);
    }, X6[5]);
    // ---- row 3: Nominal ≈ P&L + a tiny film strip
    const row3 = rowNode(2, "nominal", "Nominal ≈ P&L");
    const film = L7.node(row3, 560, 0); L7.hide(film);
    K.filmStrip(film, 0, 0, 380, 120, [], 0, { resultFrames: 2 });
    L7.allow(svg);

    // ======================================================================================= timeline
    khata.blink(tl, T0 + 3); khata.blink(tl, T0 + 15);
    L7.drop(tl, card, cue("s08", "@translation") - 0.2, { dur: 0.5 });
    const slide = (r, t) => tl.fromTo(r, { autoAlpha: 0, x: -260 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: K.stepEase(0.5, "power2.out", t), immediateRender: false }, t);
    slide(row1, cue("s08", "@real") - 0.2);
    j1.forEach((n, i) => L7.drop(tl, n, cue("s08", "@assets") + 0.05 + i * 0.08, { dur: 0.3 }));
    slide(row2, cue("s08", "@personal") - 0.2);
    L7.drop(tl, p[0], cue("s08", "@owes") - 0.1, { dur: 0.3 });
    L7.drop(tl, p[1], cue("s08", "@owe") - 0.05, { dur: 0.3 });
    L7.drop(tl, p[2], cue("s08", "@bank") - 0.05, { dur: 0.3 });
    L7.drop(tl, p[3], cue("s08", "@capital") - 0.1, { dur: 0.3 });
    L7.drop(tl, p[4], cue("s08", "@drawings") - 0.05, { dur: 0.3 });
    // "And advances" — the row re-centres by one slot (smooth) and the calendar-check icon arrives alone, 0.3 s after the word
    const tAdv = cue("s08", "@advances") + 0.3;
    p.forEach((n, i) => tl.to(n, { x: X6[i] - X5[i], duration: 0.45, ease: "power2.inOut" }, tAdv - 0.35));
    L7.drop(tl, adv, tAdv, { dur: 0.4 });
    tl.to(adv, { scale: 1.12, svgOrigin: O, duration: 0.2, ease: "power2.out" }, tAdv + 0.8); tl.to(adv, { scale: 1, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, tAdv + 1.0);
    slide(row3, cue("s08", "@nominal") - 0.2);
    L7.drop(tl, film, cue("s08", "@profit") - 0.3, { dur: 0.4 });
    khata.hop(tl, cue("s08", "@loss") + 0.3, { height: 36 }).expr(tl, cue("s08", "@loss") + 0.3, "happy");
  };
})();
