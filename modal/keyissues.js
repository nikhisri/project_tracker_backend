const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ISSUE_STATUS_ENUM = ["Opened", "In-Progress", "Closed"];
//step 2
const keyIssueSchema = new mongoose.Schema({
   
    issue_id:{
        type:String,
        required:true,
        unique:true
    },
 
    project_id: {
        //  type: mongoose.Schema.Types.ObjectId,
        type:String,
        //  ref: 'project', 
         required: true
         },

    project_name:{
        type:String,
        required:true                                                                                                                                                                                                                                           
    },
    issue_desc:{
        type:String,
        required:true
    },
 
    issueRaiseddate:{
        type:Date,    
        required:true
   
    },
    targetDate:{
        type:Date,    
        required:true
 
    },
 
    owner_Id:{
        type:String,
        required:true,
        unique:true
    },
    action_owner:{  
        type:String,
        required:true
    },
 
    action_Owner_dept:{
        type:String
    },
     
   
    issue_Status:{
        type:String,
        enum: ISSUE_STATUS_ENUM,
        required:true
    },
   
    remarks:{
        type:String
    }
}
,
{
timestamps: true // Enable timestamps
}
);
const keyissue = mongoose.model('KeyIssue', keyIssueSchema);
module.exports = keyissue;