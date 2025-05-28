const { sequelize } = require("../db");
const { Menu } = require("./menu.model");
const { Permiso } = require("./permiso.model");
const { Rol } = require("./rol.model");
const { User } = require("./user.model");
const bcrypt = require("bcryptjs");

Rol.hasMany(User, { foreignKey: "idRol" });
User.belongsTo(Rol, { foreignKey: "idRol" });

// Relación entre Permiso y Rol (Un rol tiene muchos permisos)
Rol.hasMany(Permiso, { foreignKey: "idRol" });
Permiso.belongsTo(Rol, { foreignKey: "idRol" });

// Relación entre Permiso y Menu (Un menú puede estar en varios permisos)
Menu.hasMany(Permiso, { foreignKey: "idMenu" });
Permiso.belongsTo(Menu, { foreignKey: "idMenu" });

const connectDB = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("Modelos sincronizados correctamente.");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
};

connectDB();

const createDefaultRole = async () => {
  try {
    // Verifica si el rol 'admin' ya existe
    const rolAdmin = await Rol.findOne({ where: { name: "Admin" } });
    const rolUsuario = await Rol.findOne({ where: { name: "User" } });

    if (!rolAdmin) {
      await Rol.create({ name: "Admin", description: "Acceso Ilimitado" });
      console.log("Rol 'Admin' creado.");
    } else {
      console.log("El rol Admin ya existe.");
    }

    if (!rolUsuario) {
      await Rol.create({ name: "User", description: "Acceso Limitado" });
      console.log("Rol 'User' creado.");
    } else {
      console.log("El rol User ya existe.");
    }
  } catch (error) {
    console.error("Error al verificar o crear el rol:", error);
  }
};

createDefaultRole();

const createAdminUser = async () => {
  try {
    // Verifica si el rol 'admin' ya existe
    const adminRole = await Rol.findOne({ where: { name: "Admin" } });

    if (!adminRole) {
      console.log("El rol admin no existe.");
      return;
    }

    // Verifica si ya existe un usuario con el email
    const existingUser = await User.findOne({
      where: { email: "admin@admin.com" },
    });

    if (existingUser) {
      console.log("El usuario con ese correo ya existe.");
      return;
    }

    // Encripta el password con bcrypt
    const plainPassword = process.env.ADMIN_PASSWORD; // La contraseña que quieres encriptar
    if (!plainPassword) {
      throw new Error(
        "La contraseña del administrador no está definida en el archivo .env"
      );
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Crea el usuario con el rol 'admin'
    const newUser = await User.create({
      name: "Administrador",
      email: "admin@admin.com",
      password: hashedPassword,
      emailtoken: null,
      isVerified: true,
      idRol: adminRole.id, // Asocia el rol 'admin'
    });

    console.log("Usuario admin creado:", newUser);
    console.log("Contraseña encriptada:", hashedPassword); // Aquí está la contraseña encriptada
  } catch (error) {
    console.error("Error al crear el usuario admin:", error);
  }
};

createAdminUser();

const createMenus = async () => {
  try {
    const menus = [
      { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
      { name: "Usuarios", path: "/users", icon: "users" },
      { name: "Configuración", path: "/settings", icon: "settings" },
      { name: "Reportes", path: "/reports", icon: "reports" },
      { name: "Perfil", path: "/profile", icon: "user" },
      { name: "Ayuda", path: "/help", icon: "help" },
    ];

    for (const menu of menus) {
      // Verifica si el menú ya existe
      const menuExists = await Menu.findOne({ where: { name: menu.name } });

      if (!menuExists) {
        // Si no existe, lo crea
        const newMenu = await Menu.create({
          name: menu.name,
          path: menu.path,
          icon: menu.icon,
        });
        console.log(`Menú '${menu.name}' creado.`);
      } else {
        console.log(`El menú '${menu.name}' ya existe.`);
      }
    }
  } catch (error) {
    console.error("Error al verificar o crear los menús:", error);
  }
};

// Ejecuta la función para crear los menús

createMenus();

module.exports = {
  User,
  Rol,
  connectDB,
  createDefaultRole,
  createAdminUser,
  createMenus,
};
