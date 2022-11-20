const server = require('./services/server');
const { initWsServer, getWsServer } = require('./services/socket');
const { puerto } = require('./config/index');
const { DBService } = require('./services/db');

DBService.init();


server.listen(puerto, () => {
    console.log(`Servidor http escuchando en el puerto ${puerto}`)
})


server.on('error', error => console.log(`Error en el servidor ${error}`))
