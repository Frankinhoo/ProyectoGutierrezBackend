const fs = require('fs');
const moment = require('moment');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async newCarrito() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf8`);
            const carrito = JSON.parse(contenido);

            const between = (min, max) => {
                return Math.round(Math.random() * (max - min) + min);
            }

            const nuevoCarrito = {
                id: between(0, 1000),
                timestamp: moment().format('DD-MM-YY HH:MM:SS'),
                producto: []
            }

            carrito.push(nuevoCarrito);

            const dato = JSON.stringify(carrito, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Carrito creado');
            return (nuevoCarrito.id);
        }
        catch (error) {
            console.log('Error al crear carrito', error);
        }
    }
    
    async deleteCarritoById(cartId) {
            try {
                const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
                const carrito = JSON.parse(contenido);
    
                const indice = carrito.findIndex((cart) => cart.id === cartId);
    
                if (indice < 0) {
                    return;
                }
    
                carrito.splice(indice, 1);
    
                const dato = JSON.stringify(carrito, null, '\t');
                await fs.promises.writeFile(`./${this.nombre}`, dato);
                console.log('Carrito eliminado')
            }
            catch (error) {
                console.log('No se encontro el carrito', error)
            }
    }

    async addNewProductToCartById(cartId, product) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf8`);
            const carrito = JSON.parse(contenido);

            const indice = carrito.findIndex((cart) => cart.id === cartId);

            carrito[indice].producto.push(product);

            const dato = JSON.stringify(carrito, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
        }
        catch (error) {
            console.log('No se pudo agregar el producto al carrito', error)
        }
    }

    async getCarritoById(cartId) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const carrito = JSON.parse(contenido);

            const indice = carrito.findIndex((cart) => cart.id === cartId);

            if (indice < 0) {
                const existente = {
                    index: indice,
                    msg: "El carrito buscado no existe!",
                };
                throw existente;
            }

            return (carrito[indice]);
        }
        catch (error) {
            console.log('No se encontro el Carrito', error)
        }
    }

    async deleteProductoInCartById(cartId, productId) {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const carrito = JSON.parse(contenido);

            const carritoIndice = carrito.findIndex((cart) => cart.id === cartId);

            const productoIndice = carrito[carritoIndice].producto.findIndex((unProducto) => unProducto.id === productId);


            if (productoIndice < 0) {
                throw 'El producto no existe en el carrito';
            }

            carrito[carritoIndice].producto.splice(productoIndice, 1);

            const dato = JSON.stringify(carrito, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Producto eliminado')
        }
        catch (error) {
            console.log('No se encontro el producto', error)
        }
    }

    async deleteAll() {
        try {
            const carritos = []
            const dato = JSON.stringify(carritos, null, '\t');
            await fs.promises.writeFile(`./${this.nombre}`, dato);
            console.log('Objetos eliminados');
        }
        catch (error) {
            console.log('Error al eliminar los objetos', error);
        }
    }
}

const contenedorCarrito = new Contenedor('carrito.json');

module.exports = {
    carritoController : contenedorCarrito
}