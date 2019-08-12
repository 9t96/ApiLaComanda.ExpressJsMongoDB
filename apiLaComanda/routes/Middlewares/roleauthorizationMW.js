const jwt = require('jsonwebtoken');


exports.JWT = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        let payload = jwt.verify(token,process.env.SECRET_KEY);
        if (payload) {
          next();
        }
        else{
          res.status(200).send({message: 'Token invalido'});
        }
    } catch (error) {
          res.status(404).send({message: 'error jwt middleware'});
    }
}

exports.VerificarEmpleado = (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token,process.env.SECRET_KEY);
    if (payload) {
      switch (payload.data.rol) {
        case 2:
         next(); 
          break;
        case 3:
          next();
          break;
        default:
          res.status(200).send({message:"Solo empleados."})
          break;
      }
    }
    else{
      res.status(200).send({message: 'Token invalido'});
    }
  } catch (error) {
        res.status(404).send({message: 'error jwt middleware'});
  }

}
exports.VerificarAdmin = (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token,process.env.SECRET_KEY);
    if (payload) {
      switch (payload.data.rol) {
        case 3:
          next();
          break;
        default:
          res.status(200).send({message:"Solo admin."})
          break;
      }
    }
    else{
      res.status(200).send({message: 'Token invalido'});
    }
  } catch (error) {
        res.status(404).send({message: 'error jwt middleware'});
  }
}
exports.VerificarEmpleadoLinea = (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token,process.env.SECRET_KEY);
    if (payload) {
      switch (payload.data.rol) {
        case 5:
         next(); 
          break;
        case 6:
          next();
          break;
        case 7:
          next();
          break;
        case 8:
          next();
          break;
        default:
          res.status(200).send({message:"Solo empleados de linea."})
          break;
      }
    }
    else{
      res.status(200).send({message: 'Token invalido'});
    }
  } catch (error) {
        res.status(404).send({message: 'error jwt middleware'});
  }
}
exports.VerificarUsuario = (req,res,next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token,process.env.SECRET_KEY);
    if (payload) {
      switch (payload.data.rol) {
        case 1:
          next();
          break;
        default:
          res.status(200).send({message:"Solo usuarios."})
          break;
      }
    }
    else{
      res.status(200).send({message: 'Token invalido'});
    }
  } catch (error) {
        res.status(404).send({message: 'error jwt middleware'});
  }
}
exports.VerificarMozo = (req,res,next) =>{ 
  try {
    const token = req.headers.authorization.split(" ")[1];
    let payload = jwt.verify(token,process.env.SECRET_KEY);
    if (payload) {
      switch (payload.data.rol) {
        case 4:
          next();
          break;
        default:
          res.status(200).send({message:"Solo admin."})
          break;
      }
    }
    else{
      res.status(200).send({message: 'Token invalido'});
    }
  } catch (error) {
        res.status(404).send({message: 'error jwt middleware'});
  }
}