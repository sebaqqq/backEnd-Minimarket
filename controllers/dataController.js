const db = require("../models");

// Obtener todos los datos
exports.getData = async (req, res) => {
  try {
    const data = await db.Data.findAll();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los datos",
      error: error.message,
    });
  }
};

// Crear un nuevo dato
exports.createData = async (req, res) => {
  try {
    const data = await db.Data.create(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el dato",
      error: error.message,
    });
  }
};

// Actualizar un dato existente
exports.updateData = async (req, res) => {
  try {
    const [updated] = await db.Data.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated) {
      const updatedData = await db.Data.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        success: true,
        data: updatedData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Dato no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el dato",
      error: error.message,
    });
  }
};

// Eliminar un dato
exports.deleteData = async (req, res) => {
  try {
    const deleted = await db.Data.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Dato eliminado correctamente",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Dato no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al eliminar el dato",
      error: error.message,
    });
  }
};
