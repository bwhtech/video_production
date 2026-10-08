# Accounting Fundamentals — animated course (Build With Hussain)

14 animated lessons + trailer (~75–85 min) teaching accounting to people who know school maths
and nothing else. Running story: **Meera's Chai** (a chai stall's first April). Guide mascot:
**Khata** (a bahi-khata ledger book whose left page is debit and right page is credit).
English VO first (ElevenLabs), Hindi later. Built in HyperFrames.

## Start here

| File | What |
|---|---|
| [`course/SERIES-BIBLE.md`](course/SERIES-BIBLE.md) | The rules: promise, course map + checkpoints, lesson template, cast, devices, teaching rules, voice, visual identity, pipeline |
| [`course/lessons/01-why-bother/SCRIPT.md`](course/lessons/01-why-bother/SCRIPT.md) | **Lesson 1 — full narration (for review)** |
| [`course/lessons/01-why-bother/STORYBOARD.md`](course/lessons/01-why-bother/STORYBOARD.md) | **Lesson 1 — scene-by-scene storyboard (for review)** |
| [`course/LESSON-PLANS.md`](course/LESSON-PLANS.md) | Written plans for L0 and L2–L14 (beats, transactions, misconceptions, practice + answers) |
| [`course/data/`](course/data/) | `ledger.py` → `meeras-chai.json`, `aman.py` → `aman-samosa.json`: every number in the course, verified |

## Research

| File | What |
|---|---|
| [`research/accounting-research.md`](research/accounting-research.md) | Curriculum order, golden rules vs equation method, 13 misconceptions, pedagogy evidence, sources |
| [`research/umair-lecture-analysis.md`](research/umair-lecture-analysis.md) | How Umair Sayed's BWH live lecture teaches it, what to keep, what to fix |
| [`research/style-refs/STYLE-ANALYSIS.md`](research/style-refs/STYLE-ANALYSIS.md) | Treehouse / TED-Ed / Kurzgesagt / Two Cents analysis + 22 rules; contact sheets in `style-refs/sheets/` |
| [`research/assets-and-tech.md`](research/assets-and-tech.md) | Voice shortlist, TTS/Hindi pipeline, characters approach, Codex image gen, SFX/music, fonts |
| `research/voice-candidates/same-script/` | Same L1 paragraph in 6 voices (EN) + 3 (HI) on `eleven_v4` — audition these |
| `research/reference-video/` | Umair lecture mp4 + Scribe transcript (cached) + slide frames |
| `research/repos/` | PDoomVideo + ClaudeAnimationBase (shallow clones; character-rig reference) |

## Next steps (after Lesson 1 review)

1. ~~Pick narrator voice~~ → Monika Sogam.
2. Approve visual direction → generate cast + Khata designs and 2 style frames (GPT Image via Codex).
3. Rebuild cast as rigged SVG + shared devices (scale, jars, khata pages, tickers, title sting).
4. Build Lesson 1 end to end as the pilot; lock the template.
5. Script L2–L14 from the plans, then produce in module batches.

## Status (2026-10-06)

| Lesson | Script + storyboard | Build (`lessons/L0N/` EN · `lessons/L0N-hi/` HI) |
|---|---|---|
| L1 Why Bother? | reviewed | **rendered** HI 6:14 · EN 5:29 |
| L2 What You Have, What You Owe | reviewed | **rendered** HI 6:19 · EN 5:40 |
| L3 The Scale That Never Tips | reviewed | **rendered** HI 7:49 · EN 7:02 |
| L4 Making Money | reviewed | **rendered** HI 6:29 · EN 5:55 |
| L5 Profit Is Not Cash | reviewed | **rendered** HI 8:18 · EN 7:24 |
| L6 Debit and Credit | reviewed | **rendered** HI 9:11 · EN 8:05 |
| L7 The Golden Rules, Decoded | reviewed | **rendered** HI 8:59 · EN 8:09 |
| L8 The Journal | reviewed | **rendered** HI 7:27 · EN not built yet |
| L9 The Ledger | reviewed | **rendered** HI 6:41 · EN not built yet |
| L10 Month-End Surprises | reviewed | **rendered** HI 8:09 · EN not built yet |
| L11 The Trial Balance | reviewed | **rendered** HI 7:17 · EN not built yet |
| L12 The Profit & Loss Statement | reviewed | **rendered** HI 6:24 · EN not built yet |
| L13 The Balance Sheet | reviewed | **rendered** HI 6:35 · EN not built yet |
| L14 Where Did the Money Go? | reviewed | **rendered** HI 7:32 · EN not built yet |

All 14 Hindi lessons are live on cs17.org/accounting (Cloudflare Stream). L8–L14 were built Hindi-first: scenes are timed
from `{@name}` markers in vo-segments.hi.json named after the English words, so English drops in later.

Render queue: `lessons/shared/render_queue.sh L01:en L05:hi …` (check → render under the lock → mix → mux → 720p
review copy → verify; log in `lessons/shared/render_queue.log`).

- `course/REVIEW-2026-10-06.md` — the pedagogy review and what was applied; bible §5 = shared-component spec, §6.11 = vocabulary locks.
- `course/lessons/NN-slug/` — SCRIPT.md · STORYBOARD.md · vo-segments.json (EN build input) · pauses.json
- `course/lessons/SCRIPTING-BRIEF.md` — the rules every script followed
- `course/lessons/PRODUCTION-NEEDS.md` — new kit rigs, props, icons, SFX, pronunciation list
- Hinglish `vo-segments.hi.json` per lesson: after the EN build of each lesson is approved

## Building a lesson

```bash
python3 lessons/shared/new_lesson.py 08 08-journal          # scaffold lessons/L08 from the course files
# generate VO: tools/tts.py per segment of lessons/L08/vo-segments.json → lessons/L08/assets/vo/
# author lessons/L08/assets/scenes/<id>.js + <id>.sfx.json (see lessons/L08/SCENE-BRIEF.md, lessons/shared/kit/RIG.md)
cd lessons/L08 && python3 build.py && npm run check
npx --yes hyperframes@0.8.133 render -o renders/video.en.mp4 --workers 6   # one render at a time; renders/ → external SSD
python3 build.py --mix --mux                                               # → renders/L08-final.en.mp4
```

Shared kit: `lessons/shared/kit/` (kit.js, rig.js, cast.js, devices.js, icons.js — API in `RIG.md`). Shared audio
library: `lessons/shared/audio/{sfx,music}`. Renders and snapshots are git-ignored; VO and SFX mp3s are tracked.

**Renders live on the external SSD.** Each `lessons/L0N*/renders` is a symlink to
`/Volumes/Extreme SSD/accounting-course-renders/L0N*` (frame dumps are 3–6 GB per render; the internal disk is nearly
full). Render one lesson at a time with `--workers 6` under the lock `mkdir /tmp/hf-render-lock-dir/lock`.
New lessons: after scaffolding, `mkdir -p "/Volumes/Extreme SSD/accounting-course-renders/L0N" && ln -s "$_" lessons/L0N/renders`.
