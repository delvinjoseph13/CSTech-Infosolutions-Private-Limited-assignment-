import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=userModel.findOne({email})
        if(user){
            return res.status(404).json({message:"User already exists"})
        }
        const hashPassword=bcrypt.hashSync(password,10)
        const newUser=await userModel.create({
            email,
            password:hashPassword
        })

        await newUser.save()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}  


export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=userModel.findOne({email});
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        const isMatch=bcrypt.compareSync(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid Password"})
        }

        const token=jwt.sign({email,password},"secretkey",{expiresIn:'1h'})
        res.json({
            user,
            token
        })

    } catch (error) {
        
    }
}