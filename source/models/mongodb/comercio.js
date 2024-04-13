const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

/**
 * Comercio Schema
 * @module Comercio
 * @typedef {Object} Comercio
 * @property {string} nombre - The name of the comercio
 * @property {string} cif - The cif of the comercio. It is unique.
 * @property {string} direccion - The address of the comercio
 * @property {string} email - The email of the comercio. It is unique.
 * @property {string} telefono - The phone number of the comercio
 * @property {string} id_pagina - The id of the page that the comercio belongs to
 */
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
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

// Enable soft delete
comercio_schema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("comercios", comercio_schema)