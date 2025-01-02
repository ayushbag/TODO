import mongoose, { ObjectId } from "mongoose";

export interface UserType {
    _id: mongoose.Types.ObjectId,
    email: string,
    password: string
}