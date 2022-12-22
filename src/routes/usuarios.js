const { Router } = require('express');
const { usuariosController } = require('../controller/usuarios');
const { validateLogIn } = require('../middleware/usuarios')


const rutaUsuarios = Router();

rutaUsuarios.post('/login', usuariosController.loginPost)

rutaUsuarios.get('/', usuariosController.loginGet)

rutaUsuarios.get('/logout', usuariosController.logout)

rutaUsuarios.get('/info', validateLogIn, usuariosController.info)

module.exports = rutaUsuarios;