import express from 'express';
import {
  createSubscription,
  getSubscriptionsByUser,
  getSubscriptionById,
  cancelSubscription
} from '../controller/subscriptions.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js'

const subscriptionRouter = express.Router();

subscriptionRouter.post('/', authMiddleware, createSubscription);
subscriptionRouter.get('/user/:user_id',authMiddleware, getSubscriptionsByUser);
subscriptionRouter.get('/:id',authMiddleware, getSubscriptionById);

//cancel instead of delete 
subscriptionRouter.patch('/:id/cancel', authMiddleware, cancelSubscription);

export default subscriptionRouter;
