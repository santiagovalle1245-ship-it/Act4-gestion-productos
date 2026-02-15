require('dotenv').config();// Importamos dotenv para poder leer nuestro archivo .env

const express = require('express');// Importamos express, que es el framework para crear nuestro servidor

const connectDB = require('./config/db');// Importamos la función de conexión a la base de datos que acabamos de crear

const app = express();// Inicializamos la aplicación de express

connectDB();// Ejecutamos la función para conectarnos a la base de datos

app.use(express.json());// Middleware: Le decimos a Express que entienda los datos en formato JSON

app.use(express.static('public'));

app.use('/api/auth', require('./routes/authRoutes'));// Rutas de la aplicación

app.use('/api/products', require('./routes/productRoutes'));// Rutas de productos, protegidas por el middleware de autenticación (authMiddleware)

// Ruta de prueba para ver si el servidor responde
app.get('/', (req, res) => {
    res.send('¡Hola! La API de Gestión de Productos está funcionando.');
});

// Le decimos al servidor que se quede "escuchando" en el puerto definido
const PORT = process.env.PORT || 3000;// Definimos el puerto

// Jest configura automáticamente una variable llamada NODE_ENV a 'test'
// Si no estamos en modo de prueba, encendemos el servidor normalmente
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

module.exports = app;// Exportamos la aplicación para poder usarla en los tests con Jest