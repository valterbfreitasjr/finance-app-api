import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from './get-user-balance.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('Get User Balance Controller', () => {
    class GetUserBalanceUseCaseStubStub {
        async execute() {
            return faker.number.int()
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCaseStub = new GetUserBalanceUseCaseStubStub()
        const sut = new GetUserBalanceController(getUserBalanceUseCaseStub)

        return { getUserBalanceUseCaseStub, sut }
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
    it('should return 500 if GetUserBalanceUseCaseStub throws an error', async () => {
        //arrange
        const { sut, getUserBalanceUseCaseStub } = makeSut()
        jest.spyOn(getUserBalanceUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    // Throws userNotFoundResponse
    it('should return 404 if GetUserBalanceUseCase throws UserNotFoundError', async () => {
        //arrange
        const { sut, getUserBalanceUseCaseStub } = makeSut()
        jest.spyOn(getUserBalanceUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new UserNotFoundError()
            },
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(404)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, getUserBalanceUseCaseStub } = makeSut()
        const executeSpy = jest.spyOn(getUserBalanceUseCaseStub, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
