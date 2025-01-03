"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./routes/user");
const todo_1 = require("./routes/todo");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (!process.env.MONGO_URL) {
    console.log("DB URL ISSUE");
}
async function main() {
    await mongoose_1.default.connect(process.env.MONGO_URL).then(() => console.log("DB connected"));
}
main();
app.use('/user', user_1.userRouter);
app.use('/todos', authMiddleware_1.authenticationToken, todo_1.todoRouter);
app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));
