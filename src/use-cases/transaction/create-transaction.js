import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
        idGeneratorAdapter,
    ) {
        ;(this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository),
            (this.postgresGetUserByIdRepository = postgresGetUserByIdRepository)
        this.idGeneratorAdapter = idGeneratorAdapter
    }
    async execute(createTransactionParams) {
        // TODO - Verificar se o usuário existe
        const userId = createTransactionParams.user_id

        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) throw new UserNotFoundError(userId)

        //gerar uuid
        const transactionId = this.idGeneratorAdapter.execute()

        //criar transaction
        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        const createdTransaction =
            await this.postgresCreateTransactionRepository.execute(transaction)

        return createdTransaction
    }
}
