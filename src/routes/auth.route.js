import express from 'express';
import {
  
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser
} from '../controller/auth.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);   // Create new user
userRouter.post('/login', loginUser);     // Login user
userRouter.post('/logout', logoutUser);   // Logout user

userRouter.put('/:id', updateUser);       // Update user by ID
userRouter.delete('/:id', deleteUser);    // Delete user by ID

export default userRouter;
