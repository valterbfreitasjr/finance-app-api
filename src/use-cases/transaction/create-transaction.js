import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        CreateTransactionRepository,
        GetUserByIdRepository,
        idGeneratorAdapter,
    ) {
        ;(this.CreateTransactionRepository = CreateTransactionRepository),
            (this.GetUserByIdRepository = GetUserByIdRepository)
        this.idGeneratorAdapter = idGeneratorAdapter
    }
    async execute(createTransactionParams) {
        // TODO - Verificar se o usuário existe
        const userId = createTransactionParams.user_id

        const user = await this.GetUserByIdRepository.execute(userId)

        if (!user) throw new UserNotFoundError(userId)

        //gerar uuid
        const transactionId = this.idGeneratorAdapter.execute()

        //criar transaction
        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        const createdTransaction =
            await this.CreateTransactionRepository.execute(transaction)

        return createdTransaction
    }
}
