# L03 · The Scale That Never Tips (Checkpoint 1) — build log

## 2026-10-06 — v1 (English)
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, 22 VO segments (`vo-segments.json`, `pauses.json` from the course plan).
  "taraazu" is spoken correctly with the verbatim text (Scribe re-transcribes it as "Tarazu") — no respelling needed.
- Pipeline: `python3 build.py` → `npm run check` (0 errors) → `npx hyperframes@0.8.133 render -o renders/video.en.mp4` →
  `python3 build.py --mix --mux` → `renders/L03-final.en.mp4` (+ `renders/L03-review-720p.en.mp4`).
- Runtime 6:36.7 (scenes: s01 20.4 · s01t 4.6 · s02 36.2 · s03 49.3 · s04 56.1 · s05 25.9 · s06 42.1 · s07 35.7 · s08 12.3 · s09 24.9 · s10 66.2 · s11 11.1 · s12 12.0).
- Music: day_street ambience under the cold open, `intro_sting` under the title, M1 bed (`music/main.mp3`) s02 → s11, `outro` on the end card.
  The bed is dipped by a hush during the two silent thinking pauses (s06a countdown, s10a checkpoint pause) — see "build.py patch".
- Scenes: `assets/scenes/s01…s12.js` (+ `.sfx.json`). **Lesson-local helper kit `window.L3` lives at the top of `s01.js`**
  (node/hide/drop/lift/card/stage/cal, `L3.jar`/`L3.tag` slot helpers, `L3.BIG`/`BIG3` scale placement, `L3.allow`);
  `L3.hudScale`, `L3.plainTag` live in `s07.js`; `L3.cover` ("4" ledger cover) in `s11.js` (also used by `s12`).

## Scene notes (what is on screen, deviations from the storyboard)
- **s01** cold open: cart props drop in on "stove / kettles / stack of glasses"; ₹36,000 price tag swings once; Meera counts a bundle into the
  cart-wala's hand in the 1.2 s gap while the galla ticker runs 80,000 → 44,000; `?` on "lose"; galla snaps shut → clasp rush → s01t (own seam).
