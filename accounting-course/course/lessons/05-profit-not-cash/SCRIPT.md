# SCRIPT — Lesson 5 · Profit Is Not Cash  (Checkpoint 2)

**Voice:** Monika Sogam (ElevenLabs `EaBs7G1VibMrNAuz2Na7`, model `eleven_v4`)
**Voice settings:** stability 0.40 · similarity 0.75 · style 0.40 · speaker boost on (same as L1)
**Voice direction:** Warm and curious, with a detective's patience — this lesson is a small mystery ("why do the two needles disagree?"). Let each transaction land as a little reveal. Firm, never scolding, on the two "Nope" / misconception lines. Brighter, game-show energy for the solo countdowns and the Checkpoint.
**Target:** ~825 words · ~5:01 of speech (≈0.365 s/word) + 30.6 s gaps + 11.2 s pauses + 4.6 s title sting + 12 s end card ≈ 6:00 total (storyboard scene sum 6:29; trim pass 2026-10-06 cut 47 words for Hindi headroom)
**Review 2026-10-06 applied:** C3 (Apr 16 = the first fortnight's bill; the tab ran from the day the stall opened), A2 (**payable** defined when Gopal is paid), B3 (T11 is a second FADED with a ✗ on "revenue"; T12 is the only solo), s05 split with holds, device gap 2.0 s.
**Build input:** `vo-segments.json` (authoritative text) + `pauses.json`. Lowercase `[tags]` are eleven_v4 audio tags; UPPERCASE `[PAUSE] / [SFX] / [ON SCREEN]` are direction only.

**Module:** M2 · Making Money · **Checkpoint 2** · **New idea:** accrual — revenue counts when earned, expenses when incurred, not when cash moves.
**Data:** T8 (Apr 15, deposit ₹15,000 in bank) · T9 (Apr 16, bill Infotech ₹6,000 on credit) · T10 (Apr 20, pay Gopal Dairy ₹5,000 of ₹8,000) · T11 (Apr 22, ₹4,000 cash advance for May 5 catering) · T12 (Apr 25, Infotech pays ₹4,000 by UPI). From `course/data/meeras-chai.json`:

| after | profit | galla (cash) | bank | Cash needle (galla + bank) | A = L + E |
|---|---|---|---|---|---|
| T7 (start) | ₹13,000 | ₹51,000 | ₹0 | ₹51,000 | ₹1,01,000 = ₹38,000 + ₹63,000 |
| T8 | ₹13,000 | ₹36,000 | ₹15,000 | ₹51,000 | ₹1,01,000 = ₹38,000 + ₹63,000 |
| T9 | ₹19,000 | ₹36,000 | ₹15,000 | ₹51,000 | ₹1,07,000 = ₹38,000 + ₹69,000 |
| T10 | ₹19,000 | ₹31,000 | ₹15,000 | ₹46,000 | ₹1,02,000 = ₹33,000 + ₹69,000 |
| T11 | ₹19,000 | ₹35,000 | ₹15,000 | ₹50,000 | ₹1,06,000 = ₹37,000 + ₹69,000 |
| T12 | ₹19,000 | ₹35,000 | ₹19,000 | ₹54,000 | ₹1,06,000 = ₹37,000 + ₹69,000 |

Checkpoint 2 (`course/data/aman-samosa.json`, A5–A9): profit / cash = +₹9,000 / +₹9,000 · −₹2,000 / −₹2,000 · +₹1,500 / 0 · 0 / −₹2,000 · 0 / +₹1,000 → Aman's profit so far ₹8,500.

---

## Line 1 — Cold open: the tab (Scene 1)

**Time:** 0:00 – 0:27
**Delivery:** Bright and curious for the two-week set-up (the offer itself happened back on Apr 2 — L4's tease planted the window and the tab slip; it is NOT re-staged here), then soft and puzzled on "Her galla doesn't move." Pays off Lesson 4's tease.
**Segments:** s01a · s01b · s01c

    [curious] April sixteenth. Since the day the stall opened, Priya from Infotech has taken chai for the whole floor, every day. On a tab. Pay later.
    Today, Meera sends the first bill — two weeks of chai. Six thousand rupees. Her profit goes up. [softly] Her galla doesn't move.
    [PAUSE 1.2s]
    So did Meera make money, or not?
    [PAUSE 1.0s → title sting s01t, 4.6s, no VO]

## Line 2 — Last time: Lesson 4's Your Turn (Scene 2)

**Time:** 0:32 – 0:55
**Delivery:** Brisk, friendly quiz-host.
**Segments:** s02

    [warmly] First, last time's answers. One. Is the cart an expense? No. It's still making chai, so it's an asset. Two. Meera's profit: eighteen thousand of revenue, minus five thousand of rent. Thirteen thousand rupees. Three. Profit lives on the right side of the scale, inside equity. It belongs to Meera.

## Line 3 — Two needles (Scene 3)

**Time:** 0:55 – 1:23
**Delivery:** Setting up a game. A small conspiratorial lift on "Let's watch."
**Segments:** s03a · s03b

    Today, Khata pins two needles on the stall's wall. The first is Profit. It moves when Meera earns money, or uses it up. The second is Cash — everything in the galla, plus everything in the bank.
    Right now, profit reads thirteen thousand. Cash reads fifty-one thousand. It's bigger, because it also holds Meera's savings and Ravi Mama's loan. [curious] Most people think these two needles move together. Let's watch.

    [ON SCREEN: gauges "Profit ₹13,000" · "Cash ₹51,000"]

## Line 4 — Rewind: the bank deposit (Scene 4)

**Time:** 1:23 – 1:39
**Delivery:** Light, quick warm-up — nothing happens, and that's the point.
**Segments:** s04

    First, rewind one day. April fifteenth. Meera carries fifteen thousand rupees from the galla to the bank. Profit? No change. Cash? Also no change. The money just moved from one pocket to another.

    [Visual plant, no VO: Meera's phone buzzes once on the counter; she glances and smiles. Pays off in the tease → Lesson 6.]

## Line 5 — The tab: which two things changed? → receivable, accrual (Scene 5) · WORKED

**Time:** 1:39 – 2:30
**Delivery:** Khata's worked example. Patient. Soften on "It doesn't move at all." and then STOP — the scene splits here on a 1.5 s hold on the still needle. Firm and clear on the definition of accrual; another 1.5 s still on the strip after "accrual".
**Segments:** s05a · s05b · s05c · s05d

    Now, April sixteenth. Infotech's tab. Which two things changed?
    [PAUSE 2.0s — the device: cream veil, two slots top centre, SFX: tick-tick … ding]
    Sales went up by six thousand. The chai has been drunk, so Meera has earned it. But on the left, no cash came in. Instead, Infotech now owes the stall six thousand rupees. Money that customers owe you is an asset, called a **receivable**.
    So the profit needle jumps, from thirteen thousand to nineteen thousand. And the cash needle? [softly] It doesn't move at all.
    [PAUSE 1.5s — hold on the still Cash needle → Scene 5b]
    [firmly] Revenue counts when it's earned — when the chai is drunk — not when the money arrives. And expenses count when they're incurred — when the thing is used up — not when they're paid. This idea is called **accrual**.
    [PAUSE 1.5s — still on the accrual strip]

    [ON SCREEN: chip "Receivable" · chip "Accrual"]

## Line 6 — Paying Gopal (Scene 6) · FADED + misconception

**Time:** 2:30 – 3:12
**Delivery:** Say Meera's guess the way she'd think it — confident. Then "Nope", firm and kind (Khata stamps). Hand the needle question over and wait. The payable definition is a calm, even landing — a new word, said once, bolded.
**Segments:** s06a · s06b · s06c

    April twentieth. Meera pays Gopal five thousand rupees of the eight thousand she owes him for milk. Meera's sure about this one. Money left the galla, so it's an expense.
    [SFX: stamp_thunk — Khata stamps]
    [firmly] Nope. That milk came in as stock, and Gopal became a liability. Today, Meera is only paying down that debt. So which needle moves?
    [PAUSE 2.0s]
    Only cash. Down five thousand. Profit stays at nineteen thousand. The payment shrinks a liability. Money the stall owes a supplier is a **payable** — the mirror of a receivable.

    [ON SCREEN: Gopal Dairy tag ticks ₹8,000 → ₹3,000 · chip "Payable"]

## Line 7 — The catering advance (Scene 7) · FADED + misconception

**Time:** 3:12 – 3:47
**Delivery:** Meera's guess is quick and confident — she has just learnt "revenue" and over-applies it. "Nope" firm and kind (Khata stamps). Playful on "Not yet." Then hand the needle question over and wait.
**Segments:** s07a · s07b · s07c

    April twenty-second. A customer pays four thousand rupees in advance, for a catering order on May fifth. Meera's quick this time. Money in from a customer? Revenue — straight into the profit pocket.
    [SFX: stamp_thunk — Khata stamps the slip as Meera reaches for the Profit pocket]
    [firmly] Nope. Meera hasn't made a single cup yet. Until May fifth, she owes that customer an event — or their money back. An advance is a liability, not revenue. [playful] Not yet. Meera, which needle moves?
    [PAUSE 2.0s — Meera looks between the gauges, points at Cash]
    Only cash. Up four thousand. Profit stays at nineteen thousand.

    [ON SCREEN: new tag on the right pan `Advance from customer ₹4,000` (tray icon + May 5)]

## Line 8 — Infotech pays by UPI (Scene 8) · SOLO

**Time:** 3:47 – 4:12
**Delivery:** Game-show, gentle — the lesson's only solo. Real silence for the countdown.
**Segments:** s08a · s08b

    Now you, on your own. April twenty-fifth. Infotech pays four thousand rupees of its tab, by UPI. Profit? Cash?
    [PAUSE 3.2s — countdown]
    Cash goes up by four thousand, straight into the bank. Profit doesn't move. Meera earned that money back on April sixteenth. Today, she's only collecting it. The receivable shrinks, and the bank grows.

## Line 9 — Two stories: cash basis vs accrual basis (Scene 9)

**Time:** 4:12 – 4:55
**Delivery:** Slower — a step back. The "aha" of the lesson. Even and clear on the two definitions.
**Segments:** s09a · s09b · s09c

    Since April fifteenth, the profit needle moved once — on the day no money came in. The cash needle moved three times — and not one of those was profit.
    Profit: nineteen thousand rupees. Cash: fifty-four thousand. Two needles. Two different stories.
    **Cash basis** counts money only when it moves. **Accrual basis** counts revenue when it's earned, and expenses when they're incurred. Businesses use accrual, because it shows what was really earned — even while the money is still on its way.

    [ON SCREEN: "Profit ₹19,000" · "Cash ₹54,000" (galla ₹35,000 · bank ₹19,000) · chips "Cash basis" / "Accrual basis"]

## Line 10 — Recap (Scene 10)

**Time:** 4:55 – 5:04
**Delivery:** Warm summary; land the title line.
**Segments:** s10

    So — two needles. Earned isn't the same as received. Paid isn't the same as used up. Profit is not cash.

    [ON SCREEN: three icon tiles — no English phrases; the VO carries "earned ≠ received" / "paid ≠ used up"]

## Line 11 — Your Turn (Scene 11)

**Time:** 5:04 – 5:22
**Delivery:** Inviting. Read each question cleanly; leave the thinking gaps.
**Segments:** s11

    [inviting] Your turn. Three quick ones. One. The four-thousand-rupee catering advance — is it revenue in April? Two. Paying Gopal — is that an expense? Three. After the UPI payment, how much does Infotech still owe Meera? Answers at the start of the next lesson.

**Answers (for Lesson 6's "Last time"):** 1 — No: it's a liability (Meera owes an event) until May 5.
2 — No: it shrinks a liability (Gopal Dairy). 3 — ₹2,000 (₹6,000 billed − ₹4,000 paid).

## Line 12 — Checkpoint 2: Aman's Samosa Cart (Scene 12)

**Time:** 5:22 – 6:24
**Delivery:** Excited — a mini exam, but friendly. Read the five items evenly with a beat between them. Clear, slow "Pause the video now." Then a brisk, satisfying answer reveal.
**Segments:** s12a · s12b · s12c

    [excited] And now — Checkpoint two. Back to Aman's samosa cart. Five things happen. For each one, write down what it does to profit, and to cash.
    One. Cash sales of nine thousand rupees. Two. He pays two thousand rupees of stall rent. Three. He supplies a school canteen with fifteen hundred rupees of samosas, on credit. Four. He pays Sharma Kirana two thousand rupees. Five. A customer gives him a thousand-rupee advance, for a birthday party next month. Pause the video now, and try all five.
    [PAUSE 3.2s — pause icon on screen; worksheet link in description]
    Ready? One. Profit and cash both go up nine thousand. Two. Both go down two thousand. Three. Profit up fifteen hundred. Cash, nothing. Four. Cash down two thousand. Profit, nothing — it's a debt being paid. Five. Cash up one thousand. Profit, nothing — it's an advance. Aman's profit so far: eight thousand five hundred rupees.

    [ON SCREEN: answer grid A5–A9 · "Profit ₹8,500"]

## Line 13 — Next time (Scene 13)

**Time:** 6:24 – 6:34
**Delivery:** Teasing. Read the SMS in a slightly "official" voice, then a delighted "Credited!", then a doubtful "…right?"
**Segments:** s13

    [teasing] Next time — remember that bank deposit? Meera's phone buzzed. Your account is credited with fifteen thousand rupees. Credited! Great news… right?
    [→ end card, 12s, no VO]
