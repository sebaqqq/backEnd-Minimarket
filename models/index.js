// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const db = {};

// console.log(config);
// // Descripción: Configuración de la base de datos
// let sequelize;

// // Configuración de la base de datos
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// // Descripción: Leer los archivos de los modelos y cargarlos en la base de datos.
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     // Descripción: Filtrar los archivos que no sean el archivo actual y que tengan la extensión .js.
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     // Descripción: Importar el modelo y agregarlo al objeto db.
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Descripción: Exportar la conexión a la base de datos y los modelos.
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql", // Default to 'mysql' if DB_DIALECT is not set
    logging: process.env.DB_LOGGING === "true" ? console.log : false, // Enable logging if DB_LOGGING is 'true'
  }
);

const db = {};

// Import models
db.Users = require("./users")(sequelize, DataTypes);
db.Products = require("./product")(sequelize, DataTypes);

// Sync database
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
