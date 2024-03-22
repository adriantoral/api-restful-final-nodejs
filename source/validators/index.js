const {validationResult, body, matchedData} = require("express-validator")

/*
* Funcion para activar los validadores.
* Si hay errores, se envía un mensaje de error con los errores.
* Si no hay errores, se guardan los datos matcheados en req.MATCHED y se llama a next.
* */
const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.MATCHED = matchedData(req)
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

module.exports = {
    validate, pagination
}
