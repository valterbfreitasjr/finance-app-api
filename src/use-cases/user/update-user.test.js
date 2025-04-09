import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'

describe('Update User Use Case', () => {
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    class UpdateUserRepositoryStub {
        async execute() {
            return user
        }
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password'
        }
    }

    const makeSut = () => {
        const updateUserRepository = new UpdateUserRepositoryStub()
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()

        const sut = new UpdateUserUseCase(
            updateUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
        )

        return {
            sut,
            updateUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
        }
    }

    it('should update user successfully without email and password', async () => {
        // arrange
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        // act
        const result = await sut.execute(userId, {
            firs_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        })

        // assert
        expect(result).toBe(user)
    })

    it('should update user successfully with email', async () => {
        // arrange
        const { sut } = makeSut()
        const userId = faker.string.uuid()

        // act
        const result = await sut.execute(userId, {
            email: faker.internet.email(),
        })

        // assert
        expect(result).toBe(user)
    })

    it('should call GetUserByEmailRepository with correct params', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut()

        const userId = faker.string.uuid()
        const email = faker.internet.email()

        const getUserByEmailRepositorySpy = jest.spyOn(
            getUserByEmailRepository,
            'execute',
        )

        // act
        await sut.execute(userId, {
            email,
        })

        // assert
        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(email)
    })

    it('should update user successfully with password', async () => {
        // arrange
        const { sut, passwordHasherAdapter } = makeSut()

        const userId = faker.string.uuid()
        const password = faker.internet.password()

        const passwordHasherAdapterSpy = jest.spyOn(
            passwordHasherAdapter,
            'execute',
        )

        // act
        const result = await sut.execute(userId, {
            password,
        })

        // assert
        expect(passwordHasherAdapterSpy).toHaveBeenCalledWith(password)
        expect(result).toBe(user)
    })

    it('should throw EmailAlreadyInUseError if email is already in use', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut()

        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValue(user)

        // act
        const result = sut.execute(faker.string.uuid(), {
            email: user.email,
        })

        // assert
        await expect(result).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })

    it('should call UpdateUserRepository with correct params', async () => {
        // arrange
        const { sut, updateUserRepository } = makeSut()
        const userId = faker.string.uuid()
        const updateUserRepositorySpy = jest
            .spyOn(updateUserRepository, 'execute')
            .mockResolvedValue(user)

        // act
        await sut.execute(userId, {
            user,
        })

        // assert
        expect(updateUserRepositorySpy).toHaveBeenCalledWith(userId, {
            user,
        })
    })

    it('should throw if GetUserByEmailRepository throws', async () => {
        // arrange
        const { sut, getUserByEmailRepository } = makeSut()
        const userId = faker.string.uuid()
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        // act
        const result = sut.execute(userId, {
            email: user.email,
        })

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw if updateUserRepository throws', async () => {
        // arrange
        const { sut, updateUserRepository } = makeSut()
        const userId = faker.string.uuid()
        jest.spyOn(updateUserRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        // act
        const result = sut.execute(userId, {
            email: user.email,
        })

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw if passwordHasherAdapter throws', async () => {
        // arrange
        const { sut, passwordHasherAdapter } = makeSut()
        const userId = faker.string.uuid()
        jest.spyOn(passwordHasherAdapter, 'execute').mockRejectedValue(
            new Error(),
        )

        // act
        const result = sut.execute(userId, {
            ...user,
            email: user.password,
        })

        // assert
        expect(result).rejects.toThrow()
    })
})
