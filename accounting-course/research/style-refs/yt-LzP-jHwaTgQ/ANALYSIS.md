# Reference: "Debit and Credit Explained" — Frappe School, Complete ERPNext Course, Module 3 (2 of 8)

Source: https://www.youtube.com/watch?v=LzP-jHwaTgQ · 13:09 · uploaded 2026-10-03 · talking head + minimal white
slides, no ERPNext screens. Files here: `video.mp4` (720p), `video.description`, `transcript.json` / `transcript.txt`
(ElevenLabs Scribe; YouTube's own subtitle endpoint 429'd), `sheet1.jpg` / `sheet2.jpg` (one frame per 20 s).

## What it teaches (their order)

| t | Beat | Ours |
|---|---|---|
| 0:39 | **What an account is** — line items under the statement categories; "a record that summarises all transactions of one kind" | L2 (jar = account), L9 (ledger page) |
| 2:29 | **Chart of accounts** (COA); ERPNext creates one per country; five top groups A / L / E / I / X | **not in our course** |
| 3:19 | **The four negations, up front:** debit ≠ bad, credit ≠ good, neither = money in/out, neither = plus/minus; blamed on bank SMS | L6 says "credit doesn't mean good" only at the END (s8) |
| 4:29 | **AED-LIC** — Assets, Expenses ↑ = Debit; Liabilities, Income ↑ = Credit; equity "behaves like liabilities, just remember it"; golden rules "not worth it" | L6 derives DEAD CLIC from the equation; L7 bridges the golden rules |
| 5:29 | **Four one-sided drills** ("look at just ONE account and decide the side"): rent ↑ Dr · loan ↑ Cr · sales ↑ Cr · **debtors ↓ Cr ("careful with this one")** | L6 goes straight to two-line entries |
| 7:21 | Double entry; totals match or "it isn't an entry at all, and ERPNext won't accept it"; compound entries (part cash / part credit sale) | L6 s7, L8 T16 |
| 8:37 | **Three steps to write an entry:** which accounts? what kind are they? apply the rule | L3 "which two things changed?" = step 1 only |
| 9:00 | Full entry: sewing machines ₹80,000 by bank transfer → both assets, "swapped money for machine; **not every entry changes what the business is worth — many just change the shape of what it holds**" | L3 s4 "turned cash into a cart" |
| 10:28 | Bank SMS = bank's perspective (deposit is the bank's liability) — then "forget it if it confuses you" | L6 s8 two cameras (stronger) |
| 11:39 | 7-point recap; "if one thing: AED-LIC" | 3 recap tiles |

Running example: **Loomcraft** (garment business), lakh/Indian grouping — same conventions as ours.

## Ideas worth taking

1. **Front-load the four negations** (L6 s3, before the Latin roots): one dub-safe card with four crossed icons —
   thumbs-down ✗, thumbs-up ✗, arrow-in/out ✗, +/− ✗. Costs ~8 s of VO; defuses every wrong prior at once instead of
   only the SMS one at the end.
2. **One-account drills before pairs** (L6 between 4a and 4b, ~30 s): four chips, one account each, "which side?" —
   rent ↑, Ravi Mama's loan ↑, sales ↑, **Infotech receivable ↓**. The decrease case is the one learners miss; ours
   only tests Cash shrinking. Then 4b's T3 pair lands on practised ground.
3. **Three-step checklist as a recurring chip trio** from L6 s9 on, reused in L8 and every checkpoint: two empty
   slots (which accounts?) → family/type medallion (what kind?) → L | R (which side?). Makes "which two things
   changed?" visibly step 1 of 3 and gives the journal lesson a procedure, not just anatomy.
4. **"Changes the shape, not the size"** — one line for L3 s4 (swap on the left) and L14's cycle recap; it names the
   asset-swap pattern memorably and sets up L13 ("same ₹1,06,700, different shelves").
5. **Chart of accounts alias** — one line in L9 s3 when the jars become books: "the list of all your accounts, grouped
   by type — the **chart of accounts**." ERPNext viewers will meet the term on day one; bible §6.11 already allows
   one-line aliases (inventory, COGS).
6. **AED-LIC cross-reference** — one chip in L6 s7 beside DEAD CLIC: "Frappe's ERPNext course says AED-LIC. Same
   homes, different letters." Both courses are Frappe School; viewers will watch both, so the mnemonics should be seen
   to agree, not compete.
7. **"ERPNext won't accept an unbalanced entry"** — a concrete payoff for L11 (why the TB must balance): the software
   enforces it per entry. One clause.

## What NOT to take

- Decree over derivation ("just remember it", "learning those logics is not worth it") — bible §6.3 is the opposite and
  it's our differentiator. Keep the algebra move.
- Walking back the bank explanation ("forget it if it confuses you"). Our two-camera scene is the better teach.
- Text-only slides and a 7-point recap; our three-tile recap and story devices are stronger for this audience.

## Where it lands (status at 2026-10-06)

- L3 (rendered), L6 and L7 (building now, VO locked): ideas 1, 2, 4, 6 need new VO lines → **v2 items** for those
  lessons, not in-flight changes.
- L8, L9, L11 (not built): ideas 3, 5, 7 can go into the scripts now at ~1 line each.
