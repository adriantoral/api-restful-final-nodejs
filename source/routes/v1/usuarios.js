const express = require("express")

const usuarios_validators = require("../../validators/usuarios")
const usuarios_controllers = require("../../controllers/usuarios")

const router = express.Router()

/**
 * Route for signing in a user.
 * @name signin
 * @path {POST} /signin
 * @body {Object} user - The user's information.
 * @body {String} user.email - The user's email.
 * @body {String} user.password - The user's password.
 * @validate {signinValidator} user - Validates the user's information.
 * @controller {signinController} user - Handles the user's request.
 */
router.post('/signin', usuarios_validators.signin, usuarios_controllers.signin)

/**
 * Route for signing up a user.
 * @name signup
 * @path {POST} /signup
 * @body {Object} user - The user's information.
 * @body {String} user.email - The user's email.
 * @body {String} user.password - The user's password.
 * @validate {signupValidator} user - Validates the user's information.
 * @controller {signupController} user - Handles the user's request.
 */
router.post('/signup', usuarios_validators.signup, usuarios_controllers.signup)

module.exports = router