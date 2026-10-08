STATUS: READY  (all props, icons and SFX in; polishing continues — re-read this file before relying on a signature)

# Props 2 — `props2.js` (L8–L14)

Load **after** `devices.js` (and `books.js`):

```html
<script src="assets/kit/icons.js"></script><script src="assets/kit/kit.js"></script><script src="assets/kit/rig.js"></script>
<script src="assets/kit/devices.js"></script><script src="assets/kit/cast.js"></script>
<script src="assets/kit/books.js"></script><script src="assets/kit/props2.js"></script>
```

Same contract as the rest of the kit: build the DOM synchronously, then `method(tl, t, …)` adds tweens to the paused master timeline at **ABSOLUTE** time `t` and returns the rig (chainable).
Every prop: `K.<prop>(parent, x, y, s, opts)` → `{ g, body, enter(tl,t), exit(tl,t), pulse(tl,t) … }`; `{hidden:true}` starts invisible, `{rot}` rotates the whole prop.
Deterministic (no Math.random / Date). Nothing idles — loops/swings are bounded to the span you give. Test sheet: `props2-test/index.html`
(`cd props2-test && ../../with_slot.sh npx --yes hyperframes@0.8.133 snapshot -o snapshots --at …`).

`data-layout-allow-overlap` is already set on stacked text inside props (flip sheets, envelope card). Anything **you** drop into `envelope.area` / on a calendar sheet may need it too (`el.setAttribute("data-layout-allow-overlap","true")`).
Hand-held props take `hold:{rig, side:"R", rest:[20,70]}` instead of a parent: they are built in the person's `handAnchor` and stay upright whatever the arm does (`K.holdProp`; Khata's arms just carry them).

## Props

