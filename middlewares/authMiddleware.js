const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Buscamos el token en la cabecera 'Authorization' (formato moderno)
    let token = req.header('Authorization');

    // 2. Limpiamos la palabra "Bearer " si viene en el texto
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    // Si aún así no hay token (o si en el paso 1 no se encontró nada), denegamos el acceso
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
    }

    try {
        // 3. Verificamos la pulsera con el escáner
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = cifrado.user;
        next(); 
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });
    }
};