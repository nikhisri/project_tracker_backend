const mongoose = require("mongoose");

//step 2
const keyIssueSchema = new mongoose.Schema({
    project_id:{
        type:String,
        required:true,
        unique:true
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
        required:true
    },
<<<<<<< HEAD
    action_owner:{  
        type:String,
        required:true
    },

    action_Owner_dept:{
        type:String,
      
=======

    action_Owner_dept:{
        type:String
>>>>>>> e495d6bbe533c678fa30d0883d8b2fb236e07cd6
    },

    issue_id:{
        type:String,
        required:true
    },

    issue_Status:{
        type:String,
        required:true
    },
   
    remarks:{
        type:String
    }

});
const keyissue = mongoose.model('Key', keyIssueSchema);

module.exports = keyissue;