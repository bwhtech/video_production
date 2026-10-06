export const courseName = 'Double Entry, Single Chai';

export const modules = [
  { id: 'big-picture', title: 'The big picture', note: 'Meet the business. Follow the money.', color: 'teal', icon: 'cup' },
  { id: 'making-money', title: 'Making money', note: 'A busy till doesn’t tell the whole story.', color: 'saffron', icon: 'coin' },
  { id: 'secret-language', title: 'The secret language', note: 'Make friends with debit and credit.', color: 'coral', icon: 'book' },
  { id: 'keeping-books', title: 'Keeping the books', note: 'Give every rupee a place to go.', color: 'blue', icon: 'pencil' },
  { id: 'reading-story', title: 'Reading the story', note: 'Turn the books into the bigger picture.', color: 'violet', icon: 'chart' },
] as const;

export const lessons = [
  { number: 1, slug: 'why-bother', title: 'Why Bother?', module: 0, description: 'Meet Meera and her chai stall. Discover the two questions every business needs to answer.', takeaway: 'See why a business needs its own books, separate from its owner.' },
  { number: 2, slug: 'what-you-have-what-you-owe', title: 'What You Have, What You Owe', module: 0, description: 'A cart, some cash, and a loan from Ravi Mama. Sort out what belongs where.', takeaway: 'Recognise assets, liabilities, and equity in a small business.' },
  { number: 3, slug: 'the-scale-that-never-tips', title: 'The Scale That Never Tips', module: 0, description: 'Follow both sides of a transaction and see why the accounting equation stays balanced.', takeaway: 'Explain assets = liabilities + equity, using everyday transactions.', checkpoint: true },
  { number: 4, slug: 'making-money', title: 'Making Money', module: 1, description: 'The first cups are sold. Follow revenue and expenses to find Meera’s profit.', takeaway: 'Understand how revenue and expenses change the owner’s equity.' },
  { number: 5, slug: 'profit-is-not-cash', title: 'Profit Is Not Cash', module: 1, description: 'A customer buys now and pays later. The cash box and the profit tell different stories.', takeaway: 'Explain why earning money and receiving cash can happen at different times.', checkpoint: true },
  { number: 6, slug: 'debit-and-credit', title: 'Debit & Credit Are Just Left & Right', module: 2, description: 'Open Khata’s pages and put familiar transactions on their debit and credit sides.', takeaway: 'Work out which accounts to debit and credit from the accounting equation.' },
  { number: 7, slug: 'golden-rules', title: 'The Golden Rules, Decoded', module: 2, description: 'Personal, real, nominal: another way to describe the entries you already understand.', takeaway: 'Connect the golden rules to the same transactions, without rote memorisation.', checkpoint: true },
  { number: 8, slug: 'the-journal', title: 'The Journal', module: 3, description: 'Turn a day at the stall into a clear, chronological record of transactions.', takeaway: 'Write journal entries with dates, debits, credits, and a short explanation.' },
  { number: 9, slug: 'the-ledger', title: 'The Ledger', module: 3, description: 'Give each account its own page and follow its story from start to finish.', takeaway: 'Post journal entries to ledger accounts and find their balances.' },
  { number: 10, slug: 'month-end-surprises', title: 'Month-End Surprises', module: 3, description: 'Unpaid bills, supplies used, and a cart that’s getting older. Close the month properly.', takeaway: 'Understand adjustments for accrued expenses, supplies used, and depreciation.' },
  { number: 11, slug: 'the-trial-balance', title: 'The Trial Balance', module: 3, description: 'Add up both columns. Then discover what matching totals can, and can’t, tell you.', takeaway: 'Build a trial balance and understand the limits of this check.', checkpoint: true },
  { number: 12, slug: 'profit-and-loss', title: 'The Profit & Loss Statement', module: 4, description: 'Bring a month of cups, costs, and customers together to see how the stall performed.', takeaway: 'Read a simple profit and loss statement, from revenue to net profit.' },
  { number: 13, slug: 'the-balance-sheet', title: 'The Balance Sheet', module: 4, description: 'Take a snapshot of everything the stall owns and owes at the end of April.', takeaway: 'Read a balance sheet and see how profit flows into equity.' },
  { number: 14, slug: 'where-did-the-money-go', title: 'Where Did the Money Go?', module: 4, description: 'Return to Meera’s original question and bring the whole accounting story together.', takeaway: 'Explain the difference between the month’s profit and its change in cash.', checkpoint: true },
];

export type Lesson = (typeof lessons)[number];
export const lessonHref = (lesson: Lesson) => `/lessons/${lesson.slug}/`;
