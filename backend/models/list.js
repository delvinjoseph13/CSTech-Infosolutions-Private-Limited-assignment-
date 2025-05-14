import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  name: String,
  email: String,
  number: Number,  // or Number if you're not worried about leading 0s
  password: String,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
});

const listModel=mongoose.model("list",listSchema)

export default listModel;

