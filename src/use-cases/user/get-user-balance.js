import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(GetUserBalanceRepository, GetUserByIdRepository) {
        this.GetUserBalanceRepository = GetUserBalanceRepository
        this.GetUserByIdRepository = GetUserByIdRepository
    }

    async execute(userId) {
        const user = await this.GetUserByIdRepository.execute(userId)

        if (!user) throw new UserNotFoundError(userId)

        const balance = await this.GetUserBalanceRepository.execute(userId)

        return balance
    }
}
