import { Router } from "express";
import { getTodos, createTodo, deleteTodo, updateTodoStatus, updateTodoTitle } from "../controllers/todo";
import { authenticationToken } from "../middlewares/authMiddleware";

export const todoRouter = Router()

todoRouter.get('/', authenticationToken, getTodos)
todoRouter.post('/', authenticationToken ,createTodo)
todoRouter.patch('/status/:id',authenticationToken, updateTodoStatus)
todoRouter.patch('/title/:id',authenticationToken, updateTodoTitle)
todoRouter.delete('/:id',authenticationToken, deleteTodo)
