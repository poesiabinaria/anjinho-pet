const Sequelize = require("sequelize");
const db = require("../config/db");

const Medicine = db.define("medicine", {
  medicineId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  dose: { type: Sequelize.STRING },
  availableQty: { type: Sequelize.STRING },
  expirationDate: { type: Sequelize.DATEONLY },
  imageUrl: { type: Sequelize.STRING },
});

module.exports = Medicine;
