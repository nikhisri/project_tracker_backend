const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ACTION_STATUS_ENUM = ["Opened", "In-Progress", "Closed"];
//step 2
const reqActionSchema = new mongoose.Schema({
    

    action_id:{
        type:String,
        required:true,
        unique:true
    },
    project_id:{
        type:String,
        // ref: 'Project_det', 
         required: true 
    },
    
    issue_id: { 
       
        type:String,
        // ref: 'Issue',
        required: true 
    },
   
    action_desc:{
        type:String,
        required:true
    },
    
    action_owner:{
        type:String,
        required:true
    },

    action_status:{
        type:String,
        enum:ACTION_STATUS_ENUM,
        required:true
    },

    target_date:{
        type:Date,
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
const reqActions = mongoose.model('Requierd_Actions', reqActionSchema);

module.exports = reqActions;