module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    idProducto: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioProducto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoriaProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marcaProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidadProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Products.associate = (models) => {
    Products.belongsToMany(models.Sales, {
      through: "SalesProducts",
      foreignKey: "idProducto",
      otherKey: "idVenta",
    });
  };

  return Products;
};
