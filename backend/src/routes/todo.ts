import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo";
import { authenticationToken } from "../middlewares/authMiddleware";

export const todoRouter = Router()

todoRouter.get('/', authenticationToken, getTodos)
todoRouter.post('/', authenticationToken ,createTodo)
todoRouter.patch('/:id',authenticationToken, updateTodo)
todoRouter.delete('/:id',authenticationToken, deleteTodo)
