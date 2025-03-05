export class UpdateTransactionUseCase {
    constructor(postgresUpdateTransactionRepository) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository
    }

    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction =
            await this.postgresUpdateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            )

        return updatedTransaction
    }
}
