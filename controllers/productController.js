const db = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los productos",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el producto",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await db.Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated) {
      const updatedProduct = await db.Product.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el producto",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al eliminar el producto",
      error: error.message,
    });
  }
};
