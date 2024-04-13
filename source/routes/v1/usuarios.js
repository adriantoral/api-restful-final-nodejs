const express = require("express")

const usuarios_validators = require("../../validators/usuarios")
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
 */
router.post('/signup', usuarios_validators.signup, usuarios_controllers.signup)

/**
 * Route for getting users by city id.
 * @name get_users
 * @route {GET} /ciudad/:param
 * @param {String} id - The id of the city.
 * @middleware {get_id} - Validates the id.
 * @middleware {listar_doc} - Lists the documents.
 * @controller {get_users} - Handles the user's request.
 */
router.get('/ciudad/:param', global_validators.get_id, global_validators.listar_doc, usuarios_controllers.get_users)

module.exports = router