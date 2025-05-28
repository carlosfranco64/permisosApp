const { Sequelize } = require("sequelize");
require("dotenv").config();

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_DIALECT) {
  throw new Error("Faltan variables de entorno para la conexión a la base de datos");
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a la base de datos establecida correctamente");
  } catch (error) {
    console.error("Error al conectar la base de datos: ", error);
  }
};

module.exports = { sequelize, connectDB };
