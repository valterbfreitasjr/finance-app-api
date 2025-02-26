import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionByUserIdUseCase {
    constructor(
        postgresGetTransactionByUserIdRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresGetTransactionByUserIdRepository =
            postgresGetTransactionByUserIdRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const userTransactions =
            await this.postgresGetTransactionByUserIdRepository(userId)

        return userTransactions
    }
}
