const { Router } = require('express');
const { carritoController } = require('../controller/carrito');
const { productosController } = require('../controller/productos');

const rutaCarrito = Router();

rutaCarrito.post('/', async (req, res) => {
    const carrito = await carritoController.newCarrito();

    res.json({
        msg: `Nuevo carrito creado con id: ${carrito}`
    })
}); //Crea un carrito y devuelve su id

rutaCarrito.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await carritoController.deleteCarritoById(id);

    res.json({
        msg: `Carrito borrado con id: ${id}`
    })
}); //Vacia un carrito y lo elimina

rutaCarrito.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await carritoController.getCarritoById(id);

    return res.status(200).json({
        carrito,
    })
}); //Me permite listar todos los productos guardados en el carrito

rutaCarrito.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const productoId = parseInt(req.body.id);
    const carrito = await carritoController.getCarritoById(id);
    const producto = await productosController.getById(productoId);
    const data = await carritoController.addNewProductToCartById(carrito.id, producto);

    res.status(201).json({
        msg: `Traigo el carrito con id: ${id}`,
        data: 'Agrego el siguiente producto',
        producto
    })
}); //Para incorporar productos al carrito por su id de producto 

rutaCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        if ( isNaN(req.params.id)  || isNaN(req.params.id_prod)) {
            return res.status(400).json({
                error: "Parámetros Inválidos!",
            });
        }
        const id = parseInt(req.params.id);
        const productoId = parseInt(req.params.id_prod);
        
        const carrito = await carritoController.getCarritoById(id);
        const data = await carritoController.deleteProductoInCartById(id, productoId);
        return res.status(200).json({
            msg: "producto eliminado del carrito con exito",
            data
        });
    } catch (error) {
        return res.status(400).json({
            error: error,
        });
    }
}); //Eliminar un producto del carrito por su id de carrito y de producto

module.exports = rutaCarrito;