const request = require('supertest') // Importing supertest for HTTP assertions
const app = require('../source/app') // Importing the Express.js application

/**
 * Test suite for the Usuarios routes
 */
describe('Usuarios routes', () => {
    let
        token = null

    /**
     * Test case for registering a new Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should register a new Usuario', async () => {
        const response = await request(app)
            .post('/api/v1/usuarios/signup') // Making a POST request to /api/v1/usuarios/signup
            .send({
                nombre: "test_usuarios",
                email: "test_usuarios@test.com",
                password: "test",
                edad: 21,
                ciudad: "test",
                rol: "usuario",
                intereses: [
                    "test",
                    "test"
                ],
                permiteRecibirOfertas: true
            })
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        expect(response.body).toHaveProperty('data') // Expecting the response body to have a 'data' property
    })

    /**
     * Test case for logging in the Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should login the Usuario', async () => {
        const response = await request(app)
            .post('/api/v1/usuarios/signin') // Making a POST request to /api/v1/usuarios/signin
            .send({
                "email": "test_usuarios@test.com",
                "password": "test"
            })
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        expect(response.body).toHaveProperty('data') // Expecting the response body to have a 'data' property
        token = response.body.data // Storing the token
    })

    /**
     * Test case for updating the Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should update the Usuario', async () => {
        const response = await request(app)
            .put('/api/v1/usuarios/me') // Making a PUT request to /api/v1/usuarios/me
            .auth(token, {type: 'bearer'})
            .send({
                "nombre": "Usuario mejorado",
                "email": "usuario@usuario.com",
                "password": "123456",
                "edad": 21,
                "ciudad": "Madrid",
                "rol": "usuario",
                "intereses": [
                    "tecnologia",
                    "deportes"
                ],
                "permiteRecibirOfertas": true
            })
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        expect(response.body).toHaveProperty('data') // Expecting the response body to have a 'data' property
    })

    /**
     * Test case for deleting the Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should delete the Usuario', async () => {
        const response = await request(app)
            .delete('/api/v1/usuarios/me') // Making a DELETE request to /api/v1/usuarios/me
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        expect(response.body).toHaveProperty('data') // Expecting the response body to have a 'data' property
    })

    /**
     * Test case for getting the Usuario by ciudad
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should get the Usuario by ciudad', async () => {
        const response = await request(app)
            .get('/api/v1/usuarios/ciudad/test') // Making a GET request to /api/v1/usuarios/ciudad/test
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        expect(response.body).toHaveProperty('data') // Expecting the response body to have a 'data' property
    })
})