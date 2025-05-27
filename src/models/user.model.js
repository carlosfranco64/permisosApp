const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    emailtoken: {
      type: DataTypes.STRING,
      allowNull: true, // Temporalmente permitir valores nulos
    },
    
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    }, 

    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = { User };
