var express = require('express');
var router = express.Router();
const PedidosEnVivoModel = require('../src/models/pedidoenvivo');
const PlatosModel = require('../src/models/platos');
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
  router.post('/pedidosparacuenta',PedidosParaCuenta);
  
  //------------------------ESTADO DE PEDIDOS----------------
  //authempleado
  router.post('/preparando',PreparandoPedido);
  //authempleadolinea sumar operacion
  router.post('/listoparaservir',ListoParaServir);
  //authempleadolinea sumar operacion
  router.post('/clientescomiendo',ClientesComiendo);
  //authadmin
  router.get('/statsplatos',TraerStatPlatos);
  //autheadmin
  router.post('/removerpedido',RemoverPedido);
  //autheuser
  router.post('/cancelarpedido',CancelarPedido);

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

  function SumarVendido(req,res,next){
    if (req.body) {
        PlatosModel.updateOne({"cod_plato": req.body.platos.cod_plato},
        {$inc: {"cant_ventas": req.body.platos.cantidad}})
        .then( doc=>{
          if (doc.nModified == 1) {
            res.status(200).send({isSucces: true, message: "Se actualizo correctamente."});
          } else {
            res.status(200).send({isSucces: false, message: "Error al actulizar el dato."});
          }
        })
        .catch(err=>{
          res.status(400).send({isSucces: false,message: "Error al procesar la solicitud."});
        })
    }
    else
      req.status(400).send({isSucces: false, message: "La solicitud esta vacia."})
  }

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

  //Trae todos los pedidos de X mesa.
  function PedidosParaCuenta(req,res,next){
    if (req.body.nro_mesa) {
      PedidosEnVivoModel.findOne({"nro_mesa": req.body.nro_mesa})
      .then( doc =>{
        if (doc.length != 0) {
          res.status(200).send(doc);
        }
        else{
          res.status(200).send({message: "No hay registros para mostrar"});
        }
      })
      .catch(err =>{
        res.status(400).send({message: "", error: err});
      })
    } else {
      res.status(400).send({message: "Empty nro_mesa"});
    }
  }

  function PreparandoPedido(req,res,next){
    PedidosEnVivoModel.updateOne({ "idPedido": req.body.idPedido, "pedidos.cod_plato": req.body.cod_plato},
     {//El $ refiere al elemento que macheo la cond. Si no updatearia varios registros.
      $set: { "pedidos.$.estado": 1}
    })
    .then( doc =>{
      if(doc.nModified == 1){
        console.log(doc);
        res.status(200).send({message: "El estado fue cambiado a 'En preparacion'"});
      }
      else{
        res.status(200).send({message: "Error al modificar"});
      }
    })
    .catch( err=>{
      res.status(400).send({message: err});
    })
  }

  function ListoParaServir(req,res,next){
    PedidosEnVivoModel.updateOne({ "idPedido": req.body.idPedido, "pedidos.cod_plato": req.body.cod_plato},
     {//El $ refiere al elemento que macheo la cond. Si no updatearia varios registros.
      $set: { "pedidos.$.estado": 2}
    })
    .then( doc =>{
      if(doc.nModified == 1){
        console.log(doc);
        res.status(200).send({message: "El estado fue cambiado a 'Listo para servir'"});
      }
      else{
        res.status(200).send({message: "Error al modificar"});
      }
    })
    .catch( err=>{
      res.status(400).send({message: err});
    })
  }

  function ClientesComiendo(req,res,next){
    PedidosEnVivoModel.updateOne({ "idPedido": req.body.idPedido, "pedidos.cod_plato": req.body.cod_plato},
     {//El $ refiere al elemento que macheo la cond. Si no updatearia varios registros.
      $set: { "pedidos.$.estado": 2}
    })
    .then( doc =>{
      if(doc.nModified == 3){
        console.log(doc);
        res.status(200).send({message: "El estado fue cambiado a listo para servir"});
      }
      else{
        res.status(200).send({message: "Error al modificar"});
      }
    })
    .catch( err=>{
      res.status(400).send({message: err});
    })
  }

  //De la tabla platos trae todo
  function TraerStatPlatos(req,res,next){
    PlatosModel.find().sort({"cod_plato": 1})
    .then(doc =>{
      if(doc.length != 0){
        res.status(200).send(doc);
      }
      else
        res.status(200).send({message: "Nada para mostrar"});
    })
    .catch(err =>{
      res.status(400).send({message:err});
    })
  }

  //elimina los pedidos luego de cerra operaciones. Se deberia eliminar el documento
  function RemoverPedido(req,res,next){
    PedidosEnVivoModel.deleteOne({"idPedido": req.body.idPedido})
    .then( doc =>{
      if (doc.deletedCount == 1) {
        res.status(200).send({message: "Se elimino el pedido con exito"});
      } else {
        res.status(200).send({message: "Error al eliminar"});
      }  
    })
    .catch(err=>{
      res.status(400).send({message:err});
    })
  }
  //Cancelar pedido por usuario segund id y cod_plato
  function CancelarPedido(req,res,next){
    PedidosEnVivoModel.updateOne({"idPedido": req.body.idPedido, "pedidos.cod_plato": req.body.cod_plato},
    {$unset: {"pedidos.$":""}})
    .then(doc =>{
      if (doc.nModified == 1) {
        res.status(200).send({message: "Se cancelo existosamente el pedido"});
        
      } else {
        res.status(200).send({message: "Error al modifcar pedido."});
      }
    })
    .catch(err =>{
      res.status(400).send({message: err});
    })
  }
  module.exports = router;