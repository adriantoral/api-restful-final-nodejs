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
                "email": "test_webs@test.com",
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
                email: "test_webs@test.com",
                telefono: "+34123456789"
            })
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        token_comercio = response.body.data.jwt
    })

    /**
     * Test case for creating a Web
     */
    it('Should create one Web', async () => {
        // Making a POST request to the webs endpoint
        const response = await request(app)
            .post('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'})
            .set('Accept', 'application/json')
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
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
        id_web = response.body.data._id
    })

    /**
     * Test case for listing all Webs
     */
    it('Should list all Webs', async () => {
        // Making a GET request to the webs endpoint
        const response = await request(app)
            .get('/api/v1/webs')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for listing all Webs sorted
     */
    it('Should list all Webs sorted', async () => {
        // Making a GET request to the webs endpoint with a sortBy parameter
        const response = await request(app)
            .get('/api/v1/webs?sortBy=ciudad')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for getting one Web
     */
    it('Should get one Web', async () => {
        // Making a GET request to the webs endpoint with the id of the web
        const response = await request(app)
            .get(`/api/v1/webs/${id_web}`)
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for updating one Web
     */
    it('Should update one Web', async () => {
        // Making a PUT request to the webs endpoint
        const response = await request(app)
            .put('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'})
            .set('Accept', 'application/json')
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
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for patching one Web
     */
    it('Should patch one Web', async () => {
        // Making a PATCH request to the webs endpoint
        const response = await request(app)
            .patch('/api/v1/webs')
            .auth(token_comercio, {type: 'bearer'})
            .set('Accept', 'application/json')
            .send({
                ciudad: "test mejorado patch",
                actividad: "test mejorado patch",
            })
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for logically deleting one Web
     */
    it('Should delete one Web (logico)', async () => {
        // Making a DELETE request to the webs endpoint with a logico parameter
        const response = await request(app)
            .delete('/api/v1/webs?logico=true')
            .auth(token_comercio, {type: 'bearer'})
            .set('Accept', 'application/json')
            .expect(200)

        // Expecting the response to have a 'data' property
        expect(response.body).toHaveProperty('data')
    })

    /**
     * Test case for physically deleting one Web
     */
    // it('Should delete one Web (fisico)', async () => {
    //     // Making a DELETE request to the webs endpoint
    //     const response = await request(app)
    //         .delete('/api/v1/webs')
    //         .auth(token_comercio, {type: 'bearer'})
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //
    //     // Expecting the response to have a 'data' property
    //     expect(response.body).toHaveProperty('data')
    // })
})