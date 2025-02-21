const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   

   
  },
  {
    tableName: "Menus",
    timestamps: true,
  }
);

module.exports = { Menu };
