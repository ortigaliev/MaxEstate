const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const estateController = require("./controllers/estateController");

//Member realted routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

//Product related routers
router.post(
  "/estate",
  memberController.retrieveAuthMember,
  estateController.getAllEstate
);

router.get(
  "/estate/:id",
  memberController.retrieveAuthMember,
  estateController.getChosenEstate
);

//Others
router.get("/community", (req, res) => {
  res.send("Community Page");
});

module.exports = router;
