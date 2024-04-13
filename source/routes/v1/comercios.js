const express = require("express")

const comercios_validators = require("../../validators/comercios")
const comercios_controllers = require("../../controllers/comercios")

const usuarios_middlewares = require("../../middlewares/usuarios")

const global_validators = require("../../validators")

const router = express.Router()

/**
 * Routes for GET requests for comercios.
 * An additional parameter can be passed to sort the results.
 * Example: .../comercios?sortBy=nombre
 */
router.get("/", global_validators.listar_doc, comercios_controllers.listar_comercios)
router.get("/:id", global_validators.get_id, comercios_controllers.listar_comercio)

/**
 * Route for creating a comercio.
 * All fields are mandatory.
 * If a field is not sent, an error will be returned.
 */
router.post("/", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, comercios_validators.create_comercio, comercios_controllers.crear_comercio)

/**
 * Routes for updating a comercio.
 * PUT requires all fields.
 * PATCH only requires the fields to be updated.
 * Both use the same controller.
 */
router.put("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, comercios_validators.update_comercio, comercios_controllers.editar_comercio)
router.patch("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, comercios_validators.patch_comercio, comercios_controllers.editar_comercio)

/**
 * Routes for deleting a comercio.
 * An additional parameter can be passed for logical deletion.
 * Example: .../comercios/:id?logico=true
 * If the logical parameter is not sent, a physical deletion will be performed.
 */
router.delete("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, global_validators.delete_doc, comercios_controllers.eliminar_comercio)

module.exports = router