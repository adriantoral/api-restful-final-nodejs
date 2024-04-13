const express = require("express")

const comercios_validators = require("../../validators/comercios")
const comercios_controllers = require("../../controllers/comercios")

const usuarios_middlewares = require("../../middlewares/usuarios")

const router = express.Router()

/*
* Rutas para los GET de los comercios.
* Puedes pasarle un parametro adicional para ordenar los resultados.
* Ejemplo: .../comercios?sortBy=nombre
* */
router.get("/", comercios_validators.listar_comercios, comercios_controllers.listar_comercios)
router.get("/:id", comercios_validators.get_id, comercios_controllers.listar_comercio)


/*
* Ruta para la creación de un comercio.
* Todos los campos son obligatorios.
* Si no envias un campo se te devolverá un error.
* */
router.post("/", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_administrador, comercios_validators.create_comercio, comercios_controllers.crear_comercio)

/*
* Rutas para la actualización de un comercio.
* El PUT necesita todos los campos.
* El PATCH solo necesita los campos que se quieran actualizar.
* Ambos usan el mismo controlador.
* */
router.put("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_administrador, comercios_validators.update_comercio, comercios_controllers.editar_comercio)
router.patch("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_administrador, comercios_validators.patch_comercio, comercios_controllers.editar_comercio)

/*
* Rutas para la eliminación de un comercio.
* Puedes pasarle un parametro adicional para hacer una eliminación lógica.
* Ejemplo: .../comercios/:id?logico=true
* Si no envias el parametro logico, se hará una eliminación física.
* */
router.delete("/:id", usuarios_middlewares.verificar_JWT, usuarios_middlewares.is_administrador, comercios_validators.delete_comercio, comercios_controllers.eliminar_comercio)

module.exports = router
