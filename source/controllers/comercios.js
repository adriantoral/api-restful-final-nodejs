const {good_response, bad_response} = require('../utils') // Importing the utility functions
const comercios_services = require('../services/comercios') // Importing the comercios services

/**
 * Function to list all comercios
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const listar_comercios = async (req, res) => {
    try {
        return good_response(res, await comercios_services.listar_comercios(req.MATCHED.sortBy))
    } catch (e) {
        return bad_response(res, 500, e)
    }
}

/**
 * Function to list a specific comercio
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const listar_comercio = async (req, res) => {
    try {
        return good_response(res, await comercios_services.listar_comercio(req.MATCHED.param))
    } catch (e) {
        return bad_response(res, 500, e)
    }
}

/**
 * Function to create a comercio
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const crear_comercio = async (req, res) => {
    try {
        req.MATCHED.id_pagina = null
        return good_response(res, await comercios_services.crear_comercio(req.MATCHED))
    } catch (e) {
        return bad_response(res, 500, e)
    }
}

/**
 * Function to edit a comercio
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const editar_comercio = async (req, res) => {
    try {
        const {param, ...comercio} = req.MATCHED
        return good_response(res, await comercios_services.editar_comercio(param, comercio))
    } catch (e) {
        return bad_response(res, 500, e)
    }
}

/**
 * Function to delete a comercio
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const eliminar_comercio = async (req, res) => {
    try {
        return good_response(res, req.MATCHED.logico ? await comercios_services.eliminar_comercio_logico(req.MATCHED.param) : await comercios_services.eliminar_comercio(req.MATCHED.param))
    } catch (e) {
        return bad_response(res, 500, e)
    }
}

module.exports = {
    listar_comercios,
    listar_comercio,
    crear_comercio,
    editar_comercio,
    eliminar_comercio
}