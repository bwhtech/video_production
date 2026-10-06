// Lesson-7 local helper kit — loaded after _shared.js, before every scene (index.template).
// Everything here is lesson-local (the shared kit is untouched). Candidates to promote to the kit: tagChip / glyph (L8's permanent
// journal-line tags), entry (two-line entry card), lock (the split-screen lock + pair-flash), trays, bank.
(function () {
  const K = window.KIT, C = K.C;
  const L7 = (window.L7 = window.L7 || {});
  const O = "0 0";

  // ------------------------------------------------------------------------------------------------ basics (from L3)
  L7.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L7.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L7.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L7.cal = (parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L7.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L7.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L7.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L7.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    if (o.gold) K.el("path", { d: K.cutRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 1.4, 24), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round" }, grp);
    return grp;
  };
  L7.at = (t0) => (d) => t0 + d;

  // ------------------------------------------------------------------------------------------------ families + glyphs (bible §5.5)
  // Personal = user · Real = box · Nominal = receipt. One fixed disc colour each (cream icon strips need a dark-enough disc).
  L7.FAM = {
    personal: { icon: "user", col: C.sky, name: "Personal" },
    real: { icon: "box", col: C.wood, name: "Real" },
    nominal: { icon: "receipt", col: C.navy, name: "Nominal" },
  };
  // six tag variants: family medallion + rule glyph + small English word (swappable). side = which entry line wears it.
  L7.RULES = {
    real_in: { fam: "real", glyph: "into", word: "comes in", side: "L" },
    real_out: { fam: "real", glyph: "outof", word: "goes out", side: "R" },
    personal_receiver: { fam: "personal", glyph: "palm", word: "receiver", side: "L" },
    personal_giver: { fam: "personal", glyph: "giving", word: "giver", side: "R" },
    nominal_expense: { fam: "nominal", glyph: "coinsout", word: "expense", side: "L" },
    nominal_income: { fam: "nominal", glyph: "coinsin", word: "income", side: "R" },
  };
  // small flat paper glyphs, drawn around (0,0) in a ±22 box
  L7.glyph = (parent, kind, x, y, k = 1, col = C.ink) => {
    const g = K.g(parent, { transform: `translate(${x} ${y}) scale(${k})` });
    const ink = (pts, w = 5) => K.ink(g, pts, w, col);
    const poly = (pts) => K.paper(g, K.cutPoly(pts, 0.3, 8), col);
    const box = () => ink([[-15, 2], [-11, 19], [11, 19], [15, 2]], 5.5);
    if (kind === "into") { box(); ink([[0, -21], [0, -3]], 5.5); poly([[-10, -6], [10, -6], [0, 8]]); }
    if (kind === "outof") { box(); ink([[0, 12], [0, -10]], 5.5); poly([[-10, -9], [10, -9], [0, -23]]); }
    if (kind === "palm") {                       // open hand, fingers up (receiving)
      K.paper(g, K.cutRect(-13, 0, 26, 21, 0.8, 8), col);
      [[-9.5, -14], [-3.2, -19], [3.2, -18], [9.5, -12]].forEach(([fx, ft]) => K.paper(g, K.cutRect(fx - 3.2, ft, 6.4, 6 - ft, 0.4, 6), col));
      K.paper(g, K.cutPoly([[-13, 6], [-22, -2], [-18, -6], [-11, 0]], 0.3, 6), col);
    }
    if (kind === "giving") {                     // flat hand offering a coin
      K.paper(g, K.cutRect(-22, 8, 26, 10, 0.6, 8), col);
      K.paper(g, K.cutEll(8, 12, 14, 7, 0.5), col);
      K.paper(g, K.cutEll(-2, -6, 9, 9, 0.5), C.goldDark);
      ink([[10, -6], [20, -6]], 4.5); poly([[16, -13], [16, 1], [24, -6]]);
    }
    if (kind === "coinsout") {
      [10, 3].forEach((cy) => K.paper(g, K.cutEll(-6, cy, 12, 5.5, 0.4), C.goldDark));
      ink([[0, -2], [11, -13]], 5); poly([[16.7, -7.3], [5.3, -18.7], [18.8, -20.8]]);
    }
    if (kind === "coinsin") {
      [10, 3].forEach((cy) => K.paper(g, K.cutEll(7, cy, 12, 5.5, 0.4), C.goldDark));
      ink([[-17, -17], [-3, -3]], 5); poly([[2.7, -8.7], [-8.7, 2.7], [3.4, 3.4]]);
    }
    return g;
  };

  // family medallion (standalone: trays, rule cards, translation card)
  L7.famMedallion = (parent, fam, x, y, r) => K.medallion(parent, x, y, r, L7.FAM[fam].icon, L7.FAM[fam].col);

  // icon-first tag chip: [family medallion][rule glyph on a cream disc][small word] on a paper chip tinted by side.
  // Drawn around (0,0). Returns { n (drop-in node), g }.
  const CHIP_W = 280, CHIP_H = 86;
  L7.CHIP_W = CHIP_W; L7.CHIP_H = CHIP_H;
  L7.tagChip = (parent, x, y, key, o = {}) => {
    const R = L7.RULES[key], side = o.side || R.side, col = side === "R" ? C.cr : C.dr, s = o.s || 1;
    const n = L7.node(parent, x, y, s);
    if (o.hidden !== false) L7.hide(n);
    K.paper(K.shadow(n, 1), K.cutRect(-CHIP_W / 2, -CHIP_H / 2, CHIP_W, CHIP_H, 1.6, 20), col);
    K.paper(n, K.cutEll(-98, 0, 36, 36, 0.6), C.cream);                       // cream ring behind the family disc
    L7.famMedallion(n, R.fam, -98, 0, 31);
    K.paper(K.shadow(n, 1), K.cutEll(-30, 0, 30, 30, 0.6), C.cream);           // glyph disc
    L7.glyph(n, R.glyph, -30, 1, 0.92, C.ink);
    const w = K.text(n, 55, 2, R.word, { size: 30, weight: 700, color: K.onColor(col) });
    w.setAttribute("data-layout-allow-overlap", "true");
    return { n, side, key };
  };
  // empty (dashed) chip placeholder
  L7.emptyChip = (parent, x, y, s = 1) => {
    const n = L7.node(parent, x, y, s); L7.hide(n);
    K.paper(n, K.cutRect(-CHIP_W / 2, -CHIP_H / 2, CHIP_W, CHIP_H, 1.4, 22), C.cream, { opacity: 0.55 });
    K.el("path", { d: K.cutRect(-CHIP_W / 2 + 8, -CHIP_H / 2 + 8, CHIP_W - 16, CHIP_H - 16, 1, 24), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.75 }, n);
    return { n };
  };

  // gold seal (lock) — drawn around (0,0)
  L7.seal = (parent, x, y, r = 54) => {
    const n = L7.node(parent, x, y); L7.hide(n);
    K.paper(K.shadow(n, 2), K.cutEll(0, 0, r, r, 2), C.gold);
    K.paper(n, K.cutEll(0, 0, r * 0.78, r * 0.78, 1.4), C.goldDark, { opacity: 0.55 });
    K.paper(n, K.cutRect(-r * 0.42, -r * 0.3, r * 0.84, r * 0.2, 0.5, 8), C.cream);
    K.paper(n, K.cutRect(-r * 0.42, r * 0.1, r * 0.84, r * 0.2, 0.5, 8), C.cream);
    return n;
  };

  // ------------------------------------------------------------------------------------------------ rule card (gold edge)
  // icon + chip, no sentences. kind picks the glyph; chip side colours it.
  L7.ruleCard = (parent, x, y, kind, side, o = {}) => {
    const w = o.w || 200, h = o.h || 220;
    const n = L7.node(parent, x, y);
    const inner = K.g(n, {});
    K.tex(K.shadow(inner, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 22), "pat-paper");
    K.el("path", { d: K.cutRect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 1.2, 22), fill: "none", stroke: C.gold, "stroke-width": 10, "stroke-linejoin": "round" }, inner);
    const col = side === "R" ? C.cr : C.dr;
    if (o.medal) K.medallion(inner, 0, -34, 52, o.medal, o.medalCol);
    else L7.glyph(inner, kind, 0, -34, 3.0, C.ink);
    K.paper(K.shadow(inner, 1), K.cutRect(-62, 38, 124, 66, 1.2, 16), col);
    K.text(inner, 0, 73, side === "R" ? "Cr" : "Dr", { size: 52, weight: 800, color: K.onColor(col) });
    return { n, inner };
  };

  // ------------------------------------------------------------------------------------------------ two-line entry card
  // spec rows: [{ name, amt, side:"L"|"R", tag?: ruleKey }]. kind "golden" rows carry a tag chip, "scale" rows don't.
  const ROW_H = 112, ENT_W = 840;
  L7.ENT_W = ENT_W; L7.ROW_H = ROW_H;
  L7.entry = (parent, x, y, rows, o = {}) => {
    const n = L7.node(parent, x, y);                       // inner `n` is what the lock slides
    const h = rows.length * ROW_H + 22;
    const body = K.g(n, {});
    K.tex(K.shadow(body, 2), K.cutRect(-ENT_W / 2, -h / 2, ENT_W, h, 2, 24), "pat-paper");
    if (o.gold) K.el("path", { d: K.cutRect(-ENT_W / 2 + 4, -h / 2 + 4, ENT_W - 8, h - 8, 1.4, 24), fill: "none", stroke: C.gold, "stroke-width": 8, "stroke-linejoin": "round" }, body);
    L7.hide(body);
    const out = { n, body, rows: [], h, ENT_W, show(tl, t) { K.dropIn(tl, body, t, { dur: 0.3 }); return out; } };
    rows.forEach((r, i) => {
      const ry = -h / 2 + 11 + ROW_H * (i + 0.5), col = r.side === "R" ? C.cr : C.dr;
      const row = L7.node(body, 0, ry); L7.hide(row);
      K.paper(row, K.cutRect(-ENT_W / 2 + 14, -ROW_H / 2 + 8, 14, ROW_H - 16, 0.6, 14), col);
      const lit = K.paper(row, K.cutRect(-ENT_W / 2 + 14, -ROW_H / 2 + 6, ENT_W - 28, ROW_H - 12, 1.2, 22), col, { opacity: 0 });
      const litEl = lit;
      let tk = null, chip = null;
      const two = !!r.tag || o.twoLine;
      if (two) {
        K.text(row, -ENT_W / 2 + 44, -24, r.name, { size: 38, weight: 700, anchor: "start" });
        tk = K.ticker(row, -ENT_W / 2 + 44, 22, 1, { value: r.amt, size: 46, anchor: "start", color: r.side === "R" ? C.crText : C.drText });
      } else {
        K.text(row, -ENT_W / 2 + 44, 0, r.name, { size: 42, weight: 700, anchor: "start" });
        tk = K.ticker(row, ENT_W / 2 - 40, 0, 1, { value: r.amt, size: 50, anchor: "end", color: r.side === "R" ? C.crText : C.drText });
      }
      if (r.tag) chip = L7.tagChip(row, ENT_W / 2 - CHIP_W / 2 - 32, 0, r.tag, { side: r.side });
      L7.allow(row);
      out.rows.push({ n: row, lit: litEl, tk, chip, side: r.side, y: ry, amt: r.amt, target: r.amt });
      // tk text starts at 0 → rows count up when written
      tk.text.textContent = "₹0";
    });
    return out;
  };
  // write a row on: drop-and-place + amount counts up + (optional) chip lands 0.3 s later
  L7.writeRow = (tl, row, t, o = {}) => {
    K.dropIn(tl, row.n, t);
    row.tk.to(tl, t + 0.12, row.target, o.dur || 0.7);
    if (row.chip && o.chip !== false) K.dropIn(tl, row.chip.n, t + (o.chipAt ?? 0.4));
    return row;
  };

  // ------------------------------------------------------------------------------------------------ split-screen world
  // Left camera (gold frame) = golden rules, right camera = the scale. Returns refs; all geometry deterministic.
  L7.SPLIT = { LX: 24, LW: 912, RX: 984, RW: 912, Y: 150, H: 906, LCX: 480, RCX: 1440, DIV: 960, ENT_Y: 345, SCALE_Y: 925, SCALE_S: 0.78 };
  L7.split = (svg, tl, o = {}) => {
    const S = L7.SPLIT, world = K.g(svg, {});
    const leftBg = o.leftBg || K.mixColor(C.teal, C.saffron, 0.22), rightBg = o.rightBg || K.mixColor(C.teal, C.cream, 0.16);
    K.wall(world, o.wall || C.teal, 960); K.table(world, 1100);
    const panel = (x, w, col, frameCol) => {
      const p = K.g(world, {});
      K.paper(K.shadow(p, 2), K.cutRect(x, S.Y, w, S.H, 2, 30), col);
      K.el("path", { d: K.cutRect(x + 3, S.Y + 3, w - 6, S.H - 6, 1.2, 30), fill: "none", stroke: frameCol, "stroke-width": 11, "stroke-linejoin": "round" }, p);
      return p;
    };
    panel(S.LX, S.LW, leftBg, C.gold);
    panel(S.RX, S.RW, rightBg, C.cream);
    // the divider (a small paper strip)
    K.paper(world, K.cutRect(S.DIV - 5, S.Y + 20, 10, S.H - 40, 0.8, 30), C.cream, { opacity: 0.55 });
    const cal = L7.cal(world, o.cal || 25);
    // the scale (right camera) — totals chips ≈ 34 px at this scale; no equation strip (the right entry card carries the lines)
    const rig = K.scaleRig(world, S.RCX, S.SCALE_Y, S.SCALE_S, { tint: true, L: o.L || 0, R: o.R || 0, equation: false });
    return { world, rig, cal, S };
  };
  // jars / tags on the split scale
  L7.sJar = (rig, i, n, o) => {
    const xs = (i - (n - 1) / 2) * (n === 3 ? 122 : n === 2 ? 150 : 0), s = [0, 0.8, 0.8, 0.66, 0.58][n] || 0.6;
    return K.jarRig(rig.pans.L.g, xs, 0, s, { edge: C.dr, ...o });
  };
  L7.sTag = (rig, i, n, o) => {
    const xs = (i - (n - 1) / 2) * (n === 3 ? 112 : n === 2 ? 136 : 0), s = [0, 0.6, 0.52, 0.44][n] || 0.44;
    return K.claimTag(rig.pans.R.g, xs, 0, s, { size: 54, ...o });
  };

  // lock choreography — both entry cards slide to the divider, touch (2-frame squash), seal stamps on, then Dr pair-flash, Cr pair-flash.
  // E = { L:[entry card], R:[entry card] }; returns { tLock, tDr, tCr }
  L7.lock = (tl, eL, eR, t, o = {}) => {
    const S = L7.SPLIT, D = 60;
    tl.to(eL.n, { x: D, duration: 0.34, ease: "power3.out" }, t);
    tl.to(eR.n, { x: -D, duration: 0.34, ease: "power3.out" }, t);
    const tT = t + 0.34;
    tl.to([eL.n, eR.n], { scaleY: 0.985, svgOrigin: O, duration: 0.07, ease: "none" }, tT);
    tl.to([eL.n, eR.n], { scaleY: 1, svgOrigin: O, duration: 0.13, ease: "power2.out" }, tT + 0.07);
    const seal = o.seal; if (seal) {
      tl.fromTo(seal, { autoAlpha: 0, scale: 1.25, svgOrigin: O }, { autoAlpha: 1, scale: 1, svgOrigin: O, duration: 0.18, ease: "power3.out", immediateRender: false }, tT + 0.05);
    }
    const flash = (rows, tt) => rows.forEach((r) => {
      tl.to(r.lit, { opacity: 0.62, duration: 0.1, ease: "power2.out" }, tt);
      tl.to(r.lit, { opacity: 0, duration: 0.3, ease: "power1.in" }, tt + 0.25);
    });
    const dr = [], cr = [];
    [eL, eR].forEach((e) => e.rows.forEach((r) => (r.side === "R" ? cr : dr).push(r)));
    flash(dr, tT + 0.32); flash(cr, tT + 0.7);
    return { tLock: tT, tDr: tT + 0.32, tCr: tT + 0.7 };
  };

  // ------------------------------------------------------------------------------------------------ small art
  // a transaction slip (icon + ₹, wordless). Drawn around (0,0).
  L7.slip = (parent, x, y, iconName, amt, o = {}) => {
    const n = L7.node(parent, x, y, o.s || 1); L7.hide(n);
    const w = o.w || 250, h = o.h || 190;
    K.tex(K.shadow(n, 2), K.cutRect(-w / 2, -h / 2, w, h, 1.8, 20), "pat-paper");
    if (o.tab) { const tw = o.tab.length * 19 + 24; K.paper(n, K.cutRect(-w / 2 + 8, -h / 2 + 8, tw, 44, 0.8, 12), o.tabCol || C.saffron); K.text(n, -w / 2 + 8 + tw / 2, -h / 2 + 31, o.tab, { size: 32, weight: 800, color: C.ink }); }
    if (o.art) o.art(n); else K.medallion(n, 0, -18, 48, iconName);
    const tk = K.ticker(n, 0, h / 2 - 42, 1, { value: 0, size: 50 });
    return { n, tk };
  };

  // three shallow paper trays (Personal / Real / Nominal) — medallion on the tray front, label lands separately
  L7.tray = (parent, x, y, fam, o = {}) => {
    const w = o.w || 460, h = o.h || 130, s = o.s || 1;
    const n = L7.node(parent, x, y, s), body = K.g(n, {});
    // back wall, inner floor, front face
    K.paper(K.shadow(body, 2), K.cutPoly([[-w / 2, -h], [w / 2, -h], [w / 2 - 22, 0], [-w / 2 + 22, 0]], 1.8, 20), "#b48a5c");
    K.paper(body, K.cutPoly([[-w / 2 + 14, -h + 10], [w / 2 - 14, -h + 10], [w / 2 - 30, -24], [-w / 2 + 30, -24]], 1.2, 18), "#8e6a43");
    const items = K.g(body, {});                                               // contents sit between back wall and front
    K.paper(K.shadow(body, 1), K.cutPoly([[-w / 2 + 22, -52], [w / 2 - 22, -52], [w / 2 - 36, 40], [-w / 2 + 36, 40]], 1.6, 20), "#c9a06a");
    const med = K.g(body, {});
    L7.famMedallion(med, fam, 0, -6, 44);
    return { n, body, items, med, w, h, x, y, s };
  };

  // a friendly Bank: pediment, body, column "legs", a face. Origin = ground centre, ~ 330 tall at s=1.
  L7.bank = (parent, x, y, s = 1) => {
    const n = L7.node(parent, x, y, s), b = K.g(n, {});
    const sd = K.shadow(b, 1);
    [-95, -32, 32, 95].forEach((cx) => K.paper(sd, K.cutRect(cx - 17, -120, 34, 120, 1.2, 16), C.cream));        // column legs
    K.paper(sd, K.cutRect(-135, -250, 270, 130, 2, 22), C.sky);
    K.paper(sd, K.cutPoly([[-155, -250], [155, -250], [0, -340]], 1.8, 20), C.navy);
    K.paper(b, K.cutRect(-135, -138, 270, 18, 0.8, 22), C.cream);
    K.medallion(b, 0, -296, 26, "landmark");
    // face
    [-1, 1].forEach((sg) => { K.paper(b, K.cutEll(sg * 38, -208, 17, 20, 0.6), C.white); K.paper(b, K.cutEll(sg * 38 + 2, -204, 8, 8, 0.4), C.ink); });
    K.ink(b, K.arc(0, -196, 24, Math.PI * 0.15, Math.PI * 0.85, 8), 5);
    return { n, b };
  };
  L7.qmark = (parent, x, y, s = 1) => { const n = L7.node(parent, x, y); K.qmark(n, 0, 0, s, C.coral); L7.hide(n); return n; };
})();
