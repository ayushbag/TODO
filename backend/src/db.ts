import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String}
})

const TodoSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    completed: {type: Boolean, default: false}
}) 

const UserModel = model('User', UserSchema) 
const TodoModel = model('Todo', TodoSchema) 

export {
    UserModel,
    TodoModel
}