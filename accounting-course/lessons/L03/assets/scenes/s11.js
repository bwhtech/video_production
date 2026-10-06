// s11 — Next time: rent day (April 5). A ₹5,000 note leaves the galla for the rent (`key`); the second slot stays empty (`?`).
// The HUD scale grows to centre and begins to tip — freeze at ≈3° (left pan lighter), Meera worried, push-in. Khata's "4" cover slams shut.
(function () {
  // full-frame red cloth ledger cover with a gold "4" (L01's DH.cover shape) — also drawn at the start of s12
  L3.cover = (K, parent) => {
    const C = K.C;
    const outer = K.g(parent, {}), inner = K.g(outer, {});
    outer.setAttribute("data-layout-allow-overlap", "true");
    const g = K.shadow(inner, 3);
    K.paper(g, K.cutRect(-30, -30, 1980, 1140, 0, 80), C.redDark);
    K.tex(g, K.cutRect(-30, -30, 1960, 1124, 3, 60), "pat-cover");
    K.paper(inner, K.cutRect(1620, -30, 26, 1140, 1.5, 40), C.gold);
    K.paper(inner, K.cutRect(-30, 520, 1980, 22, 1.5, 40), C.gold);
    K.ink(inner, K.arc(1633, 531, 34, 0, Math.PI * 2, 16), 9, C.gold);
    K.paper(K.shadow(inner, 1), K.cutEll(800, 531, 230, 230, 3), C.redShade);
    K.text(inner, 800, 545, "4", { size: 300, weight: 800, color: C.gold });
    K.text(inner, 800, 330, "Lesson", { size: 64, font: "kalam", weight: 700, color: C.gold });
    return { outer, inner };
  };
  window.OWN_SEAM_IN.s12 = true;

  window.SCENES.s11 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", T0 = sc.start, GY = 1015;
    const cam = K.g(svg, {});
    L3.stage(K, cam, C.saffron, 880);
    const cal = L3.cal(K, svg, 5);
    // the stall at the pitch, galla on the counter
    const stall = K.stall(cam, 560, GY, 0.95, { galla: true });
    const m = K.meera(cam, 1060, GY, 0.9, { expr: "neutral" });
    const key = L3.hide(L3.node(K, cam, 1480, 640)); K.medallion(key, 0, 0, 92, "key");
    const note = L3.hide(L3.node(K, cam, 550, 705)); K.note(note, 0, 0, 120, 62, -8);
    const hud = L3.hudScale(K, cam, tl, T0);                        // HUD, top-right, level, 88,000
    // the full-size twin of the HUD (the kit's hud(false) glide misbehaves after a static hud(true); a plain numeric glide is robust)
    const B = L3.BIG, k = 0.28;
    const rig = K.scaleRig(cam, B.x, B.y, B.s, { tint: true, L: 88000, R: 88000, equation: true });
    rig.labelPan(tl, T0 - 0.6, "L", ["Assets"], { stagger: 0.001 });
    rig.labelPan(tl, T0 - 0.6, "R", [{ text: "Liabilities", value: 38000 }, { text: "Equity", value: 50000 }], { stagger: 0.001 });
    rig.equation(tl, T0 - 0.5, "88,000 = 38,000 + 50,000");
    rig.jars = {
      cash: L3.jar(K, rig, 0, 3, { label: "Cash", contents: "coins", amount: 38000, fill: 0.25 }),
      equip: L3.jar(K, rig, 1, 3, { label: "Equipment", contents: "cart", amount: 36000 }),
      stock: L3.jar(K, rig, 2, 3, { label: "Stock", contents: "leaves", amount: 14000, fill: 1 }),
    };
    ["meera", "ravi", "gopal"].forEach((f, i) => L3.tag(K, rig, i, 3, { face: f, amount: [50000, 30000, 8000][i] }));
    rig.g.setAttribute("opacity", "0");
    const w2 = K.whichTwo(cam, { veil: false, y: 190 }); w2.g.setAttribute("data-layout-allow-overlap", "true");
    const cover = L3.cover(K, svg);

    // ======================================================================================= timeline
    m.blinks(tl, T0 + 1.0, sc.end, 3.3); m.jitter(tl, T0, sc.end); stall.jitter(tl, T0, sc.end);
    stall.kettle && stall.kettle.steamLoop(tl, T0, sc.end);
    // slow push-in (1.00 → 1.05) for the whole scene, harder at the freeze
    tl.fromTo(cam, { scale: 1, svgOrigin: "960 640" }, { scale: 1.05, svgOrigin: "960 640", duration: sc.end - T0, ease: "none" }, T0);
    m.look(tl, cue("s11", "@fifth"), 0, -3).expr(tl, cue("s11", "@fifth"), "happy");
    // "Rent day." — the key medallion drops in (rent, icon registry §5.12)
    L3.drop(tl, K, key, cue("s11", "@rent"));
    // "Five thousand rupees leave the galla…" — a ₹5,000 note flies from the galla to the key and is gone
    const tLeave = cue("s11", "@leave");
    stall.galla.open(tl, tLeave - 0.5, { notes: false });
    L3.drop(tl, K, note, tLeave - 0.15, { dur: 0.15 });
    tl.to(note, { x: 1480 - 550, duration: 1.0, ease: "power1.inOut" }, tLeave);
    tl.to(note, { y: -150, duration: 0.5, ease: "power2.out" }, tLeave);
    tl.to(note, { y: -65, duration: 0.5, ease: "power2.in" }, tLeave + 0.5);
    tl.to(note, { autoAlpha: 0, scale: 0.6, svgOrigin: O, duration: 0.15 }, tLeave + 1.0);
    K.pulseNode(tl, key, tLeave + 1.0, 1.08);
    stall.galla.shut(tl, tLeave + 1.1);
    m.look(tl, tLeave, 8, -2);
    // "…and nothing comes back." — the device: slot 1 fills Cash −5,000, slot 2 stays empty with a `?`
    const tNo = cue("s11", "@nothing");
    w2.run(tl, tNo - 0.2, { slots: 2, gap: 0, veil: false, fill: [{ label: "Cash", delta: -5000, side: "L", at: tNo + 0.3 }, { pending: true }] });
    m.expr(tl, tNo, "puzzled");
    // "Will the scale finally tip?" — the HUD glides to centre and begins to tip (left pan lighter); freeze at ≈ 3°; Meera worried
    const tWill = cue("s11", "@will"), tFin = cue("s11", "@finally");
    m.walkTo(tl, tWill - 0.4, 1770, 1.1);                          // Meera steps clear of the growing scale (faces never covered)
    tl.to(key, { opacity: 0.35, duration: 0.5 }, tWill);
    const dx = 1920 - 48 - B.x - k * B.s * 640, dy = 130 - B.y + 600 * k * B.s;
    tl.set(hud.g, { opacity: 0 }, tWill - 0.1 + 0.12);
    tl.fromTo(rig.g, { x: (1 - k) * B.x + dx, y: (1 - k) * B.y + dy, scale: k, transformOrigin: "0px 0px", opacity: 1 },
      { x: 0, y: 0, scale: 1, transformOrigin: "0px 0px", opacity: 1, duration: 1.1, ease: "power2.inOut", immediateRender: false }, tWill - 0.1);
    tl.set(rig.g, { opacity: 1 }, tWill - 0.1);
    rig.jars.cash.tick(tl, tFin, 38000, 33000, 0.6);
    rig.setTotals(tl, tFin, 83000, undefined, { dur: 0.6 });
    rig.tilt(tl, tFin + 0.1, -3, { dur: 0.9 });
    m.expr(tl, tFin, "worried").look(tl, tFin, 0, -6);
    // Khata's "4" cover slams shut (L01 s10 pattern)
    const tLand = sc.end - 0.18;
    tl.set(cover.outer, { y: -1180 }, 0);
    tl.to(cover.outer, { y: 0, duration: 0.32, ease: "power3.in" }, tLand - 0.32);
    tl.to(cover.inner, { scaleY: 0.97, svgOrigin: "960 1080", duration: 0.06, ease: "none" }, tLand);
    tl.to(cover.inner, { scaleY: 1, svgOrigin: "960 1080", duration: 0.25, ease: "back.out(1.25)" }, tLand + 0.06);
    L3.allow(w2.g);
  };
})();
