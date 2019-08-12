let mongoose = require('mongoose')
mongoose.set('debug', true);let mesasliveSchema = new mongoose.Schema({
    nro_mesa: Number,
    estado: Number
})

module.exports = mongoose.model('MesasLive', mesasliveSchema,'mesaslive')