import {
    checkIfUuidIsValid,
    invalidIdResponse,
    serverError,
    ok,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params

            const isIdValid = checkIfUuidIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(userId)

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            return serverError()
        }
    }
}
