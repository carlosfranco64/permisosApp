const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('menu', 'root', '', {
    host: 'localhost',
    dialect:  'mysql'  
  });


  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Conexion a la base de datos establecida correctamente");
    } catch (error) {
      console.error("Error al conectar la base de datos: ", error);
    }
  };

  module.exports ={sequelize,connectDB}