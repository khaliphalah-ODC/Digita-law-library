
import bookStoreDB from '../model/connect.js';
import {
  createBookQuery,
  fetchBooksQuery,
  fetchBookByIdQuery,
  updateBookQuery,
  deleteBookQuery,
  booksQuery
} from '../model/book.model.js';

// CREATE TABLE
export const CreateBookTable = () => {
  bookStoreDB.run(booksQuery, (err) => {
    if (err) {
      console.error("Error creating book table: ", err.message);
    } else {
      console.log("Book table created or already exists");
    }
  });
};

// CREATE BOOK
export const createBook = (req, res) => {
  const { title, author, publication_year, genre, price, cover_image_url } = req.body;

  bookStoreDB.run(
    createBookQuery,
    [title, author, publication_year, genre, price, cover_image_url],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create book', error: err.message });
      }

      const newBook = {
        id: this.lastID,
        title,
        author,
        publication_year,
        genre,
        price,
        cover_image_url
      };

      res.status(201).json({
        message: 'Book created successfully',
        data: newBook
      });
    }
  );
};

// GET ALL BOOKS
export const getAllBooks = (req, res) => {
  bookStoreDB.all(fetchBooksQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch books', error: err.message });
    }

    res.status(200).json({
      message: 'Books retrieved successfully',
      data: rows
    });
  });
};

// GET BOOK BY ID
export const getBookById = (req, res) => {
  bookStoreDB.get(fetchBookByIdQuery, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch book', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Book not found', data: null });
    }
    res.status(200).json({
      message: 'Book retrieved successfully',
      data: row
    });
  });
};

// UPDATE BOOK
export const updateBook = (req, res) => {
  const { title, author, publication_year, genre, price, cover_image_url } = req.body;

  bookStoreDB.run(
    updateBookQuery,
    [title, author, publication_year, genre, price, cover_image_url, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to update book', error: err.message });
      }

      res.status(200).json({
        message: 'Book updated successfully',
        data: {
          id: req.params.id,
          title,
          author,
          publication_year,
          genre,
          price,
          cover_image_url
        }
      });
    }
  );
};

// DELETE BOOK
export const deleteBook = (req, res) => {
  bookStoreDB.run(deleteBookQuery, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete book', error: err.message });
    }

    res.status(200).json({
      message: 'Book deleted successfully',
      data: { id: req.params.id }
    });
  });
};
