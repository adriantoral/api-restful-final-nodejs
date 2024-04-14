const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "API Restful Final Project",
            version: "1.4.0",
            description:
                "Se desea crear una aplicación para que cualquier comercio registrado pueda subir sucontenido (fotos, texto, etc) y pueda visualizarse cuando los usuarios busquen por loscomercios de una ciudad y de una actividad concreta.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                token_usuario: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: 'JWT'
                },
                token_comercio: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                usuario: {
                    type: "object",
                    required: [
                        "nombre",
                        "email",
                        "password",
                        "edad",
                        "ciudad",
                        "rol",
                        "intereses",
                        "permiteRecibirOfertas"
                    ],
                    properties: {
                        nombre: {
                            type: "String",
                            example: "Juan"
                        },
                        email: {
                            type: "String",
                            unique: "true",
                            example: "juan@correo.com"
                        },
                        password: {
                            type: "String",
                            example: "pass123456"
                        },
                        edad: {
                            type: "Number",
                            example: 25
                        },
                        ciudad: {
                            type: "String",
                            example: "Madrid"
                        },
                        rol: {
                            type: "enum: ['admin', 'usuario']",
                            example: "usuario"
                        },
                        intereses: {
                            type: "Array",
                            example: [
                                "tecnologia",
                                "deportes"
                            ]
                        },
                        permiteRecibirOfertas: {
                            type: "Boolean",
                            example: "false"
                        }
                    },
                },
                comercio: {
                    type: "object",
                    required: [
                        "nombre",
                        "cif",
                        "direccion",
                        "email",
                        "telefono",
                    ],
                    properties: {
                        nombre: {
                            type: "String",
                            example: "Mi comercio"
                        },
                        cif: {
                            type: "String",
                            unique: "true",
                            example: "MICIF12345"
                        },
                        direccion: {
                            type: "String",
                            example: "Calle Falsa 123"
                        },
                        email: {
                            type: "String",
                            unique: "true",
                            example: "micomercio@comercio.com"
                        },
                        telefono: {
                            type: "String",
                            example: "+34123456789"
                        }
                    },
                },
                webs: {
                    type: "object",
                    required: [
                        "ciudad",
                        "actividad",
                        "titulo",
                        "resumen",
                        "textos",
                        "fotos"
                    ],
                    properties: {
                        ciudad: {
                            type: "String",
                            example: "Madrid"
                        },
                        actividad: {
                            type: "String",
                            example: "Deportes"
                        },
                        titulo: {
                            type: "String",
                            example: "Mi web"
                        },
                        resumen: {
                            type: "String",
                            example: "Resumen de mi web"
                        },
                        textos: {
                            type: "Array",
                            example: [
                                "Texto 1",
                                "Texto 2"
                            ]
                        },
                        fotos: {
                            type: "Array",
                            example: [
                                "Foto 1",
                                "Foto 2"
                            ]
                        }
                    },
                }
            },
        },
    },
    apis: ["./source/routes/v1/*.js"]
}

module.exports = swaggerJsdoc(options)