const {validationResult, body, param, query, matchedData} = require("express-validator")

/*
* Funcion para activar los validadores.
* Si hay errores, se envía un mensaje de error con los errores.
* Si no hay errores, se guardan los datos matcheados en req.MATCHED y se llama a next.
* */
const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.MATCHED = req.MATCHED ? {...req.MATCHED, ...matchedData(req)} : matchedData(req)
        return next()
    } catch (err) {
        return res.status(400).send({data: {errors: err.array({onlyFirstError: true})}})
    }
}

/*
* Validador para la paginación.
* Ignorada porque no hay paginacion en la API.
* */
const pagination = [body('skip').default(0).toInt(), body('take').default(20).toInt(), validate]

// Validador para coger el id de la URL y el tipo de eliminación
// El tipo es solo para la ruta de eliminación, asi me evito duplicación de validadores
const get_id = [
    param('id', 'Type: String').exists().notEmpty().isString(),
    validate
]

// Validador para listar comercios, solo se puede ordenar por un campo
const listar_doc = [
    query('sortBy', 'Type: String').notEmpty().isString().optional(),
    validate
]

// Validadores para la eliminación de documentos
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
