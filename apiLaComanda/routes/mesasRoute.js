var express = require('express');
var router = express.Router();
const MesasModel = require('../src/models/mesas');
const MesasLiveModel = require('../src/models/mesaslive');
const RolesMW = require('./Middlewares/roleauthorizationMW');
var jwt = require('jsonwebtoken');
//
router.get('/traermesaslive',RolesMW.VerificarEmpleado,TraerMesasLive);
router.get('/traermesasdisponibles', RolesMW.VerificarMozo,TraerMesasDisponibles);
router.get('/mesawating',RolesMW.VerificarMozo,MesaEsperando); 
router.get('/mesacomiendo',RolesMW.VerificarEmpleado,MesaComiendo);
router.get('/mesapagando',RolesMW.VerificarEmpleado,MesaPagando);
router.get('/mesacerrada',RolesMW.VerificarEmpleado,MesaCerrada);
router.get('/nuevostatmesacerrada',RolesMW.VerificarEmpleado,NuevoStatMesaCerrada);
router.get('/statsmesas',StatsMesa);
router.get('/totalfacturadoxmesa',TotalFacturadoMesa);
router.get('/max&minfacturas',MaxMinFacturas);
  //UNICO FALTANTE
  /* router.get('/totalmensual',TotalMensual); */



  function TraerMesasLive(req,res,next)
  {
    MesasLiveModel.find()
    .then(records => {
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(204).send({message:err});
    })
  }

  function TraerMesasDisponibles(req,res,next){
    MesasLiveModel.find({estado:4})
    .then(records => {
      res.status(200).send(records);
    })
    .catch(err => {
      res.status(204).send({message:err});
    })
  }

  function MesaEsperando(req,res,next)
  {
    if (req.body) {   
      MesasLiveModel.findOneAndUpdate({nro_mesa:req.body.nro_mesa},{$set:{estado:1}})
      .then(doc => {
        if(doc.nModified == 1)
        {
          res.status(200).send({message:"ok"});
        }
      })
      .catch(err => {
        res.status(204).send({message:err});
      })
    }
    else
      res.status(404).send({message:"No se encontro el body."})
  }

  function MesaComiendo(req,res,next)
  {
    if (req.body) {   
      MesasLiveModel.findOneAndUpdate({nro_mesa:req.body.nro_mesa},{$set:{estado:2}})
      .then(doc => {
        if(doc.nModified == 1)
        {
          res.status(200).send({message:"ok"});
        }
      })
      .catch(err => {
        res.status(204).send({message:err});
      })
    }
    else
      res.status(404).send({message:"No se encontro el body."})
  }

  function MesaPagando(req,res,next)
  {
    if (req.body) {   
      MesasLiveModel.findOneAndUpdate({nro_mesa:req.body.nro_mesa},{$set:{estado:3}})
      .then(doc => {
        if(doc.nModified == 1)
        {
          res.status(200).send({message:"ok"});
        }
      })
      .catch(err => {
        res.status(204).send({message:err});
      })
    }
    else
      res.status(404).send({message:"No se encontro el body."})
  }

  function MesaCerrada(req,res,next)
  {
    if (req.body) {   
      MesasLiveModel.findOneAndUpdate({nro_mesa:req.body.nro_mesa},{$set:{estado:4}})
      .then(doc => {
        if(doc.nModified == 1)
        {
          res.status(200).send({message:"ok"});
        }
      })
      .catch(err => {
        res.status(204).send({message:err});
      })
    }
    else
      res.status(404).send({message:"No se encontro el body."})
  }

  function NuevoStatMesaCerrada(req,res,next)
  {
    if(req.body)
    {
      let venta = {fecha:req.body.nro_mesa,importe_total:req.body.total,mozo: req.body.mozo}
      MesasModel.updateOne({nro_mesa: req.body.nro_mesa},{$push:{ventas: venta}})
      .then(doc=>{
        if(doc.nModified)
        {
          res.status(200).send({message:"ok"});
        }
        else  
          res.status(200).send({message:"Error al modificar."})
      })
      .catch(err =>{
        res.status(204).send({message:err});
      })
    }
  }

  function StatsMesa(req,res,next)
  {
    MesasModel.aggregate([{$project:{
      nro_mesa: 1,
      cant_usos: 1
    }}])
    .then(doc =>{
      if (doc.length !== 0) {
        res.status(200).send(doc);
      }
      else  
        res.status(204).send({message:"nada para mostrar"});
    })
    .catch(err =>{
      res.status(404).send({message:err}); 
    })
  }

  function TotalFacturadoMesa(req,res,next){
    MesasModel.aggregate([{$unwind:"$ventas"},{$group:{
      _id: "$nro_mesa",
      totalFacturado:{$sum:"$ventas.importe"}
    }}])
    .then(doc => {
      if(doc.length !== 0)
        res.status(200).send(doc);
        else
          res.status(204).send({message:"nada para mostrar"});
    })
    .catch(err =>{
      res.status(404).send({message:err});
    })
  }

  function MaxMinFacturas(req,res,next){
    MesasModel.aggregate([
    {$project:{
      _id: 0,
      nro_mesa: 1,
      max: {$max:"$ventas.importe"},
      min: {$min:"$ventas.importe"}
    }}])
    .then(doc =>{
      if(doc.length !== 0)
        res.status(200).send(doc);
        else
          res.status(204).send({message:"nada para mostrar"});
    })
    .catch(err =>{
      res.status(404).send({message:err});
    })
  }

  function TotalMensual(req,res,next){

  }

  module.exports = router;

