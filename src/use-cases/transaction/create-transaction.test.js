import { faker } from '@faker-js/faker'
import { CreateTransactionUseCase } from './create-transaction.js'

describe('Create Transaction Use Case', () => {
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    }

    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }

    class GetUserByIdRepositoryStub {
        execute(userId) {
            return { ...user, id: userId }
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'random_id'
        }
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()

        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        }
    }

    const transactionData = {
        user_id: faker.string.uuid(),
        name: faker.person.firstName(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: faker.helpers.arrayElement(['EXPENSE', 'EARNING', 'INVESTMENT']),
    }

    it('should create transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const result = await sut.execute(transactionData)

        // assert
        expect(result).toEqual({ ...transactionData, id: 'random_id' })
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdSpy = jest.spyOn(getUserByIdRepository, 'execute')

        // act
        await sut.execute(transactionData)

        // assert
        expect(getUserByIdSpy).toHaveBeenCalledWith(transactionData.user_id)
    })

    it('should call IdGeneratorAdapter', async () => {
        // arrange
        const { sut, idGeneratorAdapter } = makeSut()
        const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute')

        // act
        await sut.execute(transactionData)

        // assert
        expect(idGeneratorSpy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        // arrange
        const { sut, createTransactionRepository } = makeSut()
        const createTransactionSpy = jest.spyOn(
            createTransactionRepository,
            'execute',
        )

        // act
        await sut.execute(transactionData)

        // assert
        expect(createTransactionSpy).toHaveBeenCalledWith({
            ...transactionData,
            id: 'random_id',
        })
    })
})
