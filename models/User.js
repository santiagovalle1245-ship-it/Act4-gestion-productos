const mongoose = require('mongoose');// Importamos mongoose para poder crear nuestro modelo de usuario

const userSchema = new mongoose.Schema({// Creamos el "molde" (Schema) para los usuarios
    // El nombre es un texto (String) y es obligatorio (required)
    name: { 
        type: String, 
        required: true 
    },
    // El correo es un texto, obligatorio, y NO se puede repetir (unique)
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    // La contraseña es texto y es obligatoria
    password: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true // Esto agrega automáticamente la fecha de creación y de modificación a cada usuario
});

module.exports = mongoose.model('User', userSchema);// Exportamos el modelo para usarlo en otras partes. Lo llamamos 'User'