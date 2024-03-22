/*
* Handler para las peticiones de respuesta.
* Si data_validation no existe, se envía un mensaje de error con el código de error y el mensaje de error.
* Si data_validation existe, se envía la data.
* */
const res_handler = (res, data_validation, error_code, error_message) => {
    if (!data_validation) return res.status(error_code).send({data: {errors: [error_message]}})
    return res.send({data: data_validation})
}

module.exports = {
    res_handler
}
