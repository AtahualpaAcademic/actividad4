const express = require('express'); // Importamos el motor
const mongoose = require('mongoose'); // Importamos el traductor de DB
require('dotenv').config(); // Leemos el archivo secreto .env

const app = express();
app.use(express.json()); // Permitimos que el servidor entienda formato JSON

// Conexión a la Base de Datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ ¡Estamos conectados a la nube de MongoDB!'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => res.send('El servidor está vivo 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));