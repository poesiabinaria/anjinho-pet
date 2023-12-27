const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = db.define("role", {
  roleId: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
});

module.exports = Role;
