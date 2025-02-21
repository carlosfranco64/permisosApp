const { Router } = require("express")
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user.controllers")





const router =Router()

router.get('/users',getUsers)
router.get('/user/:name',getUser)
router.post('/user',createUser)
router.patch('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)


module.exports=router