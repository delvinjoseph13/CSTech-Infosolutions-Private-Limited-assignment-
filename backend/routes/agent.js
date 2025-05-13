import express from 'express';
import { addAgents, getAgents } from '../contollers/agentController.js';
const agentRouter=express.Router();


agentRouter.post('/addgents',addAgents);
agentRouter.get('/getagents',getAgents)

export default agentRouter;