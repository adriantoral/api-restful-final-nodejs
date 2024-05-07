const express = require("express")

const usuarios_validators = require("../../validators/usuarios")
const usuarios_middlewares = require("../../middlewares/usuarios")
const usuarios_controllers = require("../../controllers/usuarios")

const global_validators = require("../../validators")

const router = express.Router()

/**
 * Route for signing in a user.
 * @name signin
 * @route {POST} /signin
 * @bodyparam {Object} user - The user's information.
 * @bodyparam {String} user.email - The user's email.
 * @bodyparam {String} user.password - The user's password.
 * @middleware {signinValidator} user - Validates the user's information.
 * @controller {signinController} user - Handles the user's request.
 *
 *  @openapi
 * /api/v1/usuarios/signin:
 *  post:
 *      tags:
 *      - Usuarios
 *      summary: Signin a user
 *      parameters:
 *          -   name: email
 *              in: body
 *              description: Usuario's email
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: password
 *              in: body
 *              description: Usuario's password
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post('/signin', usuarios_validators.signin, usuarios_controllers.signin)

/**
 * Route for signing up a user.
 * @name signup
 * @route {POST} /signup
 * @bodyparam {Object} user - The user's information.
 * @bodyparam {String} user.email - The user's email.
 * @bodyparam {String} user.password - The user's password.
 * @middleware {signupValidator} user - Validates the user's information.
 * @controller {signupController} user - Handles the user's request.
 *
 *  @openapi
 * /api/v1/usuarios/signup:
 *  post:
 *      tags:
 *      - Usuarios
 *      summary: Signup a user
 *      parameters:
 *          -   name: nombre
 *              in: body
 *              description: Usuario's name
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Juan
 *          -   name: email
 *              in: body
 *              description: Usuario's email
 *              required: true
 *              schema:
 *                  type: string
 *                  example: juan@correo.com
 *          -   name: password
 *              in: body
 *              description: Usuario's password
 *              required: true
 *              schema:
 *                  type: string
 *                  example: pass123456
 *          -  name: edad
 *             in: body
 *             description: Usuario's age
 *             required: true
 *             schema:
 *                 type: integer
 *          -   name: ciudad
 *              in: body
 *              description: Usuario's city
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: rol
 *              in: body
 *              description: Usuario's rol
 *              required: true
 *              schema:
 *                  type: enun['admin', 'usuario']
 *                  example: usuario
 *          -   name: intereses
 *              in: body
 *              description: Usuario's interests
 *              required: true
 *              schema:
 *                  type: Array[string]
 *                  example: ['tecnologia', 'deportes']
 *          -   name: permiteRecibirOfertas
 *              in: body
 *              description: Usuario's permission to receive offers
 *              required: true
 *              schema:
 *                  type: boolean
 *                  example: false
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.post('/signup', usuarios_validators.signup, usuarios_controllers.signup)

/**
 * Route for updating a user's information.
 * @name update
 * @route {PUT} /me
 * @middleware {verificar_JWT} - Verifies the JWT token.
 * @middleware {is_usuario_JWT} - Checks if the JWT token belongs to a user.
 * @middleware {signupValidator} - Validates the user's information.
 * @controller {update_user} - Handles the user's request.
 *
 *  @openapi
 * /api/v1/usuarios/me:
 *  put:
 *      tags:
 *      - Usuarios
 *      summary: Update a user
 *      parameters:
 *          -   name: nombre
 *              in: body
 *              description: Usuario's name
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Juan
 *          -   name: email
 *              in: body
 *              description: Usuario's email
 *              required: true
 *              schema:
 *                  type: string
 *                  example: juan@correo.com
 *          -   name: password
 *              in: body
 *              description: Usuario's password
 *              required: true
 *              schema:
 *                  type: string
 *                  example: pass123456
 *          -  name: edad
 *             in: body
 *             description: Usuario's age
 *             required: true
 *             schema:
 *                 type: integer
 *          -   name: ciudad
 *              in: body
 *              description: Usuario's city
 *              required: true
 *              schema:
 *                  type: string
 *                  example: Madrid
 *          -   name: rol
 *              in: body
 *              description: Usuario's rol
 *              required: true
 *              schema:
 *                  type: enun['admin', 'usuario']
 *                  example: usuario
 *          -   name: intereses
 *              in: body
 *              description: Usuario's interests
 *              required: true
 *              schema:
 *                  type: Array[string]
 *                  example: ['tecnologia', 'deportes']
 *          -   name: permiteRecibirOfertas
 *              in: body
 *              description: Usuario's permission to receive offers
 *              required: true
 *              schema:
 *                  type: boolean
 *                  example: false
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.put('/me', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_validators.update_user, usuarios_controllers.update_user)

/**
 * Route for deleting a user.
 * @name delete
 * @route {DELETE} /me
 * @middleware {verificar_JWT} - Verifies the JWT token.
 * @middleware {is_usuario_JWT} - Checks if the JWT token belongs to a user.
 * @controller {delete_user} - Handles the user's request.
 *
 *  @openapi
 * /api/v1/usuarios/me:
 *  delete:
 *      tags:
 *      - Usuarios
 *      summary: Delete a user
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.delete('/me', usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_usuario_JWT, usuarios_controllers.delete_user)

/**
 * Route for getting users by city id.
 * @name get_users
 * @route {GET} /ciudad/:param
 * @param {String} id - The id of the city.
 * @middleware {get_id} - Validates the id.
 * @middleware {listar_doc} - Lists the documents.
 * @controller {get_users} - Handles the user's request.
 *
 *  @openapi
 * /api/v1/usuarios/ciudad/{param}:
 *  get:
 *      tags:
 *      - Usuarios
 *      summary: List users by city
 *      parameters:
 *          -   name: param
 *              in: path
 *              description: Ciudad's id
 *              schema:
 *                  type: string
 *                  example: Madrid
 *      responses:
 *          '200':
 *              description: Returns the data
 *          '500':
 *              description: Wrong petition
 */
router.get('/ciudad/:param', global_validators.get_id, global_validators.listar_doc, usuarios_controllers.get_users)

module.exports = router