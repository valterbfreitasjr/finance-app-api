import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        ;(this.postgresCreateUserRepository = postgresCreateUserRepository),
            (this.postgresGetUserByEmailRepository =
                postgresGetUserByEmailRepository)
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
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
        const userId = this.idGeneratorAdapter.execute()

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
