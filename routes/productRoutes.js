// Importamos Express para crear el enrutador
const express = require('express');
const router = express.Router();

// Importamos a nuestro controlador (el cocinero) y al middleware (el guardia)
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, productController.createProduct);// Ruta para CREAR un producto (POST /api/products)

router.get('/', auth, productController.getProducts);// Ruta para OBTENER todos los productos (GET /api/products)

router.put('/:id', auth, productController.updateProduct);// Ruta para ACTUALIZAR un producto (PUT /api/products/:id)

router.delete('/:id', auth, productController.deleteProduct);// Ruta para ELIMINAR un producto (DELETE /api/products/:id)

module.exports = router;// Exportamos las rutas