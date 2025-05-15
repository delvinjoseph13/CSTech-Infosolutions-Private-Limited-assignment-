import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()


export const registerUser = async (req, res) => {
    const { email, password } = req.body;//body items

    try {
        //checking if user is already exits
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//function for login
export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        const isMatch=bcrypt.compareSync(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid Password"})
        }

        const token=jwt.sign({email,password},process.env.JWT_Secret,{expiresIn:'1h'})
        res.json({
            user,
            token
        })

    } catch (error) {
        
    }
}