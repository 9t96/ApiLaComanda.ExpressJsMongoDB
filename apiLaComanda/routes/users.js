var express = require('express');
var router = express.Router();
const UsersModel = require('../src/models/usuarios');
var jwt = require('../src/AutentificadorJWT');




/* GET users listing. */
router.post('/logear',Logear);
router.post('/registro',NuevoUsuario);
router.post('/seguimiento',SeguirUsuario);
router.post('/cerrarseguimiento',CerrarSeguimiento);

function Logear(req,res,next){
  console.log(req.body.user + req.body.pass);
  if (req.body.user && req.body.pass) {
    UsersModel.findOne({user: req.body.user,pass: req.body.pass})
    .then(doc =>{
      console.log(doc);
      if(doc.length !== 0)
      {
        if (doc.estado == 1) {
          let payloadData = {
            cod_emp: doc.cod_emp,
            tipo_usuario: doc.tipo_usuario,
            estado: doc.estado,
            rol: doc.rol,
            nombre: doc.nombre,
            apellido: doc.apellido,
            user: doc.user
          }

          let token = jwt.CrearToken(payloadData);
          let datita = {token: token};
          console.log(token);
          res.status(200).send(datita);
        }
        else
          res.status(200).send({message:'User banned', error:"banned"});
      }
      else
        res.status(200).send({message:'Invalid pass or user.', error:"wrong credentials"});   
    })
    .catch(err=>{
      res.status(400).send({message:err});
    })
  } 
  else{
    res.status(404).send({message:"No credentials was found on the request", error:"empty credentials"})
  }
}

function NuevoUsuario(req,res,next){
  let user = new UsersModel({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    user: req.body.user,
    pass:req.body.pass,
    tipo_usuario: req.body.tipo,
    estado: req.body.estado,
    cod_emp: req.body.cod_emp,
    rol:req.body.rol,
    seguimiento:[{
      ingreso:Date.now(),
      salida:null,
      operaciones: 0
    }]
  })
  user.save().then( doc => {
    res.status(200).send(doc);
  })
  .catch(err =>{
    res.status(200).send({message:err});
  })
}

function SeguirUsuario(req,res,next){
  let thismoment = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let data = {ingreso: thismoment,salida:null,operaciones: 110, cod_emp:20};
  UsersModel.update({user: 'admin'},{$push: {seguimiento: data}})
  .then( doc => {
    console.log(doc)
    if (doc.nModified == 1) {
      res.status(200).send(thismoment);
    }
    res.status(200).send({message:"no se puedo iniciar el seguimiento."})
  })
  .catch(err => {
    res.status(200).send({message:err}); 
  })  
  
}



function CerrarSeguimiento(req,res,next){
  if (req.body) {
    let horasalida = new Date().toISOString().slice(0, 19).replace('T', ' ');
    UsersModel.updateOne({"seguimiento.entrada":req.body.horaentrada},{$set:{"seguimiento.$.salida":  horasalida}})
    .then( doc => {
      console.log(doc);
      if (doc.nModified == 1) {
        res.status(200).send(doc);
      }
      res.status(200).send({message:"no se puedo cerrar el seguimiento."})
    })
    .catch(err => {
      res.status(200).send({message:err}); 
    }) 
  }
}

module.exports = router;
