import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const postgresGetUserRepository = new PostgresGetUserByIdRepository()

        const user = await postgresGetUserRepository.execute(userId)

        return user
    }
}
