import { faker } from '@faker-js/faker'
import { GetUserBalanceUseCase } from './get-user-balance'
import { UserNotFoundError } from '../../errors/user'
import { userData } from '../../tests'

describe('Get User Balance Use Case', () => {
    const user = {
        ...userData,
    }
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
                user,
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

    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdSpy = jest.spyOn(getUserByIdRepository, 'execute')
        const userId = faker.string.uuid()

        // act
        await sut.execute(userId)

        // assert
        expect(getUserByIdSpy).toHaveBeenCalledWith(userId)
    })

    it('should call GetUserBalanceRepository with correct params', async () => {
        // arrange
        const { sut, getUserBalanceRepository } = makeSut()
        const getUserBalanceSpy = jest.spyOn(
            getUserBalanceRepository,
            'execute',
        )
        const userId = faker.string.uuid()

        // act
        await sut.execute(userId)

        // assert
        expect(getUserBalanceSpy).toHaveBeenCalledWith(userId)
    })

    it('should throw an error if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(faker.string.uuid())

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw an error if GetUserBalanceRepository throws', async () => {
        // arrange
        const { sut, getUserBalanceRepository } = makeSut()
        jest.spyOn(getUserBalanceRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(faker.string.uuid())

        // assert
        expect(result).rejects.toThrow()
    })
})
