const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: Number, required: true },
    });

const autorModel = mongoose.model('autor', autorSchema);

module.exports = {
    autorModel
}