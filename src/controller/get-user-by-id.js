import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfUuidIsValid,
    invalidIdResponse,
    serverError,
    ok,
    userNotFoundResponse,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const isIdValid = checkIfUuidIsValid(httpRequest.params.userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            return serverError()
        }
    }
}
