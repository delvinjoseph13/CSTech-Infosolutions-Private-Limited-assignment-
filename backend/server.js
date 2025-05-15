import express, { json } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/auth.js';
import agentRouter from './routes/agent.js';
import listRouter from './routes/list.js';
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config();
const app= express();
app.use(json())
app.use(cors())





    mongoose.connect(process.env.MOGODB_URL)
    const db=mongoose.connection
    db.on("open",()=>{
        console.log("connected successfully")
    })


app.use('/auth',userRouter)
app.use('/agent',agentRouter)
app.use('/list',listRouter)

app.listen(8000,()=>{
    console.log("server is running on port 8000");
})