import { DeleteUserController } from './delete-user'
import { userData } from '../../tests'
import { UserNotFoundError } from '../../errors/user'

describe('Delete User Controller', () => {
    const user = {
        ...userData,
    }

    class DeleteUserUseCaseStubStub {
        async execute(user) {
            return {
                user,
            }
        }
    }

    const makeSut = () => {
        const deleteUserUseCaseStub = new DeleteUserUseCaseStubStub()
        const sut = new DeleteUserController(deleteUserUseCaseStub)

        return { deleteUserUseCaseStub, sut }
    }

    const httpRequest = {
        params: {
            userId: user.id,
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
        expect(result.statusCode).toBe(400)
    })

    // User not found
    it('should return 404 if user is not found', async () => {
        //arrange
        const { deleteUserUseCaseStub, sut } = makeSut()
        jest.spyOn(deleteUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(404)
    })

    // Server Error
    it('should return 500 if DeleteUserUseCaseStub throws an error', async () => {
        //arrange
        const { deleteUserUseCaseStub, sut } = makeSut()
        jest.spyOn(deleteUserUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, deleteUserUseCaseStub } = makeSut()
        const executeSpy = jest.spyOn(deleteUserUseCaseStub, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
