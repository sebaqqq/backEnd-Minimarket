module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define(
    "Sales",
    {
      idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tipoPago: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUsers: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "idUsuario",
        },
      },
    },
    {
      tableName: "Sales",
    }
  );

  Sales.associate = (models) => {
    Sales.hasMany(models.SalesProducts, {
      foreignKey: "idVenta",
      as: "SalesProducts",
    });
  };

  return Sales;
};
