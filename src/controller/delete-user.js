import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import {
    checkIfUuidIsValid,
    invalidIdResponse,
    userNotFoundResponse,
    serverError,
    ok,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfUuidIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            return serverError()
        }
    }
}
