// const userQuery = `
// CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   full_name TEXT NOT NULL,
//   email TEXT NOT NULL UNIQUE,
//   password_hash TEXT NOT NULL,
//   role TEXT CHECK(role IN ('admin','student','subscriber')) DEFAULT 'student',
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );
// `;

// const createUserQuery = `INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?);`;

// const fetchUserQuery = `SELECT * FROM users WHERE email = ?;`;

// const updateUserQuery = `UPDATE users SET full_name = ?, email = ?, password_hash = ?, role = ? WHERE id = ?;`;

// const deleteUserQuery = `DELETE FROM users WHERE id = ?;`;

// module.exports = {
//   userQuery,
//   createUserQuery,
//   fetchUserQuery,
//   updateUserQuery,
//   deleteUserQuery
// };  


 
export const userQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CHECK (role IN ('admin', 'student', 'subscriber'))
);
`;

export  const createUserQuery = `
INSERT INTO users (full_name, email, password_hash, role)
VALUES (?, ?, ?, ?);
`;

export const findUserByEmailQuery = `
SELECT * FROM users WHERE email = ?;
`;

// module.exports = {
//   userQuery,
//   createUserQuery,
//   findUserByEmailQuery
// };
