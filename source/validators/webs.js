const {body} = require('express-validator')
const {validate} = require('.')

/**
 * Validation rules for creating a review.
 * @type {Array}
 */
const create_resenia = [
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('resenia', 'Type: String').exists().notEmpty().isString(),
    body('puntuacion', 'Type: Number').exists().notEmpty().isInt(),
    validate
]

/**
 * Validation rules for creating or updating a web.
 * @type {Array}
 */
const create_update_web = [
    body('ciudad', 'Type: String').exists().notEmpty().isString(),
    body('actividad', 'Type: String').exists().notEmpty().isString(),
    body('titulo', 'Type: String').exists().notEmpty().isString(),
    body('resumen', 'Type: String').exists().notEmpty().isString(),
    body('textos', 'Type: Array').exists().notEmpty().isArray(),
    body('fotos', 'Type: Array').exists().notEmpty().isArray(),
    validate
]

/**
 * Validation rules for patching a web.
 * @type {Array}
 */
const patch_web = [
    body('ciudad', 'Type: String').exists().notEmpty().isString().optional(),
    body('actividad', 'Type: String').exists().notEmpty().isString().optional(),
    body('titulo', 'Type: String').exists().notEmpty().isString().optional(),
    body('resumen', 'Type: String').exists().notEmpty().isString().optional(),
    body('textos', 'Type: Array').exists().notEmpty().isArray().optional(),
    body('fotos', 'Type: Array').exists().notEmpty().isArray().optional(),
    validate
]

module.exports = {
    create_resenia,
    create_update_web,
    patch_web
}