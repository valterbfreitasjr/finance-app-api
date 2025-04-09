import { faker } from '@faker-js/faker'
import { GetUserByIdUseCase } from './get-user-by-id'

describe('Get User By Id', () => {
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub()

        const sut = new GetUserByIdUseCase(getUserByIdRepositoryStub)

        return { sut, getUserByIdRepositoryStub }
    }

    it('should get a user by id', async () => {
        // arrange
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        // act
        const result = await sut.execute(userId)

        // assert
        expect(result).toEqual(user)
    })

    it('should GetUserByIdRepository with correct values', async () => {
        // arrange
        const { sut, getUserByIdRepositoryStub } = makeSut()
        const getUserByIdSpy = jest.spyOn(getUserByIdRepositoryStub, 'execute')
        const userId = faker.string.uuid()

        // act
        await sut.execute(userId)

        // assert
        expect(getUserByIdSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw an error if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const userId = faker.string.uuid()

        // act
        const result = sut.execute(userId)

        // assert
        expect(result).rejects.toThrow(new Error())
    })
})
