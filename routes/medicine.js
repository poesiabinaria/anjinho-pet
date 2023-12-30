const express = require("express");
const router = express.Router();

const Medicine = require("../models/medicine");

router.post("/add", async (req, res) => {
  console.log(req.body);
  res.send("Add a new medicine");

  await Medicine.create(req.body);
});

module.exports = router;
