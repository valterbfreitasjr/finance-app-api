import { UserNotFoundError } from '../../errors/user'

export class UpdateTransactionUseCase {
    constructor(
        postgresUpdateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(userId, updateTransactionParams) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const updatedTransaction =
            await this.postgresUpdateTransactionRepository.execute(
                userId,
                updateTransactionParams,
            )

        return updatedTransaction
    }
}
