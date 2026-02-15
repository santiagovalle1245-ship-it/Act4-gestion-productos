const mongoose = require('mongoose');

// Creamos una función asíncrona (porque conectarse a internet toma tiempo)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);// Nos conectarnos usando la URL que se guardo en el archivo .env
        console.log('¡Base de datos MongoDB conectada con éxito!');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
 
        process.exit(1); 
    }
};

module.exports = connectDB;// Exportamos la función para poder usarla en otros archivos