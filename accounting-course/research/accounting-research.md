# Fundamentals of Accounting: Research and Course Design Recommendations

Course: animated YouTube course, Build With Hussain. 12–15 lessons, about 4–7 min each.
Audience: adults with school-level math and no accounting background (for example, a startup founder).
Goal: understand the accounting equation, the golden rules, double entry, debits and credits, journal → ledger → trial balance → statements, and read a basic P&L and balance sheet.

Research date: 2026-10-05. Investopedia blocks automated fetching, so its URLs are listed as "standard references" and were not re-read for this file.

---

## TL;DR: the decisions

1. **Order: equation first, statements early, mechanics after.** Teach Assets = Liabilities + Equity using only balance-sheet transactions. Then add revenue and expenses as "things that change equity". Then teach debits and credits as left/right *derived from the equation*. Then journal → ledger → trial balance → adjustments → P&L → balance sheet.
2. **Approach: the modern (equation-based) rules are the main method. The Indian golden rules get one dedicated "translation" lesson.** India's own NCERT Class 11 textbook already teaches the equation-based rules. The golden rules give identical entries, and we present them as a second dialect the viewer will hear in offices, on Tally and on YouTube.
3. **Running example: "Meera's Chai".** Meera quits her job and opens a chai stall near an IT park. 20 April transactions plus 3 May transactions, all in round ₹ amounts. Every concept appears in the order the lessons need it. The numbers are checked: trial balance = ₹1,36,000 on both sides, net profit = ₹24,700, total assets = ₹1,06,700.
4. **Pedagogy:** keep a persistent on-screen equation "scale" that updates on every transaction. Use worked example → faded example → "pause and predict" in every lesson, a 30-second spaced recap at the start of each lesson, and balance-sheet-only transactions first (restricted scope).

---

## 1. Essential concepts and teaching order

### 1.1 How popular sources sequence the material

| Source | Sequence (summarised) | Style |
|---|---|---|
| **AccountingCoach** (accounting basics, debits/credits) | Accounts → double entry → debits/credits (left/right) → T-accounts → journal entries → normal balances → revenue/expense → temporary vs permanent accounts → bank-statement confusion. Its accounting-equation lesson uses 8 transactions and puts **balance-sheet-only transactions first (1–4)**, then expenses/revenue (5–8). | Mechanics-first, but with an equation running example |
| **Wharton / Coursera, *Intro to Financial Accounting*** (Brian Bushee) | Wk 1: financial reporting overview → balance sheet equation → A / L / SE → debit-credit bookkeeping (lots of practice), start-up company case. Wk 2: accrual accounting, income statement, adjusting entries. Wk 3: cash flows. Wk 4: ratios. | Equation → mechanics → accrual. One start-up case from first transaction to first statements. |
| **Mike Piper, *Accounting Made Simple*** | Accounting equation → balance sheet → income statement → retained earnings → cash flow statement → GAAP → **debits and credits (ch. 8)** → cash vs accrual → depreciation → amortisation → inventory/COGS. | Statements-first. Debits/credits only after the reader knows where entries end up. |
| **Corporate Finance Institute, Accounting Fundamentals** | Intro → balance sheet → income statement → cash flow statement → summary. Records transactions straight into the statements. | User/statement-first, little bookkeeping |
| **Khan Academy (Finance & Capital Markets, Unit 5)** | Cash vs accrual accounting (catering-business example) → three core statements (balance sheet ↔ income statement relationship, basic cash flow) → depreciation and amortisation. | Intuition and statements. No debits/credits. |
| **Bench / Xero / QuickBooks guides** | Buckets analogy → debits/credits by account type (Xero: "EA" vs "LER") → accounting cycle (identify → journal → ledger → unadjusted TB → adjustments → statements → close). | Practitioner and small-business framing |
| **ClearTax / Tally / Indian B.Com and coaching** | Classify accounts (Personal / Real / Nominal) → golden rules → journal → ledger → trial balance → final accounts (Trading A/c, P&L A/c, Balance Sheet). | Traditional (British) approach |
| **NCERT Class 11 Accountancy, Ch. 3** | Accounting equation → rules of debit and credit in equation form ("Increase in Assets, Expenses or losses is debited… For Liabilities/Capital/Revenues or Gains, the increase is credited") → journal → ledger. | **Modern approach, in India's own school textbook** |
| ***The Accounting Game*** (Mullis & Orloff) | One lemonade stand from ch. 1: cash, original investment, assets, liabilities, notes payable, owner's equity, balance sheet, inventory, earnings, expenses. | Narrative running example, gamified |

**What these sources agree on:**
- Every rigorous source starts with **the accounting equation / balance sheet**. Only the Indian traditional path starts with account classification and golden rules.
- The best-loved beginner resources (Piper, *The Accounting Game*, Khan) show **statements early** so the learner knows where the work ends up. Debits and credits come later.
- AccountingCoach, Wharton and Phillips & Heiser's experiment (section 4) all introduce **balance-sheet-only transactions before revenue and expense ones**.

