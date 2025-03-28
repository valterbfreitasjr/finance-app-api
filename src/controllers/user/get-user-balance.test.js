import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from './get-user-balance'

describe('Get User Balance Controller', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.number.int()
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub()
        const sut = new GetUserBalanceController(getUserBalanceUseCase)

        return { getUserBalanceUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    // Get User Balance
    it('should  return 200 if balance is found', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(200)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })

    // Ensure userId
    it('should return 400 if userId is not valid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Throws Error
    it('should return 500 if GetUserBalanceUseCase throws an error', async () => {
        //arrange
        const { sut, getUserBalanceUseCase } = makeSut()
        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })
})
