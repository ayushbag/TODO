"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const db_1 = require("../db");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const todos = yield db_1.TodoModel.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    res.json(todos);
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title } = req.body;
        const newTodo = new db_1.TodoModel({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, title });
        yield newTodo.save();
        res.status(201).json({
            newTodo,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error while creation of Todo!",
            err
        });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const updateTodo = yield db_1.TodoModel.findByIdAndUpdate(id, { completed }, { new: true });
        res.status(200).json({
            message: "Updated Todo!",
            updateTodo
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Error while updation!",
            err
        });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield db_1.TodoModel.findOneAndDelete({ _id: id });
        if (!deletedTodo) {
            return res.status(400).json({
                message: "Todo not found!"
            });
        }
        res.status(203).send({
            message: "Todo Deleted Successfully"
        });
    }
    catch (err) {
        console.log(err);
        console.log("--------------------------");
        res.status(403).json({
            message: "Error while deletion",
            err
        });
    }
});
exports.deleteTodo = deleteTodo;
