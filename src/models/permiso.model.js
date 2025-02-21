const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Permiso = sequelize.define(
  "Permiso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    },
    idMenu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Menus",
        key: "id",
      },
    },
  },
  {
    tableName: "Permisos",
    timestamps: true,
  }
);

module.exports = { Permiso };
