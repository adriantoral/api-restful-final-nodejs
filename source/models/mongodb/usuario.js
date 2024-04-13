const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

/**
 * Usuario Schema
 * @module Usuario
 * @typedef {Object} Usuario
 * @property {string} nombre - The name of the usuario
 * @property {string} email - The email of the usuario. It is unique.
 * @property {string} password - The password of the usuario
 * @property {number} edad - The age of the usuario
 * @property {string} ciudad - The city of the usuario
 * @property {string} rol - The role of the usuario. It can be "admin" or "usuario". Default is "usuario".
 * @property {Array} intereses - The interests of the usuario
 * @property {boolean} permiteRecibirOfertas - Indicates if the usuario wants to receive offers. Default is false.
 */
const usuario_schema = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        edad: {
            type: Number
        },
        ciudad: {
            type: String
        },
        rol: {
            type: String,
            enum: ["admin", "usuario"],
            default: "usuario"
        },
        intereses: {
            type: Array
        },
        permiteRecibirOfertas: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

// Enable soft delete
usuario_schema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("usuarios", usuario_schema)