const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const projectController = require("../controllers/projectController");
const keyissueController = require("../controllers/keyissuesController");

router.post("/register",loginController.register);
router.post("/login",loginController.login);

router.post("/project",projectController.createProject);
router.get("/getallprojects",projectController.getAllProjects);
router.post("/projectbyid",projectController.getProjectsById);
router.put("/updateproj",projectController.updatebyid);
router.put("/deleteproj",projectController.deleteprojid);

router.post("/createissue",keyissueController.createIssue);

module.exports = router;  