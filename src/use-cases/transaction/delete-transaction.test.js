import { DeleteTransactionUseCase } from './delete-transaction'
import { transaction } from '../../tests'

describe('Delete Transaction Use Case', () => {
    const transactionData = {
        ...transaction,
    }

    class DeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                ...transactionData,
                id: transactionId,
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()

        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return {
            sut,
            deleteTransactionRepository,
        }
    }

    it('should delete transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(transactionData.id)

        // assert
        expect(result).toEqual({ ...transactionData, id: transactionData.id })
    })

    it('should call DeleteTransactionRepository with correct params', async () => {
        // arrange
        const { sut, deleteTransactionRepository } = makeSut()
        const deleteTransactionRepositorySpy = jest.spyOn(
            deleteTransactionRepository,
            'execute',
        )

        // act
        await sut.execute(transactionData.id)

        // assert
        expect(deleteTransactionRepositorySpy).toHaveBeenCalledWith(
            transactionData.id,
        )
    })

    it('should DeleteTransactionUseCase throw an error if DeleteTransactionRepository throws', async () => {
        // arrange
        const { sut, deleteTransactionRepository } = makeSut()
        jest.spyOn(
            deleteTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(transactionData.id)

        // assert
        expect(result).rejects.toThrow(new Error())
    })
})
