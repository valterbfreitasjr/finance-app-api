import validator from 'validator'
import {
    badRequest,
    checkIfUuidIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            //Validar campos obrigatórios
            const requiredFields = [
                'id',
                'user_id',
                'ename',
                'date',
                'amount',
                'type',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}.` })
                }
            }

            //Validar se o  UUID é válido
            const isIdValid = checkIfUuidIsValid(params.user_id)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            //TODO - Validar se o amount > 0
            if (params.amount >= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0.',
                })
            }

            //TODO - Validar se há 2 casas decimais
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            //TODO - Validar o tipo da transação 'EARNING', 'EXPENSE', 'INVESTMENT'
            const type = params.type.trim().toUpperCase()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE, INVESTMENT.',
                })
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
