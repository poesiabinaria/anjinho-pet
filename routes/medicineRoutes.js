const express = require("express");
const router = express.Router();

const Medicine = require("../models/medicineModel");

router.post("/add", async (req, res) => {
  res.send("Add a new medicine");

  await Medicine.create(req.body);
});

module.exports = router;
