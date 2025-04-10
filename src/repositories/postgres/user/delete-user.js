import { prisma } from '../../../../prisma/prisma.js'

export class DeleteUserRepository {
    async execute(userId) {
        return prisma.user.delete({
            where: {
                id: userId,
            },
        })
    }
}