### 1.2 Essential concept list (beginner scope only)

Must-have:
1. The business is separate from the owner (business entity concept)
2. Assets, liabilities, equity (capital)
3. The accounting equation A = L + E, and the dual aspect: every transaction has two effects
4. Revenue (income) and expenses. Profit = revenue − expenses, and profit raises equity.
5. Drawings (the owner takes money out), which is **not** an expense
6. Accrual vs cash basis. Profit ≠ cash. Receivables (debtors), payables (creditors), customer advances (unearned revenue).
7. Debits and credits = left and right. Normal balances. DEALER.
8. Golden rules (Personal / Real / Nominal), mapped to the above
9. Journal entries, including one compound entry
10. Ledger / T-accounts, posting and balancing
11. Trial balance, and the errors it cannot catch
12. Month-end adjustments: outstanding expense, stock used (cost of goods), depreciation
13. Profit & Loss statement: build it and read it
14. Balance sheet: build it, read it, and see how the P&L feeds equity

Deliberately excluded: GST/tax entries, closing entries in depth, cash flow statement preparation (only a "where did the cash go" summary), ratios, bad debts, provisions, partnership/company accounts, inventory valuation methods, bank reconciliation.

### 1.3 Recommended lesson order (14 lessons)

| # | Lesson | Core idea | Meera's Chai transactions |
|---|---|---|---|
| 1 | **Why accounting? The language of business** | Two questions every owner asks: *Am I making money?* and *What do I own and owe?* Meera and "Meera's Chai" are two separate characters. | Setup |
| 2 | **Assets, liabilities, equity** | What the business has = what it owes + what belongs to the owner | T1, T2 |
| 3 | **The equation always balances** | Balance scale. Every transaction has two effects ("where did it come from, where did it go"). Asset swaps. Buying on credit. | T3, T4, T5 |
| 4 | **Revenue and expenses: how profit is made** | Revenue raises equity, expenses lower it. Profit is the change in equity from operations. | T6, T7 |
| 5 | **Profit is not cash** | Credit sales, collecting money, paying a supplier, customer advances. Accrual vs cash basis. | T8–T12 |
| 6 | **Debits and credits are just left and right** | Why debit increases assets (assets sit on the left of the equation). The expanded equation. DEALER. The bank-statement myth. | Re-run T1–T12 as Dr/Cr |
| 7 | **The golden rules, decoded** | Personal / Real / Nominal mapped onto the equation. Same entries, two dialects. | T1–T12 table |
| 8 | **The journal** | Date, Dr line, "To" Cr line, narration. Compound entries. | T13–T17 (T16 is compound) |
| 9 | **The ledger (khata) and T-accounts** | Posting, balancing an account, carrying down a balance | Post T1–T17 |
| 10 | **Month-end adjustments** | Unpaid bills. "Assets that get used up become expenses": stock used and depreciation. | T18, T19, T20 |
| 11 | **The trial balance** | Debits = credits ₹1,36,000. What it cannot catch. | All 20 |
| 12 | **The Profit & Loss statement** | Build Meera's April P&L and read it top to bottom | All 20 |
| 13 | **The balance sheet** | Build and read it. Profit flows into equity. Opening/closing equity. | All 20 |
| 14 | **Putting it together** | Profit ₹24,700 vs cash: where did the money go? Read a real (simplified) P&L and balance sheet. Recap of the whole cycle. May preview (T21–T23). | T21–T23 |

Optional 15th lesson: "Reading a real company's statements", using a simplified listed-company P&L (for example, a chai chain such as Chai Point) to practise reading line items.

Why trial balance comes after adjustments (lesson 10 before 11): for beginners, one trial balance after adjustments is simpler than unadjusted TB → adjustments → adjusted TB. Mention in one line that real accountants run it before and after. To match the textbook order, swap lessons 10 and 11.

---

## 2. Golden rules vs the modern approach, and the bridge strategy

### 2.1 The two systems

**Traditional / British / "golden rules"** (ClearTax, Tally, most Indian coaching and B.Com):

