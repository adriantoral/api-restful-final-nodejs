const {Web} = require('../models')

/**
 * Lists all the webs sorted by the provided parameter.
 * @param {string} sortBy - The parameter to sort by.
 * @returns {Promise<Array>} A promise that resolves to an array of webs.
 * @throws {Error} If an error occurs during database operation.
 */
const listar_webs = async (sortBy) => {
    try {
        const data = await Web.find({})
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Lists a specific web by its ID.
 * @param {string} id - The ID of the web.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const listar_web = async (id) => {
    try {
        return await Web.findOne({_id: id})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Creates a review for a specific web.
 * @param {string} id - The ID of the web.
 * @param {Object} resenia - The review to be added.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const crear_resenia = async (id, resenia) => {
    try {
        return await Web.findOneAndUpdate({_id: id}, {"$push": {resenias: resenia}})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Creates a new web.
 * @param {Object} web - The web to be created.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const crear_web = async (web) => {
    try {
        return await Web.create(web)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Edits a specific web.
 * @param {string} id - The ID of the web.
 * @param {Object} web_nueva - The new web data.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const editar_web = async (id, web_nueva) => {
    try {
        return await Web.findOneAndUpdate({_id: id}, web_nueva)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Deletes a specific web.
 * @param {string} id - The ID of the web.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const eliminar_web = async (id) => {
    try {
        return await Web.deleteOne({_id: id})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Logically deletes a specific web.
 * @param {string} id - The ID of the web.
 * @returns {Promise<Object>} A promise that resolves to a web object.
 * @throws {Error} If an error occurs during database operation.
 */
const eliminar_web_logico = async (id) => {
    try {
        return await Web.delete({_id: id})
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    listar_webs,
    listar_web,
    crear_resenia,
    crear_web,
    editar_web,
    eliminar_web,
    eliminar_web_logico
}