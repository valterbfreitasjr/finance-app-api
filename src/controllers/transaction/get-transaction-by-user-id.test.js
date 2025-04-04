import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdController } from './get-transaction-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('Get Transaction By User Id', () => {
    class GetTransactionByUserIdUseCaseStub {
        async execute() {
            return [
                {
                    id: faker.string.uuid(),
                    user_id: faker.string.uuid(),
                    name: faker.person.firstName(),
                    date: faker.date.anytime().toISOString(),
                    type: faker.helpers.arrayElement([
                        'EXPENSE',
                        'EARNING',
                        'INVESTMENT',
                    ]),
                    amount: Number(faker.finance.amount()),
                },
            ]
        }
    }

    const makeSut = () => {
        const getTransactionByUserIdUseCaseStub =
            new GetTransactionByUserIdUseCaseStub()
        const sut = new GetTransactionByUserIdController(
            getTransactionByUserIdUseCaseStub,
        )

        return { sut, getTransactionByUserIdUseCaseStub }
    }

    const httpRequest = {
        query: {
            userId: faker.string.uuid(),
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
        const { sut, getTransactionByUserIdUseCaseStub } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCaseStub,
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
        const { sut, getTransactionByUserIdUseCaseStub } = makeSut()
        jest.spyOn(
            getTransactionByUserIdUseCaseStub,
            'execute',
        ).mockRejectedValueOnce(new Error())

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })
})
