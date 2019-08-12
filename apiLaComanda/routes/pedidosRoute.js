var express = require('express');
var router = express.Router();
const PedidosModel = require('../src/models/pedidoenvivo')
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

  function NuevoPedido(req,res,next){}

  function SumarVendido(req,res,next){}

  function TraerPedidos(req,res,next){}

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