const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

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
