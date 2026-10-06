# L01 · Why Bother? — build log

## 2026-10-05 — pilot v1 (English)
- Look: paper cut-out (locked). Voice: Monika Sogam, eleven_v4, 22 VO segments (`vo-segments.json`).
- Audio: 32 ElevenLabs SFX (`assets/sfx/`, gain-matched to −24 LUFS in `assets/sfx-norm/`), 4 ElevenLabs music cues
  (`assets/music/`: intro_sting, night, main, outro). Offline mix in `build.py --mix`: VO highpass, music sidechain-ducked,
  hush dip on s05 "not the same", 2-pass loudnorm → −14.6 LUFS.
- Pipeline: `python3 build.py` (timing map from VO timestamps → index.html + assets/timeline.js + captions.en.srt + mix.json)
  → `npm run check` → `npx hyperframes render -o renders/video.en.mp4` (7:36 for 4:56) → `python3 build.py --mix --mux`.
- Scenes: assets/scenes/s01…s11 (+ .sfx.json), built by 4 parallel builders on the rig in assets/kit/rig.js (RIG.md).
  Hand-authored seams: s01→s01t (clasp rush), s01t→s02 (cover opens onto era 1), s03→s04 (pages → cards),
  s08→s09 (tiles flip into question cards), s10→s11 (Lesson-2 cover swings open). Others: torn-paper wipe moving left.
- Hindi: `@anchor` cues everywhere → `build.py --lang=hi` once `vo-segments.hi.json`, `assets/vo-hi/`, `anchors.hi.json` exist.
- Output: renders/L01-final.en.mp4 (1080p), renders/L01-review-720p.en.mp4.
- Known nits (from builders): s04 tiny owners at ~1:24 are small; s04 card passes behind film strip ~0.3 s near "second";
  rig expressions hard to read below ~0.35×; Meera's mustard kurta vs saffron backgrounds.

## 2026-10-05 — v2 after user review + Hindi (Hinglish)
User notes → fixes:
- "money catching sound too high and too many" (cold open) → s01: 3 note_rustle cues → 1 soft (vol 0.22, 0.9 s).
  Also all SFX gain-matched to −24 LUFS (`assets/sfx-norm/`) — raw ElevenLabs SFX ranged −13…−38 LUFS.
- "shaking of the cards too much" → rig jitter defaults halved (rot 0.3°, 0.7 px); every card/chip/label entrance capped
  (back.out ≤ 1.2, start scale ≥ 0.85, tilt ≤ 3°); nudges/wiggles/buzzes removed or reduced (s02, s04, s05, s06, s07–s11).
- "Indian uncle had no legs" → s02 era-3 merchant (white kurta on cream gaddi) now sits cross-legged on a maroon gaddi.
- "natural pauses after a point" → `pauses.json`: build.py cuts the VO take between words and inserts silence
  (no re-synthesis); 0.3–1.8 s after key statements, 1.8 s thinking time after each Your-Turn question. 4:56 → 5:24.
- Bug found in review: s09 card 3 cued on the first "three" ("Three quick ones") → now @three#2.
Hindi:
- `vo-segments.hi.json` (Hinglish: Devanagari + English accounting terms) with inline `{@anchor}` / `{p@anchor}` markers;
  `tools/tts.py --lang hi` strips them and writes `.marks.json`; `anchors.hi.json` maps every anchor to its Hindi word.
- `python3 build.py --lang=hi` writes the sibling project `lessons/L01-hi/` (assets symlinked) → 6:09 (+14 %).
- Gotcha fixed: JS `\w` is ASCII-only → every Devanagari word normalised to "" → all cues hit the first word.
  Both build.py and timeline.js now strip an explicit punctuation set instead (Devanagari-safe).

## 2026-10-06 — v3: audio-drop fix (user: "abrupt drops in some of the words" in Hindi)
- Cause: pause cuts placed at the midpoint between ElevenLabs word timestamps, which drift by tens–hundreds of ms →
  15 Hindi cuts (and 21 English) landed inside speech. Plus 10 Hindi `{p@…}` markers sat on a content word mid-sentence.
- Fix: `snap_cut()` searches the waveform around each boundary for the longest ≥30 ms near-silence and cuts there;
  words shift by position (not drifting timestamps); all VO pieces get 20/35 ms fades; Hindi pause markers moved to
  sentence-final words. `validate_cuts()` now fails the build if any cut sits in speech (±25 ms RMS > 12 % of take).
- Verified: 38/38 cuts in silence in both languages; no dropouts or clipped takes found in any VO file.

## 2026-10-06 — v4: opening line, no-shake timing, paper icons
- Opening question reworded (user: "did she earn money?" is ambiguous when the galla is full). EN: "…But once she pays for
  the milk, the sugar, and the stall's rent — did Meera actually make a profit today? Or a loss?" HI: "पर दूध, चीनी,
  stall का किराया — ये सब निकालकर, क्या आज मीरा को फ़ायदा हुआ — या नुकसान?" Cold open adds 3 cost slips leaving the galla
  (notes shrink) + up/down medallions; '?' now cues on @loss (it used to fire on the first "Today").
- Shake (user: "still hurts my eyes") → research/paper-cutout-jitter.md: steps at 15 fps (12 gave uneven 3-2-3-2 holds at
  30 fps), positional jitter disabled on holds (K.jitter is a no-op unless {force:true}), cold-open push 12 % → 7 %.
