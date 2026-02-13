// 1. IMPORTACIÓN DE MÓDULOS
require('dotenv').config(); // Carga las variables del archivo .env
const express = require('express');
const mongoose = require('mongoose'); // Librería para interactuar con MongoDB

// 2. INICIALIZACIÓN DE LA APP
const app = express();

// 3. MIDDLEWARES
// Permite que el servidor entienda datos en formato JSON que enviemos desde el cliente
app.use(express.json()); 

// 4. CONEXIÓN A MONGODB ATLAS
// Usamos la URI que guardaste en tu archivo .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ ¡Conexión exitosa a MongoDB Atlas!'))
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
        process.exit(1); // Detiene la app si no hay conexión
    });

// 5. DEFINICIÓN DE RUTAS
// Rutas para Registro e Inicio de Sesión (Sin protección JWT)
app.use('/api/auth', require('./src/routes/auth'));

// Rutas para Gestión de Productos (Protegidas con el middleware JWT)
app.use('/api/products', require('./src/routes/productRoutes'));

// Ruta base para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de Gestión de Productos corriendo 🚀');
});

// 6. CONFIGURACIÓN DEL PUERTO Y ARRANQUE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
    console.log('Presiona Ctrl+C para detener el servidor');
});

// Exportamos la app para que Jest pueda realizar las pruebas unitarias más adelante
module.exports = app;