const {body} = require('express-validator')
const {validate} = require('.')

/**
 * Validation rules for creating a review.
 * @type {Array}
 */
const create_resenia = [
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

/**
 * Validation rules for uploading a photo.
 * @type {Array}
 * @property {function} body('foto', 'Type: String, Max-Length: None') - Checks if 'foto' exists, is not empty, and is a string. This check is optional.
 * @property {function} validate - A custom validation function.
 */
const subir_foto = [
    body('foto', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    validate
]

module.exports = {
    create_resenia,
    create_update_web,
    patch_web,
    subir_foto
}