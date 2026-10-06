# Series Bible — "Double Entry, Single Chai"

> **Name locked (2026-10-06):** EN series = **Double Entry, Single Chai**; Hinglish series = **Hisaab Kitaab**
> (was "Accounting, Finally"). No channel branding ("Build With Hussain") anywhere in the lessons.

The single reference every lesson script, storyboard, and composition follows.
If a lesson disagrees with this file, this file wins (or gets updated first).

Research behind every decision: `../research/` —
`accounting-research.md` (curriculum, misconceptions, pedagogy, sources),
`umair-lecture-analysis.md` (what the BWH live lecture did well / what we fix),
`style-refs/STYLE-ANALYSIS.md` (Treehouse + explainer styles),
`assets-and-tech.md` (voice, characters, SFX, music, fonts, image gen).

---

## 1. Promise

> In about 80 minutes of playful animation, anyone who knows school maths will understand
> how money moves through a business — and why debit and credit are not scary.

**Audience:** adults with school maths, zero accounting. The archetype is a founder who did
science in 11th–12th and now signs off on books they can't read. Global English audience
first; Hindi dub later.

**Done looks like:** the viewer can (1) say what changed in any simple transaction,
(2) write the journal entry with correct debit/credit, (3) explain the golden rules,
(4) read a small P&L and balance sheet, and (5) explain why profit ≠ cash.

**Not covered:** GST/tax, cash-flow statement preparation, ratios, bad debts, provisions,
inventory valuation methods, company/partnership accounts, bank reconciliation.

## 2. Course map — 14 lessons, 5 checkpoints (+ optional trailer)

Zone of Proximal Development: every lesson adds **one** new idea on top of ideas the viewer
has already used at least twice. The running business supplies the familiar context so
working memory goes to the new idea. Help fades over the course:
**Khata shows → Meera tries with hints → you do it alone.**

| # | Title | One new idea | Meera's Chai txns | Module / checkpoint |
|---|---|---|---|---|
| 0 | Trailer (60–75s) | "Accounting is just the story of money" | — | — |
| 1 | Why Bother? | A business is a separate "person" with two questions: *Am I making money? What do I own and owe?* | setup | **M1 · The Big Picture** |
| 2 | What You Have, What You Owe | Assets, liabilities, equity | T1–T2 | M1 |
| 3 | The Scale That Never Tips | A = L + E; every transaction has two effects | T3–T5 | M1 · **Checkpoint 1** |
| 4 | Making Money | Revenue and expenses change equity; profit | T6–T7 | **M2 · Making Money** |
| 5 | Profit Is Not Cash | Accrual: credit sales, paying suppliers, advances | T8–T12 | M2 · **Checkpoint 2** |
| 6 | Debit & Credit Are Just Left & Right | Dr/Cr derived from the equation; DEAD CLIC; bank-SMS myth | replay T1–T12 | **M3 · The Secret Language** |
| 7 | The Golden Rules, Decoded | Personal / Real / Nominal = same entries, another dialect | T1–T12 side by side | M3 · **Checkpoint 3** |
| 8 | The Journal | Writing entries: date, Dr, "To" Cr, narration; compound entry | T13–T17 | **M4 · Keeping the Books** |
| 9 | The Ledger | One khata page per account; posting; balancing | post T1–T17 | M4 |
| 10 | Month-End Surprises | Adjustments: unpaid bills, stock used, depreciation | T18–T20 | M4 |
| 11 | The Trial Balance | Dr total = Cr total; what it can't catch | all 20 | M4 · **Checkpoint 4** |
| 12 | The Profit & Loss Statement | Build + read Meera's April P&L | all 20 | **M5 · Reading the Story** |
| 13 | The Balance Sheet | Build + read; profit flows into equity | all 20 | M5 |
| 14 | Where Did the Money Go? | Profit vs cash reconciliation; whole-cycle recap; May preview | T21–T23 | M5 · **Final checkpoint** |

**Order decision (2026-10-05):** preparer / bottom-up order (transactions → equation → bookkeeping → reports), with L1 only previewing the two reports. Considered statements-first (Khan/Piper) and a hybrid with live mini-reports; user chose to keep this order.

