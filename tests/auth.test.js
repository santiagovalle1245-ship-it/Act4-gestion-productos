
const request = require('supertest');// Importamos supertest, una librería que simula ser Thunder Client para hacer peticiones
const app = require('../index');// Importamos nuestra aplicación (el servidor)
const mongoose = require('mongoose');// Importamos mongoose para poder desconectarnos al final

describe('Pruebas de Rutas de Autenticación', () => {// "describe" agrupa una serie de pruebas relacionadas
    
    // Generamos un correo aleatorio basado en la fecha exacta
    // Esto es para evitar que la prueba falle por intentar registrar un correo que ya existe
    const correoAleatorio = `usuario_${Date.now()}@correo.com`;

    it('Debería registrar un usuario nuevo y devolver un status 201', async () => {// "it" define una prueba individual. Aquí estamos probando el registro de un nuevo usuario
        
        // Simulamos enviar un POST a /api/auth/register
        const respuesta = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Robot Test',
                email: correoAleatorio,
                password: 'password123'
            });

        // "expect" son las reglas de la prueba. 
        expect(respuesta.statusCode).toEqual(201);// Esperamos que el código de estado sea 201 (Creado)
        
        expect(respuesta.body).toHaveProperty('mensaje', 'Usuario creado exitosamente');// Esperamos que el servidor nos haya respondido con el mensaje correcto
    });
});

afterAll(async () => {// "afterAll" se ejecuta cuando terminan todas las pruebas
    await mongoose.connection.close();// Cerramos la conexión a la base de datos para no dejar procesos colgados
});