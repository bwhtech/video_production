"""Meera's Chai — single source of truth for every number shown in the course.

Run: python3 ledger.py  -> verifies the books and writes meeras-chai.json
"""
import json

TYPES = {  # account -> category (A, L, E, R, X=expense, D=drawings, CA=contra-asset)
    "Cash": "A", "Bank": "A", "Infotech (receivable)": "A", "Stock": "A", "Equipment": "A",
    "Accumulated depreciation": "CA",
    "Loan from Ravi Mama": "L", "Gopal Dairy (payable)": "L", "Advance from customer": "L",
    "Electricity payable": "L",
    "Capital": "E", "Drawings": "D", "Sales": "R", "Catering revenue": "R",
    "Rent": "X", "Salary": "X", "Interest": "X", "Electricity": "X",
    "Cost of supplies used": "X", "Depreciation": "X",
}

T = [  # id, date, text, [(debit acct, amt)], [(credit acct, amt)], lesson
    ("T1", "Apr 1", "Meera puts ₹50,000 of her savings into the stall", [("Cash", 50000)], [("Capital", 50000)], 2),
    ("T2", "Apr 1", "Ravi Mama lends ₹30,000", [("Cash", 30000)], [("Loan from Ravi Mama", 30000)], 2),
    ("T3", "Apr 2", "Buys cart, stove, kettles, glasses for ₹36,000 cash", [("Equipment", 36000)], [("Cash", 36000)], 3),
    ("T4", "Apr 2", "Buys tea, milk, sugar stock for ₹6,000 cash", [("Stock", 6000)], [("Cash", 6000)], 3),
    ("T5", "Apr 3", "Buys ₹8,000 stock on credit from Gopal Dairy", [("Stock", 8000)], [("Gopal Dairy (payable)", 8000)], 3),
    ("T6", "Apr 5", "Pays April rent ₹5,000 cash", [("Rent", 5000)], [("Cash", 5000)], 4),
    ("T7", "Apr 15", "Cash sales Apr 2–15: ₹18,000", [("Cash", 18000)], [("Sales", 18000)], 4),
    ("T8", "Apr 15", "Deposits ₹15,000 cash in bank", [("Bank", 15000)], [("Cash", 15000)], 5),
    ("T9", "Apr 16", "Bills Infotech ₹6,000 on credit", [("Infotech (receivable)", 6000)], [("Sales", 6000)], 5),
    ("T10", "Apr 20", "Pays Gopal Dairy ₹5,000 of ₹8,000", [("Gopal Dairy (payable)", 5000)], [("Cash", 5000)], 5),
    ("T11", "Apr 22", "₹4,000 cash advance for May 5 catering", [("Cash", 4000)], [("Advance from customer", 4000)], 5),
    ("T12", "Apr 25", "Infotech pays ₹4,000 by UPI", [("Bank", 4000)], [("Infotech (receivable)", 4000)], 5),
    ("T13", "Apr 30", "Cash sales Apr 16–30: ₹22,000", [("Cash", 22000)], [("Sales", 22000)], 8),
    ("T14", "Apr 30", "Bills Infotech ₹4,000 on credit", [("Infotech (receivable)", 4000)], [("Sales", 4000)], 8),
    ("T15", "Apr 30", "Pays Raju's salary ₹8,000 by UPI", [("Salary", 8000)], [("Bank", 8000)], 8),
    ("T16", "Apr 30", "Pays Ravi Mama ₹3,300 (₹3,000 loan + ₹300 interest)", [("Loan from Ravi Mama", 3000), ("Interest", 300)], [("Cash", 3300)], 8),
    ("T17", "Apr 30", "Meera takes ₹3,000 home", [("Drawings", 3000)], [("Cash", 3000)], 8),
    ("T18", "Apr 30", "April electricity bill ₹1,000, unpaid", [("Electricity", 1000)], [("Electricity payable", 1000)], 10),
    ("T19", "Apr 30", "Stock count ₹4,000 left → ₹10,000 used", [("Cost of supplies used", 10000)], [("Stock", 10000)], 10),
    ("T20", "Apr 30", "Depreciation ₹36,000 ÷ 36 months", [("Depreciation", 1000)], [("Accumulated depreciation", 1000)], 10),
]

DEBIT_NORMAL = {"A", "X", "D"}

def run():
    bal = {a: 0 for a in TYPES}  # signed: debit +, credit -
    snapshots = []
    for tid, date, text, dr, cr, lesson in T:
        assert sum(a for _, a in dr) == sum(a for _, a in cr), tid
        for acct, amt in dr: bal[acct] += amt
        for acct, amt in cr: bal[acct] -= amt
        assets = sum(v for k, v in bal.items() if TYPES[k] in ("A", "CA"))
        liab = -sum(v for k, v in bal.items() if TYPES[k] == "L")
        profit = -sum(v for k, v in bal.items() if TYPES[k] in ("R", "X"))
        equity = -bal["Capital"] - bal["Drawings"] + profit
        assert assets == liab + equity, (tid, assets, liab, equity)
        snapshots.append(dict(id=tid, assets=assets, liabilities=liab, equity=equity, profit=profit,
                              cash=bal["Cash"], bank=bal["Bank"]))
    tb_dr = sum(v for v in bal.values() if v > 0)
    tb_cr = -sum(v for v in bal.values() if v < 0)
    assert tb_dr == tb_cr
    return bal, snapshots, tb_dr

if __name__ == "__main__":
    bal, snaps, tb = run()
    for s in snaps:
        print(f"{s['id']:>4}  A {s['assets']:>7,} = L {s['liabilities']:>6,} + E {s['equity']:>6,}   profit {s['profit']:>6,}  cash {s['cash']:>6,} bank {s['bank']:>6,}")
    print("TB total", f"{tb:,}")
    json.dump(dict(accounts=TYPES, transactions=[dict(id=t[0], date=t[1], text=t[2], debit=t[3], credit=t[4], lesson=t[5]) for t in T],
                   snapshots=snaps, closing={k: v for k, v in bal.items() if v}, trial_balance_total=tb),
              open("meeras-chai.json", "w"), indent=1, ensure_ascii=False)
