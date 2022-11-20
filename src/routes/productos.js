const { Router } = require('express');
const { checkBodyProduct, getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productos');


const rutaProductos = Router();

rutaProductos.get('/', getAllProducts);

rutaProductos.get('/:id', getProductById);

rutaProductos.post('/', checkBodyProduct, createProduct);

rutaProductos.put('/:id', checkBodyProduct, updateProduct);

rutaProductos.delete('/:id', deleteProduct);

module.exports = rutaProductos;