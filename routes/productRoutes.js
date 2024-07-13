// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const validateProducts = require("../middlewares/validateProduct");

// router.get("/products", productController.getProducts);
// router.post("/products", productController.createProduct);
// router.put("/products/:id", validateProducts, productController.updateProduct);
// router.delete("/products/:id", productController.deleteProduct);

// module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validateProducts = require("../middlewares/validateProduct");

router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", validateProducts, productController.updateProduct);
router.delete(
  "/products/:id",
  validateProducts,
  productController.deleteProduct
);

module.exports = router;
