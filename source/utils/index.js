/**
 * Handler for response requests.
 * If data_validation does not exist, an error message is sent with the error code and error message.
 * If data_validation exists, the data is sent.
 * @function
 * @param {Object} res - Express response object.
 * @param {Object} data_validation - The data to validate.
 * @param {number} error_code - The HTTP status code for the error.
 * @param {string} error_message - The error message.
 * @returns {Response} The Express response object.
 */
const res_handler = (res, data_validation, error_code, error_message) => {
    if (!data_validation) return res.status(error_code).send({data: {errors: [error_message]}})
    return res.send({data: data_validation})
}

/**
 * Sends a successful response.
 * @function
 * @param {Object} res - Express response object.
 * @param {Object} data - The data to send.
 * @returns {Response} The Express response object.
 */
const good_response = (res, data) => {
    return res.send({data: data})
}

/**
 * Sends an error response.
 * @async
 * @function
 * @param {Object} res - Express response object.
 * @param {number} error_code - The HTTP status code for the error.
 * @param {Error} error - The error to send.
 * @returns {Promise<Response>} A promise that resolves to an Express response object.
 */
const bad_response = async (res, error_code, error) => {
    return res.status(error_code).send({data: {errors: [error.message]}})
}

module.exports = {
    res_handler,
    good_response,
    bad_response
}