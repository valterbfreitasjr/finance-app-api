export class UpdateTransactionUseCase {
    constructor(
        postgresUpdateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
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
