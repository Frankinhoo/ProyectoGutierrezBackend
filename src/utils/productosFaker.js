const { faker } = require('@faker-js/faker');


faker.locale = "es";

let productos = [];

const generarProducto = () => {
    return {
        producto: faker.commerce.productName(),
        marca: faker.commerce.department(),
        precio: faker.commerce.price(1, 100000, 0, '$'),
        stock: faker.commerce.price(0, 100, 0)
    };
};

const crearProducto = (cantidad) => {
    productos.length = 0;
    for (let i = 0; i < cantidad; i++) {
        const producto = generarProducto();
        producto.id = i + 1;
        productos.push(producto);
    }
    return productos;
};

module.exports = {
    generarProducto,
    crearProducto
}