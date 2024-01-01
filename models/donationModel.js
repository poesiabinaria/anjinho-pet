const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./userModel");
const Medicine = require("./medicineModel");

const Donation = db.define("donation", {
  donationId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: { type: Sequelize.STRING },
  //   donorId: { type: Sequelize.INTEGER, foreignKey: "userId" },
  //   doneeId: { type: Sequelize.INTEGER, foreignKey: "userId" },
  //   medicineId: { type: Sequelize.INTEGER, foreignKey: "medicineId" },
});

Donation.belongsTo(User, { as: "donor", foreignKey: "donorId" });
Donation.belongsTo(User, { as: "donee", foreignKey: "doneeId" });
Donation.belongsTo(Medicine, {
  foreignKey: { name: "medicineId", allowNull: false },
});

module.exports = Donation;
