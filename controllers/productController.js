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

exports.updateProductQuantity = async (req, res) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: "La solicitud debe contener un array de actualizaciones",
      });
    }

    await Promise.all(
      updates.map(async (update) => {
        const { idProducto, nuevaCantidad } = update;
        const product = await Products.findOne({
          where: { idProducto: idProducto },
        });

        if (product) {
          product.cantidadProducto = nuevaCantidad;
          await product.save();
        } else {
          throw new Error(`Producto con ID ${idProducto} no encontrado`);
        }
      })
    );

    res.status(200).json({
      success: true,
      message: "Cantidades de productos actualizadas correctamente",
    });
  } catch (error) {
    console.error("Error en updateProductQuantity:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar la cantidad",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  console.log("Datos recibidos para actualizar el producto:", req.body);
  console.log("ID del producto a actualizar:", req.params.id);

  try {
    const [updated] = await Products.update(req.body, {
      where: {
        idProducto: req.params.id,
      },
    });

    console.log("Resultado de la actualización:", updated);

    if (updated) {
      const updatedProduct = await Products.findOne({
        where: { idProducto: req.params.id },
      });

      console.log("Producto actualizado:", updatedProduct);

      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } else {
      console.log("Producto no encontrado para la actualización");

      res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);

    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el producto",
      error: error.message,
    });
  }
};
