const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);