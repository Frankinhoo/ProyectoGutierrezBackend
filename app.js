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
                precio: data.precio,
                id: productos[productos.length - 1].id + 1
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

            console.log(productos[indice]);
        }
        catch (error) {
            console.log('No se encontro el producto', error)
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombre}`, `utf-8`);
            const productos = JSON.parse(contenido);
            console.log(productos);
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
    }

const container = new Contenedor ('productos.json');

// container.save({ producto: 'Ozelia', marca: 'Adidas', precio: 26000 });

// container.getAll();

// container.getById(2);

// container.deleteById(3);

// container.deleteAll();
