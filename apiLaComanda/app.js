var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var DataAcces = require('./src/DataAcces');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/adminRoute');
var mesasRouter = require('./routes/mesasRoute');
var encuestasRouter = require('./routes/encuestasRoute');
var pedidosRouter = require('./routes/pedidosRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, UPDATE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization");
    next();
});

app.use('/', indexRouter);
app.use('/publico', usersRouter);
app.use('/admin', adminRouter);
app.use('/mesas',mesasRouter);
app.use('/encuestas',encuestasRouter);
app.use('/pedidos',pedidosRouter);



module.exports = app;
