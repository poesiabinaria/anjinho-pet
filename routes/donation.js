const express = require("express");
const router = express.Router();

const Donation = require("../models/donation");
const User = require("../models/user");

const newDonationHandler = async (req, res) => {
  await Donation.create(req.body);

  res.send("Create a new donation");
};

const deleteDonationHandler = async (req, res) => {
  await Donation.destroy({ where: { donationId: req.params.donationId } });

  res.send("Delete a donation");
};

const getDonationsMadeByUserIdHandler = async (req, res) => {
  const users = await Donation.findAll({
    where: { donorId: req.params.userId },
    include: [
      { model: User, as: "donor" },
      { model: User, as: "donee" },
    ],
  });

  res.send(users);
};

const getDonationsReceivedByUserIdHandler = async (req, res) => {
  const users = await Donation.findAll({
    where: { doneeId: req.params.userId },
    include: [
      { model: User, as: "donor" },
      { model: User, as: "donee" },
    ],
  });

  res.send(users);
};

router.post("/", newDonationHandler);
router.delete("/:donationId", deleteDonationHandler);
router.get("/made/user/:userId", getDonationsMadeByUserIdHandler);
router.get("/received/user/:userId", getDonationsReceivedByUserIdHandler);

module.exports = router;
