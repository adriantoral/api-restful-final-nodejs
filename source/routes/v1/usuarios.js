const express = require("express")

const usuarios_validators = require("../../validators/usuarios")
const usuarios_controllers = require("../../controllers/usuarios")

const router = express.Router()

/*
 * Rutas para registrar y loguear un usuario.
 * Todos los campos son obligatorios.
 * Si no envias un campo se te devolverá un error.
 */
router.post('/signin', usuarios_validators.signin, usuarios_controllers.signin)
router.post('/signup', usuarios_validators.signup, usuarios_controllers.signup)

module.exports = router