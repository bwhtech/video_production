// books.js — book devices for L8–L14: golden-rule tags, journal card + strip, ledger page, trial-balance sheet, statements,
// weight chip, small-book shelf. Loads after devices.js; extends window.KIT. API: BOOKS.md.
// Same contract as devices.js: build DOM synchronously, then  method(tl, t, …)  adds tweens at ABSOLUTE time t and returns the
// rig. Call methods in time order per rig. Every rig has g, body, enter/exit/pulse and `{hidden:true}`.
// Deterministic: no Math.random / Date. Writing is a stepped clip-wipe on twos; numbers COUNT (tickers). No idle motion.
(function () {
  const K = window.KIT; if (!K) return;
  const C = K.C;
  const { g, el, paper, tex, ink, shadow, cutRect, cutEll, cutPoly, text } = K;
  const O = "0 0";
  const FPS = K.FPS || 15, STEP = 1 / FPS;
  let UID = 1;

  // ======================================================================================
  // shared helpers
  // ======================================================================================
  const hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  const T = (parent, x, y, str, o) => { const e = text(parent, x, y, str, o); e.setAttribute("data-layout-allow-overlap", "true"); return e; };
  const wrap = (parent, x, y, s, o = {}) => {
    const root = g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` });
    const body = g(root, {});
    if (o.hidden) hide(body);
    return { root, body };
  };
  function life(rig, body) {
    const st = {};
    rig.enter = (tl, t, o = {}) => { if (!st.touched) { hide(body); st.touched = true; } K.dropIn(tl, body, t, o); return rig; };
    rig.exit = (tl, t, o = {}) => { st.touched = true; K.liftOff(tl, body, t, o); return rig; };
    rig.pulse = rig.pulse || ((tl, t, k) => { K.pulseNode(tl, body, t, k); return rig; });
    return rig;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmtIN = (n) => K.fmtIN(n);
  const sn = (a) => (a === "cr" || a === "R" || a === "right" || a === "credit" ? "cr" : "dr");   // normalise a side name
  const sideCol = (side) => (sn(side) === "cr" ? C.cr : C.dr);
  const sideTxt = (side) => (sn(side) === "cr" ? C.crText : C.drText);
  const estW = (str, size) => String(str).length * size * 0.52;

  // left-to-right clip reveal ("writes on" behind the pencil), stepped on twos. Put the content in .g.
  function wipe(parent, x, y, w, h) {
    const id = "bkc" + UID++;
    const cp = el("clipPath", { id }, parent);
    const rect = el("rect", { x, y, width: 0, height: h }, cp);
    const grp = g(parent, { "clip-path": `url(#${id})` });
    const api = { g: grp, rect, w, run(tl, t, dur, o = {}) {
      tl.to(rect, { attr: { width: w + 4 }, duration: dur, ease: o.smooth ? "none" : K.stepEase(dur, "none", t) }, t);
      return t + dur;
    } };
    return api;
  }
  const writeDur = (str, size, speed = 1) => clamp(0.18 + String(str).length * 0.03, 0.3, 1.1) / speed;
  // tween opacity on a node that is not also an enter/exit target
  const fade = (tl, node, t, to, dur = 0.2) => tl.to(node, { opacity: to, duration: dur, ease: "power2.out" }, t);
  // flash a highlight group on and off (gold paper strip, never a glow)
  function flash(tl, node, t, hold = 1.0, peak = 0.45) {
    tl.fromTo(node, { opacity: 0 }, { opacity: peak, duration: 0.14, ease: "power2.out", immediateRender: false }, t);
    tl.to(node, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.14 + hold);
  }
  const popRow = (tl, node, t, cx, cy, k = 1.03) => {
    tl.to(node, { scale: k, svgOrigin: `${cx} ${cy}`, duration: 0.14, ease: "power2.out" }, t);
    tl.to(node, { scale: 1, svgOrigin: `${cx} ${cy}`, duration: 0.3, ease: "power2.inOut" }, t + 0.14);
  };
  // counting number cell (ticker, hidden until it lands)
  function cell(parent, x, y, o = {}) {
    const tk = K.ticker(parent, x, y, 1, { value: o.from || 0, size: o.size || 38, weight: o.weight || 700, anchor: o.anchor || "end", prefix: o.prefix === undefined ? "" : o.prefix, color: o.color, hidden: true });
    tk.body.firstChild && tk.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
    return tk;
  }
  function land(tl, tk, t, value, dur = 0.5) { tk.enter(tl, t, { dur: 0.22 }); tk.to(tl, t, value, dur); return t + dur; }

  // ======================================================================================
  // 1. RULE TAG — icon-first golden-rule chip (bible §5.5). Origin = CENTRE.
  //    [family medallion][rule glyph on cream disc][small word]   Dr blue / Cr orange by side.
  // ======================================================================================
  const FAMILY = {
    personal: { icon: "user", col: C.sky, name: "Personal" },
    real: { icon: "box", col: C.wood, name: "Real" },
    nominal: { icon: "receipt", col: C.navy, name: "Nominal" },
  };
  const RULES = {
    real_in: { fam: "real", glyph: "into", word: "comes in", side: "dr" },
    real_out: { fam: "real", glyph: "outof", word: "goes out", side: "cr" },
    personal_receiver: { fam: "personal", glyph: "palm", word: "receiver", side: "dr" },
    personal_giver: { fam: "personal", glyph: "giving", word: "giver", side: "cr" },
    nominal_expense: { fam: "nominal", glyph: "coinsout", word: "expense", side: "dr" },
    nominal_income: { fam: "nominal", glyph: "coinsin", word: "income", side: "cr" },
  };
  // flat paper glyphs, drawn around (0,0) in a ±22 box (promoted from L7)
  function ruleGlyph(parent, kind, x, y, k = 1, col = C.ink) {
    const gr = g(parent, { transform: `translate(${x} ${y}) scale(${k})` });
    const ik = (pts, w = 5) => ink(gr, pts, w, col);
    const poly = (pts) => paper(gr, cutPoly(pts, 0.3, 8), col);
    const box = () => ik([[-15, 2], [-11, 19], [11, 19], [15, 2]], 5.5);
    if (kind === "into") { box(); ik([[0, -21], [0, -3]], 5.5); poly([[-10, -6], [10, -6], [0, 8]]); }
    if (kind === "outof") { box(); ik([[0, 12], [0, -10]], 5.5); poly([[-10, -9], [10, -9], [0, -23]]); }
    if (kind === "palm") {
      paper(gr, cutRect(-13, 0, 26, 21, 0.8, 8), col);
      [[-9.5, -14], [-3.2, -19], [3.2, -18], [9.5, -12]].forEach(([fx, ft]) => paper(gr, cutRect(fx - 3.2, ft, 6.4, 6 - ft, 0.4, 6), col));
      paper(gr, cutPoly([[-13, 6], [-22, -2], [-18, -6], [-11, 0]], 0.3, 6), col);
    }
    if (kind === "giving") {
      paper(gr, cutRect(-22, 8, 26, 10, 0.6, 8), col);
      paper(gr, cutEll(8, 12, 14, 7, 0.5), col);
      paper(gr, cutEll(-2, -6, 9, 9, 0.5), C.goldDark);
      ik([[10, -6], [20, -6]], 4.5); poly([[16, -13], [16, 1], [24, -6]]);
    }
    if (kind === "coinsout") {
      [10, 3].forEach((cy) => paper(gr, cutEll(-6, cy, 12, 5.5, 0.4), C.goldDark));
      ik([[0, -2], [11, -13]], 5); poly([[16.7, -7.3], [5.3, -18.7], [18.8, -20.8]]);
    }
    if (kind === "coinsin") {
      [10, 3].forEach((cy) => paper(gr, cutEll(7, cy, 12, 5.5, 0.4), C.goldDark));
      ik([[-17, -17], [-3, -3]], 5); poly([[2.7, -8.7], [-8.7, 2.7], [3.4, 3.4]]);
    }
    return gr;
  }
  const famMedallion = (parent, fam, x, y, r) => K.medallion(parent, x, y, r, FAMILY[fam].icon, FAMILY[fam].col);

  const TAG = { W: 300, H: 86, CW: 150, CH: 64 };
  // o: { rule, side?, compact (icons only, 150×64), words (default true when !compact), hidden }
  function ruleTag(parent, x, y, s = 1, o = {}) {
    if (typeof s === "object") { o = s; s = o.s || 1; }
    const key = o.rule || o.key || "real_in", R = RULES[key];
    if (!R) throw new Error("K.ruleTag: unknown rule " + key);
    const side = sn(o.side || R.side), col = sideCol(side), compact = !!o.compact;
    const W = compact ? TAG.CW : TAG.W, H = compact ? TAG.CH : TAG.H;
    const { root, body } = wrap(parent, x, y, s, o);
    const c = g(body, {});
    paper(shadow(c, 1), cutRect(-W / 2, -H / 2, W, H, 1.6, 20), col);
    const fx = compact ? -W / 2 + 38 : -106, gx = compact ? W / 2 - 36 : -36, fr = compact ? 25 : 31, gr = compact ? 25 : 30;
    paper(c, cutEll(fx, 0, fr + 5, fr + 5, 0.6), C.cream);
    famMedallion(c, R.fam, fx, 0, fr);
    paper(shadow(c, 1), cutEll(gx, 0, gr, gr, 0.6), C.cream);
    ruleGlyph(c, R.glyph, gx, 1, compact ? 0.8 : 0.92, C.ink);
    if (!compact && o.words !== false) T(c, 72, 2, o.word || R.word, { size: 30, weight: 700, color: K.onColor(col) });
    const rig = {
      g: root, body, side, key, w: W, h: H,
      appear(tl, t, oo = {}) { return rig.enter(tl, t, oo); },
      // cream highlight strip over the chip (L8 s5 "the tag on the discussed line")
      light(tl, t, oo = {}) {
        const hl = rig._hl || (rig._hl = paper(body, cutRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12, 1.4, 20), C.cream, { opacity: 0 }));
        flash(tl, hl, t, oo.hold ?? 1.0, 0.7);
        return rig;
      },
    };
    return life(rig, body);
  }
  // dashed empty chip placeholder
  function emptyTag(parent, x, y, s = 1, o = {}) {
    const compact = !!o.compact, W = compact ? TAG.CW : TAG.W, H = compact ? TAG.CH : TAG.H;
    const { root, body } = wrap(parent, x, y, s, o);
    paper(body, cutRect(-W / 2, -H / 2, W, H, 1.4, 22), C.cream, { opacity: 0.55 });
    el("path", { d: cutRect(-W / 2 + 8, -H / 2 + 8, W - 16, H - 16, 1, 24), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.75 }, body);
    return life({ g: root, body, w: W, h: H }, body);
  }

  // ======================================================================================
  // ink tick mark — stroke-drawn ink check (posted ✓). Origin = centre.
  // ======================================================================================
  function tickMark(parent, x, y, s = 1, o = {}) {
    const { root, body } = wrap(parent, x, y, s, o);
    const L = 46;
    const p = el("path", { d: "M-13,1 L-4,12 L15,-12", fill: "none", stroke: o.color || C.ink, "stroke-width": o.w || 7, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": L, "stroke-dashoffset": L }, body);
    const rig = { g: root, body, path: p, draw(tl, t, dur = 0.26) { tl.to(p, { strokeDashoffset: 0, duration: dur, ease: K.stepEase(dur, "power1.out", t) }, t); return rig; } };
    return life(rig, body);
  }

  // ======================================================================================
  // 2. JOURNAL CARD (bible §5.9) — origin = BOTTOM CENTRE (opts.anchor "center" → centre)
  // ======================================================================================
  const J = { RH: 72, HEAD: 62, CH: 56, GUT: 44, DATE: 150, PART: 660, AMT: 230, TAGW: 170, RPAD: 18 };
  function journalCard(parent, x, y, s = 1, o = {}) {
    const N = o.rows || 7, tags = o.tags !== false;
    const W = J.GUT + J.DATE + J.PART + J.AMT * 2 + (tags ? J.TAGW : 0) + J.RPAD;
    const H = 10 + J.HEAD + 8 + J.CH + N * J.RH + 22;
    const oy = o.anchor === "center" ? H / 2 : 0;
    const { root, body } = wrap(parent, x, y + oy * s, s, o);
    const L = -W / 2, cx0 = L + J.GUT, partL = cx0 + J.DATE, drL = partL + J.PART, crL = drL + J.AMT, tagL = crL + J.AMT;
    const headY = -H + 10 + J.HEAD + 8, top0 = headY + J.CH + 4;
    const lineY = (i) => top0 + (i + 0.5) * J.RH;
    // paper + red header strip
    tex(shadow(body, 2), cutRect(L, -H, W, H, 2, 24), "pat-paper");
    paper(body, cutRect(L + 10, -H + 10, W - 20, J.HEAD, 1.5, 22), C.red);
    T(body, 0, -H + 10 + J.HEAD / 2 + 2, o.title || "Journal", { size: 44, weight: 800, color: C.cream });
    // faint column tints + rules
    paper(body, cutRect(drL, headY, J.AMT, -22 - headY, 0.6, 30), C.dr, { opacity: 0.07 });
    paper(body, cutRect(crL, headY, J.AMT, -22 - headY, 0.6, 30), C.cr, { opacity: 0.07 });
    [partL, drL, crL, ...(tags ? [tagL] : [])].forEach((vx) => ink(body, [[vx, headY + J.CH], [vx, -22]], 2.4, C.ink, { opacity: 0.3 }));
    for (let i = 0; i < N; i++) ink(body, [[L + 14, top0 + (i + 1) * J.RH], [L + W - 14, top0 + (i + 1) * J.RH]], 2, "#a39684", { opacity: 0.4 });
    // column heads (can label themselves late)
    const heads = {};
    const mkHead = (k, x0, w, label, col) => {
      const hg = g(body, {});
      if (col) paper(shadow(hg, 1), cutRect(x0 + 3, headY, w - 6, J.CH, 1, 20), col);
      else ink(hg, [[x0 + 6, headY + J.CH - 2], [x0 + w - 6, headY + J.CH - 2]], 3, C.ink, { opacity: 0.6 });
      T(hg, x0 + w / 2, headY + J.CH / 2 + 2, label, { size: 38, weight: 800, color: col ? K.onColor(col) : C.ink });
      if (o.heads === false) hide(hg);
      heads[k] = hg;
    };
    mkHead("date", cx0, J.DATE, o.dateLabel || "Date");
    mkHead("particulars", partL, J.PART, o.particularsLabel || "Particulars");
    mkHead("dr", drL, J.AMT, "Dr ₹", C.dr);
    mkHead("cr", crL, J.AMT, "Cr ₹", C.cr);
    const rowsLayer = g(body, {});
    const st = { next: 0, lines: [], t: 0 };
    const lineBox = (i) => ({ cy: lineY(i), x0: L + 8, w: W - 16 });

    const rig = {
      g: root, body, W, H, lines: st.lines, heads, rowH: J.RH, lineY,
      // absolute parent-space position of the centre of line i's cell: "date"|"particulars"|"dr"|"cr"|"tag"
      cellPos(i, col = "particulars") {
        const lx = { date: cx0 + J.DATE / 2, particulars: partL + J.PART / 2, dr: drL + J.AMT / 2, cr: crL + J.AMT / 2, tag: tagL + J.TAGW / 2, tick: L + J.GUT / 2 }[col];
        return { x: x + lx * s, y: y + oy * s + lineY(i) * s };
      },
      // column heads label themselves (drop-and-place onto their strip): which = "date"|"particulars"|"dr"|"cr"|"all"
      head(tl, t, which = "all", oo = {}) {
        const ks = which === "all" ? ["date", "particulars", "dr", "cr"] : [].concat(which);
        ks.forEach((k, i) => K.dropIn(tl, heads[k], t + i * (oo.stagger ?? 0.12), { dur: 0.3 }));
        return rig;
      },
      // write one journal LINE. spec: {date?, account, dr|cr (amount), to?, ac?(default true), tag?, row?, speed?, noAmount?}
      writeRow(tl, t, spec = {}) {
        const i = spec.row ?? st.next++; if (spec.row === undefined) { /* auto */ } else st.next = Math.max(st.next, i + 1);
        const side = spec.dr !== undefined || spec.side === "dr" ? "dr" : spec.cr !== undefined || spec.side === "cr" ? "cr" : "dr";
        const amt = spec.dr ?? spec.cr;
        const yc = lineY(i), sp = spec.speed || 1;
        const lg = g(rowsLayer, {}), inner = g(lg, {});
        const hl = paper(inner, cutRect(L + 10, yc - J.RH / 2 + 3, W - 20, J.RH - 6, 1, 26), C.gold, { opacity: 0 });
        const newEntry = spec.date !== undefined && i > 0 && spec.sep !== false;
        if (newEntry) ink(inner, [[L + 14, yc - J.RH / 2], [L + W - 14, yc - J.RH / 2]], 3.4, C.ink, { opacity: 0.55 });
        // date
        let tt = t;
        if (spec.date !== undefined) {
          const w1 = wipe(inner, cx0, yc - J.RH / 2, J.DATE - 6, J.RH);
          T(w1.g, cx0 + 8, yc + 3, spec.date, { size: 36, weight: 600, anchor: "start" });
          tt = w1.run(tl, t, 0.3 / sp);
        }
        // particulars: "[To ]Account A/c … Dr"
        const to = spec.to ?? (side === "cr");
        const ind = to ? 60 : 0, ac = spec.ac === false ? "" : " A/c";
        const label = (to ? "To " : "") + spec.account + ac;
        const tp = spec.date !== undefined ? t + 0.22 / sp : t;
        const w2 = wipe(inner, partL, yc - J.RH / 2, J.PART - 6, J.RH);
        const sz = estW(label, 38) + ind > J.PART - 110 ? 34 : 38;
        T(w2.g, partL + 14 + ind, yc + 3, label, { size: sz, weight: 700, anchor: "start" });
        if (side === "dr" && spec.suffix !== false) T(w2.g, partL + J.PART - 28, yc + 3, "Dr", { size: 36, weight: 800, anchor: "end", color: C.drText });
        tt = w2.run(tl, tp, writeDur(label, sz, sp));
        // amount (counts) — sits in the matching column
        let tk = null, tAmt = tt + 0.05;
        if (amt !== undefined && !spec.noAmount) {
          tk = cell(inner, (side === "dr" ? drL : crL) + J.AMT - 26, yc + 3, { size: 40, weight: 800, color: sideTxt(side) });
          tt = land(tl, tk, tAmt, amt, spec.count ?? 0.5 / sp);
        }
        // tag
        let tag = null;
        if (spec.tag && tags) {
          tag = ruleTag(inner, tagL + J.TAGW / 2 - 4, yc, 1, { rule: spec.tag, side, compact: true, hidden: true });
          tag.appear(tl, tt + 0.1 * 0 + 0.05);
          tt += 0.3;
        }
        const line = {
          i, y: yc, side, t0: t, tEnd: tt, tk, tag, g: lg, inner,
          hl(tl2, t2, oo = {}) { flash(tl2, hl, t2, oo.hold ?? 1.0, oo.peak ?? 0.45); return line; },
          pulse(tl2, t2, k) { popRow(tl2, inner, t2, 0, yc, k); return line; },
          dim(tl2, t2, k = 0.7) { fade(tl2, inner, t2, k, 0.25); return line; },
        };
        st.lines.push(line);
        return line;
      },
      // narration row: ( icon · ≤2 words )
      narration(tl, t, spec) {
        const sp = typeof spec === "string" ? { text: spec } : spec;
        const i = sp.row ?? st.next++; if (sp.row !== undefined) st.next = Math.max(st.next, i + 1);
        const yc = lineY(i);
        const lg = g(rowsLayer, {}), inner = g(lg, {});
        const w = wipe(inner, partL, yc - J.RH / 2, J.PART - 6, J.RH);
        const x0 = partL + 14 + 60, size = 36;
        T(w.g, x0, yc + 3, "(", { size, weight: 600, anchor: "start", color: "#5b4f45" });
        let tx = x0 + 18;
        if (sp.icon) { K.icon(w.g, sp.icon, tx + 22, yc, 44, C.ink, 2.2); tx += 56; }
        T(w.g, tx, yc + 3, sp.text + " )", { size, weight: 600, anchor: "start", color: "#5b4f45" });
        const tEnd = w.run(tl, t, writeDur(sp.text, size) + 0.1);
        const line = { i, y: yc, narration: true, t0: t, tEnd, inner, g: lg,
          dim(tl2, t2, k = 0.7) { fade(tl2, inner, t2, k, 0.25); return line; } };
        st.lines.push(line);
        return line;
      },
      // a whole entry: lines (compound OK) + narration. spec: {date, lines:[{account, dr|cr, tag, to?}], narration:{icon,text}|string}
      entry(tl, t, spec) {
        const out = { lines: [], tEnd: t, t0: t };
        let tc = t;
        (spec.lines || []).forEach((ln, k) => {
          const l = rig.writeRow(tl, tc, { ...ln, date: k === 0 ? spec.date : undefined, speed: spec.speed });
          out.lines.push(l); tc = l.tEnd - 0.15;
        });
        if (spec.narration) { out.narr = rig.narration(tl, tc + 0.1, spec.narration); tc = out.narr.tEnd; }
        out.tEnd = Math.max(tc, ...out.lines.map((l) => l.tEnd));
        out.first = out.lines.length ? out.lines[0].i : st.next; out.last = st.next - 1;
        return out;
      },
      highlightRow(tl, t, ln, oo = {}) { const l = typeof ln === "number" ? st.lines.find((q) => q.i === ln) : ln; if (l && l.hl) l.hl(tl, t, oo); return rig; },
      pulseRow(tl, t, ln) { const l = typeof ln === "number" ? st.lines.find((q) => q.i === ln) : ln; if (l && l.pulse) l.pulse(tl, t); return rig; },
      // settled rows dim to 70 %: dim(tl, t, upToRowIndex, k)
      dim(tl, t, upTo = Infinity, k = 0.7) { st.lines.forEach((l) => { if (l.i <= upTo) l.dim(tl, t, k); }); return rig; },
      // ink tick in the left gutter of a line (posted ✓)
      tick(tl, t, ln) {
        const i = typeof ln === "number" ? ln : ln.i;
        const tm = tickMark(body, L + J.GUT / 2 + 2, lineY(i) + 2, 0.9, { hidden: false });
        tm.body.setAttribute("opacity", "1"); tm.draw(tl, t);
        return rig;
      },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 3. JOURNAL STRIP — one journal line as a flying paper strip. Origin = CENTRE.
  // ======================================================================================
  const STRIP = { W: 760, H: 74 };
  function journalStrip(parent, x, y, s = 1, o = {}) {
    const side = o.cr !== undefined || o.side === "cr" ? "cr" : "dr", amt = o.dr ?? o.cr;
    const { root, body } = wrap(parent, x, y, s, o);
    const mv = g(body, {});                       // flight layer (x / y / scale tweens)
    const col = sideCol(side), W = STRIP.W, H = STRIP.H;
    tex(shadow(mv, 2), cutRect(-W / 2, -H / 2, W, H, 1.6, 20), "pat-paper");
    paper(mv, cutRect(-W / 2 + 6, -H / 2 + 6, 14, H - 12, 0.6, 14), col);
    if (o.date) T(mv, -W / 2 + 36, 3, o.date, { size: 34, weight: 600, anchor: "start" });
    const label = (side === "cr" ? "To " : "") + o.account + " A/c" + (side === "dr" ? " Dr" : "");
    T(mv, -W / 2 + (o.date ? 168 : 40), 3, label, { size: 36, weight: 700, anchor: "start" });
    if (amt !== undefined) T(mv, W / 2 - 24, 3, fmtIN(amt), { size: 40, weight: 800, anchor: "end", color: sideTxt(side) });
    const cur = { x: 0, y: 0, k: 1, px: x, py: y };
    const rig = {
      g: root, body, mv, w: W, h: H, side,
      // fly (parent coords) to (tx, ty) on a smooth arc; k = scale on landing (strips narrow while flying); returns tEnd
      flyTo(tl, t, tx, ty, oo = {}) {
        const dur = oo.dur ?? 0.7, dx = (tx - cur.px) / s, dy = (ty - cur.py) / s, lift = oo.arc ?? Math.min(90, Math.hypot(dx, dy) * 0.12);
        const k = oo.k ?? 1;
        tl.to(mv, { x: cur.x + dx, duration: dur, ease: "power2.inOut" }, t);
        tl.to(mv, { y: cur.y + dy - lift, duration: dur * 0.5, ease: "power2.out" }, t);
        tl.to(mv, { y: cur.y + dy, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
        tl.to(mv, { scale: k, svgOrigin: O, duration: dur, ease: "power2.inOut" }, t);
        if (oo.rot !== undefined) tl.to(mv, { rotation: oo.rot, svgOrigin: O, duration: dur, ease: "power2.inOut" }, t);
        cur.x += dx; cur.y += dy; cur.px = tx; cur.py = ty; cur.k = k;
        rig.holdUntil = t + dur;
        return rig;
      },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // book frame (shared by ledger page + trial sheet): red cloth cover, two cream pages, spine
  // ======================================================================================
  function bookFrame(body, PW, PH, cover = 26, gap = 20) {
    const BW = PW * 2 + gap + cover * 2, BH = PH + cover * 2;
    tex(shadow(body, 2), cutRect(-BW / 2, -BH, BW, BH, 2.4, 28), "pat-cover");
    paper(body, cutRect(-BW / 2, -BH, BW, BH, 2.4, 28), C.red, { opacity: 0.35 });
    const pl = { x0: -gap / 2 - PW, y0: -BH + cover, w: PW, h: PH }, pr = { x0: gap / 2, y0: -BH + cover, w: PW, h: PH };
    [pl, pr].forEach((p) => tex(shadow(body, 1), cutRect(p.x0, p.y0, p.w, p.h, 1.4, 26), "pat-paper"));
    ink(body, [[0, -BH + cover], [0, -cover]], gap * 0.8, C.redDark, { opacity: 0.55 });
    return { BW, BH, pl, pr };
  }

  // ======================================================================================
  // 4. LEDGER PAGE — T-account on an open mini-Khata. Origin = BOTTOM CENTRE of the book.
  // ======================================================================================
  const LG = { PW: 740, RH: 62, STRIP: 56 };
  function ledgerPage(parent, x, y, s = 1, o = {}) {
    const N = o.rows || 8, PW = LG.PW, RH = LG.RH;
    const PH = LG.STRIP + 10 + (N + 2) * RH + 14;
    const { root, body } = wrap(parent, x, y, s, o);
    const fr = bookFrame(body, PW, PH);
    const pg = { dr: fr.pl, cr: fr.pr };
    // header strips
    ["dr", "cr"].forEach((sd) => {
      const p = pg[sd], col = sideCol(sd);
      paper(shadow(body, 1), cutRect(p.x0 + 6, p.y0 + 6, PW - 12, LG.STRIP, 1, 22), col);
      T(body, p.x0 + PW / 2, p.y0 + 6 + LG.STRIP / 2 + 2, sd === "dr" ? "Dr" : "Cr", { size: 40, weight: 800, color: K.onColor(col) });
      const yTop = p.y0 + 6 + LG.STRIP + 4;
      for (let i = 0; i < N + 2; i++) ink(body, [[p.x0 + 12, yTop + (i + 1) * RH + 2], [p.x0 + PW - 12, yTop + (i + 1) * RH + 2]], 2, "#a39684", { opacity: 0.35 });
      const cl = p.x0 + 166, cr2 = p.x0 + PW - 200;
      [cl, cr2].forEach((vx) => ink(body, [[vx, yTop], [vx, p.y0 + PH - 14]], 2.2, C.ink, { opacity: 0.25 }));
    });
    const rowTop = (sd) => pg[sd].y0 + 6 + LG.STRIP + 4;
    const rowY = (sd, i) => rowTop(sd) + (i + 0.5) * RH + 2;
    // account label across the spine top
    const labW = Math.max(300, estW(o.account || "Account", 44) + 120 + (o.icon ? 70 : 0));
    const lab = g(body, {}), labY = -fr.BH - 46;
    tex(shadow(lab, 2), cutRect(-labW / 2, labY - 40, labW, 80, 2, 22), "pat-paper");
    if (o.icon) K.medallion(lab, -labW / 2 + 52, labY, 28, o.icon);
    T(lab, o.icon ? 34 : 0, labY + 3, o.account || "", { size: 46, weight: 800 });
    if (o.labelHidden) hide(lab);
    const st = { rows: { dr: [], cr: [] }, sum: { dr: 0, cr: 0 }, rule: null, totalRow: null };
    const layer = g(body, {});
    const colX = (sd) => ({ date: pg[sd].x0 + 22, other: pg[sd].x0 + 176, amt: pg[sd].x0 + PW - 28 });

    function addRow(tl, t, sd, spec, kind) {
      const i = spec.row ?? st.rows[sd].length, yc = rowY(sd, i), cx = colX(sd);
      const lg = g(layer, {}), inner = g(lg, {});
      hide(lg);
      const hl = paper(inner, cutRect(pg[sd].x0 + 8, yc - RH / 2 + 3, PW - 16, RH - 6, 1, 24), C.gold, { opacity: 0 });
      const write = spec.write ?? o.write ?? false;
      let host = inner, w1 = null, tt = t;
      const parts = [];
      if (write) { w1 = wipe(inner, pg[sd].x0 + 8, yc - RH / 2, PW - 16, RH); host = w1.g; }
      if (spec.date) T(host, cx.date + 18, yc + 2, spec.date, { size: 34, weight: 600, anchor: "start" });
      const lab = spec.other || "";
      const otherEl = T(host, cx.other + (kind ? 0 : 0), yc + 2, lab, { size: estW(lab, 36) > 400 ? 34 : 36, weight: kind ? 800 : 600, anchor: "start" });
      if (kind === "cd" || kind === "bd") {   // ↓ carried down / ↑ brought down glyph
        const gx = cx.other + estW(lab, 36) + 26, up = kind === "bd";
        paper(host, cutPoly(up ? [[gx, yc - 15], [gx + 14, yc + 2], [gx + 5, yc + 2], [gx + 5, yc + 15], [gx - 5, yc + 15], [gx - 5, yc + 2], [gx - 14, yc + 2]] : [[gx, yc + 15], [gx + 14, yc - 2], [gx + 5, yc - 2], [gx + 5, yc - 15], [gx - 5, yc - 15], [gx - 5, yc - 2], [gx - 14, yc - 2]], 0.4, 8), C.ink);
        otherEl.setAttribute("data-glyph", up ? "up" : "down");
      }
      let tk = null;
      if (spec.amount !== undefined) tk = cell(host, cx.amt, yc + 2, { size: 40, weight: 800, color: sideTxt(sd) });
      if (write) tt = w1.run(tl, t, 0.5);
      else K.dropIn(tl, lg, t, { dur: 0.26 });
      if (tk) { tk.enter(tl, t + (write ? 0.25 : 0.04), { dur: 0.2 }); tk.to(tl, t + (write ? 0.25 : 0.04), spec.amount, spec.count ?? 0.45); tt = Math.max(tt, t + 0.5); }
      if (write) tl.to(lg, { autoAlpha: 1, duration: 0.01 }, t);
      const row = { side: sd, i, y: yc, tEnd: tt + 0.05, tk, g: lg, inner, kind,
        hl(tl2, t2, oo = {}) { flash(tl2, hl, t2, oo.hold ?? 1.0, oo.peak ?? 0.5); return row; },
        pulse(tl2, t2, k) { popRow(tl2, inner, t2, pg[sd].x0 + PW / 2, yc, k); return row; },
        dim(tl2, t2, k = 0.7) { fade(tl2, inner, t2, k, 0.25); return row; },
      };
      st.rows[sd].push(row);
      return row;
    }
    const rig = {
      g: root, body, label: lab, W: fr.BW, H: fr.BH, pages: pg, rowY, rows: st.rows,
      cellPos(sd, i, col = "amt") { sd = sn(sd); const c = colX(sd); const px = col === "date" ? c.date : col === "other" ? c.other : c.amt; return { x: x + px * s, y: y + rowY(sd, i) * s }; },
      tieLabel(tl, t) { K.dropIn(tl, lab, t); return rig; },
      // post one row. side "dr"|"cr" (or "L"/"R"). spec {date, other, amount, write?, row?}. Returns the row handle (.tEnd)
      post(tl, t, side, spec) {
        const sd = sn(side), r = addRow(tl, t, sd, spec, null);
        if (spec.amount !== undefined) st.sum[sd] += spec.amount;
        return r;
      },
      sum(sd) { return st.sum[sn(sd)]; },
      // Balance c/d on the SMALLER side (cd defaults to the difference of what is posted). {cd, side, date, other}
      balance(tl, t, oo = {}) {
        const diff = Math.abs(st.sum.dr - st.sum.cr);
        const amount = oo.cd ?? diff, sd = sn(oo.side || (st.sum.dr >= st.sum.cr ? "cr" : "dr"));
        const r = addRow(tl, t, sd, { date: oo.date || "Apr 30", other: oo.other || "Balance c/d", amount }, "cd");
        st.sum[sd] += amount; st.bal = { side: sd, amount };
        return r;
      },
      // totals: ink double rule across both pages at the SAME line + the total counting. Both sides equal once balanced.
      total(tl, t, oo = {}) {
        const n = Math.max(st.rows.dr.length, st.rows.cr.length), tr = oo.row ?? n;
        st.totalRow = tr;
        const out = { tEnd: t };
        ["dr", "cr"].forEach((sd) => {
          const p = pg[sd], yTop = rowTop(sd) + tr * RH;
          const amount = oo[sd] ?? oo.amount ?? Math.max(st.sum.dr, st.sum.cr);
          const w = wipe(layer, p.x0 + 130, yTop - 6, PW - 140, 14);
          ink(w.g, [[p.x0 + 140, yTop + 2], [p.x0 + PW - 18, yTop + 2]], 3, C.ink);
          ink(w.g, [[p.x0 + 140, yTop + 10], [p.x0 + PW - 18, yTop + 10]], 3, C.ink);
          w.run(tl, t, 0.4);
          const lg = g(layer, {}); hide(lg);
          T(lg, p.x0 + 160, yTop + RH / 2 + 2, "Total", { size: 36, weight: 700, anchor: "start" });
          const tk = cell(lg, colX(sd).amt, yTop + RH / 2 + 2, { size: 42, weight: 800, color: C.ink });
          K.dropIn(tl, lg, t + 0.3, { dur: 0.26 });
          tk.enter(tl, t + 0.3, { dur: 0.2 }); tk.to(tl, t + 0.3, amount, 0.5);
          out[sd] = tk; out.tEnd = t + 0.9;
          // double rule + total on the larger side only: nothing else to draw
        });
        st.totals = out; st.sum.dr = st.sum.cr = Math.max(st.sum.dr, st.sum.cr);
        return out;
      },
      // Balance b/d, brought down on the OPPOSITE side to the c/d, the line after the totals.
      broughtDown(tl, t, oo = {}) {
        const bal = st.bal || {}, sd = sn(oo.side || (bal.side === "dr" ? "cr" : "dr")), amount = oo.amount ?? bal.amount;
        const r = addRow(tl, t, sd, { row: (st.totalRow ?? Math.max(st.rows.dr.length, st.rows.cr.length)) + 1, date: oo.date || "May 1", other: oo.other || "Balance b/d", amount }, "bd");
        return r;
      },
      // side chip above the page of the balance: "Debit balance" (blue, left) / "Credit balance" (orange, right)
      sideChip(tl, t, side = "debit", oo = {}) {
        const sd = sn(side), col = sideCol(sd), word = oo.text || (sd === "dr" ? "Debit balance" : "Credit balance");
        const w = estW(word, 38) + 56, cxp = sd === "dr" ? fr.pl.x0 + 150 : fr.pr.x0 + PW - 150;
        const chip = g(body, {}); hide(chip);
        paper(shadow(chip, 1), cutRect(cxp - w / 2, labY - 28, w, 56, 1.6, 20), col);
        T(chip, cxp, labY + 3, word, { size: 36, weight: 800, color: K.onColor(col) });
        K.dropIn(tl, chip, t); rig.chip = chip;
        return rig;
      },
      // ink tick next to a row's amount ("posted")
      tick(tl, t, row) {
        const p = pg[row.side], tm = tickMark(body, p.x0 + 24, row.y + 2, 0.6);
        tm.body.setAttribute("opacity", "1"); tm.draw(tl, t);
        return rig;
      },
      highlight(tl, t, row, oo = {}) { row.hl(tl, t, oo); return rig; },
      dimRows(tl, t, k = 0.7) { ["dr", "cr"].forEach((sd) => st.rows[sd].forEach((r) => r.dim(tl, t, k))); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 5. TRIAL SHEET — Khata open as a two-column trial balance. Origin = BOTTOM CENTRE.
  // ======================================================================================
  const TS = { PW: 700, RH: 60, STRIP: 60, BAR: 84 };
  function trialSheet(parent, x, y, s = 1, o = {}) {
    const N = o.rows || 12, PW = TS.PW, RH = TS.RH;
    const PH = TS.STRIP + 12 + N * RH + 14 + TS.BAR + 12;
    const { root, body } = wrap(parent, x, y, s, o);
    const fr = bookFrame(body, PW, PH);
    const pg = { dr: fr.pl, cr: fr.pr };
    const rowTop = (sd) => pg[sd].y0 + 6 + TS.STRIP + 6;
    const rowY = (sd, i) => rowTop(sd) + (i + 0.5) * RH;
    const barY = (sd) => rowTop(sd) + N * RH + 10;
    ["dr", "cr"].forEach((sd) => {
      const p = pg[sd], col = sideCol(sd);
      paper(shadow(body, 1), cutRect(p.x0 + 6, p.y0 + 6, PW - 12, TS.STRIP, 1, 22), col);
      T(body, p.x0 + PW / 2, p.y0 + 6 + TS.STRIP / 2 + 2, sd === "dr" ? (o.drLabel || "Debit") : (o.crLabel || "Credit"), { size: 42, weight: 800, color: K.onColor(col) });
      const yTop = rowTop(sd);
      for (let i = 0; i < N; i++) ink(body, [[p.x0 + 14, yTop + (i + 1) * RH], [p.x0 + PW - 14, yTop + (i + 1) * RH]], 2, "#a39684", { opacity: 0.32 });
      paper(body, cutRect(p.x0 + 8, barY(sd), PW - 16, TS.BAR - 6, 1.2, 22), col, { opacity: 0.2 });
      ink(body, [[p.x0 + 14, barY(sd)], [p.x0 + PW - 14, barY(sd)]], 4, C.ink);
    });
    const layer = g(body, {});
    // totals bar (two counting tickers)
    const tk = {}, barG = {};
    ["dr", "cr"].forEach((sd) => {
      const p = pg[sd], by = barY(sd) + (TS.BAR - 6) / 2 + 2;
      const lg = g(body, {}); hide(lg); barG[sd] = lg;
      T(lg, p.x0 + 70, by, "Total", { size: 38, weight: 700, anchor: "start" });
      tk[sd] = K.ticker(lg, p.x0 + PW - 44, by, 1, { value: 0, size: 48, weight: 800, anchor: "end", color: C.ink });
      tk[sd].body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
    });
    const st = { rows: { dr: [], cr: [] }, sum: { dr: 0, cr: 0 }, prev: null, barShown: false, eq: null, ring: null };
    const rig = {
      g: root, body, W: fr.BW, H: fr.BH, pages: pg, rows: st.rows, tickers: tk, rowY, N,
      cellPos(sd, i) { sd = sn(sd); return { x: x + (pg[sd].x0 + PW / 2) * s, y: y + rowY(sd, i) * s }; },
      // add one row. spec {account, amount, icon?, dim?:false}. Previous row dims to 70 % (settled), the new one is brightest.
      addRow(tl, t, side, spec) {
        const sd = sn(side), i = spec.row ?? st.rows[sd].length, yc = rowY(sd, i), p = pg[sd];
        if (i >= N) console.warn("K.trialSheet: row " + i + " beyond capacity " + N);
        const lg = g(layer, {}), inner = g(lg, {}); hide(lg);
        const hl = paper(inner, cutRect(p.x0 + 8, yc - RH / 2 + 3, PW - 16, RH - 6, 1, 24), C.gold, { opacity: 0 });
        if (spec.icon) K.medallion(inner, p.x0 + 40, yc, 22, spec.icon);
        const nx = p.x0 + (spec.icon ? 76 : 26);
        T(inner, nx, yc + 2, spec.account, { size: estW(spec.account, 38) > 330 ? 34 : 38, weight: 700, anchor: "start" });
        const tkr = K.ticker(inner, p.x0 + PW - 28, yc + 2, 1, { value: 0, size: 40, weight: 800, anchor: "end", color: sideTxt(sd), hidden: false });
        tkr.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
        K.dropIn(tl, lg, t, { dur: spec.dur ?? 0.28 });
        tkr.to(tl, t, spec.amount, spec.count ?? 0.5);
        if (o.dim !== false && spec.dim !== false) {
          const prev = st.prev && st.prev[sd] ? st.prev[sd] : null;
          if (prev) fade(tl, prev.inner, t + 0.15, 0.7, 0.25);
        }
        const row = { side: sd, i, y: yc, tEnd: t + 0.55, g: lg, inner, ticker: tkr, account: spec.account, amount: spec.amount,
          hl(tl2, t2, oo = {}) { flash(tl2, hl, t2, oo.hold ?? 1.2, oo.peak ?? 0.55); return row; },
          pulse(tl2, t2, k) { popRow(tl2, inner, t2, p.x0 + PW / 2, yc, k); return row; },
          dim(tl2, t2, k = 0.7) { fade(tl2, inner, t2, k, 0.25); return row; },
          light(tl2, t2) { row.hl(tl2, t2, { hold: 0.8 }); return row; },
        };
        (st.prev = st.prev || {})[sd] = row;
        st.rows[sd].push(row); st.sum[sd] += spec.amount;
        return row;
      },
      // cascade: rows = [{side, account, amount}], returns tEnd
      fill(tl, t, list, oo = {}) {
        let tc = t;
        list.forEach((r) => { rig.addRow(tl, tc, r.side, { ...r, dur: 0.22, count: 0.35 }); tc += oo.step ?? 0.14; });
        return tc + 0.35;
      },
      // totals bar drops in and both tickers COUNT. amounts default to the sums of the rows; pass {dr, cr} to override.
      total(tl, t, oo = {}) {
        ["dr", "cr"].forEach((sd, k) => {
          if (!st.barShown) K.dropIn(tl, barG[sd], t + k * 0.08, { dur: 0.3 });
          const v = oo[sd] ?? st.sum[sd];
          tk[sd].to(tl, t + 0.1 + k * 0.08, v, oo.dur ?? 0.9);
        });
        st.barShown = true;
        return t + (oo.dur ?? 0.9) + 0.2;
      },
      // totals match: gold ring on both totals + "=" disc drops on the spine, tickers lift
      match(tl, t, oo = {}) {
        const rings = ["dr", "cr"].map((sd) => {
          const p = pg[sd];
          return el("path", { d: cutRect(p.x0 + 4, barY(sd) - 4, PW - 8, TS.BAR + 2, 1.2, 22), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, body);
        });
        rings.forEach((r) => { tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t + 0.1); tl.to(r, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.22 + (oo.hold ?? 1.4)); });
        const d = g(body, {}), dy = barY("dr") + (TS.BAR - 6) / 2; hide(d);
        paper(shadow(d, 2), cutEll(0, dy, 42, 42, 1.4), C.cream);
        el("path", { d: cutRect(-18, dy - 14, 36, 8, 0.4, 12), fill: C.ink }, d); el("path", { d: cutRect(-18, dy + 6, 36, 8, 0.4, 12), fill: C.ink }, d);
        K.dropIn(tl, d, t, { dur: 0.3 });
        K.pulseNode(tl, tk.dr.body, t + 0.1); K.pulseNode(tl, tk.cr.body, t + 0.1);
        st.eq = d;
        if (oo.exit !== false) K.liftOff(tl, d, t + 0.3 + (oo.hold ?? 1.4));
        return t + 0.3 + (oo.hold ?? 1.4);
      },
      // totals do NOT match: coral "≠" disc on the spine + the difference chip (counting) above it
      mismatch(tl, t, oo = {}) {
        const dy = barY("dr") + (TS.BAR - 6) / 2, d = g(body, {}); hide(d);
        paper(shadow(d, 2), cutEll(0, dy, 42, 42, 1.4), C.coral);
        el("path", { d: cutRect(-18, dy - 14, 36, 8, 0.4, 12), fill: C.white }, d); el("path", { d: cutRect(-18, dy + 6, 36, 8, 0.4, 12), fill: C.white }, d);
        el("path", { d: "M10,%y%L-10,%z%".replace("%y%", dy - 24).replace("%z%", dy + 24), fill: "none", stroke: C.white, "stroke-width": 8, "stroke-linecap": "round" }, d);
        K.dropIn(tl, d, t, { dur: 0.3 });
        rig.neq = d;
        if (oo.diff !== undefined) {
          const chip = g(body, {}); hide(chip);
          const cy = dy - 112;
          paper(shadow(chip, 2), cutRect(-170, cy - 36, 340, 72, 1.6, 22), C.coral);
          K.medallion(chip, -128, cy, 24, "search", C.cream);
          const dtk = K.ticker(chip, 128, cy + 2, 1, { value: 0, size: 46, weight: 800, anchor: "end", color: C.white });
          dtk.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
          K.dropIn(tl, chip, t + 0.3, { dur: 0.3 }); dtk.to(tl, t + 0.3, oo.diff, 0.6);
          rig.diff = chip;
        }
        return t + 0.9;
      },
      clearMismatch(tl, t) { if (rig.neq) K.liftOff(tl, rig.neq, t); if (rig.diff) K.liftOff(tl, rig.diff, t); return rig; },
      dimRows(tl, t, k = 0.7) { ["dr", "cr"].forEach((sd) => st.rows[sd].forEach((r) => r.dim(tl, t, k))); return rig; },
      sum(sd) { return st.sum[sn(sd)]; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 6. STATEMENT CARD — P&L (plain) and Balance Sheet (two-sided). Origin = BOTTOM CENTRE.
  //    rows: [{label, value (number counts | string), bold, rule:"sub"|"total", head:true, icon, indent, side:"L"|"R" (bs)}]
  // ======================================================================================
  function statementCard(parent, x, y, s = 1, o = {}) {
    const bs = o.kind === "bs" || o.twoSided;
    const RH = o.rowH || 62, HEADH = 84, PADB = 28;
    const W = o.w || (bs ? 1500 : 900);
    const items = (o.rows || []).map((r, i) => ({ ...r, idx: i }));
    // layout
    const colW = bs ? (W - 56) / 2 : W - 56;
    const xs = bs ? { L: -W / 2 + 22, R: 6 } : { L: -W / 2 + 28 };
    const pitch = (it) => (it.head ? 56 : it.rule === "total" || it.total ? RH + 12 : RH);
    const stack = { L: 0, R: 0 };
    items.forEach((it) => { it.sd = bs ? (it.side === "R" || it.side === "cr" ? "R" : "L") : "L"; });
    items.filter((it) => !(bs && (it.total || it.rule === "total"))).forEach((it) => { it.top = stack[it.sd]; stack[it.sd] += pitch(it); });
    const footTop = Math.max(stack.L, stack.R);
    items.filter((it) => bs && (it.total || it.rule === "total")).forEach((it) => { it.top = footTop + 6; });
    const bodyH = Math.max(footTop + (items.some((it) => bs && (it.total || it.rule === "total")) ? RH + 22 : 0), 80);
    const H = HEADH + 14 + bodyH + PADB + (bs ? 50 : 0);
    const { root, body } = wrap(parent, x, y, s, o);
    tex(shadow(body, 2), cutRect(-W / 2, -H, W, H, 2, 24), "pat-paper");
    const hy = -H + 10, bodyTop = hy + HEADH + 14;
    // header strip(s)
    if (bs) {
      [["L", C.dr, o.leftLabel || "Assets"], ["R", C.cr, o.rightLabel || "Liabilities + Equity"]].forEach(([sd, col, lab]) => {
        paper(shadow(body, 1), cutRect(xs[sd] - 2, hy, colW + 4, HEADH - 8, 1.4, 22), col);
        T(body, xs[sd] + colW / 2, hy + (HEADH - 8) / 2 + 2, lab, { size: 44, weight: 800, color: K.onColor(col) });
      });
      ink(body, [[0, hy + HEADH], [0, -PADB - 50]], 3, C.ink, { opacity: 0.5 });
    } else {
      paper(shadow(body, 1), cutRect(-W / 2 + 10, hy, W - 20, HEADH - 8, 1.4, 22), o.header || C.navy);
      T(body, o.sub ? -W / 2 + 40 : 0, hy + (HEADH - 8) / 2 + 2, o.title || "Profit & Loss", { size: 46, weight: 800, color: K.onColor(o.header || C.navy), anchor: o.sub ? "start" : "middle" });
      if (o.sub) T(body, W / 2 - 40, hy + (HEADH - 8) / 2 + 2, o.sub, { size: 40, font: "kalam", weight: 400, color: K.onColor(o.header || C.navy), anchor: "end" });
    }
    if (bs && o.date !== false) T(body, 0, -PADB - 14, o.date || "30 Apr", { size: 46, font: "kalam", weight: 400 });
    const layer = g(body, {});
    const rows = [];
    items.forEach((it) => {
      const yc = bodyTop + it.top + pitch(it) / 2, x0 = xs[it.sd], rw = colW;
      const lg = g(layer, {}), inner = g(lg, {}); hide(lg);
      const isTot = it.total || it.rule === "total", isSub = it.rule === "sub";
      if (isTot) paper(inner, cutRect(x0 - 4, yc - pitch(it) / 2 + 8, rw + 8, pitch(it) - 10, 1.2, 22), C.cream, { opacity: 1 });
      if (isTot) { ink(inner, [[x0, yc - pitch(it) / 2 + 6], [x0 + rw, yc - pitch(it) / 2 + 6]], 3, C.ink); ink(inner, [[x0, yc - pitch(it) / 2 + 13], [x0 + rw, yc - pitch(it) / 2 + 13]], 3, C.ink); }
      else if (isSub) ink(inner, [[x0 + rw * 0.45, yc - pitch(it) / 2 + 5], [x0 + rw, yc - pitch(it) / 2 + 5]], 3, C.ink, { opacity: 0.75 });
      const hl = paper(inner, cutRect(x0 - 4, yc - pitch(it) / 2 + 4, rw + 8, pitch(it) - 6, 1.2, 22), C.gold, { opacity: 0 });
      const bold = it.bold || isTot || isSub;
      const ind = (it.indent || 0) * 36 + (it.icon ? 50 : 0);
      if (it.icon) K.medallion(inner, x0 + 26, yc + (isTot ? 5 : 0), 22, it.icon);
      const fs = it.head ? 36 : isTot ? 42 : 38;
      T(inner, x0 + 14 + ind, yc + (isTot ? 5 : 2), it.label || it.head || "", { size: fs, weight: it.head ? 800 : bold ? 800 : 600, anchor: "start", color: it.head ? "#5b4f45" : C.ink });
      let tkr = null;
      if (it.value !== undefined && !it.head) {
        if (typeof it.value === "number") {
          tkr = K.ticker(inner, x0 + rw - 14, yc + (isTot ? 5 : 2), 1, { value: 0, size: isTot ? 46 : 40, weight: bold ? 800 : 700, anchor: "end", color: C.ink, prefix: it.prefix });
          tkr.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
        } else T(inner, x0 + rw - 14, yc + 2, it.value, { size: 40, weight: bold ? 800 : 700, anchor: "end" });
      }
      const row = { i: it.idx, item: it, y: yc, g: lg, inner, ticker: tkr,
        hl(tl, t, oo = {}) { flash(tl, hl, t, oo.hold ?? 1.0, oo.peak ?? 0.5); return row; },
        pulse(tl, t, k) { popRow(tl, inner, t, x0 + rw / 2, yc, k); return row; },
        dim(tl, t, k = 0.7) { fade(tl, inner, t, k, 0.25); return row; } };
      rows.push(row);
    });
    const rig = {
      g: root, body, W, H, rows, bodyTop,
      cellPos(i) { const r = rows[i]; return { x: x + (xs[r.item.sd] + colW - 14) * s, y: y + r.y * s }; },
      // reveal row i: drop-and-place, value COUNTS. oo {dur, count}
      reveal(tl, t, i, oo = {}) {
        const r = rows[i]; if (!r) throw new Error("K.statementCard: no row " + i);
        K.dropIn(tl, r.g, t, { dur: oo.dur ?? 0.3 });
        if (r.ticker && oo.count !== false) r.ticker.to(tl, t + 0.04, r.item.value, oo.count ?? 0.6);
        r.tEnd = t + 0.7;
        return rig;
      },
      // reveal rows [from, to) one after another; returns tEnd
      revealAll(tl, t, oo = {}) {
        let tc = t; const a = oo.from ?? 0, b = oo.to ?? rows.length;
        for (let i = a; i < b; i++) { rig.reveal(tl, tc, i, oo); tc += oo.step ?? 0.4; }
        return tc + 0.3;
      },
      highlight(tl, t, i, oo = {}) { rows[i].hl(tl, t, oo); return rig; },
      pulseRow(tl, t, i) { rows[i].pulse(tl, t); return rig; },
      dimRows(tl, t, upTo = Infinity, k = 0.7) { rows.forEach((r) => { if (r.i <= upTo) r.dim(tl, t, k); }); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 7a. WEIGHT CHIP — cream tab holding "?" or a number. Origin = CENTRE.
  // ======================================================================================
  function weightChip(parent, x, y, s = 1, o = {}) {
    const W = o.w || 210, H = o.h || 80, edge = o.edge === "cr" ? C.cr : o.edge === "dr" ? C.dr : o.edge;
    const { root, body } = wrap(parent, x, y, s, o);
    const flip = g(body, {});
    tex(shadow(flip, 1), cutRect(-W / 2, -H / 2, W, H, 1.6, 22), "pat-paper");
    paper(flip, cutRect(-W / 2 + 14, H / 2 - 12, W - 28, 7, 0.4, 14), edge || C.goldDark);
    const q = g(flip, {}), num = g(flip, {});
    T(q, 0, 2, "?", { size: 56, weight: 800 });
    const numeric = typeof o.value === "number";
    const tk = K.ticker(num, 0, 2, 1, { value: numeric ? o.value : 0, size: o.size || 46, weight: 800, anchor: "middle", prefix: o.prefix, color: C.ink });
    tk.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
    if (numeric) hide(q); else hide(num);
    const rig = {
      g: root, body, ticker: tk, w: W, h: H,
      // flip the "?" over (fake scaleX .35 s) to the number, which then counts up from 0 (or from `from`)
      reveal(tl, t, value, oo = {}) {
        tl.to(flip, { scaleX: 0.04, svgOrigin: O, duration: 0.15, ease: "power2.in" }, t);
        tl.to(q, { autoAlpha: 0, duration: 0.01 }, t + 0.15);
        tl.to(num, { autoAlpha: 1, duration: 0.01 }, t + 0.15);
        tl.to(flip, { scaleX: 1, svgOrigin: O, duration: 0.2, ease: "power2.out" }, t + 0.15);
        tk.set(tl, t + 0.14, oo.from ?? 0);
        tk.to(tl, t + 0.35, value, oo.count ?? 0.7);
        return rig;
      },
      // number → number (counts)
      to(tl, t, value, dur = 0.6) { tk.to(tl, t, value, dur); return rig; },
      lift(tl, t) { K.pulseNode(tl, body, t, 1.08); return rig; },
    };
    return life(rig, body);
  }

  // ======================================================================================
  // 7b. SMALL BOOK SHELF — two-tier shelf of small account books (spine + icon). Origin = BOTTOM CENTRE.
  // ======================================================================================
  const BOOK_COLS = [C.sky, C.leaf, C.saffron, C.coral, C.violet, C.teal];
  function smallBookShelf(parent, x, y, s = 1, o = {}) {
    const books = o.books || [], n = books.length, W = o.w || 1500, tiers = o.tiers || [Math.ceil(n / 2), Math.floor(n / 2)];
    const bh = o.bookH || 150, bw = o.bookW || 80, tierGap = o.tierGap || 230;
    const { root, body } = wrap(parent, x, y, s, o);
    // back panel (tone-on-tone) + planks
    const H = tierGap * tiers.length + 40;
    paper(body, cutRect(-W / 2, -H, W, H, 2, 30), "#c9a27a", { opacity: 0.35 });
    const refs = [];
    let idx = 0;
    tiers.forEach((cnt, ti) => {
      const baseY = -(tiers.length - 1 - ti) * tierGap - 22;       // tier 0 is the TOP tier
      tex(shadow(body, 2), cutRect(-W / 2 - 14, baseY, W + 28, 26, 1.6, 26), "pat-kraft");
      const pitch = Math.min(110, (W - 100) / Math.max(cnt, 1)), x0 = -((cnt - 1) * pitch) / 2;
      for (let k = 0; k < cnt && idx < n; k++, idx++) {
        const b = books[idx], bx = x0 + k * pitch;
        const hold = g(body, { transform: `translate(${bx} ${baseY})` });
        const anim = g(hold, {});
        K.smallBook(anim, 0, 0, bw, bh, b.icon || b);
        const col = b.col || BOOK_COLS[idx % BOOK_COLS.length];
        paper(anim, cutRect(-bw / 2, -bh, bw, 12, 0.6, 12), col);
        const halo = el("path", { d: cutRect(-bw / 2 - 9, -bh - 9, bw + 18, bh + 18, 1, 20), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, anim);
        refs[idx] = { g: anim, hold, x: bx, y: baseY, halo, name: b.name, icon: b.icon || b };
      }
    });
    const rig = {
      g: root, body, books: refs, W, H,
      bookPos(i) { return { x: x + refs[i].x * s, y: y + (refs[i].y - bh / 2) * s }; },
      // books drop onto the shelf one after another (use with {hidden books}) — stagger .12
      stock(tl, t, oo = {}) { refs.forEach((r, i) => { if (!r._h) { hide(r.g); r._h = true; } K.dropIn(tl, r.g, t + i * (oo.step ?? 0.12), { dur: 0.28 }); }); return t + refs.length * (oo.step ?? 0.12) + 0.3; },
      // pull book i part-way out and tilt it; push puts it back
      pull(tl, t, i, oo = {}) { const r = refs[i]; tl.to(r.g, { y: oo.dy ?? -46, rotation: oo.rot ?? -4, svgOrigin: O, duration: 0.3, ease: "power2.out" }, t); return rig; },
      push(tl, t, i) { tl.to(refs[i].g, { y: 0, rotation: 0, svgOrigin: O, duration: 0.3, ease: "power2.inOut" }, t); return rig; },
      light(tl, t, i, oo = {}) { flash(tl, refs[i].halo, t, oo.hold ?? 1.0, 1); return rig; },
      lightAll(tl, t, oo = {}) { refs.forEach((r, i) => flash(tl, r.halo, t + i * (oo.step ?? 0.08), oo.hold ?? 0.6, 1)); return t + refs.length * (oo.step ?? 0.08); },
    };
    return life(rig, body);
  }

  Object.assign(K, {
    RULE_TAGS: RULES, FAMILIES: FAMILY, ruleGlyph, famMedallion,
    ruleTag, emptyTag, tickMark, journalCard, journalStrip, ledgerPage, trialSheet, statementCard, weightChip, smallBookShelf,
  });
})();
