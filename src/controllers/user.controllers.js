
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const { name } = req.params;

    const users = await User.findAll({ where: { name } });

    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Agregar return aquí
  }
};
const createUser = async (req, res) => {
  const { name, email, password, idRol } = req.body;

  existingUser = await User.findOne({ where: { email } });

  if (existingUser)
    return res.status(400).json({ message: "Esta cuenta ya existe" });

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      emailtoken,
      idRol,
    });
    

    res.json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, idRol } = req.body;

    // Buscar el usuario por ID
    const user = await User.findByPk(id);
    const emailUser = await User.findOne({ where: { email } });

    // Si el usuario no existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //   if (emailUser) {
    //     return res.status(404).json({ message: "El Email ya es en uso" });
    //   }

    // Actualizar solo los campos proporcionados
    await user.update({ name, email, password, idRol });

    // Respuesta exitosa
    return res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ message: "el usuario no fue encontrado" });

    await user.destroy();

    res.status(200).json({ message: "El usuario fue eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
