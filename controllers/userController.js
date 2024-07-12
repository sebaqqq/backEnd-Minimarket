const db = require("../models/users");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { emailUsuario, passwordUsuario } = req.body;

  try {
    const user = await db.Users.findOne({
      where: { emailUsuario },
    });

    if (user) {
      const match = await bcrypt.compare(passwordUsuario, user.passwordUsuario);

      if (match) {
        res.status(200).json({
          token: "fake-jwt-token",
          user: {
            idUsuario: user.idUsuario,
            nombreUsuario: user.nombreUsuario,
            emailUsuario: user.emailUsuario,
            rolUsuario: user.rolUsuario,
          },
        });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al iniciar sesión",
      error: error.message,
    });
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

// exports.createUser = async (req, res) => {
//   try {
//     const user = await db.Users.create(req.body);
//     res.status(201).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Hubo un error al crear el usuario",
//       error: error.message,
//     });
//   }
// };
exports.createUser = async (req, res) => {
  try {
    // Crear un nuevo usuario usando los datos recibidos en req.body
    const user = await db.Users.create(req.body);

    // Si se crea exitosamente, devolver una respuesta con estado 201 (Created)
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    // Si hay un error durante la creación del usuario, devolver una respuesta con estado 500 (Internal Server Error)
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el usuario",
      error: error.message, // Información detallada del error
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
