const { Router } = require('express');
const { checkBodyProduct } = require('../middleware/productos');
const { mongoDBController } = require('../controller/productos');


const rutaProductos = Router();

rutaProductos.get('/test', mongoDBController.getAllFaker) //Eliminar despues 

rutaProductos.get('/', mongoDBController.getAll);

rutaProductos.get('/:id', mongoDBController.getById);

rutaProductos.post('/', checkBodyProduct, mongoDBController.create);

rutaProductos.put('/:id', checkBodyProduct, mongoDBController.update);

rutaProductos.delete('/:id', mongoDBController.delete);

module.exports = rutaProductos;