- Icons → research/paper-icons.md + icon-lab/: K.icon = die-cut sticker (cream border + coloured core, static #rough edge),
  K.medallion = coloured paper disc with cream paper-strip icon (colour per icon in ICON_COLOR). Entrances everywhere =
  drop-and-place (appear at 1.07× lifted → settle to 1 with power2.out, no overshoot); exits lift off (1.05× + fade).
- tools/hi_anchors.py rebuilds anchors.<lang>.json (+ anchors.hi.aliases.json for scene nth-occurrence aliases).

## 2026-10-06 — course-wide review applied; L01 storyboard re-specced (build NOT yet updated)
- `course/REVIEW-2026-10-06.md` + bible §5 (shared components) / §6.11 (vocabulary locks) now govern every lesson.
- `course/lessons/01-why-bother/STORYBOARD.md` was brought in line with the locked rules. The v4 build already has
  drop-and-place entrances, 7 % push and no shake, so the remaining **visual-only deltas** for a v5 build are:
  1. Scene 1: calendar chip `2` (timeline anchor — this night is Apr 2, first trading day).
  2. Scene 4: the polaroid's "IOU note" → two claim tags (face icon + ₹); film strip gets its two ruled result frames
     (same `filmStrip` / two-column `polaroid` props L12–L14 build the reports in — bible §5.11).
  3. Scene 5: the ₹50,000 drop sits inside the dashed `imagineCard` (L2 s1 shows the real drop at Apr 1 dawn);
     tag = face + `₹50,000`, no "from Meera" text; home electricity icon `zap` + `map-pin` (`house` retired).
  4. Scene 6: the "…yet" wink is a Khata page-corner gesture, not on-screen text.
  5. Scene 7: jars unlabelled (L2 introduces the jar device); calendar underline travels 2 → 30, never back.
  No VO change. `course/lessons/01-why-bother/SCRIPT.md` Line 1 now mirrors vo-segments s01a/b (v4 wording).

## 2026-10-06 — v5: course-review visual deltas built (visual-only; VO / pauses / TTS untouched)
Per `course/lessons/01-why-bother/STORYBOARD.md` + bible §5 (devices) / §6.11 (locks). `hyperframes check`: 0 errors.
- **s01** — `K.calendarStrip` (highlight `2`, month "April") at the top, OUTSIDE the camera group so it sits dead still;
  drops in as the black lifts, lifts off before the clasp rush. Push 1.07 → **1.06**.
- **s04** — film strip is now `K.filmStrip(…, {resultFrames: 2})` (6 picture frames + 2 empty ruled result frames); the rolling
  picture frames are a clipped overlay that stops exactly on a cell boundary (film base rect under them). Polaroid is
  `K.polaroid(…, {twoColumn: true, date: "30 Apr"})`: stall + jar in Assets, hand-coins medallion + two `K.claimTag`s
  (Meera + Ravi Mama faces, `₹` glyph, strings to the medallion) in Liabilities + Equity. "IOU slip" and the "30 April" caption gone.
- **s05** — ₹50,000 drop plays inside a dashed `K.imagineCard` (mini purse → mini galla across a mini line); claim tag
  `K.claimTag({face:"meera", amount:50000})` turns once to camera on "remembers"; the card lifts off before "Here's where…",
  then the same tag drops onto the REAL galla. "from Meera" label → second claim tag (face + ₹, no amount) on the sugar.
  Home electricity = `zap` medallion + `map-pin` badge (`house` retired). Stamps = `K.stamp(tl,…)` (1.25→1.0 power3.out), a small
  Khata is the stamper; the `shake` x/y screen-shake `tl.set`s are gone, squash-settles on sugar sack / chip removed.
- **s06** — "…yet": Khata raises one page-corner (`arm R 115°`) + wink, no sparkle, no text. Khata head-shake is a local eased
  tilt (kit `wiggle()` has a back.out(1.6) — not used).
- **s07** — jars unlabelled (icon medallions removed; slips fade as they drop in so the glass stays plain). Calendar is the same
  `K.calendarStrip` (highlight stays on `2`); a thin underline grows 2 → 30 left-to-right and fades — never backwards.
  Mini film strip / polaroid use the same `resultFrames:2` / `twoColumn` props as s04.
- **s10** — the two layout errors (t≈315 s, `₹50,000` + `2` overlapping): the cover's "Lesson" label moved to its own zone
  (y 330 → 205) and the ₹50,000 tag moved clear of the cover's "2" box (900,430 → 1070,400). Push 1.08 → 1.06; cover lands flat
  (squash + back.out settle removed).
- **Everywhere** — every `back.out(...)` in s01–s11 → `power2.out` (no overshoot); entrances that popped from 0.3 / 0.75 / 0.84
  (s01t title, s02 tally marks, s05 thought bubble) → drop-and-place 1.07×; s03/s11 Khata "wiggle" → eased tilt.
  `K.jitter` is a no-op (kept), so there is no boil / jitter anywhere.
- Kit gaps worth fixing in `lessons/shared/kit` (not touched): `polaroid({twoColumn})` header "Liabilities / + Equity" is two lines whose
  text boxes touch (hyperframes layout error) — worked around locally by `data-layout-allow-overlap` on the polaroid's `<text>`
  nodes; `khataRig.wiggle` uses back.out(1.6).
- Snapshots: `snapshots/v5/` (frames around every change). Hindi sibling `python3 build.py --lang=hi` still builds (372.38 s).
- Final: renders/L01-final.en.mp4 (327.1 s, both streams start_time 0), refreshed renders/L01-review-720p.en.mp4. Render needed --workers 3 (machine load from parallel agents made the default 4-worker screenshot capture time out).
