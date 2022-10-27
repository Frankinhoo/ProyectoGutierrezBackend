const fs = require('fs');

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
                precio: parseInt(data.precio),
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

const contenedorApi = new Contenedor('productos.json');

module.exports = {
    productosController: contenedorApi
}