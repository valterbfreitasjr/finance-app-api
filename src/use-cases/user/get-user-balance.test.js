import { faker } from '@faker-js/faker'
import { GetUserBalanceUseCase } from './get-user-balance'
import { UserNotFoundError } from '../../errors/user'

describe('Get User Balance Use Case', () => {
    class GetUserBalanceRepositoryStub {
        async execute() {
            return {
                earnings: faker.finance.amount(),
                expenses: faker.finance.amount(),
                investments: faker.finance.amount(),
                balance: faker.finance.amount(),
            }
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            }
        }
    }

    const makeSut = () => {
        const getUserBalanceRepository = new GetUserBalanceRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository,
        )

        return {
            sut,
            getUserBalanceRepository,
            getUserByIdRepository,
        }
    }

    it('should get a user balance', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(faker.string.uuid())

        // assert
        expect(result).toBeTruthy()
    })

    it('should throws UserNotFoundError if GetUserByIdRepository returns null', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null)
        const userId = faker.string.uuid()

        // act
        const result = sut.execute(userId)

        // assert
        expect(result).rejects.toThrow(new UserNotFoundError(userId))
    })
})
