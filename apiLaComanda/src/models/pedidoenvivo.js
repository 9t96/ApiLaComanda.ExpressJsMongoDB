let mongoose = require('mongoose')
mongoose.set('debug', true);let pedidosenvivoSchema = new mongoose.Schema({
    nro_mesa: Number,
    mozo: Number,
    idPedido: String,
    cliente: String,
    comensales: Number,
    total: Number,
    demora: Number,
    pedidos: [
        {
            cod_plato: Number,
            cantidad: Number,
            estado: Number,
            demora: Number
        }
    ]
})

module.exports = mongoose.model('PedidoEnVivo', pedidosenvivoSchema)