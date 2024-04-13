const {good_response, bad_response} = require('../utils')
const webs_services = require("../services/webs")
const comercios_services = require('../services/comercios')

/**
 * Lists all the webs sorted by the provided parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const listar_webs = async (req, res) => {
    try {
        return good_response(res, await webs_services.listar_webs(req.MATCHED.sortBy))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Lists a specific web by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const listar_web = async (req, res) => {
    try {
        return good_response(res, await webs_services.listar_web(req.MATCHED.param))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Lists all the webs in a specific city sorted by the provided parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const listar_webs_ciudad = async (req, res) => {
    try {
        return good_response(res, await webs_services.listar_webs_ciudad(req.MATCHED.param, req.MATCHED.sortBy))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Lists all the webs in a specific city and activity sorted by the provided parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const listar_webs_ciudad_actividad = async (req, res) => {
    try {
        return good_response(res, await webs_services.listar_webs_ciudad_actividad(req.MATCHED.param, req.MATCHED.param2, req.MATCHED.sortBy))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Creates a review for a specific web.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const crear_resenia = async (req, res) => {
    try {
        const {id, ...resenia} = req.MATCHED
        return good_response(res, await webs_services.crear_resenia(id, resenia))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Creates a new web and associates it with a commerce.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const crear_web = async (req, res) => {
    try {
        req.MATCHED.resenias = []
        const web = await webs_services.crear_web(req.MATCHED)
        await comercios_services.editar_comercio(req.JWT.cif, {id_pagina: web._id.toString()})
        return good_response(res, web)
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Edits a specific web associated with a commerce.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const editar_web = async (req, res) => {
    try {
        const comercio = await comercios_services.get_comercio(req.JWT.cif)
        return good_response(res, await webs_services.editar_web(comercio.id_pagina, req.MATCHED))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Deletes a specific web associated with a commerce.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} A promise that resolves to a response object.
 */
const eliminar_web = async (req, res) => {
    try {
        const comercio = await comercios_services.get_comercio(req.JWT.cif)
        const data = req.MATCHED.logico ? await webs_services.eliminar_web_logico(comercio.id_pagina) : await webs_services.eliminar_web(comercio.id_pagina)
        await comercios_services.editar_comercio(req.JWT.cif, {id_pagina: null})
        return good_response(res, data)
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

module.exports = {
    listar_webs,
    listar_web,
    listar_webs_ciudad,
    listar_webs_ciudad_actividad,
    crear_resenia,
    crear_web,
    editar_web,
    eliminar_web
}