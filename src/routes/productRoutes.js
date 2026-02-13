const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Todas las rutas usan el middleware 'auth' para protección JWT
router.get('/', auth, productController.obtenerProductos);
router.post('/', auth, productController.crearProducto);
router.put('/:id', auth, productController.actualizarProducto); // :id es un parámetro dinámico
router.delete('/:id', auth, productController.eliminarProducto);

module.exports = router;