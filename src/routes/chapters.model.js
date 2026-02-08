import express from 'express';
import {
  createChapter,
  getChaptersByBook,
  getChapterById,
  updateChapter,
  deleteChapter
} from '../controller/chapters.controller.js';

const chapterRouter = express.Router();

chapterRouter.post('/', createChapter);
chapterRouter.get('/book/:book_id', getChaptersByBook);
chapterRouter.get('/:id', getChapterById);
chapterRouter.put('/:id', updateChapter);
chapterRouter.delete('/:id', deleteChapter);

export default chapterRouter;
