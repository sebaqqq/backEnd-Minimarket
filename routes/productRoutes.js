const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validateProducts = require("../middlewares/validateProduct");

router.put("/updateQuantity", productController.updateProductQuantity);
router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete(
  "/products/:id",
  validateProducts,
  productController.deleteProduct
);

module.exports = router;
