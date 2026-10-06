# Lesson 1 — scene builder brief

Read first: `../../course/lessons/01-why-bother/STORYBOARD.md` (what each scene shows + its transition),
`assets/kit/RIG.md` (paper kit + character rig API), `assets/scenes/_shared.js` (scene contract + seams),
`vo-segments.json` (the exact spoken lines per scene). Look = **paper cut-out** (locked).

## Contract
- One file per scene: `assets/scenes/<id>.js` registering `SCENES.<id> = ({ svg, tl, K, sc, next }) => {…}`.
- Build the scene's SVG synchronously, add tweens to the **master** `tl` at **absolute** times.
- Time everything from the voice with **language-neutral anchors**: `cue("s05b", "@fifty")` (an `@` name = the English word; the Hindi build maps each anchor to its Hindi word via `anchors.hi.json`, so the whole lesson re-times itself). Use `@anchors` everywhere — in JS and in `.sfx.json` (`"word": "@galla"`). Other helpers:, `cueEnd(…)`, `segStart("s06c")`, `segEnd(…)`, `sc.start`, `sc.end`.
  Never hard-code absolute seconds or English-only assumptions about phrase length — Hindi runs ~12–15 % longer; leave slack in fixed-length beats. On-screen labels stay English accounting terms + ₹ numbers (Hinglish viewers read them as-is).
- Your section is visible from `sc.start` to `sc.end + 0.6` (overlap for the seam). The default seam is a torn-paper
  wipe moving LEFT centred on `sc.start` of the next scene. To hand-author a match-cut instead, set
  `OWN_SEAM_IN["<next id>"] = true` in the *incoming* scene file and build both halves (out-motion in yours, in-motion in theirs — coordinate via the storyboard's "Transition" line; keep it simple if unsure, the wipe is fine).
- Sound effects: `assets/scenes/<id>.sfx.json` = `[{"sfx": "coin_clink", "at": {"seg": "s05b", "word": "galla"}, "vol": 0.6}, …]`
  (`at` may also be `{"scene": "<id>", "t": 1.2}` or `{"seg": id, "edge": "end", "offset": -0.2}`). Files in `assets/sfx/`:
  book_thump cover_swing paper_whoosh paper_slide note_rustle galla_clack coin_clink ka_ching stamp_thunk tick_tock ding_yes
  bwomp_no tink_low tink_high pop sparkle boing_hop yawn_stretch clay_tap quill_scratch tabla_dha phone_buzz projector shutter
  polaroid_whirr glass_clink kettle_bubble night_street day_street bell_ring swoosh_transition rise_three.
  Every default seam wipe already gets a `paper_whoosh` from build.py.
  Music + ambience are handled by build.py — don't add them.
- Don't edit: `index.template`, `build.py`, `_shared.js`, `assets/kit/*`, other scenes' files. Need a helper? write it inside your file. Kit bug? work around it locally and report it.

## Motion rules (house)
- Character acting on twos (`K.q` / stepped eases) + paper jitter; camera, flights, wipes, tickers smooth.
- Anticipation → action → settle (`back.out(1.6)`); exits faster than entries; no idle wobble — every second
  something meaningful is mid-flight (staged reveals on VO words, camera with intent, acting beats).
- 0.3–0.75 s stillness before a reveal. ≤ ~6 words of on-screen text per moment (numbers excepted); never duplicate narration as text.
- Debit/left = `#3D7FD9`, credit/right = `#E8862E`. Faces never covered. Characters big in frame (hero ≈ 45–60 % height).
- Deterministic only (no Math.random, no Date). Don't tween `display`; use `autoAlpha`. Don't CSS-transform then tween the same prop.

## Verify (your scenes only)
1. `python3 build.py` → `npm run check` (0 errors).
2. Snapshot densely into YOUR folder: `npx --yes hyperframes@0.8.133 snapshot -o snapshots/<your-id-range> --no-end --at <times>` —
   every VO beat, first/last 0.5 s of each scene, and around each seam. READ the frames; fix composition, scale, overlaps, timing.
3. Optional short render of just your span for motion feel: copy is fine but don't commit renders; the main thread renders the full lesson.
