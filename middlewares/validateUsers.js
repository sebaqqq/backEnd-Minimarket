const { Users } = require("../models");

const validateUsers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Validation error:", error.message || error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = validateUsers;
