const jwt = require('jsonwebtoken');// Importamos jsonwebtoken para poder "leer" y verificar el gafete

// Exportamos la función del guardia de seguridad
module.exports = function(req, res, next) {
    
    const token = req.header('x-auth-token');// 1. El guardia pide el gafete. Lo busca en la cabecera (header) de la petición

    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });// 2. Si el usuario no trae gafete (token), le negamos la entrada
    }

    // 3. Si trae gafete, el guardia saca su escáner para verificar que sea auténtico
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);// Verificamos el token usando nuestra palabra secreta del archivo .env
        
        // Si es válido, extraemos los datos del usuario (su ID) y se los pegamos a la petición (req)
        // Así, los "cocineros" (controladores) sabrán exactamente qué usuario está haciendo la petición
        req.user = cifrado.user;
        
        next(); // Le decimos al guardia: "Todo en orden, déjalo pasar a la siguiente función"
        
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });// Si el escáner detecta que el token es falso o ya caducó, lo rebotamos
    }
};