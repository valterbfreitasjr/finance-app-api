import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfUuidIsValid,
    invalidIdResponde,
    notFound,
    serverError,
    ok,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfUuidIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponde()
            }

            const user = await GetUserByIdUseCase.execute(userId)

            if (!user) {
                return notFound({ message: 'User not found' })
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            return serverError()
        }
    }
}
