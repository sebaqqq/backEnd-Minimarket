const { Sales, SalesProducts, Products } = require("../models");

exports.getSales = async (req, res) => {
  try {
    const sale = await Sales.findOne({
      where: { idVenta: req.params.id },
      include: [{ model: Products, through: SalesProducts }],
    });
    if (sale) {
      res.status(200).json({
        success: true,
        sale,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Venta no encontrada",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.findAll({
      include: [{ model: Products, through: SalesProducts }],
    });
    if (sales.length) {
      res.status(200).json({
        success: true,
        sales,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No hay ventas registradas",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.createSale = async (req, res) => {
  const { fechaVenta, totalVenta, tipoPago, idUsers, productos } = req.body;

  try {
    const newSale = await Sales.create({
      fechaVenta,
      totalVenta,
      tipoPago,
      idUsers,
    });

    for (let producto of productos) {
      await SalesProducts.create({
        idVenta: newSale.idVenta,
        idProducto: producto.idProducto,
        cantidad: producto.cantidad,
      });
    }

    res.status(201).json({ success: true, sale: newSale });
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ success: false, message: "Error creating sale" });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const [updated] = await Sales.update(req.body, {
      where: {
        idVenta: req.params.id,
      },
    });
    if (updated) {
      const updatedSale = await Sales.findOne({
        where: { idVenta: req.params.id },
        include: [{ model: Products, through: SalesProducts }],
      });
      res.status(200).json({
        success: true,
        sale: updatedSale,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Venta no encontrada",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const deleted = await Sales.destroy({
      where: {
        idVenta: req.params.id,
      },
    });
    if (deleted) {
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
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
};
