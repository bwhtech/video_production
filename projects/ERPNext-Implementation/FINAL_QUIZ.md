# Final quiz — ERPNext Implementation Guide

One quiz at the end of the course (after "Ready to Go Live!"). 15 questions, 1 mark each. Suggested settings: passing 70%, 3 attempts, show answers after submission, shuffle questions.

Two question types, mapped to LMS Question:
- **Single** — type Choices, one correct option.
- **Multi** — type Choices with *Multiple* enabled; every correct option must be selected.

✅ = correct option. Indented italics under an option = the explanation shown for that option.

---

### 1. Which of these accounts should receive an opening balance on go-live day? — **Multi**
- ✅ Citibank (bank account)
    *Balance sheet asset. Opening balance required.*
- ✅ Retained Earnings
    *Equity, balance sheet side. Carries last year's accumulated profit.*
- Sales (income)
    *P&L account. Income starts from zero in the new period.*
- Cost of Goods Sold
    *P&L account. No opening balance.*
- ✅ Secured Loans
    *Balance sheet liability. Opening balance required.*

---

### 2. Which tool creates the opening balances for receivables and payables? — **Single**
- Journal Entry
- Stock Reconciliation
- ✅ Opening Invoice Creation Tool
    *Creates opening sales invoices per customer and purchase invoices per supplier, so each party's outstanding is tracked.*
- Payment Entry

---

### 3. Which tools are used, in the course, to enter opening balances? — **Multi**
- ✅ Stock Reconciliation (purpose: Opening Stock)
    *Opens item quantities and valuation per warehouse.*
- ✅ Opening Invoice Creation Tool
    *Opens receivables and payables per party.*
- ✅ Journal Entry
    *Opens the remaining balance sheet accounts: bank, fixed assets, deposits, retained earnings, loans.*
- Period Closing Voucher
    *Closes a fiscal year. Not part of opening balances.*
- Payment Reconciliation
    *Matches payments to invoices. Not part of opening balances.*

---

### 4. After every opening balance has been entered correctly, what should the balance of the Temporary Opening account be? — **Single**
- Equal to total assets
- Equal to last year's profit
- ✅ Zero
    *Temporary Opening only holds the difference while openings are in progress. Once stock, receivables, payables, and the other balance sheet accounts are entered, it nets to zero and the balance sheet tallies.*
- Equal to total stock value

---

### 5. Gizmo Global owns Gizmo India, Gizmo UK, and Gizmo World. How do you get a consolidated financial statement in ERPNext? — **Single**
- Export each company's balance sheet and add them in a spreadsheet
- Create one company and use cost centres for each country
- ✅ Create each legal entity as a Company, set Gizmo Global as their parent company, run the Consolidated Financial Statement report
    *Company is a tree. With Gizmo Global as the group company, the Consolidated Financial Statement report merges the child companies out of the box.*
- Use multi-currency accounting on a single company

---

### 6. Gizmo World has thousands of customers. How many receivable accounts do you create in the chart of accounts? — **Single**
- One per customer
- One per customer group
- ✅ One, shared by all customers
    *ERPNext records the party on every ledger entry, so one Debtors account serves everyone. A second receivable account is only needed for another currency or a genuine reporting need.*
- One per territory

---

### 7. The accountant sends the chart of accounts as a spreadsheet. Which tool imports it? — **Single**
- Data Import on the Account doctype
- ✅ Chart of Accounts Importer
    *Select the company, download the template, fill the tree, attach and import in one go.*
- Opening Invoice Creation Tool
- Bulk Update

---

### 8. Which settings on the Item master make ERPNext generate a unique serial number for each unit received? — **Multi**
- ✅ Has Serial No enabled
    *Turns on serial tracking for the item.*
- ✅ A serial number series set (prefix with hashes)
    *Lets ERPNext auto-generate serials such as IPH-00001 for every unit instead of typing them in.*
- Has Batch No enabled
    *Batches group many units under one number. Not per-unit tracking.*
- Maintain Stock disabled
    *Would make the item a non-stock item.*

---

### 9. A cashier scans a barcode into the Barcode field of a Sales Order. What can ERPNext fetch from that scan? — **Multi**
- ✅ The item code
    *Barcode is stored on the Item master, so the scan resolves the item.*
- ✅ The item's price from the selected price list
    *Rate is fetched along with the item.*
- ✅ The serial number, if a serial-number barcode is scanned
    *Scanning a serial fetches the item together with that specific unit.*
- The customer's outstanding balance
    *Not related to barcode scanning.*

---

### 10. iPhone 15 is sold in several colours and memory sizes. Which feature avoids creating every combination by hand? — **Single**
- Item Group
- Item Alternative
- ✅ Item template with attributes, generating Item Variants
    *Mark iPhone 15 as a template, attach attributes such as Colour and Memory, and ERPNext creates one variant per combination.*
- Product Bundle

---

### 11. The same item sells at a different rate in New York than in the rest of the USA. Where is this configured? — **Single**
- Two separate items
- ✅ Two Price Lists, each with its own Item Price record
    *Item Price is a separate master keyed by item and price list. Prices per list are bulk-loaded with Data Import.*
- A pricing rule on the customer group
- Different UOMs on the item

---

### 12. The warehouse manager wants stock tracked down to rack and bin level. How is this modelled? — **Single**
- Add a rack field to the Item master
- ✅ Create racks and bins as child warehouses under the store warehouse
    *Warehouse is a tree. Stock ledger entries then land at the exact location.*
- Use batches named after racks
- A separate company per warehouse

---

### 13. Store managers keep buying from local vendors without approval. Which configuration stops a Purchase Order above $500 from being submitted without the Purchase Manager? — **Single**
- Remove the submit permission from all users
- Set a credit limit on the supplier
- ✅ A Workflow on Purchase Order with a condition on the grand total that routes to the Purchase Manager role
    *Workflows define states, transitions, and the role allowed for each transition. A condition such as `doc.grand_total > 500` sends only large orders to the Purchase Manager.*
- A Budget on the purchase cost centre

---

### 14. Which steps does the course require before the customer goes live? — **Multi**
- ✅ Department-wise training from a scenario list, with trainee sign-off
    *Every department is trained and signs off before touching the system.*
- ✅ Users enter real use cases themselves, followed by UAT sign-off
    *Hands-on entries against a use-case list, then formal acceptance.*
- ✅ Delete test transactions from the Company master
    *Delete Transactions clears invoices, orders, and ledgers while keeping masters.*
- Migrate every historical transaction from the legacy system
    *Only opening balances are migrated. History stays in the legacy system.*
- Build all "good to have" customisations first
    *Agile approach: go live on vanilla plus critical customisations, add the rest in later phases.*

---

### 15. Before going live, the customer wants to wipe all test transactions but keep items, customers, and accounts. What do you use? — **Single**
- Delete the company and create it again
- Restore a database backup from before UAT
- ✅ Delete Transactions on the Company master (Transaction Deletion Record)
    *Removes invoices, orders, entries, and ledgers for the company while leaving master data intact, ready for opening balances.*
- Cancel every document from the list view
