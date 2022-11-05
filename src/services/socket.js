const socket = require('socket.io');
const { productosController } = require('../controller/productos');
const { mensajesController } = require('../controller/mensajes');


let io;

const initWsServer = (server) => {
    io = socket(server);

    io.on('connection', async (socket) => {
        console.log('Socket: Nueva Conexion Establecida');
        
        socket.on('NuevoProducto', async (data) => {
            await productosController.save(data);
        })

        data = await productosController.getAll();
        socket.emit('TodosLosProductos', data);

        socket.on('NuevoMensaje', async (data) => {
            await mensajesController.save(data)  
        })

        dataMensajes = await mensajesController.getAll();
        socket.emit('TodosLosMensajes', dataMensajes);
    });
    
    return io;
}

const getWsServer = () => {
    return io;
}

module.exports = {
    initWsServer,
    getWsServer
};