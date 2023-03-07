const  args  = require('../services/server');
const { fork } = require('child_process');
const path = require('path');

const scriptPath = path.resolve(__dirname, '../utils/calculo');

class Contenedor {
    constructor() {
    }

    async infoApi (req, res) {
        try {
            const finalObject = {
                args: args,
                directorioActual: process.cwd(),
                idProceso: process.pid,
                versionNode: process.version,
                tituloProceso: process.title,
                sistemaOperativo: process.platform,
                usoMemoria: process.memoryUsage(),
            };
            res.status(200).json({
                data: finalObject,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack
            });
        }
    };

    async randomNumbers(req, res) {
        try {
            const random = fork(scriptPath);
            random.send({ msg: 'start', cant: req.params.cant });
            random.on('message', (numeros) => {
                res.json({
                    resultado: numeros,
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack
            });
        }
    };
}

const contenedorMinimist = new Contenedor();

module.exports = {
    minimistController: contenedorMinimist
}