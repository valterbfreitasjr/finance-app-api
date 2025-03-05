import { TransactionNotFoundError } from '../../errors/user.js'

export class DeleteTransactionUseCase {
    constructor(
        postgresDeleteTransactionRepository,
        postgresGetTransactionByIdRepository,
    ) {
        this.postgresDeleteTransactionRepository =
            postgresDeleteTransactionRepository
        this.postgresGetTransactionByIdRepository =
            postgresGetTransactionByIdRepository
    }
    async execute(transactionId, userId) {
        const transaction =
            await this.postgresGetTransactionByIdRepository.execute(
                transactionId,
            )
        if (!transaction) {
            throw new TransactionNotFoundError()
        }
        if (transaction.user_id !== userId) {
            throw new Error('Forbidden.')
        }
        const deletedTransaction =
            await this.postgresDeleteTransactionRepository.execute(
                transactionId,
            )
        return deletedTransaction
    }
}
