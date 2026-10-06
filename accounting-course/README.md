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

## Lessons 2–14 (scripted 2026-10-06, awaiting review)
- `course/lessons/NN-slug/` — SCRIPT.md · STORYBOARD.md · vo-segments.json (EN build input) · pauses.json (draft)
- `course/lessons/SCRIPTING-BRIEF.md` — the rules every script followed
- `course/lessons/PRODUCTION-NEEDS.md` — new kit rigs, props, icons, SFX, pronunciation list
- Hinglish `vo-segments.hi.json` per lesson: after EN scripts are approved
