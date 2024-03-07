const mongoose = require('mongoose')

const connect = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    }, (err, res) => {
        if (!err) console.log("Conectado a la BD")
        else console.log("No se ha podido establecer la conexión a la BD")
    })
}

module.exports = connect
