import express from "express";
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

//--register New User--
userRouter.post('/register', registerUser);

//--login User--
userRouter.post('/login', loginUser);

export default userRouter; 