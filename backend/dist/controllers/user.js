"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignin = exports.handleSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleSignup = async (req, res) => {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8, "Password should be atleast 8 characters"),
    });
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "incorrect format",
            error: parsedDataWithSuccess.error,
        });
        return;
    }
    const { email, password } = parsedDataWithSuccess.data;
    try {
        const existingUser = await db_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists",
            });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await db_1.UserModel.create({
            email: email,
            password: hashedPassword,
        });
        res.json({
            message: "Signup Succeeded",
        });
    }
    catch (e) {
        console.log("Error during signup!", e);
        res.status(500).json({
            message: "Error during signup. Please try again later.",
            error: e.message,
        });
    }
};
exports.handleSignup = handleSignup;
const handleSignin = async (req, res) => {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8, "Password should be atleast 8 characters"),
    });
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "incorrect format",
            error: parsedDataWithSuccess.error,
        });
        return;
    }
    const { email, password } = parsedDataWithSuccess.data;
    try {
        const user = (await db_1.UserModel.findOne({ email })) || null;
        if (!user) {
            res.status(404).json({
                message: "User doesn't exist!",
            });
            return;
        }
        const hashPassword = user.password;
        const compareHashedPassword = await bcryptjs_1.default.compare(password, hashPassword);
        if (compareHashedPassword) {
            try {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
                res.status(200).json({
                    message: "Signin Succeeded!",
                    token,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Signin Failed Try Again!",
                    error: error.message,
                });
            }
        }
        else {
            res.status(401).json({
                message: "Incorrect Password!",
            });
        }
    }
    catch (e) {
        console.log("Error during signin!", e);
        res.status(500).json({
            message: "Error during signin. Please try again later.",
            error: e.message,
        });
    }
};
exports.handleSignin = handleSignin;
