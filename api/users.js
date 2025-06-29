const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("signup is working ");
});

module.exports = router;
