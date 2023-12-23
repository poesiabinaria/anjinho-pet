const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/db");

const User = require("./models/user");
const Role = require("./models/role");
const Donation = require("./models/donation");

db.sync({ force: true }).then(() => {
  console.log("Drop and resync db");

  Role.create({
    id: 1,
    name: "tutor",
  });

  Role.create({
    id: 2,
    name: "veterinary",
  });

  Role.create({
    id: 3,
    name: "voluntary",
  });

  Role.create({
    id: 4,
    name: "shelter",
  });
});

const getById = async () => {
  console.log("USERRRRRR");
  const role = await Role.findByPk(1);

  console.log(role);
};

getById();

app.get("/", (req, res) => {
  res.send("Olá!");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
