const Project_det = require("../modal/projectDetails");
const mongoose = require('mongoose');
const Action = require("../modal/actions");
const KeyIssues = require("../modal/keyissues");

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

const getAllProjects = async(req,res) => {
    try{

        const allProj = await Project_det.find();
        res.status(201).json({ status: 'success', data: allProj });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
}
const countProjects = async (req, res) => {
    try {
      const procount = await Project_det.countDocuments({});
      const issuecount = await KeyIssues.countDocuments({});
      const actioncount = await Action.countDocuments({});

      
      res.status(200).json({
        status: 'success',
        procount: procount,
        issuecount:issuecount,
        actioncount:actioncount
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error counting documents: ' + err.message
      });
    }
  };

const getProjectsById = async(req,res) => {
    proj_id = req.params.id;
    console.log(proj_id);
    try {
        const project = await Project_det.findOne({ project_id:proj_id});
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updatebyid = async(req,res) =>{
    try {
        proj_id = req.body.project_id;

        const project = await Project_det.findOneAndUpdate(
            {project_id:proj_id},
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteprojid = async(req,res) =>{
   
    // 
    try {
        const proj_id = req.body.id;
        console.log(proj_id);
        const project = await Project_det.findOneAndDelete({ project_id: proj_id });
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.status(200).send({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectsById,
    updatebyid,
    deleteprojid,
    countProjects
    
};