"use strict";

var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../middleware/productos'),
  checkBodyProduct = _require2.checkBodyProduct;
var _require3 = require('../controller/productos'),
  mongoDBController = _require3.mongoDBController;
var rutaProductos = Router();
rutaProductos.get('/test', mongoDBController.getAllFaker); //Eliminar despues 

rutaProductos.get('/', mongoDBController.getAll);
rutaProductos.get('/:id', mongoDBController.getById);
rutaProductos.post('/', checkBodyProduct, mongoDBController.create);
rutaProductos.put('/:id', checkBodyProduct, mongoDBController.update);
rutaProductos["delete"]('/:id', mongoDBController["delete"]);
module.exports = rutaProductos;