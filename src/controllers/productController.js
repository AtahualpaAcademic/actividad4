const Product = require('../models/Product');

// OBTENER TODOS LOS PRODUCTOS
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (err) {
        res.status(500).send('Error al obtener productos');
    }
};

// CREAR UN PRODUCTO
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.json(nuevoProducto);
    } catch (err) {
        res.status(500).send('Error al crear producto');
    }
};

// ACTUALIZAR UN PRODUCTO 
exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;
        let producto = await Product.findById(req.params.id);

        if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });

        // Actualizamos solo los campos enviados
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;

        await producto.save();
        res.json(producto);
    } catch (err) {
        res.status(500).send('Error al actualizar');
    }
};

// ELIMINAR UN PRODUCTO
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });

        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).send('Error al eliminar');
    }
};