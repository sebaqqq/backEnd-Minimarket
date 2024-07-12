const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validateProducts = require("../middlewares/validateProduct");

router.get("/products", productController.getProducts);
router.post("/products", validateProducts, productController.createProduct);
router.put("/products/:id", validateProducts, productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
