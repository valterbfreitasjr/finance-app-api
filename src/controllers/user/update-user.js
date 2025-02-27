import { EmailAlreadyInUseError } from '../../errors/user.js'
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
    notAllowedFieldsResponse,
    checkIfFieldIsEmpty,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
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
                return notAllowedFieldsResponse()
            }

            const passwordIsEmpty = checkIfFieldIsEmpty(params.password)
            if (passwordIsEmpty) {
                return badRequest({
                    message: 'Password Empty',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)
                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            const emailIsEmpty = checkIfFieldIsEmpty(params.email)
            if (emailIsEmpty) {
                return badRequest({
                    message: 'Email Empty',
                })
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return invalidEmailIsAlreadyInUseResponse()
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )
            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
