import { faker } from '@faker-js/faker'
import { UpdateTransactionUseCase } from './update-transaction'

describe('', () => {
    const transactionData = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.person.firstName(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: faker.helpers.arrayElement(['EXPENSE', 'EARNING', 'INVESTMENT']),
    }

    class UpdateTransactionRepositoryStub {
        async execute(transactionId, updateTransactionParams) {
            return {
                ...updateTransactionParams,
                id: transactionId,
            }
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()

        const sut = new UpdateTransactionUseCase(updateTransactionRepository)

        return { sut, updateTransactionRepository }
    }

    it('should update transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()
        const transactionId = transactionData.id

        // act
        const result = await sut.execute(transactionId, transactionData)

        // assert
        expect(result).toEqual(transactionData)
    })

    it('should call UpdateTransactionRepository with correct values', async () => {
        // arrange
        const { sut, updateTransactionRepository } = makeSut()
        const updateTransactionRepositorySpy = jest.spyOn(
            updateTransactionRepository,
            'execute',
        )
        const transactionId = transactionData.id

        // act
        await sut.execute(transactionId, transactionData)

        // assert
        expect(updateTransactionRepositorySpy).toHaveBeenCalledWith(
            transactionId,
            transactionData,
        )
    })
})
