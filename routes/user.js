const express = require("express");
const router = express.Router();

const User = require("../models/user");

const getUserByIdHandler = async (req, res) => {
  console.log(req.body);

  const users = await User.findOne({
    where: { userId: req.params.id },
    attributes: ["username", "email", "roleId"],
  });

  res.send(users);
};

const getUserByRoleHandler = async (req, res) => {
  console.log(req.body);

  const users = await User.findAll({
    where: { roleId: req.params.id },
    attributes: ["username", "email", "roleId"],
  });

  res.send(users);
};

const registerUserHandler = async (req, res) => {
  console.log(req.body);

  await User.create(req.body);

  res.send("Register new user");
};

router.get("/:id", getUserByIdHandler);
router.get("/role/:id", getUserByRoleHandler);
router.post("/register", registerUserHandler);

module.exports = router;
