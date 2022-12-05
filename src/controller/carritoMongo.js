const { productosModel } = require('../models/productos');
const { carritoModel } = require('../models/carrito');
const moment = require('moment');

class Contenedor {
    constructor() {
    }

    async newCarrito(req, res) {
        try {
            const timestamps = moment().format('DD-MM-YY HH:MM:SS')
            const productos = [];

            const carrito = await carritoModel.create({
                timestamps,
                productos
            });

            res.status(201).json({
                mensaje: `Carrito creado con exito`,
                data: carrito,
            });
        } catch (error) {
            res.status(500).json({
            error: error.message,
            stack: error.stack,
            });
        }
    };

    async deleteCartById(req, res) {
        try {
            const carritoId = req.params.id;
            const carrito = await carritoModel.findByIdAndDelete(carritoId);

            if (!carrito)
                return res.status(404).json({
                    msg: 'Carrito no encontrado',
                });

            res.json({
                msg: 'Carrito Eliminado',
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async addNewProductToCartById(req, res) {
        try {
            const carritoId = req.params.id;
            const productoId = req.body.id;

            const carrito = await carritoModel.findOne({ _id: carritoId });

            if (!carrito)
                return res.status(404).json({
                    msg: 'Carrito no encontrado'
                });
            
            const producto = await productosModel.findOne({ _id: productoId });
            
            const productos = carrito.productos;
            productos.push(producto);

            if (!producto)
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                });
            
            await carritoModel.findByIdAndUpdate(
                carrito._id,
                { productos },
                { new: true }
            );

            res.status(201).json({
                mensaje: 'Producto agregado al carrito',
                data: producto,
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async getCartById(req, res) {
        try {
            const carritoId = req.params.id;

            const carrito = await carritoModel.findOne({ _id: carritoId });

            if (!carrito)
                return res.status(404).json({
                    msg: 'Carrito no encontrado'
                });
            
            res.status(200).json({
                data: carrito,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async getAllCarts(req, res) {
        try {
            const carritos = await carritoModel.find();

            if (!carritos)
                return res.status(404).json({
                    msg: 'Carritos no encontrados'
                });

            res.status(200).json({
                data: carritos,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async deleteProductInCartById(req, res) {
        try {
            const carritoId = req.params.id;
            const productoId = req.params.id_prod;

            const carrito = await carritoModel.findOne({ _id: carritoId });

            if (!carrito)
                return res.status(404).json({
                    msg: 'Carrito no encontrado'
                });
            
            const productoExistente = carrito.productos.find((item) => item._id == productoId);
            
            if (!productoExistente)
                return res.status(404).json({
                    mensaje: "Producto no encontrado!",
                });
            
            let productos = carrito.productos;
            const productosFiltrados = carrito.productos.filter((item) => item._id != productoId);
            productos = productosFiltrados;

            const carritoActualizado = await carritoModel.findByIdAndUpdate(
                carrito._id,
                { productos },
                { new: true }
            );

            res.status(201).json({
                mensaje: 'Producto eliminado del carrito',
                data: carritoActualizado,
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

}

const contenedorCarrito = new Contenedor('carrito.json');

module.exports = {
    carritoController: contenedorCarrito
}