| Account type | What it covers | Rule |
|---|---|---|
| **Personal** | People and entities. Natural (Meera, a supplier), artificial (a bank, a company), representative (outstanding salary, prepaid rent, advance from customer). Capital and drawings are personal (the owner's account). | **Debit the receiver, credit the giver** |
| **Real** | Assets: tangible (cash, machinery, stock) and intangible (goodwill, patents) | **Debit what comes in, credit what goes out** |
| **Nominal** | Expenses, losses, incomes, gains | **Debit all expenses and losses, credit all incomes and gains** |

**Modern / American / accounting-equation approach** (NCERT Class 11, AccountingCoach, Xero, Bench, all ERP/accounting software):
- Assets, Expenses, Drawings: increase = **Debit**, decrease = Credit
- Liabilities, Capital/Equity, Revenue: increase = **Credit**, decrease = Debit
- Mnemonics: **DEALER** (Dividends/Drawings, Expenses, Assets | Liabilities, Equity, Revenue). **DEAD CLIC** (Debits increase Expenses, Assets, Drawings | Credits increase Liabilities, Income, Capital). AccountingCoach uses **DEAL / GIRLS**.

Both systems always produce **identical journal entries**. Indian sources say this too: "two roads to the same destination".

### 2.2 Which is easier for beginners? The modern approach.

1. **It follows from one idea.** Once the viewer has A = L + E on a scale, "debit = left side grows" is close to obvious. The golden rules need three rules plus a classification step first, and classification is where beginners guess. Indian guides admit this: "most students can memorise the three golden rules, but the real problem starts when a transaction is placed in front of them… that is where guessing begins."
2. **The classification is genuinely ambiguous.** Bank account is Personal (artificial), not Real. Outstanding salary is Personal (representative). Goodwill is Real. Capital and drawings are Personal. Indian websites in our own search results contradict each other on whether a bank account is Real or Personal.
3. **It connects to the statements.** The five modern categories *are* the balance sheet and P&L line groups. The traditional categories do not map onto the statements.
4. **India's school system already teaches it.** NCERT Class 11 Ch. 3 states the rules in equation form. Global qualifications (ACCA, CPA) and all accounting software use it.
5. **Research:** Phillips & Heiser (2011) found that students journalised better when they explicitly considered accounting-equation effects. The benefit faded after a week if the habit was not kept up, which argues for keeping the equation visible throughout the course.

### 2.3 Bridge strategy (lesson 7, "The golden rules, decoded")

The framing to use: *"You'll hear 'debit the receiver, credit the giver' everywhere in India: in Tally tutorials, from your CA, in interviews. It's not a different system. It's the same entries in a different dialect. Here's the translation."*

**Translation table (put this on screen):**

| Golden rule | Equation translation | Why it works |
|---|---|---|
| Real: *debit what comes in, credit what goes out* | Asset ↑ = Dr, Asset ↓ = Cr | Assets live on the left. Something coming in grows the left. |
| Personal: *debit the receiver* | If a person receives from us, they now owe us (receivable ↑, an asset) or we owe them less (payable ↓) → Dr | Receiving from the business creates or settles a claim |
| Personal: *credit the giver* | If a person gives to us (lends, supplies on credit, invests capital), we now owe them (liability ↑ or capital ↑) → Cr | Givers become claimants on the right side |
| Nominal: *debit expenses and losses* | Expenses reduce equity → Dr (the opposite of equity's credit side) | Expense = equity leaking out |
| Nominal: *credit incomes and gains* | Income increases equity → Cr | Income = equity growing |

**Teaching technique:** run the same 5–6 Meera transactions through both methods side by side (split screen). Show that the Dr/Cr lines match exactly, with a satisfying "match" animation. Then give the viewer a one-screen cheat-sheet:
- Real ≈ Assets
- Personal ≈ people and institutions = receivables, payables, loans, bank, **capital, drawings**, outstanding/prepaid/advance items
- Nominal ≈ Revenue and Expenses (the P&L)

**Indian heritage hook** (optional 20s cold open for lesson 7 or 9): Indian merchants kept double-entry books (*bahi-khata*, with *rojmel*/day-book ≈ journal and *khata* ≈ ledger) using **naam (debit)** and **jama (credit)**. Claims that this predates Pacioli's 1494 *Summa* are popular but historically contested, so say "Indian traders have kept double-entry books for centuries" and do not claim it came first. This also explains why "khata" is still the everyday word for an account.

**Where to put lesson 7:** directly after the Dr/Cr lesson (6) and before the journal (8). Viewers then see the journal format with both vocabularies available. In later lessons, add a small "golden-rule tag" on each journal line (`Real – comes in`, `Personal – giver`) so the dialect is reinforced without extra screen time.

---

## 3. Common beginner misconceptions and how to fix them

| # | Misconception | Why it happens | Fix in the course | Source |
|---|---|---|---|---|
| 1 | **"Credit = money in / good, debit = money out / bad"** | Bank statements and bank SMS ("Your a/c XX12 is debited ₹500") use the *bank's* books. Your deposit is a **liability** for the bank, so the bank credits it. | Lesson 6: show the same ₹15,000 deposit (T8) from two cameras. In Meera's books, Bank (an asset) is debited. In the bank's books, "Meera's Chai deposit" (a liability) is credited. "Same money, opposite books." | AccountingCoach; Xero; LegalClarity |
| 2 | **"Debit always means increase"** | Overgeneralising from assets | Expanded equation with two sides. DEALER. A credit to a loan account *increases* it (Bench's loan example). | Bench; accountingforeveryone |
| 3 | **"Profit = cash in the bank"** | Everyday intuition. Most small businesses think in cash. | Lesson 5 and lesson 14: Meera's profit is ₹24,700, but operating cash is only ₹23,700, and her cash box plus bank holds ₹61,700 because it includes her uncle's loan and her own capital. Show the reconciliation. | AccountingTools ("How a profitable business can run out of cash"); Khan Academy cash vs accrual |
| 4 | **"Revenue = cash received" and "an advance is income"** | Cash arrives, so it feels earned | T11: the ₹4,000 advance is a **liability** until the May event (T21). T9/T14: credit sales are revenue with no cash yet. | HubiFi; Farseer |
| 5 | **"Paying a supplier, or repaying loan principal, is an expense"** / **"a loan received is income"** | Every cash outflow feels like an expense | T10 and T16: only the ₹300 interest is an expense. The ₹3,000 principal just reduces a liability. T2: the loan raises cash *and* a liability. Equity does not move. | Brecken Business Solutions; AccountingCoach (equation) |
| 6 | **"Drawings are an expense" / "the business's money is my money"** | Owner and business feel like one entity | Lesson 1: Meera and Meera's Chai are drawn as two separate characters. T17: drawings reduce equity, never touch the P&L. | Brecken; guru99 |
| 7 | **"Buying equipment is an expense"** | Cash left the business | T3 is an asset swap: cash becomes a cart. The expense arrives slowly as depreciation (T20). | AccountingCoach |
| 8 | **"Depreciation = the market value drop" / "depreciation is cash set aside"** | Everyday meaning of "depreciation" (car resale value). Casson's study found most first-year students held this naïve view and had memorised a ritual definition. | Teach it as *spreading the cost* of the cart over the months it helps earn money (₹36,000 ÷ 36 months = ₹1,000/month). No cash moves. Pair it with stock used (T19): "assets that get used up become expenses." | Casson (2018), *Depreciation: A Threshold Concept in Accounting Education*, Univ. of Kent |
| 9 | **"Equity / retained earnings = cash the owner has"** | It is labelled "owner's", so it feels like money | Equity is a *claim*, not a pile of cash. On Meera's balance sheet, equity is ₹71,700 but her cash and bank total ₹61,700. | Pearson (retained earnings) |
| 10 | **"Liabilities are bad"** | Debt-averse culture | Liabilities are just *other people's money in your business*. The supplier credit and the customer advance both helped Meera. | — |
| 11 | **"If the trial balance tallies, the books are correct"** | It is called a "check" | Show 3 errors that still balance: omission, wrong account (rent posted to salary), reversed entry. | QuickBooks accounting cycle |
| 12 | **Memorising rules instead of understanding** | The traditional teaching style | Lucas & Mladenovic: students treat accounting as procedures to memorise, which leads to shallow learning and poor transfer. Always ask "which two things changed?" before naming Dr/Cr. | Lucas & Mladenovic (2006, 2009) |
| 13 | **Golden-rule classification errors** (bank = Real?, capital = Real?) | Ambiguous categories | Cheat-sheet in lesson 7. Classify by asking "is it a person/institution, a thing, or an income/expense?" | busy.in; Tally |

**Threshold concepts** (Meyer & Land, applied to accounting by Lucas & Mladenovic, and by Casson for depreciation): **double entry, accruals (profit ≠ cash) and depreciation** are transformative but troublesome. Give each one its own lesson (3, 5, 10) and revisit it at least twice.

---

## 4. Pedagogy: what the evidence and the best teachers do

### 4.1 Analogies that work (and how to animate them)

| Analogy | Use for | Animation idea |
|---|---|---|
| **Balance scale / seesaw** | A = L + E always balances | A persistent scale HUD in the corner. Assets on the left pan, L + E on the right. It tilts and then settles on every transaction. |
| **"Where did it come from? Where did it go?"** | Dual aspect. Right side = *sources* of money (owner, lenders, suppliers, profits). Left side = *what the money became* (cash, cart, stock, money owed by customers). | Coins fly from a labelled source into a labelled asset |
| **Buckets** (Bench) | Accounts as containers. Transactions move value between buckets. | Each account is a glass jar or *galla* (cash box). The T-account appears as the jar's "receipt". |
| **Two characters: Meera and "Meera's Chai"** | Business entity concept, capital, drawings | Meera hands money across the counter to the stall (capital) and takes some back (drawings) |
| **Left and right only** (AccountingCoach: "Debit means left. Credit means right.") | Stripping the everyday meaning off Dr/Cr | Dr/Cr labels slide to the left/right of a T. Words like "good" and "bad" get crossed out. |
| **Two cameras on one deposit** | The bank-statement myth | Split screen: Meera's khata vs the bank's ledger |
| **"Used-up assets become expenses"** | Stock used and depreciation, as one idea | The cart's value drains ₹1,000 a month into an expense jar. Stock jar contents drain into "cost of supplies used". |
| **Khata / bahi-khata** | Ledger, naam/jama | A red cloth-bound bahi-khata opens to a T-account page |

### 4.2 Evidence-based teaching moves

1. **Restricted scope first (scaffolding).** Phillips & Heiser (2011, *Issues in Accounting Education* 26(4)), a field experiment: students first given only balance-sheet transactions journalised better, and that early success carried over to harder transactions that included revenue and expenses. Considering equation effects helped at first but faded within a week. → Lessons 2–3 use only balance-sheet transactions, and the equation HUD stays on screen for the whole course.
2. **Worked examples beat problem solving for novices.** Halabi, Tuovinen & Farley (2005, *Issues in Accounting Education* 20(1)) found worked examples more efficient than problem-solving exercises for students with no prior accounting knowledge. → Every new transaction type is first shown fully worked.
3. **Faded examples.** Renkl & Atkinson (2003) and Renkl, Atkinson & Maier (2000): a full example, then one step blanked, then more steps blanked, until the learner solves alone. This beats worked-example/practice pairs. → Per lesson: (a) full worked example, (b) the same type with the credit side blanked ("pause, which account is credited?"), (c) a fresh transaction to do alone, with the answer revealed.
4. **Retrieval practice and spacing** are rated the two highest-utility techniques by Dunlosky et al. (2013, *Psychological Science in the Public Interest*). → Open each lesson with a 30-second "recall" of the previous lesson's transaction. Interleave old transaction types into new lessons (T13 cash sales repeats T7, T14 credit sale repeats T9). Give a downloadable practice sheet and a pinned-comment quiz.
5. **Integrated text and diagram (avoid split attention).** A study in the *Journal of Accounting and Taxation* found that integrating text and diagrams for the accounting equation improved recall and transfer over separated formats. → Put labels *on* the jars and arrows, never in a legend. Show numbers next to the account they change.
6. **Zone of Proximal Development.** Each lesson adds **one** new idea on top of mastered ones. The running business supplies the familiar context, so working memory goes to the new concept.
7. **Pause-and-predict.** Before each transaction's effects are revealed, show the question "Which two things changed?" for about 2 seconds. This is cheap retrieval and produces prediction-error learning.
8. **Teaching approach does not change long-run outcomes much.** Chiang, Nouri & Samanta (2014, *Accounting Education* 23(1)) found no difference in later finance grades between user-approach and preparer-approach students. So we can lean on intuition and statements without hurting rigour.

### 4.3 Narrative approach

*The Accounting Game* (lemonade stand), Wharton (one start-up case) and the AccountingCoach running company all use **one business across the whole course**. Do the same. Meera's month is the spine. Each lesson is "the next few days of April". The finale is her first month-end close, where she finds out whether she made money.

---

## 5. Running example: "Meera's Chai"

### 5.1 Why a chai stall

- Instantly relatable in India. Globally readable as "a small tea café".
- It naturally produces **every** beginner transaction: owner capital, a family loan (an authentic Indian *mama-ji* loan, which also gives a perfect "credit the giver" personal account), equipment, raw-material stock, **monthly credit tabs with a nearby office** (a real practice for office chai vendors), **supplier credit from a dairy** (also real), a catering advance, rent for the stall spot, a helper's salary, an electricity bill, UPI receipts into the bank, and owner drawings.
- Small round numbers in ₹. All amounts stay below ₹1,00,000 per line to avoid the lakh vs hundred-thousand comma confusion for global viewers. Only the TB total (₹1,36,000) and total assets (₹1,06,700) cross it. Write those as "₹1.36 lakh (136,000)", or scale everything ÷10 if you prefer.
- April = start of the Indian financial year. That is a nice touch for Indian viewers and neutral for others.

**Cast:** Meera (owner), Ravi Mama (uncle, lender), Gopal Dairy (supplier), Infotech office (credit customer), Raju (helper).

**Simplification choices (state these once, on screen):**
- Stock of tea leaves, milk and sugar is recorded as an asset (**Stock**). At month end she counts what is left and the used part becomes an expense. This one adjusting entry teaches matching and pairs with depreciation. Indian textbooks use a "Purchases A/c + closing stock" method instead. Mention it in one line.
- Equipment depreciates straight-line: ₹36,000 over 3 years with no scrap value = ₹1,000/month, credited to Accumulated Depreciation (shown on the balance sheet as "Equipment 36,000 less depreciation 1,000 = 35,000").
- No GST.

### 5.2 Transactions (April)

Phase A, balance sheet only (lessons 2–3):

| # | Date | Transaction | Debit | Credit | Concept introduced | Golden-rule tag |
|---|---|---|---|---|---|---|
| T1 | Apr 1 | Meera puts ₹50,000 of her savings into the stall's cash box | Cash 50,000 | Capital 50,000 | Entity concept, capital, the equation | Cash: Real, comes in. Capital: Personal (Meera), giver. |
| T2 | Apr 1 | Ravi Mama lends ₹30,000 (₹3,000 principal + 1%/month interest to be repaid each month) | Cash 30,000 | Loan from Ravi Mama 30,000 | Liability | Real, comes in / Personal, giver |
| T3 | Apr 2 | Buys a cart, stove, kettles and glasses for ₹36,000 cash | Equipment 36,000 | Cash 36,000 | Asset swap. Not an expense. | Real in / Real out |
| T4 | Apr 2 | Buys tea, milk and sugar stock for ₹6,000 cash | Stock 6,000 | Cash 6,000 | Inventory (stock) | Real in / Real out |
| T5 | Apr 3 | Buys ₹8,000 more stock **on credit** from Gopal Dairy | Stock 8,000 | Gopal Dairy (payable) 8,000 | Buying on credit, creditor | Real in / Personal, giver |

Checkpoint after T5: Assets 88,000 (Cash 38,000 + Equipment 36,000 + Stock 14,000) = Liabilities 38,000 (Loan 30,000 + Gopal 8,000) + Capital 50,000. ✔

Phase B, revenue, expenses, profit ≠ cash (lessons 4–5):

| # | Date | Transaction | Debit | Credit | Concept introduced | Golden-rule tag |
|---|---|---|---|---|---|---|
| T6 | Apr 5 | Pays April rent for the stall spot, ₹5,000 cash | Rent expense 5,000 | Cash 5,000 | Expense reduces equity | Nominal, expense / Real out |
| T7 | Apr 15 | Cash sales for Apr 1–15: ₹18,000 | Cash 18,000 | Sales 18,000 | Revenue increases equity | Real in / Nominal, income |
| T8 | Apr 15 | Deposits ₹15,000 of cash takings in the bank | Bank 15,000 | Cash 15,000 | Asset-to-asset. The bank-statement "credit" myth (lesson 6). | Personal (bank), receiver / Real out |
| T9 | Apr 16 | Bills Infotech office ₹6,000 for chai supplied Apr 1–15 **on credit** | Infotech (receivable) 6,000 | Sales 6,000 | Credit sale. Revenue without cash. Debtor. | Personal, receiver / Nominal, income |
| T10 | Apr 20 | Pays Gopal Dairy ₹5,000 of the ₹8,000 owed | Gopal Dairy 5,000 | Cash 5,000 | Paying a liability is **not** an expense | Personal, receiver / Real out |
| T11 | Apr 22 | Receives a ₹4,000 cash **advance** to cater an office event on May 5 | Cash 4,000 | Advance from customer 4,000 | Cash ≠ revenue. Unearned revenue is a liability. | Real in / Personal (representative), giver |
| T12 | Apr 25 | Infotech pays ₹4,000 of its bill by UPI (into the bank) | Bank 4,000 | Infotech 4,000 | Collecting a receivable is **not** revenue | Personal receiver / Personal giver |

Phase C, recording more (lessons 8–9, practice and interleaving):

| # | Date | Transaction | Debit | Credit | Concept introduced | Golden-rule tag |
|---|---|---|---|---|---|---|
| T13 | Apr 30 | Cash sales for Apr 16–30: ₹22,000 | Cash 22,000 | Sales 22,000 | Spaced repeat of T7 | Real in / Nominal income |
| T14 | Apr 30 | Bills Infotech ₹4,000 for Apr 16–30 on credit | Infotech 4,000 | Sales 4,000 | Spaced repeat of T9 | Personal receiver / Nominal income |
| T15 | Apr 30 | Pays Raju's salary ₹8,000 by UPI from the bank | Salary expense 8,000 | Bank 8,000 | Expense paid from the bank | Nominal expense / Personal (bank) giver |
| T16 | Apr 30 | Pays Ravi Mama ₹3,300 cash: ₹3,000 principal + ₹300 interest | Loan 3,000 + Interest expense 300 | Cash 3,300 | **Compound entry.** Only interest is an expense. | Personal receiver + Nominal expense / Real out |
| T17 | Apr 30 | Meera takes ₹3,000 cash home for household use | Drawings 3,000 | Cash 3,000 | Drawings ≠ expense | Personal (Meera), receiver / Real out |

Phase D, month-end adjustments (lesson 10):

| # | Date | Transaction | Debit | Credit | Concept introduced | Golden-rule tag |
|---|---|---|---|---|---|---|
| T18 | Apr 30 | April electricity bill ₹1,000 arrives, to be paid in May | Electricity expense 1,000 | Electricity payable (outstanding) 1,000 | Accrual: expense incurred but unpaid | Nominal expense / Personal (representative) giver |
| T19 | Apr 30 | Stock count: ₹4,000 left, so ₹10,000 of the ₹14,000 was used | Cost of supplies used 10,000 | Stock 10,000 | Matching. Used-up assets become expenses. | Nominal expense / Real out |
| T20 | Apr 30 | Depreciation on equipment: ₹36,000 ÷ 36 months | Depreciation 1,000 | Accumulated depreciation 1,000 | Depreciation = spreading cost, non-cash | Nominal (loss) / Real out (value) |

May preview (lesson 14):

| # | Date | Transaction | Debit | Credit | Concept |
|---|---|---|---|---|---|
| T21 | May 5 | Caters the office event: the advance is now earned | Advance from customer 4,000 | Catering revenue 4,000 | Unearned → earned |
| T22 | May 8 | Pays April's electricity bill | Electricity payable 1,000 | Cash 1,000 | Paying an accrual is not an expense (it was April's) |
| T23 | May 10 | Infotech clears its ₹6,000 balance by UPI | Bank 6,000 | Infotech 6,000 | Receivable → cash |

### 5.3 April results (all figures verified)

**Closing ledger balances:** Cash 50,700 · Bank 11,000 · Infotech (receivable) 6,000 · Stock 4,000 · Equipment 36,000 · Accumulated depreciation 1,000 · Loan from Ravi Mama 27,000 · Gopal Dairy 3,000 · Advance from customer 4,000 · Electricity payable 1,000 · Capital 50,000 · Drawings 3,000 · Sales 50,000 · Rent 5,000 · Salary 8,000 · Interest 300 · Electricity 1,000 · Cost of supplies used 10,000 · Depreciation 1,000.

**Trial balance, 30 April**

| Debit balances | ₹ | Credit balances | ₹ |
|---|---|---|---|
| Cash | 50,700 | Capital | 50,000 |
| Bank | 11,000 | Loan from Ravi Mama | 27,000 |
| Infotech (receivable) | 6,000 | Gopal Dairy (payable) | 3,000 |
| Stock | 4,000 | Advance from customer | 4,000 |
| Equipment | 36,000 | Electricity payable | 1,000 |
| Drawings | 3,000 | Accumulated depreciation | 1,000 |
| Rent | 5,000 | Sales | 50,000 |
| Salary | 8,000 | | |
| Interest | 300 | | |
| Electricity | 1,000 | | |
| Cost of supplies used | 10,000 | | |
| Depreciation | 1,000 | | |
| **Total** | **1,36,000** | **Total** | **1,36,000** |

**Profit & Loss, April**

| | ₹ |
|---|---|
| Sales (cash 40,000 + credit 10,000) | 50,000 |
| Less: Cost of supplies used | (10,000) |
| **Gross profit** | **40,000** |
| Rent | (5,000) |
| Salary | (8,000) |
| Electricity | (1,000) |
| Depreciation | (1,000) |
| Interest | (300) |
| **Net profit** | **24,700** |

**Balance sheet, 30 April**

| Assets | ₹ | Liabilities & Equity | ₹ |
|---|---|---|---|
| Equipment 36,000 − acc. depreciation 1,000 | 35,000 | Loan from Ravi Mama | 27,000 |
| Stock | 4,000 | Gopal Dairy | 3,000 |
| Infotech (receivable) | 6,000 | Advance from customer | 4,000 |
| Bank | 11,000 | Electricity payable | 1,000 |
| Cash | 50,700 | **Total liabilities** | **35,000** |
| | | Capital 50,000 + profit 24,700 − drawings 3,000 | 71,700 |
| **Total** | **1,06,700** | **Total** | **1,06,700** |

**"Profit is not cash" reconciliation (lesson 14):**
- Net profit 24,700 + depreciation 1,000 (non-cash) − extra cash paid for stock beyond what was used 1,000 (paid 6,000 + 5,000 = 11,000, used 10,000) − receivable still owed 6,000 + advance received early 4,000 + electricity unpaid 1,000 = **operating cash 23,700**
- Equipment bought: −36,000
- Capital in +50,000, loan in +30,000, loan principal repaid −3,000, drawings −3,000 = +74,000
- Net cash change = 23,700 − 36,000 + 74,000 = **61,700 = Cash 50,700 + Bank 11,000** ✔

Hook line for lesson 14: *"Meera has ₹61,700 in her galla and bank. Is she rich? Only ₹24,700 of it is profit, and ₹6,000 of her profit is still sitting with Infotech."*

---

## 6. Sources

### Curriculum and sequencing
- AccountingCoach, Accounting Basics: https://www.accountingcoach.com/accounting-basics/explanation
- AccountingCoach, Debits and Credits (left/right, DEAL/GIRLS, bank-statement section): https://www.accountingcoach.com/debits-and-credits/explanation
- AccountingCoach, Accounting Equation (8-transaction running example, balance-sheet-first): https://www.accountingcoach.com/accounting-equation/explanation
- Wharton / Coursera, Introduction to Financial Accounting: https://www.coursera.org/learn/wharton-accounting
- Corporate Finance Institute, Accounting Fundamentals (via Coursera): https://www.coursera.org/learn/learn-accounting-fundamentals-corporate-finance
- Khan Academy, Accounting and financial statements: https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme
- Khan Academy, Comparing accrual and cash accounting: https://www.khanacademy.org/v/comparing-accrual-and-cash-accounting
- Khan Academy, Balance sheet and income statement relationship: https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme/financial-statements-tutorial/v/balance-sheet-and-income-statement-relationship
- Mike Piper, *Accounting Made Simple* (contents): https://openlibrary.org/books/OL27176636M/Accounting_made_simple · https://www.bookey.app/book/accounting-made-simple
- Mullis & Orloff, *The Accounting Game: Basic Accounting Fresh from the Lemonade Stand*: https://www.goodreads.com/book/show/420846.Accounting_Game
- Bench, Debits vs Credits (buckets): https://www.bench.co/blog/bookkeeping/debits-credits
- Bench, Double-entry accounting: https://www.bench.co/blog/accounting/double-entry-accounting
- Bench, Accounting cycle: https://www.bench.co/blog/accounting/accounting-cycle
- Xero, Debits and credits: https://www.xero.com/us/guides/debits-and-credits/
- QuickBooks, The 8-step accounting cycle: https://quickbooks.intuit.com/r/bookkeeping/accounting-cycle/
- QuickBooks, Accounting 101: https://quickbooks.intuit.com/r/accounting/101/
- Investopedia (standard references, not fetched): https://www.investopedia.com/terms/a/accounting-equation.asp · https://www.investopedia.com/terms/d/double-entry.asp

### Indian / golden rules
- ClearTax, Golden Rules of Accounting: https://cleartax.in/s/accounting-golden-rules
- Tally Solutions, Golden Rules of Accounting: https://tallysolutions.com/accounting/golden-rules-of-accounting/
- Busy, Golden Rules (modern = six account types): https://busy.in/accounting/golden-rules-of-accounting/
- NCERT Class 11 Accountancy Ch. 3 (modern rules), via BYJU'S solutions: https://byjus.com/ncert-solutions-class-11-accountancy-chapter-3-recording-of-transactions-1/
- Traditional vs modern approach: https://www.vedantu.com/commerce/modern-approach-of-classification · https://cadeveshthakur.com/rules-of-debit-and-credit-traditional-approach-vs-modern-approach/ · https://www.toppr.com/guides/fundamentals-of-accounting/accounting-process/accounting-process/
- Tea-stall accounting example (precedent): https://help.techoerp.in/accounts/accounting-entries
- Bahi-khata / Desi Namu: https://en.wikipedia.org/wiki/Desi_Namu · https://taxone.vyapar.com/post/history-of-accounting-in-india

### Mnemonics and history
- DEALER: https://netsuite.blog/accounting-acronym-dealer-guide
- DEAD CLIC: https://www.learnsignal.com/blog/double-entry-bookkeeping-deadclic/
- Debits and credits (history, debere/credere, Pacioli): https://en.wikipedia.org/wiki/Debits_and_credits

### Misconceptions
- Bank credit vs accounting credit: https://legalclarity.org/what-does-it-mean-to-credit-an-account-banking-vs-accounting/
- Profit vs cash: https://www.accountingtools.com/articles/how-a-profitable-business-can-run-out-of-cash
- Unearned revenue is a liability: https://www.hubifi.com/blog/is-unearned-revenue-liability · https://www.farseer.com/blog/unearned-revenue/
- Owner's draw is not an expense: https://www.breckenbusinesssolutions.com/blog/what-owners-draw-really-does-to-your-financial-statements
- Debit/credit myths: https://accountingforeveryone.com/debits-vs-credits-the-students-ultimate-guide/
- Casson (2018), *Depreciation: A Threshold Concept in Accounting Education*, Univ. of Kent: https://kar.kent.ac.uk/82164/

### Pedagogy research
- Phillips & Heiser (2011), "A Field Experiment Examining the Effects of Accounting Equation Emphasis and Transaction Scope on Students Learning to Journalize", *Issues in Accounting Education* 26(4): https://publications.aaahq.org/iae/article-abstract/26/4/681/7824/
- Halabi, Tuovinen & Farley (2005), worked examples vs problem solving in accounting, *Issues in Accounting Education* 20(1). Summary in: https://www.researchgate.net/publication/317778860_Accounting_education_A_cognitive_load_theory_perspective
- Renkl & Atkinson, fading worked solution steps: https://www.researchgate.net/publication/2398854_From_Studying_Examples_to_Solving_Problems_Fading_Worked-Out_Solution_Steps_Helps_Learning
- Dunlosky et al. (2013), Improving Students' Learning With Effective Learning Techniques: https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
- Chiang, Nouri & Samanta (2014), user vs preparer approach, *Accounting Education* 23(1): https://ideas.repec.org/a/taf/accted/v23y2014i1p42-53.html
- Integrated text/diagram for the accounting equation, *Journal of Accounting and Taxation*: https://academicjournals.org/journal/JAT/article-abstract/91C432955386
- Threshold concepts (overview): https://en.wikipedia.org/wiki/Threshold_knowledge
