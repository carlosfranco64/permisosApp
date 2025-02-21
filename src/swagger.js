const swaggerAutogen = require("swagger-autogen");

const outputFile = "src/swagger.json";
const endPointsFiles = ["./app.js"];

const doc = {
  info: {
    title: "API de control de usuarios basado en roles",
    description: "Esta api permite gestionar Roles y Usuarios",
  },
  host: "localhost:3000",
  Schemes: ["http"],
};

swaggerAutogen()(outputFile,endPointsFiles,doc)