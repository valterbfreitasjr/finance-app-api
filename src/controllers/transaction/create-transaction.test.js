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
})
