"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
exports.todoRouter = (0, express_1.Router)();
exports.todoRouter.get("/", (req, res, next) => {
    res.json({
        message: "TESTING PURPOSE"
    });
});
