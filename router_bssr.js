const express = require("express");
const router_bssr = express.Router();
const agencyController = require("./controllers/agencyController");

/* **********************
*        BSSR EJS       *
*************************/

//Restaurant releted router

router_bssr.get("/signup",agencyController.getSignupMyAgency);//signup router
router_bssr.post("/signup",agencyController.signupProcess);//signup router

router_bssr.get("/login", agencyController.getLoginMyAgency);//login router
router_bssr.post("/login", agencyController.loginProcess);//login router

router_bssr.get("/logout", agencyController.logout);//logout router


module.exports = router_bssr;