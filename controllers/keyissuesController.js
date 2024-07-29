const KeyIssues = require("../modal/keyissues");
const mongoose = require('mongoose');

const createIssue = async (req,res) =>{
    try {  
        const projectData = req.body;
        console.log("createProject",req.body);
        const project = await Project_det.create(projectData);
        res.status(201).json({ status: 'success', data: project });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}