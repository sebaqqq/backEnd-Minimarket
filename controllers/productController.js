const { Products } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
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
  const {
    idProducto,
    nombreProducto,
    precioProducto,
    categoriaProducto,
    marcaProducto,
    cantidadProducto,
  } = req.body;

  console.log(req.body);

  try {
    const newProduct = await Products.create({
      idProducto,
      nombreProducto,
      precioProducto,
      categoriaProducto,
      marcaProducto,
      cantidadProducto,
    });

    res.status(201).json({
      message: "Producto registrado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al registrar el producto",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Products.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated) {
      const updatedProduct = await Products.findOne({
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
    const deleted = await Products.destroy({
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
