
export const subscriptionsQuery = `
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  plan_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CHECK (status IN ('active', 'canceled', 'expired')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

export const createSubscriptionQuery = `
INSERT INTO subscriptions (user_id, plan_name, start_date, end_date)
VALUES (?, ?, ?, ?);
`;

export const fetchSubscriptionsByUserQuery = `
SELECT * FROM subscriptions
WHERE user_id = ?
ORDER BY created_at DESC;
`;

export const fetchSubscriptionByIdQuery = `
SELECT * FROM subscriptions WHERE id = ?;
`;

/* cancel instead of delete */
export const cancelSubscriptionQuery = `
UPDATE subscriptions
SET status = 'canceled', end_date = DATE('now')
WHERE id = ? AND status = 'active';
`;
