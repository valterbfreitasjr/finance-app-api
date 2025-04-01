import { TransactionNotFoundError } from '../../errors/user.js'
import {
    checkIfUuidIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const userId = httpRequest.body.user_id

            const transactionIdIsValid = checkIfUuidIsValid(transactionId)
            const userIdIsValid = checkIfUuidIsValid(userId)

            if (!transactionIdIsValid || !userIdIsValid) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(
                    transactionId,
                    userId,
                )

            if (!deletedTransaction) {
                return transactionNotFoundResponse()
            }

            return ok(deletedTransaction)
        } catch (error) {
            if (error instanceof TransactionNotFoundError) {
                return transactionNotFoundResponse()
            }
            console.error(error)

            return serverError()
        }
    }
}
