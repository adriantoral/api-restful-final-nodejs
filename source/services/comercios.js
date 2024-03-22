const {Comercio} = require('../models')

/*
* Listar comercios
* Devuelve los comercios ordenados por el parametro sortBy, todos los datos sino se envia parametro y null si ha habido un error
* */
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

/*
* Lista un comercio por su cif
* Devuelve el comercio o null si no existe
* */
const listar_comercio = async (id) => {
    try {
        return await Comercio.findOne({cif: id})
    } catch (e) {
        return null
    }
}

/*
* Crea un comercio
* Devuelve el comercio creado o null si ha habido un error
* */
const crear_comercio = async (comercio) => {
    try {
        return await Comercio.create(comercio)
    } catch (e) {
        return null
    }
}

/*
* Edita un comercio por su cif
* Actua como un PATCH y no como un PUT, ya que solo actualiza los campos que se envian.
* */
const editar_comercio = async (id, comercio_nuevo) => {
    try {
        return await Comercio.findOneAndUpdate({cif: id}, comercio_nuevo)
    } catch (e) {
        return null
    }
}

/*
* Elimina un comercio por su cif
* Devuelve el comercio eliminado o null si ha habido un error
* */
const eliminar_comercio = async (id) => {
    try {
        return await Comercio.deleteOne({cif: id})
    } catch (e) {
        return null
    }
}

/*
* Elimina un comercio por su cif de forma logica
* Devuelve el comercio eliminado o null si ha habido un error
* */
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
