import request from 'supertest'
import { userData as fakeUser } from '../tests'
import { app } from '../app.js'
import { faker } from '@faker-js/faker'

describe('User Routes E2E Tests', () => {
    it('POST /users should return 201 when user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        expect(response.status).toBe(201)
    })

    it('GET /api/users/:userId should return 200 when user is found', async () => {
        // Create a user
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const response = await request(app).get(
            `/api/users/${createdUser.body.id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdUser.body.id)
        expect(response.body).toEqual(createdUser.body)
    })

    it('PATCH /api/users/:userId should return 200 when user is updated', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const updateUserParams = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        }

        const response = await request(app)
            .patch(`/api/users/${createdUser.body.id}`)
            .send(updateUserParams)

        expect(response.status).toBe(200)
        expect(response.body.firstName).toBe(updateUserParams.first_name)
        expect(response.body.lastName).toBe(updateUserParams.last_name)
        expect(response.body.email).toBe(updateUserParams.email)
        expect(response.body.password).not.toBe(updateUserParams.password)
    })

    it('DELETE /api/users/:userId', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const response = await request(app).delete(
            `/api/users/${createdUser.body.id}`,
        )

        expect(response.status).toBe(200)
    })
})
