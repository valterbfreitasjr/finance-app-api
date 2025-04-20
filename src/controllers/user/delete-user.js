import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfUuidIsValid,
    invalidIdResponse,
    userNotFoundResponse,
    serverError,
    ok,
} from '../helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfUuidIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new userNotFoundResponse()
            }
            return serverError()
        }
    }
}
