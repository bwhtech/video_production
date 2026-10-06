// Shared scene plumbing for Lesson 2. Loaded before every assets/scenes/sNN.js.
//
// A scene file registers:   SCENES.sNN = ({ svg, tl, K, sc, next }) => { ...build DOM, add tweens at ABSOLUTE times... }
//   svg  — the scene's own <svg viewBox="0 0 1920 1080">
//   tl   — the ONE paused master timeline (absolute seconds)
//   K    — window.KIT (paper kit + rig, see assets/kit/RIG.md)
//   sc   — { start, end, title } of this scene; the section stays visible until sc.end + TL.overlap
//   next — the next scene's { start, end } (null for the last)
// Cue helpers (from timeline.js): cue(seg, word, nth), cueEnd(seg, word), segStart(seg), segEnd(seg), scene(id).
//
// Seams: by default the master adds a torn-paper wipe (moving LEFT — the film's current) centred on every
// scene boundary. A scene that hand-authors its own match-cut sets OWN_SEAM_IN[its id] = true.
(function () {
  window.SCENES = window.SCENES || {};
  window.OWN_SEAM_IN = window.OWN_SEAM_IN || {};

  const WIPE_COLORS = ["#2fa79a", "#f2a33a", "#4c9be0", "#ef6f5e", "#7a62c9", "#5db96b"];

  window.PLACEHOLDER = (svg, id, title) => {
    const K = window.KIT;
    K.wall(svg, K.C.teal);
    K.label(svg, 960, 500, id + " · " + title, { size: 64, bg: K.C.cream, color: K.C.ink });
  };

  // One torn-paper sheet that sweeps right → left across the frame, fully covering it around `t`.
  function paperWipe(tl, layer, t, color, k) {
    const K = window.KIT;
    const W = 2700, H = 1240;
    const g = K.g(layer, { id: "wipe-" + k });
    // ragged leading/trailing edges: cut a wide polygon with jagged verticals
    const left = [], right = [];
    for (let i = 0; i <= 16; i++) {
      const y = -80 + (i * (H + 0)) / 16;
      left.push([60 + K.sh(k * 31 + i) * 42, y]);
      right.push([W - 60 + K.sh(k * 57 + i) * 42, y]);
    }
    const d = "M" + left.map((p) => p.join(",")).join(" L") + " L" + right.reverse().map((p) => p.join(",")).join(" L") + " Z";
    const sg = K.g(g, { filter: "url(#sh3)" });
    K.paper(sg, d, color);
    // sheet's left edge travels 1920 → -W; with a symmetric ease the frame is fully covered at the midpoint = t
    const D = 1.1;
    tl.fromTo(g, { x: 1920 }, { x: -W, duration: D, ease: "power1.inOut" }, t - D / 2);
    tl.set(g, { autoAlpha: 0 }, 0);
    tl.set(g, { autoAlpha: 1 }, t - D / 2);
    tl.set(g, { autoAlpha: 0 }, t + D / 2);
  }

  window.SEAMS = (tl) => {
    const layer = document.getElementById("seams-svg");
    const ids = Object.keys(TL.scenes);
    ids.forEach((id, i) => {
      if (i === 0 || window.OWN_SEAM_IN[id]) return;
      paperWipe(tl, layer, TL.scenes[id].start, WIPE_COLORS[i % WIPE_COLORS.length], i);
    });
  };

  // Convenience: a scene-local clock. at(1.2) → absolute time sc.start + 1.2
  // Series wordmark (Shrikhand). Hinglish build gets its own series name.
  window.SERIES_NAME = () => ((window.TL && TL.lang) === "hi" ? "Hisaab Kitaab" : "Double Entry, Single Chai");

  // v2 polish: one deliberate "Khata watches" spot for the whole lesson (bottom-left, ~22 % of frame height) + paper tape set-dressing.
  window.KH = { x: 125, y: 1064, s: 0.62 };
  window.tape = (parent, x, y, rot = -6, w = 90, h = 30) => {
    const K = window.KIT, g = K.g(parent, { transform: `translate(${x} ${y}) rotate(${rot})`, "data-layout-allow-overlap": "true" });
    K.paper(g, K.cutRect(-w / 2, -h / 2, w, h, 1.4, 10), "#e6d3a0", { opacity: 0.8 });
    return g;
  };

  // tone-on-tone skyline behind a wall (colour = wall darkened); seeded, static
  window.skyline = (parent, wall, y0 = 860, seed = 1, o = {}) => {
    const K = window.KIT, g = K.g(parent, { "data-layout-allow-overlap": "true" });
    const col = K.mixColor(wall, o.to ?? "#10202a", o.dark ?? 0.16), win = K.mixColor(wall, "#ffffff", 0.14);
    let x = o.x0 ?? -20;
    for (let i = 0; x < (o.x1 ?? 1960); i++) {
      const w = 120 + K.sh(seed * 17 + i) * 60 + 40, h = (o.minH ?? 130) + (K.sh(seed * 29 + i * 3) + 1) * 0.5 * (o.maxH ?? 200);
      K.paper(g, K.cutRect(x, y0 - h, w, h + 6, 1.6, 14), col);
      for (let r = 0; r < Math.floor((h - 30) / 52); r++) for (let c = 0; c < Math.floor((w - 24) / 44); c++)
        if (K.sh(seed * 7 + i * 31 + r * 5 + c) > -0.2) K.paper(g, K.cutRect(x + 18 + c * 44, y0 - h + 22 + r * 52, 22, 28, 0.8, 8), win, { opacity: 0.55 });
      x += w + 10;
    }
    return g;
  };

  window.localClock = (sc) => (t) => sc.start + t;
})();
