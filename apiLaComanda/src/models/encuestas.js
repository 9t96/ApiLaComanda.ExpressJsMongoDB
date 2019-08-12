let mongoose = require('mongoose')
mongoose.set('debug', true);let encuestasSchema = new mongoose.Schema({
    mozoScore: Number,
    mesaScore: Number,
    restoScore: Number,
    comidaScore: Number,
    opinion: String,
    cod_user: Number,
    nro_mesa: Number

})

module.exports = mongoose.model('Encuesta', encuestasSchema)