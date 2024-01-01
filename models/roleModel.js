const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = db.define("role", {
  roleId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
});

module.exports = Role;
