

// CREATE TABLE - safe for repeated runs
export const booksQuery = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publication_year INTEGER,
  cover_image_url TEXT,
  genre TEXT,
  price REAL,
  is_available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;


// CREATE BOOK (includes cover_image_url)
export const createBookQuery = `
INSERT INTO books (title, author, publication_year, genre, price, cover_image_url)
VALUES (?, ?, ?, ?, ?, ?);
`;

// GET ALL BOOKS
export const fetchBooksQuery = `SELECT * FROM books;`;

// GET BOOK BY ID
export const fetchBookByIdQuery = `SELECT * FROM books WHERE id = ?;`;

// UPDATE BOOK (now includes cover_image_url)
export const updateBookQuery = `
UPDATE books
SET title = ?, author = ?, publication_year = ?, genre = ?, price = ?, cover_image_url = ?
WHERE id = ?;
`;

// DELETE BOOK
export const deleteBookQuery = `DELETE FROM books WHERE id = ?;`;
