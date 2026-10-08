// Shared scene plumbing for Lesson 13. Loaded before every assets/scenes/sNN.js.
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

  window.localClock = (sc) => (t) => sc.start + t;
})();
