import request from 'supertest'
import { userData as fakeUser } from '../tests'
import { app } from '../app.js'

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

    it('GET /api/users/:id should return 200 when user is found', async () => {
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
        expect(response.body.id).toBe(createdUser.id)
        expect(response.body).toEqual(createdUser)
    })
})
