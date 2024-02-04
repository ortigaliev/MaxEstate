const express = require("express");
const router_bssr = express.Router();
const agencyController = require("./controllers/agencyController");
const estateController = require("./controllers/estateController");
const uploader_product = require("./utils/upload-multer")("estate");

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
router_bssr.get("/check-me", agencyController.checkSession);//


router_bssr.get("/estate/list", agencyController.getMyAgencyData);
router_bssr.post("/estate/create",
  agencyController.validateAuthAgency,
  uploader_product.array("estate_images", 5),
  estateController.addNewEstate);
router_bssr.post("/estate/edit/:id", estateController.updateChosenEstate);


module.exports = router_bssr;