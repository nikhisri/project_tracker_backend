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

const countAction = async (req, res) => {
    try {
      const count = await action.countDocuments({});
      res.status(200).json({
        status: 'success',
        count: count
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error counting documents: ' + err.message
      });
    }
  };

const getActionById = async(req,res) => {
    // console.log(action_id);
    try {
        const action_id = req.params.id;
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
        const action_id = req.body.action_id;

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

const getActionStats = async (req, res) => {
    try {
      // Total count of actions
      const totalActions = await action.countDocuments({});
  
      // Count of actions grouped by status
      const statusCounts = await action.aggregate([
        {
          $group: {
            _id: "$action_status",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 } // Sort by status if needed
        }
      ]);
  
      // Format the results
      const formattedStatusCounts = statusCounts.map(stat => ({
        status: stat._id,
        count: stat.count
      }));
  
      res.status(200).json({
        status: 'success',
        totalActions: totalActions,
        actionCountsByStatus: formattedStatusCounts
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  };
  
module.exports ={
    createAction,
    getAllAction,
    getActionById,
    updateActionById,
    deleteActionid,
    countAction,
    getActionStats
}