import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user'

describe('Delete User Controller', () => {
    class DeleteUserUseCaseStub {
        execute(user) {
            return user
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
})
