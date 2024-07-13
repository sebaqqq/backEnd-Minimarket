const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/usersRoutes");
const salesRoutes = require("./routes/salesRoutes");
const db = require("./models");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(cors({ origin: "http://localhost:1420" }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
db.sequelize
  .sync()
  .then(() => {
    console.log("Conexión a la base de datos establecida");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
