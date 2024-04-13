const {bad_response} = require("../utils");
const usuarios_services = require('../services/usuarios')

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

const is_administrador = async (req, res, next) => {
    const data = await usuarios_services.get_usuario(req.JWT.email)

    if (!data)
        return bad_response(res, 401, new Error("Usuario no encontrado"))

    if (data.rol !== "admin")
        return bad_response(res, 401, new Error("No tienes permisos para realizar esta acción"))

    next()
}

module.exports = {
    verificar_JWT,
    is_administrador
}