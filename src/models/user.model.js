import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    sub: String,
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    password: String,
    age: Number,
    rol: { type: String, default: 'user'},
    last_connection: {
        type: Date,
        default: Date.now
    }
});

export const userModel = mongoose.model(userCollection, userSchema)