const { Router } = require("express");
const {
  register,
  login,
  logout,
  profile,
  verifyToken,
} = require("../controllers/auth.controllers");
const { authRequired } = require("../middlewares/validateToken");
const { validateSchema } = require("../middlewares/validator.middlewares");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.post("/verify", verifyToken);

router.get("/profile", authRequired, profile);

module.exports = router;
