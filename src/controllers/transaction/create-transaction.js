import { checkIfUuidIsValid, invalidIdResponse } from '../helpers.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Validar se o  UUID é válido
            const isIdValid = checkIfUuidIsValid(params.userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            //TODO - Validar se o amount > 0

            //TODO - Validar se há 2 casas decimais

            //TODO - Validar o tipo da transação 'EARNING', 'EXPENSE', 'INVESTMENT'

            return httpRequest
        } catch (error) {
            return error
        }
    }
}
