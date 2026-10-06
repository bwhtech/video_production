# L05 · Profit Is Not Cash (Checkpoint 2) — build log

## 2026-10-06 — v1 (English)
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, 28 VO segments (`vo-segments.json`, `pauses.json`, cached in `assets/vo/`; TTS not re-run).
- Pipeline: `python3 build.py` → `npm run check` (0 errors) → `npx hyperframes@0.8.133 render -o renders/video.en.mp4 --workers 3` (under the shared render lock) →
  `python3 build.py --mix --mux` → `renders/L05-final.en.mp4` (+ `renders/L05-review-720p.en.mp4`).
- Runtime 6:47.9 (scenes: s01 27.1 · s01t 4.6 · s02 24.3 · s03 29.5 · s04 15.7 · s05 50.2 · s06 36.9 · s07 36.5 · s08 28.0 · s09 37.2 · s10 10.5 · s11 18.5 · s12 64.5 · s13 12.4 · s14 12.0).
  `scenes.json`: cold open lead 1.2 s (black fade-in), every other scene 0.5 s.
- Music (`music.json`): `day_street` ambience under the cold open, `intro_sting` under the title, **M2 bed `music/m2_main.mp3`** s02 → s13 (ducked, looped), `outro` on the end card.
  Hush list (5 dips, `depth` 0.7–0.85): s05c still-needle hold (4.3 s), s06b + s07b 2.0 s device gaps, s08a 3.2 s countdown, s12b checkpoint pause.
- `build.py` patch (as L03): `music.json` `hush` may be a list with per-entry `dur` / `depth`.
- `index.template` patch: every scene build is wrapped in try/catch; errors are collected and re-thrown AFTER the master timeline is registered, so one broken
  scene (parallel authors) no longer blanks the lesson but `hyperframes check` still fails (`page_error: SCENE BUILD ERRORS — sNN: …`).

## Status
- All 15 scenes + `.sfx.json` built; `python3 build.py` OK; `npm run check` 0 errors; dense snapshots read and fixed (`snapshots/<scene>/contact-sheet*.jpg`; latest per-scene passes: f01, r6, r7, r8, r9, r10, r12, r13, f02, t1).
- **Render NOT done** (coordinator paused English renders in favour of Hindi): run, under the render lock, `npx hyperframes@0.8.133 render -o renders/video.en.mp4 --workers 3`, then
  `python3 build.py --mix --mux` (→ `renders/L05-final.en.mp4`), a 720p review copy, and check both streams `start_time = 0`. A first attempt reached 63 % before being stopped (render time ≈ 11–12 min).

## Structure
- `assets/scenes/s01.js` hosts **`window.L5`** (the lesson-local helper kit; scene files load in order):
  `node/hide/stage/cal/drop/lift/allow/card/chip/push/layers/zoom/fly/coinHop/tumblerRow/cover` · **`L5.gauge`** (animatable Profit/Cash gauge — see below) ·
  **`L5.strip`** (the top-left gauge strip, readings by stage) · **`L5.hud`** (the Scale HUD, top-right, `stage` 0–5 = after T7…T12, `H.add(tl,t,"bank"|"inf"|"adv")`) · **`L5.bank`** (friendly Bank building).
  `s11.js` hosts `window.L5C` (Aman / walls helpers) used by s12.
- Scenes: s01 cold open (Priya's tab → first bill, galla doesn't move, clasp rush) · s01t title (L4 shape, two-line plate "Profit Is / Not Cash") · s02 L4's answers (3 cards, Profit pocket flies up) ·
  s03 two needles (Khata pins the gauges; coin streams; dashed link snaps; calendar rewinds 16 → 15) · s04 T8 deposit (Bank, `=` tags, phone plant; door → bill slip → cream) ·
  s05 T9 worked (`whichTwo`, Sales slip → HUD Profit pocket, Infotech jar flies into the HUD, Profit needle jumps, Cash needle still + 1.5 s hold; accrual strip two rows, tick hops, `Accrual` chip) ·
  s06 T10 faded + ✗ (`Expense` chip stamped, Gopal tag 8,000 → 3,000, only Cash needle moves, `Payable` mirrors `Receivable`) ·
  s07 T11 SECOND faded + ✗ (slip hovers over the HUD Profit pocket → stamped → `Advance from customer` tag → only Cash moves) ·
  s08 T12 SOLO (UPI chime, coins to the Bank, `?` flags + 3.2 s pauseMedallion 3-2-1, reveal; no remaining balance shown) ·
  s09 five-slip strip starting at T8 (Profit dot under slip 2 only, Cash dots under 3 · 4 · 5), `Cash basis` greyed vs `Accrual basis` + `Accrual ✓` ·
  s10 recap (three icon-only tiles) · s11 Your Turn (3 picture cards) · s12 Checkpoint 2 (banner, Aman + cart, five icon+₹ rows, veil + pauseMedallion, row-by-row reveal, `Profit ₹8,500`) ·
  s13 tease (night, phone `CREDITED ₹15,000`, "6" cover slams) · s14 end card ("6" cover swings open → "Up next · Lesson 6 · Debit & Credit Are Just Left & Right").
