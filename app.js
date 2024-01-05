const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Op } = require("sequelize");

const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/userRoutes");
const medicineRouter = require("./routes/medicineRoutes");
const donationRouter = require("./routes/donationRoutes");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

require("dotenv-safe").config({
  allowEmptyValues: true,
});

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/db");

const Role = require("./models/roleModel");

const Donation = require("./models/donationModel");
const Message = require("./models/messageModel");
const Conversation = require("./models/conversationModel");
const User = require("./models/userModel");
const { requireAuth } = require("./middleware/authMiddleware");
const Medicine = require("./models/medicineModel");

db.sync({ force: true }).then(async () => {
  console.log("Drop and resync db");

  await Role.bulkCreate([
    {
      roleId: 0,
      name: "admin",
    },
    {
      roleId: 1,
      name: "shelter",
    },
    {
      roleId: 2,
      name: "voluntary",
    },
    {
      roleId: 3,
      name: "tutor",
    },
    {
      roleId: 4,
      name: "veterinary",
    },
  ]);

  await User.bulkCreate([
    {
      username: "Gatinhos Ajuda",
      email: "gatinhos-ajuda@gmail.com",
      password: "123",
      roleId: 1,
    },
    {
      username: "Graziella",
      email: "graziella@gmail.com",
      password: "123",
      roleId: 4,
    },
    {
      username: "Gabriel",
      email: "gabriel@gmail.com",
      password: "123",
      roleId: 3,
    },
    {
      username: "Lilian",
      email: "lilian@gmail.com",
      password: "123",
      roleId: 2,
    },
  ]);

  await Medicine.bulkCreate([
    {
      name: "Hepatox",
      type: "antitoxic",
      dose: 500,
      doseMeasuement: "mg/ml",
      availableQty: 10,
      availableQtyMeasurement: "ml",
      expirationDate: "2025-06-21",
      imageUrl: "/path-img/qwerty.png",
      userId: 2,
    },
    {
      name: "Advocate",
      type: "vermifuge",
      dose: 500,
      doseMeasuement: "mg/ml",
      availableQty: 10,
      availableQtyMeasurement: "ml",
      expirationDate: "2025-06-21",
      imageUrl: "/path-img/qwerty.png",
      userId: 2,
    },
  ]);

  const acceptDonation = async (donorId, doneeId, medicineId) => {
    const donation = await Donation.create({
      donorId,
      doneeId,
      medicineId,
      status: "pending",
    });

    await Conversation.bulkCreate([
      { donationId: donation.donationId, userId: donorId },
      { donationId: donation.donationId, userId: doneeId },
    ]);
  };

  await acceptDonation(2, 1, 1);
  await acceptDonation(2, 1, 2);
  // acceptDonation(2, 1, 1);
});

// const getById = async () => {
//   console.log("USERRRRRR");
//   const role = await Role.findByPk(1);

//   console.log(role);
// };

// getById();

app.get("/chat", async (req, res) => {
  console.log("list chats");

  const donations = await Donation.findAll({
    where: {
      [Op.or]: [{ donorId: 1 }, { doneeId: 1 }],
    },
    attributes: ["donationId"],
  });

  const donationIds = donations.map((item) => item.donationId);

  const conversations = await Conversation.findAll({
    where: { userId: { [Op.ne]: 1 }, donationId: donationIds },
    include: User,
  });

  res.send(conversations);
});

app.post("/chat/:senderId/to/:receiverId", (req, res) => {
  console.log("get chat", __dirname);

  const { senderId, receiverId } = req.params;

  console.log("@@@@@@@@", senderId, receiverId);

  io.on("connection", (socket) => {
    console.log("####### user connected! socketID: ", socket.id);

    socket.on("chatToServer", (data) => {
      const { senderId, receiverId, text } = data;

      console.log("message: " + text);
      console.log("senderId: " + senderId);
      console.log("receiverId: " + receiverId);
      io.emit("chatToClient", data.text);
    });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado");
    });
  });

  res.sendFile(__dirname + "/index.html");
});
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/medicine", medicineRouter);
app.use("/donation", donationRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
