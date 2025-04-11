import { UpdateTransactionUseCase } from './update-transaction'
import { transaction } from '../../tests'

describe('', () => {
    const transactionData = {
        ...transaction,
    }

    class UpdateTransactionRepositoryStub {
        async execute(transactionId, updateTransactionParams) {
            return {
                ...updateTransactionParams,
                id: transactionId,
            }
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()

        const sut = new UpdateTransactionUseCase(updateTransactionRepository)

        return { sut, updateTransactionRepository }
    }

    it('should update transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()
        const transactionId = transactionData.id

        // act
        const result = await sut.execute(transactionId, transactionData)

        // assert
        expect(result).toEqual(transactionData)
    })

    it('should call UpdateTransactionRepository with correct values', async () => {
        // arrange
        const { sut, updateTransactionRepository } = makeSut()
        const updateTransactionRepositorySpy = jest.spyOn(
            updateTransactionRepository,
            'execute',
        )
        const transactionId = transactionData.id

        // act
        await sut.execute(transactionId, transactionData)

        // assert
        expect(updateTransactionRepositorySpy).toHaveBeenCalledWith(
            transactionId,
            transactionData,
        )
    })

    it('should UpdateTransactionUseCase throw an error if UpdateTransactionRepository throws', async () => {
        // arrange
        const { sut, updateTransactionRepository } = makeSut()
        jest.spyOn(
            updateTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())
        const transactionId = transactionData.id

        // act
        const result = sut.execute(transactionId, transactionData)

        // assert
        expect(result).rejects.toThrow()
    })
})
