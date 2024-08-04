const action = require("../modal/actions");
const mongoose = require('mongoose');
const keyIssues = require("../modal/keyissues");

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
      // const year = parseInt(req.params.year);
      const year = parseInt(req.params.year, 10);
      if (isNaN(year)) {
          return res.status(400).json({
              status: 'error',
              message: 'Invalid year parameter'
          });
      }

      const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year + 1, 0, 1);

        // Total count of actions for the given year
        const totalActions = await keyIssues.countDocuments({
          issueRaiseddate: {
                $gte: startOfYear,
                $lt: endOfYear
            }
        });


      // Count of actions grouped by status for the given year
      const statusCounts = await keyIssues.aggregate([
        {
          $match: {
            issueRaiseddate: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
          {
              $group: {
                  _id: "$issue_Status",
                  count: { $sum: 1 }
              }
          },
          {
              $sort: { _id: 1 } // Sort by status if needed
          }
      ]);
      console.log(statusCounts);
      // Separate arrays for labels and counts
      const labels = statusCounts.map(stat => stat._id);
      const counts = statusCounts.map(stat => stat.count);

      res.status(200).json({
          status: 'success',
          totalActions: totalActions,
          labels: labels,
          counts: counts
      });
  } catch (error) {
      res.status(500).json({
          status: 'error',
          message: error.message
      });
  }
};

// const getActionStats = async (req, res) => {
//   try {
//     // Total count of actions
//     const totalActions = await action.countDocuments({});

//     // Count of actions grouped by status
//     const statusCounts = await action.aggregate([
//       {
//         $group: {
//           _id: "$issue_Status",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $sort: { _id: 1 } // Sort by status if needed
//       }
//     ]);

//     // Separate arrays for labels and counts
//     const labels = statusCounts.map(stat => stat._id);
//     const counts = statusCounts.map(stat => stat.count);

//     res.status(200).json({
//       status: 'success',
//       totalActions: totalActions,
//       labels: labels,
//       counts: counts
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };

  
  
module.exports ={
    createAction,
    getAllAction,
    getActionById,
    updateActionById,
    deleteActionid,
    countAction,
    getActionStats
}