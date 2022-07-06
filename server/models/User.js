import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    username: {type: String, unique:true},
    email: {type: String, unique:true},
    password: String,
    token: String,
    hulu: Boolean,
    netflix: Boolean,
    prime: Boolean,
    disney: Boolean,
    hbo: Boolean,
})

const User = mongoose.model('user', userSchema)

export default User
