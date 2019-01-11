const express = require('express');
const router  = express.Router();
const Empresa = require('../models/empresas')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/empresas', (req, res)=>{
  Empresa.find()
    .then(empresas =>{
      res.render('empresas', {empresas})
    })
    .catch(err =>{
      console.log(err)
    })
})

router.get('/empresas/:id', (req, res)=>{
  let empresaId = req.params.id
  console.log(empresaId);
  Empresa.findOne({'_id': empresaId})
  .then((empresa)=>{
    res.render('empresa-detalle', { empresa })
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.post('/buscar', (req, res)=>{
  let nombreEmpresa = req.body.empresa;
  Empresa.findOne({name: {$regex: nombreEmpresa, $options: 'i'}})
  .then((empresa)=>{
    res.redirect(301, `/empresas/${empresa._id}`)
  })
  .catch(err=>{
    console.log(err);
  })
})
module.exports = router;
