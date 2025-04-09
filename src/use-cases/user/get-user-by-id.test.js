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
})
