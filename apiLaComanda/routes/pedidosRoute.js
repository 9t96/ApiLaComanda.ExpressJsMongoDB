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
  router.get('/traerpedidosxid',TraerPedidosPorID);
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
        platos.push(element);
      });
      const newPedidosModel = new PedidosEnVivoModel({
        nro_mesa: req.body.mesa,
        mozo: req.body.mozo,
        comensales: req.body.comensales,
        cliente: req.body.cliente,
        pedidos: platos,
        total: req.body.total 
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

  function TraerPedidosCerveza(req,res,next){}

  function TraerPedidosBarra(req,res,next){}

  function TraerPedidosCocina(req,res,next){}

  function TraerPedidosPostre(req,res,next){}

  function TraerPedidosPorID(req,res,next){}

  function PedidosParaCuenta(req,res,next){}

  function PreparandoPedido(req,res,next){}

  function ListoParaServir(req,res,next){}

  function ClientesComiendo(req,res,next){}

  function TraerStatPlatos(req,res,next){}

  function RemoverPedido(req,res,next){}

  function CancelarPedido(req,res,next){}
  module.exports = router;