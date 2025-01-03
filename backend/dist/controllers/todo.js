"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodoTitle = exports.updateTodoStatus = exports.createTodo = exports.getTodos = void 0;
const db_1 = require("../db");
const getTodos = async (req, res) => {
    try {
        const todos = await db_1.TodoModel.find({ userId: req.user?.userId });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching Todos",
            error
        });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = new db_1.TodoModel({ userId: req.user?.userId, title });
        await newTodo.save();
        res.status(201).json({
            newTodo,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error while creation of Todo!",
            err,
        });
    }
};
exports.createTodo = createTodo;
const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updateTodo = await db_1.TodoModel.findByIdAndUpdate(id, { completed }, { new: true });
        res.status(200).json({
            message: "Updated Todo!",
            updateTodo,
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Error while updation!",
            err,
        });
    }
};
exports.updateTodoStatus = updateTodoStatus;
const updateTodoTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const todo = await db_1.TodoModel.findByIdAndUpdate(id, { title });
        res.status(200).json({
            message: "todo updated Successfully",
            todo
        });
    }
    catch (error) {
        res.status(500).json({
            message: "eroor while updating todo",
            error
        });
    }
};
exports.updateTodoTitle = updateTodoTitle;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await db_1.TodoModel.findOneAndDelete({ _id: id });
        if (!deletedTodo) {
            return res.status(400).json({
                message: "Todo not found!",
            });
        }
        res.status(203).send({
            message: "Todo Deleted Successfully",
        });
    }
    catch (err) {
        console.log(err);
        console.log("--------------------------");
        res.status(403).json({
            message: "Error while deletion",
            err,
        });
    }
};
exports.deleteTodo = deleteTodo;
