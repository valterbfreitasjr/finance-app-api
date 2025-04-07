import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
        passwordHasherAdapter,
    ) {
        ;(this.postgresCreateUserRepository = postgresCreateUserRepository),
            (this.postgresGetUserByEmailRepository =
                postgresGetUserByEmailRepository)
        this.passwordHasherAdapter = passwordHasherAdapter
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
        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        )

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
