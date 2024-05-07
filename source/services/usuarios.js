const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")

const send_email = require('../config/nodemailer')

const {Usuario} = require('../models')

/**
 * Verifies the JWT token.
 * @function
 * @param {string} token - The JWT token to verify.
 * @returns {Object} The decoded JWT token.
 * @throws {Error} If the JWT token is invalid.
 */
const verificar_JWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Retrieves a user by their email.
 * @function
 * @param {string} email - The email of the user.
 * @returns {Promise<Object>} The user object.
 */
const get_usuario = (email) => {
    return Usuario.findOne({email: email})
}

/**
 * Signs in a user.
 * @async
 * @function
 * @param {Object} usuario - The user's information.
 * @param {string} usuario.email - The user's email.
 * @param {string} usuario.password - The user's password.
 * @returns {Promise<string>} A JWT token.
 * @throws {Error} If the user is not found or the password is incorrect.
 */
const signin = async (usuario) => {
    const data = await get_usuario(usuario.email)

    if (!data)
        throw new Error("Usuario no encontrado")

    if (!bcryptjs.compareSync(usuario.password, data.password))
        throw new Error("Contraseña incorrecta")

    return jwt.sign({id: data._id, email: data.email, tipo: "usuario"}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SESSION_EXPIRES_IN})
}

/**
 * Signs up a user.
 * This function hashes the user's password using bcryptjs, creates a new user in the database,
 * sends a confirmation email to the user, and returns the created user object.
 * @async
 * @function
 * @param {Object} usuario - The user's information.
 * @param {string} usuario.email - The user's email.
 * @param {string} usuario.password - The user's password.
 * @returns {Promise<Object>} The created user object.
 * @throws {Error} If there is an error creating the user.
 */
const signup = async (usuario) => {
    try {
        usuario.password = bcryptjs.hashSync(usuario.password)
        const data = await Usuario.create(usuario)
        await send_email(data.email, "Usuario registrado correctamente", JSON.stringify(data))
        return data
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Updates a user's information.
 * @async
 * @function
 * @param {string} id - The id of the user to update.
 * @param {Object} usuario - The new information for the user.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If there is an error updating the user.
 */
const update_user = async (id, usuario) => {
    try {
        usuario.password = bcryptjs.hashSync(usuario.password)
        return await Usuario.findByIdAndUpdate(id, usuario)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Deletes a user.
 * @async
 * @function
 * @param {string} id - The id of the user to delete.
 * @returns {Promise<Object>} The deleted user object.
 * @throws {Error} If there is an error deleting the user.
 */
const delete_user = async (id) => {
    try {
        return await Usuario.findByIdAndDelete(id)
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * Retrieves users based on certain criteria.
 * @async
 * @function
 * @param {Object} searchBy - The criteria to search by.
 * @param {string} sortBy - The field to sort the results by.
 * @returns {Promise<Array>} The list of users that match the criteria.
 * @throws {Error} If there is an error retrieving the users.
 */
const get_users = async (searchBy, sortBy) => {
    try {
        const data = await Usuario.find(searchBy)
        return sortBy
            ? data.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
            : data
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    verificar_JWT,
    get_usuario,
    signin,
    signup,
    update_user,
    delete_user,
    get_users
}