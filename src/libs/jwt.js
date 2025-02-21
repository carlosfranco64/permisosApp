const jwt = require("jsonwebtoken"); // Importación corregida
const { TOKENSECRETS } = require("../config");


const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKENSECRETS,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

module.exports = { createAccessToken };
