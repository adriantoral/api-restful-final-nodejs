const {validationResult, body, param, query, matchedData} = require("express-validator")

/**
 * Function to activate the validators.
 * If there are errors, an error message is sent with the errors.
 * If there are no errors, the matched data is saved in req.MATCHED and next is called.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.MATCHED = req.MATCHED ? {...req.MATCHED, ...matchedData(req)} : matchedData(req)
        return next()
    } catch (err) {
        return res.status(400).send({data: {errors: err.array({onlyFirstError: true})}})
    }
}

/**
 * Validator for pagination.
 * Ignored because there is no pagination in the API.
 */
const pagination = [body('skip').default(0).toInt(), body('take').default(20).toInt(), validate]

/**
 * Validator to get the id from the URL and the type of deletion
 * The type is only for the delete route, so I avoid duplicating validators
 */
const get_id = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    param('actividad', 'Type: String').exists().notEmpty().isString().optional(),
    validate
]

/**
 * Validator for listing comercios, can only be sorted by one field
 */
const listar_doc = [
    query('sortBy', 'Type: String').notEmpty().isString().optional(),
    validate
]

/**
 * Validators for the deletion of documents
 */
const delete_doc = [
    query('logico', 'Type: Boolean').default(false).optional(),
    validate
]

module.exports = {
    validate,
    pagination,
    get_id,
    listar_doc,
    delete_doc
}