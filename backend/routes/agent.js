import express from 'express';
import { addAgents, getAgents } from '../contollers/agentController.js';
import { authorization } from '../middleware/authentication.js';
const agentRouter=express.Router();


agentRouter.post('/addgents',authorization,addAgents);
agentRouter.get('/getagents',authorization,getAgents)

export default agentRouter;