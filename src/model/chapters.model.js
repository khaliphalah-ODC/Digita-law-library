



 export const chapterQuery = `
CREATE TABLE IF NOT EXISTS chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (book_id, order_number),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
`;

export  const createChapterQuery = `
INSERT INTO chapters (book_id, title, content, order_number)
VALUES (?, ?, ?, ?);
`;

export const fetchChaptersByBookQuery = `
SELECT * FROM chapters
WHERE book_id = ?
ORDER BY order_number ASC;
`;

export const fetchChapterByIdQuery = `
SELECT * FROM chapters
WHERE id = ?;
`;

export const updateChapterQuery = `
UPDATE chapters
SET title = ?, content = ?, order_number = ?
WHERE id = ?;
`;

 export const deleteChapterQuery = `
DELETE FROM chapters
WHERE id = ?;
`;

// module.exports = {
//   chapterQuery,
//   createChapterQuery,
//   fetchChaptersByBookQuery,
//   fetchChapterByIdQuery,
//   updateChapterQuery,
//   deleteChapterQuery
// };
