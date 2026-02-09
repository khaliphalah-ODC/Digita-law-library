import express from 'express';
import {
  createSubscription,
  getSubscriptionsByUser,
  getSubscriptionById,
  cancelSubscription
} from '../controller/subscriptions.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js'
import { apiKeyMiddleware } from '../middleware/apiKey.middleware.js';

const subscriptionRouter = express.Router();

subscriptionRouter.post('/',apiKeyMiddleware, authMiddleware, createSubscription);
subscriptionRouter.get('/user/:user_id',apiKeyMiddleware, authMiddleware, getSubscriptionsByUser);
subscriptionRouter.get('/:id',apiKeyMiddleware, authMiddleware, getSubscriptionById);

//cancel instead of delete 
subscriptionRouter.patch('/:id/cancel', apiKeyMiddleware, authMiddleware, cancelSubscription);
export default subscriptionRouter;
