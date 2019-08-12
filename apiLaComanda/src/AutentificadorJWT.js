var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config();

var payload = {
    iat: Date.now(),
    aud: null,
    data: null,
    app: "MDB API COMANDA"
}

exports.CrearToken = (payloadData)=>{
    payload.data = payloadData;
    console.log(payload);
    return jwt.sign(payload,process.env.SECRET_KEY);
}