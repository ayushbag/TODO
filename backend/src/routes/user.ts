import { Router } from "express";
import { handleSignup, handleSignin } from "../controllers/user";


export const userRouter = Router()

userRouter.post('/signup', handleSignup);
userRouter.post('/signin', handleSignin);