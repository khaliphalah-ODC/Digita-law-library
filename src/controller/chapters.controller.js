import bookStoreDB from '../model/connect.js';
import {
  chapterQuery,
  createChapterQuery,
  fetchChaptersByBookQuery,
  fetchChapterByIdQuery,
  updateChapterQuery,
  deleteChapterQuery
} from '../model/chapters.model.js';

// CREATE TABLE
export const CreateChapterTable = () => {
  bookStoreDB.run(chapterQuery, (err) => {
    if (err) {
      console.error("Error creating chapters table: ", err.message);
    } else {
      console.log("Chapters table created or already exists");
    }
  });
};

// CREATE CHAPTER
export const createChapter = (req, res) => {
  const { book_id, title, content, order_number } = req.body;

  if (!book_id || !title || !content || order_number == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  bookStoreDB.run(
      
    createChapterQuery,
    [book_id, title, content, order_number],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create chapter', error: err.message });
      }

      const newChapter = {
        id: this.lastID,
        book_id,
        title,
        content,
        order_number
      };

      res.status(201).json({
        message: 'Chapter created successfully',
        data: newChapter
      });
    }
  );
};

// GET ALL CHAPTERS FOR A BOOK
export const getChaptersByBook = (req, res) => {
  const { book_id } = req.params;

  bookStoreDB.all(fetchChaptersByBookQuery, [book_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch chapters', error: err.message });
    }

    res.status(200).json({
      message: 'Chapters retrieved successfully',
      data: rows
    });
  });
};

// GET CHAPTER BY ID
export const getChapterById = (req, res) => {
  const { id } = req.params;

  bookStoreDB.get(fetchChapterByIdQuery, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch chapter', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Chapter not found', data: null });
    }

    res.status(200).json({
      message: 'Chapter retrieved successfully',
      data: row
    });
  });
};

// UPDATE CHAPTER
export const updateChapter = (req, res) => {
  const { title, content, order_number } = req.body;
  const { id } = req.params;

  if (!title || !content || order_number == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  bookStoreDB.run(
    updateChapterQuery,
    [title, content, order_number, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to update chapter', error: err.message });
      }

      res.status(200).json({
        message: 'Chapter updated successfully',
        data: { id, title, content, order_number }
      });
    }
  );
};

// DELETE CHAPTER
export const deleteChapter = (req, res) => {
  const { id } = req.params;

  bookStoreDB.run(deleteChapterQuery, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete chapter', error: err.message });
    }

    res.status(200).json({
      message: 'Chapter deleted successfully',
      data: { id }
    });
  });
};
