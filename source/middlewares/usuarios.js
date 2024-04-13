const {bad_response} = require("../utils")
const usuarios_services = require('../services/usuarios')

/**
 * Middleware to verify JWT token from the request header.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const verificar_JWT = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization)
        return bad_response(res, 401, new Error("Se necesita un token de autorización"))

    const [_, token] = authorization.split(" ")

    try {
        req.JWT = usuarios_services.verificar_JWT(token)
        next()
    } catch (e) {
        return bad_response(res, 401, e)
    }
}

/**
 * Middleware to check if the user is an administrator.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const is_administrador = async (req, res, next) => {
    const data = await usuarios_services.get_usuario(req.JWT.email)

    if (!data)
        return bad_response(res, 401, new Error("Usuario no encontrado"))

    if (data.rol !== "admin")
        return bad_response(res, 401, new Error("No tienes permisos para realizar esta acción"))

    next()
}

/**
 * Middleware to check if the JWT token belongs to a comercio.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const is_comercio_JWT = (req, res, next) => {
    return req.JWT.tipo === "comercio"
        ? next()
        : bad_response(res, 401, new Error("El JWT no es de un comercio"))
}

/**
 * Middleware to check if the JWT token belongs to a usuario.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const is_usuario_JWT = (req, res, next) => {
    return req.JWT.tipo === "usuario"
        ? next()
        : bad_response(res, 401, new Error("El JWT no es de un usuario"))
}

module.exports = {
    verificar_JWT,
    is_administrador,
    is_comercio_JWT,
    is_usuario_JWT
}