const express = require("express")

const webs_validators = require("../../validators/webs")
const webs_controllers = require("../../controllers/webs")

const usuarios_middlewares = require("../../middlewares/usuarios")
const comercios_middlewares = require("../../middlewares/comercios")

const global_validators = require("../../validators")

const router = express.Router()

/**
 * Route for getting all webs.
 * An additional parameter can be passed to sort the results.
 * @name get_webs
 * @route {GET} /webs
 * @queryparam {string} [sortBy] - The field to sort by.
 * @middleware {listar_doc} - Lists the documents.
 * @controller {listar_webs} - Handles the request.
 */
router.get('/', global_validators.listar_doc, webs_controllers.listar_webs)

/**
 * Route for getting a web by id.
 * @name get_web
 * @route {GET} /webs/:id
 * @param {string} id - The id of the web.
 * @middleware {get_id} - Validates the id.
 * @controller {listar_web} - Handles the request.
 */
router.get('/:id', global_validators.get_id, webs_controllers.listar_web)

/**
 * Route for getting webs by city id.
 * @name get_webs_ciudad
 * @route {GET} /webs/ciudad/:id
 * @param {string} id - The id of the city.
 * @middleware {get_id, listar_doc} - Validates the id and lists the documents.
 * @controller {listar_webs_ciudad} - Handles the request.
 */
router.get('/ciudad/:id', global_validators.get_id, global_validators.listar_doc, webs_controllers.listar_webs_ciudad)

/**
 * Route for getting webs by city id and activity.
 * @name get_webs_ciudad_actividad
 * @route {GET} /webs/ciudad/:id/:actividad
 * @param {string} id - The id of the city.
 * @param {string} actividad - The activity of the web.
 * @middleware {get_id, listar_doc} - Validates the id and lists the documents.
 * @controller {listar_webs_ciudad_actividad} - Handles the request.
 */
router.get('/ciudad/:id/:actividad', global_validators.get_id, global_validators.listar_doc, webs_controllers.listar_webs_ciudad_actividad)

/**
 * Route for creating a web.
 * All fields are mandatory.
 * If a field is not sent, an error will be returned.
 * @name create_web
 * @route {POST} /webs
 * @middleware {verificar_JWT, is_comercio_JWT, no_tiene_pagina, create_update_web} - Validates the request.
 * @controller {crear_web} - Handles the request.
 */
router.post('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.no_tiene_pagina, webs_validators.create_update_web, webs_controllers.crear_web)

/**
 * Route for creating a review for a web.
 * @name create_review
 * @route {POST} /webs/:id/resenia
 * @param {string} id - The id of the web.
 * @middleware {verificar_JWT, is_usuario_JWT, get_id, create_resenia} - Validates the request.
 * @controller {crear_resenia} - Handles the request.
 */
router.post('/:id/resenia', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, global_validators.get_id, webs_validators.create_resenia, webs_controllers.crear_resenia)

/**
 * Routes for updating a web.
 * PUT requires all fields.
 * PATCH only requires the fields to be updated.
 * Both use the same controller.
 * @name update_web
 * @route {PUT|PATCH} /webs
 * @middleware {verificar_JWT, is_comercio_JWT, tiene_pagina, create_update_web|patch_web} - Validates the request.
 * @controller {editar_web} - Handles the request.
 */
router.put('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, webs_validators.create_update_web, webs_controllers.editar_web)
router.patch('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, webs_validators.patch_web, webs_controllers.editar_web)

/**
 * Route for deleting a web.
 * An additional parameter can be passed for logical deletion.
 * If the logical parameter is not sent, a physical deletion will be performed.
 * @name delete_web
 * @route {DELETE} /webs
 * @queryparam {boolean} [logico] - Whether to perform a logical deletion.
 * @middleware {verificar_JWT, is_comercio_JWT, tiene_pagina, delete_doc} - Validates the request.
 * @controller {eliminar_web} - Handles the request.
 */
router.delete('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, global_validators.delete_doc, webs_controllers.eliminar_web)

module.exports = router