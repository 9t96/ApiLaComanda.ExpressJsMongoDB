let mongoose = require('mongoose')
mongoose.set('debug', true);let platosSchema = new mongoose.Schema({
   cod_plato: Number,
   cant_ventas: Number,
   veces_cancelado: Number,
   cant_timeout: Number,
   precio: Number
})

module.exports = mongoose.model('Plato', platosSchema)