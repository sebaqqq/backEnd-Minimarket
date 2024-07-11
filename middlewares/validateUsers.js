const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser un texto")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("email").isEmail().withMessage("El email debe ser un correo válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
