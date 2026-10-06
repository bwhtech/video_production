// Flat-style SVG kit for the accounting course. Every function returns an SVG markup string.
// Coordinates: 1920x1080 scene space. Characters take (x, y) = ground point between the feet.
(function () {
  const C = {
    paper: "#FFF4E2", ink: "#2B2233", teal: "#2FA79A", saffron: "#F2A33A", sky: "#4C9BE0",
    leaf: "#5DB96B", coral: "#EF6F5E", violet: "#7A62C9", night: "#2B3A55",
    red: "#C8372D", redShade: "#A92C24", redDark: "#7E211B", gold: "#E9B949",
    page: "#FFFAF0", rule: "#ECD9BD", margin: "#E7A49A", dr: "#3D7FD9", cr: "#E8862E",
    cheek: "#F29A8F", wood: "#9A6236", woodDark: "#7A4A26", woodLight: "#B57A48",
    brass: "#E2A93B", glass: "#E8F3F8", white: "#FFFFFF",
    drDeep: "#2B66B8", crDeep: "#B85A12", leafDeep: "#2F7F3E", coralDeep: "#C2412F",
  };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const g = (inner, t = "", extra = "") => `<g${t ? ` transform="${t}"` : ""} ${extra}>${inner}</g>`;

  const DEEP = () => ({ [C.dr]: C.drDeep, [C.cr]: C.crDeep, [C.leaf]: C.leafDeep, [C.coral]: C.coralDeep });
  function text(x, y, str, o = {}) {
    const size = o.size || 40, w = o.weight || 700, a = o.anchor || "middle";
    const fill = o.keep ? o.fill : (DEEP()[o.fill] || o.fill || C.ink);
    return `<text x="${x}" y="${y}" font-weight="${w}" font-size="${size}" fill="${fill}" text-anchor="${a}" dominant-baseline="central"${o.ls ? ` letter-spacing="${o.ls}"` : ""}>${esc(str)}</text>`;
  }
  const textW = (str, size) => String(str).length * size * 0.5;

  // Rounded pill label
  function chip(x, y, str, o = {}) {
    const size = o.size || 36, padX = size * 0.6, h = size * 1.5;
    const w = (o.w || textW(str, size)) + padX * 2;
    return g(
      `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${(o.fg === "#fff" && DEEP()[o.bg]) || o.bg || C.white}"/>` +
        text(0, 2, str, { size, fill: o.fg || C.ink, weight: o.weight || 700 }),
      `translate(${x} ${y})${o.rot ? ` rotate(${o.rot})` : ""}`
    );
  }

  // White card with coloured header strip
  function card(x, y, w, h, o = {}) {
    const head = o.head ? `<path d="M0,22 a22,22 0 0 1 22,-22 h${w - 44} a22,22 0 0 1 22,22 v${o.headH || 56 - 22} h${-w} Z" fill="${o.headFill || C.violet}"/>` + text(w / 2, (o.headH || 56) / 2 + 2, o.head, { size: o.headSize || 34, fill: C.white }) : "";
    return g(`<rect x="3" y="8" width="${w}" height="${h}" rx="22" fill="${C.ink}" opacity="0.12"/><rect width="${w}" height="${h}" rx="22" fill="${o.fill || C.white}"/>` + head + (o.body || ""), `translate(${x} ${y})${o.rot ? ` rotate(${o.rot})` : ""}`);
  }

  function shadow(x, y, rx, ry = 18, op = 0.14) {
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${C.ink}" opacity="${op}"/>`;
  }

  // ---------------- people rig ----------------
  const PEOPLE = {
    meera: { skin: "#B9744B", top: "#F2B33D", topShade: "#DE9C25", bottom: "#F6E7CF", hair: "bun", apron: C.teal, earrings: true },
    ravi: { skin: "#A9683F", top: "#F4F1EA", topShade: "#DCD6CB", bottom: "#F4F1EA", hair: "bald", moustache: true, belly: true, umbrella: true },
    priya: { skin: "#C88A5E", top: C.sky, topShade: "#3A86C9", bottom: "#2B3A55", hair: "bob", lanyard: true },
    customer1: { skin: "#9C5E3A", top: C.coral, topShade: "#D85C4B", bottom: "#3B4A66", hair: "short" },
    customer2: { skin: "#C88A5E", top: C.leaf, topShade: "#4BA35A", bottom: "#5B4636", hair: "bob" },
    merchant: { skin: "#A9683F", top: "#F4F1EA", topShade: "#DCD6CB", bottom: "#F4F1EA", hair: "turban", moustache: true },
  };

  const POSES = {
    stand: { L: [-88, -210, -98, -280], R: [88, -210, 98, -280] },
    shrug: { L: [-150, -330, -150, -250], R: [150, -330, 150, -250] },
    point: { L: [-88, -210, -98, -280], R: [215, -430, 140, -390] },
    pointL: { L: [-215, -430, -140, -390], R: [88, -210, 98, -280] },
    hold: { L: [-34, -300, -110, -280], R: [34, -300, 110, -280] },
    celebrate: { L: [-140, -590, -150, -470], R: [140, -590, 150, -470] },
    reachR: { L: [-88, -210, -98, -280], R: [200, -330, 130, -300] },
    reachUp: { L: [-88, -210, -98, -280], R: [150, -610, 150, -480] },
    wave: { L: [-88, -210, -98, -280], R: [150, -560, 175, -420] },
    clasp: { L: [-6, -330, -100, -300], R: [6, -330, 100, -300] },
    steady: { L: [-175, -300, -150, -250], R: [-140, -230, -40, -250] },
  };

  // face sets: brows + eyes + mouth
  function face(kind, look = 0) {
    const lx = look * 6;
    const eye = (x) => `<circle cx="${x + lx}" cy="-470" r="10" fill="${C.ink}"/><circle cx="${x + lx - 3}" cy="-474" r="3" fill="#fff"/>`;
    let brows = `<path d="M-42,-500 Q-28,-508 -14,-500 M14,-500 Q28,-508 42,-500" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    let eyes = eye(-28) + eye(28);
    let mouth = `<path d="M-20,-436 Q0,-430 20,-436 Q18,-414 0,-412 Q-18,-414 -20,-436Z" fill="${C.ink}"/><path d="M-10,-418 Q0,-424 10,-418 Q5,-412 0,-412 Q-5,-412 -10,-418Z" fill="${C.cheek}"/>`;
    if (kind === "puzzled") {
      brows = `<path d="M-42,-498 Q-28,-504 -14,-498 M14,-508 Q28,-518 42,-506" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
      mouth = `<path d="M-14,-424 Q0,-432 14,-422" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    } else if (kind === "wow") {
      brows = `<path d="M-42,-508 Q-28,-518 -14,-508 M14,-508 Q28,-518 42,-508" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
      mouth = `<ellipse cx="0" cy="-424" rx="11" ry="14" fill="${C.ink}"/>`;
    } else if (kind === "worried") {
      brows = `<path d="M-42,-504 Q-28,-498 -14,-506 M14,-506 Q28,-498 42,-504" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
      mouth = `<path d="M-16,-420 Q0,-430 16,-420" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    } else if (kind === "smile") {
      mouth = `<path d="M-18,-432 Q0,-418 18,-432" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    } else if (kind === "joy") {
      eyes = `<path d="M-40,-468 Q-28,-482 -16,-468 M16,-468 Q28,-482 40,-468" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    }
    const cheeks = `<ellipse cx="-44" cy="-444" rx="13" ry="8" fill="${C.cheek}" opacity="0.6"/><ellipse cx="44" cy="-444" rx="13" ry="8" fill="${C.cheek}" opacity="0.6"/>`;
    return cheeks + brows + eyes + mouth;
  }

  function hair(p, back) {
    const h = "#2B1E24";
    if (p.hair === "bun") return back
      ? `<circle cx="34" cy="-562" r="40" fill="${h}"/><path d="M74,-526 L4,-612" stroke="${C.gold}" stroke-width="13" stroke-linecap="butt"/><path d="M-2,-619 L10,-605 L-10,-628Z" fill="#F6D9A8"/>`
      : `<path d="M-82,-470 Q-86,-568 0,-572 Q86,-568 82,-470 Q70,-520 30,-528 Q-10,-500 -60,-516 Q-76,-500 -82,-470Z" fill="${h}"/>`;
    if (p.hair === "bob") return back ? `<path d="M-90,-400 Q-96,-580 0,-580 Q96,-580 90,-400 Z" fill="${h}"/>` : `<path d="M-84,-470 Q-84,-572 0,-574 Q84,-572 84,-470 Q60,-530 0,-528 Q-50,-530 -84,-470Z" fill="${h}"/>`;
    if (p.hair === "short") return back ? "" : `<path d="M-80,-480 Q-80,-570 0,-572 Q80,-570 80,-480 Q66,-534 0,-536 Q-60,-534 -80,-480Z" fill="${h}"/>`;
    if (p.hair === "bald") return back ? "" : `<path d="M-80,-450 Q-86,-500 -66,-520 L-62,-470Z M80,-450 Q86,-500 66,-520 L62,-470Z" fill="#CFCAC4"/>`;
    if (p.hair === "turban") return back ? "" : `<path d="M-86,-490 Q-90,-600 0,-604 Q90,-600 86,-490 Q40,-520 0,-516 Q-40,-520 -86,-490Z" fill="${C.saffron}"/><circle cx="0" cy="-560" r="12" fill="${C.coral}"/>`;
    return "";
  }

  function arm(spec, sx, sy, colour, skin) {
    const [hx, hy, cx, cy] = spec;
    return `<path d="M${sx},${sy} Q${cx},${cy} ${hx},${hy}" fill="none" stroke="${colour}" stroke-width="28" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="17" fill="${skin}"/>`;
  }

  function person(who, x, y, o = {}) {
    const p = PEOPLE[who], s = o.s || 1, pose = POSES[o.pose || "stand"];
    const belly = p.belly ? 30 : 0;
    const legs = o.noLegs ? "" : `<path d="M-26,-150 L-30,-14 M26,-150 L30,-14" stroke="${p.bottom}" stroke-width="30" stroke-linecap="round"/>` +
      `<ellipse cx="-36" cy="-8" rx="24" ry="12" fill="${C.ink}"/><ellipse cx="36" cy="-8" rx="24" ry="12" fill="${C.ink}"/>`;
    const torso = `<path d="M-66,-372 Q-${80 + belly},-260 -${92 + belly / 2},-140 L${92 + belly / 2},-140 Q${80 + belly},-260 66,-372 Q0,-386 -66,-372Z" fill="${p.top}"/>` +
      `<path d="M30,-372 Q${80 + belly},-260 ${92 + belly / 2},-140 L50,-140 Q60,-260 30,-372Z" fill="${p.topShade}"/>`;
    const apron = p.apron ? `<path d="M-52,-320 L52,-320 L62,-150 L-62,-150Z" fill="${p.apron}"/><path d="M-52,-320 L-30,-372 M52,-320 L30,-372" stroke="${p.apron}" stroke-width="8"/><rect x="-30" y="-260" width="60" height="40" rx="8" fill="#27907F"/>` : "";
    const lanyard = p.lanyard ? `<path d="M-26,-372 L0,-300 L26,-372" stroke="${C.coral}" stroke-width="6" fill="none"/><rect x="-18" y="-300" width="36" height="46" rx="6" fill="#fff"/><rect x="-12" y="-292" width="24" height="10" rx="3" fill="${C.sky}"/>` : "";
    const neck = `<rect x="-20" y="-400" width="40" height="40" fill="${p.skin}"/>`;
    const head = `<rect x="-78" y="-556" width="156" height="170" rx="64" fill="${p.skin}"/>` +
      `<circle cx="-80" cy="-462" r="13" fill="${p.skin}"/><circle cx="80" cy="-462" r="13" fill="${p.skin}"/>` +
      (p.earrings ? `<circle cx="-82" cy="-444" r="6" fill="${C.gold}"/><circle cx="82" cy="-444" r="6" fill="${C.gold}"/>` : "");
    const moust = p.moustache ? `<path d="M-40,-438 Q-20,-454 0,-442 Q20,-454 40,-438 Q20,-430 0,-436 Q-20,-430 -40,-438Z" fill="#E4E0DA"/>` : "";
    const umbrella = p.umbrella && !o.noProp ? `<path d="M-120,-60 L-120,-330 Q-120,-350 -100,-350" stroke="${C.ink}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-120,-330 Q-150,-200 -128,-70 L-112,-70 Q-100,-200 -120,-330Z" fill="#2B2233"/>` : "";
    const faceSet = face(o.face || "happy", o.look || 0);
    const body = hair(p, true) + legs + umbrella + torso + apron + lanyard +
      arm(pose.L, -60, -355, p.top, p.skin) + arm(pose.R, 60, -355, p.top, p.skin) + neck + head + hair(p, false) + moust + faceSet + (o.extra || "");
    return g(shadow(0, 0, 110 * (p.belly ? 1.2 : 1)) + g(body, o.flip ? "scale(-1 1)" : ""), `translate(${x} ${y}) scale(${s})`, `filter="url(#boil)"`);
  }

  // ---------------- Khata ----------------
  function khata(x, y, o = {}) {
    const s = o.s || 1, open = o.open ?? 1, fc = o.face || "happy";
    const page = (side) => {
      const sign = side === "L" ? -1 : 1;
      const glow = side === "L" ? o.glowL : o.glowR;
      const glowCol = side === "L" ? C.dr : C.cr;
      const x0 = side === "L" ? -340 : 0;
      const px = side === "L" ? -326 : 8;
      let rules = "";
      for (let i = 0; i < 6; i++) rules += `<line x1="${px + 14}" y1="${-300 + i * 40}" x2="${px + 304}" y2="${-300 + i * 40}" stroke="${C.rule}" stroke-width="3"/>`;
      const content = (side === "L" ? o.contentL : o.contentR) || "";
      return g(
        `<rect x="${side === "L" ? -346 : 0}" y="-360" width="346" height="330" rx="20" fill="${C.redDark}"/>` +
          `<rect x="${x0}" y="-372" width="340" height="330" rx="20" fill="${C.red}"/>` +
          `<rect x="${px}" y="-358" width="318" height="302" rx="10" fill="${C.page}"/>` + rules +
          `<line x1="${side === "L" ? -268 : 268}" y1="-350" x2="${side === "L" ? -268 : 268}" y2="-64" stroke="${C.margin}" stroke-width="3"/>` +
          (glow ? `<rect x="${px}" y="-358" width="318" height="302" rx="10" fill="${glowCol}" opacity="${glow}"/>` : "") + content,
        `translate(${sign * 86} 0) scale(${open} 1)`
      );
    };
    const armX = 86 + 342 * open;
    const aL = o.armL ?? 20, aR = o.armR ?? -20;
    const armG = (side, ang) => g(`<path d="M0,0 C${side * 26},4 ${side * 46},16 ${side * 62},30" fill="none" stroke="${C.redShade}" stroke-width="18" stroke-linecap="round"/><circle cx="${side * 64}" cy="32" r="15" fill="${C.redShade}"/>` + (side < 0 ? o.handL || "" : o.handR || ""), `translate(${side * armX} -190) rotate(${ang})`);
    let eyes;
    if (fc === "sleep") eyes = `<path d="M-58,-262 Q-38,-248 -18,-262 M18,-262 Q38,-248 58,-262" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
    else {
      const lk = (o.look || 0) * 8, up = o.lookUp ? -8 : 0;
      const e = (cx, wink) => wink ? `<path d="M${cx - 20},${-266} Q${cx},${-252} ${cx + 20},${-266}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" fill="none"/>` :
        `<ellipse cx="${cx}" cy="-268" rx="25" ry="30" fill="#fff"/><circle cx="${cx + lk}" cy="${-264 + up}" r="13" fill="${C.ink}"/><circle cx="${cx + lk - 4}" cy="${-269 + up}" r="4.5" fill="#fff"/>`;
      eyes = e(-38, false) + e(38, fc === "wink");
    }
    const mouth = fc === "sleep" ? `<path d="M-10,-206 Q0,-200 10,-206" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` :
      fc === "wow" ? `<ellipse cx="0" cy="-200" rx="12" ry="15" fill="${C.ink}"/>` :
      `<path d="M-22,-212 Q0,-206 22,-212 Q20,-186 0,-184 Q-20,-186 -22,-212Z" fill="${C.ink}"/><path d="M-11,-192 Q0,-200 11,-192 Q6,-185 0,-185 Q-6,-185 -11,-192Z" fill="${C.cheek}"/>`;
    const spine = `<rect x="-90" y="-390" width="180" height="368" rx="28" fill="${C.red}"/><rect x="38" y="-390" width="52" height="368" rx="26" fill="${C.redShade}"/>` +
      `<rect x="-90" y="-112" width="180" height="14" fill="${C.gold}"/>` +
      `<ellipse cx="-22" cy="-118" rx="22" ry="13" fill="none" stroke="${C.gold}" stroke-width="7" transform="rotate(-20 -22 -118)"/><ellipse cx="22" cy="-118" rx="22" ry="13" fill="none" stroke="${C.gold}" stroke-width="7" transform="rotate(20 22 -118)"/>` +
      `<path d="M-4,-104 L-18,-70 M4,-104 L18,-70" stroke="${C.gold}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-106" r="9" fill="${C.gold}"/>` +
      `<ellipse cx="-50" cy="-212" rx="18" ry="11" fill="${C.cheek}" opacity="0.55"/><ellipse cx="50" cy="-212" rx="18" ry="11" fill="${C.cheek}" opacity="0.55"/>` + eyes + mouth;
    const feet = `<rect x="-62" y="-30" width="44" height="34" rx="16" fill="${C.redDark}"/><rect x="18" y="-30" width="44" height="34" rx="16" fill="${C.redDark}"/>`;
    const body = feet + (open > 0.02 ? page("L") + page("R") : "") + armG(-1, aL) + armG(1, aR) + spine;
    return g(shadow(0, 0, 150 + 300 * open, 20) + g(body, o.rot ? `rotate(${o.rot})` : ""), `translate(${x} ${y}) scale(${s})`, `filter="url(#boil)"`);
  }

  // ---------------- props ----------------
  function note(x, y, rot = 0, col = "#8FC79A") {
    return g(`<rect x="-46" y="-24" width="92" height="48" rx="6" fill="${col}"/><rect x="-36" y="-14" width="72" height="28" rx="4" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/><circle cx="0" cy="0" r="9" fill="#fff" opacity="0.6"/>`, `translate(${x} ${y}) rotate(${rot})`);
  }
  function bundle(x, y, rot = 0) {
    return g(note(0, 6, 0, "#7FB98A") + note(0, 0, 0, "#8FC79A") + `<rect x="-12" y="-26" width="24" height="52" fill="${C.paper}"/>`, `translate(${x} ${y}) rotate(${rot})`);
  }
  function coin(x, y, r = 22) {
    return g(`<circle r="${r}" fill="${C.gold}"/><circle r="${r * 0.68}" fill="none" stroke="#C9972E" stroke-width="${r * 0.14}"/>` + text(0, 1, "₹", { size: r * 1.1, fill: "#6E4C0E" }), `translate(${x} ${y})`);
  }
  function galla(x, y, o = {}) {
    const notes = o.full ? note(-40, -96, -12) + note(20, -104, 8, "#C9A6E0") + note(50, -92, -6) + note(-10, -110, 14, "#F2C27A") : "";
    return g(
      shadow(0, 4, 120, 14) +
        `<path d="M-110,-90 L-120,-150 L120,-150 L110,-90Z" fill="${C.woodLight}" transform="rotate(${o.open === false ? 0 : -14} -110 -90)"/>` + notes +
        `<rect x="-110" y="-90" width="220" height="90" rx="10" fill="${C.wood}"/><rect x="-110" y="-90" width="220" height="16" fill="${C.woodDark}"/>` +
        `<rect x="-14" y="-66" width="28" height="30" rx="5" fill="${C.brass}"/>` + (o.tags || ""),
      `translate(${x} ${y}) scale(${o.s || 1})`
    );
  }
  function cart(x, y, o = {}) {
    let stripes = "";
    for (let i = 0; i < 8; i++) stripes += `<path d="M${-300 + i * 75},-560 L${-225 + i * 75},-560 L${-225 + i * 75},-500 Q${-262 + i * 75},-470 ${-300 + i * 75},-500Z" fill="${i % 2 ? C.paper : C.saffron}"/>`;
    let tumblers = "";
    for (let i = 0; i < 4; i++) tumblers += `<path d="M${120 + i * 40},-320 l30,0 l-4,46 l-22,0z" fill="#fff" opacity="0.85"/><path d="M${123 + i * 40},-306 l24,0 l-3,32 l-18,0z" fill="#C98A4B"/>`;
    const face = o.face ? `<circle cx="-110" cy="-430" r="34" fill="#fff"/><circle cx="110" cy="-430" r="34" fill="#fff"/><circle cx="-104" cy="-424" r="15" fill="${C.ink}"/><circle cx="116" cy="-424" r="15" fill="${C.ink}"/><path d="M-90,-240 Q0,-190 90,-240" stroke="${C.ink}" stroke-width="10" fill="none" stroke-linecap="round"/>` : "";
    const sign = o.sign ? `<rect x="-150" y="-620" width="300" height="64" rx="14" fill="${C.woodDark}"/>` + text(0, -588, o.sign, { size: 40, fill: C.paper }) : "";
    return g(
      shadow(0, 0, 330, 22) +
        (o.noAwning ? "" : `<rect x="-280" y="-560" width="16" height="300" fill="${C.woodDark}"/><rect x="264" y="-560" width="16" height="300" fill="${C.woodDark}"/>` + stripes + sign) +
        `<path d="M-90,-370 q0,-50 60,-50 q60,0 60,50 l20,0 l-10,40 l-120,0 l-10,-40z" fill="${C.brass}"/><path d="M30,-390 q40,-10 50,20" stroke="${C.brass}" stroke-width="12" fill="none"/>` +
        `<path d="M-60,-440 q-20,-30 0,-60 q20,-30 0,-60" stroke="#fff" stroke-opacity="0.7" stroke-width="10" fill="none" stroke-linecap="round"/>` +
        `<rect x="-110" y="-330" width="150" height="20" rx="4" fill="#4A4A55"/>` + tumblers +
        `<rect x="-310" y="-270" width="620" height="26" rx="8" fill="${C.woodLight}"/>` +
        `<rect x="-290" y="-244" width="580" height="170" rx="10" fill="${C.wood}"/>` +
        `<line x1="-290" y1="-188" x2="290" y2="-188" stroke="${C.woodDark}" stroke-width="5"/><line x1="-290" y1="-132" x2="290" y2="-132" stroke="${C.woodDark}" stroke-width="5"/>` +
        `<circle cx="150" cy="-80" r="78" fill="#3A2C2C"/><circle cx="150" cy="-80" r="54" fill="none" stroke="${C.woodLight}" stroke-width="8"/>` +
        `<path d="M150,-158 L150,-2 M72,-80 L228,-80 M95,-135 L205,-25 M205,-135 L95,-25" stroke="${C.woodLight}" stroke-width="6"/><circle cx="150" cy="-80" r="14" fill="${C.brass}"/>` +
        `<rect x="-270" y="-80" width="24" height="80" fill="${C.woodDark}"/>` + face + (o.extra || ""),
      `translate(${x} ${y}) scale(${o.s || 1})`, `filter="url(#boil)"`
    );
  }
  function jar(x, y, o = {}) {
    const w = o.w || 170, h = o.h || 220;
    const fillH = h * (o.level ?? 0.55);
    let contents = "";
    if (o.kind === "leaves") contents = `<rect x="${-w / 2 + 10}" y="${-fillH}" width="${w - 20}" height="${fillH - 8}" rx="12" fill="#5B3A22"/>`;
    else { const rows = Math.max(1, Math.round(fillH / 30)); for (let r = 0; r < rows; r++) for (let c = 0; c < 3; c++) contents += coin(-w / 2 + 38 + c * ((w - 76) / 2) + (r % 2) * 10, -22 - r * 28, 20); }
    return g(
      shadow(0, 2, w * 0.6, 12) + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="26" fill="${C.glass}" opacity="0.9"/>` + contents +
        `<rect x="${-w / 2 + 14}" y="${-h + 20}" width="14" height="${h - 60}" rx="7" fill="#fff" opacity="0.7"/>` +
        `<rect x="${-w / 2 - 6}" y="${-h - 26}" width="${w + 12}" height="34" rx="10" fill="${o.lid || C.woodDark}"/>` +
        (o.label ? chip(0, -h * 0.55, o.label, { size: o.labelSize || 30, bg: C.white }) : ""),
      `translate(${x} ${y}) scale(${o.s || 1})`
    );
  }
  function scale(x, y, o = {}) {
    const tilt = o.tilt || 0, beam = 420;
    const ly = Math.sin((tilt * Math.PI) / 180) * beam;
    const pan = (px, py, col, content) => g(
      `<path d="M0,0 L-120,190 M0,0 L120,190" stroke="${C.ink}" stroke-opacity="0.5" stroke-width="4"/>` +
        `<path d="M-160,190 L160,190 Q140,250 0,252 Q-140,250 -160,190Z" fill="${col}"/>` + g(content || "", "translate(0 190)"),
      `translate(${px} ${py})`
    );
    return g(
      shadow(0, 0, 220, 20) +
        `<path d="M-140,0 L140,0 L100,-40 L-100,-40Z" fill="${C.brass}"/><rect x="-20" y="-560" width="40" height="525" rx="12" fill="${C.brass}"/>` +
        `<circle cx="0" cy="-580" r="34" fill="${C.brass}"/>` +
        g(`<rect x="${-beam}" y="-12" width="${beam * 2}" height="24" rx="12" fill="#C99230"/>`, `translate(0 -560) rotate(${tilt})`) +
        pan(-beam, -560 - ly, o.leftCol || C.dr, o.left) + pan(beam, -560 + ly, o.rightCol || C.cr, o.right) + (o.top || ""),
      `translate(${x} ${y}) scale(${o.s || 1})`, `filter="url(#boil)"`
    );
  }
  function filmStrip(x, y, o = {}) {
    const n = o.frames || 4, fw = 120, fh = 90;
    let frames = "";
    for (let i = 0; i < n; i++) frames += `<rect x="${12 + i * (fw + 12)}" y="22" width="${fw}" height="${fh}" rx="6" fill="${(o.cols || [C.sky, C.saffron, C.leaf, C.coral])[i % 4]}"/>` + (o.icons ? g(o.icons[i % o.icons.length], `translate(${12 + i * (fw + 12) + fw / 2} ${22 + fh / 2})`) : "");
    const W = 12 + n * (fw + 12);
    let holes = "";
    for (let i = 0; i < W / 30; i++) holes += `<rect x="${8 + i * 30}" y="6" width="14" height="10" rx="2" fill="${C.paper}"/><rect x="${8 + i * 30}" y="${fh + 30}" width="14" height="10" rx="2" fill="${C.paper}"/>`;
    return g(`<rect width="${W}" height="${fh + 46}" rx="10" fill="${C.ink}"/>` + holes + frames, `translate(${x} ${y}) rotate(${o.rot || 0}) scale(${o.s || 1})`);
  }
  function polaroid(x, y, o = {}) {
    const w = o.w || 260, h = o.h || 300;
    return g(`<rect x="4" y="10" width="${w}" height="${h}" rx="8" fill="${C.ink}" opacity="0.15"/><rect width="${w}" height="${h}" rx="8" fill="#fff"/><rect x="18" y="18" width="${w - 36}" height="${h - 90}" rx="4" fill="${o.bg || C.sky}"/>` + g(o.inner || "", `translate(18 18)`), `translate(${x} ${y}) rotate(${o.rot || 0})`);
  }
  function gauge(x, y, o = {}) {
    const ang = o.angle || 0; // -90..90
    let ticks = "";
    for (let i = 0; i <= 8; i++) { const a = (-180 + i * 22.5) * Math.PI / 180; ticks += `<line x1="${Math.cos(a) * 150}" y1="${Math.sin(a) * 150}" x2="${Math.cos(a) * 172}" y2="${Math.sin(a) * 172}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" opacity="0.5"/>`; }
    return g(
      `<path d="M-200,0 A200,200 0 0 1 200,0 Z" fill="#fff"/><path d="M-200,0 A200,200 0 0 1 200,0" fill="none" stroke="${o.col || C.leaf}" stroke-width="22"/>` + ticks +
        g(`<path d="M-8,0 L0,-160 L8,0Z" fill="${C.ink}"/>`, `rotate(${ang})`) + `<circle r="18" fill="${C.ink}"/>` +
        g(o.icon || "", "translate(0 -80)") + (o.label ? text(0, 56, o.label, { size: 44, fill: o.labelFill || C.white }) : "") + (o.value ? chip(0, 128, o.value, { size: 40, bg: C.white }) : ""),
      `translate(${x} ${y}) scale(${o.s || 1})`
    );
  }
  function miniBook(x, y, o = {}) {
    const w = o.w || 90, h = o.h || 150;
    return g(`<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="12" fill="${o.col || C.red}"/><rect x="${w / 2 - 18}" y="${-h}" width="18" height="${h}" rx="9" fill="${C.redShade}"/><rect x="${-w / 2}" y="${-h * 0.32}" width="${w}" height="8" fill="${C.gold}"/>` +
      (o.icon ? g(o.icon, `translate(-6 ${-h * 0.66})`) : "") + (o.label ? text(-6, -h * 0.15, o.label, { size: o.labelSize || 18, fill: C.paper }) : ""),
      `translate(${x} ${y}) rotate(${o.rot || 0})`);
  }
  function arrow(x, y, dir = 1, col = C.dr, o = {}) {
    const L = o.len || 100;
    return g(`<path d="M${-dir * L / 2},0 L${dir * L / 2},0 M${dir * (L / 2 - 34)},-30 L${dir * L / 2},0 L${dir * (L / 2 - 34)},30" fill="none" stroke="${col}" stroke-width="${o.w || 16}" stroke-linecap="round" stroke-linejoin="round"/>`, `translate(${x} ${y}) rotate(${o.rot || 0})`);
  }
  function sparkle(x, y, s = 1, col = C.gold) {
    return `<path d="M0,-26 C3,-6 6,-3 26,0 C6,3 3,6 0,26 C-3,6 -6,3 -26,0 C-6,-3 -3,-6 0,-26Z" fill="${col}" transform="translate(${x} ${y}) scale(${s})"/>`;
  }
  function qmark(x, y, col = C.dr, s = 1) {
    return g(`<path d="M-16,-40 Q-16,-62 4,-62 Q24,-62 24,-44 Q24,-30 8,-24 Q2,-21 2,-10" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/><circle cx="2" cy="8" r="7" fill="${col}"/>`, `translate(${x} ${y}) scale(${s})`);
  }
  function bulb(x, y, s = 1) {
    return g(`<circle cx="0" cy="-20" r="34" fill="${C.gold}"/><rect x="-16" y="8" width="32" height="20" rx="5" fill="#9A8F86"/>` +
      `<path d="M-60,-20 L-46,-20 M46,-20 L60,-20 M0,-80 L0,-66 M-42,-62 L-32,-52 M42,-62 L32,-52" stroke="${C.gold}" stroke-width="7" stroke-linecap="round"/>`, `translate(${x} ${y}) scale(${s})`);
  }
  function stamp(x, y, s = 1) {
    return g(`<circle r="70" fill="none" stroke="${C.coral}" stroke-width="12"/><path d="M-36,-36 L36,36 M36,-36 L-36,36" stroke="${C.coral}" stroke-width="16" stroke-linecap="round"/>`, `translate(${x} ${y}) rotate(-12) scale(${s})`);
  }
  function iou(x, y, o = {}) {
    return g(`<rect x="-80" y="-56" width="160" height="112" rx="10" fill="#fff"/><path d="M-60,-24 L60,-24 M-60,0 L30,0" stroke="${C.rule}" stroke-width="6" stroke-linecap="round"/>` + LUCIDE("handshake", 0, 30, 44, C.cr) + (o.label ? chip(0, 90, o.label, { size: 28, bg: C.cr, fg: "#fff" }) : ""), `translate(${x} ${y}) rotate(${o.rot || 0})`);
  }
  function faceTag(x, y, who, o = {}) {
    const p = PEOPLE[who];
    const mini = `<circle r="30" fill="${p.skin}"/>` + (p.hair === "bun" ? `<path d="M-30,-4 Q-30,-34 0,-34 Q30,-34 30,-4 Q14,-20 0,-20 Q-14,-20 -30,-4Z" fill="#2B1E24"/><circle cx="14" cy="-34" r="12" fill="#2B1E24"/>` : "") +
      (p.moustache ? `<path d="M-14,10 Q0,2 14,10 Q0,14 -14,10Z" fill="#E4E0DA"/>` : "") + `<circle cx="-10" cy="-2" r="4" fill="${C.ink}"/><circle cx="10" cy="-2" r="4" fill="${C.ink}"/>`;
    return g(`<path d="M-60,-46 L40,-46 L70,0 L40,46 L-60,46 Q-70,46 -70,36 L-70,-36 Q-70,-46 -60,-46Z" fill="#fff"/><circle cx="50" cy="0" r="7" fill="${C.paper}"/>` + g(mini, "translate(-22 0)") + (o.label ? chip(0, 80, o.label, { size: 26, bg: o.bg || C.ink, fg: "#fff" }) : ""), `translate(${x} ${y}) rotate(${o.rot || 0}) scale(${o.s || 1})`);
  }

  // Lucide icons (path data copied from lucide-static, 24x24, stroke-based)
  const LUCIDE_PATHS = {
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    shoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    flashlight: '<path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"/><line x1="6" x2="18" y1="6" y2="6"/><line x1="12" x2="12" y1="12" y2="12"/>',
  };
  function LUCIDE(name, x, y, size = 48, col = C.ink, sw = 2.2) {
    return `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${LUCIDE_PATHS[name]}</g>`;
  }
  function medallion(x, y, icon, o = {}) {
    const r = o.r || 52;
    return g(`<circle r="${r}" fill="${o.bg || C.white}"/>` + LUCIDE(icon, 0, 0, r * 1.05, o.col || C.ink), `translate(${x} ${y})`);
  }

  // string lights across the top of a night scene
  function stringLights(y = 90) {
    let s = `<path d="M-20,${y} Q480,${y + 90} 960,${y + 10} Q1440,${y + 90} 1940,${y}" fill="none" stroke="#1A2438" stroke-width="5"/>`;
    for (let i = 0; i < 22; i++) {
      const t = i / 21, xx = -20 + t * 1960;
      const seg = t < 0.5 ? t * 2 : (t - 0.5) * 2;
      const yy = y + Math.sin(seg * Math.PI) * 60 + 10;
      s += `<circle cx="${xx}" cy="${yy + 14}" r="12" fill="${C.gold}"/><circle cx="${xx}" cy="${yy + 14}" r="24" fill="${C.gold}" opacity="0.18"/>`;
    }
    return s;
  }
  function stars(n = 24, seed = 3) {
    let s = "", h = seed;
    const rnd = () => ((h = (h * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < n; i++) s += `<circle cx="${rnd() * 1920}" cy="${rnd() * 380}" r="${2 + rnd() * 3}" fill="#fff" opacity="${0.4 + rnd() * 0.5}"/>`;
    return s;
  }
  function ground(col, y = 900) {
    return `<rect x="0" y="${y}" width="1920" height="${1080 - y}" fill="${col}"/>`;
  }
  function confetti(n = 30, seed = 5, area = [300, 100, 900, 500]) {
    let s = "", h = seed;
    const rnd = () => ((h = (h * 9301 + 49297) % 233280) / 233280);
    const cols = [C.coral, C.gold, C.sky, C.leaf, C.violet];
    for (let i = 0; i < n; i++) s += `<rect x="${area[0] + rnd() * area[2]}" y="${area[1] + rnd() * area[3]}" width="${14 + rnd() * 10}" height="${8 + rnd() * 6}" rx="3" fill="${cols[i % 5]}" transform="rotate(${rnd() * 180} ${area[0] + rnd() * area[2]} ${area[1] + rnd() * area[3]})"/>`;
    return s;
  }

  window.KIT = { C, g, text, chip, card, shadow, person, khata, note, bundle, coin, galla, cart, jar, scale, filmStrip, polaroid, gauge, miniBook, arrow, sparkle, qmark, bulb, stamp, iou, faceTag, LUCIDE, medallion, stringLights, stars, ground, confetti };
})();
