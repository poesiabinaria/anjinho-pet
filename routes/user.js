const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  console.log(req.body);
  res.send("Register new user");

  await User.create(req.body);
});

module.exports = router;
