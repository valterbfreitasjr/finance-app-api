import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction'

describe('Create Transaction Controller', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { createTransactionUseCase, sut }
    }

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.person.firstName(),
            date: faker.date.anytime().toISOString(),
            type: faker.helpers.arrayElement([
                'EXPENSE',
                'EARNING',
                'INVESTMENT',
            ]),
            amount: Number(faker.finance.amount()),
        },
    }

    // Valid transaction
    it('should return 201 when transaction is created', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeUndefined()
    })

    // Missing user_id
    it('should return 400 when missing user_id', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                user_id: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing name
    it('should return 400 when missing name', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing date
    it('should return 400 when missing date', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing amount
    it('should return 400 when missing amount', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                amount: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing type
    it('should return 400 when missing type', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                type: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Date
    it('should return 400 when date is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: 'invalid_date',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
