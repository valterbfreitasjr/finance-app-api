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

    it('should return 200 when updating a transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })
})
