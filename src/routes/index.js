const { Router } = require('express')
const productosRouter = require('./productos')
const carritoRouter = require('./carrito')

const rutaPrincipal = Router();

rutaPrincipal.use('/productos', productosRouter);

rutaPrincipal.use('/carrito', carritoRouter);


module.exports = rutaPrincipal;