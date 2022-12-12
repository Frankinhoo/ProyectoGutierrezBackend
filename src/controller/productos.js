const { productosModel } = require('../models/productos');
const { crearProducto } = require('../utils/productosFaker');


class Contenedor{
    constructor() {
    }

    async getAll (req, res) {
        try {
            const productos = await productosModel.find();
    
            res.json({
                data: productos,
            });
    
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            })
        }
    };

    async getById (req, res) {
        try {
            const { id } = req.params;
            const producto = await productosModel.findById(id);

            if (!producto)
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                });
            
            res.json({
                data: producto,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async create (req, res) {
        try {
            const { producto, marca, precio, stock } = req.body;

            const nuevoProducto = await productosModel.create({
                producto,
                marca,
                precio,
                stock
            });

            res.json({
                data: nuevoProducto,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async update (req, res) {
        try {
            const { id } = req.params;
            const { producto, marca, precio, stock } = req.body;

            const prdcto = await productosModel.findById(id);

            if (!prdcto)
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                });

            const productoActualizado = await productosModel.findByIdAndUpdate(
                id,
                { producto, marca, precio, stock },
                { new: true }
            );

            res.json({
                msg: 'Producto Actualizado',
                data: productoActualizado,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async delete (req, res) {
        try {
            const { id } = req.params;

            await productosModel.findByIdAndDelete(id);

            res.json({
                msg: 'Producto Eliminado',
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async getAllFaker (req, res) {
        try {
            res.status(200).json({
                data: crearProducto(5),
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };
}

const contenedorDBMongo = new Contenedor();

module.exports = {
    mongoDBController: contenedorDBMongo
}