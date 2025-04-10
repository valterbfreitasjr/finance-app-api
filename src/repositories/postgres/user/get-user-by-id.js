import { prisma } from '../../../../prisma/prisma.js'

export class GetUserByIdRepository {
    async execute(userId) {
        return prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
    }
}
