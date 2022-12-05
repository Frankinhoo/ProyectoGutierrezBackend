const { Router } = require('express');
const { checkBodyProduct, getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productos');
const { mongoDBController } = require('../controller/productosMongo');


const rutaProductos = Router();

rutaProductos.get('/', mongoDBController.getAll);

rutaProductos.get('/:id', mongoDBController.getById);

rutaProductos.post('/', checkBodyProduct, mongoDBController.create);

rutaProductos.put('/:id', checkBodyProduct, mongoDBController.update);

rutaProductos.delete('/:id', mongoDBController.delete);

module.exports = rutaProductos;