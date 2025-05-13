import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique: true
    },
    password:{
        required:true,
        type:String
    }
})

const userModel=mongoose.model("users",userSchema)


export default userModel;