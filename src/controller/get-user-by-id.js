import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, success } from './helpers.js'

export class GetUserByIdController {
    async execute(userId) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(userId)

            if (!user) {
                return serverError('User not found')
            }

            return success({ data: user })
        } catch (error) {
            return serverError()
        }
    }
}
