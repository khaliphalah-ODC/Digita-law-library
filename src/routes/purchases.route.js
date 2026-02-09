import express from 'express';
import {
  createPurchase,
  getPurchasesByUser,
  getPurchaseById,
  deletePurchase
} from '../controller/purchases.controller.js';
import { apiKeyMiddleware } from '../middleware/apiKey.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const purchasesRouter = express.Router();


purchasesRouter.post('/',apiKeyMiddleware, authMiddleware, createPurchase);
purchasesRouter.get('/user/:user_id', apiKeyMiddleware, getPurchasesByUser);
purchasesRouter.get('/:id', apiKeyMiddleware, getPurchaseById);
purchasesRouter.delete('/:id', apiKeyMiddleware, authMiddleware, deletePurchase);

export default purchasesRouter;
