import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/books.controller.js';

const booksRouter = express.Router();

booksRouter.post('/', createBook);
//console.log('book data', createBook)
booksRouter.get('/', getAllBooks);
booksRouter.get('/:id', getBookById);
booksRouter.put('/:id', updateBook);
booksRouter.delete('/:id', deleteBook);

export default booksRouter;
