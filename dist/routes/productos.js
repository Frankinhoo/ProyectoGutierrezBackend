"use strict";

var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../middleware/productos'),
  checkBodyProduct = _require2.checkBodyProduct;
var _require3 = require('../controller/productos'),
  productosController = _require3.productosController;
var rutaProductos = Router();
rutaProductos.get('/test', productosController.getAllFaker); //Eliminar despues 

rutaProductos.get('/', productosController.getAll);
rutaProductos.get('/:id', productosController.getById);
rutaProductos.post('/', checkBodyProduct, productosController.create);
rutaProductos.put('/:id', checkBodyProduct, productosController.update);
rutaProductos["delete"]('/:id', productosController["delete"]);
module.exports = rutaProductos;