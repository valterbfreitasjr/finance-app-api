import { EmailAlreadyInUseError } from '../../errors/user'
import { CreateUserUseCase } from './create-user'
import { faker } from '@faker-js/faker'

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
        const GetUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const CreateUserRepository = new CreateUserRepositoryStub()

        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateUserUseCase(
            CreateUserRepository,
            GetUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        )

        return {
            sut,
            CreateUserRepository,
            GetUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        }
    }

    const createUserParams = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
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
        const { sut, GetUserByEmailRepository } = makeSut()

        jest.spyOn(GetUserByEmailRepository, 'execute').mockResolvedValue(
            createUserParams,
        )

        // act
        const result = sut.execute(createUserParams)

        // assert
        await expect(result).rejects.toThrow(
            new EmailAlreadyInUseError(createUserParams.email),
        )
    })
})
