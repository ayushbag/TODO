"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "token not found!",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "token invalid!" });
        }
        req.user = decoded.user;
        next();
    });
};
exports.authenticationToken = authenticationToken;
