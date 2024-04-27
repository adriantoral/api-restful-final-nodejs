const express = require("express")

const webs_validators = require("../../validators/webs")
const webs_controllers = require("../../controllers/webs")

const webs_middleware = require("../../middlewares/webs")
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
 *
 *  @openapi
 * /api/v1/webs:
 *  get:
 *      tags:
 *      - Webs
 *      summary: List all webs
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get('/', global_validators.listar_doc, webs_controllers.listar_webs)

/**
 * Route for getting a web by id.
 * @name get_web
 * @route {GET} /webs/:param
 * @param {string} id - The id of the web.
 * @middleware {get_id} - Validates the id.
 * @controller {listar_web} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs/{param}:
 *  get:
 *      tags:
 *      - Webs
 *      summary: List a web by id
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Web's id
 *              schema:
 *                  type: string
 *                  example: 661a7b3705f8c0fa0ea62aa4
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get('/:param', global_validators.get_id, webs_controllers.listar_web)

/**
 * Route for getting webs by city id.
 * @name get_webs_ciudad
 * @route {GET} /webs/ciudad/:param
 * @param {string} id - The id of the city.
 * @middleware {get_id, listar_doc} - Validates the id and lists the documents.
 * @controller {listar_webs_ciudad} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs/ciudad/{param}:
 *  get:
 *      tags:
 *      - Webs
 *      summary: List all webs by city
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: City's id
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get('/ciudad/:param', global_validators.get_id, global_validators.listar_doc, webs_controllers.listar_webs_ciudad)

/**
 * Route for getting webs by city id and activity.
 * @name get_webs_ciudad_actividad
 * @route {GET} /webs/ciudad/:param/:param2
 * @param {string} id - The id of the city.
 * @param {string} actividad - The activity of the web.
 * @middleware {get_id, listar_doc} - Validates the id and lists the documents.
 * @controller {listar_webs_ciudad_actividad} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs/{param}/{param2}:
 *  get:
 *      tags:
 *      - Webs
 *      summary: List all webs by city and activity
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: City's id
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: param2
 *              in: path
 *              description: Activity's id
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Tecnologia
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get('/ciudad/:param/:param2', global_validators.get_id, global_validators.listar_doc, webs_controllers.listar_webs_ciudad_actividad)

/**
 * Route for creating a web.
 * All fields are mandatory.
 * If a field is not sent, an error will be returned.
 * @name create_web
 * @route {POST} /webs
 * @middleware {verificar_JWT, is_comercio_JWT, no_tiene_pagina, create_update_web} - Validates the request.
 * @controller {crear_web} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs:
 *  post:
 *      tags:
 *      - Webs
 *      summary: Create a web
 *      security:
 *          -   token_comercio: []
 *      parameters:
 *          -   name: ciudad
 *              in: body
 *              description: Web's city
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: actividad
 *              in: body
 *              description: Web's activity
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Tecnologia
 *          -   name: titulo
 *              in: body
 *              description: Web's title
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Telefonica
 *          -  name: resumen
 *             in: body
 *             description: Web's summary
 *             required: true
 *             schema:
 *                 type: string
 *                 example: "Resumen de la web"
 *          -   name: textos
 *              in: body
 *              description: Web's texts
 *              required: true
 *              schema:
 *                  type: array
 *                  example: ['texto1', 'texto2']
 *          -   name: fotos
 *              in: body
 *              description: Web's photos
 *              required: true
 *              schema:
 *                  type: array
 *                  example: ['foto1', 'foto2']
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.no_tiene_pagina, webs_validators.create_update_web, webs_controllers.crear_web)

/**
 * Route for creating a review for a web.
 * @name create_review
 * @route {POST} /webs/:param/resenia
 * @param {string} param - The id of the web.
 * @middleware {verificar_JWT} - Verifies the JWT token.
 * @middleware {is_usuario_JWT} - Checks if the JWT token belongs to a user.
 * @middleware {get_id} - Validates the id.
 * @middleware {create_resenia} - Validates the review's information.
 * @controller {crear_resenia} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs/{param}/resenia:
 *  post:
 *      tags:
 *      - Webs
 *      summary: Create a review for a web
 *      security:
 *          -   token_usuario: []
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Web's id
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 661a7b3705f8c0fa0ea62aa4
 *          -   name: resenia
 *              in: body
 *              description: Review's text
 *              required: true
 *              schema:
 *                  type: string
 *                  example: "This is a great website!"
 *          -   name: puntuacion
 *              in: body
 *              description: Review's score
 *              required: true
 *              schema:
 *                  type: number
 *                  example: 5
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post('/:param/resenia', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, global_validators.get_id, webs_validators.create_resenia, webs_controllers.crear_resenia)

/**
 * Routes for updating a web.
 * PUT requires all fields.
 * PATCH only requires the fields to be updated.
 * Both use the same controller.
 * @name update_web
 * @route {PUT|PATCH} /webs
 * @middleware {verificar_JWT, is_comercio_JWT, tiene_pagina, create_update_web|patch_web} - Validates the request.
 * @controller {editar_web} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs:
 *  put:
 *      tags:
 *      - Webs
 *      summary: Create a web
 *      security:
 *          -   token_comercio: []
 *      parameters:
 *          -   name: ciudad
 *              in: body
 *              description: Web's city
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: actividad
 *              in: body
 *              description: Web's activity
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Tecnologia
 *          -   name: titulo
 *              in: body
 *              description: Web's title
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Telefonica
 *          -  name: resumen
 *             in: body
 *             description: Web's summary
 *             required: true
 *             schema:
 *                 type: string
 *                 example: "Resumen de la web"
 *          -   name: textos
 *              in: body
 *              description: Web's texts
 *              required: true
 *              schema:
 *                  type: array
 *                  example: ['texto1', 'texto2']
 *          -   name: fotos
 *              in: body
 *              description: Web's photos
 *              required: true
 *              schema:
 *                  type: array
 *                  example: ['foto1', 'foto2']
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.put('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, webs_validators.create_update_web, webs_controllers.editar_web)

/**
 *  @openapi
 * /api/v1/webs:
 *  patch:
 *      tags:
 *      - Webs
 *      summary: Create a web
 *      security:
 *          -   token_comercio: []
 *      parameters:
 *          -   name: ciudad
 *              in: body
 *              description: Web's city
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: actividad
 *              in: body
 *              description: Web's activity
 *              schema:
 *                  type: string
 *                  example: Tecnologia
 *          -   name: titulo
 *              in: body
 *              description: Web's title
 *              schema:
 *                  type: string
 *                  example: Telefonica
 *          -  name: resumen
 *             in: body
 *             description: Web's summary
 *             schema:
 *                 type: string
 *                 example: "Resumen de la web"
 *          -   name: textos
 *              in: body
 *              description: Web's texts
 *              schema:
 *                  type: array
 *                  example: ['texto1', 'texto2']
 *          -   name: fotos
 *              in: body
 *              description: Web's photos
 *              schema:
 *                  type: array
 *                  example: ['foto1', 'foto2']
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
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
 *
 *  @openapi
 * /api/v1/webs:
 *  delete:
 *      tags:
 *      - Webs
 *      summary: Delete a web
 *      security:
 *          -   token_comercio: []
 *      parameters:
 *          -   name: logico
 *              in: query
 *              description: Whether to perform a logical deletion
 *              schema:
 *                  type: boolena
 *                  example: true
 *                  default: false
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.delete('/', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, comercios_middlewares.tiene_pagina, global_validators.delete_doc, webs_controllers.eliminar_web)

/**
 * Route for uploading a photo for a web.
 * The photo data is in the request body.
 * @name upload_photo
 * @route {POST} /webs/subir/foto
 * @middleware {verificar_JWT} - Verifies the JWT token.
 * @middleware {is_comercio_JWT} - Checks if the JWT token belongs to a commerce.
 * @middleware {subir_foto} - Validates the photo's information.
 * @middleware {upload_file} - Handles the file upload.
 * @middleware {inject_file_path_to_body} - Injects the file path to the request body.
 * @controller {subir_foto} - Handles the request.
 *
 *  @openapi
 * /api/v1/webs/subir/foto:
 *  post:
 *      tags:
 *      - Webs
 *      summary: Upload a photo for a web
 *      security:
 *          -   token_comercio: []
 *      parameters:
 *          -   name: foto
 *              in: formData
 *              description: The photo to upload
 *              required: true
 *              type: file
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post("/subir/foto", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_comercio_JWT, webs_middleware.upload_file.fields([{name: "foto", maxCount: 1}]), webs_middleware.inject_file_path_to_body, webs_validators.subir_foto, webs_controllers.subir_foto)

module.exports = router