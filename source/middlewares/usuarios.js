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

module.exports = {
    verificar_JWT
}