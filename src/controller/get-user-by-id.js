import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfUuidIsValid,
    invalidIdResponde,
    serverError,
    ok,
    notFound,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const isIdValid = checkIfUuidIsValid(httpRequest.params.userId)
            if (!isIdValid) {
                return invalidIdResponde()
            }

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({ message: 'User not found' })
            }

            return ok(user)
        } catch (error) {
            return serverError()
        }
    }
}
