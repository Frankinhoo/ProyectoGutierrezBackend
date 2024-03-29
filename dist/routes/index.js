"use strict";

var _require = require('express'),
  Router = _require.Router;
var productosRouter = require('./productos');
var carritoRouter = require('./carrito');
var mensajesRouter = require('./mensajes');
var usuariosRouter = require('./usuarios');
var minimistRouter = require('./minimist');
var rutaPrincipal = Router();
rutaPrincipal.use('/productos', productosRouter);
rutaPrincipal.use('/carrito', carritoRouter);
rutaPrincipal.use('/mensajes', mensajesRouter);
rutaPrincipal.use('/usuarios', usuariosRouter);
rutaPrincipal.use('/minimist', minimistRouter);
module.exports = rutaPrincipal;