const server = require('./services/server')
const {initWsServer , getWsServer} = require('./services/socket')

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})



server.on('error', error => console.log(`Error en el servidor ${error}`))
