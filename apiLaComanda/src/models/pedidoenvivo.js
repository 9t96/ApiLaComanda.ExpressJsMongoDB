let mongoose = require('mongoose')
mongoose.set('debug', true);let pedidosenvivoSchema = new mongoose.Schema({
    nro_mesa: Number,
    mozo: Number,
    hora_pedido: Date.now(),
    estado: Number,
    id: Number,
    cliente: String,
    comensales: Number,
    total: Number,
    demora: Number,
    pedidos: [
        {
            cod_plato: Number,
            cantidad: Number
        }
    ]
})

module.exports = mongoose.model('PedidoEnVivo', pedidosenvivoSchema)