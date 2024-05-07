const {body} = require('express-validator')
const {validate} = require('.')

/**
 * Validation rules for signing in a user.
 * @type {Array}
 * @property {Function} body('email', 'Type: String') - Checks if the email exists, is not empty and is a string.
 * @property {Function} body('password', 'Type: String') - Checks if the password exists, is not empty and is a string.
 * @property {Function} validate - Validates the request.
 */
const signin = [
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('password', 'Type: String').exists().notEmpty().isString(),
    validate
]

/**
 * Validation rules for signing up a user.
 * @type {Array}
 * @property {Function} body('nombre', 'Type: String') - Checks if the name exists, is not empty and is a string.
 * @property {Function} body('email', 'Type: String') - Checks if the email exists, is not empty and is a string.
 * @property {Function} body('password', 'Type: String') - Checks if the password exists, is not empty and is a string.
 * @property {Function} body('edad', 'Type: Number') - Checks if the age exists, is not empty and is an integer.
 * @property {Function} body('ciudad', 'Type: String') - Checks if the city exists, is not empty and is a string.
 * @property {Function} body('rol', 'Type: Enum[admin, usuario]') - Checks if the role exists, is not empty, is a string and is either "admin" or "usuario". Defaults to "usuario".
 * @property {Function} body('intereses', 'Type: Array') - Checks if the interests exist, is not empty and is an array.
 * @property {Function} body('permiteRecibirOfertas', 'Type: Boolean') - Checks if the permiteRecibirOfertas exists, is not empty and is a boolean. Defaults to false.
 * @property {Function} validate - Validates the request.
 */
const signup = [
    body('nombre', 'Type: String').exists().notEmpty().isString(),
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('password', 'Type: String').exists().notEmpty().isString(),
    body('edad', 'Type: Number').exists().notEmpty().isInt(),
    body('ciudad', 'Type: String').exists().notEmpty().isString(),
    body('rol', 'Type: Enum[admin, usuario]').default('usuario').exists().notEmpty().isString().isIn(['admin', 'usuario']),
    body('intereses', 'Type: Array').exists().notEmpty().isArray(),
    body('permiteRecibirOfertas', 'Type: Boolean').default(false).exists().notEmpty().isBoolean(),
    validate
]

/**
 * Validation rules for updating a user's information.
 * @type {Array}
 * @property {Function} body('nombre', 'Type: String') - Checks if the name exists, is not empty and is a string.
 * @property {Function} body('email', 'Type: String') - Checks if the email exists, is not empty and is a string.
 * @property {Function} body('password', 'Type: String') - Checks if the password exists, is not empty and is a string.
 * @property {Function} body('edad', 'Type: Number') - Checks if the age exists, is not empty and is an integer.
 * @property {Function} body('ciudad', 'Type: String') - Checks if the city exists, is not empty and is a string.
 * @property {Function} body('intereses', 'Type: Array') - Checks if the interests exist, is not empty and is an array.
 * @property {Function} body('permiteRecibirOfertas', 'Type: Boolean') - Checks if the permiteRecibirOfertas exists, is not empty and is a boolean. Defaults to false.
 * @property {Function} validate - Validates the request.
 */
const update_user = [
    body('nombre', 'Type: String').exists().notEmpty().isString(),
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('password', 'Type: String').exists().notEmpty().isString(),
    body('edad', 'Type: Number').exists().notEmpty().isInt(),
    body('ciudad', 'Type: String').exists().notEmpty().isString(),
    body('intereses', 'Type: Array').exists().notEmpty().isArray(),
    body('permiteRecibirOfertas', 'Type: Boolean').default(false).exists().notEmpty().isBoolean(),
    validate
]

module.exports = {
    signin,
    signup,
    update_user
}