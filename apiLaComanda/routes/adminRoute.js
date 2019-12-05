var express = require('express');
var router = express.Router();
const UsersModel = require('../src/models/usuarios');
const MesasModel = require('../src/models/mesas');
const MWAuth = require('./Middlewares/roleauthorizationMW');

router.post('/altaempleados', MWAuth.VerificarAdmin,AltaEmpleado);
router.get('/traerempleados', MWAuth.VerificarAdmin,TraerEmpleados);
router.post('/suspempleado', MWAuth.VerificarAdmin,SuspenderEmpleado);
router.post('/reincorporaremp', MWAuth.VerificarAdmin,ReincorporarEmpleado);
router.post('/eliminarempleado', MWAuth.VerificarAdmin,EliminarEmpleado);
router.get('/traerlogins', MWAuth.VerificarAdmin,TraerEntradaYSalida);
router.get('/totalxsector', MWAuth.VerificarAdmin,TotalXSector); 
router.get('/operacionesxempleado', MWAuth.VerificarAdmin,OperacionesXEmpleados);

function AltaEmpleado(req,res,next)
{
    if (req.body) {
        let empleado = new UsersModel({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            user: req.body.user,
            pass:req.body.pass,
            tipo_usuario: req.body.tipo_usuario,
            estado: req.body.estado,
            //cod_emp: req.body.cod_emp,
            rol:req.body.rol,
            seguimiento:[]
        })

        empleado.save()
        .then(doc => {
            res.status(200).send({isSuccess:true, message: "Se agrego el usuario con exito."});
        })
        .catch(err=>{
            res.status(204).send({message:err});        
        })
    }
    else{
        res.status(200).send({isSuccess: false, message: "Debe proporcionar un usario"});
    }
}

function TraerEmpleados(req,res,next)
{
    UsersModel.find()
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err =>{
        res.send(204).send({isSuccess:false,message:err});
    })
}

function SuspenderEmpleado(req,res,next)
{
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:2}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({isSuccess:true, message:"Se suspendio al usuario con exito."});
            }
        })
        .catch(err=>{
            res.send(204).send({isSuccess:false, message:"Ha ocurrio un error", error: err});
        })
    }
}

function ReincorporarEmpleado(req,res,next)
{
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:1}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({isSuccess: true,message:"Se reincorporo el empleado."});
            }
        })
        .catch(err=>{
            res.status(204).send({isSuccess: false, message:"Ha ocurrido un error", error: err});
        })
    }
    else{
        res.status(400).send({isSuccess:false, message: "No pudo procesar la solicutd"});
    }
}

function EliminarEmpleado(req,res,next){
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:3}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({isSuccess:true,message:"Se elimino el empleado con exito."});
            }
        })
        .catch(err=>{
            res.status(204).send({isSuccess:false,message:err});
        })
    }
    else{
        res.status(200).send({isSuccess: false, message:"No se pudo procesar la solicitud"});
    }
}

function TraerEntradaYSalida(req,res,next)
{
    UsersModel.find({},'cod_emp nombre apellido usuario rol seguimiento.ingreso seguimiento.salida seguimiento.operaciones')
    .then(doc => {
        if (doc.length !== 0) {
            res.status(200).send(doc);
        }
        else    
            res.status(200).send({isSuccess:true,message:"Nada para mostrar"});
    })
    .catch(err =>{
        res.status(204).send({isSuccess:false,message:err});
    })
}

function TotalXSector(req,res,next)
{
    UsersModel.aggregate([{$match:{rol:{$gte:4}}},{$unwind:"$seguimiento"},{$group:{
        _id: "$rol",
        operaciones: {$sum:"$seguimiento.operaciones"}
    }}])
    .then( doc =>{
        if(doc.length !== 0)
            res.status(200).send(doc);
        else
            res.status(200).send({isSuccess: true,message:"nada para mostrar"})
    })
    .catch(err => {
        res.status(204).send({isSuccess:false,message:err});
    })
}

function OperacionesXEmpleados(req,res,next)
{
    UsersModel.aggregate([{$match: {estado:1}},{$project:{
        cod_emp: 1,
        nombre: 1,
        apellido: 1,
        rol: 1,
        operaciones: {$sum:"$seguimiento.operaciones"}     
    }}])
    .then(doc=>{
        console.log(doc);
        if (doc.length !== 0) {
            res.status(200).send(doc);
        } else {
            res.status(200).send({isSuccess: true, message: "Nada para mostrar"});
        }
    })
    .catch(err=>{
        res.status(204).send({isSuccess:false,message:err});
    })
}
module.exports = router;