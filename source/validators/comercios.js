const {body} = require('express-validator')
const {validate} = require('.')

/**
 * Validation rules for creating a comercio.
 * All fields are mandatory.
 * @type {Array}
 */
const create_comercio = [
    body('nombre', 'Type: String').exists().notEmpty().isString(),
    body('cif', 'Type: String').exists().notEmpty().isString(),
    body('direccion', 'Type: String').exists().notEmpty().isString(),
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('telefono', 'Type: String').exists().notEmpty().isString(),
    validate
]

/**
 * Validation rules for updating a comercio.
 * All fields are optional.
 * @type {Array}
 */
const update_comercio = [
    body('nombre', 'Type: String').notEmpty().isString(),
    body('direccion', 'Type: String').notEmpty().isString(),
    body('email', 'Type: String').notEmpty().isString(),
    body('telefono', 'Type: String').notEmpty().isString(),
    validate
]

/**
 * Validation rules for patching a comercio.
 * All fields are optional.
 * @type {Array}
 */
const patch_comercio = [
    body('nombre', 'Type: String').notEmpty().isString().optional(),
    body('direccion', 'Type: String').notEmpty().isString().optional(),
    body('email', 'Type: String').notEmpty().isString().optional(),
    body('telefono', 'Type: String').notEmpty().isString().optional(),
    validate
]

module.exports = {
    create_comercio,
    update_comercio,
    patch_comercio
}