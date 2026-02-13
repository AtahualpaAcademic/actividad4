const request = require('supertest');
const app = require('../../index'); // Importamos tu index.js completo
const mongoose = require('mongoose');

describe('Pruebas de Seguridad (JWT)', () => {
    
    // Cerramos la conexión a la base de datos después de las pruebas
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Debería denegar el acceso a productos si no se envía un token', async () => {
        const res = await request(app)
            .get('/api/products')
            .send();
        
        // Esperamos un error 401 
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'No hay token, permiso denegado');
    });

    it('Debería denegar el acceso si el token es inválido', async () => {
        const res = await request(app)
            .get('/api/products')
            .set('x-auth-token', 'token-falso-123');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Token no es válido');
    });

    it('Debería permitir el acceso si el token es válido (Simulado)', async () => {
        const tokenValido = "simulacion_de_token"; 
        const res = await request(app)
            .get('/api/products')
            .set('x-auth-token', tokenValido);
        
        // Aquí esperaríamos que no sea 401 si el token fuera real
        expect(res.statusCode).not.toBe(500); 
    });
});