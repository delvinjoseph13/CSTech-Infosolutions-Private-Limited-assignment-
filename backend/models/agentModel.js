import mongoose from "mongoose";

const agentSchema=mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String
})

const agentModel=mongoose.model("agent",agentSchema);

export default agentModel;