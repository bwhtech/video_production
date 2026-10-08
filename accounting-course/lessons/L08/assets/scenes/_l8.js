// Lesson-8 local helper kit — loaded after _shared.js, before every scene (index.template). Lesson-local only (shared kit untouched).
(function () {
  const K = window.KIT, C = K.C;
  const L8 = (window.L8 = window.L8 || {});
  const O = "0 0";

  L8.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L8.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L8.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L8.cal = (parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L8.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L8.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L8.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L8.qmark = (parent, x, y, s = 1) => { const n = L8.node(parent, x, y); K.qmark(n, 0, 0, s, C.coral); L8.hide(n); return n; };
  L8.at = (t0) => (d) => t0 + d;

  // full-frame red cloth ledger cover with a gold numeral (the "9" closes s11; s12 swings it open)
  L8.cover = (parent, numeral) => {
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(numeral), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  L8.cover9 = (parent) => L8.cover(parent, 9);
})();

// ---- more shared bits (appended)
(function () {
  const K = window.KIT, C = K.C, L8 = window.L8, O = "0 0";

  // a ruled journal page for the s11 tease: rows = [{amt, lit}|null] — null = a pencil squiggle. Origin = centre.
  L8.page = (parent, x, y, rot, rows, o = {}) => {
    const w = o.w || 330, h = o.h || 470;
    const pos = L8.node(parent, x, y); pos.parentNode.setAttribute("transform", `translate(${x} ${y}) rotate(${rot})`);
    const body = K.g(pos, {});
    K.tex(K.shadow(body, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    K.paper(body, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 16), C.red);
    const lit = [];
    rows.forEach((r, i) => {
      const ry = -h / 2 + 90 + i * 112;
      K.ink(body, [[-w / 2 + 22, ry + 50], [w / 2 - 22, ry + 50]], 2.5, "#a39684", { opacity: 0.5 });
      if (!r) { K.ink(body, [[-w / 2 + 34, ry + 6], [-6, ry - 8], [20, ry + 8], [w / 2 - 70, ry - 4]], 5, "#7d7468", { opacity: 0.55 }); return; }
      const strip = K.paper(body, K.cutRect(-w / 2 + 12, ry - 40, w - 24, 90, 1.2, 20), C.gold, { opacity: 0 });
      K.text(body, w / 2 - 28, ry + 6, r.amt, { size: 44, weight: 800, anchor: "end" });
      K.ink(body, [[-w / 2 + 34, ry + 6], [-w / 2 + 96, ry + 6]], 5, "#7d7468", { opacity: 0.55 });
      lit.push({ strip, amt: r.amt });
    });
    return { n: pos, body, lit };
  };
})();

(function () {
  const K = window.KIT, C = K.C, L8 = window.L8;
  // plain white paper card (centre origin)
  L8.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };
})();

// ---------------------------------------------------------------------------------------------------------------- journal-scene helpers
(function () {
  const K = window.KIT, C = K.C, L8 = window.L8, O = "0 0";
  let UID = 1;

  // curved colour wipe: a second wall (colour) revealed through a circle that grows from (cx, cy). Create it right after the first wall.
  L8.circleWipe = (parent, color, wallY, cx, cy) => {
    const id = "l8cw" + UID++;
    const cp = K.el("clipPath", { id }, parent);
    const circle = K.el("circle", { cx, cy, r: 0 }, cp);
    const grp = K.g(parent, { "clip-path": `url(#${id})` });
    K.wall(grp, color, wallY);
    return { g: grp, run(tl, t, dur = 0.9) { tl.to(circle, { attr: { r: 2300 }, duration: dur, ease: "power2.inOut" }, t); return t + dur; } };
  };

  // gold paper ring that flashes round a box (the "ding" light) — box = [x0, y0, x1, y1] in parent coords
  L8.flashRing = (parent, tl, t, box, hold = 0.9, pad = 14) => {
    const [x0, y0, x1, y1] = box;
    const ring = K.el("path", { d: K.cutRect(x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad, 1.2, 24), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, parent);
    ring.setAttribute("data-layout-allow-overlap", "true");
    tl.fromTo(ring, { opacity: 0 }, { opacity: 0.95, duration: 0.14, ease: "power2.out", immediateRender: false }, t);
    tl.to(ring, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.14 + hold);
    return ring;
  };

  // a wood pencil whose TIP is the node origin (0,0); eraser end up-right. goto() flies it (smooth), sweep() moves it with a write-on.
  L8.pencil = (parent, x, y, s = 1) => {
    const outer = K.g(parent, { transform: `translate(${x} ${y})` }), n = K.g(outer, {}), art = K.g(n, { transform: `scale(${s})` });
    n.setAttribute("opacity", "0"); n.setAttribute("data-layout-allow-overlap", "true");
    const a = K.shadow(art, 1);
    K.paper(a, K.cutPoly([[0, 0], [10, -22], [22, -14]], 0.3, 6), "#e9c9a0");
    K.paper(a, K.cutPoly([[0, 0], [3, -7], [7, -4]], 0.2, 5), C.ink);
    K.paper(a, K.cutPoly([[10, -22], [22, -14], [72, -86], [62, -92]], 0.4, 8), C.gold);
    K.paper(a, K.cutPoly([[62, -92], [72, -86], [80, -96], [70, -102]], 0.3, 6), C.pink);
    const st = { x, y };
    const rig = {
      g: outer, n, x, y,
      show(tl, t) { K.dropIn(tl, n, t, { dur: 0.25 }); return rig; },
      hide(tl, t) { K.liftOff(tl, n, t, { dur: 0.2 }); return rig; },
      goto(tl, t, tx, ty, dur = 0.35) { tl.to(outer, { x: tx, y: ty, duration: dur, ease: "power2.inOut" }, t); st.x = tx; st.y = ty; return rig; },
      // stepped sweep across a cell while it writes (follows the wipe)
      sweep(tl, t, x1, dur, jig = 5) {
        const steps = Math.max(2, Math.round(dur * 15));
        for (let i = 1; i <= steps; i++) tl.set(outer, { x: st.x + (x1 - st.x) * (i / steps), y: st.y + (i % 2 ? -jig : 0) }, t + (dur * i) / steps);
        st.x = x1; return rig;
      },
    };
    return rig;
  };

  // left-to-right clip reveal ("writes on" behind the pencil), stepped on twos. Returns {g(content group), run(tl,t,dur)}.
  L8.wipe = (parent, x, y, w, h) => {
    const id = "l8wp" + UID++;
    const cp = K.el("clipPath", { id }, parent);
    const rect = K.el("rect", { x, y, width: 0, height: h }, cp);
    const grp = K.g(parent, { "clip-path": `url(#${id})` });
    return { g: grp, rect, run(tl, t, dur) { tl.to(rect, { attr: { width: w + 4 }, duration: dur, ease: K.stepEase(dur, "none", t) }, t); return t + dur; } };
  };
  // write a string into a card-local cell: text left edge at x (anchor start), vertical centre y. Returns {g, tEnd, width}
  L8.writeText = (parent, tl, t, x, y, str, o = {}) => {
    const size = o.size || 38, w = Math.max(60, str.length * size * 0.56 + 20), h = o.h || 70;
    const wp = L8.wipe(parent, x - 4, y - h / 2, w, h);
    const tx = K.text(wp.g, x, y + 3, str, { size, weight: o.weight || 700, anchor: "start", color: o.color || C.ink });
    tx.setAttribute("data-layout-allow-overlap", "true");
    const dur = o.dur || Math.min(1.0, 0.2 + str.length * 0.05);
    wp.run(tl, t, dur);
    return { g: wp.g, tEnd: t + dur, width: w, text: tx };
  };

  // the three-question checklist (addendum 2026-10-06): ① two empty slots · ② family medallion · ③ L | R — docked top-left, ticks in order
  L8.checklist = (parent, x, y, s = 0.6) => {
    const root = K.g(parent, { transform: `translate(${x} ${y}) scale(${s})` }), body = K.g(root, {});
    body.setAttribute("data-layout-allow-overlap", "true");
    const chips = [], W = 170, H = 130, gap = 22;
    const mk = (i, draw) => {
      const n = L8.node(body, i * (W + gap) + W / 2, 0); L8.hide(n);
      K.tex(K.shadow(n, 1), K.cutRect(-W / 2, -H / 2, W, H, 1.6, 20), "pat-paper");
      K.paper(n, K.cutEll(-W / 2 + 22, -H / 2 + 22, 20, 20, 0.6), C.saffron);
      K.text(n, -W / 2 + 22, -H / 2 + 24, String(i + 1), { size: 26, weight: 800 });
      draw(n);
      const tickG = L8.node(n, W / 2 - 18, H / 2 - 18); const tm = K.tickMark(tickG, 0, 0, 1.1, { color: C.leaf, w: 9 }); tm.body.setAttribute("opacity", "1");
      const tick = { tm };
      chips.push({ n, tick });
      return n;
    };
    mk(0, (n) => { [-34, 34].forEach((sx) => K.el("path", { d: K.cutRect(sx - 28, -14, 56, 50, 0.8, 16), fill: C.cream, stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "9 7", opacity: 0.9 }, n)); });
    mk(1, (n) => { [["box", C.wood, -50], ["user", C.sky, 0], ["receipt", C.navy, 50]].forEach(([ic, col, dx]) => K.medallion(n, dx, 10, 20, ic, col)); });
    mk(2, (n) => {
      K.paper(n, K.cutRect(-62, -10, 62, 52, 0.8, 14), C.dr); K.paper(n, K.cutRect(0, -10, 62, 52, 0.8, 14), C.cr);
      K.text(n, -31, 18, "L", { size: 38, weight: 800, color: "#fff" }); K.text(n, 31, 18, "R", { size: 38, weight: 800, color: "#fff" });
    });
    const rig = {
      g: root, chips,
      enter(tl, t, i) { K.dropIn(tl, chips[i].n, t, { dur: 0.3 }); return rig; },
      tick(tl, t, i) { chips[i].tick.tm.draw(tl, t, 0.26); K.pulseNode(tl, chips[i].n, t, 1.06); return rig; },
      fadeTicks(tl, t) { return rig; },
    };
    // tick marks start undrawn (dashoffset) — nothing else to hide
    return rig;
  };

  // the A/c = account chip: cream chip, `A/c` large + `account` small beneath, tied by a thread to a point
  L8.acChip = (parent, x, y) => {
    const n = L8.node(parent, x, y); L8.hide(n);
    K.paper(K.shadow(n, 1), K.cutRect(-84, -52, 168, 104, 1.6, 22), C.cream);
    K.text(n, 0, -10, "A/c", { size: 54, weight: 800, color: C.drText });
    K.text(n, 0, 32, "account", { size: 28, weight: 700, color: "#5b4f45" });
    return n;
  };

  // the corner Scale HUD. Pans: left = Dr (blue, assets side), right = Cr. Totals chips ≈ 30 px. Returns the scaleRig; rig.appear(tl, t).
  L8.hud = (parent, tl, T0, o = {}) => {
    const rig = K.scaleRig(parent, 960, 895, 1.1, { tint: true, L: 0, R: 0, equation: false });
    rig.g.setAttribute("opacity", "0");
    rig.hud(tl, T0, true, { dur: 0.01, text: 34, k: 0.26, top: 120, right: 40, ...(o.hud || {}) });
    rig.appear = (t) => { tl.to(rig.g, { opacity: 1, duration: 0.3, ease: "power1.out" }, t); return rig; };
    rig.vanish = (t) => { tl.to(rig.g, { opacity: 0, duration: 0.25, ease: "power1.in" }, t); return rig; };
    return rig;
  };
})();

(function () {
  const K = window.KIT, C = K.C, L8 = window.L8, O = "0 0";
  // a small object flies on a smooth arc from (x0,y0) to (x1,y1) (parent coords), shrinking to k, then vanishes. make(node) draws it around (0,0).
  L8.fly = (parent, tl, t, from, to, make, o = {}) => {
    const n = L8.node(parent, from[0], from[1]); L8.hide(n); make(n);
    const dur = o.dur ?? 0.8, k = o.k ?? 0.3, up = o.arc ?? 120;
    tl.set(n, { opacity: 1 }, t);
    tl.to(n, { x: to[0] - from[0], duration: dur, ease: "power1.inOut" }, t);
    tl.to(n, { y: (to[1] - from[1]) / 2 - up, duration: dur * 0.5, ease: "power2.out" }, t);
    tl.to(n, { y: to[1] - from[1], duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
    tl.to(n, { scale: k, svgOrigin: O, duration: dur, ease: "power2.inOut" }, t);
    if (o.keep !== true) tl.to(n, { opacity: 0, duration: 0.12, ease: "none" }, t + dur - 0.06);
    return n;
  };
  // where the corner-HUD pans sit in world coords (matches L8.hud defaults: k .26, right 40, top 120)
  L8.hudPos = (k = 0.26, right = 40, top = 120) => {
    const s = 1.1, bx = 1920 - right - k * s * 640, by = top + 600 * k * s;
    return { L: [bx - k * s * 380, by - k * s * 270], R: [bx + k * s * 380, by - k * s * 270], base: [bx, by], k: k * s };
  };
  // local card coordinates (journalCard s=1 frame): the cells the kit writes into
  L8.JX = { date: -699, part: -543, drSuffix: 75, drR: 307, crR: 537, tag: 644, head: { date: -632, part: -227 } };
})();

// ---------------------------------------------------------------------------------------------------------------- the entry-scene scaffold (s05–s08)
(function () {
  const K = window.KIT, C = K.C, L8 = window.L8, O = "0 0", JX = L8.JX;
  const CARD = { x: 960, y: 822, s: 0.95 };
  L8.CARD = CARD;
  L8.P = (lx, ly) => [CARD.x + lx * CARD.s, CARD.y + ly * CARD.s];

  // builds: wall + table + calendar(30) · the JournalCard (heads labelled, `rows` rows) · docked checklist · corner HUD (+ pan jars on demand) · Khata (open, bottom centre) · pencil.
  // o: { color, rows = 5, heads = true, khata = true, hudAt, khataX }
  L8.scaffold = (svg, tl, K, sc, o = {}) => {
    const T0 = sc.start, S = { T0 };
    K.wall(svg, o.color || C.saffron, 880);
    if (o.wipe) S.wipe = L8.circleWipe(svg, o.wipe.color, 880, o.wipe.cx, o.wipe.cy);
    K.table(svg, 880);
    L8.cal(svg, 30);
    S.cardPos = L8.node(svg, 0, 0);
    S.jc = K.journalCard(S.cardPos, CARD.x, CARD.y, CARD.s, { rows: o.rows || 5, heads: o.heads === false ? false : true });
    S.khata = o.khata === false ? null : K.khataRig(svg, o.khataX ?? 960, 1045, 0.68, { expr: "awake", open: true });
    S.check = L8.checklist(svg, 50, 172, 0.74);
    S.pencil = L8.pencil(svg, 1120, 930, 0.9);
    S.hud = L8.hud(svg, tl, T0); S.HP = L8.hudPos(); S.jars = {};
    const jc = S.jc;
    S.y = (i) => jc.lineY(i);
    const tk = {}, tags = {}, qs = {};
    const goto = (t, lx, i, d = 0.3) => { const [px, py] = L8.P(lx, S.y(i) + 16); S.pencil.goto(tl, t, px, py, d); };
    S.goto = goto;
    // text cells
    S.date = (t, i, str, d = 0.5) => { goto(t - 0.35, JX.date, i); const w = L8.writeText(jc.body, tl, t, JX.date, S.y(i), str, { size: 36, weight: 600, dur: d }); S.pencil.sweep(tl, t, L8.P(JX.date + 120, 0)[0], d); return w; };
    S.acct = (t, i, str, o2 = {}) => {
      const x = JX.part + (o2.to ? 60 : 0), size = str.length > 22 ? 34 : 38, dur = o2.dur || Math.min(1.1, 0.25 + str.length * 0.045);
      goto(t - 0.35, x, i); const w = L8.writeText(jc.body, tl, t, x, S.y(i), str, { size, weight: 700, dur }); S.pencil.sweep(tl, t, L8.P(x + str.length * size * 0.54, 0)[0], dur); return w;
    };
    S.drMark = (t, i) => { goto(t - 0.3, JX.drSuffix - 46, i); const w = L8.writeText(jc.body, tl, t, JX.drSuffix - 46, S.y(i), "Dr", { size: 36, weight: 800, color: C.drText, dur: 0.3 }); S.pencil.sweep(tl, t, L8.P(JX.drSuffix, 0)[0], 0.3); return w; };
    S.amt = (t, i, side, value, dur = 0.7) => {
      const key = i + side;
      if (!tk[key]) {
        tk[key] = K.ticker(jc.body, side === "cr" ? JX.crR : JX.drR, S.y(i) + 3, 1, { value: 0, size: 40, weight: 800, anchor: "end", prefix: "", color: side === "cr" ? C.crText : C.drText, hidden: true });
        tk[key].body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
      }
      goto(t - 0.2, (side === "cr" ? JX.crR : JX.drR) - 150, i, 0.2);
      tk[key].enter(tl, t, { dur: 0.2 }); tk[key].to(tl, t, value, dur);
      return tk[key];
    };
    S.tickers = tk;
    S.tag = (t, i, rule, side, o2 = {}) => {
      const g = K.ruleTag(jc.body, JX.tag, S.y(i), 1, { rule, side, compact: true, hidden: true });
      g.enter(tl, t, { dur: 0.25 }); if (o2.light) g.light(tl, t + 0.3, { hold: 0.8 });
      tags[i] = g; return g;
    };
    S.narr = (t, i, icon, text) => { goto(t - 0.2, JX.part + 60, i, 0.3); const nl = jc.narration(tl, t, { icon, text, row: i }); S.pencil.sweep(tl, t, L8.P(JX.part + 60 + 330, 0)[0], nl.tEnd - t); return nl; };
    // "?" chip in an amount cell (T14 gap beat) — returns {show(t), hide(t)}
    S.qcell = (i, side) => {
      const n = L8.node(jc.body, (side === "cr" ? JX.crR : JX.drR) - 100, S.y(i)); L8.hide(n);
      const col = side === "cr" ? C.cr : C.dr;
      K.paper(K.shadow(n, 1), K.cutRect(-46, -26, 92, 52, 1, 16), C.cream); K.el("path", { d: K.cutRect(-40, -20, 80, 40, 0.8, 16), fill: "none", stroke: col, "stroke-width": 4, "stroke-dasharray": "9 7" }, n);
      K.text(n, 0, 3, "?", { size: 40, weight: 800, color: col }).setAttribute("data-layout-allow-overlap", "true");
      return { n, show(t) { L8.drop(tl, n, t, { dur: 0.25 }); }, hide(t) { L8.lift(tl, n, t, { dur: 0.15 }); } };
    };
    S.jar = (side, key, label, contents, edge) => {
      const j = K.jarRig(S.hud.pans[side].g, 0, 0, 0.8, { label, contents: contents || "coins", fill: 0.6, edge: edge || (side === "L" ? C.dr : C.cr), hidden: true }); S.jars[key] = j; return j;
    };
    S.drop = (t, n, d) => L8.drop(tl, n, t, d);
    // the card + checklist enter at scene start
    const tIn = o.at ?? T0 + 0.1; S.tIn = tIn;
    L8.hide(S.cardPos); tl.fromTo(S.cardPos, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tIn);
    [0, 1, 2].forEach((i) => S.check.enter(tl, tIn + 0.15 + i * 0.1, i));
    S.hud.appear(tIn + 0.2); S.pencil.show(tl, tIn + 0.4);
    if (S.khata) { S.khata.jitter(tl, T0, sc.end); S.khata.blink(tl, T0 + 3); }
    return S;
  };
})();

(function () {
  const K = window.KIT, C = K.C, L8 = window.L8;
  // name chip above a head (first on-screen appearance): cream chip + text, drop in, hold, tuck away
  L8.nameChip = (parent, tl, x, y, str, t, hold = 1.5) => {
    const n = L8.node(parent, x, y); L8.hide(n);
    const w = Math.max(120, str.length * 26 + 50);
    K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -32, w, 64, 1.4, 20), C.cream); K.text(n, 0, 3, str, { size: 40, weight: 800 });
    L8.drop(tl, n, t, { dur: 0.3 }); L8.lift(tl, n, t + hold, { dur: 0.25 });
    return n;
  };
  // a labelled medallion object (for the "which two things changed" lights): icon disc + label chip below. Origin = bottom centre.
  L8.labelled = (parent, x, y, icon, label, col) => {
    const n = L8.node(parent, x, y); L8.hide(n);
    K.medallion(n, 0, -125, 78, icon, col);
    K.paper(K.shadow(n, 1), K.cutRect(-100, -38, 200, 60, 1.4, 20), C.cream); K.text(n, 0, -8, label, { size: 38, weight: 800 });
    return n;
  };
})();

(function () {
  const K = window.KIT, C = K.C, L8 = window.L8;
  // an extra "which changed" slot with its filled chip (the 3-slot squeeze): dashed cream slot + coloured chip {label, delta, side}. Origin = centre. Returns {slot, chip}.
  L8.extraSlot = (parent, x, y, spec) => {
    const slot = L8.node(parent, x, y); L8.hide(slot);
    K.paper(K.shadow(slot, 1), K.cutRect(-170, -62, 340, 124, 2, 22), C.cream, { opacity: 0.55 });
    K.el("path", { d: K.cutRect(-162, -54, 324, 108, 1.2, 24), fill: "none", stroke: C.ink, "stroke-width": 4.5, "stroke-dasharray": "16 11", "stroke-linecap": "round", opacity: 0.8 }, slot);
    const chip = K.g(slot, {}); L8.hide(chip);
    const col = spec.side === "R" ? C.cr : C.dr;
    K.paper(K.shadow(chip, 1), K.cutRect(-167, -59, 334, 118, 2, 22), col);
    const up = spec.delta > 0, ax = -167 + 36;
    K.paper(K.shadow(chip, 1), K.cutPoly(up ? [[ax, -22], [ax + 22, 14], [ax - 22, 14]] : [[ax, 22], [ax + 22, -14], [ax - 22, -14]], 0.6, 10), C.cream);
    K.text(chip, 22, -24, spec.label, { size: 34, weight: 700, color: K.onColor(col) }); K.text(chip, 22, 22, K.fmtINR(spec.delta, "₹", true), { size: 46, weight: 800, color: K.onColor(col) });
    return { slot, chip };
  };
})();
