const express = require("express")
const cors = require("cors")
const mongodb_connect = require("./config/mongodb")

require("dotenv").config();
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", require("./routes/v1"))

const port = process.env.PORT
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
    mongodb_connect();
})
