const express = require("express")

const comercios_validators = require("../../validators/comercios")
const comercios_controllers = require("../../controllers/comercios")

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
router.post("/", comercios_validators.create_comercio, comercios_controllers.crear_comercio)

/*
* Rutas para la actualización de un comercio.
* He tratado el PUT como si fuese un PATCH para mayor flexibilidad en las peticiones.
* Algunos campos como no son necesarios para actualizar, los he marcado como opcionales y seran ignorados sino se envian.
* */
router.put("/:id", comercios_validators.update_comercio, comercios_controllers.editar_comercio)
router.patch("/:id", comercios_validators.patch_comercio, comercios_controllers.editar_comercio)

/*
* Rutas para la eliminación de un comercio.
* Puedes pasarle un parametro adicional para hacer una eliminación lógica.
* Ejemplo: .../comercios/:id?logico=true
* Si no envias el parametro logico, se hará una eliminación física.
* */
router.delete("/:id", comercios_validators.delete_comercio, comercios_controllers.eliminar_comercio)

module.exports = router
