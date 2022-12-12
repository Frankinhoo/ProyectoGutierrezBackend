const { mensajesModel } = require('../models/mensajes');
const { normalize, denormalize, schema } = require('normalizr');
const { Schema } = require('mongoose');

const autor = new schema.Entity('autor', {}, { idAttribute: 'id' });

const msj = new schema.Entity(
    'mensaje',
    { autor: autor },
    { idAttribute: '_id' }
);

const msjSchema = new schema.Array(msj);

class Contenedor {
    constructor() {
    }

    async getAll(req, res) {
        try {
            const mensajes = await mensajesModel.find().lean();

            if (!mensajes) 
                return res.status(400).json({
                    mensaje: "No hay mensajes",
                });
            
            res.status(200).json({
                data: mensajes,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            })
        }
    };

    async normalizedMessages(req, res) {
        try {
            const mensajesOriginales = await mensajesModel.find().lean();

            const mensajesNormalizados = normalize(mensajesOriginales, msjSchema);

            res.status(200).json({
                data: mensajesNormalizados,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };

    async denormalizedMessages(req, res) {
        try {
            const mensajesOriginales = await mensajesModel.find().lean();

            const mensajesNormalizados = normalize(mensajesOriginales, msjSchema);

            const denormalizado = denormalize(
                mensajesNormalizados.result,
                msjSchema,
                mensajesNormalizados.entities
            );

            res.status(200).json({
                data: denormalizado
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                stack: error.stack,
            });
        }
    };
}

const contenedorDBMongo = new Contenedor();

module.exports = {
    mensajesController: contenedorDBMongo
}