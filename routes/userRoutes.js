const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const getUserByIdHandler = async (req, res) => {
  const users = await User.findByPk(req.userId, {
    attributes: ["username", "email", "roleId"],
  });

  res.send(users);
};

const getUsersByRoleHandler = async (req, res) => {
  const users = await User.findAll({
    where: { roleId: req.params.id },
    attributes: ["username", "email", "roleId"],
  });

  res.send(users);
};

const registerUserHandler = async (req, res) => {
  await User.create(req.body);

  res.send("Register new user");
};

router.get("/", requireAuth, getUserByIdHandler);
router.get("/role/:id", requireAuth, getUsersByRoleHandler);
router.post("/register", registerUserHandler);

module.exports = router;
