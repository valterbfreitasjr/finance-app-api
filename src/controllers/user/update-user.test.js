import { faker } from '@faker-js/faker'
import { UpdateUserController } from './update-user'

describe('Update User Controller', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { updateUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        },
    }

    it('should return 200 if user is updated', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
        expect(result.body).not.toBeUndefined()
    })

    // Invalid e-mail
    it('should return 400 if e-mail is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                email: 'invalid-email',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid Password
    it('should return 400 if password is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({ length: 5 }),
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Invalid UserId
    it('should return 400 if UserId is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: {
                userId: 'invalid-user-id',
            },
            body: httpRequest.body,
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
