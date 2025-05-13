import express, { json } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/auth.js';
import agentRouter from './routes/agent.js';
import listRouter from './routes/list.js';


const app= express();
app.use(json())




mongoose.connect("mongodb://localhost:27017/ShoppyGlobe")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/auth',userRouter)
app.use('/agent',agentRouter)
app.use('/list',listRouter)

app.listen(8000,()=>{
    console.log("server is running on port 8000");
})