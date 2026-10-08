// Lesson-14 local helper kit — loaded after _shared.js, before every scene (index.template). Lesson-local only; the shared kit is untouched.
(function () {
  const K = window.KIT, C = K.C;
  const L = (window.L14 = window.L14 || {});
  const O = "0 0";
  const HI = () => (window.TL && TL.lang) === "hi";
  L.HI = HI;

  // ---------------------------------------------------------------- basics
  L.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L.cal = (parent, hl, o = {}) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl, ...o });
  L.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L.fade = (tl, n, t, to = 0, dur = 0.25) => tl.to(n, { opacity: to, duration: dur, ease: "power2.inOut" }, t);
  L.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };
  // numbered saffron badge in a card corner
  L.badge = (parent, x, y, n) => {
    K.paper(K.shadow(parent, 1), K.cutEll(x, y, 30, 30, 1), C.saffron);
    K.text(parent, x, y + 3, String(n), { size: 40, weight: 800 });
  };
  // paper text chip: coloured (or cream) rounded strip with text
  L.chip = (parent, x, y, str, o = {}) => {
    const n = L.node(parent, x, y, o.s || 1);
    const size = o.size || 38, w = o.w || Math.max(120, str.length * size * 0.56 + 44), h = o.h || size * 1.6;
    const col = o.bg || C.cream;
    K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.4, 20), col);
    K.text(n, 0, 3, str, { size, weight: o.weight || 800, color: o.color || K.onColor(col) });
    L.allow(n);
    if (o.hidden !== false) L.hide(n);
    return n;
  };
  // stepped ticker chip with ₹ (wrapper over K.ticker)
  L.tick = (parent, x, y, o = {}) => {
    const tk = K.ticker(parent, x, y, o.s || 1, { value: o.value ?? 0, size: o.size || 54, hidden: o.hidden, chip: o.chip !== false, w: o.w || 260, h: o.h || 84, edge: o.edge, anchor: o.anchor, signed: o.signed, color: o.color });
    tk.body.querySelectorAll("text").forEach((e) => e.setAttribute("data-layout-allow-overlap", "true"));
    return tk;
  };
  // cream paper-strip arrow (cash up / down; bible: never red/green)
  L.cashArrow = (parent, x, y, dir, o = {}) => {
    const n = L.node(parent, x, y, o.s || 1);
    K.arrowShape(n, 0, 0, o.len || 120, o.color || C.cream, 1, dir === "up" ? -90 : 90, o.thick || 34);
    if (o.hidden !== false) L.hide(n);
    return n;
  };
  // gold ring flash around a node (pulse + ring), for "lights up on its word"
  L.ring = (parent, cx, cy, rx, ry) => el_ring(parent, cx, cy, rx, ry);
  function el_ring(parent, cx, cy, rx, ry) {
    const r = K.el("path", { d: K.cutEll(cx, cy, rx, ry, 1), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, parent);
    r.flash = (tl, t, hold = 0.9) => {
      tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
      tl.to(r, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold);
      return r;
    };
    return r;
  }
  L.ringRect = (parent, x, y, w, h) => {
    const r = K.el("path", { d: K.cutRect(x, y, w, h, 1, 22), fill: "none", stroke: C.gold, "stroke-width": 9, "stroke-linejoin": "round", opacity: 0 }, parent);
    r.flash = (tl, t, hold = 0.9) => {
      tl.fromTo(r, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
      tl.to(r, { opacity: 0, duration: 0.3, ease: "power2.in" }, t + 0.12 + hold);
      return r;
    };
    return r;
  };

  // ---------------------------------------------------------------- film frame (one P&L frame: saffron frame inside a dark film border)
  L.filmFrame = (parent, x, y, w, h, o = {}) => {
    const n = L.node(parent, x, y);
    K.paper(K.shadow(n, 2), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), "#2a2530");
    for (let i = 0; i < Math.floor(w / 34); i++) {
      K.paper(n, K.cutRect(-w / 2 + 8 + i * 34, -h / 2 + 6, 16, 11, 0.5, 8), C.cream);
      K.paper(n, K.cutRect(-w / 2 + 8 + i * 34, h / 2 - 17, 16, 11, 0.5, 8), C.cream);
    }
    K.paper(n, K.cutRect(-w / 2 + 12, -h / 2 + 24, w - 24, h - 48, 1, 14), o.bg || C.cream);
    if (o.hidden) L.hide(n);
    return n;
  };

  // ---------------------------------------------------------------- sparkle pop (one-shot)
  L.spark = (parent, tl, x, y, t, r = 30) => {
    const n = L.node(parent, x, y); L.hide(n);
    K.sparkle(n, 0, 0, r, C.gold);
    tl.fromTo(n, { opacity: 0, scale: 0.4, svgOrigin: O }, { opacity: 1, scale: 1, svgOrigin: O, duration: 0.18, ease: K.stepEase(0.18, "power2.out", t), immediateRender: false }, t);
    tl.to(n, { opacity: 0, scale: 0.4, svgOrigin: O, duration: 0.2, ease: "power2.in" }, t + 0.6);
    return n;
  };
})();
