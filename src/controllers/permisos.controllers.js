const { Menu } = require("../models/menu.model");
const { Permiso } = require("../models/permiso.model");

const setPermiso = async (req, res) => {
  try {
    const { idRol } = req.params;
    const permisos = req.body; // Lista de permisos [{ idRol, idMenu }]

    if (!idRol || !Array.isArray(permisos)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    // Obtener permisos actuales del rol en la base de datos
    const permisosActuales = await Permiso.findAll({ where: { idRol } });

    // Extraer solo los idMenu enviados en la petición
    const nuevosIdMenus = permisos.map((p) => Number(p.idMenu));

    // 1️⃣ Crear o actualizar permisos
    for (const permiso of permisos) {
      const idMenu = Number(permiso.idMenu);

      // Buscar si el permiso ya existe
      let permisoExistente = await Permiso.findOne({
        where: { idRol, idMenu },
      });

      if (permisoExistente) {
        // Si existe, actualizar (si hay más campos en el futuro)
        await permisoExistente.update({ idRol, idMenu });
      } else {
        // Si no existe, crearlo
        await Permiso.create({ idRol, idMenu });
      }
    }

    // 2️⃣ Eliminar permisos que ya no están en la nueva lista
    for (const permiso of permisosActuales) {
      if (!nuevosIdMenus.includes(permiso.idMenu)) {
        await permiso.destroy();
      }
    }

    return res
      .status(200)
      .json({ message: "Permisos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar permisos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};



const getMenusByRole = async (req, res) => {
  try {
    const { idRol } = req.params;

    // Buscar permisos asociados al idRol
    const permisos = await Permiso.findAll({
      where: { idRol: idRol },
      attributes: ["idMenu"], // Solo obtenemos los id_menu
    });

    if (permisos.length === 0) {
      return res.status(404).json({ message: "Menús no encontrados para este rol" });
    }

    // Extraer los id_menu de los permisos
    const menuIds = permisos.map((permiso) => permiso.idMenu);

    // Buscar los menús con los ID encontrados
    const menus = await Menu.findAll({
      where: { id: menuIds }, 
    });

    return res.json(menus);

  } catch (error) {
    console.error("Error al obtener menús por rol:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};





module.exports = { setPermiso, getMenusByRole };
