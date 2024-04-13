const {Comercio} = require('../models')
const jwt = require("jsonwebtoken")

/**
 * Get a comercio by its CIF.
 * @async
 * @param {string} cif - The CIF of the comercio.
 * @returns {Promise} A promise that resolves to the comercio or throws an error.
 */
const get_comercio = async (cif) => {
    try {
        return await Comercio.findOne({cif: cif})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * List all comercios.
 * @async
 * @param {string} sortBy - The field to sort the comercios by.
 * @returns {Promise} A promise that resolves to the sorted comercios or all comercios if no sortBy is provided.
 */
const listar_comercios = async (sortBy) => {
    try {
        const data = await Comercio.find({})
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
    } catch (e) {
        return null
    }
}

/**
 * Get a comercio by its CIF.
 * @async
 * @param {string} cif - The CIF of the comercio.
 * @returns {Promise} A promise that resolves to the comercio or null if it does not exist.
 */
const listar_comercio = async (cif) => {
    try {
        return await get_comercio(cif)
    } catch (e) {
        return null
    }
}

/**
 * Create a comercio.
 * @async
 * @param {Object} comercio - The comercio to create.
 * @returns {Promise} A promise that resolves to the created comercio or null if there was an error.
 */
const crear_comercio = async (comercio) => {
    try {
        const data = await Comercio.create(comercio)
        return {...data._doc, jwt: jwt.sign({id: data._id, cif: data.cif, tipo: "comercio"}, process.env.JWT_SECRET)}
    } catch (e) {
        return null
    }
}

/**
 * Update a comercio by its CIF.
 * @async
 * @param {string} cif - The CIF of the comercio.
 * @param {Object} comercio_nuevo - The new comercio data.
 * @returns {Promise} A promise that resolves to the updated comercio or null if there was an error.
 */
const editar_comercio = async (cif, comercio_nuevo) => {
    try {
        return await Comercio.findOneAndUpdate({cif: cif}, comercio_nuevo)
    } catch (e) {
        return null
    }
}

/**
 * Delete a comercio by its CIF.
 * @async
 * @param {string} cif - The CIF of the comercio.
 * @returns {Promise} A promise that resolves to the deleted comercio or null if there was an error.
 */
const eliminar_comercio = async (cif) => {
    try {
        return await Comercio.deleteOne({cif: cif})
    } catch (e) {
        return null
    }
}

/**
 * Logically delete a comercio by its CIF.
 * @async
 * @param {string} cif - The CIF of the comercio.
 * @returns {Promise} A promise that resolves to the deleted comercio or null if there was an error.
 */
const eliminar_comercio_logico = async (cif) => {
    try {
        return await Comercio.delete({cif: cif})
    } catch (e) {
        return null
    }
}

module.exports = {
    get_comercio,
    listar_comercios,
    listar_comercio,
    crear_comercio,
    editar_comercio,
    eliminar_comercio,
    eliminar_comercio_logico
}