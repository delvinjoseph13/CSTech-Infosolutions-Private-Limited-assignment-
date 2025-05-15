import express from 'express';
import multer from 'multer';
import { distributedLists, uploadAndDistribute } from '../contollers/listController.js';
const listRouter = express.Router();
import path from 'path';


const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowed = ['.csv', '.xlsx', '.xls'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Only csv, xlsx, xls allowed'), false);
    }
    cb(null, true);
  }
});

listRouter.post('/upload', upload.single('file'), uploadAndDistribute);
listRouter.get('/distributed',distributedLists)

export default listRouter;