const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

/**
 * Webs Schema
 * @module Webs
 * @typedef {Object} Webs
 * @property {string} ciudad - The city of the activity
 * @property {string} actividad - The type of activity
 * @property {string} titulo - The title of the activity
 * @property {string} resumen - The summary of the activity
 * @property {Array} textos - The texts of the activity
 * @property {Array} fotos - The photos of the activity
 * @property {Array} resenias - The reviews of the activity. This field is not modifiable by the comercio.
 */
const webs_schema = new mongoose.Schema(
    {
        ciudad: {
            type: String
        },
        actividad: {
            type: String
        },
        titulo: {
            type: String
        },
        resumen: {
            type: String
        },
        textos: {
            type: Array
        },
        fotos: {
            type: Array
        },
        resenias: {
            type: Array
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

// Enable soft delete
webs_schema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("webs", webs_schema)