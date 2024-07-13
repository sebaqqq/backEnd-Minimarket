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

// Models
db.Users = require("./Users")(sequelize, Sequelize.DataTypes);
db.Sales = require("./Sales")(sequelize, Sequelize.DataTypes);
db.Products = require("./Products")(sequelize, Sequelize.DataTypes);
db.SalesProducts = require("./SalesProducts")(sequelize, Sequelize.DataTypes);

// Sync database
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
