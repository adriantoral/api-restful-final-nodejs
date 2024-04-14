const express = require("express")

const comercios_validators = require("../../validators/comercios")
const comercios_controllers = require("../../controllers/comercios")

const usuarios_middlewares = require("../../middlewares/usuarios")

const global_validators = require("../../validators")

const router = express.Router()

/**
 * Route for getting all comercios.
 * An additional parameter can be passed to sort the results.
 * @name get_comercios
 * @route {GET} /comercios
 * @queryparam {string} [sortBy] - The field to sort by.
 * @middleware {listar_doc} - Lists the documents.
 * @controller {listar_comercios} - Handles the request.
 *
 *  @openapi
 * /api/v1/comercios:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: List all commerces
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get("/", global_validators.listar_doc, comercios_controllers.listar_comercios)

/**
 * Route for getting a comercio by id.
 * @name get_comercio
 * @route {GET} /comercios/:param
 * @param {string} id - The id of the comercio.
 * @middleware {get_id} - Validates the id.
 * @controller {listar_comercio} - Handles the request.
 *
 *  @openapi
 * /api/v1/comercios/{param}:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: List a commerce by id
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Comercio's cif
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get("/:param", global_validators.get_id, comercios_controllers.listar_comercio)

/**
 * Route for creating a comercio.
 * All fields are mandatory.
 * If a field is not sent, an error will be returned.
 * @name create_comercio
 * @route {POST} /comercios
 * @middleware {verificar_JWT, is_usuario_JWT, is_administrador, create_comercio} - Validates the request.
 * @controller {crear_comercio} - Handles the request.
 *
 *  @openapi
 * /api/v1/comercios:
 *  post:
 *      tags:
 *      - Comercios
 *      summary: Create a commerce
 *      security:
 *          -   token_usuario: []
 *      parameters:
 *          -   name: nombre
 *              in: body
 *              description: Comercio's name
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Mi comercio
 *          -   name: cif
 *              in: body
 *              description: Comercio's CIF
 *              required: true
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *          -   name: direccion
 *              in: body
 *              description: Comercio's address
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Calle Falsa 123
 *          -  name: email
 *             in: body
 *             description: Comercio's email
 *             required: true
 *             schema:
 *                 type: string
 *                 example: micomercio@comercio.com
 *          -   name: telefono
 *              in: body
 *              description: Comercio's phone number
 *              required: true
 *              schema:
 *                  type: string
 *                  example: +34123456789
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post("/", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, comercios_validators.create_comercio, comercios_controllers.crear_comercio)

/**
 * Routes for updating a comercio.
 * PUT requires all fields.
 * PATCH only requires the fields to be updated.
 * Both use the same controller.
 * @name update_comercio
 * @route {PUT|PATCH} /comercios/:param
 * @param {string} id - The id of the comercio.
 * @middleware {verificar_JWT, is_usuario_JWT, is_administrador, get_id, update_comercio|patch_comercio} - Validates the request.
 * @controller {editar_comercio} - Handles the request.
 *
 *  @openapi
 * /api/v1/comercios:
 *  put:
 *      tags:
 *      - Comercios
 *      summary: Create a commerce
 *      security:
 *          -   token_usuario: []
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Comercio's cif
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *          -   name: nombre
 *              in: body
 *              description: Comercio's name
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Mi comercio
 *          -   name: cif
 *              in: body
 *              description: Comercio's CIF
 *              required: true
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *          -   name: direccion
 *              in: body
 *              description: Comercio's address
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Calle Falsa 123
 *          -  name: email
 *             in: body
 *             description: Comercio's email
 *             required: true
 *             schema:
 *                 type: string
 *                 example: micomercio@comercio.com
 *          -   name: telefono
 *              in: body
 *              description: Comercio's phone number
 *              required: true
 *              schema:
 *                  type: string
 *                  example: +34123456789
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.put("/:param", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, comercios_validators.update_comercio, comercios_controllers.editar_comercio)

/**
 *  @openapi
 * /api/v1/comercios:
 *  patch:
 *      tags:
 *      - Comercios
 *      summary: Create a commerce
 *      security:
 *          -   token_usuario: []
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Comercio's cif
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *          -   name: nombre
 *              in: body
 *              description: Comercio's name
 *              schema:
 *                  type: string
 *                  example: Mi comercio
 *          -   name: cif
 *              in: body
 *              description: Comercio's CIF
 *              schema:
 *                  type: string
 *                  example: MICIF12345
 *          -   name: direccion
 *              in: body
 *              description: Comercio's address
 *              schema:
 *                  type: string
 *                  example: Calle Falsa 123
 *          -  name: email
 *             in: body
 *             description: Comercio's email
 *             schema:
 *                 type: string
 *                 example: micomercio@comercio.com
 *          -   name: telefono
 *              in: body
 *              description: Comercio's phone number
 *              schema:
 *                  type: string
 *                  example: +34123456789
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.patch("/:param", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, comercios_validators.patch_comercio, comercios_controllers.editar_comercio)

/**
 * Route for deleting a comercio.
 * An additional parameter can be passed for logical deletion.
 * If the logical parameter is not sent, a physical deletion will be performed.
 * @name delete_comercio
 * @route {DELETE} /comercios/:param
 * @param {string} id - The id of the comercio.
 * @queryparam {boolean} [logico] - Whether to perform a logical deletion.
 * @middleware {verificar_JWT, is_usuario_JWT, is_administrador, get_id, delete_doc} - Validates the request.
 * @controller {eliminar_comercio} - Handles the request.
 *
 *  @openapi
 * /api/v1/comercios:
 *  delete:
 *      tags:
 *      -  Comercios
 *      summary: Delete a commerce
 *      security:
 *          -   token_usuario: []
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Comercio's cif
 *              schema:
 *                  type: string
 *                  example: MICIF12345
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
router.delete("/:param", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_middlewares.is_administrador, global_validators.get_id, global_validators.delete_doc, comercios_controllers.eliminar_comercio)

module.exports = router