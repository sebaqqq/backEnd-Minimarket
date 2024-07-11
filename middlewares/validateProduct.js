const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("nombreProducto")
    .isString()
    .withMessage("El nombre del producto debe ser un texto")
    .isLength({ min: 3 })
    .withMessage("El nombre del producto debe tener al menos 3 caracteres"),
  body("precioProducto")
    .isNumeric()
    .withMessage("El precio del producto debe ser un número")
    .custom((value) => value > 0)
    .withMessage("El precio del producto debe ser mayor a 0"),
  body("categoriaProducto")
    .isString()
    .withMessage("La categoría del producto debe ser un texto"),
  body("marcaProducto")
    .isString()
    .withMessage("La marca del producto debe ser un texto"),
  body("cantidadProducto")
    .isNumeric()
    .withMessage("La cantidad del producto debe ser un número")
    .custom((value) => value >= 0)
    .withMessage("La cantidad del producto debe ser mayor o igual a 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProduct;
