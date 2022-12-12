const mongoose = require('mongoose');
const { autorSchema } = require('./autores');

const mensajeSchema = new mongoose.Schema(
    {
        autor: { type: [autorSchema], required: true },
        text: { type: String, required:true },
    },
    { versionKey: false }
);

const mensajesModel = mongoose.model('mensaje', mensajeSchema);

module.exports = {
    mensajesModel
}

