import request from 'supertest'
import { userData as fakeUser } from '../tests'
import { app } from '../app.js'
import { faker } from '@faker-js/faker'
import { TransactionType } from '@prisma/client'

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

    it('DELETE /api/users/:userId should delete an user on db', async () => {
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
        expect(response.body).toEqual(createdUser)
    })

    it('GET /api/users/:userId/balance', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        await request(app).post('/api/transactions').send({
            userId: createdUser.body.id,
            name: faker.commerce.firstName(),
            date: faker.date.anytime().toISOString(),
            type: TransactionType.EXPENSE,
            amount: 100,
        })

        await request(app).post('/api/transactions').send({
            userId: createdUser.body.id,
            name: faker.commerce.firstName(),
            date: faker.date.anytime().toISOString(),
            type: TransactionType.EARNING,
            amount: 1000,
        })

        await request(app).post('/api/transactions').send({
            userId: createdUser.body.id,
            name: faker.commerce.firstName(),
            date: faker.date.anytime().toISOString(),
            type: TransactionType.INVESTMENT,
            amount: 300,
        })

        const response = await request(app).get(
            `/api/users/${createdUser.body.id}/balance`,
        )

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            earnings: 1000,
            expenses: 100,
            investments: 300,
            balance: 1200,
        })
    })

    it('GET /api/users/:userId should return 404 when user is not found', async () => {
        const response = await request(app).get(
            `/api/users/${faker.string.uuid()}`,
        )

        expect(response.status).toBe(404)
    })

    it('PATCH /api/users/:userId should return 404 if user is not found', async () => {
        const response = await request(app)
            .patch(`/api/users/${faker.string.uuid()}`)
            .send({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            })

        expect(response.status).toBe(404)
    })

    it('POST /api/users should return 400 when the provided e-mail is already in use', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const response = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
                email: createdUser.body.email,
            })

        expect(response.status).toBe(400)
    })
})
