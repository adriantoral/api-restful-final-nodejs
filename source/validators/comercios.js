const {body, param, query} = require('express-validator')
const {validate} = require('.')

// Validador para coger el id de la URL y el tipo de eliminación
// El tipo es solo para la ruta de eliminación, asi me evito duplicación de validadores
const get_id = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    validate
]

// Validador para listar comercios, solo se puede ordenar por un campo
const listar_comercios = [
    query('sortBy', 'Type: String').notEmpty().isString().optional(),
    validate
]

// Validadores para la creación de comercios, todos los campos son obligatorios
const create_comercio = [
    body('nombre', 'Type: String').exists().notEmpty().isString(),
    body('cif', 'Type: String').exists().notEmpty().isString(),
    body('direccion', 'Type: String').exists().notEmpty().isString(),
    body('email', 'Type: String').exists().notEmpty().isString(),
    body('telefono', 'Type: String').exists().notEmpty().isString(),
    body('id_pagina', 'Type: Number').exists().notEmpty().isInt(),
    validate
]

// Validadores para la actualización de comercios, todos los campos son opcionales
const update_comercio = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    body('nombre', 'Type: String').notEmpty().isString(),
    body('direccion', 'Type: String').notEmpty().isString(),
    body('email', 'Type: String').notEmpty().isString(),
    body('telefono', 'Type: String').notEmpty().isString(),
    body('id_pagina', 'Type: Number').notEmpty().isInt(),
    validate
]

// Validadores para la actualización parcial de comercios, todos los campos son opcionales
const patch_comercio = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    body('nombre', 'Type: String').notEmpty().isString().optional(),
    body('direccion', 'Type: String').notEmpty().isString().optional(),
    body('email', 'Type: String').notEmpty().isString().optional(),
    body('telefono', 'Type: String').notEmpty().isString().optional(),
    body('id_pagina', 'Type: Number').notEmpty().isInt().optional(),
    validate
]

// Validadores para la eliminación de comercios
const delete_comercio = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    query('logico', 'Type: Boolean').default(false).optional(),
    validate
]

module.exports = {
    get_id,
    listar_comercios,
    create_comercio,
    update_comercio,
    patch_comercio,
    delete_comercio
}
