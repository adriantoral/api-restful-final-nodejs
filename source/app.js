// Importing required modules
const express = require("express") // Express.js for building the server
const cors = require("cors") // CORS for handling Cross-Origin Resource Sharing
const ddos = require('ddos') // DDoS for preventing DDoS attacks
const helmet = require('helmet') // Helmet for setting various security headers
const statsd = require('express-statsd') // StatsD for sending metrics to the StatsD server

const swagger = require("swagger-ui-express") // Swagger UI for generating API documentation
const specs = require("./docs/swaggerjsdoc") // Swagger specifications for the API

// Importing the MongoDB connection configuration
const mongodb_connect = require("./config/mongodb") // MongoDB connection configuration

// Loading environment variables
require("dotenv").config() // Loading environment variables from a .env file

// Establishing MongoDB connection
mongodb_connect() // Establishing a connection to MongoDB

// Creating an Express.js application
const app = express() // Creating an instance of an Express.js application
const app_ddos = new ddos({burst: 10, limit: 15}) // Creating an instance of the DDoS middleware

// Using CORS middleware for handling Cross-Origin Resource Sharing
app.use(cors()) // Enabling CORS for all routes

// Using Express.js middleware for parsing JSON
app.use(express.json()) // Enabling JSON body parsing for all routes
app.use('/files', express.static('./files'))

// Using the DDoS middleware for preventing DDoS attacks
app.use(app_ddos.express) // Using the DDoS middleware

// Using the Helmet middleware for setting various security headers
app.use(helmet()) // Using the Helmet middleware

// Using the StatsD middleware for sending metrics to the StatsD server
app.use(statsd()) // Using the StatsD middleware

// Using the routes for version 1 of the API
app.use("/api/v1", require("./routes/v1")) // Using the routes defined in the ./routes/v1 directory
app.use("/api/v1/docs", swagger.serve, swagger.setup(specs)) // Setting up Swagger UI at the /api/v1/docs route

// Exporting the configured Express.js application
module.exports = app // Exporting the configured Express.js application for use in other modules