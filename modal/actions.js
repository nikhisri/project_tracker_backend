const mongoose = require("mongoose");

//step 2
const reqActionSchema = new mongoose.Schema({
    project_id:{
        type:String,
        required:true,  
    },

    action_id:{
        type:String,
        required:true,
        unique:true
    },

    issue_id:{
        type:String,
        required:true, 
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
        required:true
    },

    target_date:{
        type:Date,
        required:true
    },
   
    remarks:{
        type:String
    }

});
const reqActions = mongoose.model('Requierd_Actions', reqActionSchema);

module.exports = reqActions;