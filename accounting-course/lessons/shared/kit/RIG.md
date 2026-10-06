# Paper rig — API

Load order (all local, no render-time network):

```html
<link rel="stylesheet" href="assets/kit/fonts.css" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="assets/kit/icons.js"></script>
<script src="assets/kit/kit.js"></script>   <!-- primitives + set pieces (stills kit) -->
<script src="assets/kit/rig.js"></script>   <!-- animation rig: extends window.KIT -->
<script src="assets/kit/devices.js"></script> <!-- shared course devices (scale, jars, tags, …): extends window.KIT -->
```

The page needs one shared `<defs>` block with `pat-cover`, `pat-paper`, `pat-kraft`, `pat-grain`
(`assets/kit/tex/*.jpg`) and the drop-shadow filters `sh1`–`sh3` — copy it from
`kit-sheet/index.html`.

## Rules

- Build everything synchronously at page load, then add tweens to the composition's one paused
  timeline. Every rig method has the shape `method(tl, t, …)` and returns the rig (chainable).
- Acting is stepped **on twos** (12 fps, aligned to the global grid) by default. Pass
  `{ smooth: true }` in the last argument for 30 fps (camera moves, flights, tickers).
- Rotations/scales pivot at joints via `svgOrigin: "0 0"` on geometry drawn around local (0,0).
  Never tween a rig group's `x` if it has a `transform` attribute you want to keep — the rig
  already gives you a `mover` (walk/x) and a `lift` (hop/y) for that.
- (Devices) Entrances are drop-and-place (1.07× → 1, power2.out, no overshoot), exits lift off (1.05× + fade); numbers
  count; nothing idles. Never put two `tl.set`s on the same target at the same time (reverse seeks run them backwards).
