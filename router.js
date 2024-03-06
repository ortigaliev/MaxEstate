const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

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

//Others
router.get("/community", (req, res) => {
  res.send("Community Page");
});

module.exports = router;
