const { Router } = require('express');
const { carritoController } = require('../controller/carrito');


const rutaCarrito = Router();

rutaCarrito.get('/:id/productos', carritoController.getCartById);

rutaCarrito.get('/', carritoController.getAllCarts);

rutaCarrito.post('/', carritoController.newCarrito);

rutaCarrito.post('/:id/productos', carritoController.addNewProductToCartById);

rutaCarrito.delete('/:id', carritoController.deleteCartById );

rutaCarrito.delete('/:id/productos/:id_prod', carritoController.deleteProductInCartById);

module.exports = rutaCarrito;