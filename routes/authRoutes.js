const express = require('express');// Importamos Express para poder crear rutas
const router = express.Router();// Creamos un enrutador (como un mini-servidor de rutas)
const authController = require('../controllers/authController');// Importamos el controlador que acabamos de crear

// Ruta para registrar usuario: POST /api/auth/register
router.post('/register', authController.register);// Cuando alguien haga una petición POST aquí, ejecutará authController.register

// Ruta para iniciar sesión: POST /api/auth/login
router.post('/login', authController.login);// Cuando alguien haga una petición POST aquí, ejecutará authController.login

module.exports = router;// Exportamos el enrutador para usarlo en el archivo principal (index.js)