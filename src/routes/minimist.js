const { Router } = require('express');
const { minimistController } = require('../controller/minimist');

const rutaMinimist = Router();

rutaMinimist.get('/info', minimistController.infoApi);

rutaMinimist.get('/calculo', minimistController.randomNumbers);

module.exports = rutaMinimist;