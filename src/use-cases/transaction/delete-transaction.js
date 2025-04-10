import { TransactionNotFoundError } from '../../errors/user.js'

export class DeleteTransactionUseCase {
    constructor(DeleteTransactionRepository, GetTransactionByIdRepository) {
        this.DeleteTransactionRepository = DeleteTransactionRepository
        this.GetTransactionByIdRepository = GetTransactionByIdRepository
    }
    async execute(transactionId, userId) {
        const transaction =
            await this.GetTransactionByIdRepository.execute(transactionId)
        if (!transaction) {
            throw new TransactionNotFoundError()
        }
        if (transaction.user_id !== userId) {
            throw new Error('Forbidden.')
        }
        const deletedTransaction =
            await this.DeleteTransactionRepository.execute(transactionId)
        return deletedTransaction
    }
}
