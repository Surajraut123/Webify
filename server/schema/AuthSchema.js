import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type:String
    },
    lastName: {
        type: String 
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Auth = mongoose.model("auth", authSchema)

export default Auth;