import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        // TODO - verificar e-mail se em uso
        const isUsedEmail = await postgresGetUserByEmailRepository.execute(
            createUserParams.email,
        )

        if (isUsedEmail) {
            throw new Error('This provided email is already in use')
        }

        //gerar uuid
        const userId = uuidv4()

        //criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //criar usuário
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
