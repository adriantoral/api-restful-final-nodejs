const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

/*
* Campos de la colección
* ------------------------
* nombre: nombre del comercio
* cif: cif del comercio
* direccion: dirección del comercio
* email: email del comercio
* telefono: teléfono del comercio
* id_pagina: id de la página a la que pertenece el comercio
* */
const comercio_schema = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        cif: {
            type: String,
            unique: true
        },
        direccion: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        telefono: {
            type: String,
        },
        id_pagina: {
            type: Number
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)
comercio_schema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercios", comercio_schema)
