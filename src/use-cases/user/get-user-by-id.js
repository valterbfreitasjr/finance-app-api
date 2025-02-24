export class GetUserByIdUseCase {
    constructor(postgresGetUserByIdRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }
    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)

        return user
    }
}
