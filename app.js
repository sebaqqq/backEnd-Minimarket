// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const errorHandler = require("./middlewares/errorHandler");
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/usersRoutes");
// const db = require("./models");
// const cors = require("cors");

// // Middlewares
// app.use(express.json());
// // app.use(
// //   cors({
// //     origin: "http://localhost:1420",
// //   })
// // );
// app.use(cors());
// app.use(bodyParser.json());

// // Rutas
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// // Middleware de manejo de errores
// app.use(errorHandler);

// // Conexión a la base de datos
// db.sequelize.sync().then(() => {
//   console.log("Conexión a la base de datos establecida");
// });

// // Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto: ${PORT}`);
// });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/usersRoutes");
const db = require("./models");
const cors = require("cors");

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(bodyParser.json()); // Alternative JSON parsing middleware, use either this or express.json()

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
db.sequelize.sync().then(() => {
  console.log("Conexión a la base de datos establecida");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
