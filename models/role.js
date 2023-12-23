const Sequelize = require("sequelize");
const db = require("../config/db");

const User = require("../models/user");

const Role = db.define("Role", {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING },
});

module.exports = Role;
