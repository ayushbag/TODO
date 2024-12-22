import mongoose, { ObjectId } from "mongoose";

export interface UserType {
    email: string,
    password: string
}