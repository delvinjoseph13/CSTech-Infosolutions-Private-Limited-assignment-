import csv from 'csvtojson'
import xlsx from 'xlsx';
import fs from 'fs';

import listModel from '../models/list.js';
import agentModel from '../models/agentModel.js';


export const uploadAndDistribute=async(req,res)=>{
    try {
        const filePath=req.file.path;
        let data;
        const ext = filePath.split('.').pop();
    if (ext === 'csv') {
      data = await csv().fromFile(filePath);
    } else if (['xlsx', 'xls'].includes(ext)) {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const agents = await agentModel.find();
    const agentCount = agents.length;

    data.forEach((item, index) => {
      const assignedAgent = agents[index % agentCount];
      const list = new listModel({
        ...item,
        agentId: assignedAgent._id
      });
      list.save();
    });

    fs.unlinkSync(filePath); // Delete file after processing
    res.json({ message: 'Data distributed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};