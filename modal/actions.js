const mongoose = require("mongoose");

//step 2
const reqActionSchema = new mongoose.Schema({
    project_id:{
        type:String,
        required:true,
        unique:true
    },
   
    issue_desc:{
        type:String,
        required:true
    },

    
    Status:{
        type:String,
        required:true
    },
   
    remarks:{
        type:String
    }

});
const reqActions = mongoose.model('Requierd_Actions', reqActionSchema);

module.exports = reqActions;