const passport = require('passport');
const { Router } = require('express');
const { usuariosController } = require('../controller/usuarios');
const { isLoggedIn } = require('../middleware/usuarios');



const rutaUsuarios = Router();

const passportOptions = {
    badRequestMessage: "Problema con username / password!",
};

rutaUsuarios.post('/signup', usuariosController.signup)

rutaUsuarios.post('/login', passport.authenticate("login", passportOptions), usuariosController.login)

rutaUsuarios.get('/home', isLoggedIn, usuariosController.info)

rutaUsuarios.get('/logout', isLoggedIn, usuariosController.logout)

module.exports = rutaUsuarios;