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
})
