// Importamos el molde (Modelo) de Producto
const Product = require('../models/Product');

// 1. CREAR un producto (Create)
exports.createProduct = async (req, res) => {
    try {
        // Creamos un nuevo producto con los datos que envía el usuario
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user: req.user.id //Sacamos el ID del usuario directamente del guardia de seguridad (req.user.id)
        });

        // Guardamos el producto en MongoDB
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

// 2. OBTENER todos los productos (Read)
exports.getProducts = async (req, res) => {
    try {
        // Buscamos en la base de datos TODOS los productos que le pertenezcan a este usuario
        const products = await Product.find({ user: req.user.id });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

// 3. ACTUALIZAR un producto (Update)
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);// req.params.id es el ID del producto que viene en la URL

        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Verificamos que el usuario que intenta editar sea el dueño del producto
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ mensaje: 'No autorizado para editar este producto' });
        }

        // Actualizamos el producto en la base de datos
        product = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, // $set le dice a Mongo que actualice solo los campos enviados
            { new: true } //devuelve el producto ya actualizado
        );

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
};

// 4. ELIMINAR un producto (Delete)
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ mensaje: 'No autorizado para eliminar este producto' });
        }

        // Se elimina el producto de la base de datos
        await Product.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
};