| Prop | Origin | What it gives you |
|---|---|---|
| `K.napkin(p,x,y,s,{lines:[["Chai","₹ 30"],"Milk",null], w:380, h:300, rot})` | centre | Torn-top/bottom paper napkin with ruled pencil lines. `slideIn(tl,t)` · `write(tl,t,i,{dur})` pencil writes line *i* left→right (stepped; `null` line = squiggle) · `writeAll(tl,t,{gap})` · `strike(tl,t,i)` red pencil strike-through · `rows[i]`. Pair with `pencil_write` / `pencil_scribble`. |
| `K.confetti(p,x,y,s,{n:30, spread:520, rise:340, fall:520, colors})` | burst centre | Paper rectangles, hidden until `burst(tl,t,{dur:1.7})`: fly out, tumble (flip scaleY), fall, fade. 30 fps. |
| `K.envelope(p,x,y,s,{label|icon, w:380, h:250, color, header})` | bottom centre | Cream envelope + wax seal. `drop(tl,t)` falls onto the counter with a squash (`envelope_drop`) · `open(tl,t,{dur,rise})` flap flips up, card slides out · `close(tl,t)`. `card` = the paper card, `area` (group at card centre, `area.rect` local) is where you put a ticker / text. |
| `K.calendarPage(p,x,y,s,{month:"April", day:30, w:300, h:330})` | centre | Tear-off page, red month header, big date. `flip(tl,t,{month,day})` top sheet flips up from its hinge and away (stepped 0.3 s, pair `page_flip`) revealing the next sheet · `circle(tl,t,{color})` hand-drawn ring round the date. |
| `K.dateTile(p,x,y,s,{month:"May", day:5, w:150, h:150, color})` | centre | Small chip ("May 5"). `set(tl,t,month?,day?)` swaps text with a 1.06× pulse. |
| `K.monthTiles(p,x,y,s,{months:36, per:12, width:1700, dashedLast, hidden, markersShown})` | strip centre | One strip of month tiles (J F M …) in groups of 12 with year-marker discs `1 2 3` (`dashedLast:true` → last marker is a dashed `(n)`; use `months:48` for 4 groups). `reveal(tl,t,{from,to,per})` · `year(tl,t,y)` pops a marker · `mark(tl,t,i,color)` / `markRange(tl,t,a,b,{per,color})` gold fill + pulse · `tiles[i]`, `markers[y]`. |
| `K.clipboard(p,x,y,s,{items:[["Tea",12],["Milk",4]], w:300, h:400})` | centre | Wood board + clip + `clipboard-list` sticker. `tick(tl,t,i)` ink check · `count(tl,t,i)` writes the qty. |
| `K.packet(p,x,y,s,{kind:"tea"\|"milk"\|"sugar"})` · `K.packets(p,x,y,s,{kinds,gap:150})` | bottom centre (≈112×150) | Crimped paper packets (tea brown + cup, milk sky + bottle, sugar white + cubes). `packets.dropIn(tl,t,{step,from})` · `fly(tl,t,i,dx,dy,{dur,rot,hide})` (into a jar) · `items[i]`. |
| `K.hangTag(p,x,y,s,{amount:36000, string:110})` | the hook (top of string) | Mustard price tag on a string. `swing(tl,t,{deg:10,dur:1.1})` one damped swing, then still. |
| `K.tissue(p,x,y,s,{text})` | centre (150×150) | Soft cream tissue with scribbles. `flutter(tl,t0,t1,{amp})` stepped wind wobble bounded to the span · `blowTo(tl,t,dx,dy,{rot,dur})`. |
| `K.tissueBox(p,x,y,s,{color})` | bottom centre | Box with a ruffled sheet peeking. `pull(tl,t,{dy,dur})`. |
| `K.windLines(p,x,y,s,{n:3,len:260,dir:1})` | left-centre of the sweep | Three cream paper streaks. `gust(tl,t,{dur:1,dist:700})` (pair `wind_gust`). `dir:-1` sweeps right→left. |
| `K.purse(p,x,y,s,{color,icon:"shopping-bag", hold})` | strap grip (bag hangs ≈ 180 below) | Meera's purse. `swing(tl,t)` one damped sway. |
| `K.magnifier(p,x,y,s,{r:62, hold})` | grip (lens ≈ 130 up-left) | `sweep(tl,t,[[dx,dy],…],{dur,hold})` · `peek(tl,t,{k})` lens pops · `lensAt` local lens centre. |
| `K.bookshelf(p,x,y,s,{tiers:2, w:760, per:7, n:14, icons:[…], style:"covers"\|"spines", shown:false})` | ground centre | Wooden shelf. `icons` → `K.smallBook` covers with Lucide medallions (14 account books); no icons → coloured spines. `put(tl,t,i)` / `putAll(tl,t,{step})` drop books in (use `shown:false`) · `pull(tl,t,i,{dy,k})` lifts a book forward · `push` · `books[i]`, `slots[i]` (shelf-local bottom centres). |
| `K.stallClosing(p,x,y,s,{…K.stall opts, shutter:0..1, steamOff:true})` | ground centre (= `K.stall`) | Wraps `K.stall` (not edited). Returns the stall rig **plus** `down(tl,t,frac=.5,{dur})` rolling shutter comes down over the counter opening · `up(tl,t)` · `sign(tl,t)` hangs a `clock` tag · `shutter`. Kettle steam is hidden. |
| `K.instantCamera(p,x,y,s,{hold,color})` | body centre (300×210) | `shoot(tl,t)` = button + flash + print (`camera_click`, `polaroid_whirr`) · `flash(tl,t)` flat starburst (3 steps, no glow) · `print(tl,t,{dur,rise})` photo slides up out of the top slot · `develop(tl,t,{dur})` grey cover fades off · `photo` (group) · `photo.area` = `{g,x,y,w,h}` photo-local picture rect — put a render / `K.polaroid`-style content in `area.g` (cover sits above it). |
| `K.cinemaDoor(p,x,y,s,{color})` | ground centre (≈ 640×700) | Marquee (`film` medallion, bulbs), double doors, steps, two brass stanchions + red rope in two halves. `lightUp(tl,t,{step})` bulbs on · `open(tl,t)` doors swing (saffron interior) · `unhook(tl,t,{side:"R"\|"both"})` rope half drops to hang from its post · `hook(tl,t)`. Default façade is navy — put it on a coral/saffron/teal scene, not night. |
| `K.usherCap(p,x,y,s)` | bottom centre of the cap | Red pillbox with gold band. On Khata: `K.usherCap(k.body, 0, -372, 0.9)`. `pop(tl,t)` drops on with a squash · `tip(tl,t)` tilt & back. |
| `K.paperTorch(p,x,y,s,{hold:{rig:k,side:"R"}, rot})` | grip (points up) | Brass paper torch + flat translucent beam wedge (no glow). `on(tl,t)` · `off(tl,t)` · `aim(tl,t,deg)`. Khata's arms carry it as-is (rotation follows the arm). |
| `K.ticketStub(p,x,y,s,{color,no:"07"})` | centre (280×124) | Ticket + perforated stub. `tear(tl,t,{dur,drop})` stub swings off its perforation (`ticket_tear`); `drop:true` lets it fall and fade. `main`, `stub`. |
| `K.claimString(p,{from:[x,y]\|{rig,side}, to:[x,y]\|[[x,y],…], sag, color, w})` | — (parent coords) | Twine strokes from a hand/point to props. `draw(tl,t,{dur,stagger})` stroke-dash reveal · `undraw(tl,t)` · `paths[]`. Rig hands use the **build pose**; for a moving hand pass explicit points. |
| `K.coinStream(p,{path:[[x,y],…], n:10, r:18, spread:14, seed})` | — | Paper coins flow along a smoothed path (reverse the path for "out"). `run(tl,t,{dur:1.2, stagger:.08, travel})`; coins are invisible outside their run. |
| `K.riverBridge(p,x,y,s,{w:1500, gap:560, riverH:220, planks:9, hidePlanks})` | deck centre, top surface | Banks + river + arched plank bridge with rope rail. `lay(tl,t,{step})` planks drop in (use `hidePlanks:true`) · `deckY(xLocal)` surface y (local) to stand a coin on. |
| `K.coinToken(p,x,y,s,{r:80})` | centre | Gold ₹ coin with Khata's eyes. `look(tl,t,dx,dy)` · `blink` · `expr(tl,t,"happy"\|"worried"\|"wow")` · `hop(tl,t,{height})` · `roll(tl,t,dx,dur)` plate rolls, face stays upright · `moveTo(tl,t,dx,dy,dur)` (offsets from build position). |
| `K.cycleLoop(p,x,y,s,{n:7, rx:700, ry:300, icons:[…], badgeR:50, undrawn:true})` | centre | Wooden loop track with clockwise chevrons + station badges (Lucide medallion, or a number). `draw(tl,t,{dur})` track draws round · `show(tl,t,i)` / `showAll(tl,t,{step})` · `light(tl,t,i)` gold ring · `token(tl,t,from,to,{dur,hide})` gold dot travels the loop between stations · `stations[i]={g,x,y}` · `at(i)` world position. `undrawn:true` = track + badges start hidden. |
| `K.officeEvent(p,x,y,s,{tone,tumblers:5})` | ground centre (≈ 780×520) | Tablecloth table + tumbler tray + two tone-on-tone office silhouettes holding tumblers. `cheers(tl,t)` they lean in, tumblers lift. |
| `K.goldTick(p,x,y,s,{r:58})` | centre | Gold sticker seal with an ink check. `stick(tl,t)` slaps on: 1.3× → 1, −12° → −6°, `power3.out`, 0.18 s. |
| `K.bank(p,x,y,s,{tone,roof})` | ground centre (≈ 520×640) | The Bank: columns for legs, pediment roof with `landmark` medallion, dot eyes + brows in the frieze, door mouth. `expr(tl,t,"happy"\|"wow"\|"frown")` · `look(tl,t,dx,dy)` · `blink` · `hop(tl,t)` · `hand` = group at the right edge to hold a `K.passbook`. |
| `K.passbook(p,x,y,s,{acct:"A/c XX12", rows:[["Cr","₹5,000"],…]})` | centre (190×250) | Navy cover + `landmark`. `open(tl,t)` cover swings away to the first page · `close(tl,t)` · `entry(tl,t,i)` writes row *i* (a `[null,null]` row writes a squiggle). |

## Icons added to `icons.js` (+ `icons/*.svg`, Lucide)

`file-down hourglass key-round pencil ticket umbrella` — all other requested icons were already inlined (`landmark milk clock store pause file-text flag flame school cake mail clipboard-list trending-down tag search shopping-bag check calendar-check camera`). Existing entries are unchanged.

## SFX added (`audio/sfx/*.mp3`, normalised copies in `audio/sfx-norm/*.wav` at −24 LUFS)

`wind_gust pencil_write pencil_scribble page_flurry pen_tick weight_clunk freeze_stop envelope_drop gauge_tick card_deal ticket_tear coin_pour camera_click` (`page_flip` already existed).
`pen_tick` / `gauge_tick` are the minimum ElevenLabs length (0.5 s) — `atrim` them in the cue.
`envelope_drop` is quiet at source (−49 LUFS, gain capped at +20 dB): give its cue `vol ≈ 1.3`.
