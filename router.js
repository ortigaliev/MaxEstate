const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const estateController = require("./controllers/estateController");
const agencyController = require("./controllers/agencyController");
const orderController = require("./controllers/orderController");
const blogController = require("./controllers/blogController");
const followController = require("./controllers/followController");
const uploader_community = require("./utils/upload-multer")("blog");
const uploader_member = require("./utils/upload-multer")("members");

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

//Blog related routers
router.post(
  "/blog/image",
  uploader_community.single("blog_image"),
  blogController.imageInsertion
);
router.post(
  "/blog/create",
  memberController.retrieveAuthMember,
  blogController.createBlog
);
router.get(
  "/blog/articles",
  memberController.retrieveAuthMember,
  blogController.getMemberBlogs
);
router.get(
  "/blog/target",
  memberController.retrieveAuthMember,
  blogController.getBlogs
);
router.get(
  "/blog/single-blog/:bo_id",
  memberController.retrieveAuthMember,
  blogController.getChosenBlog
);

//following related routers
router.post(
  "/follow/subscribe",
  memberController.retrieveAuthMember,
  followController.subscribe
);
router.post(
  "/follow/unsubscribe",
  memberController.retrieveAuthMember,
  followController.unsubscribe
);

module.exports = router;
