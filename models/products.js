module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
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
  return Products;
};
