import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserModel } from "../db";
import { UserType } from "../types/user.types";
import dotenv from "dotenv";
dotenv.config();

export const handleSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be atleast 8 characters"),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      message: "incorrect format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email: email,
      password: hashedPassword,
    });

    res.json({
      message: "Signup Succeded",
    });
  } catch (e: any) {
    console.log("Error while signup!", e);
    res.status(500).json({
      message: "Error during signup. Please try again later.",
      error: e.message,
    });
  }
};

export const handleSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = ((await UserModel.findOne({ email })) as UserType) || null;

  if (!user) {
    res.status(500).json({
      message: "user doesnt Exits!",
    });
  }

  const hashPassword = user.password;
  const compareHashedPassword = await bcrypt.compare(password, hashPassword);

  if (compareHashedPassword) {
    try {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1hr' }
      );

      res.status(200).json({
        message: "Signin Succeeded!",
        token,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Signin Failed Try Again!",
        error: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: "Incorrect Password!",
    });
  }
};
