const { User, Rol } = require("../models");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt");
const { convertirABase64 } = require("../libs/base64");
const { transporter } = require("../libs/mailer");
const jwt = require("jsonwebtoken");
const { TOKENSECRETS } = require("../config");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exintingUser = await User.findOne({ where: { email } });

  const exintingRole = await Rol.findOne({ where: { name: "User" } });

  if (exintingUser)
    return res.status(400).json({ message: ["Esta cuenta ya esta en uso"] });

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const tokenemail = convertirABase64(email);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      emailtoken: tokenemail,
      isVerified: false,
      idRol: exintingRole.id,
    });

    createAccessToken({ id: newUser.id });

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
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });

    const UserFound = await User.findOne({ where: { email } });

    if (!UserFound)
      return res
        .status(400)
        .json({ message: "Correo o Contraseña no son correctos" });

    const passComp = await bcrypt.compare(password, UserFound.password);
    if (!passComp)
      return res
        .status(400)
        .json({ message: "Correo o Contraseña no son correctos" });

    const token = await createAccessToken({ id: UserFound.id });

    res.cookie("token", token);
    res.json({
      name: UserFound.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.error(error);
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

const profile = async (req, res) => {
  try {
    const userFound = await User.findByPk(req.user.id);

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.idRol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, TOKENSECRETS, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      const userFound = await User.findByPk(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        isVerified: userFound.isVerified,
      });
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, logout, verifyToken, profile };
