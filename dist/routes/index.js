"use strict";

var _require = require('express'),
  Router = _require.Router;
var productosRouter = require('./productos');
var carritoRouter = require('./carrito');
var rutaPrincipal = Router();
rutaPrincipal.use('/productos', productosRouter);
rutaPrincipal.use('/carrito', carritoRouter);
module.exports = rutaPrincipal;