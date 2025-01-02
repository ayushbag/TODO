import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticationToken = (
  req: Request & { user?: { userId: string } },
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "token not found!",
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "token invalid!" });
    }

    if (!decoded.userId) {
      return res.status(400).json({ message: "Invalid token structure!" });
    }

    console.log(decoded);
    req.user = { userId: decoded.userId }; ;
    next();
  });
};
