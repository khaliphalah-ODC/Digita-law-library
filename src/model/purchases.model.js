

export const purchasesQuery = `
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  amount_paid REAL NOT NULL,
  payment_reference TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
`;

export const createPurchaseQuery = `
INSERT INTO purchases (user_id, book_id, amount_paid, payment_reference)
VALUES (?, ?, ?, ?);
`;

export const fetchPurchasesByUserQuery = `
SELECT * FROM purchases WHERE user_id = ?;
`;

export const fetchPurchaseByIdQuery = `
SELECT * FROM purchases WHERE id = ?;
`;

export const deletePurchaseQuery = `
DELETE FROM purchases WHERE id = ?;
`;
