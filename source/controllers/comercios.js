const comercios_services = require('../services/comercios')

const listar_comercios = async (req, res) => {
    const data = await comercios_services.listar_comercios()
    if (!data) return res.status(500).json({message: "Error al listar los comercios"})
    res.send({data: data})
}

const listar_comercio = async (req, res) => {
    const data = await comercios_services.listar_comercio(req.MATCHED.id)
    if (!data) return res.status(500).json({message: "Error al listar el comercio"})
    res.send({data: data})
}

const crear_comercio = async (req, res) => {
    const data = await comercios_services.crear_comercio(req.MATCHED)
    if (!data) return res.status(500).json({message: "Error al crear el comercio"})
    res.send({data: data})
}

const editar_comercio = async (req, res) => {
    const {id, ...comercio} = req.MATCHED
    const data = await comercios_services.editar_comercio(id, comercio)
    if (!data) return res.status(500).json({message: "Error al editar el comercio"})
    res.send({data: data})
}

const eliminar_comercio = async (req, res) => {
    const {id, tipo} = req.MATCHED
    const data = tipo === 'fisico' ? await comercios_services.eliminar_comercio(id) : await comercios_services.eliminar_comercio_logico(id)
    if (!data) return res.status(500).json({message: "Error al eliminar el comercio"})
    res.send({data: data})
}

module.exports = {
    listar_comercios, listar_comercio, crear_comercio, editar_comercio, eliminar_comercio
}
