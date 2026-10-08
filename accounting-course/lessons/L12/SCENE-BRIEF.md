# Lesson 12 — scene builder brief

Read first: `../../course/lessons/12-profit-and-loss/STORYBOARD.md` (what each scene shows + its transition),
`assets/kit/RIG.md` (paper kit + character rig + cast + props API), `assets/scenes/_shared.js` (scene contract + seams),
`vo-segments.json` (the exact spoken lines per scene), `scenes.json` (the scene plan this build uses). Look = **paper cut-out** (locked).
Cast for every lesson lives in `assets/kit/cast.js` (`K.aman`, `K.gopal`, `K.raju`, `K.landlord`, `K.cartWala`, `K.caFriend`, props
`K.samosaCart`, `K.milkCans`, `K.sacks`, `K.infotechBuilding`, `K.scooter`, `K.dawnBand`, `K.cartGhost`, `K.phone`) on top of the
`K.meera / raviMama / priya / merchant` rigs — use them, don't re-draw people in a scene file.

## Scenes (L12) — from `scenes.json`

| id | title | timing | VO segments |
|---|---|---|---|
| `s01` | The first night, again (cold open) | lead 0.5 s | s01a, s01b |
| `s01t` | Title sting | fixed 4.6 s (no VO) | — |
| `s02` | Last time: the trial balance answers | lead 0.5 s | s02 |
| `s04` | Which accounts get a part? (the movie) | lead 0.5 s | s04a, s04b |
| `s05` | Worked: gross profit | lead 0.5 s | s05 |
| `s06` | Faded: net profit (and Lesson 1's answer) | lead 0.5 s | s06a, s06b, s06c, s06d |
| `s07` | Read it like a story | lead 0.5 s | s07 |
| `s08` | Misconception: Khata the usher | lead 0.5 s | s08a, s08b |
| `s09` | Solo: gross vs net, then the loss | lead 0.5 s | s09a, s09b, s09c, s09d |
| `s10` | Recap | lead 0.5 s | s10 |
| `s11` | Your Turn | lead 0.5 s | s11 |
| `s12` | Next time | lead 0.5 s | s12 |
| `s13` | End card | fixed 12.0 s (no VO) | — |

## Contract
- One file per scene: `assets/scenes/<id>.js` registering `SCENES.<id> = ({ svg, tl, K, sc, next }) => {…}`.
- Build the scene's SVG synchronously, add tweens to the **master** `tl` at **absolute** times.
- Time everything from the voice with **language-neutral anchors**: `cue("s01a", "@word")` (an `@` name = the English word; a Hindi build maps each anchor to its Hindi word via `anchors.hi.json`, so the whole lesson re-times itself). Use `@anchors` everywhere — in JS and in `.sfx.json` (`"word": "@galla"`). Other helpers: `cueEnd(…)`, `segStart("…")`, `segEnd(…)`, `sc.start`, `sc.end`.
  Never hard-code absolute seconds or English-only assumptions about phrase length — Hindi runs ~12–15 % longer; leave slack in fixed-length beats. On-screen labels stay English accounting terms + ₹ numbers (Hinglish viewers read them as-is).
- Your section is visible from `sc.start` to `sc.end + 0.6` (overlap for the seam). The default seam is a torn-paper
  wipe moving LEFT centred on `sc.start` of the next scene. To hand-author a match-cut instead, set
  `OWN_SEAM_IN["<next id>"] = true` in the *incoming* scene file and build both halves (out-motion in yours, in-motion in theirs — coordinate via the storyboard's "Transition" line; keep it simple if unsure, the wipe is fine).
- Sound effects: `assets/scenes/<id>.sfx.json` = `[{"sfx": "coin_clink", "at": {"seg": "s01a", "word": "galla"}, "vol": 0.6}, …]`
  (`at` may also be `{"scene": "<id>", "t": 1.2}` or `{"seg": id, "edge": "end", "offset": -0.2}`). Files in `assets/sfx/` (= `ls lessons/shared/audio/sfx`):
  bell_ring boing_hop book_thump bwomp_no checkpoint_sting clay_tap click_lock coin_clink cover_swing dawn_birds
  day_street ding_yes fryer_sizzle galla_clack glass_clink ka_ching kettle_bubble needle_tick night_street
  note_rustle page_flip paper_slide paper_unfold paper_whoosh pen_scratch phone_buzz polaroid_whirr pop projector
  quill_scratch rewind_whoosh rise_three scale_creak scale_settle shutter sparkle stamp_thunk swoosh_transition
  tabla_dha tick_tock tink_high tink_low tray_clatter twine_tug upi_chime yawn_stretch
  Every default seam wipe already gets a `paper_whoosh` from build.py.
  Music + ambience are handled by build.py from `music.json` — don't add them.
- Don't edit: `index.template`, `build.py`, `scenes.json`, `music.json`, `_shared.js`, `assets/kit/*`, other scenes' files. Need a helper? write it inside your file. Kit bug? work around it locally and report it.

## Motion rules (house)
- Character acting on twos (`K.q` / stepped eases) at 15 fps; no positional jitter on holds; camera, flights, wipes, tickers smooth.
- Anticipation → action → settle (`back.out(1.6)`); exits faster than entries; no idle wobble — every second
  something meaningful is mid-flight (staged reveals on VO words, camera with intent, acting beats).
- 0.3–0.75 s stillness before a reveal. ≤ ~6 words of on-screen text per moment (numbers excepted); never duplicate narration as text.
- Paper entrances = drop-and-place (slightly large + soft shadow → lands), never an elastic scale-from-0 pop.
- Debit/left = `#3D7FD9`, credit/right = `#E8862E`. Faces never covered. Characters big in frame (hero ≈ 45–60 % height).
- Deterministic only (no Math.random, no Date). Don't tween `display`; use `autoAlpha`. Don't CSS-transform then tween the same prop.

## Verify (your scenes only)
1. `python3 build.py` → `npm run check` (0 errors).
2. Snapshot densely into YOUR folder: `npx --yes hyperframes@0.8.133 snapshot -o snapshots/<your-id-range> --no-end --at <times>` —
   every VO beat, first/last 0.5 s of each scene, and around each seam. READ the frames; fix composition, scale, overlaps, timing.
3. Optional short render of just your span for motion feel: copy is fine but don't commit renders; the main thread renders the full lesson.

> s03 (old checkpoint walk-through) was removed in the 2026-10-06 review: the previous lesson reveals its own answers. Don't build it.