Target 5–6 min each → ~75 min total. Lessons 6, 7, 10 may run to 7 min (threshold concepts).

### Checkpoints and practice

- **Every lesson** ends with **"Your Turn"**: 2–3 quick questions about Meera's Chai.
  The **next lesson opens** with the answers (30–45s "Last time" segment = spaced retrieval).
- **Checkpoint lessons (3, 5, 7, 11, 14)** add a **Checkpoint Challenge** on a *different*
  business — **Aman's Samosa Cart** — so the viewer transfers the idea instead of
  pattern-matching Meera's numbers. 5 transactions + a downloadable worksheet
  (PDF/Sheet linked in description + pinned comment quiz). The viewer pauses, the **answer
  sheet is revealed in the same lesson** (so the video is self-contained), and the next
  lesson re-checks it in ~30–60s with the two items that trip people up. Everything the
  challenge needs (opening balances, account names) must be **on screen** during the pause —
  the worksheet is a backup, not the source.
- **Timeline anchor:** L1's night is **Apr 2**, Meera's first *trading* day (cart bought that
  morning). L2 rewinds to Apr 1 dawn. L12/L14 return to that night and answer the question
  for the whole month. T7 = cash sales Apr 2–15.
- Aman's transactions live in `data/aman-samosa.json` (same verified-ledger approach as
  `data/ledger.py`).

## 3. Lesson anatomy (template)

| Segment | Length | Purpose |
|---|---|---|
| **Cold open** | 15–25s | A moment from Meera's day that creates the question this lesson answers. Never a title card first. |
| **Title sting** | 3s | Lesson number + title on the Khata book cover flipping open. |
| **Last time** | 30–45s | Answers to the previous "Your Turn" (L1 skips this). Checkpoint solutions run ~60s. |
| **Build** | 2.5–3.5 min | Story → picture → *then* the word. One new idea. Includes 1–3 **"Which two things changed?"** pause beats and one **misconception moment**. |
| **Worked → faded → solo** | 60–90s | Khata does one fully; Meera does one with a blank ("pause — which side?"); viewer does one alone, answer revealed after a 3s countdown. **The faded beat must show Meera making a visible choice or slip** (reaching for the wrong jar, hesitating over a slot) — otherwise it is just a second solo. **The solo must test the lesson's new idea**, never bare arithmetic, and its answer must not have been shown earlier in the same lesson (or as the previous lesson's Your Turn answer). |
| **Recap** | 20s | Three pictures, one short label each. |
| **Your Turn** | 15–20s | 2–3 questions on screen + VO; "answers next lesson". Checkpoint lessons add the Aman challenge. |
| **Next time** | 8–10s | One-line tease using the cold open of the next lesson. |

## 4. Cast

All characters act; **only the narrator speaks**. No lip-sync, no speech bubbles with words.
This keeps the Hindi dub to one voice track and keeps text-to-translate minimal.

| Character | Role | Notes |
|---|---|---|
| **Narrator** (VO only) | Warm, excited female guide. Talks to "you". | Never on screen. Voice: see §8. |
| **Khata** | The mascot — a red cloth-bound bahi-khata (Indian ledger book) with eyes. **Face lives on the spine, always** (closed = spine view; open = pages fan out left/right). No moustache. Rig v0: `../studio/index.html`. Its **left page is the debit side, right page the credit side.** Opens to become T-accounts; flips pages as transitions; bounces, sulks, cheers. | The concept *is* the character: an open book has a left and a right. |
| **Meera** | Owner of Meera's Chai. Quit her IT job, good at maths, never studied accounting — the viewer's proxy. Guesses, gets things wrong, has the "aha". | Mid-20s/30s, kurta + apron, hair bun with a pencil. |
| **Meera's Chai** (the stall) | The business as a separate "person" — the stall has a face (awning eyebrows, counter mouth?) only in lesson 1 to sell the entity concept, then becomes a normal stall. | Business entity concept. |
| **Galla** | Meera's cash box. Coins fly in/out. | Physical stand-in for the Cash account. |
| **Ravi Mama** | Uncle who lends ₹30,000. Moustache, umbrella, very proud. | Liability with a face. |
| **Gopal** | Gopal Dairy owner; supplies milk on credit. | Creditor / payable. |
| **Priya from Infotech** | Office admin who runs a monthly chai tab and pays by UPI. | Debtor / receivable. |
| **Raju** | Meera's helper; gets a salary. | Expense. |
| **The Bank** | A friendly building with columns-for-legs. | Bank-SMS myth in lesson 6. |
| **Aman** | Meera's friend with a samosa cart — checkpoint practice only. | Transfer business. |

