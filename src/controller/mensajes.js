const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async getAll() {
        try {
            const viewsFolderPath = path.resolve(__dirname, '../../mensajes.json')
            const contenido = await fs.promises.readFile(viewsFolderPath, `utf-8`);
            const data = JSON.parse(contenido);
            return (data);
        }
        catch (error) {
            console.log('No se encontro el array de los mensajes', error)
        }
    }

    async save(data) {
        try {
            const viewsFolderPath = path.resolve(__dirname, '../../mensajes.json')
            const contenido = await fs.promises.readFile(viewsFolderPath, `utf8`);
            const datos = JSON.parse(contenido);

            const nuevoMensaje = {
                usuario: data.usuario,
                mensaje: data.mensaje,
                time: moment().format('L, h:mm a'),
            }

            if (!data.usuario || !data.mensaje) {
                throw new Error('Campos incompletos');
            }

            datos.push(nuevoMensaje);

            const dato = JSON.stringify(datos, null, '\t');
            await fs.promises.writeFile(viewsFolderPath, dato);
            console.log('Enviado');
        }
        catch (error) {
            console.log('Error al enviar el mensaje', error);
        }
    }
}

const contenedorMsj = new Contenedor('mensajes.json');

module.exports = {
    mensajesController : contenedorMsj
}