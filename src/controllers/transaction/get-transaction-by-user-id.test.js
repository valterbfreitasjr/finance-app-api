import { GetTransactionByUserIdController } from './get-transaction-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'
import { transaction, userData } from '../../tests/index.js'

describe('Get Transaction By User Id', () => {
    class GetTransactionByUserIdUseCaseStub {
        async execute() {
            return [
                {
                    ...transaction,
                },
            ]
        }
    }

    const makeSut = () => {
        const getTransactionByUserIdUseCase =
            new GetTransactionByUserIdUseCaseStub()
        const sut = new GetTransactionByUserIdController(
            getTransactionByUserIdUseCase,
        )

        return { sut, getTransactionByUserIdUseCase }
    }

    const user = {
        ...userData,
    }

    const httpRequest = {
        query: {
            userId: user.id,
        },
    }

    // User transactions found
    it('should return 200 when finding transaction by user id successfully ', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    // Missing userId
    it('should return 400 if missing user_id', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            query: {
                userId: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid userId
    it('should return 400 if invalid user_id', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            query: {
                userId: 'invalid_user_id',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Transaction not found
    it('should return 404 when GetTransactionByUserIdUseCase throws an error UserNotFoundError ', async () => {
        // arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
        expect(result.body.message).toBe('User not found')
    })

    // Server error
    it('should return 500 if GetTransactionByUserIdUseCase throws an error', async () => {
        // arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        const executeSpy = jest.spyOn(getTransactionByUserIdUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.query.userId)
    })
})
