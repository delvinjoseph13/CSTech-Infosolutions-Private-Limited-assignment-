import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  FirstName: String,
  Phone: Number,
  Notes: String,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
});

const listModel=mongoose.model("list",listSchema)

export default listModel;

