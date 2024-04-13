const {body} = require('express-validator')
const {validate} = require('.')

const signin = [
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('password', 'Type: String').exists().notEmpty().isString(),
    validate
]

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

module.exports = {
    signin,
    signup
}