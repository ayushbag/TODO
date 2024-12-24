import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './routes/user'
import { todoRouter } from './routes/todo'
import cors from 'cors'
import dotenv from 'dotenv'
import { authenticationToken } from './middlewares/authMiddleware';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

if (!process.env.MONGO_URL) {
    console.log("DB URL ISSUE");
}

async function main() {
    await mongoose.connect(process.env.MONGO_URL as string).then(() => console.log("DB connected"));
}

main()

app.use( '/user', userRouter);
app.use('/todos', authenticationToken, todoRouter);

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`))