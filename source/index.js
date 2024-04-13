const app = require("./app")

/**
 * The port on which the server will listen.
 * @type {string}
 */
const port = process.env.PORT

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console once the server is ready.
 */
app.listen(port, () => console.log("Servidor escuchando en el puerto " + port))