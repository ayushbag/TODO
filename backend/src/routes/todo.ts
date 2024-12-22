import { Router } from "express";

export const todoRouter = Router()

todoRouter.get("/", (req, res, next) => {
    res.json({
        message: "TESTING PURPOSE"
    })
})
