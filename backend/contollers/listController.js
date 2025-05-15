import csv from 'csvtojson'
import xlsx from 'xlsx';
import fs from 'fs';

import listModel from '../models/list.js';
import agentModel from '../models/agentModel.js';
import path from 'path';




export const uploadAndDistribute = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let data;
    //Read CSV file
    if (ext === '.csv') {
      data = await csv().fromFile(filePath);
      //Read Excel file
    } else if (['.xlsx', '.xls'].includes(ext)) {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(sheet);

    } else {
      //Reject unsupported file types
      return res.status(400).json({ message: 'Invalid file type. Only csv, xlsx, xls allowed.' });
    }

    // Validate required fields
    for (let item of data) {
      if (!item.FirstName || !item.Phone || !item.Notes) {
        return res.status(400).json({ message: 'Invalid CSV format. Required fields missing.' });
      }
    }

    const agents = await agentModel.find().limit(5);
    const agentCount = agents.length;

    if (agentCount === 0) {
      return res.status(400).json({ message: 'No agents found' });
    }
    // Distribute data to agents using round-robin logic
    for (let i = 0; i < data.length; i++) {
      const assignedAgent = agents[i % agentCount];
      const entry = new listModel({
        FirstName: data[i].FirstName,
        Phone: data[i].Phone,
        Notes: data[i].Notes,
        agentId: assignedAgent._id
      });
      await entry.save(); // save entry to database
    }

    fs.unlinkSync(filePath);
    res.json({ message: 'Data distributed successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const distributedLists=async(req,res)=>{
  try {
    //Get all agents from database
    const agents=await agentModel.find();
    const result=[];
    //For each agent, fetch the list entries assigned to them
    for(let agent of agents){
      const lists=await listModel.find({agentId: agent._id })
      result.push({name:agent.name,lists})

    }
    //Return list grouped by agent
    res.json(result)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}