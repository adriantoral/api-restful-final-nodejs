const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

/*
* Campos de la colección
* ------------------------
* Nombre: nombre del usuario
* E-mail: email del usuario
* Password: contraseña del usuario
* Edad: edad del usuario
* Ciudad: ciudad del usuario
* Rol: rol del usuario (admin, usuario)
* Intereses: intereses del usuario
* PermiteRecibirOfertas: booleano que indica si el usuario quiere recibir ofertas
* */
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
usuario_schema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("usuarios", usuario_schema)
