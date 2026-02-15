const mongoose = require('mongoose');

//Molde (Schema) para los productos
const productSchema = new mongoose.Schema({
    // Nombre del producto (ej. "Laptop")
    name: { 
        type: String, 
        required: true 
    },
    // Descripción de lo que hace el producto
    description: { 
        type: String, 
        required: true 
    },
    // Precio del producto, debe ser un número
    price: { 
        type: Number, 
        required: true 
    },
    // ¡Muy importante! Aquí guardamos el ID del usuario que creó este producto
    // Esto es como ponerle una etiqueta de "Propiedad de..." al producto
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Hacemos referencia al modelo 'User'
        required: true 
    }
}, { 
    timestamps: true //guardamos cuándo se creó o modificó el producto
});

module.exports = mongoose.model('Product', productSchema);// Exportamos el modelo llamándolo 'Product'