const { DBService } = require('../services/db');

const checkBodyProduct = async (req, res, next) => {
    const { nombre, marca, stock, precio} = req.body;

    if (!nombre || !marca || !stock || !precio)
        return res.status(400).json({
            msg: 'Datos incompletos',
        });

    next();
};

const getAllProducts = async (req, res) => {
    try {
        const productos = await DBService.listaProductos();

        res.json({
            data: productos,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await DBService.listaProductos(id);

        if (!producto.length)
            return res.status(404).json({
                msgs: 'Producto no encontrado',
            });

        res.json({
            data: producto,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { nombre, marca, stock, precio } = req.body;

        const data = {
            nombre,
            marca,
            stock,
            precio,
        };

        const newId = await DBService.crearProducto(data);

        const newProduct = await DBService.listaProductos(newId);

        res.json({
            data: newProduct,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, marca, stock, precio } = req.body;

        let productos = await DBService.listaProductos(id);

        if (!productos.length)
            return res.status(404).json({
                msgs: 'Producto no encontrado',
            });

        const data = {
            nombre,
            marca,
            stock,
            precio,
        };

        DBService.actualizarProducto(id, data);

        productos = await DBService.listaProductos(id);
        res.json({
            msg: 'Producto Actualizado',
            item: productos,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const deleteProduct = async (req, res) => { 
    try {
        const { id } = req.params;

        DBService.eliminarProducto(id);
        res.json({
            msg: 'Producto eliminado',
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

module.exports = {
    checkBodyProduct,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}