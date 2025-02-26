import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    checkIfUuidIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            //Validar campos obrigatórios
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: requiredFieldsOk, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsOk) {
                return requiredFieldIsMissingResponse(missingField)
            }

            //Validar se o  UUID é válido
            const isIdValid = checkIfUuidIsValid(params.user_id)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            //TODO - Validar se há 2 casas decimais e se é maior que 0 (allow_negatives: false)
            const amountIsValid = checkIfAmountIsValid(params.amount)

            if (!amountIsValid) {
                return invalidAmountResponse()
            }

            //TODO - Validar o tipo da transação 'EARNING', 'EXPENSE', 'INVESTMENT'
            const type = params.type.trim().toUpperCase()

            const typeIsValid = checkIfTypeIsValid(type)

            if (!typeIsValid) {
                return invalidTypeResponse()
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
