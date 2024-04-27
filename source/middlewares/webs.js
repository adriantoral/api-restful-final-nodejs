// Importing required modules
const multer = require('multer') // Multer for handling multipart/form-data, which is primarily used for uploading files
const fs = require("fs") // Node.js built-in file system module for interacting with the file system

/**
 * Configures multer for file upload.
 * Files are stored in diskStorage, allowing for full control on storing files to disk.
 * The destination and filename are determined by functions, giving you full control over the output.
 */
const upload_file = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            // Define the path where the file will be saved
            const path = "./files/" + req.JWT.id
            // If the directory does not exist, create it
            if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true})
            // Pass the path to the callback
            callback(null, path)
        },
        filename: function (req, file, callback) {
            // Define the filename as the current timestamp and the original file extension
            callback(null, Date.now() + "." + file.originalname.split(".").pop())
        }
    })
})

/**
 * Middleware function to inject the file path to the request body.
 * If there are files in the request, it adds each file's path to the request body.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const inject_file_path_to_body = (req, res, next) => {
    // If there are no files in the request, proceed to the next middleware
    if (!req.files)
        return next()

    // For each file in the request, add its path to the request body
    Object.keys(req.files).forEach(fichero => {
        req.body[fichero] = req.files[fichero][0].destination + "/" + req.files[fichero][0].filename
    })

    // Proceed to the next middleware
    next()
}

// Export the middleware functions for use in other modules
module.exports = {
    upload_file, inject_file_path_to_body
}