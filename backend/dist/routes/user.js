"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', user_1.handleSignup);
exports.userRouter.post('/signin', user_1.handleSignin);
