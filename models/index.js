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

// Associations
// Users and Sales
db.Users.hasMany(db.Sales, {
  foreignKey: "idUsers",
  as: "Sales",
});

db.Sales.belongsTo(db.Users, {
  foreignKey: "idUsers",
  as: "User",
});

// Products and SalesProducts
db.Products.hasMany(db.SalesProducts, {
  foreignKey: "idProducto",
  as: "SalesProducts",
});

db.SalesProducts.belongsTo(db.Products, {
  foreignKey: "idProducto",
  as: "Product",
});

// Sales and SalesProducts
db.Sales.hasMany(db.SalesProducts, {
  foreignKey: "idVenta",
  as: "SalesProducts",
});

db.SalesProducts.belongsTo(db.Sales, {
  foreignKey: "idVenta",
  as: "Sale",
});

// Sync database
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
