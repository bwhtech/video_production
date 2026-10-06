// s01 — Cold open: rent day (Apr 5). Meera hands ₹5,000 to the landlord; the scale (HUD, top-right) tips and HOLDS tipped.
// Exit: camera rushes into the scale's brass pivot disc → full-frame brass plate → title sting (s01t owns the seam).
//
// This file also defines window.L4 — small helpers shared by every Lesson 4 scene (loaded first):
//   L4.street()   the rent-day street frame (stall + Meera + landlord + calendar + HUD) — s01, the s03 torn still, s04
//   L4.hudSet()   put a scaleRig straight into its top-right HUD state (no tween)
//   L4.pans()     fill a scaleRig's pans with the standard Meera's-Chai contents (jars left, tags + equity card right)
//   L4.dash()     dashed empty slot, L4.chip() paper label chip, L4.drop/…  tiny motion helpers
(function () {
  window.OWN_SEAM_IN.s01t = true;          // this scene owns the brass-plate rush into the title sting

  Object.assign(window.ICONS, {
    "thumbs-up": '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /> <path d="M7 10v12" />',
  });
  const O = "0 0";
  const L4 = (window.L4 = window.L4 || {});

  // ---- motion helpers -------------------------------------------------------------------------------------------
  L4.drop = (tl, n, t, o = {}) => window.KIT.dropIn(tl, n, t, o);
  L4.lift = (tl, n, t, o = {}) => window.KIT.liftOff(tl, n, t, o);
  L4.show = (tl, n, t) => { tl.set(n, { autoAlpha: 0 }, 0); tl.set(n, { autoAlpha: 1 }, t); };        // hidden until t (hard appear)
  // hide a node now, drop it in at t (the kit's own enter() semantics, for plain groups)
  L4.hideNow = (n) => { n.setAttribute("opacity", "0"); return n; };
  // positioned node: outer carries the transform attribute, inner is the animatable group (drawn around 0,0)
  L4.node = (parent, x, y, s = 1) => {
    const K = window.KIT;
    const outer = K.g(parent, { transform: `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ""}` });
    return { outer, inner: K.g(outer, {}) };
  };
  // card that can fly AND shrink: outer (positioned) > inner (drop-in) > mid (x/y flight) > body (scale about 0,0 + the drawing).
  // (x/y and scale-with-svgOrigin must never share an element in this GSAP build.)
  L4.card3 = (parent, x, y) => {
    const K = window.KIT, n = L4.node(parent, x, y);
    n.mid = K.g(n.inner, {}); n.body = K.g(n.mid, {});
    return n;
  };
  // paper chip with text (account names / numbers only)
  L4.chip = (parent, x, y, text, o = {}) => {
    const K = window.KIT, n = L4.node(parent, x, y);
    const bg = o.bg || "paper", size = o.size || 44;
    K.label(n.inner, 0, 0, text, { size, bg, rot: o.rot || 0, weight: o.weight || 800, shadow: 1 });
    return n;
  };
  // dashed empty slot (the "nothing arrives here" blink)
  L4.dash = (parent, x, y, w = 150, h = 112) => {
    const K = window.KIT, n = L4.node(parent, x, y);
    K.paper(K.shadow(n.inner, 1), K.cutRect(-w / 2, -h / 2, w, h, 1.6, 22), K.C.cream, { opacity: 0.6 });
    K.el("path", { d: K.cutRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 1.2, 24), fill: "none", stroke: K.C.ink, "stroke-width": 4.5, "stroke-dasharray": "14 10", "stroke-linecap": "round", opacity: 0.85 }, n.inner);
    n.outer.setAttribute("opacity", "0");
    return n;
  };
  // blink once: drop in, hold, lift off
  L4.blink = (tl, n, t, hold = 0.9) => { L4.drop(tl, n.inner, t); L4.lift(tl, n.inner, t + hold); L4.show(tl, n.outer, t); tl.set(n.outer, { autoAlpha: 0 }, t + hold + 0.3); };

  // GSAP quirk in this build: a tween that changes x/y AND scale (with svgOrigin) leaves x/y stuck at their start values. Scale-only
  // tweens (svgOrigin) and x/y-only tweens are fine, so zooms/HUD moves use two NESTED layers: `sc` (scale about O) inside `tr` (translate).
  L4.layers = (parent) => { const K = window.KIT, tr = K.g(parent, {}), sc = K.g(tr, {}); return { tr, sc }; };
  // zoom `lay` about O from scale s0 → s1 while translating T0 → T1 (applied after the scale), as ONE move
  L4.zoom = (tl, lay, t, dur, O2, s0, s1, T0 = [0, 0], T1 = [0, 0], ease = "power2.inOut") => {
    const org = `${O2[0]} ${O2[1]}`;
    tl.fromTo(lay.sc, { scale: s0, svgOrigin: org }, { scale: s1, svgOrigin: org, duration: dur, ease, immediateRender: false }, t);
    if (T0[0] !== T1[0] || T0[1] !== T1[1]) tl.fromTo(lay.tr, { x: T0[0], y: T0[1] }, { x: T1[0], y: T1[1], duration: dur, ease, immediateRender: false }, t);
  };

  // ---- scale HUD (top-right) --------------------------------------------------------------------------------------
  // Same maths as scaleRig.hud(): HUD state = scale k about the rig base (x,y), then translate by (dx,dy).
  const hudParams = (rig, o = {}) => {
    const k = o.k ?? 0.28, right = o.right ?? 48, top = o.top ?? 130, Wf = 1920;
    const dx = (Wf - right) - rig.x - k * rig.s * 640, dy = top - rig.y + 600 * k * rig.s;
    return { k, dx, dy, b: (o.text ?? 30) / (44 * k * rig.s), hudPt: (lx, ly) => [Wf - right - 640 * k * rig.s + k * rig.s * lx, top + 600 * k * rig.s + k * rig.s * ly] };
  };
  // the rig must have been built INSIDE lay.sc (L4.layers(parent)).
  L4.hudSet = (rig, lay, tl, o = {}) => {
    const h = hudParams(rig, o);
    tl.set(lay.sc, { scale: h.k, svgOrigin: `${rig.x} ${rig.y}` }, 0);
    tl.set(lay.tr, { x: h.dx, y: h.dy }, 0);
    ["L", "R"].forEach((kk) => {
      const P = rig.pans[kk];
      if (P.chipBoost) tl.set(P.chipBoost, { scale: h.b, y: 62, svgOrigin: O }, 0);
      tl.set(P.labelsG, { autoAlpha: 0 }, 0);
    });
    tl.set(rig.eqG.parentNode, { autoAlpha: 0 }, 0);
    rig.hudPt = h.hudPt; rig.hudK = h.k;
    return rig;
  };
  // HUD → hero
  L4.hudExpand = (rig, lay, tl, t, dur, o = {}) => {
    const h = hudParams(rig, { k: 0.5, right: 40, top: 118, text: 30, ...o }), ease = "power2.inOut";
    L4.zoom(tl, lay, t, dur, [rig.x, rig.y], h.k, 1, [h.dx, h.dy], [0, 0], ease);
    ["L", "R"].forEach((kk) => {
      const P = rig.pans[kk];
      if (P.chipBoost) tl.fromTo(P.chipBoost, { scale: h.b, y: 62, svgOrigin: O }, { scale: 1, y: 0, svgOrigin: O, duration: dur, ease, immediateRender: false }, t);
      tl.fromTo(P.labelsG, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, immediateRender: false }, t + dur * 0.6);
    });
    tl.fromTo(rig.eqG.parentNode, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, immediateRender: false }, t + dur * 0.6);
    rig.hudPt = h.hudPt;
    return rig;
  };

  // ---- standard pan contents --------------------------------------------------------------------------------------
  //  left pan: Cash jar (coins) · Stock jar (leaf) · Equipment jar (cart)     right pan: Ravi tag · Gopal tag · Meera's tag (equityCard)
  L4.pans = (rig, K, o = {}) => {
    const C = K.C, Lg = rig.pans.L.g, Rg = rig.pans.R.g;
    const out = {};
    out.cash = K.jarRig(Lg, -118, 0, 0.7, { label: "Cash", contents: "coins", amount: o.cash ?? 38000, edge: C.dr, fill: 0.75 });
    out.stock = K.jarRig(Lg, 0, 0, 0.7, { contents: "leaves", icon: "leaf", amount: o.stock ?? 14000, edge: C.dr, fill: 0.8 });
    out.equip = K.jarRig(Lg, 118, 0, 0.7, { contents: "cart", icon: "shopping-cart", amount: o.equip ?? 36000, edge: C.dr });
    out.ravi = K.claimTag(Rg, -130, 0, 0.58, { face: "ravi", amount: 30000, size: 50, rot: -2 });
    out.gopal = K.claimTag(Rg, 130, 0, 0.58, { face: "gopal", amount: 8000, size: 50, rot: 2 });
    out.eq = K.equityCard(Rg, 0, 0, 0.72, { pockets: 2, unnamed: true, capital: 50000 });
    return out;
  };

  // ---- the rent-day street frame -----------------------------------------------------------------------------------
  // parent: any group at world coordinates. Returns refs. `tl`/`T0` are only used for the HUD tween-free setup (none) — all static.
  //   o.landlordX: where the landlord stands (default = hand-over position). o.bundle: Meera holds the ₹5,000 bundle (still).
  L4.street = (parent, K, o = {}) => {
    const C = K.C, R = {};
    K.wall(parent, o.wall || C.teal); K.table(parent, 860);
    // tone-on-tone skyline (set dressing only)
    const dark = o.dark || "#2a9a8e", mid = o.mid || "#34aa9e";
    [[40, 420, 190, 440], [250, 520, 140, 340], [1010, 460, 170, 400], [1210, 380, 150, 480], [1740, 500, 180, 360]].forEach(([x, y, w, h], i) => {
      K.paper(parent, K.cutRect(x, y, w, h, 1.6, 24), i % 2 ? dark : mid);
      for (let r = 0; r < Math.floor(h / 110); r++) for (let c = 0; c < Math.floor(w / 62); c++)
        K.paper(parent, K.cutRect(x + 16 + c * 56, y + 26 + r * 92, 34, 52, 0.6, 14), o.win || "#3fb7aa", { opacity: 0.75 });
    });
    R.street = K.g(parent, {});               // movable group (stall + people)
    R.stall = K.stall(R.street, 270, 1000, 1.0, {});
    R.meera = K.meera(R.street, 600, 1000, 1.05, { expr: "happy" });
    if (o.landlord !== false) R.landlord = K.landlord(R.street, o.landlordX ?? 1130, 1000, 1.0, { expr: "neutral" });
    return R;
  };
  // the frozen frame just BEFORE the rent leaves: Meera holds the ₹5,000 bundle out, the landlord's palm is open, calendar `5`,
  // HUD level at ₹88,000. Used by s03 (as the torn still), s04 (its first frame) — identical drawing both times.
  L4.preRent = (parent, K, tl, t0, o = {}) => {
    const R = L4.street(parent, K, { landlordX: 1130 });
    R.cal = K.calendarStrip(o.calParent || K.g(parent, {}), 960, 70, 1.0, { highlight: 5 });
    R.lay = L4.layers(parent);
    R.hud = K.scaleRig(R.lay.sc, 960, 890, 1.0, { tint: true, L: 88000, R: 88000 });
    R.P = L4.pans(R.hud, K);
    L4.hudSet(R.hud, R.lay, tl, { k: 0.5, right: 40, top: 118, text: 30 });
    R.bundle = K.g(R.meera.handAnchor("R"), {});
    K.bundle(R.bundle, 10, -10, 0.9, -8);
    R.meera.arm(tl, t0, "R", 72, 18, 0.001, { smooth: true });
    R.landlord.arm(tl, t0, "L", 68, 22, 0.001, { smooth: true });
    return R;
  };
  window.L4 = L4;

  // =============================================================================================================
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C;
    const T0 = sc.start;
    const camL = L4.layers(svg), cam = camL.sc;

    // ---- the street, calendar strip and HUD
    const S = L4.street(cam, K, { landlordX: 2250 });          // landlord starts off-frame right
    const m = S.meera, ll = S.landlord;
    const calG = K.g(svg, {});                                   // calendar sits above the camera group (never cropped by the push)
    const cal = K.calendarStrip(calG, 960, 70, 1.0, { highlight: 5 });
    const hudL = L4.layers(cam);
    const hud = K.scaleRig(hudL.sc, 960, 890, 1.0, { tint: true, L: 88000, R: 88000 });
    const P = L4.pans(hud, K);
    L4.hudSet(hud, hudL, tl, { k: 0.5, right: 40, top: 118, text: 30 });
    const pt = (lx, ly) => hud.hudPt(lx, ly);

    // ---- Meera's bundle (in her right hand) + the ₹5,000 tag
    const bundleHold = K.g(m.handAnchor("R"), {});
    K.bundle(bundleHold, 10, -10, 0.9, -8);
    bundleHold.setAttribute("opacity", "0");
    const llBundle = K.g(ll.handAnchor("L"), {}); K.bundle(llBundle, 0, 4, 0.8, 12); llBundle.setAttribute("opacity", "0");
    ll.keysShow(tl, T0, true);
    const amt = L4.node(cam, 790, 290);
    K.label(amt.inner, 0, 0, "₹5,000", { size: 60, bg: C.saffron, rot: -4, weight: 800 });
    amt.outer.setAttribute("opacity", "0");
    const keyMed = L4.node(cam, 1130, 360);
    K.medallion(keyMed.inner, 0, 0, 44, "key", C.saffron, C.white);
    keyMed.outer.setAttribute("opacity", "0");

    // ---- "nothing comes back" slots (blink) beside the HUD pans, the note that leaves, the '?'
    const [lx, ly] = pt(-380, -270), [rx, ry] = pt(380, -270);
    const slotL = L4.dash(cam, lx - 128, ly + 6, 92, 70);
    const slotR = L4.dash(cam, rx + 128, ry + 6, 92, 70);
    const leaving = L4.node(cam, lx, ly - 30);
    K.note(leaving.inner, 0, 0, 74, 38, -10);
    leaving.outer.setAttribute("opacity", "0");
    const q = L4.node(cam, rx, ry + 62);
    K.qmark(q.inner, 0, 0, 1.9, C.saffron);
    q.outer.setAttribute("opacity", "0");

    // ---- recap medallions (cart / tea / sugar) — "came back as something"
    const recap = [["shopping-cart", 12.4, "@cart", 470], ["coffee", 13.1, "@tea", 600], ["package", 13.6, "@sugar", 730]].map(([ic, , w, x]) => {
      const n = L4.node(cam, x, 300);
      K.medallion(n.inner, 0, 0, 46, ic, undefined);
      n.outer.setAttribute("opacity", "0");
      return [n, w];
    });

    // fade from black + brass plate for the pivot rush
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#0d0f17" }, svg);
    const brass = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: C.brass, opacity: 0 }, svg);

    // ===================================================================================== timeline
    const PIV = pt(0, -540);                                   // the pivot disc, world coords
    const tRush = cueEnd("s01c", "@side") + 0.2;
    tl.fromTo(black, { opacity: 1 }, { opacity: 0, duration: 1.2, ease: "power1.out" }, T0);
    // slow push toward the HUD from "Last time" until the rush (≤ 7 %)
    const tPush = segStart("s01b");
    L4.zoom(tl, camL, tPush, tRush - tPush, PIV, 1, 1.07, [0, 0], [0, 0], "none");

    // s01a — April fifth. Rent day.
    const tApril = cue("s01a", "@april"), tRent = cue("s01a", "@rent"), tCounts = cue("s01a", "@counts"), tFive = cue("s01a", "@five");
    const tHands = cue("s01a", "@hands"), tLand = cue("s01a", "@landlord");
    cal.pulse(tl, tApril);
    m.blinks(tl, T0 + 1.2, sc.end, 3.3);
    m.look(tl, tRent - 0.3, 7, -2);
    ll.walkTo(tl, tRent - 0.5, 1130, 1.6);
    L4.drop(tl, keyMed.inner, tRent + 0.3); L4.show(tl, keyMed.outer, tRent + 0.3);
    L4.lift(tl, keyMed.inner, tLand + 0.9);
    ll.jingle(tl, tRent + 1.3);
    // she counts it out of the galla: bundle appears in her hand, ₹5,000 chip above
    bundleHold.setAttribute("opacity", "0");
    tl.set(bundleHold, { opacity: 1 }, tCounts + 0.2);
    m.arm(tl, tCounts - 0.1, "R", 30, 70, 0.25).expr(tl, tCounts, "neutral", { noTake: true });
    L4.drop(tl, amt.inner, tFive); L4.show(tl, amt.outer, tFive);
    // hands it over: arms meet, bundle crosses, landlord pockets it
    m.arm(tl, tHands - 0.1, "R", 72, 18, 0.4);
    ll.arm(tl, tHands - 0.2, "L", 68, 22, 0.4);
    const tPass = tHands + 0.45;
    tl.set(bundleHold, { opacity: 0 }, tPass);
    tl.set(llBundle, { opacity: 1 }, tPass);
    ll.arm(tl, tPass + 0.5, "L", 20, 60, 0.35);
    tl.set(llBundle, { opacity: 0 }, tPass + 0.85);
    m.arm(tl, tPass + 0.4, "R", 12, 8, 0.4);
    L4.lift(tl, amt.inner, tPass + 0.2); tl.set(amt.outer, { autoAlpha: 0 }, tPass + 0.55);
    // HUD: the ₹5,000 note leaves the left pan, the left chip ticks, nothing lands anywhere
    P.cash.tick(tl, tPass, 38000, 33000, 0.6);
    hud.setTotals(tl, tPass, 83000, undefined, { dur: 0.7 });
    tl.set(leaving.outer, { autoAlpha: 1 }, tPass);
    tl.fromTo(leaving.inner, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 70, y: -80, rotation: 14, opacity: 0, duration: 0.9, ease: "power2.out", immediateRender: false }, tPass);
    ll.walkTo(tl, tPass + 1.0, 2250, 2.4);
    m.expr(tl, tPass + 0.6, "thinking").look(tl, tPass + 0.7, 5, 3);

    // s01b — recap + "nothing comes back"
    recap.forEach(([n, w], i) => { const t = cue("s01b", w); L4.drop(tl, n.inner, t); L4.show(tl, n.outer, t); L4.lift(tl, n.inner, cue("s01b", "@but") + i * 0.05, { dur: 0.25 }); });
    const tAsset = cue("s01b", "@asset"), tDebt = cue("s01b", "@debt"), tNothing = cue("s01b", "@nothing");
    L4.blink(tl, slotL, tAsset - 0.1, 1.0);
    L4.blink(tl, slotR, tDebt - 0.1, 1.0);
    m.look(tl, cue("s01b", "@this"), -6, -3);
    m.shrug(tl, tNothing - 0.1, 0.9).expr(tl, tNothing - 0.1, "worried", { noTake: true });
    hud.pulseTotal(tl, tAsset + 0.2, "L");

    // s01c — the scale tips, and holds tipped
    const tTips = cue("s01c", "@tips");
    hud.tilt(tl, tTips - 0.05, -6, { dur: 1.0, ease: "power2.out" });
    hud.pulseTotal(tl, tTips + 0.1, "both");
    const tOther = cue("s01c", "@other");
    L4.drop(tl, q.inner, tOther); L4.show(tl, q.outer, tOther);
    m.look(tl, tTips, 9, -6).expr(tl, tOther, "puzzled").headTilt(tl, tOther, -6);

    // exit: rush into the brass pivot disc
    L4.zoom(tl, camL, tRush, sc.end - tRush, PIV, 1.07, 16, [0, 0], [960 - PIV[0], 540 - PIV[1]], "power3.in");
    tl.to(calG, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, tRush);
    tl.to(brass, { opacity: 1, duration: 0.2, ease: "none" }, sc.end - 0.2);
  };
})();
