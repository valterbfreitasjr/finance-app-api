import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdUseCase } from './get-transaction-by-user-id'

describe('Get Transaction By User Id Use Case', () => {
    const transactionData = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.person.firstName(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: faker.helpers.arrayElement(['EXPENSE', 'EARNING', 'INVESTMENT']),
    }

    class GetTransactionByUserIdRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }

    class GetUserByIdRepositoryStub {
        async execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const getTransactionByUserIdRepository =
            new GetTransactionByUserIdRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const sut = new GetTransactionByUserIdUseCase(
            getTransactionByUserIdRepository,
            getUserByIdRepository,
        )

        return { sut, getTransactionByUserIdRepository, getUserByIdRepository }
    }

    it('should get transaction by user id successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(transactionData)

        // assert
        expect(result).toEqual({ ...transactionData, id: transactionData.id })
    })
})
