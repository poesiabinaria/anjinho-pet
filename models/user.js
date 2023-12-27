const Sequelize = require("sequelize");
const db = require("../config/db");

const Role = require("./role");
const Medicine = require("./medicine");

const User = db.define("user", {
  userId: { type: Sequelize.INTEGER, primaryKey: true },
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

User.belongsToMany(Role, {
  primaryKey: true,
  foreignKey: "userId",
  through: "user_roles",
});

Role.belongsToMany(User, {
  primaryKey: true,
  foreignKey: "roleId",
  through: "user_roles",
});

// 1:N
User.hasMany(Medicine, { foreignKey: "userId" });
Medicine.belongsTo(User, { foreignKey: "medicineId" });

module.exports = User;
