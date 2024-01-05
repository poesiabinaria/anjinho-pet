const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const loginHandler = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  // const isValidPassword = await user.validPassword(
  //   req.body.password,
  //   user.password
  // );

  // console.log("@@@@@@@@@@@@@@", isValidPassword);

  if (true) {
    const token = jwt.sign({ id: user.userId }, process.env.SECRET, {
      expiresIn: 5000000,
    });

    return res.json({ auth: true, token });
  }

  res.status(500).json({ message: "User or password incorrect" });
};

router.post("/", loginHandler);

module.exports = router;
