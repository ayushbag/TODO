import { Request, Response } from "express";
import { TodoModel } from "../db";

interface AuthenticationRequest extends Request {
  user?: { userId: string };
}

export const getTodos = async (req: AuthenticationRequest, res: Response) => {
  const todos = await TodoModel.find({ userId: req.user?.userId });
  res.json(todos);
};

export const createTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = new TodoModel({ userId: req.user?.userId, title });
    await newTodo.save();
    res.status(201).json({
      newTodo,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: "Error while creation of Todo!",
      err
    })
  }
};

export const updateTodo = async (req: AuthenticationRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updateTodo = await TodoModel.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    )
    res.status(200).json({
      message: "Updated Todo!",
      updateTodo
    })
  } catch (err) {
    console.log(err)
    res.status(401).json({
      message: "Error while updation!",
      err
    })    
  }
};

export const deleteTodo = async (req: AuthenticationRequest, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const deletedTodo = await TodoModel.findOneAndDelete({_id: id})
    if (!deletedTodo) {
      return res.status(400).json({
        message: "Todo not found!"
      })
    }
    res.status(203).send({
      message: "Todo Deleted Successfully"
    }) 
  } catch (err) {
    console.log(err)
    console.log("--------------------------")
    res.status(403).json({
      message: "Error while deletion",
      err
    })
  }
};
