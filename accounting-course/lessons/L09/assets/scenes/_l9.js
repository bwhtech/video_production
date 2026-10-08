// Lesson-9 local helpers — loaded after _shared.js, before every scene (index.template). The shared kit is untouched.
(function () {
  const K = window.KIT, C = K.C;
  const L9 = (window.L9 = window.L9 || {});
  const O = "0 0";
  L9.O = O;

  // ---- basics (same shapes as L3/L7)
  L9.node = (parent, x, y, s = 1) => K.g(K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` }), {});
  L9.hide = (n) => { n.setAttribute("opacity", "0"); return n; };
  L9.stage = (parent, color, gy = 880) => { K.wall(parent, color, gy); K.table(parent, gy); };
  L9.cal = (parent, hl) => K.calendarStrip(parent, 960, 70, 1, { highlight: hl });
  L9.drop = (tl, n, t, o) => { K.dropIn(tl, n, t, o); return n; };
  L9.lift = (tl, n, t, o) => { K.liftOff(tl, n, t, o); return n; };
  L9.allow = (root) => root.querySelectorAll("text").forEach((t) => t.setAttribute("data-layout-allow-overlap", "true"));
  L9.fade = (tl, n, t, to, dur = 0.3) => tl.to(n, { opacity: to, duration: dur, ease: "power1.inOut" }, t);

  // plain paper card (no header) — drawn around (0,0)
  L9.card = (parent, w, h, o = {}) => {
    const grp = K.g(parent, {});
    K.tex(K.shadow(grp, 2), K.cutRect(-w / 2, -h / 2, w, h, 2, 24), "pat-paper");
    if (o.stripe) K.paper(grp, K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, 18, 1, 22), o.stripe);
    return grp;
  };

  // cream pill chip with ink text (signed amounts, counters) — drawn around (0,0). Returns { n, t }.
  L9.chip = (parent, x, y, str, o = {}) => {
    const size = o.size || 44, w = o.w || Math.max(120, str.length * size * 0.56 + 56), h = o.h || size * 1.5;
    const n = L9.node(parent, x, y, o.s || 1);
    if (o.hidden !== false) L9.hide(n);
    K.paper(K.shadow(n, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 20), o.bg || C.cream);
    const t = K.text(n, 0, size * 0.04, str, { size, weight: 800, color: o.color || C.ink });
    t.setAttribute("data-layout-allow-overlap", "true");
    return { n, t, w, h };
  };

  // Khata's red cover with a big gold number (end of the lesson; opened again by the end card)
  L9.cover = (parent, num, word = "Lesson") => {
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, String(num), { size: num > 9 ? 260 : 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, word, { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
})();
