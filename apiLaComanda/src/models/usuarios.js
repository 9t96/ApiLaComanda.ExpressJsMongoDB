let mongoose = require('mongoose')
mongoose.set('debug', true);let usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    user: String,
    pass: String,
    tipo_usuario: Number,
    estado: Number,
    cod_emp: Number,
    rol: Number,
    seguimiento: [{
        ingreso: Date,
        salida: Date,
        operaciones: Number,
        cod_emp: Number
    }]
})

module.exports = mongoose.model('Usuario', usuarioSchema)