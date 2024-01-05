const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const Role = require("./roleModel");
const Medicine = require("./medicineModel");

const User = db.define(
  "user",
  {
    userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.validPassword = async (loginPassword, userPassword) =>
  await bcrypt.compare(loginPassword, userPassword);

// User.belongsToMany(Role, {
//   primaryKey: true,
//   foreignKey: "userId",
//   through: "user_roles",
// });

// Role.belongsToMany(User, {
//   primaryKey: true,
//   foreignKey: "roleId",
//   through: "user_roles",
// });

// 1:N
// GET ROLES WITH USERS
Role.hasMany(User, { foreignKey: { name: "roleId", allowNull: false } });
// GET USERS AND ITS ROLE
User.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(Medicine, { foreignKey: { name: "userId", allowNull: false } });
Medicine.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
