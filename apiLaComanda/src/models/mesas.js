let mongoose = require('mongoose')
mongoose.set('debug', true);let mesasSchema = new mongoose.Schema({
    nro_mesa: Number,
    cant_usos: Number,
    ventas: [{
        fecha: Date,
        importe: Number,
        mozo: String
    }]
})

module.exports = mongoose.model('Mesas', mesasSchema)