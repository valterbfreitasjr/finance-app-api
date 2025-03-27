import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user'

describe('Delete User Controller', () => {
    class DeleteUserUseCaseStub {
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
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserController(deleteUserUseCase)

        return { deleteUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    // Delete User
    it('should  return 200 if user is deleted', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(200)
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
    it('should return 404 if user is not found', async () => {
        //arrange
        const { deleteUserUseCase, sut } = makeSut()
        jest.spyOn(deleteUserUseCase, 'execute').mockReturnValue(null)

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(404)
    })

    // Server Error
    it('should return 500 if DeleteUserUseCase throws an error', async () => {
        //arrange
        const { deleteUserUseCase, sut } = makeSut()
        jest.spyOn(deleteUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(500)
    })
})
