// s04 — Which accounts get a part? Meera's 19-line trial balance (left) · the 9-frame P&L film strip unrolls (right: 7 line frames + 2 ruled result frames).
// The seven revenue / expense strips lift out of the TB and fly into the line frames; the other twelve dim and step back (Drawings keeps its pin).
// The Sales frame splits into cash (₹40,000) + credit (₹10,000, Infotech) and re-merges. Exit: the camera glides down the strip to frame 2 (s05).
(function () {
  window.SCENES.s04 = ({ svg, tl, K, sc, next }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    K.wall(svg, C.teal, 1100);

    // ---- the trial balance (left)
    const tb = L.tb(svg, 60, 33);
    Object.values(tb.rows).forEach((r) => L.hide(r.n));
    L.hide(tb.n);
    const pin = L.node(tb.n, 235, tb.rows["Drawings"].cy + 2); L.pin(pin, 0, 0, 1.0);
    // ---- the film strip (right), unrolled through a clip rect
    const cp = K.el("clipPath", { id: "s04-film-clip" }, svg);
    const clipRect = K.el("rect", { x: 1180, y: 40, width: 740, height: 0 }, cp);
    const fw = K.g(svg, { "clip-path": "url(#s04-film-clip)" });
    const film = L.film(fw, {});
    // ---- chips between: Profit & Loss + April (bottom of the gap), Khata open + "?" (middle), the cash / credit split chips (top, by the Sales frame)
    const chipPL = L.node(svg, 995, 905); L.hide(chipPL); K.label(chipPL, 0, 0, "Profit & Loss", { size: 38, bg: C.cream, weight: 800 });
    const chipAp = L.node(svg, 995, 990); L.hide(chipAp); K.label(chipAp, 0, 0, "April", { size: 38, bg: C.saffron, weight: 800 });
    const khata = K.khataRig(svg, 995, 760, 0.38, { expr: "awake", open: true });
    L.hide(khata.g);
    const mkChip = (y, who, icon) => {
      const n = L.node(svg, 1005, y); L.hide(n);
      const b = K.g(n, {});
      K.tex(K.shadow(b, 1), K.cutRect(-150, -42, 300, 84, 1.4, 20), "pat-paper");
      if (who) { const fa = K.g(b, { transform: "translate(-98 0)" }); K.faceArt(fa, who, 30); } else K.medallion(b, -98, 0, 30, icon);
      const tk = K.ticker(b, 140, 0, 1, { value: 0, size: 38, anchor: "end", weight: 800, color: C.crText });
      return { n, tk };
    };
    const chipCash = mkChip(150, null, "coins"), chipCredit = mkChip(245, "infotech");

    // ---- flyers: a strip card per P&L line, parked on its TB row
    const FLY = [["Sales", 0, 50000, C.cr], ["Cost of supplies used", 1, 10000, C.dr], ["Rent", 3, 5000, C.dr], ["Salary", 4, 8000, C.dr],
      ["Electricity", 5, 1000, C.dr], ["Depreciation", 6, 1000, C.dr], ["Interest", 7, 300, C.dr]];
    const flyers = FLY.map(([name, fi, amt, edge]) => {
      const row = tb.rows[name];
      const n = L.node(svg, row.wx, row.wy); L.hide(n);
      const st = L.strip(n, name, amt, { edge, shadow: 2 });
      return { n, row, fi, name, amt };
    });

    // ======================================================================== timeline
    const tTrial = cue("s04a", "@trial") - 0.1;
    L.drop(tl, tb.n, tTrial, { dur: 0.4 });
    tb.list.forEach((r, i) => tl.fromTo(r.n, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "power1.out", immediateRender: false }, tTrial + 0.25 + i * 0.045));
    // "Nineteen accounts" — a quick top-to-bottom ripple (each row lifts 3 px and settles)
    // "…a movie — the Profit and Loss statement." — the film strip unrolls
    const tMovie = cue("s04a", "@movie");
    tl.to(clipRect, { attr: { height: 1020 }, duration: 1.1, ease: "power2.out" }, tMovie);
    L.drop(tl, chipPL, cue("s04a", "@profit") - 0.2, { dur: 0.3 });
    L.drop(tl, chipAp, cue("s04a", "@april") - 0.15, { dur: 0.3 });
    // "So which accounts get a part in it?" — Khata (small, open) and a "?"
    tl.set(khata.g, { opacity: 1 }, cue("s04a", "@which") - 0.4);
    khata.expr(tl, cue("s04a", "@which"), "awake");
    khata.emote(tl, segEnd("s04a") + 0.05, "?", 1.1);
    khata.blink(tl, T0 + 4);

    // s04b — "Only the ones that tell the story of earning and spending. Revenue, and expenses."
    const tRev = cue("s04b", "@revenue") - 0.05;
    flyers.forEach((f, i) => {
      const t = tRev + i * 0.2, tgt = film.pos(f.fi);
      L.dim(tl, f.row.n, t, 0.3, 0.25);
      tl.set(f.n, { opacity: 1 }, t);
      L.fly(tl, f.n, t, tgt.x - f.row.wx, tgt.y - f.row.wy, 0.7);
      // land: the flyer becomes the frame's content (identical card) — then the film frame wears it
      tl.set(f.n, { opacity: 0 }, t + 0.7);
      tl.set(film.fr[f.fi].c, { opacity: 1 }, t + 0.7);
      K.pulseNode(tl, film.fr[f.fi].c, t + 0.72, 1.04);
    });
    // "Everything else stays behind." — the other twelve dim to 45 % and step back
    const tBehind = cue("s04b", "@everything");
    const stay = tb.list.filter((r) => !FLY.some((f) => f[0] === r.name));
    stay.forEach((r) => { L.dim(tl, r.n, tBehind, 0.45, 0.35); tl.to(r.n, { x: -10, duration: 0.35, ease: "power2.inOut" }, tBehind); });
    // "Sales comes first: fifty thousand. Forty thousand in cash, ten thousand on credit to Infotech."
    const tFor = cue("s04b", "@forty") - 0.05, tTen = cue("s04b", "@ten") - 0.05;
    L.drop(tl, chipCash.n, tFor, { dur: 0.3 }); chipCash.tk.to(tl, tFor + 0.1, 40000, 0.6);
    L.drop(tl, chipCredit.n, tTen, { dur: 0.3 }); chipCredit.tk.to(tl, tTen + 0.1, 10000, 0.6);
    const tMerge = cue("s04b", "@infotech") + 0.45;
    [chipCash, chipCredit].forEach((c, i) => { tl.to(c.n, { x: 235, y: i ? -105 : -10, duration: 0.5, ease: "power2.in" }, tMerge + i * 0.06); L.lift(tl, c.n, tMerge + 0.35 + i * 0.06, { dur: 0.15 }); });
    K.pulseNode(tl, film.fr[0].c, tMerge + 0.55, 1.06);
    // "If it was earned in April, it belongs to April — paid or not."
    K.pulseNode(tl, chipAp, cue("s04b", "@earned"), 1.08);

    // exit — default torn-paper wipe; s05 rebuilds the same strip at the same place
    L.allow(svg);
  };
})();