- **s01t** title sting (L1's shape, two-line plate "The Scale / That Never Tips"); right page = `<use #s02-first>`; s02 hides initial states by DOM attribute.
- **s02** L2's three cards: cans rise into the Stock jar (Asset chip), Gopal's tag hangs off the card (Liability chip); scooter rolls across the dashed line to the `map-pin`
  (and a `store` medallion fills card 2 — "the stall is its own person"); card 3 `₹?` counts to ₹50,000.
- **s03** the taraazu is born (hero size, no device): bar-pair callback → scale drops in with one soft settle; T1 both pans grow at the same moment (no tilt), `Level.`;
  T2 shows the dip: left grows (beam tilts 3.5°), Ravi's tag lands, beam settles (≥ 1.5 s hold), equation strip `80,000 = 30,000 + 50,000`.
- **s04** `K.whichTwo` born: slots drop on "Which two things changed?", 2.0 s dead still (`tick_tock`), chips fill on the VO words, the cart sticker lands in the
  unlabelled jar and `Equipment` ties on only then; scale never moves. ✗ stamp (Khata arm) on the coral expense card; tea-leaf pinch puffs away; kettle steams;
  scuff sticker on the wheel; kettle steam puff fills the frame → s05 (own seam-in: cream cover fades).
- **s05** faded: Meera walks in, a `Stock +6,000` chip appears in her hand and she reaches up and sets it in **slot 1** herself; slot 2 shows `?`
  through the 2.4 s hold; `Cash −6,000` fills it, ding. (Brief said "Meera fills slot 2"; the storyboard/VO — "Meera's got the first one. Stock goes up…" — is followed.)
- **s06** solo: slots pre-filled (`gap:0, veil:false`), both pan totals become `?` chips (they hang off the pans, so they tilt with them), equation `? = ? + 50,000`,
  3.2 s countdown ring (`pauseMedallion`), reveal: cans/stickers fly to the Stock jar, left total counts to 88,000, beam tilts 5° and holds, Gopal's tag lands, level;
  the scale shrinks into the corner HUD (kit `hud(true)`).
- **s07** dual aspect (tag → coin → jar, `Dual aspect` chip), four mini scales with arrow pairs; mini 4 = one plain tag lifted off, a saffron one lands; Khata taps the 4th's beam
  (no on-screen "May"); one level line flashes across all four minis + the HUD.
- **s08** recap: three tiles (scale + `Assets` / `Liabilities + Equity`, the two filled slots, four minis), lit one by one, others rest at 70 %.
- **s09** Your Turn: card 3 sits in the dashed imagine card; Khata's `?` emote per question; calendar-check medallion on "Answers next lesson".
- **s10** Checkpoint 1: `checkpointBanner`, Aman waves, samosa cart sizzles, four rows (picture card + two device slots), Aman's scale at the right;
  `pauseMedallion` + veil 30 % + worksheet card, 3-2-1 over the 3.2 s hold (music hush); reveal row by row (dim previous rows to 70 %), chips ≥ 34 px,
  equation strip text 60 px (≈ 36 px on screen); Aman's scale shrinks to the HUD corner and its totals count to 88,000; calendar ticks 3 → 5.
- **s11** rent day: ₹5,000 note → `key` medallion; slot 1 `Cash −5,000`, slot 2 `?`; the corner scale glides to centre and freezes at 3° tilt (left lighter); Meera steps clear
  (faces never covered); "4" ledger cover slams shut.  **s12** end card: cover swings open → "Up next · Lesson 4 · Making Money", two end-screen panels, Khata waves.

## SFX
- Library only except four new ElevenLabs files generated ONCE into `lessons/shared/audio/sfx/`: `scale_settle` (0.8 s), `checkpoint_sting` (1.8 s), `fryer_sizzle` (1.5 s)
  — `scale_creak` already existed (another builder generated it). tick_tock is cut to 2.0 s (device gap) / 3.0 s (countdown) with `dur`.

## build.py patch (L03 only)
- `music.json` `hush` may now be a **list**, each entry with optional `dur` (default 1.6 s) and `depth` (default 0.85). Used for the s06a and s10a silent pauses.

## Kit notes / workarounds (shared kit untouched)
- **`scaleRig.hud(…, false)` does not return the scale** after a *static* `hud(true)` (the glide runs off-frame). s11 therefore keeps a static HUD twin + a hidden full-size twin
  and glides the full-size one in with plain `x/y/scale` + `transformOrigin:"0 0"` (explicit numbers from the kit's HUD formula). hud(true) animated inside a visible scene (s06, s10) is fine.
- Layout lint: `K.whichTwo` chips put a 34 px name above a 46 px amount, which `content_overlap` flags as an error → every device/chip text is tagged
  `data-layout-allow-overlap` via `L3.allow(root)` (also the two-line title plate in s01t).
- `K.tumblerStack({hidden:true})` hides its whole body, so its `dropIn()` never shows → s01 hides the items itself.
- `K.milkCans`/`K.stall`/`K.samosaCart` roots carry a `transform` attribute — tweened only through a wrapper node (`L3.node`) or their own refs.
- `K.claimTag` only knows six pictogram faces → Aman / Bank loan / Sharma Kirana tags are local (`tagX` in s10); mini scales' plain tags are `L3.plainTag`.
- `claimTag.stringTo` to Gopal's hand was dropped in s06 (the 600 px string would cross Meera's face).

## Known nits
- Numbers inside jars and on tags (≈ 25–30 px on screen at the 1.1× scale) are below the 34 px floor; the pan totals (≥ 46 px), device chips (46 px), equation strips (≥ 46 px) and Aman rows (34/46 px) meet it.
- Aman's own pan totals are ≈ 27 px (scale at 0.6×); the strip under it carries the 36 px reading.
- s07 opens with a ~3.5 s stretch of lightbulb + HUD only (the VO is the "big idea" line).
- Contrast lint (`2.62:1`) fires for the April 26–30 calendar numerals under the s03 → s04 torn-paper wipe at 110.2 s (warning only).
- Known pitfall for later lessons: never leave an `arm()` relax on the same timestamp as another `arm()` on that side (the earlier pose wins).

## 2026-10-06 — Hindi (Hinglish)
- `vo-segments.hi.json` (22 segs, same ids/scenes/gaps as EN incl. the extended s04b), Devanagari + English accounting terms; "तराज़ू" (matches L2 Hindi) for the balance scale throughout; catchphrase "कौन सी दो चीज़ें बदलीं?" said identically in s04a / s05a / s10a. Names: मीरा, गोपाल Dairy, रवि मामा, अमन, शर्मा किराना.
- `assets/vo-hi/` (ElevenLabs eleven_v4, `--lang hi`), `anchors.hi.json` via `tools/hi_anchors.py` (166 anchors; 0 problems; every scene/sfx/pause anchor mapped).
  Pause markers all on sentence-final words; `@later` (s10a) and `@chai` (s04d) needed both a cue and a `|p` marker.
- Word-order tweaks for Hindi SOV: s01b `@lose` before `@rupees#2` (clasp rush still fires on the final "रुपये"), s05a `@got` on the first word after the 2.0 s device pause,
  s04b `@has` (sticker flight) on "पास", s06b `{@stock}{@left}` share one word + `{p@left}` on the sentence end.
- Hush entries in music.json use plain English words ("now"#2, "description") → Hindi build falls back to proportional position (both are near the end of their takes).
- `python3 build.py --lang=hi` → `lessons/L03-hi/` 441.6 s (7:21, +10 % vs EN 401.5 s); 23 pause cuts all in silence. `npm run check`: 0 errors.
- No label swaps needed: on-screen text is English accounting terms in both languages (same as L01); series wordmark switches to "Hisaab Kitaab" via `TL.lang`.
- Final: `lessons/L03-hi/renders/L03-final.hi.mp4` + `L03-review-720p.hi.mp4`.
- Render: `--workers 6` under the render lock; renders/ is a symlink to the external SSD (kept). Mixed with the patched build.py (SFX low-pass/duck). start_time 0.000 on both streams (final + 720p).
- Nit: s09 `@does` (Khata's `?`) lands on Q2 in Hindi (EN fires it on the first "does" of Q1); Hindi hush entries are proportional-position.