- Wrap per-step paper wobble with `rig.jitter(tl, t0, t1)` (acts on the `jit` wrapper, so it
  never fights the rig's own tweens).

## Timing helpers

| Function | |
|---|---|
| `K.stepEase(dur, ease = "power2.out", t0?)` | ease quantised to 12 fps; with `t0` the steps align to the global grid |
| `K.q(ease, dur, t0?)` | alias of `stepEase` |
| `K.tw(tl, target, vars, t, dur, {smooth, ease})` | tween helper used by the rig |
| `K.jitter(tl, els, t0, t1, {rot: 0.6, px: 1.5, seed})` | deterministic per-1/12 s micro offsets on wrapper groups |
| `K.FPS` | 12 |

## People — `K.meera / raviMama / priya / merchant(parent, x, y, s, opts)`

`(x, y)` = ground point between the feet; height ≈ 620·s. `opts`: `expr`, `aL`/`aR`
(`[shoulderDeg, elbowDeg]`, 0 = hanging, + = swing outward/up; elbow is relative), `flip`,
`sit`, `lookX/lookY`, plus the stills-kit person options.

Returns a rig: `g, mover, jit, lift, body, top, head, arms.{L,R}.{upper,fore,hand,anchor},
face.{eyes,brows,mouths,pupils}, handL, handR` (world hand points at the build pose) and:

| Method | Notes |
|---|---|
| `expr(tl, t, name, {noTake})` | `neutral happy grin joy puzzled amazed/wow worried sad thinking angry sleep talk proud` — 2-step squash "take" then swap eyes/brows/mouth |
| `blink(tl, t)` / `blinks(tl, t0, t1, every = 3.1)` | only blinks when the current eyes are open |
| `look(tl, t, dx, dy)` | pupils (±9 is a strong look) |
| `headTilt(tl, t, deg)` | neck pivot |
| `arm(tl, t, "L"/"R", shDeg, elDeg, dur = 0.33)` | forearm lags one step (overlap) |
| `pose(tl, t, {aL, aR, lean, head, dur})` | right arm offset by one step (no twinning) |
| `shrug(tl, t, hold = 0.7, {keep})` | palms up + shoulders lift + head tilt, then returns |
| `wave(tl, t, side = "R", beats = 3, {keep})` | |
| `point(tl, t, side = "R", angle = 90)` | straight arm at `angle` from hanging |
| `hop(tl, t, {height = 60})` | anticipation → stretch → land squash → settle |
| `walkTo(tl, t, worldX, dur = 1.2)` | cheat walk: slide + 2-step bob |
| `lean(tl, t, deg)` | body pivot at the feet |
| `handAnchor("L"/"R")` | `<g>` at the hand that follows the arm — draw props around (0,0) |
| `jitter(tl, t0, t1, {seed, rot, px})` | |

Pose cheat-sheet: idle `[12, 8]` · shrug `[8, 96]` · point `[90, 4]` · wave `[150, -20]` ·
hands-on-hips `[40, -66]` · cheer `[160, 12]` · hold-in-front `[20, 70]`.

## Khata — `K.khataRig(parent, x, y, s, opts)`

Spine ≈ 390·s tall; open width ≈ 870·s. `opts`: `open` (false), `expr` (`awake`), `armL/armR`
(deg), `lookX/lookY`, `blankPages`, `pageContent(group, side, px)`.

Returns `g, mover, jit, lift, body, panels.{L,R}, tints.{L,R}, pageArea.{L,R}.{g,x,y,w,h},
arms.{L,R}.{slide,arm,hand}, face, emotes, shadow` and:

| Method | Notes |
|---|---|
| `open(tl, t, dur = 0.55)` / `close(tl, t, dur = 0.4)` | pinch anticipation, pages fan from the spine, arms slide to the page edges |
| `expr(tl, t, name)` | `sleep awake happy wink wow` |
| `blink`, `look(tl, t, dx, dy)`, `arm(tl, t, side, deg)`, `hop`, `wiggle` | |
| `pageTint(tl, t, "left"/"right", on = true)` | debit-blue / credit-orange paper sheet drops onto the page |
| `emote(tl, t, "z" / "!" / "?" / "sparkle", hold = 1)` | pops in and out |
| `handAnchor(side)`, `jitter(tl, t0, t1)` | |

## Set pieces with refs

- `K.stall(parent, x, y, s, {face, faceExpr, gallaOpen, overflow, noProps, galla:false})` →
  `{ g, jit, awning, face, wheels, galla, kettle, steam, tumblers, jitter() }`;
  `face.expr(tl, t, "happy"|"frown"|"wow")`, `face.look(tl, t, dx, dy)` (eyes under the awning,
  mouth on the counter front).
- `K.galla(parent, x, y, s, {open, overflow})` → `{ g, jit, body, lidOpen, lidClosed, notes,
  clasp, open(tl, t), shut(tl, t) }` (shut has a slam squash; notes show when open+overflow).
- `K.kettle(parent, x, y, s)` → `{ g, steam, puffs, steamLoop(tl, t0, t1) }`.

## Example

```js
const tl = gsap.timeline({ paused: true });
const m = K.meera(svg, 470, 1010, 1.0, { expr: "happy" });
const k = K.khataRig(svg, 1480, 1000, 0.95, { expr: "sleep" });
m.expr(tl, 0.7, "amazed").wave(tl, 1.0, "R", 2).shrug(tl, 2.4).point(tl, 3.7, "R", 95);
k.emote(tl, 0, "z", 0.9).expr(tl, 1.1, "wow").hop(tl, 1.4).open(tl, 2.6)
 .pageTint(tl, 3.4, "left").pageTint(tl, 4.0, "right").expr(tl, 4.8, "wink");
m.jitter(tl, 0, 6); k.jitter(tl, 0, 6);
window.__timelines["main"] = tl;
```

Reference pages: `kit-sheet/index.html` (model sheet, snapshot at 0.5 / 1.5 / 2.5 s),
`kit-sheet/tests/rig-test.html` (6 s motion test → `kit-sheet/rig-test.mp4`).

---

# Devices — `devices.js` (bible §5)

Load after `rig.js`. Same contract as the rig: build DOM synchronously, then `method(tl, t, …)` adds tweens to the
paused master timeline at **absolute** time `t` and returns the rig. Call methods **in time order** per rig (tickers
and fills track their current value at authoring time). Every rig returns `g` (root `<g>`), `body` (enter/exit layer) and
has `enter(tl,t)`, `exit(tl,t)`, `pulse(tl,t)`; pass `{hidden:true}` to start invisible. `(x,y)` of jars/tags/cards =
**bottom centre**, so anything can sit on a pan at `(px, 0)`. Test sheet: `devices-test/index.html`
(`cd devices-test && npx hyperframes@0.8.133 snapshot -o snapshots --at 0.5,2,4,6,8,10,11.5`).

Helpers: `K.dropIn(tl,node,t,{dur,from})` · `K.liftOff(tl,node,t,{dur,to})` · `K.pulseNode(tl,node,t,k)` ·
`K.fmtIN(n)` (`106700 → "1,06,700"`) · `K.fmtINR(n, prefix="₹", signed)` (`−₹5,000`, `+₹18,000`) ·
`K.faceArt(parent, who, r)` (`ravi gopal meera infotech customer electricity` pictogram) · `K.cartArt(parent)`.

## 1. `K.scaleRig(parent, x, y, s, opts)` — taraazu · origin = base bottom-centre

Local frame (s = 1): beam pivot `(0,−540)`, half-span 380, pan dish top `y = −270` when level, jars up to ~220 tall fit
a pan; totals chips hang under each pan; equation strip at `y = +118` (keep ≥ 100 px of frame under the base).
`opts`: `tint` (`true|"L"|"R"`), `L`/`R` (initial totals), `totals:false`, `equation` (pre-shows the strip), `eqW`, `hidden`.

| Member | Notes |
|---|---|
| `pans.L.g` / `pans.R.g` | content groups, origin = pan top-centre, grow up. Put `jarRig`s left, `claimTag`s / `equityCard` right. Never tween them directly. |
| `pans.X.total` | the pan-total `ticker` · `pans.X.tint` · `pans.X.hang` (level-hanging group) |
| `tilt(tl,t,deg,{dur=.8,ease})` | **+deg = LEFT (assets) pan DOWN**, −deg = right down. Clamped ±6°, smooth. Pans counter-rotate → always level. No idle sway. |
| `settle(tl,t,{dur=.9,hold=1.5})` | power2.inOut to level, **no overshoot**; sets `rig.holdUntil` (+ `rig.holds[]`) = settle end + 1.5 s hold flag |
| `levelFlash(tl,t)` | thin ink level line draws across the pans, then fades |
| `setTotals(tl,t,L,R,{dur})` | counts both totals (Indian grouping); pass `undefined` to skip a side · `pulseTotal(tl,t,"L"/"R"/"both")` |
| `tint(tl,t,side="both",on=true)` | blue (`--dr`) / orange (`--cr`) pan tint drops on / lifts off |
| `labelPan(tl,t,side,lines)` | label chips under a pan: `"Assets"` or `{text,value}` (value → counting sub-total, e.g. Liabilities) |
| `equation(tl,t,"₹88,000 = ₹38,000 + ₹50,000",{plain})` | strip drops on first call, later calls swap text (old lifts off). Left of `=` blue, right orange. `eqPulse(tl,t)` lifts 1.05× & settles |
| `hud(tl,t,on=true,{k=.28,right=48,top=130,dur=.8,text=30,W=1920})` | shrinks the whole rig to the top-right (below the calendar strip); totals become ~30 px chips, labels + equation hide. `hud(…,false)` returns it. `enter/exit` act on the inner layer, HUD on the outer — they never fight |
| `K.scaleRig.mini(parent,x,y,s=0.32)` (= `K.miniScale`) | no totals/labels/equation; thicker strokes; `slot.g` = round pictogram slot above the beam (drop an icon in it); `arrows(tl,t,"upup"\|"downdown"\|"swapL"\|"swapR")` = paper ↑↑ ↓↓ ⇄ ⇄ under the pans; `clearArrows(tl,t)`. Same `tilt/settle/pans`. |

## 2. `K.jarRig(parent, x, y, s, opts)` — asset jar · origin = bottom centre (~160×196 + lid)

`opts`: `label` (text ON the jar, auto-fit), `icon` (Lucide name — beside the label, or the jar's face for `contents:"sticker"`),
`contents` `"coins"|"notes"|"leaves"|"cart"|"sticker"` (cart = equipment jar), `amount` (shows a counting chip), `fill` (0..1,
default .6; cart/sticker 1), `labelHidden`, `w`, `h`, `edge` (amount-chip stripe colour).

| Method | Notes |
|---|---|
| `fill(tl,t,frac)` | contents layers drop in (bottom → top, 2-frame stagger) or lift off |
| `tick(tl,t,from,to,dur=.6)` | amount ticker counts |
| `pulse(tl,t)` | lift & settle (use on "the total pulses") |
| `tieLabel(tl,t)` | ties a `labelHidden` label on (concrete before term) |
| `landSticker(tl,t,{dx,dy,dur})` | the cart/sticker flies in from `(dx,dy)` (jar-local px) in an arc and lands |
| `light(tl,t,{color,hold})` | gold paper ring flash (the "ding" light) |

## 3. `K.claimTag(parent, x, y, s, opts)` — paper tag on a string · origin = bottom centre

`opts`: `face` `"ravi"|"gopal"|"meera"|"infotech"|"customer"|"electricity"`, `amount`, `string:{toX,toY}` (default target, **parent coordinates**), `rot`.
`stringTo(tl,t,x?,y?,{dur})` stroke-dash reveals a twine from the tag's hole to (x,y) (call again for more strings) · `tick(tl,t,from,to,dur)` ·
`light(tl,t)` · `pulse` · `enter/exit`. `art.ticker` = the amount ticker.

## 4. `K.equityCard(parent, x, y, s, opts)` — Meera's tag → card with pockets · origin = bottom centre

`opts`: `pockets` 2|3, `capital` (50000), `profit`, `drawings`, `unnamed:true` (pocket 2 shows `?`). Starts as Meera's face tag; pockets by
name in `pockets.Capital / .Profit / .Drawings` (or index).

| Method | Notes |
|---|---|
| `unfold(tl,t,{dur})` | tag lifts off, card opens from its footprint, pockets drop in one by one · `fold(tl,t)` reverses |
| `slip(tl,t,pocket,amount,{icon,from:[dx,dy],noTotal})` | a paper slip (`−₹5,000`, key/coffee icon…) drops into the pocket; pocket total ticks. In an unnamed pocket the total stays hidden (`?` still shows) |
| `namePocket(tl,t,"Profit",{value})` | the `?` flips (fake scaleX, .35 s) to its name; total counts up inside |
| `addPocket(tl,t,"Drawings")` | third pocket (dashed, negative, coral) — card widens, pockets re-centre |
| `pocketTick(tl,t,pocket,to)` · `light(tl,t,pocket)` | **Capital never moves** — don't tick it |

## 5. `K.whichTwo(parent, {veil:true, x:960, y:150, s:1, prefix:"₹"})` — "which two things changed?" (bible §5.3)

Create it **after** the scene content (the veil must sit on top). `run(tl,t,{slots:2|3, gap:2.0, veil:true, fill:[{label,delta,side:"L"|"R",at?}|{pending:true}]})`:
veil → 30 % (0.2 s) · slots drop in top-centre (dashed) · `gap` s dead still (`tick_tock`) · chips fill (blue left / orange right, ▲/▼ by delta sign) with a
gold ring "ding". Returns the slot groups (array) with timing props **`.tTick`** (start tick_tock), **`.tFill`**, **`.tDing`** (play `ding_yes`; light jars/tags here with
`jar.light(tl, slots.tDing)`), **`.tEnd`**. `fill[i].at` = explicit absolute time (use for cue-driven fills; `gap:0, veil:false` = the pre-filled L3 s06 variant).
`fillSlot(tl,t,i,spec)` fills a slot of the last run later (Meera fills 1, viewer names 2; `{pending:true}` shows a `?`). `clear(tl,t)` lifts slots + chips, veil out.

## 6. `K.stamp(tl, parent, x, y, t, s=1, {rot:-8})` — red ✗ rubber stamp

Lands 1.25 → 1.0, `power3.out`, 0.18 s. **No shake, no settle wobble.** Returns `{g, body, lift(tl,t)}`.
The old stills call `K.stamp(parent,x,y,r,rot)` still works (detected by the first argument; kept as `K.stampStill`).

## 7. `K.imagineCard(parent, x, y, w, h, {rot, hidden})` — hypotheticals

Dashed border + thought-cloud (lightbulb) corner. `area.g` = content group at the card centre (`area.x/y/w/h` = card rect, local) · `enter/exit`.

## 8. `K.pauseMedallion(parent,x,y,s)` · `K.checkpointBanner(parent,x,y,s,n)`

Medallion: saffron disc, cream rim + two paper pause bars. `countdown(tl,t,{dur=3.2})` — ring drains linearly, bars → digits 3·2·1 (one third each).
Banner: red paper ribbon, paper flag, `Checkpoint n`; `unfurl(tl,t)` as an alternative entrance.

## 9. `K.calendarStrip(parent,x,y,s,{highlight:2, days:30, month:"April"})`

Strip is 1822 px wide at s = 1 (centre it at x = 960, y ≈ 70). `tickTo(tl,t,n,{dur, stepped, allowBack})` — **forward only** (warns otherwise; `allowBack` is the L5 rewind
exception). ≤ 3 days = one smooth slide ("a tick"); more (or `stepped:true`) = fast stepped flip, one day per ≥ 2 frames. `setMonth(tl,t,"May")` swaps the small month label. `cur` = current date.

## 10. `K.barPair(parent,x,y,s,{max:100000, refH:380, faces:["ravi","meera","gopal"]})`

Two bars from a kraft baseline: left blue, right orange stack with face badges + counting amounts. `grow(tl,t,L,[R1,R2…],{dur})` (call again to grow further),
`level(tl,t,{hold})` draws the dashed level line at the left bar's height (seeds L3's scale).

## 11. `K.ticker(parent,x,y,s,{value, prefix:"₹", size:44, chip, w, h, edge, anchor, signed, color})`

`to(tl,t,value,dur=.6)` counts (Indian grouping, `onUpdate` text — verified seek-safe both directions) · `set(tl,t,v)` · `pulse` · `.value`.

## 12. Props & report props

`K.tumblerStack(parent,x,y,s,{n:5})` (`dropIn(tl,t,{step})`) · `K.priceTag(parent,x,y,s,{amount,rot})` (kraft tag, `tick`) · `K.gasCylinder(parent,x,y,s)` · `K.cartSticker(parent,x,y,s)`.
`K.filmStrip(parent,x,y,w,h,frames,rot,{resultFrames:2})` — two ruled result frames after the picture frames (`grp.resultFrames[]` = their rects, grp-local).
`K.polaroid(parent,x,y,w,h,rot,{twoColumn:true, date:"30 Apr"})` — Assets (blue) | Liabilities + Equity (orange) ruled columns, date in the white margin (`grp.cols.L/R` = column rects).
Both also accept the options object in the `rot`/`content` slot; all old call signatures are unchanged.

## Notes / gaps

- Lucide icons missing from `icons.js` (`shopping-cart`, `flag`) are drawn locally as paper shapes (`cartArt`, banner flag) — swap when the icon agent adds them.
- Face pictograms on tags are not cast rigs (static busts); Khata/Meera/etc. live in `cast.js`.


---

# Cast (shared) & Props — `cast.js`

Load **after `rig.js`** (any order relative to `devices.js`): `<script src="assets/kit/cast.js"></script>`.
`new_lesson.py` puts it in every new lesson's `index.template` (L01 predates it and does not load it).
Test page / model sheet: `cast-test/index.html` (`npx hyperframes@0.8.133 snapshot -o snapshots --at 0.5,2,4,6` in that folder).

## Cast (shared) — `K.aman / gopal / raju / landlord / cartWala / caFriend (parent, x, y, s, opts)`

Same contract as `K.meera`: `(x, y)` = ground point between the feet, height ≈ 620·s, `opts` = any person option
(`expr`, `aL/aR`, `flip`, `sit`, `lookX/lookY`, `skin`…) and the **same rig object and method set** — `expr blink blinks look
headTilt arm pose shrug wave point hop walkTo lean handAnchor jitter` (see "People" above). They are built by `K.person`
and then *dressed* (hair, checks, vest, cap, props) into the rig's own groups, so the dressing rotates/squashes with the body.

| Rig | Look | Extras on the rig object |
|---|---|---|
| `K.aman` | early 30s · green **checked shirt** (torso + sleeves) · **orange gamcha** on the viewer-left shoulder · short side-parted hair | `gamcha` |
| `K.gopal` | dairy owner · **white kurta + white topi** · round specs · grey moustache · sky-blue placket / cuffs / hem, milk-drop pocket (merchant base, full legs) | `trim` |
| `K.raju` | teen helper (**86 % of `s`**; `scale:false` = adult) · stall **apron** over a cream tee · spiky hair | `tray` (hand-anchor group, stays level), `carry(tl,t)`, `lower(tl,t)`, `trayShow(tl,t,on)`; `tray:false` = no tray |
| `K.landlord` | merchant base · **MUSTARD kurta + grey waistcoat** (cream pyjama) · bald, moustache, no cap · **key ring** in the right hand, hangs straight down whatever the arm does | `keys`, `keyList`, `jingle(tl,t)` (one damped swing), `keysShow(tl,t,on)` |
| `K.cartWala` | merchant base · cream shirt · **navy vest** with pockets · **brick-red cap** · khaki trousers | — |
| `K.caFriend` | woman · **burgundy blazer** over saffron kurta · round specs · bob · gold earrings · fat kraft **file folder** held at the chest | `folder`, `folderShow(tl,t,on)` |

Distinct silhouettes by design: Gopal = white + topi + specs; landlord = mustard + waistcoat, no cap; cart-wala = cream + navy vest + red cap
(never white, never mustard) — so all three can share a frame with Ravi Mama.

**Props that ride a hand stay upright.** `K.holdProp(rig, "L"|"R", propGroup, [restShoulderDeg, restElbowDeg])` counter-rotates a group in
`handAnchor(side)` whenever `rig.arm / pose / wave / point / shrug` move that arm (a tray stays level, keys stay hanging). Use it for your
own hand props: `const p = K.g(m.handAnchor("R"), {}); …draw around (0,0)…; K.holdProp(m, "R", p, [12, 8]);`.

Hair/cap/vest helpers are internal; to dress another person the same way, build with `K.person(parent,x,y,s,{…})` and add layers
with the pattern in `cast.js` (`torsoLayer`, `sleeveLayer`, `headFront`).

## Props — `K.<prop>(parent, x, y, s, opts)` → `{ g, … }`

| Prop | Origin | What it gives you |
|---|---|---|
| `K.samosaCart` | ground centre (≈ 470 × 560 at s=1) | kadhai + stove, samosa pile on a steel tray, bell on a pole, wheels, push handle. `sizzle(tl,t0,t1)` (oil bubbles + steam puffs, stepped 7.5 fps, off outside the span) · `ring(tl,t)` (bell swing + ding arcs) · `moveTo(tl,t,worldX,dur)` (wheels roll) · refs `kadhai samosas pile bell steam puffs bubbles wheels` |
| `K.milkCans` | ground centre between two cans (≈ 200 tall at s=1) | aluminium cans with a sky `milk` medallion. `tip(tl,t,i,deg=70,dur)` pivots on the base corner, away from the other can · `level(tl,t,i)` · `cans[i].{pos,can}` |
| `K.sacks` | ground centre (≈ 250 wide) | potato sack (heaped potatoes + `leaf` sticker) · flour sack (blue band + `sprout` sticker) · yellow oil tin. Refs `potato flour oil` |
| `K.infotechBuilding` | ground centre (≈ 440 × 940 at s=1 + roof; `rows` 4, `cols` 3) | tone-on-tone block (colour = sky darkened; `opts.tone` to override), `INFOTECH` plate (`opts.sign`), roof furniture, lobby door, window row. Windows index **row-major from top-left**. `lightWindow(tl,t,i)` (55 % → full, two steps) · `lightAll(tl,t0,every,order?)` · `darkWindow` · `windowAnchor(i,{clip:true})` → `<g>` at the window's **sill centre**, clipped to the opening (`clip:false` = she can lean out over the facade) · `bustY(s)` = ground y that puts head + shoulders of a person at scale `s` in the window → `K.priya(b.windowAnchor(4), 0, b.bustY(0.38), 0.38)` · `windowPos(i)` world position · `wins[i]` geometry |
| `K.scooter` | ground, middle of the wheelbase (≈ 360 × 330) | side view facing right (`flip:true` mirrors), `color`. `rollTo(tl,t,worldX,dur)` rolls the wheels |
| `K.dawnBand` | **top-left of the area**; full-frame by default (`w` 1920, `h` 1080, `horizon` 777, `bandH` 300, `sky`, `band`, `stars`) | navy sky + stars, paper crescent moon, flat saffron band **hidden behind** a tone-on-tone skyline. `rise(tl,t0,t1)` — two stepped moves with a held beat · `moonOff(tl,t,dur)`. Put it first in the scene (it paints its own sky); pass `s` to use it as a thumbnail |
| `K.cartGhost` | ground centre — **same geometry as `K.stall`** (swap exactly) | dashed chalk outline (awning, posts, counter, wheels; no face / galla). `show(tl,t,v=.55)` · `fill(tl,t,v=.4)` the 40 % ghost fill · `hide(tl,t)` · `opts.ghost:true` starts with the fill on |
| `K.phone` | centre of the handset (190 × 370 at s=1) | dark paper handset, screen off. `show(tl,t,card)` wakes it and drops a card in (`{kind:"CREDITED", amount:"₹15,000", acct:"A/c XX12"}` for `screen:"sms"`; `{type:"upi", kind:"RECEIVED", amount:"₹1,500", from:"Priya"}`; or `fn(group,cx,cy,w,h)` for a custom card) · `hideCard` · `wake` · `buzz(tl,t)` one stepped buzz (pair with `phone_buzz`). `K.smsCard(parent,cx,cy,w,h,{…})` is the bare card |

Notes: `K.medallion` is wrapped so the 19 new Lucide glyphs get a readable default disc colour (`K.ICON_COLORS`); `K.mixColor(a,b,t)` blends two hex colours.
Everything is deterministic; motion that loops (sizzle, bubbles) is bounded to the `[t0,t1]` you pass — no idle wobble.

## Icons added (Lucide, `icons/*.svg` + inlined in `icons.js`)

`landmark milk clock store pause file-text flag flame key school cake map-pin wallet shopping-cart leaf box calendar-check percent
trending-down search mail clipboard-list tag` (+ the earlier set; `house` kept). Bible §5.12 registry: rent `key` · drawings `wallet` ·
home side `map-pin` · bank `landmark` · equipment `shopping-cart` · stock `leaf` · salary `user` · electricity `zap` · interest `percent` ·
advance `calendar-check` · worksheet `file-text`.
