let mongoose = require('mongoose')
mongoose.set('debug', true);let encuestasfuturasSchema = new mongoose.Schema({
    cod_user:Number,
    mesa:Number
})

module.exports = mongoose.model('EncuFuturas', encuestasfuturasSchema)