const KeyIssues = require("../modal/keyissues");
const mongoose = require('mongoose');

const createIssue = async (req,res) =>{
    try {  
        const issueData = req.body;
        console.log("createIssue",req.body);
        const project = await Project_det.create(issueData);
        res.status(201).json({ status: 'success', data: project });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

module.exports = {
    createIssue
}