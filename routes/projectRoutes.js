const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const projectController = require("../controllers/projectController");
const keyissueController = require("../controllers/keyissuesController");
const actionsController = require("../controllers/actionsController");

router.post("/register",loginController.register);
router.post("/login",loginController.login);

router.post("/project",projectController.createProject);
router.get("/getallprojects",projectController.getAllProjects);
router.get("/projectbyid/:id",projectController.getProjectsById);
router.post("/updateproj",projectController.updatebyid);
router.post("/deleteproj",projectController.deleteprojid);
router.get("/countproj",projectController.countProjects);

router.post("/createissue",keyissueController.createIssue);
router.get("/getallissue",keyissueController.getAllIssues);
router.get("/getissuebyid/:id",keyissueController.getIssueById);
router.post("/updateissue",keyissueController.updateIssueById);
router.post("/deleteissue",keyissueController.deleteIssueid);
router.get("/countkeyissue",keyissueController.countKeyIssues);
router.post("/createissue",keyissueController.createIssue);
router.get("/getcountmonth",keyissueController.getIssuesCountPerMonth);


router.post("/createAction",actionsController.createAction);
router.get("/getallaction",actionsController.getAllAction);
router.get("/getactionbyid/:id",actionsController.getActionById);
router.post("/updateactionbyid",actionsController.updateActionById);
router.post("/deleteactionbyid",actionsController.deleteActionid);
router.get("/countaction",actionsController.countAction);
router.get("/actionstatus",actionsController.getActionStats);




module.exports = router;  