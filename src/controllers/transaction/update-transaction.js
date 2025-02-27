import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    checkIfUuidIsValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    notAllowedFieldsResponse,
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

            //Validar se o  UUID é válido
            const isIdValid = checkIfUuidIsValid(transactionId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            //Validar campos obrigatórios
            const allowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return notAllowedFieldsResponse()
            }

            //TODO - Validar se há 2 casas decimais e se é maior que 0 (allow_negatives: false)
            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            // Validar se o type é válido
            if (params.type) {
                const type = params.type.trim().toUpperCase()

                const typeIsValid = checkIfTypeIsValid(type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const updatedTrasaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            return ok(updatedTrasaction)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
