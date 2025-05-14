import agentModel from "../models/agentModel.js"


export const addAgents=async(req,res)=>{
    const {name,email,number,password}=req.body
    try {
        const newAgent=await agentModel.create({
            name,email,number,password
        })
        await newAgent.save();
        res.status(201).json(newAgent);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const getAgents=async(req,res)=>{
    try {
        const agents=await agentModel.find();
        if(agents.length===0){
            return res.status(404).json({message:"No agents found"})
        }
        res.json(agents)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}