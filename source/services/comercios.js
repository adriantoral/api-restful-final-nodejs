const {Comercio} = require('../models') // Importing the Comercio model
const jwt = require("jsonwebtoken") // Importing the jsonwebtoken for generating tokens

/**
 * Function to get a specific comercio
 * @param {String} cif - The CIF of the comercio
 * @returns {Object} The comercio object
 * @throws {Error} If there is an error
 */
const get_comercio = async (cif) => {
    try {
        return await Comercio.findOne({cif: cif})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to list all comercios
 * @param {String} sortBy - The field to sort by
 * @returns {Array} The list of comercios
 * @throws {Error} If there is an error
 */
const listar_comercios = async (sortBy) => {
    try {
        const data = await Comercio.find({})
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to list a specific comercio
 * @param {String} cif - The CIF of the comercio
 * @returns {Object} The comercio object
 * @throws {Error} If there is an error
 */
const listar_comercio = async (cif) => {
    try {
        return await get_comercio(cif)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to create a comercio
 * @param {Object} comercio - The comercio object
 * @returns {Object} The created comercio object
 * @throws {Error} If there is an error
 */
const crear_comercio = async (comercio) => {
    try {
        const data = await Comercio.create(comercio)
        return {...data._doc, jwt: jwt.sign({id: data._id, cif: data.cif, tipo: "comercio"}, process.env.JWT_SECRET)}
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to edit a comercio
 * @param {String} cif - The CIF of the comercio
 * @param {Object} comercio_nuevo - The new comercio object
 * @returns {Object} The updated comercio object
 * @throws {Error} If there is an error
 */
const editar_comercio = async (cif, comercio_nuevo) => {
    try {
        return await Comercio.findOneAndUpdate({cif: cif}, comercio_nuevo)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to delete a comercio
 * @param {String} cif - The CIF of the comercio
 * @returns {Object} The deleted comercio object
 * @throws {Error} If there is an error
 */
const eliminar_comercio = async (cif) => {
    try {
        return await Comercio.deleteOne({cif: cif})
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Function to logically delete a comercio
 * @param {String} cif - The CIF of the comercio
 * @returns {Object} The deleted comercio object
 * @throws {Error} If there is an error
 */
const eliminar_comercio_logico = async (cif) => {
    try {
        return await Comercio.delete({cif: cif})
    } catch (e) {
        throw new Error(e.message)
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