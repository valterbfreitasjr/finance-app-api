import { CreateTransactionUseCase } from './create-transaction.js'
import { UserNotFoundError } from '../../errors/user.js'
import { transaction, userData } from '../../tests/index.js'

describe('Create Transaction Use Case', () => {
    const user = {
        ...userData,
    }

    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }

    class GetUserByIdRepositoryStub {
        execute(userId) {
            return { ...user, id: userId }
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'random_id'
        }
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()

        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        }
    }

    const transactionData = {
        ...transaction,
        id: undefined,
    }

    it('should create transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(transactionData)

        // assert
        expect(result).toEqual({ ...transactionData, id: 'random_id' })
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdSpy = jest.spyOn(getUserByIdRepository, 'execute')

        // act
        await sut.execute(transactionData)

        // assert
        expect(getUserByIdSpy).toHaveBeenCalledWith(transactionData.user_id)
    })

    it('should call IdGeneratorAdapter', async () => {
        // arrange
        const { sut, idGeneratorAdapter } = makeSut()
        const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute')

        // act
        await sut.execute(transactionData)

        // assert
        expect(idGeneratorSpy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        // arrange
        const { sut, createTransactionRepository } = makeSut()
        const createTransactionSpy = jest.spyOn(
            createTransactionRepository,
            'execute',
        )

        // act
        await sut.execute(transactionData)

        // assert
        expect(createTransactionSpy).toHaveBeenCalledWith({
            ...transactionData,
            id: 'random_id',
        })
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null)

        // act
        const result = sut.execute(transactionData)

        // assert
        await expect(result).rejects.toThrow(
            new UserNotFoundError(transactionData.user_id),
        )
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(transactionData)

        // assert
        await expect(result).rejects.toThrow(new Error())
    })

    it('should throw if IdGeneratorAdapter throws', async () => {
        // arrange
        const { sut, idGeneratorAdapter } = makeSut()
        jest.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        // act
        const result = sut.execute(transactionData)

        // assert
        await expect(result).rejects.toThrow(new Error())
    })

    it('should throw if CreateTransactionRepository throws', async () => {
        // arrange
        const { sut, createTransactionRepository } = makeSut()
        jest.spyOn(
            createTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(transactionData)

        // assert
        await expect(result).rejects.toThrow(new Error())
    })
})
