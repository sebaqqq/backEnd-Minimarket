module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreProducto: {
      type: DataTypes.STRING,
    },
    precioProducto: {
      type: DataTypes.INTEGER,
    },
    categoriaProducto: {
      type: DataTypes.STRING,
    },
    marcaProducto: {
      type: DataTypes.STRING,
    },
    cantidadProducto: {
      type: DataTypes.INTEGER,
    },
  });
  return Product;
};
