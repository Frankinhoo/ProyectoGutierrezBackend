const { Router } = require('express');
const { productosController } = require('../controller/productos')
const { error } = require('console');
const { administrador } = require("../config/index")

const rutaProductos = Router();

const autorizacion = (req, res, next) => {
    if (!administrador)
        return res.status(401).json({
            msg: 'No estas autorizado'
        });
    
    next();
}

rutaProductos.get('/', async  (req, res) => {
    const productos = await productosController.getAll();
    res.render('productos', { productos } );
});

rutaProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productosController.getById(id);

    if (id <= 0) {
        return res.status(404).json({
            msg: 'Producto no encontrado'
        })
    }

    // res.json({
    //     msg: `Producto actualizado con id ${id}`,
    //     data: producto
    // })

    res.render('producto', { producto });
});

rutaProductos.post('/', autorizacion, async (req, res) => {
    const data = req.body;
    const producto = await productosController.save(data);

    if (!data.producto || !data.marca || !data.precio) {
        return res.status(400).json({
            msg: "Campos incompletos"
        })
    }
    res.status(201).json({
        msg: "Producto Guardado"
    })
    // res.redirect('/');
});

rutaProductos.put('/:id', autorizacion, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    if (id <= 0) {
        return res.status(404).json({
            msg: 'El producto no existe'
        })
    }

    if (!data.producto || !data.marca || !data.precio) {
        return res.status(400).json({
            msg: "Campos incompletos"
        })
    }

    const productoActualizado = await productosController.actualizarProduct(data, id)

    res.json({
        msg: `Producto actualizado con id ${id}`,
        data: data
    })

});

rutaProductos.delete('/:id', autorizacion, async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productosController.deleteById(id)

    if (id <= 0) {
        return res.json({
            msg: 'Ok'
        })
    }

    res.json({
        msg: `Producto borrado con id ${id}`
    })
});

module.exports = rutaProductos;