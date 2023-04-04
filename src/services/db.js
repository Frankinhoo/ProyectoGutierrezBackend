const knex = require('knex');
const db = require('../knexfile');



class Contenedor {
    constructor() {
        const environment = process.env.DB_ENV || 'development';
        console.log(`SETTING ${environment} DB`);
        const options = db[environment];
        this.connection = knex({
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB,
            },
        });
    }

    init() {
        this.connection.schema.hasTable('productos').then((exists) => {
            if (exists) return;
            console.log('Creamos la tabla productos!');

            return this.connection.schema.createTable(
                'productos',
                async (productosTable) => {
                    productosTable.increments();
                    productosTable.string('nombre').notNullable();
                    productosTable.string('marca').notNullable();
                    productosTable.integer('stock').notNullable();
                    productosTable.decimal('precio', 7, 2);
                }
            );
        });
    }

    listaProductos(id) {
        if (id) return this.connection('productos').where('id', id);

        return this.connection('productos');
    }

    crearProducto(data) {
        return this.connection('productos').insert(data);
    }

    actualizarProducto(id, data) {
        return this.connection('productos').where('id', id).update(data);
    }

    eliminarProducto(id) {
        return this.connection('productos').where('id', id).del();
    }
}

const contenedorDB = new Contenedor();

module.exports = {
    DBService: contenedorDB
}

