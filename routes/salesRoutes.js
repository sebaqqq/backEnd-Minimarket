const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const validateSales = require("../middlewares/validateSales");

router.get("/sales", salesController.getAllSales);
router.get("/sales/:id", validateSales, salesController.getSales);
router.post("/sales", salesController.createSale);
router.put("/sales/:id", validateSales, salesController.updateSale);
router.delete("/sales/:id", validateSales, salesController.deleteSale);

module.exports = router;
