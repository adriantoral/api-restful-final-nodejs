const comercios_services = require('../services/comercios')
const {res_handler} = require('../utils')

/*
* Listar comercios
* */
const listar_comercios = async (req, res) => {
    const data = await comercios_services.listar_comercios(req.MATCHED.sortBy)
    return res_handler(res, data, 500, "Error al listar los comercios")
}

/*
* Listar un comercio por id
* */
const listar_comercio = async (req, res) => {
    const data = await comercios_services.listar_comercio(req.MATCHED.id)
    return res_handler(res, data, 500, "Error al listar el comercio")
}

/*
* Crear un comercio
* */
const crear_comercio = async (req, res) => {
    const data = await comercios_services.crear_comercio(req.MATCHED)
    return res_handler(res, data, 500, "Error al crear el comercio")
}

/*
* Actualizar un comercio
* Actua como un PATCH y no como un PUT, ya que solo actualiza los campos que se envian.
* */
const editar_comercio = async (req, res) => {
    const {id, ...comercio} = req.MATCHED
    const data = await comercios_services.editar_comercio(id, comercio)
    return res_handler(res, data, 500, "Error al editar el comercio")
}

/*
* Eliminar un comercio
* Puede eliminarlo de forma logica o fisica basado en el parametro logico
* */
const eliminar_comercio = async (req, res) => {
    const data = req.MATCHED.logico ? await comercios_services.eliminar_comercio_logico(req.MATCHED.id) : await comercios_services.eliminar_comercio(req.MATCHED.id)
    return res_handler(res, data, 500, "Error al eliminar el comercio")
}

module.exports = {
    listar_comercios, listar_comercio, crear_comercio, editar_comercio, eliminar_comercio
}
