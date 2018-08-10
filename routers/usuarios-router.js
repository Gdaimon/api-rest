const usuariosRouter = require('express').Router();
const usuarios = require('../api/data/data');
const _ = require('lodash');

usuariosRouter.get('/', (request, response) => {
  response.json(usuarios);
});

// Middleware route params
usuariosRouter.param('id', (request, response, next, id) => {
  console.error('Id Ok:', id);
  const usuario = _.find(usuarios, {
    'id': +id
  })

  if (usuario) {
    request.usuario = usuario;
    next();
  } else {
    response.status(404).json({
      'error': 'ID no se encontro'
    })
  }
});

usuariosRouter.get('/:id', (request, response) => {
  let usuario = request.usuario;
  response.json(usuario || {
    'error': 'Id no encontrado'
  })
})

usuariosRouter.post('/', (request, response) => {
  console.error(request.body)
  let usuario = request.body;
  const createdUser = usuarios.push(usuario);

  if (!createdUser) {
    response.json({
      'error': 'El usuario no fue creado'
    })
    response.status(200).json(usuario);
  }


  response.json(usuario || {
    'error': 'Id no encontrado'
  })
})




module.exports = usuariosRouter;