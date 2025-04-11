import { DeleteTransactionController } from './delete-transaction'
import { transaction, userData } from '../../tests'

describe('Delete Transaction Controller', () => {
    class DeleteTransactionUseCaseStub {
        async execute() {
            return {
                ...transaction,
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)

        return {
            sut,
            deleteTransactionUseCase,
        }
    }

    const user = {
        ...userData,
    }

    const httpRequest = {
        params: {
            transactionId: transaction.id,
        },
        body: {
            user_id: user.id,
        },
    }

    // Deleted transaction successfully
    it('should return 200', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    // Invalid transaction_id
    it('should return 400', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            params: {
                transactionId: 'invalid_id',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid user_id
    it('should return 400', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                user_id: 'invalid_id',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Transaction not found
    it('should return 404 if transaction is not found', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut()
        jest.spyOn(deleteTransactionUseCase, 'execute').mockResolvedValueOnce(
            null,
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
        expect(result.body.message).toBe('Transaction not found.')
    })

    // DeleteTransactionUseCase throws an error
    it('should return 500 if DeleteTransactionUseCase throws an error', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut()
        jest.spyOn(deleteTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(deleteTransactionUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.transactionId,
            httpRequest.body.user_id,
        )
    })
})
