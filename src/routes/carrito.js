const { Router } = require('express');
const { carritoController } = require('../controller/carrito');
const { productosController } = require('../controller/productos');
const { middlewareGet, middlewarePostAndDelete, middlewareDelete } = require('../middleware/carrito');

const rutaCarrito = Router();

rutaCarrito.get('/:id/productos', middlewareGet, async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await carritoController.getCarritoById(id);

    return res.status(200).json({
        carrito,
    })
});

rutaCarrito.post('/', async (req, res) => {
    const carrito = await carritoController.newCarrito();

    res.json({
        msg: `Nuevo carrito creado con id: ${carrito}`
    })
});

rutaCarrito.post('/:id/productos', middlewarePostAndDelete, async (req, res) => {
    const id = parseInt(req.params.id);
    const productoId = parseInt(req.body.id);
    const carrito = await carritoController.getCarritoById(id);
    const producto = await productosController.getById(productoId);
    const data = await carritoController.addNewProductToCartById(id, producto);

    res.status(201).json({
        msg: `Traigo el carrito con id: ${id}`,
        data: 'Agrego el siguiente producto',
        producto
    })
});

rutaCarrito.delete('/:id', middlewarePostAndDelete, async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await carritoController.deleteCarritoById(id);

    res.json({
        msg: `Carrito borrado con id: ${id}`
    })
});

rutaCarrito.delete('/:id/productos/:id_prod', middlewareDelete, async (req, res) => {
    const id = parseInt(req.params.id);
    const productoId = parseInt(req.params.id_prod);

    const carrito = await carritoController.getCarritoById(id);
    const data = await carritoController.deleteProductoInCartById(id, productoId);
    return res.status(200).json({
        msg: "producto eliminado del carrito con exito",
        data
    });
});

module.exports = rutaCarrito;