const { Rol } = require("../models");

const getRol = async (req, res) => {
  const { name } = req.params;

  try {
    const role = await Rol.findOne({ where: { name } });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRoles = async (req, res) => {
  try {
    const Roles = await Rol.findAll();
    res.json(Roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createRol = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingRole = await Rol.findOne({ where: { name } });
    if (existingRole)
      return res.status(400).json({ message: "Este rol ya existe" });

    const newRole = await Rol.create({
      name,
      description,
    });

    res.json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRol = async (req, res) => {
  try {
    const { name, description } = req.body;
    const rol = await Rol.findByPk(req.params.id);

    if (!rol)
      return res.status(404).json({ message: "El Rol no fue encontrada" });

    await rol.update({ name, description });

    res.status(200).json({ message: "Rol actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);

    if (!rol)
      return res.status(404).json({ message: "El Rol no fue encontrado" });

    await rol.destroy();

    res.status(200).json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRol, getRoles, createRol, updateRol, deleteRol };
