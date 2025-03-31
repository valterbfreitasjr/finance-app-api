import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        ;(this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository),
            (this.postgresGetUserByIdRepository = postgresGetUserByIdRepository)
    }
    async execute(createTransactionParams) {
        // TODO - Verificar se o usuário existe
        const userId = createTransactionParams.user_id

        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) throw new UserNotFoundError(userId)

        //gerar uuid
        const transactionId = uuidv4()

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
