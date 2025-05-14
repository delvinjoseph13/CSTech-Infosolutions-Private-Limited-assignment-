import mongoose from "mongoose";

const agentSchema=mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  password: String
})

const agentModel=mongoose.model("agent",agentSchema);

export default agentModel;