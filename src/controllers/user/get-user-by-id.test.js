import { faker } from '@faker-js/faker'
import { GetUserByIdController } from './get-user-by-id'

describe('Get User By Id Controller', () => {
    class GetUserByIdUseCaseStubStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCaseStub = new GetUserByIdUseCaseStubStub()
        const sut = new GetUserByIdController(getUserByIdUseCaseStub)

        return { getUserByIdUseCaseStub, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    // Get User By Id
    it('should return 200 if user is found', async () => {
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

    // User not found
    it('should return 404 if userId is not found', async () => {
        //arrange
        const { sut, getUserByIdUseCaseStub } = makeSut()
        jest.spyOn(getUserByIdUseCaseStub, 'execute').mockResolvedValue(null)

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(404)
    })

    // Throws Error
    it('should return 500 if GetUserByIdUseCaseStub throws an error', async () => {
        //arrange
        const { sut, getUserByIdUseCaseStub } = makeSut()
        jest.spyOn(getUserByIdUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, getUserByIdUseCaseStub } = makeSut()
        const executeSpy = jest.spyOn(getUserByIdUseCaseStub, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
