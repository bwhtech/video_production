// s05 — Worked: gross profit. Khata (open, centre) does the first cut. Left: a tall column of 50 paper blocks = Sales ₹50,000. The milk / sugar slips from the first
// night (and a leaf sticker) land by the "Cost of supplies used" frame; the alias chip "Cost of goods sold" hangs once; the top 10 blocks (tinted kraft) lift off and
// slide onto the supplies frame; the column counts ₹50,000 → ₹40,000 and ₹40,000 ticks into the first ruled result frame (Gross profit).
// Exit: default wipe; s06 keeps the same column + strip (Meera takes over the same stage).
(function () {
  window.SCENES.s05 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L = window.L12, T0 = sc.start;
    L.stage(svg, C.saffron, 930);
    const col = L.column(svg, 330, 1000, [{ n: 40 }, { n: 10 }]);
    const colTk = K.ticker(svg, 330, 128, 1, { value: 50000, size: 58, chip: true, w: 310, h: 90, edge: C.cr });
    const film = L.film(svg, { filled: true });
    L.hide(film.fr[2].c); L.hide(film.fr[8].c);
    const yCost = film.pos(1).y;
    const khata = K.khataRig(svg, 850, 1000, 0.72, { expr: "awake", open: true });

    // stickers that land by the Cost frame: milk + sugar slips (from the first night) and a leaf (stock)
    const stick = [["milk", 900], ["package", 1020], ["leaf", 1140]].map(([ic, x]) => {
      const pos = K.g(svg, { transform: "translate(0 0)" }), inner = K.g(pos, { opacity: 0 });
      K.slip(inner, 0, 0, 0.95, ic === "leaf" ? 3 : -4, ic);
      return { pos, inner, x, ic };
    });
    const chip = L.node(svg, 1030, 340); L.hide(chip); K.label(chip, 0, 0, "Cost of goods sold", { size: 34, bg: C.cream, weight: 700 });
    const blocks = col.chunks[1];

    // ======================================================================== timeline
    khata.blink(tl, T0 + 2.4).blink(tl, T0 + 11);
    khata.hop(tl, T0 + 0.7, { height: 40 });
    // "Remember the milk and the sugar … Here they are."
    const tHere = cue("s05", "@here");
    khata.arm(tl, tHere - 0.3, "R", 70, 0.3).expr(tl, tHere - 0.3, "wow");
    stick.forEach((s, i) => {
      const t = tHere - 0.3 + i * 0.22;
      tl.set(s.inner, { opacity: 1 }, t);
      tl.fromTo(s.pos, { x: 640, y: 120 }, { x: s.x, y: yCost, duration: 0.7, ease: "power2.out", immediateRender: false }, t);
      tl.fromTo(s.inner, { scale: 1.07, svgOrigin: O }, { scale: 1, svgOrigin: O, duration: 0.6, ease: "power2.out", immediateRender: false }, t);
    });
    khata.expr(tl, tHere + 1.2, "awake").arm(tl, tHere + 1.4, "R", 20, 0.3);
    // "Bigger businesses call this line cost of goods sold." — an alias chip hangs for the sentence, then lifts off
    const tCogs = cue("s05", "@cost", 2), tSold = L.endOf("s05", "@sold|p");
    L.drop(tl, chip, tCogs - 0.1, { dur: 0.32 });
    L.lift(tl, chip, tSold + 0.35, { dur: 0.25 });
    // "Fifty thousand, minus ten thousand, leaves forty thousand." — the top 10 blocks tint, lift off, slide onto the supplies frame; ticker counts
    const tMinus = cue("s05", "@minus");
    K.pulseNode(tl, colTk.body, cue("s05", "@fifty"), 1.05);
    tl.to(blocks.tint, { opacity: 0.55, duration: 0.3 }, tMinus - 0.2);
    const cx0 = 0, cy0 = (blocks.top + blocks.bottom) / 2;
    tl.to(blocks.g, { y: -26, duration: 0.22, ease: "power2.out" }, tMinus);                       // lift
    tl.to(blocks.g, { x: 1060 - 330, duration: 0.8, ease: "power1.inOut" }, tMinus + 0.22);
    tl.to(blocks.g, { y: yCost - cy0, duration: 0.8, ease: "power2.inOut" }, tMinus + 0.22);
    tl.to(blocks.g, { scale: 0.34, svgOrigin: `0 ${cy0}`, duration: 0.8, ease: "power2.inOut" }, tMinus + 0.22);
    tl.to(blocks.g, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, tMinus + 1.15);
    colTk.to(tl, tMinus + 0.55, 40000, 0.7);
    // ₹40,000 ticks into the first ruled result frame
    const tGp = cue("s05", "@leaves") + 0.15;
    const f2 = film.fr[2];
    tl.set(f2.lab, { opacity: 0 }, T0);
    L.drop(tl, f2.c, tGp, { dur: 0.35 }); film.showValue(tl, tGp + 0.05, 2, 40000, 0.8);
    // "That's called gross profit." — the label arrives with the term
    tl.to(f2.lab, { opacity: 1, duration: 0.25 }, cue("s05", "@gross"));
    K.pulseNode(tl, f2.c, cue("s05", "@gross") + 0.1, 1.06);
    khata.expr(tl, cue("s05", "@gross"), "happy").hop(tl, cue("s05", "@gross"), { height: 36 });
    L.allow(svg);
  };
})();
