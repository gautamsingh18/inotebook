const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h2>hi from notes router</h2>");
});

module.exports = router;
