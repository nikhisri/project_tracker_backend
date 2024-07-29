const action = require("../modal/actions");
const mongoose = require('mongoose');

const createAction = async(req,res) =>{
    try {  
        const actionData = req.body;
        console.log("createAction",req.body);
        const actions = await action.create(actionData);
        res.status(201).json({ status: 'success', data: actions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}
const getAllAction = async(req,res) => {
    try{

        const allAction = await action.find();
        res.status(201).json({ status: 'success', data: allAction });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
}

const getActionById = async(req,res) => {
    // console.log(action_id);
    try {
        const action_id = req.body.id;
        const act_issue = await action.findOne({action_id:action_id});
        if (!act_issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send(act_issue);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateActionById = async(req,res) =>{
    try {
        const action_id = req.body.id;

        const act_issue = await action.findOneAndUpdate(
            {action_id:action_id},
            req.body,
            { new: true, runValidators: true }
        );
        if (!act_issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send(act_issue);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteActionid = async(req,res) =>{
   
    // console.log(issue_id);
    try {
        const action_id = req.body.id;
        const act_issue = await action.findOneAndDelete({ action_id: action_id });
        if (!act_issue) {
            return res.status(404).send('Issue not found');
        }
        res.status(200).send({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports ={
    createAction,
    getAllAction,
    getActionById,
    updateActionById,
    deleteActionid
}