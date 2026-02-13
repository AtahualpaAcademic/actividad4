// 1. IMPORTACIÓN DE MÓDULOS
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Módulo necesario para las rutas de archivos

// 2. INICIALIZACIÓN DE LA APP
const app = express();

// 3. MIDDLEWARES
app.use(express.json()); 

// CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS (Frontend)
// Esta línea le dice a Express que busque login.html en la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 4. CONEXIÓN A MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ ¡Conexión exitosa a MongoDB Atlas!'))
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
        process.exit(1); 
    });

// 5. DEFINICIÓN DE RUTAS API
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/productRoutes'));

// Ruta base para verificar que el servidor funciona (opcional)
app.get('/health', (req, res) => {
    res.send('Servidor de Gestión de Productos corriendo 🚀');
});

// 6. CONFIGURACIÓN DEL PUERTO Y ARRANQUE
const PORT = process.env.PORT || 10000; // Render usa puertos altos, por eso el 10000
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
});

// Exportamos para Jest
module.exports = app;