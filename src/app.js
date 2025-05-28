const express = require("express");
const rolRoutes = require("./routes/rol.routes");
const userRoutes = require("./routes/user.routes");
const permisoRoutes = require("./routes/permiso.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("./models");
const { connectDB } = require("./db");
const fs = require("fs");
const path = require("path");

const cors = require("cors");

const app = express();

const swaggerUI = require("swagger-ui-express");

// ✅ Usar `path.resolve` para asegurar la ruta correcta
const swaggerPath = path.resolve("src/swagger.json");

let swaggerDocumentation;
try {
  swaggerDocumentation = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
} catch (error) {
  console.error("⚠️ Error al leer swagger.json:", error.message);
  process.exit(1); // Detiene la ejecución si el archivo no existe
}

connectDB();

// app.use(cors({
//   origin:'http://localhost:5173',
//   credentials:true
// }))
app.use(cors({
  origin:'*',
  credentials:false
}))

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ✅ Corrección en `swaggerUI.serve`
app.use("/doc/api", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

app.use("/api", rolRoutes);
app.use("/api", userRoutes);
app.use("/api", permisoRoutes);
app.use("/api", authRoutes);

module.exports = app;
