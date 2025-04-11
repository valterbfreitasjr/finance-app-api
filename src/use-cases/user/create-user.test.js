import { EmailAlreadyInUseError } from '../../errors/user'
import { userData } from '../../tests'
import { CreateUserUseCase } from './create-user'

describe('Create User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class CreateUserRepositoryStub {
        async execute(user) {
            return user
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed-password'
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'any-id'
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const createUserRepository = new CreateUserRepositoryStub()

        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        )

        return {
            sut,
            createUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        }
    }

    const createUserParams = {
        ...userData,
    }

    // Create User Successfully
    it('should create a user successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(createUserParams)

        // assert
        expect(result).toBeTruthy()
    })

    // EmailAlreadyInUseError
    it('should throws an EmailAlreadyInUseError if email is already in use', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut()

        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValue(
            createUserParams,
        )

        // act
        const result = sut.execute(createUserParams)

        // assert
        await expect(result).rejects.toThrow(
            new EmailAlreadyInUseError(createUserParams.email),
        )
    })

    // Test GetUserByEmailRepository throws an error
    it('should throw an error if getUserByEmailRepository throws', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(createUserParams)

        // assert
        expect(result).rejects.toThrow()
    })

    // Test Create User Use Case throws an error
    it('should throw an error if createUserRepository throws', async () => {
        // arrange
        const { sut, createUserRepository } = makeSut()
        jest.spyOn(createUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(createUserParams)

        // assert
        expect(result).rejects.toThrow()
    })

    // Test idGeneratorAdapter throws an error
    it('should throw an error if idGeneratorAdapter throws', async () => {
        // arrange
        const { sut, idGeneratorAdapter } = makeSut()
        jest.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        // act
        const result = sut.execute(createUserParams)

        // assert
        expect(result).rejects.toThrow()
    })

    // Test passwordHasherAdapter throws an error
    it('should throw an error if passwordHasherAdapter throws', async () => {
        // arrange
        const { sut, passwordHasherAdapter } = makeSut()
        jest.spyOn(passwordHasherAdapter, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )

        // act
        const result = sut.execute(createUserParams)

        // assert
        expect(result).rejects.toThrow()
    })

    // Test idGeneratorAdapter to generate random Id
    it('should call idGeneratorAdapter to generate random Id', async () => {
        // arrange
        const { sut, idGeneratorAdapter, createUserRepository } = makeSut()
        const idGeneratorAdapterSpy = jest.spyOn(idGeneratorAdapter, 'execute')
        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        )

        // act
        await sut.execute(createUserParams)

        // assert
        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...createUserParams,
            id: 'any-id',
            password: 'hashed-password',
        })
    })

    // Test passwordHasherAdapter to hash password
    it('should call passwordHasherAdapter to hash password', async () => {
        // arrange
        const { sut, passwordHasherAdapter, createUserRepository } = makeSut()
        const passwordHasherAdapterSpy = jest.spyOn(
            passwordHasherAdapter,
            'execute',
        )
        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        )

        // act
        await sut.execute(createUserParams)

        // assert
        expect(passwordHasherAdapterSpy).toHaveBeenCalledWith(
            createUserParams.password,
        )
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...createUserParams,
            id: 'any-id',
            password: 'hashed-password',
        })
    })
})
