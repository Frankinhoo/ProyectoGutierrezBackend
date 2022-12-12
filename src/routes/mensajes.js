const { Router } = require('express');
const { mensajesController } = require('../controller/mensajes');

const rutaMensajes = Router();

rutaMensajes.get("/todos", mensajesController.getAll);

rutaMensajes.get("/normalizados", mensajesController.normalizedMessages);

rutaMensajes.get("/denormalizados", mensajesController.denormalizedMessages);

module.exports = rutaMensajes;