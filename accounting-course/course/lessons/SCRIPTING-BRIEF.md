# Scripting brief — Lessons 2–14

Lesson 1 is produced (EN + Hinglish) and is the template. Lessons 2–14 get the same three files,
written from `course/LESSON-PLANS.md`. Scripts only — **no rendering, no TTS, no image generation**.

## Read first (in this order)
1. `course/SERIES-BIBLE.md` — promise, course map, lesson anatomy (§3), cast (§4), devices (§5),
   teaching rules (§6), writing rules, voice, visual identity, locked decisions.
2. `course/LESSON-PLANS.md` — YOUR lessons' plan (beats, transactions, misconceptions,
   worked → faded → solo, Your Turn + answers, checkpoint, tease). This is the contract.
3. `course/lessons/01-why-bother/SCRIPT.md` + `STORYBOARD.md` — format to copy.
4. `lessons/L01/vo-segments.json` — **the real, final L1 narration** (it supersedes SCRIPT.md where they
   differ). Copy its voice: short sentences, warm, playful, eleven_v4 audio tags like `[softly]`,
   `[excited]`, `[playful]`, `[firmly]`, `[curious]`, `[teasing]`, `[inviting]` used sparingly.
5. `lessons/L01/pauses.json` — how deliberate pauses are placed (after a word, at sentence ends).
6. `lessons/L01/assets/kit/RIG.md` — what the paper cut-out kit can already draw/animate.
7. Numbers: `course/data/meeras-chai.json` (Meera, T1–T20) and `course/data/aman-samosa.json`
   (Aman, A1–A15). Run `python3 course/data/ledger.py` / `aman.py` if you need to re-derive.
   **Every rupee figure you write must match these files.** If the plan and the data disagree, the data wins —
   note it in your report.

## Deliverables per lesson → `course/lessons/NN-slug/` (e.g. `02-what-you-have/`)
1. **`SCRIPT.md`** — same header/sections as L1's (voice, settings, direction, target words/time),
   one `## Line N — … (Scene N)` block per beat with Time / Delivery / text.
2. **`STORYBOARD.md`** — same frontmatter + one `## Scene N — …` block per scene with
   scene / duration / voiceover / learning / transition_out / status, then **Visual**, **Motion**,
   **Sound**, **Transition** paragraphs. Every scene leaves through an OBJECT that becomes the next scene.
3. **`vo-segments.json`** — the build input, same schema as L1:
   `[{"id": "s01a", "scene": 1, "gap_after": 0.6, "text": "…"}]`. Split a scene into a/b/c… segments
   wherever the picture needs a silent beat between lines (quiz answers, reveals). `gap_after` = silence
   after the segment (0.4–0.8 normal; 1.6–3.2 for "your turn to think" quiz gaps).
4. **`pauses.json`** — draft deliberate pauses: `{"s04": [["@word", 0.6], ["@word", 0.8, 2]]}`
   (`@word` = the English word the pause FOLLOWS; optional nth occurrence). Put them at sentence ends
   only, ~0.4–1.0 s, roughly 3–8 per lesson's dense teaching scenes. Not too many.

## House rules (learned producing L1 — don't break these)
- **Series name** is "Double Entry, Single Chai" (Hinglish: "Hisaab Kitaab"). **No channel branding**
  ("Build With Hussain") anywhere — not in VO, not on screen, not on end cards.
- Every lesson: cold open (pays off previous tease) → title sting (scene `s01t`, 4.6 s, no VO) →
  "Last time" answers to the previous lesson's Your Turn → build beats → misconception moment →
  worked → faded → solo → recap pictures → Your Turn (3 questions, answers next lesson) → tease →
  end card (`s11`-style, 12 s, no VO: series wordmark, "Up next" card, two blank paper panels on the right
  for YouTube end-screen videos, Khata waving — NO subscribe circle, NO credit line).
- **Your Turn questions must match LESSON-PLANS.md** (the next lesson — possibly written by another agent
  in parallel — answers them from the plan). Same for the tease → it must set up the next lesson's cold open.
- Checkpoint lessons (L3, L5, L7, L11, L14): the Checkpoint challenge uses **Aman's Samosa Cart** per the plan,
  with a clear pause-the-video moment and the answer reveal.
- ZPD: one new idea per lesson; each builds on the last; worked → faded → solo every lesson.
- Runtime: aim at the plan's (~5:30–7:00). L1 = ~720 words spoken → 5:27 final. ~130 spoken words/min of
  final runtime is a good budget once holds/quiz gaps are counted.
- Spoken numbers: Indian system in words ("fifty thousand rupees", "one lakh thirty-six thousand rupees");
  on-screen numbers use Indian grouping: `₹1,36,000`.
- Accounting terms stay English everywhere (the Hinglish dub keeps them English too) — write sentences that
  survive translation: no English-only puns that carry meaning, no rhymes the lesson depends on.
- On screen: ≤ ~6 words per moment (numbers excepted); never duplicate narration as text; labels are
  English accounting terms + ₹ numbers. Debit/left = blue `#3D7FD9`, credit/right = orange `#E8862E`.
- Motion (locked): character acting steps at 15 fps; **no continuous jitter/boil** on holds, cards or text
  (it hurt the viewer's eyes); camera pushes ≤ 8 %; entrances = drop-and-place, not bouncy overshoot.
  Don't write storyboards that rely on shaking, wobbling idle loops or big camera zooms.
- Reuse the kit (Meera, Ravi Mama, Priya, merchant, Khata rig, stall, galla, jar, scale, card, label,
  stamp, coin, note, bundle, polaroid, filmStrip, gauge, crate, kettle, tumbler, umbrella, smallBook,
  slip, Lucide-based paper icons/medallions). If a scene needs a NEW asset (e.g. dairy man, cart, office
  worker, calendar), list it in a `## New kit assets` section at the end of STORYBOARD.md.
- SFX: name sounds from L1's library where possible (`lessons/L01/SCENE-BRIEF.md` lists them); new ones go
  in a `## New SFX` list. Music is handled by the build — don't specify tracks beyond mood.
- **Shared components are specced once in the bible §5 (2026-10-06):** jars vs tags + the Equity card
  (§5.2), the "which two things changed?" beat (§5.3), icon-first golden-rule tags (§5.5), stamp (§5.6),
  calendar (§5.7), `JournalCard` (§5.9), checkpoint pause (§5.10), film strip + polaroid (§5.11), icon
  registry (§5.12), type floor (§5.13), account-name registry (§5.14). Storyboards reference these by
  name instead of re-describing them; any deviation is written down in the scene. Vocabulary locks: §6.11.
- **Practice rule (§3):** the faded beat shows Meera making a visible choice or slip; the solo tests the
  lesson's new idea (never bare arithmetic) and its answer must not have appeared earlier in the lesson
  or as the previous lesson's Your Turn answer.
- Review log: `course/REVIEW-2026-10-06.md`.
- Characters never lip-sync (narrator-only VO). Meera / Ravi Mama etc. act; Khata reacts.

## Your report (final message, short)
Files written · total spoken words + estimated runtime per lesson · any plan↔data mismatch you found and how
you resolved it · new kit assets / SFX needed · anything you changed vs. the plan and why.
Don't edit files outside your lessons' folders (not the bible, not the plans, not L1).
