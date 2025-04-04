import { faker } from '@faker-js/faker'
import { UpdateTrasactionController } from './update-transaction.js'

describe('Update Transaction Controller', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.person.firstName(),
                date: faker.date.anytime().toISOString(),
                type: faker.helpers.arrayElement([
                    'EXPENSE',
                    'EARNING',
                    'INVESTMENT',
                ]),
                amount: Number(faker.finance.amount()),
            }
        }
    }

    const makeSut = () => {
        const updateTransactionUseCaseStub = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTrasactionController(updateTransactionUseCaseStub)

        return { sut, updateTransactionUseCaseStub }
    }

    const httpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.person.firstName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    // Update successfully
    it('should return 200 when updating a transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    // Invalid transaction id
    it('should return 400 if transaction id is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: {
                transactionId: 'invalid-uuid',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Unallowed fields
    it('should return 400 when unallowed fields is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                unallowedField: 'unallowedField',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Amount
    it('should return 400 when invalid amount is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                amount: 'invalid-amount',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Type
    it('should return 400 when invalid type is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                type: 'invalid-type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
