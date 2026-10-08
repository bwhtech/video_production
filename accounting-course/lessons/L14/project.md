# L14 · Where Did the Money Go? (course finale, Checkpoint 5) — build log

## 2026-10-08 — Hindi (Hinglish) first build
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, `--lang hi`. **English NOT generated, NOT rendered** (Hindi-first).
- `vo-segments.hi.json`: 26 segments, same ids / scene numbers / gap_after as `vo-segments.json` (no gap raised: the checkpoint gaps were already 1.6 / 3.2 s). Source of truth for the Hinglish text:
  `lessons/L14/.work/mk_hi.py` (writes the json). Devanagari sentences, accounting terms in Latin (journal, ledger, debit, credit, profit, equity, drawings, …), names + ₹ amounts identical, numbers spoken as Hindi words.
- **TTS credits: 26 segments generated once, 0 retakes.** (The first batch hit ElevenLabs `concurrent_limit_exceeded` 429s on 12 segments because the other builders were saturating the account — those calls produced nothing; a retry runner with back-off, `.work/tts_retry.py`, re-ran only the missing ones.)
- Anchors: `anchors.hi.json` (245 anchors, 0 problems from `tools/hi_anchors.py`). Every anchor name is the **English word of that segment's English text** (nth occurrence) and every scene cue / sfx word / pause / hush uses `@name`, so the English build resolves with no scene changes.
  `.work/validate_en.py` checks that every `cue(...)`, sfx `word`, pause and hush anchor exists in the English text with the required occurrence **and** has a Hindi marker. Pause markers `{p@name}` are on a sentence-final word (28 pause cuts, all in silence).
  Gotcha: a `{p@x}` marker only creates `@x|p` — `cue(seg, "@x")` needs its own plain `{@x}` marker (page_error "cue not found" otherwise; `check` reports it, the snapshot just silently stops animating).
- Pipeline: `python3 build.py --lang=hi` → `lessons/L14-hi/` → `../shared/with_slot.sh npx --yes hyperframes@0.8.133 check` (0 errors) → render under the lock (6 workers) → `python3 build.py --lang=hi --mix --mux`.
  Handy: `.work/chk.sh` (build + check, prints errors only), `.work/times.py seg:@anchor …` (absolute anchor times), `.work/show.py seg` (words + anchors).
- Runtime: **452.0 s (7:32)** — s01 25.5 · s01t 4.6 · s02 29.0 · s03 39.9 · s04 22.9 · s05 86.8 · s06 39.0 · s07 59.6 · s08 16.1 · s09 76.0 · s10 40.6 · s11 12.0.
- Music: day_street ambience (s01) · intro_sting · **M5 bed `music/m5_main.mp3`** s02 → s09 (ducked, looped) · `night.mp3` + `night_street` ambience carry s10 into the outro · outro on the end card.
  Two silent thinking pauses get a bed hush (`music.json` `hush`): s05f solo countdown, s09a checkpoint pause.
- Scenes: `assets/scenes/s01…s11.js` (+ `.sfx.json`); lesson-local helpers in `assets/scenes/_l14.js` (`window.L14`, loaded after `_shared.js` in `index.template`): node / hide / drop / lift / card / chip / tick / ring / filmFrame / spark.

## Scene notes
- **s01** cold open: Meera's ₹50,700 (galla) and ₹11,000 (Bank card) chips merge into one ₹61,700 chip, she fans the notes (sparkle); Khata hops in with the P&L film frame (trending-up → `Net profit ₹24,700`), a "?" pops between the two numbers. Exit: she snaps the fan shut, a red paper band grows to the full frame → s01t (plate = `C.red`).
- **s01t** L7's title sting shape (`Lesson 14 · Where Did the Money Go?`, series name "Hisaab Kitaab"); right page = `<use #s02-first>`. Title text stays English as in the other Hindi builds.
- **s02** three answer cards on teal (Equity ₹71,700 vs Cash+Bank ₹61,700 + ✗ stamp · four current assets · film frame ₹24,700 into the Equity box). Meera + Khata react in the corners.
- **s03** cash vessel (galla + the kit Bank character on one kraft tray), calendar strip ticks 1 → 2 → 30, `K.coinStream` bursts for each source (Meera, Ravi Mama, the cart out, the stall bundle with the `≈` mark, 3,000 back, 3,000 home); ticker holds ≥ 0.6 s between steps; ends split galla ₹50,700 + bank ₹11,000.
- **s04** coral. Pile ₹61,700 with the two source streams (`₹50,000` / `₹30,000`) staying lit, face tags clip on, IOU slip ₹27,000; `galla = film frame` gets the red ✗ stamp; then Cash | Profit side by side, the 9-frame film strip lights frame by frame.
- **s05** `K.riverBridge` (hidden kit planks; my own 244 px plank cards with icon + amount + paper-strip ▲/▼ on a navy disc), `K.coinToken` + a walking ticker 24,700 → 25,700 → 24,700 → 18,700 → 22,700 → 23,700. Supplies plank shows three icon rows (cart / hand-coins / leaf = bought / paid / used, no English words) + Gopal's ₹3,000 tag.
  Meera's two picks (↓ then ↑) light a ring on the chosen badge; plank 5 is the viewer's (`आप` chip, 3.2 s `K.pauseMedallion` countdown, still otherwise).
