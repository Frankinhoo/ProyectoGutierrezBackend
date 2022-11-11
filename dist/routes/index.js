"use strict";

var _require = require('express'),
  Router = _require.Router;
var productosRouter = require('./productos');
var rutaPrincipal = Router();
rutaPrincipal.use('/productos', productosRouter);
module.exports = rutaPrincipal;