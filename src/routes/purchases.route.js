import express from 'express';
import {
  createPurchase,
  getPurchasesByUser,
  getPurchaseById,
  deletePurchase
} from '../controller/purchases.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const purchasesRouter = express.Router();


purchasesRouter.post('/',authMiddleware, createPurchase);
purchasesRouter.get('/user/:user_id', getPurchasesByUser);
purchasesRouter.get('/:id', getPurchaseById);
purchasesRouter.delete('/:id', authMiddleware, deletePurchase);

export default purchasesRouter;
