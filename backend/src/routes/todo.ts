import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo";

export const todoRouter = Router()

todoRouter.get('/', getTodos)
todoRouter.post('/', createTodo)
todoRouter.patch('/:id', updateTodo)
todoRouter.delete('/:id', deleteTodo)
