const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = require("./role");

const User = db.define("User", {
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

User.belongsToMany(Role, {
  constraint: true,
  foreignKey: "roleId",
  through: "user_roles",
});

module.exports = User;
