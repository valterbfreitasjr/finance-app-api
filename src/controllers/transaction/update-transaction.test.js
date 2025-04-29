import { UpdateTransactionController } from './update-transaction.js'
import { transaction, userData } from '../../tests/index.js'
import { TransactionNotFoundError } from '../../errors/transaction.js'

describe('Update Transaction Controller', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                ...transaction,
            }
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    const user = {
        ...userData,
    }

    const httpRequest = {
        params: {
            transactionId: transaction.id,
        },
        body: {
            name: user.name,
            date: user.date,
            type: user.type,
            amount: user.amount,
        },
    }

    // Update successfully
    it('should return 200 when updating a transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    // Invalid transaction id
    it('should return 400 if transaction id is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: {
                transactionId: 'invalid-uuid',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Unallowed fields
    it('should return 400 when unallowed fields is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                unallowedField: 'unallowedField',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Amount
    it('should return 400 when invalid amount is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                amount: 'invalid-amount',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Type
    it('should return 400 when invalid type is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                type: 'invalid-type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid date
    it('should return 400 when invalid date is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                date: 'invalid-date',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, updateTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(updateTransactionUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.transactionId,
            httpRequest.body,
        )
    })

    // Error
    it('should return 500 when UpdateTransactionUseCase throws an error', async () => {
        // arrange
        const { sut, updateTransactionUseCase } = makeSut()

        jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 404 when UserNotFoundResponse, is thrown', async () => {
        // arrange
        const { sut, updateTransactionUseCase } = makeSut()
        jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(
            new TransactionNotFoundError(),
        )

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(404)
    })
})
