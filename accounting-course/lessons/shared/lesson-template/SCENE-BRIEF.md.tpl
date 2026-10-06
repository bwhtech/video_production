# Lesson {N} — scene builder brief

Read first: `../../course/lessons/{SLUG}/STORYBOARD.md` (what each scene shows + its transition),
`assets/kit/RIG.md` (paper kit + character rig + cast + props API), `assets/scenes/_shared.js` (scene contract + seams),
`vo-segments.json` (the exact spoken lines per scene), `scenes.json` (the scene plan this build uses). Look = **paper cut-out** (locked).
Cast for every lesson lives in `assets/kit/cast.js` (`K.aman`, `K.gopal`, `K.raju`, `K.landlord`, `K.cartWala`, `K.caFriend`, props
`K.samosaCart`, `K.milkCans`, `K.sacks`, `K.infotechBuilding`, `K.scooter`, `K.dawnBand`, `K.cartGhost`, `K.phone`) on top of the
`K.meera / raviMama / priya / merchant` rigs — use them, don't re-draw people in a scene file.

## Scenes ({LESSON}) — from `scenes.json`

{SCENE_TABLE}

## Contract
- One file per scene: `assets/scenes/<id>.js` registering `SCENES.<id> = ({ svg, tl, K, sc, next }) => {…}`.
- Build the scene's SVG synchronously, add tweens to the **master** `tl` at **absolute** times.
- Time everything from the voice with **language-neutral anchors**: `cue("{EXAMPLE_SEG}", "@word")` (an `@` name = the English word; a Hindi build maps each anchor to its Hindi word via `anchors.hi.json`, so the whole lesson re-times itself). Use `@anchors` everywhere — in JS and in `.sfx.json` (`"word": "@galla"`). Other helpers: `cueEnd(…)`, `segStart("…")`, `segEnd(…)`, `sc.start`, `sc.end`.
  Never hard-code absolute seconds or English-only assumptions about phrase length — Hindi runs ~12–15 % longer; leave slack in fixed-length beats. On-screen labels stay English accounting terms + ₹ numbers (Hinglish viewers read them as-is).
- Your section is visible from `sc.start` to `sc.end + 0.6` (overlap for the seam). The default seam is a torn-paper
  wipe moving LEFT centred on `sc.start` of the next scene. To hand-author a match-cut instead, set
  `OWN_SEAM_IN["<next id>"] = true` in the *incoming* scene file and build both halves (out-motion in yours, in-motion in theirs — coordinate via the storyboard's "Transition" line; keep it simple if unsure, the wipe is fine).
- Sound effects: `assets/scenes/<id>.sfx.json` = `[{"sfx": "coin_clink", "at": {"seg": "{EXAMPLE_SEG}", "word": "galla"}, "vol": 0.6}, …]`
  (`at` may also be `{"scene": "<id>", "t": 1.2}` or `{"seg": id, "edge": "end", "offset": -0.2}`). Files in `assets/sfx/` (= `ls lessons/shared/audio/sfx`):
{SFX}
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
