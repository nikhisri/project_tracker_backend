const keyIssues = require("../modal/keyissues");
const mongoose = require('mongoose');

const createIssue = async (req,res) =>{
    try {  
        const issueData = req.body;
        console.log("createIssue",req.body);
        const issue = await keyIssues.create(issueData);
        res.status(201).json({ status: 'success', data: issue });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

const getAllIssues = async(req,res) => {
    try{

        const allIssues = await keyIssues.find();
        res.status(201).json({ status: 'success', data: allIssues });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
}

const getIssueById = async(req,res) => {
    issue_id = req.body.id;
    console.log(issue_id);
    try {
        const issue = await keyIssues.findOne({issue_id:issue_id});
        if (!issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send(issue);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateIssueById = async(req,res) =>{
    try {
        issue_id = req.body.id;

        const issue = await keyIssues.findOneAndUpdate(
            {issue_id:issue_id},
            req.body,
            { new: true, runValidators: true }
        );
        if (!issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send(issue);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteIssueid = async(req,res) =>{
   
    // console.log(issue_id);
    try {
        const issue_id = req.body.id;
        const issue = await keyIssues.findOneAndDelete({ issue_id: issue_id });
        if (!issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueById,
    deleteIssueid
}