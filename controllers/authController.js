const User = require('../models/User');// Importamos nuestro modelo de Usuario (el molde que creamos antes)
const bcrypt = require('bcryptjs');// Importamos bcryptjs para encriptar contraseñas
const jwt = require('jsonwebtoken');// Importamos jsonwebtoken para crear los "gafetes" de seguridad

// Función para REGISTRAR un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;// Extraemos los datos que el usuario nos envía en el "cuerpo" de la petición (body)

        // 1. Verificamos si el usuario ya existe en la base de datos buscando por correo
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        user = new User({ name, email, password });// 2. Si no existe, creamos un nuevo usuario con los datos recibidos

        // 3. Encriptamos la contraseña ANTES de guardarla
        // 'salt' es como una cadena aleatoria extra para hacer la contraseña más segura
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();// 4. Guardamos el usuario en la base de datos de MongoDB

        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });// 5. Respondemos que todo salió bien (Status 201: Creado)

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};

// Función para INICIAR SESIÓN (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;// Extraemos el correo y contraseña que nos envía el usuario

        // 1. Buscamos si el correo existe en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });// Si no existe, mandamos error
        }

        // 2. Comparamos la contraseña que nos dio el usuario con la encriptada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });// Si no coinciden, mandamos error
        }

        // 3. Si todo es correcto, creamos el "Gafete" (JWT)
        const payload = {// El 'payload' es la información pública que llevará el gafete (el ID del usuario)
            user: { id: user._id }
        };

        // Firmamos el token con nuestra palabra secreta (JWT_SECRET del .env)
        // Y le decimos que caduca en 1 hora (1h)
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) throw error;
                res.json({ token });// Enviamos el token al usuario para que lo guarde
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};