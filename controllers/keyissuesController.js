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
const countKeyIssues = async (req, res) => {
    try {
      const count = await keyIssues.countDocuments({});
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

const getIssueById = async(req,res) => {
    try {
        const issue_id = req.params.id;

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
        const issue_id = req.body.issue_id;

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

// API to get issue count by month for a given year
const getcountmonth= async (req, res) => {
  try {
    const year = parseInt(req.params.year, 10);

    // Aggregate issues to count month-wise
    const issuesByMonth = await keyIssues.aggregate([
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
          _id: { $month: '$issueRaiseddate' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Prepare the result array
    const monthCounts = Array(12).fill(0);
    issuesByMonth.forEach((entry) => {
      monthCounts[entry._id - 1] = entry.count;
    });

    res.json(monthCounts);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueById,
    deleteIssueid,
    countKeyIssues,
    getcountmonth
}