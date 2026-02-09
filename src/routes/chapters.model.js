import express from 'express';
import {
  createChapter,
  getChaptersByBook,
  getChapterById,
  updateChapter,
  deleteChapter
} from '../controller/chapters.controller.js';
import {authMiddleware }from '../middleware/auth.middleware.js';
import { apiKeyMiddleware } from '../middleware/apiKey.middleware.js';

const chapterRouter = express.Router();

chapterRouter.post('/', apiKeyMiddleware, authMiddleware, createChapter);
chapterRouter.get('/book/:book_id', apiKeyMiddleware, authMiddleware, getChaptersByBook);
chapterRouter.get('/:id', getChapterById);
chapterRouter.put('/:id',authMiddleware, updateChapter);
chapterRouter.delete('/:id',authMiddleware, deleteChapter);

export default chapterRouter;
  