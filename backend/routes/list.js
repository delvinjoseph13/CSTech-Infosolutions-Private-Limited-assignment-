import express from 'express';
import multer from 'multer';
import { uploadAndDistribute } from '../contollers/listController.js';
const listRouter=express.Router();

const upload=multer({dest: 'uploads/'})
listRouter.post('/upload',upload.single('file'),uploadAndDistribute)

export default listRouter;