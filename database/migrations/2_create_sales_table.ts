export const up = `
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id TEXT,
  items TEXT,
  total_amount REAL,
  paying_amount REAL,
  due_amount REAL,
  date TEXT,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);
`;
