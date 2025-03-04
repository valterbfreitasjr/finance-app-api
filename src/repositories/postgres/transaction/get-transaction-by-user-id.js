import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetTransactionByUserIdRepository {
    async execute(userId) {
        console.log(userId)
        return await prisma.transaction.findUnique({
            where: {
                user_id: userId,
            },
        })
    }
}
