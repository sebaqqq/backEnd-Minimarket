const express = require("express");
const router = express.Router();
const salesProductsController = require("../controllers/salesProductsController");
const validateSalesProducts = require("../middlewares/validateSalesProducts");

router.get("/salesProducts", salesProductsController.getAllSalesProducts);
router.get("/salesProducts/:id", salesProductsController.getSalesProducts);
router.post(
  "/salesProducts",
  validateSalesProducts,
  salesProductsController.createSalesProducts
);
router.put(
  "/salesProducts/:id",
  validateSalesProducts,
  salesProductsController.updateSalesProducts
);
router.delete(
  "/salesProducts/:id",
  salesProductsController.deleteSalesProducts
);

module.exports = router;
