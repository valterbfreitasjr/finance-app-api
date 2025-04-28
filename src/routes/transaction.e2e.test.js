import request from 'supertest'
import { app } from '../app'
import { transaction, userData as fakeUser } from '../tests'

describe('Transaction Routes E2E Tests', () => {
    it('POST /api/transactions should return 201 when creating a transaction successfully', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const response = await request(app)
            .post('/api/transactiions')
            .send({ ...transaction, id: createdUser.id })

        expect(response.status).toBe(201)
        expect(response.body.user_id).toBe(createdUser.body.id)
        expect(response.body.type).toBe(transaction.type)
        expect(response.body.amount).toBe(String(transaction.amount))
    })

    it('GET /api/transaction?userId should return 200 when fetching transactions successfully', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const createdTransaction = await request(app)
            .post('/api/transactiions')
            .send({ ...transaction, user_id: createdUser.id, id: undefined })

        const response = await request(app).get(
            `/api/transactions?userId=${createdUser.id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body[0].id).toBe(createdTransaction.id)
    })

    it('PATCH /api/transactions/:transactionId should return 200 when updating a transaction successfully', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const createdTransaction = await request(app)
            .post('/api/transactiions')
            .send({ ...transaction, user_id: createdUser.id, id: undefined })

        const response = await request(app)
            .patch(`/api/transactions/${createdTransaction.id}`)
            .send({ amount: 1000 })

        expect(response.status).toBe(200)
        expect(response.body.amount).toBe(1000)
    })

    it('DELETE /api/:transactionId should returns 200 when deleting a transaction successfully', async () => {
        const createdUser = await request(app)
            .post('/api/users')
            .send({
                ...fakeUser,
                id: undefined,
            })

        const createdTransaction = await request(app)
            .post('/api/transactiions')
            .send({ ...transaction, user_id: createdUser.id, id: undefined })

        const response = await request(app).delete(
            `/api/transactions/${createdTransaction.id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdTransaction.id)
    })
})