## 5. Recurring visual devices

1. **The Scale (Taraazu)** — Assets pan on the left, Liabilities + Equity pan on the right.
   Appears from lesson 3 on as a corner HUD (top-right, ~30 %); tilts when one side changes,
   settles when the second effect lands. *It never stays tilted* (one deliberate cliff-hanger
   tip at L3→L4 is the only exception, resolved in L4 s4 with a ≥1.5 s level hold).
   **Presence rule:** on screen in **every scene that records a transaction or adjustment**
   (L3–L10, incl. practice boards). Absent *by design* in report-building scenes (L11–L14),
   where the sheet / film strip / polaroid plays the scale's role — the storyboard says so.
   Level-return motion: `power2.inOut`, no overshoot (shared `scaleRig`).
2. **Jars and tags** — **assets are jars** (labelled glass jars; Cash = the Galla; label **on**
   the jar, never in a legend). **Claims are tags**: liabilities and equity sit on the right pan
   as paper tags on strings (Ravi Mama's face-tag, Gopal's face-tag, Meera's face-tag). Right-pan
   items never look like money the stall has. **Equity = Meera's tag, which unfolds into the
   Equity card** with pockets: `Capital` | `Profit` (L4) and, from L8, a third pocket
   `Drawings` (slips that *left*; drawn dashed, amount negative). Capital stays ₹50,000 all
   course; drawings never dip the Capital or Profit pockets. L13's equity section *is* this card.
3. **"Which two things changed?"** — one kit constant, identical every time: freeze; cream veil
   30 %; two empty slots drop in at **top centre**; **2.0 s** gap with `tick_tock`; `ding` as
   the two jars/tags light. Used before **every** new transaction or adjustment is named Dr/Cr
   (incl. L6's T3 click moment and all three L10 adjustments). A 3-slot variant for compound
   entries (L8 T16).
4. **Khata pages = T-accounts** — from lesson 6, Khata opens; left page "Dr", right page "Cr".
   Amounts fly from jars onto the correct page. From L9 the pages are the **ledger**; journal
   entries are **never** written on the pages (see 9).
5. **Golden-rule tags** — from lesson 8, each journal line (incl. L10 adjustments, L11's T16
   card, L9's answer cards) wears a small tag. Tags are **icon-first** so they survive the dub:
   family medallion (`Real` = box icon · `Personal` = person icon · `Nominal` = receipt icon) +
   rule glyph (`comes in` ↓into-box · `goes out` ↑out-of-box · `receiver` open-palm ·
   `giver` giving-hand · `expense` coins-out · `income` coins-in). English words small, swappable.
6. **Misconception stamp** — when the viewer's likely wrong guess appears, it gets a red ✗
   rubber stamp (icon, never the word NOPE) then the right answer. One spec: scale
   1.25 → 1.0 `power3.out`, `stamp_thunk`, **no screen shake, no settle wobble**. Khata stamps.
7. **Calendar strip** — full strip of April dates along the top, current date highlighted; the
   month label is small and swappable (Hindi). Present from L2 on (L2 = `1`), ticks forward only
   (no flips back for teasers). All Apr 30 entries show `30`, incl. L10's adjustments.
8. **Two cameras** — split screen for "same money, two books" (bank SMS, golden rules vs
   equation). The two books are visibly different objects (red Khata vs grey-blue bank ledger);
   Khata never morphs one of *its pages* into another party's book.
9. **JournalCard** — one shared component from L8 on (L8, L9 answers, L10 adjustments, L11 T16):
   `Apr 30` · `Cash A/c … Dr` / `To Sales A/c` (indented) · `Dr ₹` / `Cr ₹` columns · narration
   row = icon + ≤2 words in brackets · golden-rule tag on every line. `A/c` = account is
   introduced with a chip the first time it appears (L8 s4).
10. **Checkpoint pause** — centre pause medallion, `--scene-saffron`, 3-2-1 ring, music dips.
    Same in L3, L5, L7, L11, L14.
11. **Mini-report props** — the **film strip** (P&L, with two ruled result frames for Gross /
    Net) and the **two-column polaroid** (Balance Sheet, `30 Apr`) are built once as kit
    components and are the *same objects* in L1 (preview), L12, L13, L14. The polaroid is never
    used for anything else (no "memory card" polaroids).
12. **Icon registry** (Lucide, one icon per meaning): rent = `key` · drawings = `wallet` ·
    home side = `map-pin` · bank = `landmark` · equipment = `shopping-cart` · stock = `leaf` ·
    salary = `user` (Raju) · electricity = `zap` · interest = `percent` · advance = `calendar-check`
    · depreciation = scuff sticker · worksheet = `file-text`. `house` is retired.
13. **Type floor** — any table (journal card, ledger page, trial balance, P&L, balance sheet,
    Aman's sheets): **≥ 34 px Baloo 2**, rows ≥ 60 px, settled rows may dim to 70 %. Never more
    than ~8 rows at full frame without a scroll or a two-stage reveal.
14. **Account name registry** — on-screen labels are exactly the keys in `data/meeras-chai.json`
    minus the parenthetical: `Cash`, `Bank`, `Capital`, `Loan from Ravi Mama`, `Equipment`,
    `Stock`, `Gopal Dairy`, `Infotech`, `Rent`, `Sales`, `Advance from customer`, `Salary`,
    `Interest`, `Drawings`, `Electricity`, `Electricity payable`, `Cost of supplies used`,
    `Depreciation`, `Accumulated depreciation`. No variants (`Ravi Mama loan`, `Advance`, generic
    `Expense` jar after L10). Aman: `Cart & fryer`, `Ingredients stock`, `Sharma Kirana`,
    `School canteen`, `Bank loan`, `Stall rent`, `Helper wages`, `Ingredients used`.

## 6. Teaching rules (non-negotiable)

1. **Concrete before term.** Show the thing happening, then name it. ("Ravi Mama gave money
   he expects back… that's a *liability*.")
2. **One idea per lesson; one primary visual idea per shot.** Let key transformations breathe
   (≥1.5s hold after a balance settles).
3. **Derive, don't decree.** Debit/credit comes from the equation's left/right. Mnemonics
   (DEAD CLIC) summarise what's understood — they're never the explanation.
4. **Always ask "which two things changed?" before naming debit/credit.**
5. **Worked → faded → solo** in every lesson from 2 on.
6. **Name the misconception out loud** (bank SMS credit, profit = cash, advance = income,
   loan repayment = expense, drawings = expense, buying equipment = expense,
   depreciation = market value, TB tallies = books correct).
7. **Recall at the start of each lesson; interleave old transaction types** into new lessons.
8. **Numbers:** small and round, all from `data/meeras-chai.json`. Rupees with Indian commas
   (₹1,06,700). Speak numbers naturally ("fifty thousand rupees", "one lakh six thousand seven
   hundred" → prefer "about one lakh, seven thousand" only when exactness doesn't matter).
9. **No narration duplicated as on-screen text.** Labels are 1–3 words.
10. **Accuracy.** Pacioli 1494; Mesopotamian records ~5,000 years old; "Indian traders have
    kept double-entry books for centuries" (don't claim they were first).
11. **Vocabulary locks (2026-10-06 review).**
    - **account** is defined in L2 ("each jar is what accountants call an *account*").
    - **payable** is defined in L5 when Gopal is paid (mirror of *receivable*, L5).
    - The account is **Sales**; the family word is **revenue**; **income** is bridged once in
      L6 s7 (visible chip flip `Revenue → Income`, VO "revenue, or income") and only then used
      in DEAD CLIC / golden rules.
    - Global aliases, one line each: *inventory* (L10, for Stock), *cost of goods sold* (L12, for
      Cost of supplies used), *book value* (L10, named explicitly vs. "what it would sell for").
    - Debit/credit are **derived**: L6 shows the one algebra move `A = L + Cap + Rev − Exp` →
      `A + Exp = L + Cap + Rev` (the `−Expenses` chip crosses the post and flips sign; same for
      Drawings in L8). DEAD CLIC is read off that equation, never before it.
    - A **loss** is shown once (L12 solo: sales ₹15,000 → net loss ₹10,300) so "Profit *and
      Loss*" has two shapes.
    - The **fourth pattern** (swap on the right) gets its referent in L14 (T21: advance → revenue).
    - **Representative personal accounts** (Advance from customer) are taught in L7 s8 before
      L7's Your Turn asks about them.
    - Khata is **it** (never "his"); Khata's name is explained **once**, in L7.
    - Raju is introduced on screen (L4 time-lapse) before his salary is paid (L8).

## 7. Writing rules for narration

- 150–160 wpm with real pauses (TED-Ed/Kurzgesagt pace; Treehouse's 190 wpm is too fast for concepts). 5–6 min ≈ 750–850 words.
- **Hindi runs ~12–15% longer** than English for the same lines (measured). All animation cues key off per-language TTS word timestamps, never hard-coded seconds; holds have slack.
- Second person, warm, curious, a little cheeky. Short sentences. Questions that make the
  viewer predict.
- Excitement comes from *discovery*, not adjectives. No "amazing", "super", "let's dive in".
- **Dub-friendly:** avoid English-only puns and idioms; jokes are visual. Keep one sentence
  = one idea so Hindi timing can stretch. Character names and ₹ amounts stay identical.
- Mark beats in scripts as `[PAUSE 2s]`, `[SFX: ding]`, `[ON SCREEN: …]`.
- Technical terms are introduced in **bold** the first time and repeated at least twice in
  the lesson.

## 8. Voice & audio  (from `../research/assets-and-tech.md`)

**Narrator voice — LOCKED: Monika Sogam** (`EaBs7G1VibMrNAuz2Na7`), Indian English + Hindi, same voice
for both languages. Chosen 2026-10-05 from the same-script audition in
`../research/voice-candidates/same-script/` (`Monika-en.mp3`, `Monika-hi.mp3`).
She is smoother/calmer than Tara — keep energy up via `style` (~0.35–0.45) and `[excited]` / `[curious]`
audio tags on hooks, reveals and "Your Turn".

Shortlist kept for reference:

| Voice | voice_id | Accent | Hindi | Why |
|---|---|---|---|---|
| Tara | `P7vsEyTOpZ6YUTulin8m` | Indian | native-sounding | Most expressive at a mid pitch (205 Hz, 11 st range) — "smooth, not high, exciting". One voice for EN + HI. |
| **Monika Sogam** ✅ | `EaBs7G1VibMrNAuz2Na7` | Indian | strong | Smoother, lower, a little calmer. Safest Hindi. |
| Nichalia Schwartz | `XfNU2rGpBa01ckF309OY` | American | yes | Built for e-learning; bright. Pick if global-English-first. |
| Matilda | `XrExE9yKIg1WjnnlVkGX` | American alto | multilingual | Premade (never withdrawn). |
| Amelia / Paige | `ZF6FPAbjXT4488VcRRnw` / `NDTYOmYEjbDIVCKB35i3` | British / American | yes | Amelia is highest-pitched; Paige is low and needs energy tags. |

**TTS pipeline:** `eleven_v4` → `/with-timestamps`, one request per scene, fixed `seed`, alias
pronunciation dictionary (galla, khata, bahi-khata, Ravi Mama, Pacioli, ₹ amounts). Word timestamps
drive captions *and* animation cues. Fallback model: `eleven_multilingual_v2`.
**Hindi = Hinglish (decided 2026-10-05):** Hindi sentences in Devanagari with accounting terms kept in English
(debit, credit, asset, liability, profit, balance sheet, transaction…) as Latin words inside the Hindi text. Same voice
(Monika), `language_code: "hi"`, not the Dubbing API. Visuals stay identical — on-screen labels are already English
terms + ₹ numbers. Animation cues use language-neutral `@anchor` names (`anchors.hi.json` maps each to its Hindi
word), so `python3 build.py --lang=hi` re-times the whole lesson from the Hindi timestamps. Produced after the English
version of each lesson is approved.
**Budget:** ~66k characters per language ≈ $13 incl. retakes. ⚠ Account is pay-as-you-go with a 41k
character cap this cycle — top up / plan before the full run.

**Music:** one light bed per module (pizzicato / marimba / ukulele — playful, not corporate) from the
YouTube Audio Library ("attribution not required"), Pixabay Music as backup. Bed at ~−30 LUFS under VO,
ducked; final mix −14 LUFS. **SFX (CC0):** Kenney.nl packs, Pixabay, Mixkit, Freesound-CC0. Fixed SFX
vocabulary (reuse every lesson): page flip, coin clink, galla clack, stamp thunk, "which two things
changed" tick-tick + ding, low/high "tink" pair for debit/credit, ka-ching for equity changes.
**Captions:** burned-in optional; always upload SRT/VTT generated from TTS timestamps (EN + HI).

## 9. Visual identity  (from `../research/style-refs/STYLE-ANALYSIS.md`)

**Direction: "Treehouse-flat, chai-stall warm."** Friendly geometric characters, flat colour, smooth
puppet rigs, no corporate polish. Flat token colours, **no gradients, no glow**. **Approved 2026-10-05:** a subtle
warm paper texture over the frame + gentle hand-drawn line boil — "makes things interesting".
**LOCKED 2026-10-05: PAPER CUT-OUT** (chosen from real renders in `look/renders/`; flat was the runner-up, 3D clay ruled out). Reference kit: `../motion-tests/paper-stills/assets/kit.js`; Khata motion reference: `../motion-tests/papercut/`.

- **Backgrounds:** one flat saturated colour per scene; chapter changes = colour changes. Set
  dressing (stall, street, office, bank) drawn as tone-on-tone thin strokes; only characters + the
  key prop are fully coloured.
- **Shapes:** no outlines; flat fills + at most one shade step; one 15%-black floor ellipse under
  standing things. Documents = white rounded cards with a coloured header strip; assets = white
  circle medallions with a Lucide icon.
- **Characters:** ~3 heads tall, rounded-rect heads, rubber-hose arms (single path, bendable), stick
  legs, dot eyes, arc brows, D-mouth. Expressions swap as face sets (2-frame blend + head tilt). **No
  lip-sync** (narrator-only VO). Khata the mascot fills Treehouse's "yellow monster" slot.
- **Palette (proposed — become `--scene-*` / `--acc-*` tokens in `graphics/theme/`):**

  | Token | Hex | Use |
  |---|---|---|
  | `--scene-teal` | `#2FA79A` | default teaching scenes |
  | `--scene-saffron` | `#F2A33A` | money / revenue beats |
  | `--scene-sky` | `#4C9BE0` | balance sheet / photo beats |
  | `--scene-leaf` | `#5DB96B` | profit / "aha" beats |
  | `--scene-coral` | `#EF6F5E` | misconception beats |
  | `--scene-violet` | `#7A62C9` | title stings, end cards |
  | `--scene-night` | `#2B3A55` | night at the stall (L1/L12/L14 rhyme) |
  | `--paper` | `#FFF4E2` | cards, khata pages |
  | `--ink` | `#2B2233` | eyes, text on paper |
  | `--khata-red` / `--khata-gold` | `#C8372D` / `#E9B949` | Khata's cover + string |
  | `--dr` | `#3D7FD9` | **debit / left / assets side** — always this colour |
  | `--cr` | `#E8862E` | **credit / right / L+E side** — always this colour |

  Debit and credit get neutral, equal-weight colours (blue vs orange) — never green/red, which would
  re-teach "credit = good". **`--scene-violet` is for title stings and end cards only** (never a
  teaching or recap scene). **`--scene-leaf` is an "aha" *wipe* colour, not a profit colour**: the
  profit figure (₹24,700, ₹13,000…) is always rendered on neutral paper, so the course never teaches
  "profit = green" — the same P&L shape must be able to show a loss.
  **On-screen text** is limited to account names (§5.14), accounting terms, ₹ numbers and dates;
  any other English phrase (`Earned ≠ received`, `Clue`, `before/after`…) is replaced by an icon or
  goes on the Hindi swap list in the storyboard.
- **Wordmark:** **Shrikhand** (Google Fonts, Latin-only) for the series name ONLY — title-card cover + outro (`K.text(..., {font: "title"})`, `window.SERIES_NAME()`). Never for body, numbers or Devanagari.
- **Type:** **Baloo 2** for lesson titles, labels and every number (tabular figures, has ₹ and Devanagari);
  Inter for small UI text; Mukta / Noto Sans Devanagari for Hindi body. ≤ ~6 words of text per scene
  (numbers excepted). Numbers always count up/down (tickers), never just appear.
- **Motion:** anticipation → action (`power3.out`) → settle (small overshoot only, `back.out` ≤ 1.2); exits faster than
  entries; ≥0.5s stillness before a reveal; deliberate VO pauses after each point lands (`pauses.json`).
- **Paper cut-out timing (locked after L01 review — "the shake hurts my eyes"; see `research/paper-cutout-jitter.md`):**
  character acting steps at **15 fps** (exactly 2 frames per step at 30 fps — never 12, which judders 3-2-3-2);
  **no positional jitter/boil on holds** (real cut-out pieces sit still unless moved); cards, text, backgrounds never
  wobble; camera moves smooth at 30 fps, pushes ≤ 8 % per scene; at most one ambient "life" element in frame.
- **Transitions (no hard cuts):** object match-cuts (galla clasp → clay token), curved colour wipes,
  iris wipes, push-through-a-card, whip pan with blur. Every seam named in the storyboard.
- **Handmade layer:** comes from paper textures, torn edges and cardboard shadows — not from motion. (Line boil was
  approved early, then removed after the L01 review for eye strain.)

## 10. Production pipeline (per lesson)

1. **Design once (course-wide):** GPT Image (via Codex CLI) → cast exploration → pick → model sheets
   (front, ¾, side + 8 expressions) and 2–3 style frames. Uses Codex's built-in `gpt-image` tool
   (decided 2026-10-05; no API key). Wrapper: `../tools/gen_image.sh`. Prompt blocks: `look/prompts/`.
2. **Rebuild cast as rigged SVG** (`graphics/characters/`): named groups, joint transform-origins, face
   sets, rig helpers (`blink`, `emote`, `point`, `hop`, `wave`) as pure functions on the paused GSAP
   timeline. A living model-sheet composition renders to PNG after every change.
3. **Shared devices as components:** Khata, Scale, Jar, T-account page, journal card, number ticker,
   "which two things changed?" beat, stamp, calendar strip, title sting, end card.
4. **Per lesson:** SCRIPT.md lock → TTS with timestamps → STORYBOARD.md frames → static layout sketch
   per scene (review on the HyperFrames board) → animate → `hyperframes check` → snapshots → render.
5. **Data-driven numbers:** compositions read `data/meeras-chai.json`; nothing hard-coded.
6. **Hindi pass:** translated SCRIPT.hi.md → TTS → re-time from timestamps → swap the few text labels
   (title sting, report names) → render.
7. **HyperFrames pin:** move `graphics/` from 0.7.56 to current (≥0.7.90) before building; icons via
   `lucide-static` inlined at build time (no CDN fetch at render).

## 11. Data

`data/ledger.py` → `data/meeras-chai.json`: every transaction, every running balance,
trial balance, P&L, balance sheet. **No number appears in a script or composition unless it
comes from this file.** Verified: equation balances after all 20 transactions; TB ₹1,36,000;
net profit ₹24,700; balance sheet ₹1,06,700; cash + bank ₹61,700.
