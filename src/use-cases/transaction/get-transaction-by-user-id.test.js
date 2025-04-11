import { GetTransactionByUserIdUseCase } from './get-transaction-by-user-id'
import { UserNotFoundError } from '../../errors/user'
import { transaction } from '../../tests'

describe('Get Transaction By User Id Use Case', () => {
    const transactionData = {
        ...transaction,
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

    it('should throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(transactionData.user_id)

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw if GetTransactionByUserIdRepository throws', async () => {
        // arrange
        const { sut, getTransactionByUserIdRepository } = makeSut()
        jest.spyOn(
            getTransactionByUserIdRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(transactionData.user_id)

        // assert
        expect(result).rejects.toThrow()
    })
})
