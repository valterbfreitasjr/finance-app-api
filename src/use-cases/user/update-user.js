import { EmailAlreadyInUseError } from '../../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/index.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(postgresUpdateUserRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
