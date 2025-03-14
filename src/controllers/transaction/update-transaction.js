import { ZodError } from 'zod'
import { updateTransactionSchema } from '../../schemas/index.js'
import {
    badRequest,
    checkIfUuidIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateTrasactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const transactionId = httpRequest.params.transactionId

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
            console.log(error)
            return serverError()
        }
    }
}
