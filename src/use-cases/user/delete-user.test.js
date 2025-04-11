import { DeleteUserUseCase } from './delete-user.js'
import { userData } from '../../tests/index.js'

describe('Delete User Use Case', () => {
    class deleteUserRepositoryStub {
        async execute(userId) {
            return userId
        }
    }

    const makeSut = () => {
        const deleteUserRepository = new deleteUserRepositoryStub()

        const sut = new DeleteUserUseCase(deleteUserRepository)

        return { sut, deleteUserRepository }
    }

    const deleteUserParams = {
        ...userData,
    }

    it('should delete a user', async () => {
        // arrange
        const { sut } = makeSut()
        const userId = deleteUserParams.id

        // act
        const result = await sut.execute(userId)

        // assert
        expect(result).toBeTruthy()
    })

    it('shoud call deleteUserRepository with correct values', async () => {
        // arrange
        const { sut, deleteUserRepository } = makeSut()
        const deleteUserSpy = jest.spyOn(deleteUserRepository, 'execute')
        const userId = deleteUserParams.id

        // act
        await sut.execute(userId)

        // assert
        expect(deleteUserSpy).toHaveBeenCalledWith(userId)
    })

    // Test Create User Use Case throws an error
    it('should throw an error if deleteUserRepository throws', async () => {
        // arrange
        const { sut, deleteUserRepository } = makeSut()
        jest.spyOn(deleteUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const userId = deleteUserParams.id

        // act
        const result = sut.execute(userId)

        // assert
        expect(result).rejects.toThrow()
    })
})
