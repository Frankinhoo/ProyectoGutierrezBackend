const { Router } = require('express');
const { productosController } = require('../controller/productos')
const { error } = require('console');

const rutaProductos = Router();

// rutaProductos.get('/', async (req, res) => {
//     // const productos = await productosController.getAll();
//     // res.render('index', { productos } );
// });

rutaProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productosController.getById(id);

    if (id <= 0) {
        return res.status(404).json({
            msg: 'Producto no encontrado'
        })
    }

    res.json({
        msg: `Producto con id ${id}`,
        data: producto,
    });
})

// rutaProductos.post('/', async (req, res) => {
//     // const data = req.body;
//     // const producto = await productosController.save(data);

//     // if (!data.producto || !data.marca || !data.precio) {
//     //     return res.status(400).json({
//     //         msg: "Campos incompletos"
//     //     })
//     // }

//     // res.redirect('/');
// })

rutaProductos.put('/:id', async (req, res) => {
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

})

rutaProductos.delete('/:id', async (req, res) => {
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
})

module.exports = rutaProductos;