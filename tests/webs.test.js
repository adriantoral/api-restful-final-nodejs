const request = require('supertest') // Importing the supertest module for HTTP assertions
const app = require('../source/app') // Importing the main app

/**
 * Test suite for Webs routes
 */
describe('Webs routes', () => {
    let
        token = null, // Token for the user
        token_comercio = null, // Token for the commerce
        id_web = null // ID for the web

    /**
     * Test case for registering a new Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should register a new Usuario', async () => {
        // Making a POST request to the signup endpoint
        const response = await request(app)
            .post('/api/v1/usuarios/signup')
            .send({
                nombre: "test_webs",
                email: "test_webs@test.com",
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
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for logging in a Usuario
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should login the Usuario', async () => {
        // Making a POST request to the signin endpoint
        const response = await request(app)
            .post('/api/v1/usuarios/signin')
            .send({
                "email": "test_webs@test.com",
                "password": "test"
            })
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        token = response.body.data // Storing the token for future use
    })

    /**
     * Test case for creating a Comercio
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should create one Comercio', async () => {
        // Making a POST request to the comercios endpoint
        const response = await request(app)
            .post('/api/v1/comercios')
            .auth(token, {type: 'bearer'}) // Using the token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .send({
                nombre: "test",
                cif: "test",
                direccion: "test",
                email: "test_webs@test.com",
                telefono: "+34123456789"
            })
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        token_comercio = response.body.data.jwt // Storing the commerce token for future use
    })

    /**
     * Test case for creating a Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should create one Web', async () => {
        // Making a POST request to the webs endpoint
        const response = await request(app)
            .post('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'}) // Using the commerce token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .send({
                ciudad: "test",
                actividad: "test",
                titulo: "test",
                resumen: "test",
                textos: [
                    "test1",
                    "test2"
                ],
                fotos: [
                    "test1",
                    "test2"
                ]
            })
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        id_web = response.body.data._id // Storing the web ID for future use
    })

    /**
     * Test case for listing all Webs
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should list all Webs', async () => {
        // Making a GET request to the webs endpoint
        const response = await request(app)
            .get('/api/v1/webs')
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for listing all Webs sorted
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should list all Webs sorted', async () => {
        // Making a GET request to the webs endpoint with a sortBy parameter
        const response = await request(app)
            .get('/api/v1/webs?sortBy=ciudad')
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for getting one Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should get one Web', async () => {
        // Making a GET request to the webs endpoint with the id of the web
        const response = await request(app)
            .get(`/api/v1/webs/${id_web}`)
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for updating one Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should update one Web', async () => {
        // Making a PUT request to the webs endpoint
        const response = await request(app)
            .put('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'}) // Using the commerce token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .send({
                ciudad: "test mejorado",
                actividad: "test mejorado",
                titulo: "test",
                resumen: "test",
                textos: [
                    "test1",
                    "test2"
                ],
                fotos: [
                    "test1",
                    "test2"
                ]
            })
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for patching one Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should patch one Web', async () => {
        // Making a PATCH request to the webs endpoint
        const response = await request(app)
            .patch('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'}) // Using the commerce token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .send({
                ciudad: "test mejorado patch",
                actividad: "test mejorado patch",
            })
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for creating a Resenia
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should create one Resenia', async () => {
        // Making a POST request to the resenia endpoint
        const response = await request(app)
            .post(`/api/v1/webs/${id_web}/resenia`)
            .auth(token, {type: 'bearer'}) // Using the user token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .send({
                "resenia": "Me gusta mucho esta web",
                "puntuacion": 5
            })
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for logically deleting one Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    it('Should delete one Web (logico)', async () => {
        // Making a DELETE request to the webs endpoint with a logico parameter
        const response = await request(app)
            .delete('/api/v1/webs?logico=true')
            .auth(token_comercio, {type: 'bearer'}) // Using the commerce token for authentication
            .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
            .expect(200) // Expecting a 200 status code

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for physically deleting one Web
     * It should return a 200 status code and the response body should have a 'data' property
     */
    // it('Should delete one Web (fisico)', async () => {
    //     // Making a DELETE request to the webs endpoint
    //     const response = await request(app)
    //         .delete('/api/v1/webs')
    //         .auth(token_comercio, {type: 'bearer'}) // Using the commerce token for authentication
    //         .set('Accept', 'application/json') // Setting the Accept header to 'application/json'
    //         .expect(200) // Expecting a 200 status code
    //
    //     // Expecting the response to have a 'data' property
    //     expect(response.body).toHaveProperty('data')
    // })
})