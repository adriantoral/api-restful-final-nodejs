const {good_response, bad_response} = require('../utils')
const usuarios_services = require('../services/usuarios')

/**
 * Controller for signing in a user.
 * @async
 * @function
 * @param {Object} req - Express request object. The user's information is in req.MATCHED.
 * @param {Object} res - Express response object.
 * @returns {Promise<Response>} A promise that resolves to an Express response object.
 */
const signin = async (req, res) => {
    try {
        return good_response(res, await usuarios_services.signin(req.MATCHED))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

/**
 * Controller for signing up a user.
 * @async
 * @function
 * @param {Object} req - Express request object. The user's information is in req.MATCHED.
 * @param {Object} res - Express response object.
 * @returns {Promise<Response>} A promise that resolves to an Express response object.
 */
const signup = async (req, res) => {
    try {
        return good_response(res, await usuarios_services.signup(req.MATCHED))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

const get_users = async (req, res) => {
    try {
        return good_response(res, await usuarios_services.get_users({ciudad: req.MATCHED.id, permiteRecibirOfertas: true}, req.MATCHED.sortBy))
    } catch (error) {
        return bad_response(res, 500, error)
    }
}

module.exports = {
    signin, signup, get_users
}