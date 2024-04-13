const request = require('supertest') // Importing the supertest module for HTTP assertions
const app = require('../source/app') // Importing the main app

/**
 * Test suite for Comercios routes
 */
describe('Comercios routes', () => {
    let
        token = null // Token for the user

    /**
     * Test case for registering a new Usuario
     */
    it('Should register a new Usuario', async () => {
        // Making a POST request to the signup endpoint
        const response = await request(app)
            .post('/api/v1/usuarios/signup')
            .send({
                nombre: "test_comercios",
                email: "test_comercios@test.com",
                password: "test",
                edad: 21,
                ciudad: "test",
                rol: "admin",
                intereses: [
                    "test",
                    "test"
                ],
                permiteRecibirOfertas: true
            })
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for logging in a Usuario
     */
    it('Should login the Usuario', async () => {
        // Making a POST request to the signin endpoint
        const response = await request(app)
            .post('/api/v1/usuarios/signin')
            .send({
                "email": "test_comercios@test.com",
                "password": "test"
            })
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        token = response.body.data
    })

    /**
     * Test case for creating a Comercio
     */
    it('Should create one Comercio', async () => {
        // Making a POST request to the comercios endpoint
        const response = await request(app)
            .post('/api/v1/comercios')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
            .send({
                nombre: "test",
                cif: "test",
                direccion: "test",
                email: "test_comercios@test.com",
                telefono: "+34123456789"
            })
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for listing all Comercios
     */
    it('Should list all Comercios', async () => {
        // Making a GET request to the comercios endpoint
        const response = await request(app)
            .get('/api/v1/comercios')
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for listing all Comercios sorted
     */
    it('Should list all Comercios sorted', async () => {
        // Making a GET request to the comercios endpoint with a sortBy parameter
        const response = await request(app)
            .get('/api/v1/comercios?sortBy=cif')
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for listing one Comercio
     */
    it('Should list one Comercio', async () => {
        // Making a GET request to the comercios endpoint with the id of the comercio
        const response = await request(app)
            .get('/api/v1/comercios/test')
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for updating one Comercio
     */
    it('Should update one Comercio', async () => {
        // Making a PUT request to the comercios endpoint
        const response = await request(app)
            .put('/api/v1/comercios/test')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
            .send({
                nombre: "test mejorado",
                direccion: "test mejorado",
                email: "test_comercios_mejorado@test.com",
                telefono: "+34123456789"
            })
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for patching one Comercio
     */
    it('Should patch one Comercio', async () => {
        // Making a PATCH request to the comercios endpoint
        const response = await request(app)
            .patch('/api/v1/comercios/test')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
            .send({
                nombre: "test mejorado patch",
                email: "test_comercios_mejorado_patch@test.com"
            })
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for logically deleting one Comercio
     */
    it('Should delete one Comercio (logico)', async () => {
        // Making a DELETE request to the comercios endpoint with a logico parameter
        const response = await request(app)
            .delete('/api/v1/comercios/test?logico=true')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for physically deleting one Comercio
     */
    it('Should delete one Comercio (fisico)', async () => {
        // Making a DELETE request to the comercios endpoint
        const response = await request(app)
            .delete('/api/v1/comercios/test')
            .auth(token, {type: 'bearer'})
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })
})