import { faker } from '@faker-js/faker'
import { UpdateUserController } from './update-user'
import { EmailAlreadyInUseError } from '../../errors/user'

describe('Update User Controller', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const updateUserUseCaseStub = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCaseStub)

        return { updateUserUseCaseStub, sut }
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
            params: httpRequest.params,
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
            params: httpRequest.params,
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

    // Unallowed fields
    it('should return 400 if unallowed fiends is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                unallowed_field: 'unallowed',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Error generic
    it('should return 500 if UpdateUserUseCase throws an generic error', async () => {
        // arrange
        const { sut, updateUserUseCaseStub } = makeSut()
        jest.spyOn(updateUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    // Error specific Email Already In Use Error
    it('should return 400 if UpdateUserUseCase throws an EmailAlreadyInUseError', async () => {
        // arrange
        const { sut, updateUserUseCaseStub } = makeSut()
        jest.spyOn(updateUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(faker.internet.email()),
        )

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    // Correct Params
    it('should return 200 when all corrects params are provided', async () => {
        // arrange
        const { sut, updateUserUseCaseStub } = makeSut()
        const executeSpy = jest.spyOn(updateUserUseCaseStub, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.userId,
            httpRequest.body,
        )
    })
})
