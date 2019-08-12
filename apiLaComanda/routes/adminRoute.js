var express = require('express');
var router = express.Router();
const UsersModel = require('../src/models/usuarios');
const MesasModel = require('../src/models/mesas');

router.post('/altaempleados',AltaEmpleado);
router.get('/traerempleados',TraerEmpleados);
router.post('/suspempleado',SuspenderEmpleado);
router.post('/reincorporaremp',ReincorporarEmpleado);
router.post('/eliminarempleado',EliminarEmpleado);
router.get('/traerlogins',TraerEntradaYSalida);
router.get('/totalxsector',TotalXSector); 
router.get('/operacionesxempleado',OperacionesXEmpleados);

function AltaEmpleado(req,res,next)
{
    if (req.body) {
        let empleado = new UsersModel({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            user: req.body.user,
            pass:req.body.pass,
            tipo_usuario: req.body.tipo,
            estado: req.body.estado,
            //cod_emp: req.body.cod_emp,
            rol:req.body.rol,
            seguimiento:[]
        })

        empleado.save()
        .then(doc => {
            res.status(200).send();
        })
        .catch(err=>{
            res.status(204).send({message:err});        
        })
    }
}

function TraerEmpleados(req,res,next)
{
    UsersModel.find()
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err =>{
        res.send(204).send({message:err});
    })
}

function SuspenderEmpleado(req,res,next)
{
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:2}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({message:"succesfull"});
            }
        })
        .catch(err=>{
            res.send(204).send({message:err});
        })
    }
}

function ReincorporarEmpleado(req,res,next)
{
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:1}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({message:"succesfull"});
            }
        })
        .catch(err=>{
            res.send(204).send({message:err});
        })
    }
}

function EliminarEmpleado(req,res,next){
    if (req.body) {
        UsersModel.update({cod_emp:req.body.cod_emp}, {$set:{estado:3}})
        .then(doc =>{
            if (doc.nModified == 1) {
                res.status(200).send({message:"succesfull"});
            }
        })
        .catch(err=>{
            res.send(204).send({message:err});
        })
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
            res.status(200).send({message:"no hay registros"});
    })
    .catch(err =>{
        res.status(204).send({message:err});
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
            res.status(200).send({message:"nada para mostrar"})
    })
    .catch(err => {
        res.status(204).send({message:err});
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
        res.status(200).send(doc);
    })
    .catch(err=>{
        res.status(204).send({message:err});
    })
}
module.exports = router;