- **s06** `K.cycleLoop` with seven station cards drawn on top of the numbered badges; coin token lights them on the VO words; "Record. Sort. Summarise." chips drop in the loop centre.
- **s07** May calendar page + three date tiles; each date has its own mini-scale tile (T21: Advance tag swapped for a Sales slip on the same right pan + the four-pattern glyph row with the fourth lit; T22: coins leave AND the payable tag lifts, both pans down, May film strip stays empty, Khata wiggles; T23: Infotech jar → Bank jar swap on the left, UPI phone).
- **s08** three tiles (galla / film strip / bridge + three icons).
- **s09** Aman + cart → his ₹54,000 | ₹54,000 card → the full 14-row `K.trialSheet` (8 Dr + 6 Cr, scale 0.96 so the text stays ≥ 34 px). Pause + worksheet medallions sit ABOVE the sheet (never on a row); the sheet is dead still for the whole 3.2 s hold. Then the five P&L rows fly into a 9-frame `K.filmStrip` (icons + counting amounts, Gross / Net in the two ruled frames), the rest become the two-column `K.polaroid` rows (Cart & fryer 18,000 − 500 = 17,500 inline; Net-profit frame glides into the equity line); the mini scale settles level + sparkle ("last balance"); Aman cheers.
- **s10** L1's night shot rhymed (copied geometry): Meera on the crate, galla on her knees, Khata beside her opens on "हाँ।"; film strip (₹24,700) and polaroid (30 Apr, ₹1,06,700) lie ON the pages; neighbours nod; calendar 30 Apr → 1 May (`tickTo(…,{allowBack:true})`); the camera pushes 1.00 → 1.07; Khata hops toward the lens and a red cover fills the frame.
- **s11** the red cover swings open onto the violet end card: wordmark, "कोर्स पूरा!" card (saffron header) with the five skill medallions + gold ticks (`K.goldTick`) + the `file-text` worksheet medallion, two blank end-screen panels, Khata waving. Last 3 s completely still. No "Up next".

## Hindi on-screen swaps
`Course complete` → `कोर्स पूरा!` (s11) · plank-5 "You" chip → `आप` (s05) · plank 2 `Bought/Paid/Used` → icons (no words). Everything else is account names / numbers / one-word terms (Cash, Profit, Equity, Stock…) kept in English by convention.

## Kit gaps / workarounds
- `K.filmStrip` always paints its frame icons up front; to fill a frame later pass `[null × 7]` and overlay your own icon + ticker (done in s09).
- `K.polaroid` header words are white on orange (3.1:1) → the one `npm run check` contrast warning in s10 (kit object, same in other lessons).
- `K.riverBridge` rope rails + posts cannot be hidden; they cross behind the token's ticker in s05 (acceptable).
- `K.trialSheet` is 1552 wide — at the ≥ 34 px floor it needs ~0.96 scale, so nothing else fits beside it; P&L/Balance Sheet pieces appear above/below it (s09).
- `K.calendarStrip.tickTo` is forward-only → s10 uses `allowBack` for 30 Apr → 1 May (a stepped flip through 1–30).
- `gsap` `x/y/scale` on a rig root that has a `transform` attribute (ticker `.g`, `K.aman().g`) misplaces it — wrap in `L.node()` and tween the wrapper.
- ElevenLabs concurrency: with 7 builders the account limit (3 concurrent) is routinely hit; `with_slot.sh` alone does not prevent it — the TTS runner needs retry/back-off.
- **Shared scratchpad collision:** all builders get the same scratchpad dir; files like `run_tts.py`, `tts.log`, `mk_hi.py` were overwritten by other agents (one of my runs executed another lesson's script — cached files, so harmless). L14 keeps its helpers under `lessons/L14/.work/`.

## Open nits
- English not generated; `anchors`/scenes are English-ready (see validate script) but the English build needs TTS + render.
- Pause marker `@bridges|p` / `@box|p` etc. exist only as pause keys (no plain cue) — fine for Hindi, English resolves them by word.
- `pop_up` / `pop_down` SFX (storyboard) not generated — plain `pop` is used for ▲/▼ picks.
- s02 / s08 cards are a little sparse (lots of empty space around three cards); s05 plank cards are small (244 px) but all text ≥ 34 px.

## Render (Hindi)
- `L14-hi/renders` → symlink to the external SSD. Rendered under the lock, 6 workers (≈ 8 min capture + 2 min encode), then `python3 build.py --lang=hi --mux`:
  `renders/L14-final.hi.mp4` (452.03 s = 7:32, video + audio start_time both 0.000, integrated −14.9 LUFS) and `renders/L14-review-720p.hi.mp4`.
- `build.py` got the L03 list-hush patch (the scaffold lacked it; L07 has it) so `music.json` `hush` can be a list.
- `npm run check`: 0 errors; 1 contrast warning (kit polaroid header, white on orange, in s10) + the usual overlapping-audio-track lint warnings (the final audio is mixed offline).
