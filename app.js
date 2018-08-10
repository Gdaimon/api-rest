require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
let port = process.env.PORT;
const usuariosRouter = require('./routers/usuarios-router')

let tareas = [];

// Middlewares
app.use(morgan('dev'));
app.use(session({
  secret: 'node'
}));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Template Engine
app.set('view engine', 'ejs')

// Rutas
app.use('/usuarios', usuariosRouter);

app.get('/', (request, response) => {
  response.render('formulario.ejs', {
    tareas
  });
});

app.post('/adicionar', (request, response) => {
  // console.log(request.body)
  let nuevaTarea = request.body.nuevaTarea;
  tareas.push(nuevaTarea);
  response.redirect('/');
});

app.get('/eliminar/:id', (request, response) => {
  console.log(request.params.id)
  let id = +request.params.id;
  tareas.splice(id, 1);
  response.redirect('/');
})


app.listen(port, () => {
  console.log('Corriendo en el puerto', port);
})