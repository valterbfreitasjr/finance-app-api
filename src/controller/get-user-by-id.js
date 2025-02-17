import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, badRequest, notFound } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const isIdValid = validator.isUUID(httpRequest.params.userId)
            if (!isIdValid) {
                return badRequest('Invalid user id')
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
