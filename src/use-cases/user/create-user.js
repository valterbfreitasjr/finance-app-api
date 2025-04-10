import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        CreateUserRepository,
        GetUserByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        ;(this.CreateUserRepository = CreateUserRepository),
            (this.GetUserByEmailRepository = GetUserByEmailRepository)
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
    }
    async execute(createUserParams) {
        // TODO - verificar e-mail se em uso
        const isUsedEmail = await this.GetUserByEmailRepository.execute(
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

        const createdUser = await this.CreateUserRepository.execute(user)

        return createdUser
    }
}
