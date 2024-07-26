const Project_det = require("../modal/projectDetails");
const mongoose = require('mongoose');


const createProject = async (req, res) => {
        try {  
            const projectData = req.body;
            console.log("createProject",req.body);
            const project = await Project_det.create(projectData);
            res.status(201).json({ status: 'success', data: project });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
}
module.exports = {
    createProject
    
};