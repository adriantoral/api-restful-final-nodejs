const {bad_response} = require("../utils")
const comercios_services = require('../services/comercios')

/**
 * Middleware to check if a commerce does not have a page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} A promise that resolves to the next middleware function or a bad response.
 */
const no_tiene_pagina = async (req, res, next) => {
    const data = await comercios_services.get_comercio(req.JWT.cif)

    if (!data)
        return bad_response(res, 401, new Error("Comercio no encontrado"))

    if (data.id_pagina)
        return bad_response(res, 401, new Error("El comercio ya tiene una página"))

    next()
}

/**
 * Middleware to check if a commerce has a page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise} A promise that resolves to the next middleware function or a bad response.
 */
const tiene_pagina = async (req, res, next) => {
    const data = await comercios_services.get_comercio(req.JWT.cif)

    if (!data)
        return bad_response(res, 401, new Error("Comercio no encontrado"))

    if (!data.id_pagina)
        return bad_response(res, 401, new Error("El comercio no tiene una página"))

    next()
}

module.exports = {
    no_tiene_pagina,
    tiene_pagina
}