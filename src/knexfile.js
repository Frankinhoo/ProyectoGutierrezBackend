const dotenv = require('dotenv');
dotenv.config();

// const development ={
//     client: 'sqlite3',
//     connection: { filename: './myDB.sqlite' },
//     useNullAsDefault: true,
// };

// const production = {
//     client: 'mysql',
//     connection: {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: 'productos',
//     },
// };

module.export = {
    development: {
        client: 'sqlite3',
        connection: { filename: './myDB.sqlite' },
        useNullAsDefault: true,
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'productos',
        },
    },
    // development,
    // production
}