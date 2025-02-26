import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    invalidEmailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Validar req (campos obrigatórios, tamanho da senha e e-mail)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const { ok: requiredFieldsOk, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsOk) {
                return badRequest({
                    message: `The field ${missingField} is required!`,
                })
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) {
                return invalidEmailIsAlreadyInUseResponse()
            }

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
