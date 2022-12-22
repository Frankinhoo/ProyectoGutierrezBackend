const { Router } = require('express');
const productosRouter = require('./productos');
const carritoRouter = require('./carrito');
const mensajesRouter = require('./mensajes');
const usuariosRouter = require('./usuarios')

const rutaPrincipal = Router();

rutaPrincipal.use('/productos', productosRouter);

rutaPrincipal.use('/carrito', carritoRouter);

rutaPrincipal.use('/mensajes', mensajesRouter);

rutaPrincipal.use('/usuarios', usuariosRouter);

module.exports = rutaPrincipal;