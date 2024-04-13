const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")

const {Usuario} = require('../models')

const verificar_JWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        throw new Error(e.message)
    }
}

const get_usuario = (email) => {
    return Usuario.findOne({email: email});
}

const signin = async (usuario) => {
    const data = await get_usuario(usuario.email)

    if (!data)
        throw new Error("Usuario no encontrado")

    if (!bcryptjs.compareSync(usuario.password, data.password))
        throw new Error("Contraseña incorrecta")

    return jwt.sign({id: data._id, email: data.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SESSION_EXPIRES_IN})
}

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