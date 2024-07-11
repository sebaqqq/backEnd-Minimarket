const express = require("express");
const { Product } = require("../models");
const validateProduct = require("../middlewares/validateProduct");

const router = express.Router();

// Ruta para crear un nuevo producto
router.post("/products", validateProduct, async (req, res) => {
  try {
    const {
      nombreProducto,
      precioProducto,
      categoriaProducto,
      marcaProducto,
      cantidadProducto,
    } = req.body;
    const newProduct = await Product.create({
      nombreProducto,
      precioProducto,
      categoriaProducto,
      marcaProducto,
      cantidadProducto,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creando el producto" });
  }
});

// Ruta para obtener todos los productos
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los productos" });
  }
});

// Ruta para obtener un producto por ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo el producto" });
  }
});

// Ruta para actualizar un producto
router.put("/products/:id", validateProduct, async (req, res) => {
  try {
    const {
      nombreProducto,
      precioProducto,
      categoriaProducto,
      marcaProducto,
      cantidadProducto,
    } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.nombreProducto = nombreProducto;
      product.precioProducto = precioProducto;
      product.categoriaProducto = categoriaProducto;
      product.marcaProducto = marcaProducto;
      product.cantidadProducto = cantidadProducto;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error actualizando el producto" });
  }
});

// Ruta para eliminar un producto
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error eliminando el producto" });
  }
});

module.exports = router;
