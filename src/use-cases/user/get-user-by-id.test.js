import { GetUserByIdUseCase } from './get-user-by-id'
import { userData } from '../../tests'

describe('Get User By Id', () => {
    const user = {
        ...userData,
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const sut = new GetUserByIdUseCase(getUserByIdRepository)

        return { sut, getUserByIdRepository }
    }

    it('should get a user by id', async () => {
        // arrange
        const { sut } = makeSut()
        const userId = user.id

        // act
        const result = await sut.execute(userId)

        // assert
        expect(result).toEqual(user)
    })

    it('should GetUserByIdRepository with correct values', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdSpy = jest.spyOn(getUserByIdRepository, 'execute')
        const userId = user.id

        // act
        await sut.execute(userId)

        // assert
        expect(getUserByIdSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw an error if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const userId = user.id

        // act
        const result = sut.execute(userId)

        // assert
        expect(result).rejects.toThrow(new Error())
    })
})
