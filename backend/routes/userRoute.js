import express from "express";
import { loginUser, registerUser, userList } from '../controllers/userController.js';

const userRouter = express.Router();

//--register New User--
userRouter.post('/register', registerUser);

//--login User--
userRouter.post('/login', loginUser);

//--fetch all user List
userRouter.get('/allusers', userList);

export default userRouter; 