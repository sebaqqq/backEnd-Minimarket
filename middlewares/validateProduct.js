const { Products } = require("../models");

const validateProducts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    req.product = product;
    next();
  } catch (error) {
    console.error("Validation error:", error.message || error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = validateProducts;
