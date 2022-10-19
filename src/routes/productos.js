const fs = require('fs');
const { Router } = require('express');
const { error } = require('console');

const rutaProductos = Router();

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(data) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf8`);
            const productos = JSON.parse(contenido);

            const nuevoProducto = {
                producto: data.producto,
                marca: data.marca,
                precio: data.precio,
                id: productos[productos.length - 1].id + 1
            }

            if (!data.producto || !data.marca || !data.precio) {
                throw new Error('Campos incompletos');
            }

            productos.push(nuevoProducto);

            const dato = JSON.stringify(productos, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Guardado');
        }
        catch (error) {
            console.log('Error al guardar el objeto', error);
        }
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const productos = JSON.parse(contenido);

            const indice = productos.findIndex((unProducto) => unProducto.id === id);

            if (indice < 0) {
                throw new Error('El producto no existe');
            }

            return (productos[indice]);
        }
        catch (error) {
            console.log('No se encontro el producto', error)
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const productos = JSON.parse(contenido);
            return (productos);
        }
        catch (error) {
            console.log('No se encontro el array de los productos', error)
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const productos = JSON.parse(contenido);

            const indice = productos.findIndex((unProducto) => unProducto.id === id);

            if (indice < 0) {
                return;
            }

            productos.splice(indice, 1);

            const dato = JSON.stringify(productos, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Producto eliminado')
        }
        catch (error) {
            console.log('No se encontro el producto', error)
        }
    }

    async deleteAll() {
        try {
            const productos = []
            const dato = JSON.stringify(productos, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Objetos eliminados');
        }
        catch (error) {
            console.log('Error al eliminar los objetos', error);
        }
    }

    async productRandom() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const productos = JSON.parse(contenido);

            const between = (min, max) => {
                return Math.round(Math.random() * (max - min) + min);
            }

            return (between(1, productos.length));
        }
        catch (error) {
            console.log('Error en retornar un numero aleatorio', error)
        }
    }

    async actualizarProduct(data, id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf8`);
            const productos = JSON.parse(contenido);

            const indice = productos.findIndex((unProducto) => unProducto.id === id);

            const nuevoProducto = {
                producto: data.producto,
                marca: data.marca,
                precio: data.precio,
                id: productos[indice].id 
            }

            if (indice < 0) {
                throw new Error('El producto no existe');
            }

            if (!data.producto || !data.marca || !data.precio) {
                throw new Error('Campos incompletos');
            }

            productos.splice(indice, 1, nuevoProducto);

            const dato = JSON.stringify(productos, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Guardado');
        }
        catch (error) {
            console.log('Error al guardar el objeto', error);
        }
    }
}

const container = new Contenedor('productos.json');

rutaProductos.get('/', async (req, res) => {
const productos = await container.getAll();
    res.json({
    data:productos,
});
});

rutaProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await container.getById(id);

    if (id <= 0) {
        return res.status(404).json({
            msg:'Producto no encontrado'
        })
    }

    res.json({
        msg:`Producto con id ${id}`,
        data: producto,
});
})

rutaProductos.post('/', async (req, res) => {
    const data = req.body;
    const producto = await container.save(data);

    if (!data.producto || !data.marca || !data.precio) {
        return res.status(400).json({
            msg:"Campos incompletos"
        })
    }

    res.json({
        msg: "Producto agregado",
        data: data
    })
})

rutaProductos.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    if (id <= 0) {
        return res.status(404).json({
            msg:'El producto no existe'
        })
    }

    if (!data.producto || !data.marca || !data.precio) {
        return res.status(400).json({
            msg: "Campos incompletos"
        })
    }

    const productoActualizado = await container.actualizarProduct(data, id)

    res.json({
        msg:`Producto actualizado con id ${id}`,
        data: data
    })

})

rutaProductos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = container.deleteById(id)

    if (id <= 0) {
        return res.json({
            msg: 'Ok'
        })
    }

    res.json({
        msg:`Producto borrado con id ${id}`
    })
})

module.exports = rutaProductos;