module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define("SalesProducts", {
    idVenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Sales",
        key: "idVenta",
      },
    },
    idProducto: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      references: {
        model: "Products",
        key: "idProducto",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return SalesProducts;
};
