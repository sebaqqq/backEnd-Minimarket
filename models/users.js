module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
    },
    emailUsuario: {
      type: DataTypes.STRING,
    },
    passwordUsuario: {
      type: DataTypes.STRING,
    },
    rolUsuario: {
      type: DataTypes.STRING,
    },
  });
  return Users;
};
