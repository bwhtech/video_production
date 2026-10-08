// s01 — Cold open. April 30, closing time at the stall. Khata (on a crate) raises the paper instant camera — click — a blank polaroid slides out and starts to develop;
// Meera freezes mid-wipe on "frozen". Exit: the print flips (its back is Khata's red cloth) and its back grows to fill the frame → s01t's plate (red) bursts past camera.
(function () {
  window.SCENES.s01 = ({ svg, tl, K, sc }) => {
    const C = K.C, O = "0 0", L13 = window.L13, T0 = sc.start;
    const cam = K.g(svg, {});
    L13.stage(cam, C.sky, 880);
    const cal = L13.cal(svg, 30);

    // the stall at dusk-closing: galla shut, kettle still (no steam loop)
    const stall = K.stall(cam, 380, 1010, 0.95, { galla: true });
    stall.steam.setAttribute("opacity", "0");
    const m = K.meera(cam, 720, 1010, 1.0, { expr: "happy", lookX: -3 });
    K.crate(cam, 1640, 1010, 190, 120);
    const khata = K.khataRig(cam, 1640, 890, 0.82, { expr: "awake", lookX: -4 });

    // paper instant camera in front of Khata
    const camN = L13.node(cam, 1480, 650);
    const camBody = K.g(camN, {});
    K.paper(K.shadow(camBody, 2), K.cutRect(-92, -58, 184, 116, 3, 28), "#5b5560");
    K.paper(camBody, K.cutRect(-92, -58, 184, 36, 2, 24), C.cream);
    K.paper(K.shadow(camBody, 1), K.cutEll(-6, 8, 44, 44, 1.2), "#2b2233");
    K.paper(camBody, K.cutEll(-6, 8, 30, 30, 1), C.navy);
    K.paper(camBody, K.cutEll(-14, 0, 9, 9, 0.5), C.white, { opacity: 0.8 });
    K.paper(camBody, K.cutRect(52, -46, 28, 18, 1, 10), C.white);                     // flash window
    K.paper(camBody, K.cutRect(-70, -76, 36, 22, 1, 10), C.red);                       // shutter button
    K.paper(camBody, K.cutRect(-70, 42, 140, 12, 1, 8), "#2b2233");                    // print slot

    // the print (portrait white-border polaroid, its photo area starts blank cream)
    const PW = 440, PH = 540;
    const printRoot = L13.node(cam, 1480, 740);                                         // slot position
    const printG = K.g(printRoot, {});
    const flip = K.g(printG, {});
    const front = K.g(flip, {});
    K.tex(K.shadow(front, 2), K.cutRect(-PW / 2, -PH / 2, PW, PH, 2, 24), "pat-paper");
    const photoArea = K.g(front, {});
    const clipId = "s01-pclip";
    const cp = K.el("clipPath", { id: clipId }, svg); K.el("rect", { x: -PW / 2 + 22, y: -PH / 2 + 22, width: PW - 44, height: PH - 130 }, cp);
    K.paper(photoArea, K.cutRect(-PW / 2 + 22, -PH / 2 + 22, PW - 44, PH - 130, 1, 12), "#f4e7c9");
    const shapes = K.g(photoArea, { "clip-path": `url(#${clipId})` });
    const ps = L13.photoScene(shapes, PW - 44, PH - 130); ps.setAttribute("transform", `translate(${-PW / 2 + 22} ${-PH / 2 + 22})`);
    shapes.setAttribute("opacity", "0");
    const veil = K.g(photoArea, { opacity: 0.65 });
    K.paper(veil, K.cutRect(-PW / 2 + 22, -PH / 2 + 22, PW - 44, PH - 130, 1, 12), "#f4e7c9");
    K.text(front, 0, PH / 2 - 44, "30 Apr", { size: 40, font: "kalam", weight: 400 });
    // the print's back = red cloth (Khata's cover), shown after the flip
    const back = K.g(flip, { opacity: 0 });
    K.tex(K.shadow(back, 2), K.cutRect(-PW / 2, -PH / 2, PW, PH, 2, 24), "pat-cover");
    const flash = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#fffdf4", opacity: 0 }, svg);
    const black = K.el("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "#000" }, svg);
    L13.hide(printRoot);

    // ====================================================================== timeline
    m.blinks(tl, T0 + 1.0, cue("s01a", "@frozen"), 3.3);
    // fade in from black
    tl.to(black, { opacity: 0, duration: 0.7, ease: "power1.out" }, T0);
    // slow push on the print for the whole scene (≤ 5 %)
    tl.fromTo(cam, { scale: 1, svgOrigin: "1100 560" }, { scale: 1.05, svgOrigin: "1100 560", duration: sc.end - T0 - 1.4, ease: "none" }, T0);

    // Meera wipes the counter (stepped, ends on "frozen")
    const tFrozen = cue("s01a", "@frozen");
    for (let k = 0; tFrozen - 0.45 > T0 + 0.7 + k * 0.4; k++) m.arm(tl, T0 + 0.7 + k * 0.4, "L", 52 + (k % 2 ? 14 : -4), 40 + (k % 2 ? -14 : 12), 0.2);
    // "Click." — Khata lifts the camera; flash; print slides out
    const tClick = cue("s01a", "@click");
    khata.arm(tl, tClick - 0.45, "L", 52); khata.expr(tl, tClick - 0.15, "wow");
    tl.fromTo(camN, { y: 0 }, { y: -26, duration: 0.3, ease: "power2.out" }, tClick - 0.45);
    tl.to(camN, { scale: 1.06, svgOrigin: "0 0", duration: 0.07, ease: "none" }, tClick - 0.02);
    tl.to(camN, { scale: 1, svgOrigin: "0 0", duration: 0.2, ease: "power2.out" }, tClick + 0.05);
    tl.set(flash, { opacity: 0.9 }, tClick); tl.set(flash, { opacity: 0.35 }, tClick + 2 / 15); tl.to(flash, { opacity: 0, duration: 0.18, ease: "power2.out" }, tClick + 4 / 15);
    m.look(tl, tClick, 6, 0);
    // the print: from the slot, out and up to centre
    const tOut = tClick + 0.35;
    tl.set(printRoot, { autoAlpha: 1 }, tOut);
    tl.fromTo(printRoot, { x: 0, y: 0, scale: 0.38, rotation: 8, svgOrigin: O }, { x: -350, y: -250, scale: 1, rotation: -2, svgOrigin: O, duration: 1.25, ease: "power2.out", immediateRender: false }, tOut);
    tl.to(camN, { y: 0, duration: 0.5, ease: "power2.inOut" }, tClick + 1.0);
    khata.arm(tl, tClick + 1.2, "L", 14); khata.expr(tl, tClick + 1.4, "happy");
    // Meera freezes mid-wipe ("frozen")
    m.expr(tl, tFrozen, "amazed");
    // the photo develops in two stepped stages
    const tDev1 = cue("s01b", "@transactions"), tDev2 = cue("s01b", "@developing");
    tl.set(shapes, { opacity: 0.3 }, tDev1); tl.set(veil, { opacity: 0.45 }, tDev1);
    tl.set(shapes, { opacity: 0.55 }, tDev2); tl.set(veil, { opacity: 0.25 }, tDev2);
    m.expr(tl, cue("s01b", "@accounts"), "thinking");
    khata.blink(tl, T0 + 5).blink(tl, T0 + 16);

    // exit: the print flips (fake 3D) → red back grows to fill the frame exactly at the scene end
    const tFlip = sc.end - 1.35;
    tl.to(flip, { scaleX: 0.02, svgOrigin: O, duration: 0.2, ease: "power1.in" }, tFlip);
    tl.set(front, { opacity: 0 }, tFlip + 0.2); tl.set(back, { opacity: 1 }, tFlip + 0.2);
    tl.to(flip, { scaleX: 1, svgOrigin: O, duration: 0.22, ease: "power1.out" }, tFlip + 0.2);
    tl.to(printRoot, { scale: 4.6, rotation: 0, svgOrigin: O, duration: 0.95, ease: "power3.in" }, sc.end - 0.95);
    L13.allow(svg);
  };
})();
