const {Comercio} = require('../models')

const listar_comercios = async (sortBy) => {
    try {
        const data = await Comercio.find({})
        return sortBy ? data.sort((a, b) => {
            return a[sortBy] < b[sortBy] ? 1 : -1
        }) : data
    } catch (e) {
        return null
    }
}

const listar_comercio = async (id) => {
    try {
        return await Comercio.findOne({cif: id})
    } catch (e) {
        return null
    }
}

const crear_comercio = async (comercio) => {
    try {
        return await Comercio.create(comercio)
    } catch (e) {
        return null
    }
}

const editar_comercio = async (id, comercio_nuevo) => {
    try {
        return await Comercio.findOneAndUpdate({cif: id}, comercio_nuevo)
    } catch (e) {
        return null
    }
}

const eliminar_comercio = async (id) => {
    try {
        return await Comercio.deleteOne({cif: id})
    } catch (e) {
        return null
    }
}

const eliminar_comercio_logico = async (id) => {
    try {
        return await Comercio.delete({cif: id})
    } catch (e) {
        return null
    }
}

module.exports = {
    listar_comercios, listar_comercio, crear_comercio, editar_comercio, eliminar_comercio, eliminar_comercio_logico
}
