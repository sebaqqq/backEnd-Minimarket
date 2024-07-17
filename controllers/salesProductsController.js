const { SalesProducts, Products, Sales, Users } = require("../models");

exports.getAllSalesProducts = async (req, res) => {
  console.log("getAllSalesProducts called");
  try {
    const salesProducts = await SalesProducts.findAll({
      include: [
        {
          model: Products,
          as: "Product",
          attributes: [
            "idProducto",
            "nombreProducto",
            "precioProducto",
            "categoriaProducto",
            "marcaProducto",
            "cantidadProducto",
          ],
        },
        {
          model: Sales,
          as: "Sale",
          attributes: ["idVenta", "fechaVenta", "totalVenta", "tipoPago"],
          include: [
            {
              model: Users,
              as: "User",
              attributes: ["nombreUsuario", "emailUsuario"],
            },
          ],
        },
      ],
    });

    console.log("All salesProducts found:", salesProducts);

    if (salesProducts.length) {
      res.status(200).json({
        success: true,
        salesProducts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No hay ventas registradas",
      });
    }
  } catch (error) {
    console.error("Error in getAllSalesProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.getSalesProducts = async (req, res) => {
  console.log("getSalesProducts called with ID:", req.params.id);
  try {
    const sale = await SalesProducts.findOne({
      where: { idVenta: req.params.id },
      include: [
        { model: Products, as: "Product" },
        {
          model: Sales,
          as: "Sale",
          attributes: ["idVenta", "fechaVenta", "totalVenta"],
        },
      ],
    });
    console.log("Sale found:", sale);
    if (sale) {
      res.status(200).json({
        success: true,
        sale: {
          idVenta: sale.idVenta,
          fechaVenta: sale.Sale.fechaVenta,
          totalVenta: sale.Sale.totalVenta,
          producto: sale.Product,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Venta no encontrada",
      });
    }
  } catch (error) {
    console.error("Error in getSalesProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.createSalesProducts = async (req, res) => {
  console.log("createSalesProducts called with:", req.body);
  try {
    if (!req.body.idVenta || !req.body.idProducto || !req.body.cantidad) {
      return res.status(400).json({
        success: false,
        message: "Campos requeridos faltantes",
      });
    }
    const newSale = await SalesProducts.create(req.body);
    console.log("New sale created:", newSale);
    res.status(201).json({
      success: true,
      newSale,
    });
  } catch (error) {
    console.error("Error in createSalesProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.updateSalesProducts = async (req, res) => {
  console.log("updateSalesProducts called with ID:", req.params.id);
  try {
    const [affectedRows] = await SalesProducts.update(req.body, {
      where: { idVenta: req.params.id },
    });
    console.log("Sale updated:", affectedRows);
    if (affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Venta actualizada correctamente",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Venta no encontrada",
      });
    }
  } catch (error) {
    console.error("Error in updateSalesProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.deleteSalesProducts = async (req, res) => {
  console.log("deleteSalesProducts called with ID:", req.params.id);
  try {
    const deleted = await SalesProducts.destroy({
      where: { idVenta: req.params.id },
    });
    console.log("Sale deleted:", deleted);
    if (deleted > 0) {
      res.status(204).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Venta no encontrada",
      });
    }
  } catch (error) {
    console.error("Error in deleteSalesProducts:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.getSalesProductsByProduct = async (req, res) => {
  console.log("getSalesProductsByProduct called with ID:", req.params.id);
  try {
    const salesProducts = await SalesProducts.findAll({
      where: { idProducto: req.params.id },
    });
    console.log("SalesProducts found:", salesProducts);
    if (Array.isArray(salesProducts) && salesProducts.length > 0) {
      res.status(200).json({
        success: true,
        salesProducts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No hay ventas registradas",
      });
    }
  } catch (error) {
    console.error("Error in getSalesProductsByProduct:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};
