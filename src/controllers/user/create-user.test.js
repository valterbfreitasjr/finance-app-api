import { CreateUserController } from './create-user'
import { EmailAlreadyInUseError } from '../../errors/user'
import { userData } from '../../tests'

describe('Create User Controller', () => {
    const user = {
        ...userData,
    }

    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const sut = new CreateUserController(createUserUseCase)

        return { createUserUseCase, sut }
    }

    const httpRequest = {
        body: {
            ...user,
            id: undefined,
        },
    }

    // Create User
    it('should create an user', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(201)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })

    // Ensure first_name
    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure last_name
    it('should return 400 if last_name is not provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure email
    it('should return 400 if email is not provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure if email is not valid
    it('should return 400 if email is not valid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'xxr',
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure password
    it('should return 400 if password is not provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure password length
    it('should return 400 if password length is less than 6 characters', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: httpRequest.password,
            },
        })

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure correct values are passed to CreateUserUseCase
    it('should call CreateUserUseCase with correct values', async () => {
        //arrange
        const { sut, createUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        //act
        await sut.execute(httpRequest)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if CreateUserUseCase throws an error', async () => {
        //arrange
        const { sut, createUserUseCase } = makeSut()

        jest.spyOn(createUserUseCase, 'execute').mockImplementation(() => {
            throw new Error()
        })

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 400 (badRequest) if email is already in use', async () => {
        //arrange
        const { sut, createUserUseCase } = makeSut()

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError()
        })

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(400)
    })
})
