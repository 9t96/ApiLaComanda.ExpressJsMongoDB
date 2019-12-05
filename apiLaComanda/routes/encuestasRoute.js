var express = require('express');
var router = express.Router();
const EncuestaModel = require('../src/models/encuestas');
const EncuestaFuturasModel = require('../src/models/encuestasfuturas');

router.post('/altaencuesta',AltaEncuesta);
router.post('/encuestapendiente',AltaEncuestaPendiente);
router.get('/buscarencuestapendiente',BuscarEncuestaPendiente);
router.get('/traerbuenoscomentarios',TraerBuenosCometarios);
router.get('/traermaloscomentarios', TraerMalosComentarios);

function AltaEncuesta(req,res,next)
{
  if (req.body) {
    let encuesta = new EncuestaModel({
      mozo_score: req.body.mozo_score,
      mesa_score: req.body.mesa,
      resto_score: req.body.resto,
      comida_score: req.body.comida,
      opinion: req.body.texto,
      cod_user: req.body.usuario,
      nro_mesa: req.body.nro_mesa
    })
  
    encuesta.save()
    .then(doc => {
      res.status(200).send({isSucess: true, message: "Encuesta guardada con exito."});
    })
    .catch(err =>{
      res.status(204).send({isSucess: false,message:err});
    })
  }
  else{
    res.status(400).send({isSuccess: false,message:"Nada para guardar."})
  }
  
}

  function AltaEncuestaPendiente(req,res,next)
  {
    if (req.body) {
      let nuevaEncuesta = new EncuestaFuturasModel({
        cod_user: req.body.usuario,
        mesa: req.body.mesa
      })
  
      nuevaEncuesta.save()
      .then(doc =>{
        res.status(200).send({isSuccess: true, message: "Se guardo la encuesta con exito."});
      })
      .catch(err =>{
        res.status(204).send({isSuccess: false,message:err});
      })
    } else {
      res.send(400).send()
    }
  }

  function BuscarEncuestaPendiente(res,res,next)
  {
    if (req.body.cod_user) {
      EncuestaFuturasModel.findOne({cod_user:req.body.cod_user})
      .then(record => {
        if (record.length !== 0) {
          res.status(200).send(record);  
        }
        else
          res.status(204).send({isSuccess: false,message:"Nada para mostrar"});
      })
      .catch(err => {
        res.status(204).send({isSuccess: false,message:err});
      })
    }
  }


  function TraerBuenosCometarios(req,res,next)
  {
    EncuestaModel.aggregate([
  {$project:{
    opinion: 1,
    cod_user: 1, 
    mozoScore:1,
    mesaScore:1,
    comidaScore:1,
    restoScore:1, //Trae todas las columnas y devuelve los que tengan promedio mayor a 7 y que matcheen la condicion.
    promedio:{$gte:[{$avg:["$mozoScore","$mesaScore","$restoScore","$comidaScore"]},7]}
  }},{$match:{ promedio:true}}])
    .then(doc=>{
      if (doc.length !== 0) {
        res.status(200).send(doc);
      }
      else
        res.status(204).send({isSuccess:true,message:"nada para mostrar"});
    })
    .catch(err => {
      res.status(404).send({isSuccess:false,error: err});
    })
  }

  function TraerMalosComentarios(req,res,next)
  {
    EncuestaModel.aggregate([
      {$project:{
        opinion: 1,
        cod_user: 1, 
        mozoScore:1,
        mesaScore:1,
        comidaScore:1,
        restoScore:1, 
        promedio:{$lte:[{$avg:["$mozoScore","$mesaScore","$restoScore","$comidaScore"]},5]}
      }},{$match:{ promedio:true}}])
        .then(doc=>{
          if (doc.length !== 0) {
            res.status(200).send(doc);
          }
          else
            res.status(204).send({isSuccess: true,message:"Nada para mostrar"});
        })
        .catch(err => {
          res.status(404).send({isSuccess: false,message:err});
        })
  }
  module.exports = router;