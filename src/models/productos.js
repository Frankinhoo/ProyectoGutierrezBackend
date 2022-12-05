const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        producto: { type: String, required: true, max: 100 },
        marca: { type: String, required: true, max: 100 },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
    },
    {
        versionKey: false
    }
);

const productosModel = mongoose.model('producto', productoSchema);

module.exports = {
    productosModel,
    productoSchema
}