import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionByUserIdUseCase {
    constructor(GetTransactionByUserIdRepository, GetUserByIdRepository) {
        this.GetTransactionByUserIdRepository = GetTransactionByUserIdRepository
        this.GetUserByIdRepository = GetUserByIdRepository
    }

    async execute(userId) {
        const user = await this.GetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const userTransactions =
            await this.GetTransactionByUserIdRepository.execute(userId)

        return userTransactions
    }
}
