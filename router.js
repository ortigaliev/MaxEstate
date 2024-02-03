const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
res.send("Home");
});

router.get("/property", (req, res) => {
res.send("Property Page");
});

router.get("/community", (req, res) => {
  res.send("Community Page");
});

module.exports = router;