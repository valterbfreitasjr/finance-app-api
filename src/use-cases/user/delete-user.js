export class DeleteUserUseCase {
    constructor(DeleteUserRepository) {
        this.DeleteUserRepository = DeleteUserRepository
    }
    async execute(userId) {
        const deletedUser = await this.DeleteUserRepository.execute(userId)

        return deletedUser
    }
}
