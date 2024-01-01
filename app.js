require("dotenv-safe").config({
  allowEmptyValues: true,
});

const express = require("express");
const cors = require("cors");

const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/userRoutes");
const medicineRouter = require("./routes/medicineRoutes");
const donationRouter = require("./routes/donationRoutes");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/db");

const Role = require("./models/roleModel");

const Donation = require("./models/donationModel");

db.sync({ alter: true }).then(() => {
  console.log("Drop and resync db");

  // Role.create({
  //   roleId: 1,
  //   name: "tutor",
  // });

  // Role.create({
  //   roleId: 2,
  //   name: "veterinary",
  // });

  // Role.create({
  //   roleId: 3,
  //   name: "voluntary",
  // });

  // Role.create({
  //   roleId: 4,
  //   name: "shelter",
  // });
});

// const getById = async () => {
//   console.log("USERRRRRR");
//   const role = await Role.findByPk(1);

//   console.log(role);
// };

// getById();

app.get("/", (req, res) => {
  res.send("Olá!");
});

app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/medicine", medicineRouter);
app.use("/donation", donationRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
