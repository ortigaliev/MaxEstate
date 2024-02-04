const express = require("express");
const router_bssr = express.Router();
const agencyController = require("./controllers/agencyController");

/* **********************
*        BSSR EJS       *
*************************/

//Restaurant releted router

router_bssr
.get("/signup",agencyController.getSignupMyAgency)//signup router
.post("/signup",agencyController.signupProcess);//signup router

router_bssr
.get("/login", agencyController.getLoginMyAgency)//login router
.post("/login", agencyController.loginProcess);//login router

router_bssr.get("/logout", agencyController.logout);//logout router

router_bssr.get("/estate/list", agencyController.getMyAgencyData);


module.exports = router_bssr;