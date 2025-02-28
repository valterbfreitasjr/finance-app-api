import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(
        postgresGetUserBalanceRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) throw new UserNotFoundError(userId)

        const balance =
            await this.postgresGetUserBalanceRepository.execute(user)

        return balance
    }
}
