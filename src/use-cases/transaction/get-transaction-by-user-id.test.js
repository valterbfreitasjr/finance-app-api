import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdUseCase } from './get-transaction-by-user-id'
import { UserNotFoundError } from '../../errors/user'

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

    it('should GetTransactionByUserIdUseCase throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null)
        const userId = transactionData.user_id

        // act
        const result = sut.execute(userId)

        // assert
        expect(result).rejects.toThrow(new UserNotFoundError(userId))
    })

    it('should call GetUserByIdRepository with corrects values', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        )
        const userId = transactionData.user_id

        // act
        await sut.execute(userId)

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetTransactionByUserIdRepository with corrects values', async () => {
        // arrange
        const { sut, getTransactionByUserIdRepository } = makeSut()
        const getTransactionByUserIdRepositorySpy = jest.spyOn(
            getTransactionByUserIdRepository,
            'execute',
        )
        const userId = transactionData.user_id

        // act
        await sut.execute(userId)

        // assert
        expect(getTransactionByUserIdRepositorySpy).toHaveBeenCalledWith(userId)
    })
})
