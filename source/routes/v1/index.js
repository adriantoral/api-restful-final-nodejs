const express = require("express")
const fs = require("fs")

const router = express.Router()

/**
 * This script registers all routes from files in the current directory and exports them.
 * It uses the Express Router to manage the routes.
 * It reads the current directory and filters out the 'index' file.
 * For each other file, it adds a route to the router using the file name as the route and requiring the file as the route handler.
 *
 * @module router
 */

// Get all routes from files in the current directory and add them to the router
fs.readdirSync(__dirname).filter((file) => {
    /**
     * The name of the file, without the extension.
     * @type {string}
     */
    const name = file.split('.').shift()

    // Exclude the index file
    if (name !== 'index') {
        /**
         * Add a route to the router.
         * The route is the name of the file.
         * The route handler is required from the file.
         */
        router.use("/" + name, require("./" + name))
    }
})

module.exports = router