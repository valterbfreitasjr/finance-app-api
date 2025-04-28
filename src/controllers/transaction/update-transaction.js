import { ZodError } from 'zod'
import { updateTransactionSchema } from '../../schemas/index.js'
import {
    badRequest,
    checkIfUuidIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import { TransactionNotFoundError } from '../../errors/transaction.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const params = httpRequest.body

            //Validar se o ID da transação é um UUID
            const isIdValid = checkIfUuidIsValid(transactionId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            await updateTransactionSchema.parseAsync(params)

            const updatedTrasaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            return ok(updatedTrasaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }

            if (error instanceof TransactionNotFoundError) {
                return userNotFoundResponse()
            }

            console.log(error)
            return serverError()
        }
    }
}
