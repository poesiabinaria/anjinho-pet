const Sequelize = require("sequelize");

const config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "nicadb",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

// const db = {};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.user = require("../models/user.model")(sequelize, Sequelize);
// db.role = require("../models/role.model")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });

// db.user.belongsToMany(db.role, {
//   through: "user_roles",
// });

// db.ROLES = ["tutor", "veterinary", "voluntary", "shelter"];

module.exports = sequelize;
