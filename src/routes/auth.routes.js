const { Router } = require("express");
const { register, login, logout, profile } = require("../controllers/auth.controllers");
const { authRequired } = require("../middlewares/validateToken");


const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get('/profile',authRequired,profile)

module.exports = router;