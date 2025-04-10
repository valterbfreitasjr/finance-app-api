export class UpdateTransactionUseCase {
    constructor(UpdateTransactionRepository) {
        this.UpdateTransactionRepository = UpdateTransactionRepository
    }

    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction =
            await this.UpdateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            )

        return updatedTransaction
    }
}
