const express = require("express");
const router = express.Router();

const Donation = require("../models/donationModel");
const User = require("../models/userModel");

const newDonationHandler = async (req, res) => {
  await Donation.create(req.body);

  res.send("Create a new donation");
};

const deleteDonationHandler = async (req, res) => {
  await Donation.destroy({ where: { donationId: req.params.donationId } });

  res.send("Delete a donation");
};

const updateDonationStatusHandler = async (req, res) => {
  await Donation.update(
    { status: req.body.status },
    {
      where: { donationId: req.params.donationId },
    }
  );

  res.send("Update donation status");
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
router.put("/:donationId", updateDonationStatusHandler);
router.get("/made/user/:userId", getDonationsMadeByUserIdHandler);
router.get("/received/user/:userId", getDonationsReceivedByUserIdHandler);

module.exports = router;
