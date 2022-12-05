const mongoose = require('mongoose');
const { productoSchema } = require('./productos');

const carritoSchema = new mongoose.Schema(
    {
    timestamps: { type: String, required:true },
    productos: { type: [productoSchema], required: true }
    },
    { versionKey:false}
);

const carritoModel = mongoose.model('carrito', carritoSchema);

module.exports = {
    carritoModel
}