# SCRIPT — Lesson 11 · The Trial Balance (Checkpoint 4)

**Voice:** Monika Sogam (ElevenLabs `EaBs7G1VibMrNAuz2Na7`, model `eleven_v4`)
**Voice settings:** stability 0.40 · similarity 0.75 · style 0.40 · speaker boost on (same as L1)
**Voice direction:** Satisfying and a little sly. The totals reveal is a small triumph — let "They match!"
ring. Then the twist: lower, knowing, on "Not that they're true." The error hunt is a detective beat — curious,
unhurried. Checkpoint intro gets fresh energy; read Aman's six transactions at a pace someone can jot down.
**Target:** ~790 words · ~4:50 of speech + pauses, quiz gaps and holds ≈ 5:55 total (plan: ~5:30 + checkpoint)
**Review 2026-10-06 applied:** B7 (Aman's "after A9" balances ON SCREEN before the pause), L11 s3 cue for
Accumulated depreciation in the credit column, L10's Your Turn Q2 now ₹5,000 left → ₹9,000 used.
**Build input:** `vo-segments.json` (final text) + `pauses.json`. This file mirrors it with beat marks.
**Data:** closing balances + TB from `../../data/meeras-chai.json` (₹1,36,000 each side, 19 accounts) and
`../../data/aman-samosa.json` (A10–A15, TB ₹54,000 each side, 14 accounts).
Error scenarios re-derived from the transactions: forget T17 → ₹1,36,000 = ₹1,36,000 · T12 posted to Cash
instead of Bank → ₹1,36,000 = ₹1,36,000 · T6 rent reversed (Dr Cash / Cr Rent) → ₹1,41,000 = ₹1,41,000 ·
T10 posted to Cash only → Dr ₹1,36,000 vs Cr ₹1,41,000 · T6 posted to Salary → ₹1,36,000 = ₹1,36,000.

---

## Line 1 — Cold open: the tower of books (Scene 1)

**Time:** 0:00 – 0:21
**Delivery:** Curious, a touch of comic dread as the pile grows.

    [curious] Twenty transactions. Nineteen accounts. Khata has split into nineteen little books — one for every
    account — and the pile keeps getting taller.
    Meera squints at it. Somewhere in there, did she slip? A wrong side? A missing line?
    She can't re-check every page, every month. [curious] Is there a quicker way to know?

## (Title sting — Scene 1t, 4.6 s, no VO)

    [ON SCREEN: Khata cover — "11 · The Trial Balance"]

## Line 2 — Last time (Scene 2)

**Time:** 0:26 – 0:50
**Delivery:** Brisk and friendly.

    First, last time's answers. One. May's depreciation? One thousand rupees — the same fair slice, every month.
    [PAUSE 0.6s]
    Two. If five thousand rupees of stock were left, she used fourteen thousand minus five — nine thousand.
    [PAUSE 0.6s]
    Three. Paying April's electricity bill in May — is that a May expense? No. It was April's expense.
    Paying it just clears the Electricity payable.

## Line 3 — Building the sheet (Scene 3, worked)

**Time:** 0:50 – 1:40
**Delivery:** Rhythmic on "Left. … Right. …" like dealing cards. The Accumulated depreciation clause is an aside —
light, a finger on one line. Hold the breath before the totals; triumph on "They match!"

    Here's the trick. Every little book hands over just one number — its balance.
    Debit balances go in the left column. Credit balances go in the right.
    Cash — fifty thousand seven hundred, a debit balance. Left.  [SFX: tink_low] [PAUSE 0.4s]
    Capital — fifty thousand, credit. Right.  [SFX: tink_high] [PAUSE 0.4s]
    Equipment, thirty-six thousand. Left. Sales, fifty thousand. Right. And the rest follow, all nineteen.
    [PAUSE 0.5s — montage cascade]
    One to watch: Accumulated depreciation, one thousand — the cart's wear sits on the right, because it takes
    value *off* an asset.
    Now add up each column.
    [PAUSE 1.2s — both totals tick up together]
    [excited] One lakh thirty-six thousand rupees. And… one lakh thirty-six thousand rupees. They match!
    [SFX: ding_yes] [PAUSE 0.8s]
    This one sheet is called a **trial balance**.
    [PAUSE 0.6s]
    Every account, one line each, debits on the left, credits on the right.
    [PAUSE 0.5s]
    It's a quick test of the whole ledger.

## Line 4 — Why it must balance (Scene 4)

**Time:** 1:35 – 1:53
**Delivery:** Simple and satisfying — the "of course" moment.

    Why must the columns match? Because every entry Meera wrote had two equal halves.
    [PAUSE 0.6s]
    Even the Ravi Mama payment — three thousand plus three hundred on the left, three thousand three hundred on the right.
    [PAUSE 0.6s]
    Equal halves go in, so equal totals come out.
    That's why accounting software won't even save an entry whose two sides don't match.

## Line 5 — The trap: three errors that still balance (Scene 5, misconception moment)

**Time:** 1:53 – 2:40
**Delivery:** Voice the trap hopefully; firm "Nope". Each error is a quick, almost comic vignette — "Level. And wrong." deadpan.

    Now here's the trap. It balances — so the books must be right?
    [SFX: stamp_thunk]
    [firmly] Nope. A trial balance only checks that the two sides are equal. Not that they're true.
    [PAUSE 0.7s]
    Here are three mistakes that would still balance.
    One. Forget a transaction completely. Say Meera never wrote down the three thousand she took home.
    Both halves are missing — so the totals still match.
    Two. Right amount, wrong account.
    [PAUSE 0.5s]
    Infotech's four thousand by UPI, written into Cash instead of Bank. Cash too high, Bank too low. Still level.
    Three. Write an entry backwards.
    [PAUSE 0.5s]
    The rent — debit Cash, credit Rent. Both columns grow by the same amount, to one lakh forty-one thousand each.
    [PAUSE 0.6s]
    Level. And wrong.

## Line 6 — One it does catch: the ₹5,000 hunt (Scene 6, faded)

**Time:** 2:41 – 3:24
**Delivery:** Detective. Slow on "Off by exactly five thousand." Hand the hunt to the viewer on "Pause here."

    So what can a trial balance catch? Say Meera paid Gopal Dairy five thousand rupees — but posted only the Cash half.
    Now the columns disagree. One lakh thirty-six thousand on the left. One lakh forty-one thousand on the right.
    Off by exactly five thousand.
    That difference is a clue. Meera looks for April entries of exactly five thousand rupees.
    Pause here. Can you think of two?
    [PAUSE 2.6s — tick_tock]
    The rent, and the payment to Gopal.
    [PAUSE 0.6s]
    The Rent page looks fine. But the Gopal Dairy page still says eight thousand owed.
    The five thousand debit never arrived.
    [PAUSE 0.6s]
    Post it — and the columns meet again.  [SFX: ding_yes]

## Line 7 — Solo (Scene 7)

**Time:** 3:24 – 3:42
**Delivery:** Inviting, then a clean reveal.

    [inviting] Your go. Meera's rent gets posted to Salary by mistake. Would the trial balance catch it?
    [PAUSE 3.2s — tick_tock countdown]
    No. Rent and Salary are both debits, and the amount is the same. The totals don't budge.
    Only careful checking catches that one.

## Line 8 — Recap (Scene 8)

**Time:** 3:43 – 3:59
**Delivery:** Warm summary.

    So — a trial balance lists every account's balance.
    [PAUSE 0.5s]
    Debits left, credits right. If the totals match, every entry had two equal halves.
    [PAUSE 0.5s]
    If they don't, the difference is your clue.
    [PAUSE 0.6s]
    But balanced doesn't always mean correct.

## Line 9 — Your Turn (Scene 9)

**Time:** 3:59 – 4:21
**Delivery:** Inviting; real thinking time after each.

    [inviting] Your turn. Three quick ones.
    One. What are the totals on Meera's trial balance?  [PAUSE 1.8s]
    Two. Can a trial balance catch a transaction that was forgotten completely?  [PAUSE 1.8s]
    Three. Which column does Drawings go in?  [PAUSE 1.8s]
    Answers at the start of the next lesson.

**Answers (for Lesson 12's "Last time"):** 1 — ₹1,36,000 on each side. 2 — No: both halves are missing, so
the totals still match. 3 — Debit (Drawings has a debit balance: ₹3,000 on the left).

## Line 10 — Checkpoint 4: Aman's Samosa Cart (Scene 10)

**Time:** 4:21 – 5:17
**Delivery:** Fresh energy on "Checkpoint four!" Read the six transactions slowly and evenly — the viewer is
writing. Firm, friendly "Pause the video now." Warm on the reveal.

    [excited] And now — Checkpoint four! Aman's samosa cart is back, with six new transactions.
    [PAUSE 0.6s]
    A cash sale of eleven thousand rupees.  [PAUSE 0.4s]
    Three thousand paid to his helper.  [PAUSE 0.4s]
    Fifteen hundred taken home.  [PAUSE 0.4s]
    The school canteen pays its fifteen hundred.  [PAUSE 0.4s]
    A stock count — five hundred rupees of ingredients left, out of three thousand.  [PAUSE 0.4s]
    And a month of wear on his eighteen-thousand-rupee cart and fryer, which should last three years.
    Journal them. Post them to his ledger. Then build Aman's trial balance.
    His balances so far are on screen, and on the worksheet.
    [PAUSE 0.8s — opening-balance strip holds, `Sharma Kirana` visible]
    [firmly] Pause the video now.
    [PAUSE 3.2s — on-screen pause icon, music dips]
    Ready? Both of Aman's columns should total fifty-four thousand rupees.
    [PAUSE 0.8s]
    Pause on this sheet to check every line.
    [PAUSE 0.8s]
    If yours didn't match, use the difference as your clue — just like Meera.

**Answer key (on screen in Scene 10 + worksheet):**
Journal — A10 Cash Dr 11,000 / To Sales 11,000 · A11 Helper wages Dr 3,000 / To Cash 3,000 ·
A12 Drawings Dr 1,500 / To Cash 1,500 · A13 Cash Dr 1,500 / To School canteen 1,500 ·
A14 Ingredients used Dr 2,500 / To Ingredients stock 2,500 · A15 Depreciation Dr 500 / To Accumulated depreciation 500.
Trial balance — **Debit:** Cash 26,000 · Ingredients stock 500 · Cart & fryer 18,000 · Drawings 1,500 ·
Stall rent 2,000 · Helper wages 3,000 · Ingredients used 2,500 · Depreciation 500 = **₹54,000**.
**Credit:** Capital 20,000 · Bank loan 10,000 · Sharma Kirana 1,000 · Advance from customer 1,000 ·
Accumulated depreciation 500 · Sales 21,500 = **₹54,000**. (School canteen ends at ₹0, so it drops off.)
"Balances so far" (after A1–A9) — **on screen** as the opening-balance strip before the pause (bible §2: everything
the challenge needs must be on screen; the worksheet is a backup): Cash 18,000 · School canteen 1,500 ·
Ingredients stock 3,000 · Cart & fryer 18,000 · Bank loan 10,000 · Sharma Kirana 1,000 · Advance from customer 1,000 ·
Capital 20,000 · Sales 10,500 · Stall rent 2,000.

## Line 11 — Next time (Scene 11)

**Time:** 5:17 – 5:31
**Delivery:** Teasing, then a soft, satisfied promise on "This time, we can finally answer."

    [teasing] Next time, we go back to where it all began. Meera, late at night, staring at a galla full of notes.
    Did she make a profit — or a loss? This time, we can finally answer.

## (End card — Scene 12, 12 s, no VO)
