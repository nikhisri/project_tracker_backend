const mongoose = require("mongoose");
const PROJECT_STATUS_ENUM = ["Opened", "In-Progress", "Completed","Late"];

//step 2
const projectSchema = new mongoose.Schema({
    project_id:{
        type:String,
        required:true,
        unique:true
    },
    project_name:{
        type:String,
        required:true
    },
    project_desc:{
        type:String,
        required:true
    },
    project_start_Date:{
        type:Date,    
        required:true
    
    },
    actual_start_Date:{
        type:Date,    
        required:true
    
    },
    planned_end_Date:{
        type:Date,
        required:true
    },
    actual_end_Date:{
        type:Date,
        required:true
    },
    revised_Completion_date_1:{
        type:Date,
        required:true
    },
    revised_Completion_date_2:{
        type:Date,
        required:true
    },
   
    required_No_days:{
        type:Number,
        required:true
    },
    action_owner:{
        type:String,
        required:true

    },
    action_Owner_dept:{
        type:String,
        required:true

    },
    project_Status:{
        type:String,
        enum:PROJECT_STATUS_ENUM,
        required:true
    },
    owner_Id:{
        type:String,
        required:true
    },
    remarks:{
        type:String
    },
    
        

},
{
timestamps: true // Enable timestamps
}
);
const project = mongoose.model('Projects', projectSchema);

module.exports = project;