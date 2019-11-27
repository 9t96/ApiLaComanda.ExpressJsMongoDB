var express = require('express');
var router = express.Router();
const PedidosEnVivoModel = require('../src/models/pedidoenvivo');
const RolesMW = require('./Middlewares/roleauthorizationMW');
//------------------------AGREGAR PEDIDOS----------------
//mwmesaabrirmesa y authmozo
router.post('/nuevopedido',NuevoPedido);
  //authmozoo
router.post('/sumarvendido',SumarVendido);
  
  //------------------------GET PEDIDOS----------------
  //authempleado
  router.get('/traerpedidos',TraerPedidos);
  //authempleadolinea
  router.get('/traerpedidoscerveza',TraerPedidosCerveza);
  //authempleadolinea
  router.get('/traerpedidosbartender',TraerPedidosBarra);
  //authempleadolinea
  router.get('/traerpedidoscocina',TraerPedidosCocina);
  //authempleadolinea
  router.get('/traerpedidospostre',TraerPedidosPostre);
  //authuser
  router.post('/traerpedidosxid',TraerPedidosPorID);
  //authadmin
  router.get('/pedidosparacuenta',PedidosParaCuenta);
  
  //------------------------ESTADO DE PEDIDOS----------------
  //authempleado
  router.get('/preparando',PreparandoPedido);
  //authempleadolinea sumar operacion
  router.get('/listoparaservir',ListoParaServir);
  //authempleadolinea sumar operacion
  router.get('/clientescomiendo',ClientesComiendo);
  //authadmin
  router.get('/statsplatos',TraerStatPlatos);
  //autheadmin
  router.get('/removerpedido',RemoverPedido);
  //autheuser
  router.get('/cancelarpedido',CancelarPedido);

  function NuevoPedido(req,res,next){
    if(req.body){
      console.log(req.body);
      var platos  = [];
      req.body.platos.forEach(element => {
        element.estado = 0;
        element.demora = 0;
        platos.push(element);
      });
      const newPedidosModel = new PedidosEnVivoModel({
        nro_mesa: req.body.mesa,
        mozo: req.body.mozo,
        comensales: req.body.comensales,
        cliente: req.body.cliente,
        pedidos: platos,
        total: req.body.total,
        idPedido: req.body.idPedido
      })

      newPedidosModel.save()
      .then( doc => {
        res.status(200).send(doc);
      })
      .catch(err =>{
        res.status(200).send({message:err});
      })
    }
    else{
      res.status(404).send({message: "Empty request"});
    }
  }

  function SumarVendido(req,res,next){}

  function TraerPedidos(req,res,next){
    PedidosEnVivoModel.find()
    .then(doc =>{
      if(doc.length != 0){
        res.status(200).send(doc);
      }
      else{
        res.status(200).send({message:"Nada para mostrar"})
      }
    })
    .catch(err =>{
      res.status(400).send({message: err});
    })
  }

  function TraerPedidosCerveza(req,res,next){
    PedidosEnVivoModel.aggregate([{$match: {"pedidos.cod_plato": { $gte: 100, $lte: 103 }}},
    {$unwind: "$pedidos"},
    {$project: {
       "idPedido": 1,
       "nro_mesa": 1,
       "cliente": 1,
       "pedidos.cod_plato": 1,
       "pedidos.cantidad": 1,
       "pedidos.estado": 1
    }
    }])
    .then( doc =>{
      if (doc.length != 0 ) {
        console.log(doc);
        res.status(200).send(doc);
      } else {
        res.status(200).send({message:"Nada para mostrar"});
      }
    })
    .catch( err=>{
      console.log(err)
      res.status(400).send({message: err});
    })
  }

  function TraerPedidosBarra(req,res,next){
    PedidosEnVivoModel.aggregate([{$match: {"pedidos.cod_plato": { $gte: 200, $lte: 205 }}},
    {$unwind: "$pedidos"},
    {$project: {
       "idPedido": 1,
       "nro_mesa": 1,
       "cliente": 1,
       "pedidos.cod_plato": 1,
       "pedidos.cantidad": 1,
       "pedidos.estado": 1
    }
    }])
    .then( doc =>{
      if (doc.length != 0 ) {
        console.log(doc);
        res.status(200).send(doc);
      } else {
        res.status(200).send({message:"Nada para mostrar"});
      }
    })
    .catch( err=>{
      console.log(err)
      res.status(400).send({message: err});
    })
  }

  function TraerPedidosCocina(req,res,next){
    PedidosEnVivoModel.aggregate([{$match: {"pedidos.cod_plato": { $gte: 205, $lte: 305 }}},
    {$unwind: "$pedidos"},
    {$project: {
       "idPedido": 1,
       "nro_mesa": 1,
       "cliente": 1,
       "pedidos.cod_plato": 1,
       "pedidos.cantidad": 1,
       "pedidos.estado": 1
    }
    }])
    .then( doc =>{
      if (doc.length != 0 ) {
        console.log(doc);
        res.status(200).send(doc);
      } else {
        res.status(200).send({message:"Nada para mostrar"});
      }
    })
    .catch( err=>{
      console.log(err)
      res.status(400).send({message: err});
    })
  }

  function TraerPedidosPostre(req,res,next){
    PedidosEnVivoModel.aggregate([{$match: {"pedidos.cod_plato": { $gte: 400, $lte: 404 }}},
    {$unwind: "$pedidos"},
    {$project: {
       "idPedido": 1,
       "nro_mesa": 1,
       "cliente": 1,
       "pedidos.cod_plato": 1,
       "pedidos.cantidad": 1,
       "pedidos.estado": 1
    }
    }])
    .then( doc =>{
      if (doc.length != 0 ) {
        console.log(doc);
        res.status(200).send(doc);
      } else {
        res.status(200).send({message:"Nada para mostrar"});
      }
    })
    .catch( err=>{
      console.log(err)
      res.status(400).send({message: err});
    })
  }

  function TraerPedidosPorID(req,res,next){
    if (req.body.idPedido) {
      PedidosEnVivoModel.aggregate( [{ $match: {"idPedido":{$eq: req.body.idPedido}}},
      {$project: {
        "nro_mesa":1,
        "cliente": 1,
        "idPedido": 1,
        "pedidos": 1
      }}])
      .then( doc =>{
        if (doc.length != 0) {
          res.status(200).send(doc);
        }
      })
      .catch( err=>{
        res.status(400).send({message: err});
      })  
    } else {
      res.status(200).send({message: "Debe proporcionar un id de pedido."})
    }
    
  }

  function PedidosParaCuenta(req,res,next){}

  function PreparandoPedido(req,res,next){}

  function ListoParaServir(req,res,next){}

  function ClientesComiendo(req,res,next){}

  function TraerStatPlatos(req,res,next){}

  function RemoverPedido(req,res,next){}

  function CancelarPedido(req,res,next){}
  module.exports = router;