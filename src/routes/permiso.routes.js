const express = require('express');
const router = express.Router();
const { 
  setPermiso, 
  getMenusByRole, 
  deletePermiso 
} = require('../controllers/permisos.controllers');

router.post('/permisos/:idRol', setPermiso); // Crear un permiso
router.get('/permisos/:idRol', getMenusByRole); // Obtener menús de un rol

module.exports = router;