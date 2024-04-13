const comercios_services = require('../services/comercios')
const {res_handler} = require('../utils')

/**
 * List all comercios.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response handler with the data or an error message.
 */
const listar_comercios = async (req, res) => {
    const data = await comercios_services.listar_comercios(req.MATCHED.sortBy)
    return res_handler(res, data, 500, "Error al listar los comercios")
}

/**
 * List a comercio by id.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response handler with the data or an error message.
 */
const listar_comercio = async (req, res) => {
    const data = await comercios_services.listar_comercio(req.MATCHED.id)
    return res_handler(res, data, 500, "Error al listar el comercio")
}

/**
 * Create a comercio.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response handler with the data or an error message.
 */
const crear_comercio = async (req, res) => {
    req.MATCHED.id_pagina = null
    const data = await comercios_services.crear_comercio(req.MATCHED)
    return res_handler(res, data, 500, "Error al crear el comercio")
}

/**
 * Update a comercio.
 * Acts as a PATCH and not as a PUT, as it only updates the fields that are sent.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response handler with the data or an error message.
 */
const editar_comercio = async (req, res) => {
    const {id, ...comercio} = req.MATCHED
    const data = await comercios_services.editar_comercio(id, comercio)
    return res_handler(res, data, 500, "Error al editar el comercio")
}

/**
 * Delete a comercio.
 * Can delete it logically or physically based on the logical parameter.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response handler with the data or an error message.
 */
const eliminar_comercio = async (req, res) => {
    const data = req.MATCHED.logico ? await comercios_services.eliminar_comercio_logico(req.MATCHED.id) : await comercios_services.eliminar_comercio(req.MATCHED.id)
    return res_handler(res, data, 500, "Error al eliminar el comercio")
}

module.exports = {
    listar_comercios, listar_comercio, crear_comercio, editar_comercio, eliminar_comercio
}