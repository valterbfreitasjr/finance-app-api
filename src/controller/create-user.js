import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Validar req (campos obrigatórios, tamanho da senha e e-mail)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}.` })
                }

                // Validar tamanho de senha
                const passwordIsValid = params.password.length < 6
                if (passwordIsValid) {
                    return badRequest({
                        message: `Password must be at least 6 characters.`,
                    })
                }

                // Validar e-mail
                const emailIsValid = validator.isEmail(params.email)
                if (!emailIsValid) {
                    return badRequest({ message: 'Invalid Email.' })
                }

                // Chamar o use case
                const createUserUseCase = new CreateUserUseCase()

                const createdUser = await createUserUseCase.execute(params)

                // Retornar a reposta para o usuário (status code)
                return created({ data: createdUser })
            }
        } catch (error) {
            return serverError()
        }
    }
}
