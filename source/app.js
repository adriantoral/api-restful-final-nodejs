// Importing required modules
const express = require("express") // Express.js for building the server
const cors = require("cors") // CORS for handling Cross-Origin Resource Sharing

// Importing the MongoDB connection configuration
const mongodb_connect = require("./config/mongodb")

// Loading environment variables
require("dotenv").config()

// Establishing MongoDB connection
mongodb_connect()

// Creating an Express.js application
const app = express()

// Using CORS middleware for handling Cross-Origin Resource Sharing
app.use(cors())

// Using Express.js middleware for parsing JSON
app.use(express.json())

// Using the routes for version 1 of the API
app.use("/api/v1", require("./routes/v1"))

// Exporting the configured Express.js application
module.exports = app