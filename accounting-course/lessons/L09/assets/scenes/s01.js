// s01 — Cold open: Meera hunts for the cash in the journal. A paper journal (4 spreads) flips faster and faster; the cash entries
// flash and cream signed chips pop above (+50,000 · −36,000 · +18,000 · −5,000). The pages lift off into 17 small entry cards
// (6-6-5), twelve of which glow (the ones that touch cash); counters 17 / 12. Meera slumps. A loose journal page floats down and
// covers the lens → s01t slides it away.
(function () {
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L9 = window.L9, T0 = sc.start, GY = 1015;
    const world = K.g(svg, {});
    L9.stage(world, C.saffron, 880);
    const cal = L9.cal(svg, 1);

    // ---- Meera (left), the galla (right) with a `₹ ?` chip
    const m = K.meera(world, 390, GY, 1.0, { expr: "puzzled" });
    const galla = K.galla(world, 1700, 884, 1.05, { open: false });
    const qChip = L9.chip(world, 1700, 668, "₹ ?", { size: 60, w: 190 });

    // ---- the journal: an open book standing on the counter, four spreads of scribbled entries (only dates are real text)
    const PW = 420, PH = 560, GAP = 24;
    const ENT = [
      { t: 1, d: "Apr 1", cash: 1 }, { t: 2, d: "Apr 1", cash: 1 }, { t: 3, d: "Apr 2", cash: 1 }, { t: 4, d: "Apr 2", cash: 1 },
      { t: 5, d: "Apr 3" }, { t: 6, d: "Apr 5", cash: 1 }, { t: 7, d: "Apr 15", cash: 1 }, { t: 8, d: "Apr 15", cash: 1 },
      { t: 9, d: "Apr 16" }, { t: 10, d: "Apr 20", cash: 1 }, { t: 11, d: "Apr 22", cash: 1 }, { t: 12, d: "Apr 25" },
      { t: 13, d: "Apr 30", cash: 1 }, { t: 14, d: "Apr 30" }, { t: 15, d: "Apr 30" }, { t: 16, d: "Apr 30", cash: 1 }, { t: 17, d: "Apr 30", cash: 1 },
    ];
    const SPREADS = [[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14, 15], [16, 17]]];
    const bk = L9.node(world, 1130, 572);
    L9.hide(bk);
    K.tex(K.shadow(bk, 2), K.cutRect(-PW - GAP / 2 - 28, -PH / 2 - 26, PW * 2 + GAP + 56, PH + 52, 2.4, 28), "pat-cover");
    K.paper(bk, K.cutRect(-PW - GAP / 2 - 28, -PH / 2 - 26, PW * 2 + GAP + 56, PH + 52, 2.4, 28), C.red, { opacity: 0.3 });
    K.tex(K.shadow(bk, 1), K.cutRect(-PW - GAP / 2, -PH / 2, PW, PH, 1.4, 26), "pat-paper");
    K.tex(K.shadow(bk, 1), K.cutRect(GAP / 2, -PH / 2, PW, PH, 1.4, 26), "pat-paper");
    K.ink(bk, [[0, -PH / 2], [0, PH / 2]], GAP * 0.8, C.redDark, { opacity: 0.5 });
    const hl = {};                                               // entry index → highlight node
    const mkPage = (parent, x0, list) => {
      const pg = K.g(parent, {});
      list.forEach((ti, i) => {
        const e = ENT[ti - 1], y0 = -PH / 2 + 14 + i * 178;
        const hlr = K.g(pg, { opacity: 0 });
        K.paper(hlr, K.cutRect(x0 + 8, y0 - 2, PW - 16, 160, 1, 22), C.cream);
        K.el("path", { d: K.cutRect(x0 + 8, y0 - 2, PW - 16, 160, 1, 22), fill: "none", stroke: C.gold, "stroke-width": 8, "stroke-linejoin": "round" }, hlr);
        hl[ti] = hlr;
        K.text(pg, x0 + 26, y0 + 28, e.d, { size: 34, weight: 700, anchor: "start" });
        const w1 = 230 + K.sh(ti * 5) * 60, w2 = 170 + K.sh(ti * 7 + 2) * 60;
        K.ink(pg, [[x0 + 28, y0 + 82], [x0 + 28 + w1, y0 + 82]], 8, "#6b5e55", { opacity: 0.55 });
        K.ink(pg, [[x0 + 60, y0 + 124], [x0 + 60 + w2, y0 + 124]], 8, "#6b5e55", { opacity: 0.55 });
        if (e.cash) K.coin(pg, x0 + PW - 50, y0 + 30, 18, K.sh(ti) * 20);
      });
      return pg;
    };
    const sp = SPREADS.map(([l, r]) => ({ L: mkPage(bk, -PW - GAP / 2, l), R: mkPage(bk, GAP / 2, r) }));
    sp.slice(1).forEach((s) => { tl.set(s.L, { opacity: 0 }, 0); tl.set(s.R, { autoAlpha: 0 }, 0); });
    let cur = 0;
    const flip = (t, to, d = 0.22) => {
      const a = sp[cur], b = sp[to];
      tl.to(a.R, { scaleX: 0, svgOrigin: O, duration: d / 2, ease: "power1.in" }, t);
      tl.set(a.R, { autoAlpha: 0 }, t + d / 2);
      tl.set(a.L, { opacity: 0 }, t + d / 2);
      tl.set(b.L, { opacity: 1 }, t + d / 2);
      tl.fromTo(b.R, { autoAlpha: 0, scaleX: 0, svgOrigin: O }, { autoAlpha: 1, scaleX: 1, svgOrigin: O, duration: d / 2, ease: "power1.out", immediateRender: false }, t + d / 2);
      cur = to;
    };
    const flash = (t, ti, hold = 1.3) => {
      tl.fromTo(hl[ti], { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "power2.out", immediateRender: false }, t);
      tl.to(hl[ti], { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.14 + hold);
    };

    // ---- cream signed chips along the top (ink on cream — NOT blue/orange: these are money in / out of the galla)
    const chips = ["+50,000", "−36,000", "+18,000", "−5,000"].map((s, i) => L9.chip(world, 790 + i * 250, 222, s, { size: 46, w: 232 }));

    // ---- 17 small entry cards (6-6-5) laid out over the counter — 12 touch cash
    const cards = ENT.map((e, i) => {
      const col = i % 6, row = Math.floor(i / 6), x = 812 + col * 192, y = 232 + row * 130;
      const n = L9.node(world, x, y); L9.hide(n);
      const body = K.g(n, {});
      K.tex(K.shadow(body, 1), K.cutRect(-90, -60, 180, 120, 1.6, 20), "pat-paper");
      const ring = K.el("path", { d: K.cutRect(-86, -56, 172, 112, 1.2, 20), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, body);
      K.text(body, 0, -20, e.d, { size: 34, weight: 700 });
      return { n, body, ring, cash: !!e.cash, x, y };
    });
    const bigAmt = [50000, 30000, 36000, 6000, 8000, 5000, 18000, 15000, 6000, 5000, 4000, 4000, 22000, 4000, 8000, 3300, 3000];
    cards.forEach((c, i) => K.text(c.body, 0, 22, K.fmtIN(bigAmt[i]), { size: 36, weight: 800, color: C.ink }));
    const c17 = L9.chip(world, 850, 700, "17", { size: 72, w: 250 });
    const c12 = L9.chip(world, 1100, 700, "12", { size: 72, w: 250 });
    const cf = K.g(c17.n, {}); K.medallion(cf, -86, 0, 30, "file-text");
    K.coin(c12.n, -88, 0, 26, 0);

    // ---- the loose journal page that covers the lens at the end
    const page = K.g(svg, {});
    K.el("rect", { x: -10, y: -10, width: 1940, height: 1100, fill: C.cream }, page);
    for (let i = 0; i < 12; i++) K.ink(page, [[0, 130 + i * 78], [1920, 130 + i * 78]], 2.5, "#c9b79a", { opacity: 0.55 });
    K.ink(page, [[250, 0], [250, 1080]], 3.5, "#e7a49a");
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    L9.allow(svg);

    // ======================================================================================= timeline
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 0.9, ease: "power1.out" }, T0);
    m.blinks(tl, T0 + 1.2, sc.end, 3.1); m.jitter(tl, T0, sc.end);
    // "Meera has one simple question. How much cash is in the galla right now?"
    const tG = cue("s01a", "@galla");
    m.expr(tl, cue("s01a", "@meera"), "thinking").look(tl, cue("s01a", "@meera"), 7, -2);
    galla.open && galla.open(tl, tG - 0.1);
    L9.drop(tl, qChip.n, tG, { dur: 0.35 });
    m.arm(tl, tG, "R", 70, 40, 0.3);
    // "The answer is in the journal. Somewhere."
    const tJ = cue("s01a", "@journal");
    L9.drop(tl, bk, tJ - 0.1, { dur: 0.4 });
    m.look(tl, tJ + 0.1, -6, 6).expr(tl, tJ, "worried");
    // frantic flipping (0.5 s → 0.25 s per flip), ends on spread 0 just before "April first"
    const tF = tJ + 0.5, tFirst = cue("s01a", "@first");
    const seq = [[0, 1, 0.34], [0.55, 2, 0.3], [0.95, 3, 0.26], [1.25, 2, 0.24], [1.5, 1, 0.22], [1.72, 0, 0.22]];
    seq.forEach(([dt, to, d], i) => {
      const t = Math.min(tF + dt, tFirst - 0.3);
      flip(t, to, d);
      m.arm(tl, t - 0.02, "R", 55, 85, 0.1); m.arm(tl, t + d, "R", 40, 60, 0.1);
    });
    // 1st — April 1
    L9.drop(tl, chips[0].n, tFirst + 0.15, { dur: 0.3 }); flash(tFirst, 1);
    m.look(tl, tFirst, 0, 8).expr(tl, tFirst, "puzzled");
    // 2nd — April 2
    const tSec = cue("s01a", "@second");
    cal.tickTo(tl, tSec, 2, { dur: 0.4 });
    L9.drop(tl, chips[1].n, tSec + 0.15, { dur: 0.3 }); flash(tSec, 3);
    m.arm(tl, tSec - 0.1, "R", 60, 70, 0.15);
    // 15th — flip to spread 1
    const tFif = cue("s01a", "@fifteenth"), tTw = cue("s01a", "@twentieth");
    flip(tFif - 0.3, 1, 0.24); cal.tickTo(tl, tFif - 0.1, 15, { dur: 0.7, stepped: true });
    L9.drop(tl, chips[2].n, tFif + 0.15, { dur: 0.3 }); flash(tFif, 7);
    m.arm(tl, tFif - 0.3, "R", 55, 85, 0.1);
    // 20th — flip to spread 2
    flip(tTw - 0.3, 2, 0.22); cal.tickTo(tl, tTw - 0.1, 20, { dur: 0.5, stepped: true });
    L9.drop(tl, chips[3].n, tTw + 0.15, { dur: 0.3 }); flash(tTw, 10);
    m.arm(tl, tTw - 0.3, "R", 55, 85, 0.1); m.expr(tl, tTw + 0.3, "worried");

    // ---------------- s01b — pages lift off, 17 cards, 12 glow
    const t17 = cue("s01b", "@seventeen");
    tl.to(bk, { autoAlpha: 0, y: 40, duration: 0.3, ease: "power2.in" }, t17 - 0.35);
    chips.forEach((c, i) => L9.lift(tl, c.n, t17 - 0.4 + i * 0.04, { dur: 0.2 }));
    L9.lift(tl, qChip.n, t17 - 0.3, { dur: 0.2 });
    cards.forEach((c, i) => L9.drop(tl, c.n, t17 - 0.05 + i * 0.07, { dur: 0.3, from: 1.1 }));
    L9.drop(tl, c17.n, t17 + 0.3, { dur: 0.3 });
    m.expr(tl, t17, "amazed");
    const t12 = cue("s01b", "@twelve");
    cards.forEach((c, i) => {
      if (c.cash) { tl.to(c.ring, { opacity: 1, duration: 0.15 }, t12 + i * 0.05); K.pulseNode(tl, c.body, t12 + i * 0.05, 1.08); }
      else tl.to(c.body, { opacity: 0.45, duration: 0.3 }, t12 + 0.1);
    });
    L9.drop(tl, c12.n, t12 + 0.1, { dur: 0.3 });
    const tSc = cue("s01b", "@scattered");
    m.look(tl, tSc, 8, -4);
    // ---------------- s01c — "there has to be a faster way"
    const tFa = cue("s01c", "@faster");
    m.expr(tl, tFa - 0.2, "sad").lean(tl, tFa, 6);
    m.arm(tl, tFa, "R", 40, 100, 0.4).arm(tl, tFa + 0.1, "L", 40, 100, 0.4);
    m.expr(tl, cue("s01c", "@number") + 0.3, "thinking");
    // the loose journal page floats down over the lens, ending exactly at the scene end
    const tEnd = sc.end;
    tl.set(page, { y: -1500, rotation: 7, svgOrigin: "960 0" }, 0);
    tl.to(page, { y: 0, rotation: 0, svgOrigin: "960 0", duration: 1.15, ease: "power2.inOut" }, tEnd - 1.15);
  };
})();
