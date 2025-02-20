import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    checkIfUuidIsValid,
    invalidEmailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from './helpers/index.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfUuidIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)
                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)
                if (!emailIsValid) {
                    return invalidEmailIsAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(userId, params)
            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
