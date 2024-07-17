module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    idProducto: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioProducto: {
      type: DataTypes.DECIMAL(10),
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
    Products.hasMany(models.SalesProducts, {
      foreignKey: "idProducto",
      as: "SalesProducts",
    });
  };

  return Products;
};
