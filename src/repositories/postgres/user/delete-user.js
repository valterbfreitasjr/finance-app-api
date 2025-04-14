import { prisma } from '../../../../prisma/prisma.js'

export class DeleteUserRepository {
    async execute(userId) {
        return await prisma.user.delete({
            where: {
                id: userId,
            },
        })
    }
}
