const express = require("express");
const { Users } = require("../models");
const validateUser = require("../middlewares/validateUsers");

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/users", validateUser, async (req, res) => {
  try {
    const { nombreUsuario, emailUsuario, passwordUsuario, rolUsuario } =
      req.body;
    const newUser = await Users.create({
      nombreUsuario,
      emailUsuario,
      passwordUsuario,
      rolUsuario,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creando el usuario" });
  }
});

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo los usuarios" });
  }
});

// Ruta para obtener un usuario por ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo el usuario" });
  }
});

// Ruta para actualizar un usuario
router.put("/users/:id", validateUser, async (req, res) => {
  try {
    const { nombreUsuario, emailUsuario, passwordUsuario, rolUsuario } =
      req.body;
    const [updated] = await Users.update(
      {
        nombreUsuario,
        emailUsuario,
        passwordUsuario,
        rolUsuario,
      },
      {
        where: { idUsuario: req.params.id },
      }
    );
    if (updated) {
      const updatedUser = await Users.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error actualizando el usuario" });
  }
});

// Ruta para eliminar un usuario
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error eliminando el usuario" });
  }
});

module.exports = router;
