const {Web, Usuario} = require('../models')

/**
 * Lists all the webs sorted by the provided parameter.
 * @param {string} sortBy - The parameter to sort by.
 * @returns {Promise<Array>} A promise that resolves to an array of webs.
 * @throws {Error} If an error occurs during database operation.
 */
const listar_webs = async (sortBy) => {
    try {
        const
            data = await Web.find({}),
            data_procesado = data
                .map(
                    web => {
                        let total = 0
                        web.resenias
                            .map(
                                resenia => total += resenia.puntuacion
                            )
                        return {...web._doc, score: (total / web.resenias.length) || 0}
                    }
                )

        return sortBy
            ? data_procesado.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data_procesado
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
 * Lists all the webs in a specific city sorted by the provided parameter.
 * @param {string} ciudad - The city of the webs.
 * @param {string} sortBy - The parameter to sort by.
 * @returns {Promise<Array>} A promise that resolves to an array of webs.
 * @throws {Error} If an error occurs during database operation.
 */
const listar_webs_ciudad = async (ciudad, sortBy) => {
    try {
        const data = await Web.find({ciudad: ciudad})
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Lists all the webs in a specific city and activity sorted by the provided parameter.
 * @param {string} ciudad - The city of the webs.
 * @param {string} actividad - The activity of the webs.
 * @param {string} sortBy - The parameter to sort by.
 * @returns {Promise<Array>} A promise that resolves to an array of webs.
 * @throws {Error} If an error occurs during database operation.
 */
const listar_webs_ciudad_actividad = async (ciudad, actividad, sortBy) => {
    try {
        const data = await Web.find({ciudad: ciudad, actividad: actividad})
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
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
        const usuario = await Usuario.findOne({_id: resenia.usuario})
        if (!usuario)
            throw new Error('Usuario no encontrado')

        if (usuario.resenias.includes(id))
            throw new Error('Ya has dejado una resenia en esta web')

        await Usuario.findOneAndUpdate({_id: resenia.usuario}, {"$push": {resenias: id}})
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
    listar_webs_ciudad,
    listar_webs_ciudad_actividad,
    crear_resenia,
    crear_web,
    editar_web,
    eliminar_web,
    eliminar_web_logico
}