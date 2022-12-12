const { Router } = require('express')
const productosRouter = require('./productos')
const carritoRouter = require('./carrito')
const mensajesRouter = require('./mensajes')

const rutaPrincipal = Router();

rutaPrincipal.use('/productos', productosRouter);

rutaPrincipal.use('/carrito', carritoRouter);

rutaPrincipal.use('/mensajes', mensajesRouter);


module.exports = rutaPrincipal;