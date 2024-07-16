const { SalesProducts } = require("../models");

const validateSalesProducts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await SalesProducts.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    req.sale = sale;
    next();
  } catch (error) {
    console.error("Validation error:", error.message || error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = validateSalesProducts;
