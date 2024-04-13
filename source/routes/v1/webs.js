const express = require("express")

const webs_validators = require("../../validators/webs")
const webs_controllers = require("../../controllers/webs")

const usuarios_middlewares = require("../../middlewares/usuarios")
const comercios_middlewares = require("../../middlewares/comercios")

const global_validators = require("../../validators")

const router = express.Router()

/**
 * Routes for GET requests for webs.
 * An additional parameter can be passed to sort the results.
 */
router.get('/', global_validators.listar_doc, webs_controllers.listar_webs)
router.get('/:id', global_validators.get_id, webs_controllers.listar_web)

/**
 * Route for creating a web.
 * All fields are mandatory.
 * If a field is not sent, an error will be returned.
 */
router.post('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.no_tiene_pagina, webs_validators.create_update_web, webs_controllers.crear_web)
router.post('/:id/resenia', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, global_validators.get_id, webs_validators.create_resenia, webs_controllers.crear_resenia)

/**
 * Routes for updating a web.
 * PUT requires all fields.
 * PATCH only requires the fields to be updated.
 * Both use the same controller.
 */
router.put('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, webs_validators.create_update_web, webs_controllers.editar_web)
router.patch('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, webs_validators.patch_web, webs_controllers.editar_web)

/**
 * Routes for deleting a web.
 * An additional parameter can be passed for logical deletion.
 * If the logical parameter is not sent, a physical deletion will be performed.
 */
router.delete('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, global_validators.delete_doc, webs_controllers.eliminar_web)

module.exports = router