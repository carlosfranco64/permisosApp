const { Router } = require("express")


const { getRoles, getRol, createRol, updateRol, deleteRol } = require("../controllers/rol.controllers")


const router =Router()

router.get('/roles',getRoles)
router.get('/rol/:id',getRol)
router.post('/rol',createRol)
router.put('/rol/:id',updateRol)
router.delete('/rol/:id',deleteRol)


module.exports=router