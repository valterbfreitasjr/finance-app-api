import { transaction } from './../../tests/index.js'
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
            ...transaction,
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

    // Missing user_id
    it('should return 400 when missing user_id', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                user_id: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing name
    it('should return 400 when missing name', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing date
    it('should return 400 when missing date', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing amount
    it('should return 400 when missing amount', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                amount: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Missing type
    it('should return 400 when missing type', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                type: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Date
    it('should return 400 when date is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: 'invalid_date',
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
            body: {
                ...httpRequest.body,
                type: 'invalid_type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Amount
    it('should return 400 when invalid type of amount is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                amount: 'invalid_type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Create Transaction Error
    it('should return 500 if CreateTransactionUseCase throws an error', async () => {
        // arrange
        const { sut, createTransactionUseCase } = makeSut()
        jest.spyOn(createTransactionUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    // Call CreateTransactionUseCase with correct params
    it('should call CreateTransactionUseCase with correct values', async () => {
        // arrnge
        const { sut, createTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(createTransactionUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
