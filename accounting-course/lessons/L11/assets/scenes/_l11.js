// Lesson-11 local helpers — loaded after _shared.js, before every scene (index.template). Shared kit untouched.
// (books.js supplies trialSheet / journalCard / smallBookShelf / ledgerPage; this file is only glue + small paper bits.)
(function () {
  const K = window.KIT, C = K.C;
  const L = (window.L11 = window.L11 || {});
  const O = "0 0";

  L.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L.cal = (parent, hl = 30) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    if (o.dashed) K.el("path", { d: K.cutRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 1, 24), fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 12", opacity: 0.5 }, grp);
    return grp;
  };
  // gold ring that lights a card (opacity-tweened by the scene)
  L.ring = (parent, w, h, o = {}) => K.el("path", { d: K.cutRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 1.4, 24), fill: "none", stroke: C.gold, "stroke-width": o.sw || 10, "stroke-linejoin": "round", opacity: 0 }, parent);
  // numbered saffron disc (question / step number)
  L.num = (parent, x, y, n, r = 40) => {
    const g = L.node(parent, x, y);
    K.paper(K.shadow(g, 1), K.cutEll(0, 0, r, r, 1), C.saffron);
    K.text(g, 0, 3, String(n), { size: r * 1.15, weight: 800 });
    return g;
  };
  L.tick = (parent, x, y, r = 34) => { const g = L.node(parent, x, y); K.medallion(g, 0, 0, r, "check", C.leaf); return g; };
  L.cross = (parent, x, y, r = 34) => { const g = L.node(parent, x, y); K.medallion(g, 0, 0, r, "x", C.coral); return g; };
  // number chip with a side-coloured edge (static text; use K.ticker for counting)
  L.chip = (parent, x, y, w, h, str, o = {}) => {
    const g = L.node(parent, x, y);
    K.tex(K.shadow(g, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), "pat-paper");
    if (o.edge) K.paper(g, K.cutRect(-w / 2 + 12, h / 2 - 10, w - 24, 7, 0.5, 14), o.edge);
    K.text(g, 0, 2, str, { size: o.size || 40, weight: 800, color: o.color || C.ink });
    return g;
  };
  // a paper laptop "Save" card (s04 addendum): two amounts + a Save button
  L.save = (parent, x, y, s = 1) => {
    const n = L.node(parent, x, y, s), W = 560, H = 360;
    K.tex(K.shadow(n, 2), K.cutRect(-W / 2, -H / 2, W, H, 2, 24), "pat-paper");
    K.paper(n, K.cutRect(-W / 2 + 10, -H / 2 + 10, W - 20, 52, 1, 20), C.navy);
    [-1, 1].forEach((sd) => K.paper(n, K.cutEll(-W / 2 + 36 + (sd + 1) * 18, -H / 2 + 36, 8, 8, 0.4), sd === 0 ? C.saffron : C.coral));
    const l = L.node(n, -140, -30), r = L.node(n, 140, -30);
    K.paper(l, K.cutRect(-120, -48, 240, 96, 1.2, 18), C.dr, { opacity: 0.18 });
    K.paper(r, K.cutRect(-120, -48, 240, 96, 1.2, 18), C.cr, { opacity: 0.18 });
    const tl_ = K.ticker(l, 0, 0, 1, { value: 3300, size: 52, color: C.drText });
    const tr_ = K.ticker(r, 0, 0, 1, { value: 3000, size: 52, color: C.crText });
    const btn = L.node(n, 0, 108);
    const bg = K.g(btn, {});
    K.paper(K.shadow(bg, 1), K.cutRect(-110, -34, 220, 68, 1.2, 18), C.grey);
    const lit = K.paper(bg, K.cutRect(-110, -34, 220, 68, 1.2, 18), C.leaf, { opacity: 0 });
    const label = K.text(btn, 0, 2, "Save", { size: 40, weight: 800, color: C.white });
    const xm = L.cross(n, 232, -128, 30); L.hide(xm);
    return { n, tl_, tr_, btn, lit, label, x: xm, W, H };
  };
  // a tiny entry card = a blue half + an orange half of equal length
  L.miniEntry = (parent, x, y, s = 1) => {
    const n = L.node(parent, x, y, s);
    K.tex(K.shadow(n, 1), K.cutRect(-62, -20, 124, 40, 1, 14), "pat-paper");
    K.paper(n, K.cutRect(-58, -14, 54, 28, 0.6, 12), C.dr);
    K.paper(n, K.cutRect(4, -14, 54, 28, 0.6, 12), C.cr);
    return n;
  };
  // cover with a gold big number (s11 -> s12 handoff), same shape as L7's cover8
  L.coverN = (parent, n) => {
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(n), { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  // fake-flip a two-faced node (front scales to 0, back scales in); both faces drawn around (0,0)
  L.flip = (tl, F, B, t, dur = 0.34) => {
    tl.to(F, { scaleX: 0, svgOrigin: O, duration: dur * 0.45, ease: "power2.in" }, t);
    tl.to(B, { scaleX: 1, svgOrigin: O, duration: dur * 0.55, ease: "power2.out" }, t + dur * 0.45);
  };
})();
