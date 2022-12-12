const server = require('./services/server');
const { initWsServer, getWsServer } = require('./services/socket');
const { PUERTO } = require('./config/index');
const { DBService } = require('./services/db');
const { initMongoDB } = require('./services/database');

const puerto = PUERTO
// DBService.init();

const init = async () => {
    await initMongoDB();

    server.listen(puerto, () => {
        console.log(`Servidor http escuchando en el puerto ${puerto}`)
    })

    server.on('error', error => console.log(`Error en el servidor ${error}`))
}


init();