import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO - verificar e-mail se em uso
        //gerar uuid
        const userId = await uuidv4()

        //criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //criar usuário
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
