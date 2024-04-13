const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")

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
        return await Usuario.create(usuario)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    verificar_JWT,
    get_usuario,
    signin,
    signup
}