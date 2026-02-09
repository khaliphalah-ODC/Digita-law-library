import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/books.controller.js';
import { apiKeyMiddleware } from '../middleware/ apiKey.middleware.js';
import {authMiddleware} from '../middleware/auth.middleware.js'

const booksRouter = express.Router();

booksRouter.post('/',apiKeyMiddleware, authMiddleware, createBook);
//console.log('book data', createBook)
booksRouter.get('/',apiKeyMiddleware, authMiddleware, getAllBooks);
booksRouter.get('/:id',apiKeyMiddleware, getBookById);
booksRouter.put('/:id',apiKeyMiddleware, authMiddleware, updateBook);
booksRouter.delete('/:id',apiKeyMiddleware, authMiddleware, deleteBook);

export default booksRouter;
