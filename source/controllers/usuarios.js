const {good_response, bad_response} = require('../utils')
const usuarios_services = require('../services/usuarios')

const signin = async (req, res) => {
    try {
        return good_response(res, await usuarios_services.signin(req.MATCHED))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

const signup = async (req, res) => {
    try {
        return good_response(res, await usuarios_services.signup(req.MATCHED))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

module.exports = {
    signin, signup
}