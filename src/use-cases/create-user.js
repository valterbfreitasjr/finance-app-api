import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        ;(this.postgresCreateUserRepository = postgresCreateUserRepository),
            (this.postgresGetUserByEmailRepository =
                postgresGetUserByEmailRepository)
    }
    async execute(createUserParams) {
        // TODO - verificar e-mail se em uso
        const isUsedEmail = await this.postgresGetUserByEmailRepository.execute(
            createUserParams.email,
        )

        if (isUsedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
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

        const createdUser =
            await this.postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
