const { Router } = require('express');
const { checkBodyProduct } = require('../middleware/productos');
const { productosController } = require('../controller/productos');


const rutaProductos = Router();

rutaProductos.get('/test', productosController.getAllFaker) //Eliminar despues 

rutaProductos.get('/', productosController.getAll);

rutaProductos.get('/:id', productosController.getById);

rutaProductos.post('/', checkBodyProduct, productosController.create);

rutaProductos.put('/:id', checkBodyProduct, productosController.update);

rutaProductos.delete('/:id', productosController.delete);

module.exports = rutaProductos; 