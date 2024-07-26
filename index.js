var express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/projectRoutes");
// const roleRoutes = require("./routes/roleRoutes");

//step 2
dotenv.config();
const db = require("./config/db");
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/v1/user",projectRoutes);   
 
app.get("/alive",(req,res)=>{ 
    res.send({
    greetings:"good evening",Status:"alive !!!!!.....",
    
    });
})

const PORT = process.env.PORT || 5000;
//step 3
app.listen(PORT,()=>{
    console.log(`server running on port --> http://localhost:${PORT}`); 
});


//npm install --> for installing node modules
//nodemon index.js --> server start 
//npm install nodemon -g

//api reach backend server --> index.js --> route --> controller --> model ---> working flow 

//Developing flow
//model --> controller --> route --> index.js --> postman tool api test