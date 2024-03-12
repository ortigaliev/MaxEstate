const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const estateController = require("./controllers/estateController");
const agencyController = require("./controllers/agencyController");
const orderController = require("./controllers/orderController");

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

//Estate related routers
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

//Agency related routers
router.get(
  "/agencies",
  memberController.retrieveAuthMember,
  agencyController.getAgencies
);
router.get(
  "/agencies/:id",
  memberController.retrieveAuthMember,
  agencyController.getChosenAgency
);

//Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);
router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);
router.post(
  "/orders/edit",
  memberController.retrieveAuthMember,
  orderController.editChosenOrder
);

//Others
router.get("/community", (req, res) => {
  res.send("Community Page");
});

module.exports = router;
