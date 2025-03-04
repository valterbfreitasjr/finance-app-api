import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
