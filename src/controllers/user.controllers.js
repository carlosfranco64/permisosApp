
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { transporter } = require("../libs/mailer");
const { convertirABase64 } = require("../libs/base64");


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
    const tokenemail = convertirABase64(email)
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      emailtoken: tokenemail, 
      isVerified: false,
      idRol,
    });
    

    let mailOptions = {
      from: '"verify your email" <codewithsid36@gmail.com> ',
      to: newUser.email,
      subject: "codewithsid - verify your email",
      html: `
  <div style="font-family: Arial, sans-serif; background: linear-gradient(to right, #141e30, #243b55); color: #ffffff; padding: 50px 20px; text-align: center;">
          <div style="max-width: 400px; background: #ffffff; color: #333; padding: 30px; border-radius: 15px; 
                      box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3); margin: auto; text-align: center;">
              <h2 style="font-size: 24px; margin-bottom: 15px; font-weight: bold;">¡Verifica tu Cuenta!</h2>
              <p style="font-size: 16px; margin-bottom: 20px; line-height: 1.6;">Gracias por registrarte. Para activar tu cuenta, haz clic en el botón de abajo:</p>
              <a href="https://tusitio.com/verificar?token=${newUser.emailtoken}" style="display: inline-block; padding: 12px 25px; background: #007bff; 
                        color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; 
                        transition: 0.3s ease-in-out; box-shadow: 0px 5px 15px rgba(0, 123, 255, 0.5);">
                  ✅ Verificar Cuenta
              </a>
              <p style="margin-top: 20px; font-size: 14px; color: #555;">Si no solicitaste esta verificación, ignora este mensaje.</p>
          </div>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error al enviar el correo", error);
      } else {
        console.log(
          "verification email is sent to your gmail account",
          newUser.email
        );
      }
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