- Hand-authored seams: s01 → s01t (clasp rush), s01t → s02 (cover opens onto s02's first frame), s04 → s05 (Bank door → bill slip grows → cream fade), s11 → s12 (cards slide aside, cart rolls in),
  s12 → s13 (night-navy wipe), s13 → s14 ("6" cover slam → swing open). Everything else: default torn-paper wipe.

## The gauge (kit has none)
`L5.gauge(K,parent,x,y,s,{label,icon,band,max,value,sub})` — half-dial, needle group drawn pointing up and rotated about the hub (`rotation` + `svgOrigin "0 0"`: −90 = empty, +90 = full),
ticker chip under it, optional galla/bank sub-chips, `=` tag, gold flash ring. `read(tl,t,value,{dur})` swings once (power3.out) with ONE small settle (+3.2°, then back) while the ticker counts; the needle is never
touched at any other time (no idle flutter). Profit max 25,000, Cash max 60,000 (Cash = galla + bank). `gauge.settleT` = the settle time (used for the `needle_tick` SFX offsets).

## Kit notes / workarounds (shared kit untouched)
- GSAP quirk (L4 notes): never one tween with x/y AND scale+svgOrigin → the HUD is built inside two nested layers (`L5.hud`, `L5.layers/zoom`) and put straight into its HUD state with `tl.set` at 0;
  cameras are scale-only tweens about a point (`L5.push`). `scaleRig.hud()` is not used.
- `K.equityCard` unfolds at t = 0 inside the HUD (`card.unfold(tl, 0, {dur: 0.05})`) so every scene starts with Capital | Profit already open; HUD pans re-lay out (x tweens on slot wrappers) when a jar/tag is added.
- `K.claimTag` only knows six faces — the Advance tag in s07 is a local tag (customer face + calendar-check + `May 5`); Infotech jar = `K.jarRig` + a `faceArt` sticker.
- `K.whichTwo` is used as in L3/L4 (veil above everything, slots top-centre `y=190`, 2.0 s gap, cue-driven fills); `L5.allow(root)` tags device text `data-layout-allow-overlap`.
- `K.phone` (screen sms) is shrunk to hand size for the s04 plant; `holdProp` keeps it upright.
- s10/s12 pause medallion sits over the (empty) answer boxes instead of the exact frame centre so no row amount is covered.

## SFX
- New (generated once, ElevenLabs, `lessons/shared/audio/sfx/`): `needle_tick` (0.6 s), `upi_chime` (1.4 s), `rewind_whoosh` (0.9 s). All other cues from the existing library (gain-matched to −24 LUFS by `build.py --mix`).

## Known nits
- HUD pan contents (jars / tags / equity-card pockets) and the gauge-strip sub-chips are pictogram-sized by design (≈ 25 px numbers); the HUD pan totals (30 px), strip tickers (~33 px), slot chips (≥ 34 px) and all worksheet / card numbers meet the floor.
- s08 is crowded on the left (Infotech building next to the gauge strip); s10 tiles are half empty by design (icon-only).
- s13's big `CREDITED` card covers the stall (the "screen fills the frame" beat is simplified to a card flying out of the phone).
- Seams into s09 and s10 are default wipes (the gauge → tile fold is not hand-authored).

## 2026-10-06 — Hindi (Hinglish)
- `vo-segments.hi.json` (28 segments, same ids / scenes / gaps as EN — no gap raised), `assets/vo-hi/` (eleven_v4, Monika, `--lang hi`), `anchors.hi.json` (240 anchors, 0 problems from `tools/hi_anchors.py`; no alias file needed).
- Catchphrase + recurring phrases follow L04: "कौन-सी दो चीज़ें बदलीं?", "आपकी बारी। तीन छोटे सवाल।", "जवाब अगले lesson की शुरुआत में।"; "Checkpoint दो", "अब video को pause कीजिए" (L02).
- Anchor gotchas: EN `@meera` in s02 is the word "Meera" in "It belongs to Meera." (the pocket-flies-out beat), NOT "Meera's profit" → the Hindi marker sits on the final "मीरा का है"; s07b `@meera#2` / `@yet#2` follow the second occurrence; s12c `@cash#3/#4`, `@profit#2..#4`, `@both#2` map to the Hindi occurrences by count; pause markers all on sentence-final words
  (`{p@thousand#2}` in s06c/s09b, `{p@it}`, `{p@moves}` …). `music.json` hush on `@cash` / `@moves` resolve through the same markers; the s12b hush uses the literal word `five` nth 2 → no Hindi match → falls back to the proportional English position (fine, the dip sits on the last words before the 3.2 s pause).
- Two small word-order inversions kept (s11 "गोपाल को / पैसे चुकाना", "UPI payment के बाद") — cues are <0.5 s apart.
- No label swaps needed: on-screen text is numerals, ₹ and English accounting terms; series name already swaps (`SERIES_NAME()` → "Hisaab Kitaab"). The end-card "Up next · Lesson 6 · Debit & Credit Are Just Left & Right" stays English.
- Build: `python3 build.py --lang=hi` → `lessons/L05-hi/` (453.65 s = 7:33.6, +11.6 % vs EN 6:47.9), `validate_cuts` 20/20 in silence, `npm run check` 0 errors; snapshots `L05-hi/snapshots/hi1/`.
- Render: `renders/` of `L05-hi` is a symlink to `/Volumes/Extreme SSD/accounting-course-renders/L05-hi` (internal disk too full for 3-worker disk capture). `--workers 6` under the render lock, ~12 min. `renders/L05-final.hi.mp4` (453.67 s, both streams start_time 0, patched friction-SFX ducking mix), `renders/L05-review-720p.hi.mp4`.
