import { prisma } from '../../../../prisma/prisma.js'

export class GetUserByEmailRepository {
    async execute(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
