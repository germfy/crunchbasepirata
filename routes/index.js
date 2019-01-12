const express = require('express');
const router  = express.Router();
//const Empresa = require('../models/empresas')
const Books = require('../models/books')
const Author = require('../models/Author')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/libros', (req, res)=>{
  Books.find()
    .populate('author')
    .then(libros =>{
      res.render('books', {libros})
    })
    .catch(err =>{
      console.log(err)
    })
})
router.get('/libros/add',(req, res)=>{
  res.render('libro-nuevo')
})

router.post('/libros/add', (req, res)=>{
  const {title, author, description, rating} = req.body;
  const newBook = new Books({title, author, description, rating})
  newBook.save()
  .then(()=>{
    res.redirect(301, '/libros')
  })
  .catch(err=>console.log(err))
})
router.get('/libros/edit', (req, res)=>{
    Books.findOne({_id: req.query.book_id})
    .then((libro)=>{
      console.log(libro)
      res.render('edita-libro', {libro})
    })
    .catch(err=>{console.log(err)})
})

router.post('/libros/edit', (req, res)=>{
  const {title, author, description, rating} = req.body
  Books.updateOne({_id:req.query.book_id}, {$set: {title, author, description, rating}})
  .then(libro =>{
    res.redirect('/libros')
  })
  .catch(err=>console.log(err))
})

router.get('/libros/:id', (req, res)=>{
  let libroId = req.params.id
  console.log(libroId);
  Books.findOne({'_id': libroId})
  .populate('author')
  .then((libro)=>{
    res.render('book-detalle', { libro })
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.post('/buscar', (req, res)=>{
  let nombreLibro = req.body.titulo;
  Books.findOne({title: {$regex: nombreLibro, $options: 'i'}})
  .then((libro)=>{
    res.redirect(301, `/libros/${libro._id}`)
  })
  .catch(err=>{
    console.log(err);
  })
})

router.get('/autores/nuevo', (req, res)=>{
  res.render('author-add')
})

router.post('/autores/nuevo', (req, res)=>{
  const { name, lastname, nationality, birthday, pictureUrl } = req.body
  const newAuthor = new Author({name, lastname, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((autor)=>{
    res.redirect('/libros')
  })
  .catch(err=>console.log(err))

})
module.exports = router;
