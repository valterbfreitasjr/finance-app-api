import { userNotFoundResponse } from '../../controllers/helpers/index.js'

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
            return userNotFoundResponse()
        }

        const userTransactions =
            await this.postgresGetTransactionByUserIdRepository(userId)

        return userTransactions
    }
}
