const db = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

exports.login = async (req, res) => {
  const { emailUsuario, passwordUsuario } = req.body;

  try {
    const user = await Users.findOne({ where: { emailUsuario } });

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(passwordUsuario, user.passwordUsuario);

    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { idUsuario: user.idUsuario, rolUsuario: user.rolUsuario },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        idUsuario: user.idUsuario,
        nombreUsuario: user.nombreUsuario,
        rolUsuario: user.rolUsuario,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await db.Users.findAll();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los usuarios",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  const { emailUsuario, passwordUsuario, nombreUsuario } = req.body; // Asegúrate de que estos campos existan

  try {
    const hashedPassword = await bcrypt.hash(passwordUsuario, 10); // Asegúrate de hashear la contraseña
    const user = await Users.create({
      emailUsuario,
      passwordUsuario: hashedPassword,
      nombreUsuario,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await db.Users.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated) {
      const updatedUser = await db.Users.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el usuario",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await db.Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleted) {
      res.status(204).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al eliminar el usuario",
      error: error.message,
    });
  }
};
