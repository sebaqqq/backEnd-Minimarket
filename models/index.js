const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
  }
);

const db = {};

// Import models
db.Users = require("./users")(sequelize, DataTypes);
db.Products = require("./products")(sequelize, DataTypes);

// Sync database
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
